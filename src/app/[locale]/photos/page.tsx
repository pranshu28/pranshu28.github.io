"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { JustifiedAlbumGrid } from "@/components/photos/justified-album-grid";
import { PhotoSearchBar } from "@/components/photos/photo-search-bar";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  type ActiveGallery,
  type Gallery,
  getNavLandingAlbums,
  INLINE_LANDING_GALLERY_IDS,
  normalizeGalleryParam,
  photoDisplayTitle,
  type Photo,
  resolveActiveGallery,
  usesCombinedPhotosLayout,
} from "@/data/photo-catalog";
import { BLUR_FADE_DELAY } from "@/data/site";
import { Link as I18nLink, usePathname, useRouter } from "@/i18n/routing";
import { resolvePhotoSrc } from "@/lib/resolve-photo-src";
import { filterPhotosBySearchQuery } from "@/lib/search-photos";
import {
  type GallerySortMode,
  normalizeSortParam,
  sortGalleryPhotos,
} from "@/lib/sort-gallery-photos";
import { cn } from "@/lib/utils";

/** Shareable: `?g=<albumId>&p=<0-based index>` */
function buildPhotosHref(
  pathname: string,
  current: URLSearchParams,
  updates: Record<string, string | null | undefined>,
): string {
  const sp = new URLSearchParams(current.toString());
  for (const [k, v] of Object.entries(updates)) {
    if (v === undefined || v === null || v === "") sp.delete(k);
    else sp.set(k, v);
  }
  const q = sp.toString();
  return q ? `${pathname}?${q}` : pathname;
}

function parseLightboxIndex(
  searchParams: URLSearchParams,
  max: number,
): { open: boolean; index: number } {
  const raw = searchParams.get("p");
  if (raw === null || raw === "") {
    return { open: false, index: 0 };
  }
  let idx = Number.parseInt(raw, 10);
  const gRaw = searchParams.get("g");
  if (gRaw === "hawaii" && Number.isFinite(idx)) {
    idx += 1;
  }
  if (
    !Number.isFinite(idx) ||
    idx < 0 ||
    idx >= max
  ) {
    return { open: false, index: 0 };
  }
  return { open: true, index: idx };
}

function LocationTag({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`bg-background/90 text-foreground inline-block rounded px-2 py-0.5 text-xs font-medium tracking-wide uppercase backdrop-blur-sm ${className}`}
    >
      {label}
    </span>
  );
}

function GalleryLayoutAttribution() {
  const tGallery = useTranslations("galleryPage");
  return (
    <footer
      className="text-muted-foreground/65 mt-auto w-full shrink-0 border-t border-border/40 pt-3"
      role="note"
    >
      <p className="mx-auto max-w-md px-1 text-center text-[10px] leading-snug sm:text-[11px]">
        {tGallery("layoutInspiration")}{" "}
        <a
          href="https://stuckincustoms.smugmug.com"
          target="_blank"
          rel="noopener noreferrer"
          title="https://stuckincustoms.smugmug.com"
          className="text-muted-foreground/90 underline decoration-border/60 underline-offset-2 transition-colors hover:text-foreground/70 hover:decoration-foreground/40"
        >
          {tGallery("layoutInspirationLink")}
        </a>
        .
      </p>
    </footer>
  );
}

function AlbumTile({
  gallery,
  index,
  onClick,
}: {
  gallery: Gallery;
  index: number;
  onClick: () => void;
}) {
  return (
    <BlurFade
      delay={BLUR_FADE_DELAY * (index + 1)}
      className="min-w-0 flex-1 basis-0"
    >
      <div role="listitem" className="contents">
        <button
          type="button"
          data-album-id={gallery.id}
          onClick={onClick}
          aria-label={`Open ${gallery.title} album`}
          className="group border-border relative block w-full min-w-0 overflow-hidden rounded-md border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ aspectRatio: "4 / 3" }}
        >
          <img
            src={resolvePhotoSrc(gallery.cover)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading={index < 8 ? "eager" : "lazy"}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-4 md:p-5">
            <h2 className="text-left text-xs leading-tight font-semibold text-white sm:text-sm md:text-lg lg:text-xl">
              {gallery.title}
            </h2>
          </div>
        </button>
      </div>
    </BlurFade>
  );
}

function PhotoLightbox({
  open,
  photos,
  index,
  locationLabel,
  onClose,
  onPrev,
  onNext,
  onSelectIndex,
}: {
  open: boolean;
  photos: Photo[];
  index: number;
  locationLabel: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (i: number) => void;
}) {
  const filmstripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  useEffect(() => {
    if (!open || !filmstripRef.current) return;
    const el = filmstripRef.current.querySelector(
      `[data-thumb-index="${index}"]`,
    );
    el?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [open, index]);

  if (!open || photos.length === 0) return null;

  const photo = photos[index];
  const resolved = resolvePhotoSrc(photo.src);

  const metaLine = [
    photo.place?.trim() || null,
    photo.year != null ? String(photo.year) : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      className="fixed inset-0 z-[100] flex h-[100dvh] flex-col bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      {/* Full viewport height minus filmstrip: image uses 100% of this; caption is overlaid, not a separate row */}
      <div
        className="relative min-h-0 flex-1"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="text-white/70 hover:text-white focus-visible:ring-ring absolute top-1/2 left-1 z-20 -translate-y-1/2 rounded-full p-2 focus-visible:ring-2 focus-visible:outline-none sm:left-2"
          aria-label="Previous photo"
        >
          <ChevronLeft className="size-10 sm:size-12" strokeWidth={1.25} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="text-white/70 hover:text-white focus-visible:ring-ring absolute top-1/2 right-1 z-20 -translate-y-1/2 rounded-full p-2 focus-visible:ring-2 focus-visible:outline-none sm:right-2"
          aria-label="Next photo"
        >
          <ChevronRight className="size-10 sm:size-12" strokeWidth={1.25} />
        </button>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-12 sm:px-16">
          <img
            src={resolved}
            alt={photo.alt}
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto max-h-full max-w-full object-contain"
          />
        </div>

        <div
          className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3 sm:items-center sm:p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 pr-1 sm:flex-row sm:items-center sm:gap-3">
            <LocationTag
              label={locationLabel}
              className="!bg-black/50 !text-white w-fit max-w-full shrink-0 truncate align-middle backdrop-blur-sm"
            />
            {metaLine !== "" ? (
              <p className="min-w-0 text-xs leading-snug text-white/75 sm:text-sm">
                {metaLine}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/90 hover:text-white focus-visible:ring-ring shrink-0 rounded-md bg-black/40 p-2 backdrop-blur-sm focus-visible:ring-2 focus-visible:outline-none"
            aria-label="Close"
          >
            <X className="size-6" />
          </button>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/55 to-transparent pt-20 pb-2 sm:pt-24 sm:pb-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-base font-semibold text-white drop-shadow-sm sm:text-lg">
              {photoDisplayTitle(photo)}
            </p>
            {photo.description != null && photo.description.trim() !== "" ? (
              <p className="mt-1.5 max-h-[min(42vh,16rem)] overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap text-white/85 [scrollbar-width:thin] sm:max-h-[min(45vh,20rem)] sm:text-[0.9375rem] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/30">
                {photo.description.trim()}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className="shrink-0 border-t border-white/10 px-2 pt-2 pb-1 sm:px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={filmstripRef}
          className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25"
        >
          {photos.map((ph, i) => (
            <button
              key={`${ph.src}-${i}`}
              type="button"
              data-thumb-index={i}
              onClick={() => onSelectIndex(i)}
              className={cn(
                "h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all sm:h-[4.5rem] sm:w-24",
                i === index
                  ? "border-white opacity-100 ring-2 ring-white/40"
                  : "border-transparent opacity-55 hover:opacity-90",
              )}
              aria-label={photoDisplayTitle(ph)}
              aria-current={i === index ? "true" : undefined}
            >
              <img
                src={resolvePhotoSrc(ph.src)}
                alt=""
                className="size-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlbumDetail({
  gallery,
  displayPhotos,
  searchQuery,
  onSearchQueryChange,
  searchStatusText,
  sortMode,
  onSortChange,
  onReshuffleRandom,
  lightboxOpen,
  lightboxIndex,
  onBack,
  onOpenPhoto,
  onCloseLightbox,
  onPrevPhoto,
  onNextPhoto,
  onSelectPhoto,
  backLabel,
}: {
  gallery: ActiveGallery;
  displayPhotos: readonly Photo[];
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  searchStatusText?: string;
  sortMode: GallerySortMode;
  onSortChange: (mode: GallerySortMode) => void;
  onReshuffleRandom: () => void;
  lightboxOpen: boolean;
  lightboxIndex: number;
  onBack: () => void;
  onOpenPhoto: (index: number) => void;
  onCloseLightbox: () => void;
  onPrevPhoto: () => void;
  onNextPhoto: () => void;
  onSelectPhoto: (index: number) => void;
  backLabel: string;
}) {
  const tGallery = useTranslations("galleryPage");

  return (
    <div className="w-full min-w-0">
      <BlurFade delay={0}>
        <nav
          className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase"
          aria-label="Breadcrumb"
        >
          <I18nLink
            href="/photos"
            className="text-foreground hover:underline"
          >
            {tGallery("breadcrumbRoot")}
          </I18nLink>
        </nav>
        <button
          type="button"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground mb-4 inline-block text-sm transition-colors"
        >
          &larr; {backLabel}
        </button>
        <h1
          id="photos-album-heading"
          className="mb-4 text-2xl font-bold tracking-tight sm:mb-5 sm:text-3xl"
        >
          {gallery.title}
        </h1>
        <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">
          <label
            htmlFor="gallery-sort-archive"
            className="text-muted-foreground text-xs font-semibold tracking-wide uppercase"
          >
            {tGallery("sortLabel")}
          </label>
          <select
            id="gallery-sort-archive"
            value={sortMode}
            onChange={(e) =>
              onSortChange(e.target.value as GallerySortMode)
            }
            className="border-border bg-background text-foreground max-w-[min(100%,16rem)] rounded-md border px-2 py-1.5 text-sm"
          >
            <option value="place">{tGallery("sortPlace")}</option>
            <option value="date">{tGallery("sortDate")}</option>
            <option value="random">{tGallery("sortRandom")}</option>
          </select>
          {sortMode === "random" ? (
            <button
              type="button"
              onClick={onReshuffleRandom}
              className="text-muted-foreground hover:text-foreground text-xs font-medium underline-offset-2 hover:underline"
            >
              {tGallery("reshuffle")}
            </button>
          ) : null}
        </div>
        <PhotoSearchBar
          id="photos-archive-search"
          value={searchQuery}
          onChange={onSearchQueryChange}
          label={tGallery("searchLabel")}
          placeholder={tGallery("searchPlaceholder")}
          statusText={searchStatusText}
          className="mt-4 sm:mt-5"
        />
      </BlurFade>

      <JustifiedAlbumGrid
        photos={displayPhotos}
        onOpenPhoto={onOpenPhoto}
        ariaLabel={`${gallery.title} photos`}
      />

      <PhotoLightbox
        open={lightboxOpen}
        photos={[...displayPhotos]}
        index={lightboxIndex}
        locationLabel={gallery.title}
        onClose={onCloseLightbox}
        onPrev={onPrevPhoto}
        onNext={onNextPhoto}
        onSelectIndex={onSelectPhoto}
      />
    </div>
  );
}

function InlineAlbumSection({
  gallery,
  sectionId,
  headingId,
  hideSectionHeading,
  sectionAriaLabel,
  showSortControls,
  sortMode,
  onSortChange,
  onReshuffleRandom,
  sortedPhotos,
  onOpenPhoto,
  sortLabel,
  sortPlace,
  sortDate,
  sortRandom,
  reshuffle,
}: {
  gallery: ActiveGallery;
  sectionId: string;
  headingId: string;
  /** When true, no visible H2; use `sectionAriaLabel` for the section landmark. */
  hideSectionHeading?: boolean;
  sectionAriaLabel?: string;
  showSortControls: boolean;
  sortMode: GallerySortMode;
  onSortChange: (mode: GallerySortMode) => void;
  onReshuffleRandom: () => void;
  sortedPhotos: Photo[];
  onOpenPhoto: (index: number) => void;
  sortLabel: string;
  sortPlace: string;
  sortDate: string;
  sortRandom: string;
  reshuffle: string;
}) {
  const selectId = `gallery-sort-${gallery.id}`;

  return (
    <section
      id={sectionId}
      className="scroll-mt-28 w-full min-w-0 sm:scroll-mt-32"
      aria-labelledby={hideSectionHeading ? undefined : headingId}
      aria-label={hideSectionHeading ? sectionAriaLabel : undefined}
    >
      <BlurFade delay={0}>
        {hideSectionHeading ? null : (
          <h2
            id={headingId}
            className="mb-4 text-xl font-bold tracking-tight sm:mb-5 sm:text-2xl"
          >
            {gallery.title}
          </h2>
        )}
        {showSortControls ? (
          <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">
            <label
              htmlFor={selectId}
              className="text-muted-foreground text-xs font-semibold tracking-wide uppercase"
            >
              {sortLabel}
            </label>
            <select
              id={selectId}
              value={sortMode}
              onChange={(e) =>
                onSortChange(e.target.value as GallerySortMode)
              }
              className="border-border bg-background text-foreground max-w-[min(100%,16rem)] rounded-md border px-2 py-1.5 text-sm"
            >
              <option value="place">{sortPlace}</option>
              <option value="date">{sortDate}</option>
              <option value="random">{sortRandom}</option>
            </select>
            {sortMode === "random" ? (
              <button
                type="button"
                onClick={onReshuffleRandom}
                className="text-muted-foreground hover:text-foreground text-xs font-medium underline-offset-2 hover:underline"
              >
                {reshuffle}
              </button>
            ) : null}
          </div>
        ) : null}
      </BlurFade>
      <JustifiedAlbumGrid
        photos={sortedPhotos}
        onOpenPhoto={onOpenPhoto}
        ariaLabel={`${gallery.title} photos`}
      />
    </section>
  );
}

function PhotosPageContent() {
  const tGallery = useTranslations("galleryPage");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();

  const gRaw = searchParams.get("g");

  const sortMode = useMemo(
    () => normalizeSortParam(searchParams.get("sort")),
    [searchParams],
  );
  const rs = searchParams.get("rs") ?? "0";

  const replaceQuery = useCallback(
    (updates: Record<string, string | null | undefined>) => {
      router.replace(buildPhotosHref(pathname, searchParams, updates));
    },
    [pathname, queryKey, router, searchParams],
  );

  const [photoSearchQuery, setPhotoSearchQueryState] = useState("");

  const setPhotoSearchQuery = useCallback(
    (q: string) => {
      setPhotoSearchQueryState(q);
      replaceQuery({ p: null });
    },
    [replaceQuery],
  );

  const onSortChange = useCallback(
    (m: GallerySortMode) => {
      if (m === "random") {
        replaceQuery({
          sort: null,
          p: null,
          rs: String(Date.now()),
        });
        return;
      }
      replaceQuery({
        sort: m,
        p: null,
        rs: null,
      });
    },
    [replaceQuery],
  );

  const onReshuffleRandom = useCallback(() => {
    replaceQuery({ rs: String(Date.now()), p: null });
  }, [replaceQuery]);

  const active = useMemo(() => {
    return resolveActiveGallery(gRaw);
  }, [gRaw]);

  const combinedLayout =
    usesCombinedPhotosLayout(gRaw) || (gRaw != null && active === null);

  const sortedArchivePhotos = useMemo(() => {
    if (!active) return [];
    return sortGalleryPhotos(active.photos, sortMode, `${active.id}:${rs}`);
  }, [active, sortMode, rs]);

  const archiveDisplayedPhotos = useMemo(
    () => filterPhotosBySearchQuery(sortedArchivePhotos, photoSearchQuery),
    [sortedArchivePhotos, photoSearchQuery],
  );

  const displayArchiveGallery = useMemo((): ActiveGallery | null => {
    if (!active) return null;
    return { ...active, photos: sortedArchivePhotos };
  }, [active, sortedArchivePhotos]);

  const { open: archiveLightboxOpen, index: archiveLightboxIndex } = useMemo(
    () => {
      if (!displayArchiveGallery) {
        return { open: false, index: 0 };
      }
      return parseLightboxIndex(
        searchParams,
        archiveDisplayedPhotos.length,
      );
    },
    [displayArchiveGallery, searchParams, archiveDisplayedPhotos.length],
  );

  const archiveSearchStatus = useMemo(() => {
    const q = photoSearchQuery.trim();
    if (q === "") return undefined;
    const n = archiveDisplayedPhotos.length;
    if (n === 0) return tGallery("searchNoMatches");
    return tGallery("searchFiltered");
  }, [photoSearchQuery, archiveDisplayedPhotos.length, tGallery]);

  const backToCombinedHome = useCallback(() => {
    setPhotoSearchQueryState("");
    replaceQuery({ g: null, p: null, sort: null, rs: null });
  }, [replaceQuery]);

  const openArchivePhoto = useCallback(
    (index: number) => {
      if (!displayArchiveGallery) return;
      replaceQuery({ g: displayArchiveGallery.id, p: String(index) });
    },
    [displayArchiveGallery, replaceQuery],
  );

  const closeArchiveLightbox = useCallback(() => {
    if (!displayArchiveGallery) return;
    replaceQuery({ p: null });
  }, [displayArchiveGallery, replaceQuery]);

  const stepArchivePhoto = useCallback(
    (delta: number) => {
      if (!displayArchiveGallery || !archiveLightboxOpen) return;
      const n = archiveDisplayedPhotos.length;
      if (n === 0) return;
      const next = (archiveLightboxIndex + delta + n) % n;
      replaceQuery({ g: displayArchiveGallery.id, p: String(next) });
    },
    [
      archiveDisplayedPhotos.length,
      archiveLightboxIndex,
      archiveLightboxOpen,
      displayArchiveGallery,
      replaceQuery,
    ],
  );

  const travelBase = useMemo(
    () => resolveActiveGallery("travel"),
    [],
  );
  const travelSorted = useMemo(() => {
    if (!travelBase) return [];
    return sortGalleryPhotos(
      travelBase.photos,
      sortMode,
      `travel:${rs}`,
    );
  }, [travelBase, sortMode, rs]);

  const travelDisplayedPhotos = useMemo(
    () => filterPhotosBySearchQuery(travelSorted, photoSearchQuery),
    [travelSorted, photoSearchQuery],
  );

  const combinedSearchStatus = useMemo(() => {
    const q = photoSearchQuery.trim();
    if (q === "") return undefined;
    const n = travelDisplayedPhotos.length;
    if (n === 0) return tGallery("searchNoMatches");
    return tGallery("searchFiltered");
  }, [photoSearchQuery, travelDisplayedPhotos.length, tGallery]);

  const lightboxAlbumId = useMemo(() => {
    const p = searchParams.get("p");
    if (p === null || p === "") return null;
    const g = normalizeGalleryParam(searchParams.get("g"));
    if (g != null && INLINE_LANDING_GALLERY_IDS.includes(g)) return g;
    return "travel";
  }, [searchParams]);

  const lightboxGallery = useMemo((): ActiveGallery | null => {
    if (!lightboxAlbumId) return null;
    const ag = resolveActiveGallery(lightboxAlbumId);
    if (!ag) return null;
    const sorted =
      lightboxAlbumId === "travel"
        ? sortGalleryPhotos(ag.photos, sortMode, `travel:${rs}`)
        : sortGalleryPhotos(ag.photos, "place", lightboxAlbumId);
    const photosForLightbox =
      lightboxAlbumId === "travel"
        ? filterPhotosBySearchQuery(sorted, photoSearchQuery)
        : [...sorted];
    return { ...ag, photos: photosForLightbox };
  }, [lightboxAlbumId, sortMode, rs, photoSearchQuery]);

  const { open: combinedLightboxOpen, index: combinedLightboxIndex } = useMemo(
    () => {
      if (!lightboxGallery) {
        return { open: false, index: 0 };
      }
      return parseLightboxIndex(
        searchParams,
        lightboxGallery.photos.length,
      );
    },
    [lightboxGallery, searchParams],
  );

  const openCombinedPhoto = useCallback(
    (albumId: string, index: number) => {
      replaceQuery({ g: albumId, p: String(index) });
    },
    [replaceQuery],
  );

  const closeCombinedLightbox = useCallback(() => {
    replaceQuery({ p: null });
  }, [replaceQuery]);

  const stepCombinedPhoto = useCallback(
    (delta: number) => {
      if (!lightboxGallery || !combinedLightboxOpen) return;
      const n = lightboxGallery.photos.length;
      const next = (combinedLightboxIndex + delta + n) % n;
      replaceQuery({
        g: lightboxGallery.id,
        p: String(next),
      });
    },
    [
      lightboxGallery,
      combinedLightboxIndex,
      combinedLightboxOpen,
      replaceQuery,
    ],
  );

  useEffect(() => {
    if (!combinedLayout) return;
    const g = normalizeGalleryParam(searchParams.get("g"));
    if (g == null || !INLINE_LANDING_GALLERY_IDS.includes(g)) return;
    const p = searchParams.get("p");
    if (p != null && p !== "") return;
    const id = `album-${g}`;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [combinedLayout, searchParams]);

  const navAlbums = useMemo(() => getNavLandingAlbums(), []);

  const jumpToAlbum = useCallback(
    (id: string) => {
      setPhotoSearchQueryState("");
      replaceQuery({ g: id, p: null });
    },
    [replaceQuery],
  );

  if (!combinedLayout && displayArchiveGallery) {
    return (
      <main className="flex min-h-dvh w-full max-w-none flex-col pb-24 pl-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] pt-10 sm:pl-[max(0.75rem,env(safe-area-inset-left))] sm:pr-[max(0.75rem,env(safe-area-inset-right))] sm:pt-14 md:pt-16">
        <section
          className="flex min-h-0 min-w-0 flex-1 flex-col"
          aria-labelledby="photos-album-heading"
        >
          <div className="min-w-0 flex-1">
            <AlbumDetail
              gallery={displayArchiveGallery}
              displayPhotos={archiveDisplayedPhotos}
              searchQuery={photoSearchQuery}
              onSearchQueryChange={setPhotoSearchQuery}
              searchStatusText={archiveSearchStatus}
              sortMode={sortMode}
              onSortChange={onSortChange}
              onReshuffleRandom={onReshuffleRandom}
              lightboxOpen={archiveLightboxOpen}
              lightboxIndex={archiveLightboxIndex}
              onBack={backToCombinedHome}
              onOpenPhoto={openArchivePhoto}
              onCloseLightbox={closeArchiveLightbox}
              onPrevPhoto={() => stepArchivePhoto(-1)}
              onNextPhoto={() => stepArchivePhoto(1)}
              onSelectPhoto={openArchivePhoto}
              backLabel={tGallery("backToAlbums")}
            />
          </div>
          <GalleryLayoutAttribution />
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh w-full max-w-none flex-col pb-24 pl-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] pt-10 sm:pl-[max(0.75rem,env(safe-area-inset-left))] sm:pr-[max(0.75rem,env(safe-area-inset-right))] sm:pt-14 md:pt-16">
      <section
        className="flex min-h-0 min-w-0 flex-1 flex-col"
        aria-labelledby="photos-heading"
      >
        <div className="min-w-0 flex-1">
          <BlurFade delay={0}>
            <I18nLink
              href="/"
              className="text-muted-foreground hover:text-foreground mb-6 inline-block text-sm transition-colors sm:mb-8"
            >
              &larr; Back to site
            </I18nLink>
            <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-widest uppercase">
              {tGallery("albumsSection")}
            </p>
            <h1
              id="photos-heading"
              className="mb-6 text-3xl font-bold tracking-tight sm:mb-8 sm:text-4xl"
            >
              {tGallery("title")}
            </h1>
          </BlurFade>

          <div
            className="mb-10 flex min-w-0 flex-row flex-nowrap gap-1.5 sm:mb-14 sm:gap-3 md:gap-4"
            role="list"
            aria-label="Album shortcuts"
          >
            {navAlbums.map((gallery, i) => (
              <AlbumTile
                key={gallery.id}
                gallery={gallery}
                index={i}
                onClick={() => jumpToAlbum(gallery.id)}
              />
            ))}
          </div>

          {travelBase ? (
            <>
              <PhotoSearchBar
                id="photos-gallery-search"
                value={photoSearchQuery}
                onChange={setPhotoSearchQuery}
                label={tGallery("searchLabel")}
                placeholder={tGallery("searchPlaceholder")}
                statusText={combinedSearchStatus}
                className="mb-8 sm:mb-10"
              />
              <InlineAlbumSection
                gallery={travelBase}
                sectionId="album-travel"
                headingId="photos-section-travel"
                hideSectionHeading
                sectionAriaLabel={tGallery("inlineFeedAriaLabel")}
                showSortControls
                sortMode={sortMode}
                onSortChange={onSortChange}
                onReshuffleRandom={onReshuffleRandom}
                sortedPhotos={travelDisplayedPhotos}
                onOpenPhoto={(i) => openCombinedPhoto("travel", i)}
                sortLabel={tGallery("sortLabel")}
                sortPlace={tGallery("sortPlace")}
                sortDate={tGallery("sortDate")}
                sortRandom={tGallery("sortRandom")}
                reshuffle={tGallery("reshuffle")}
              />
            </>
          ) : null}
        </div>

        <GalleryLayoutAttribution />

        {lightboxGallery && combinedLightboxOpen ? (
          <PhotoLightbox
            open={combinedLightboxOpen}
            photos={lightboxGallery.photos}
            index={combinedLightboxIndex}
            locationLabel={lightboxGallery.title}
            onClose={closeCombinedLightbox}
            onPrev={() => stepCombinedPhoto(-1)}
            onNext={() => stepCombinedPhoto(1)}
            onSelectIndex={(i) =>
              openCombinedPhoto(lightboxGallery.id, i)
            }
          />
        ) : null}
      </section>
    </main>
  );
}

export default function PhotosPage() {
  const tGallery = useTranslations("galleryPage");
  return (
    <Suspense
      fallback={
        <main className="flex min-h-dvh w-full max-w-none flex-col items-center justify-center px-4 py-24">
          <p className="text-muted-foreground text-sm">{tGallery("loading")}</p>
        </main>
      }
    >
      <PhotosPageContent />
    </Suspense>
  );
}
