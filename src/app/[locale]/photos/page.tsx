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
} from "react";

import { JustifiedPhotoGrid } from "@/components/justified-photo-grid";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  type ActiveGallery,
  type Gallery,
  getLandingAlbums,
  type Photo,
  resolveActiveGallery,
} from "@/data/photo-catalog";
import { BLUR_FADE_DELAY } from "@/data/site";
import { Link as I18nLink, usePathname, useRouter } from "@/i18n/routing";
import { resolvePhotoSrc } from "@/lib/resolve-photo-src";
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

function AlbumTile({
  gallery,
  index,
  onClick,
}: {
  gallery: Gallery;
  index: number;
  onClick: () => void;
}) {
  const count = gallery.photos.length;
  return (
    <BlurFade delay={BLUR_FADE_DELAY * (index + 1)}>
      <div role="listitem" className="contents">
        <button
          type="button"
          data-album-id={gallery.id}
          onClick={onClick}
          aria-label={`Open ${gallery.title} album, ${count} ${count === 1 ? "photo" : "photos"}`}
          className="group border-border relative block w-full overflow-hidden rounded-md border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ aspectRatio: "4 / 3" }}
        >
          <img
            src={resolvePhotoSrc(gallery.cover)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
            <LocationTag label={gallery.title} className="!bg-black/55 !text-white" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-5">
            <h2 className="text-left text-sm font-semibold text-white sm:text-lg md:text-xl">
              {gallery.title}
            </h2>
            <p className="mt-0.5 text-left text-xs text-white/75">
              {count} {count === 1 ? "photo" : "photos"}
            </p>
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

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      <div
        className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <LocationTag
            label={locationLabel}
            className="!bg-white/10 !text-white shrink-0"
          />
          <span className="text-muted-foreground truncate text-sm text-white/70">
            {photo.alt}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-white/80 hover:text-white focus-visible:ring-ring shrink-0 rounded-md p-2 focus-visible:ring-2 focus-visible:outline-none"
          aria-label="Close"
        >
          <X className="size-6" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-12"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="text-white/70 hover:text-white focus-visible:ring-ring z-10 rounded-full p-2 focus-visible:ring-2 focus-visible:outline-none"
          aria-label="Previous photo"
        >
          <ChevronLeft className="size-10 sm:size-12" strokeWidth={1.25} />
        </button>

        <div
          className="mx-1 flex max-h-[calc(100vh-14rem)] max-w-[min(100vw-8rem,1400px)] flex-1 items-center justify-center sm:mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={resolved}
            alt={photo.alt}
            className="max-h-[calc(100vh-14rem)] max-w-full object-contain"
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="text-white/70 hover:text-white focus-visible:ring-ring z-10 rounded-full p-2 focus-visible:ring-2 focus-visible:outline-none"
          aria-label="Next photo"
        >
          <ChevronRight className="size-10 sm:size-12" strokeWidth={1.25} />
        </button>
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
              aria-label={`Photo ${i + 1}`}
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

      <div
        className="text-muted-foreground shrink-0 px-4 py-3 text-center text-sm text-white/60 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}

function AlbumDetail({
  gallery,
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
    <div>
      <BlurFade delay={0}>
        <nav
          className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase"
          aria-label="Breadcrumb"
        >
          <span className="text-foreground">{tGallery("breadcrumbRoot")}</span>
          <span className="mx-1.5 opacity-50">/</span>
          <span>{gallery.title}</span>
        </nav>
        <button
          type="button"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground mb-6 inline-block text-sm transition-colors"
        >
          &larr; {backLabel}
        </button>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {gallery.title}
          </h2>
          <LocationTag label={gallery.title} />
        </div>
      </BlurFade>

      <JustifiedPhotoGrid
        key={gallery.id}
        photos={gallery.photos}
        galleryLabel={gallery.title}
        onPhotoClick={onOpenPhoto}
      />

      <PhotoLightbox
        open={lightboxOpen}
        photos={gallery.photos}
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

function PhotosPageContent() {
  const tGallery = useTranslations("galleryPage");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();

  const active = useMemo(() => {
    const g = searchParams.get("g");
    return resolveActiveGallery(g);
  }, [searchParams]);

  const { lightboxOpen, lightboxIndex } = useMemo(() => {
    if (!active) {
      return { lightboxOpen: false, lightboxIndex: 0 };
    }
    const raw = searchParams.get("p");
    if (raw === null || raw === "") {
      return { lightboxOpen: false, lightboxIndex: 0 };
    }
    let idx = Number.parseInt(raw, 10);
    const gRaw = searchParams.get("g");
    if (gRaw === "hawaii" && Number.isFinite(idx)) {
      idx += 1;
    }
    if (
      !Number.isFinite(idx) ||
      idx < 0 ||
      idx >= active.photos.length
    ) {
      return { lightboxOpen: false, lightboxIndex: 0 };
    }
    return { lightboxOpen: true, lightboxIndex: idx };
  }, [active, searchParams]);

  const replaceQuery = useCallback(
    (updates: Record<string, string | null | undefined>) => {
      router.replace(buildPhotosHref(pathname, searchParams, updates));
    },
    [pathname, queryKey, router, searchParams],
  );

  const openAlbum = useCallback(
    (id: string) => {
      replaceQuery({ g: id, p: null });
    },
    [replaceQuery],
  );

  const backToAlbums = useCallback(() => {
    replaceQuery({ g: null, p: null });
  }, [replaceQuery]);

  const openPhoto = useCallback(
    (index: number) => {
      if (!active) return;
      replaceQuery({ g: active.id, p: String(index) });
    },
    [active, replaceQuery],
  );

  const closeLightbox = useCallback(() => {
    if (!active) return;
    replaceQuery({ p: null });
  }, [active, replaceQuery]);

  const stepPhoto = useCallback(
    (delta: number) => {
      if (!active || !lightboxOpen) return;
      const n = active.photos.length;
      const next = (lightboxIndex + delta + n) % n;
      replaceQuery({ g: active.id, p: String(next) });
    },
    [active, lightboxIndex, lightboxOpen, replaceQuery],
  );

  const landingAlbums = getLandingAlbums();

  return (
    <main className="mx-auto flex min-h-dvh max-w-7xl flex-col px-6 py-8 pb-24 sm:px-16 md:px-20 md:py-16 md:pt-14 lg:px-24 lg:py-20 xl:px-32 xl:py-24">
      <section
        className="mt-16 sm:mt-28"
        aria-labelledby="photos-heading"
      >
        {active ? (
          <AlbumDetail
            gallery={active}
            lightboxOpen={lightboxOpen}
            lightboxIndex={lightboxIndex}
            onBack={backToAlbums}
            onOpenPhoto={openPhoto}
            onCloseLightbox={closeLightbox}
            onPrevPhoto={() => stepPhoto(-1)}
            onNextPhoto={() => stepPhoto(1)}
            onSelectPhoto={openPhoto}
            backLabel={tGallery("backToAlbums")}
          />
        ) : (
          <>
            <BlurFade delay={0}>
              <I18nLink
                href="/"
                className="text-muted-foreground hover:text-foreground mb-8 inline-block text-sm transition-colors"
              >
                &larr; Back to site
              </I18nLink>
              <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-widest uppercase">
                {tGallery("albumsSection")}
              </p>
              <h1
                id="photos-heading"
                className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl"
              >
                {tGallery("title")}
              </h1>
            </BlurFade>

            <div
              className="grid min-w-0 grid-cols-4 gap-2 sm:gap-3"
              role="list"
              aria-label="Photo albums"
            >
              {landingAlbums.map((gallery, i) => (
                <AlbumTile
                  key={gallery.id}
                  gallery={gallery}
                  index={i}
                  onClick={() => openAlbum(gallery.id)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default function PhotosPage() {
  const tGallery = useTranslations("galleryPage");
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-dvh max-w-7xl flex-col items-center justify-center px-6 py-24">
          <p className="text-muted-foreground text-sm">{tGallery("loading")}</p>
        </main>
      }
    >
      <PhotosPageContent />
    </Suspense>
  );
}
