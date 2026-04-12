"use client";

import { BLUR_FADE_DELAY } from "@/data/site";
import { BlurFade } from "@/components/ui/blur-fade";
import { Link as I18nLink } from "@/i18n/routing";
import { resolvePhotoSrc } from "@/lib/resolve-photo-src";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Photo = { src: string; alt: string };

type Gallery = {
  id: string;
  title: string;
  cover: string;
  photos: Photo[];
};

const galleries: Gallery[] = [
  {
    id: "peru",
    title: "Peru",
    cover: "/photos/rainbow-mountain.jpg",
    photos: [
      { src: "/photos/machu-picchu-mist.jpg", alt: "Machu Picchu" },
      { src: "/photos/rainbow-mountain.jpg", alt: "Rainbow Mountain" },
      { src: "/photos/red-valley-peru.jpg", alt: "Red Valley" },
      { src: "/photos/sacred-valley-peru.jpg", alt: "Sacred Valley" },
      { src: "/photos/andes-panorama.jpg", alt: "Andes mountains" },
    ],
  },
  {
    id: "italy",
    title: "Italy",
    cover: "/photos/cinque-terre.jpg",
    photos: [
      { src: "/photos/colosseum-rome.jpg", alt: "Inside the Colosseum, Rome" },
      { src: "/photos/cinque-terre.jpg", alt: "Cinque Terre" },
      { src: "/photos/venice-canal.jpg", alt: "Murano canal, Venice" },
      { src: "/photos/leaning-tower-pisa.jpg", alt: "Leaning Tower of Pisa" },
    ],
  },
  {
    id: "india",
    title: "India",
    cover: "/photos/taj-mahal.jpg",
    photos: [
      { src: "/photos/taj-mahal.jpg", alt: "Taj Mahal" },
      { src: "/photos/desert-sunset.jpg", alt: "Sunset over Thar Desert" },
      { src: "/photos/himalayas-forest.jpg", alt: "Himalayas" },
      { src: "/photos/himalayas-meadow.jpg", alt: "Mountain meadow, Himalayas" },
    ],
  },
  {
    id: "mexico",
    title: "Mexico",
    cover: "/photos/chichen-itza.jpg",
    photos: [{ src: "/photos/chichen-itza.jpg", alt: "Chichén Itzá" }],
  },
  {
    id: "costa-rica",
    title: "Costa Rica",
    cover: "/photos/costa-rica-rainforest.jpg",
    photos: [
      { src: "/photos/mountain-sunset.jpg", alt: "Sunrise" },
      { src: "/photos/costa-rica-rainforest.jpg", alt: "Rainforest trail" },
    ],
  },
  {
    id: "hawaii",
    title: "Hawaii",
    cover: "/photos/hawaii-beach-sunset.jpg",
    photos: [
      { src: "/photos/hawaii-beach-sunset.jpg", alt: "Beach sunset" },
      { src: "/photos/hawaii-seashore.jpg", alt: "Seashore" },
    ],
  },
  {
    id: "canada",
    title: "Canada",
    cover: "/photos/chateau-frontenac.jpg",
    photos: [
      {
        src: "/photos/chateau-frontenac.jpg",
        alt: "Château Frontenac, Quebec City",
      },
      { src: "/photos/forest-pool.jpg", alt: "Forest pool" },
      { src: "/photos/montreal-sunset.jpg", alt: "Sunset over Montreal" },
    ],
  },
  {
    id: "usa",
    title: "USA",
    cover: "/photos/nyc-skyline.jpg",
    photos: [{ src: "/photos/nyc-skyline.jpg", alt: "Manhattan skyline at dusk" }],
  },
];

const sketches: Photo[] = [
  { src: "/photos/sketches/horse.jpg", alt: "Rearing horse" },
  {
    src: "/photos/sketches/elephant.jpg",
    alt: "Elephant emerging from the forest",
  },
  { src: "/photos/sketches/solitude.jpg", alt: "Solitude" },
  { src: "/photos/sketches/deer-in-snow.jpg", alt: "Deer in snow" },
  { src: "/photos/sketches/trees-by-sea.jpg", alt: "Trees by the sea" },
  { src: "/photos/sketches/cityscape-lens.jpg", alt: "Cityscape through a lens" },
];

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

function GalleryTile({
  gallery,
  index,
  onClick,
}: {
  gallery: Gallery;
  index: number;
  onClick: () => void;
}) {
  return (
    <BlurFade delay={BLUR_FADE_DELAY * (index + 1)}>
      <button
        type="button"
        onClick={onClick}
        className="group border-border relative block w-full overflow-hidden rounded-md border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ aspectRatio: "4 / 3" }}
      >
        <img
          src={resolvePhotoSrc(gallery.cover)}
          alt={gallery.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading={index < 4 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute left-3 top-3">
          <LocationTag label={gallery.title} className="!bg-black/55 !text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <h3 className="text-left text-lg font-semibold text-white sm:text-xl">
            {gallery.title}
          </h3>
          <p className="mt-0.5 text-left text-xs text-white/75">
            {gallery.photos.length}{" "}
            {gallery.photos.length === 1 ? "photo" : "photos"}
          </p>
        </div>
      </button>
    </BlurFade>
  );
}

function SketchesTile({ index, onClick }: { index: number; onClick: () => void }) {
  return (
    <BlurFade delay={BLUR_FADE_DELAY * (index + 1)}>
      <button
        type="button"
        onClick={onClick}
        className="group border-border relative block w-full overflow-hidden rounded-md border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ aspectRatio: "4 / 3" }}
      >
        <img
          src={resolvePhotoSrc("/photos/sketches/horse.jpg")}
          alt="Sketches"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute left-3 top-3">
          <LocationTag label="Sketches" className="!bg-black/55 !text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <h3 className="text-left text-lg font-semibold text-white sm:text-xl">
            Sketches
          </h3>
          <p className="mt-0.5 text-left text-xs text-white/75">
            {sketches.length} drawings
          </p>
        </div>
      </button>
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
}: {
  open: boolean;
  photos: Photo[];
  index: number;
  locationLabel: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
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
          <span className="text-muted-foreground truncate text-sm">
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
          className="mx-1 flex max-h-[calc(100vh-8rem)] max-w-[min(100vw-8rem,1400px)] flex-1 items-center justify-center sm:mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={resolved}
            alt={photo.alt}
            className="max-h-[calc(100vh-8rem)] max-w-full object-contain"
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
        className="text-muted-foreground shrink-0 px-4 py-4 text-center text-sm sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}

function GalleryDetail({
  gallery,
  onBack,
}: {
  gallery: { title: string; photos: Photo[] };
  onBack: () => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      const n = gallery.photos.length;
      return (i - 1 + n) % n;
    });
  }, [gallery.photos.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      const n = gallery.photos.length;
      return (i + 1) % n;
    });
  }, [gallery.photos.length]);

  return (
    <div>
      <BlurFade delay={0}>
        <nav
          className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase"
          aria-label="Breadcrumb"
        >
          <span className="text-foreground">Life</span>
          <span className="mx-1.5 opacity-50">/</span>
          <span>{gallery.title}</span>
        </nav>
        <button
          type="button"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground mb-6 inline-block text-sm transition-colors"
        >
          &larr; All galleries
        </button>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {gallery.title}
          </h2>
          <LocationTag label={gallery.title} />
        </div>
      </BlurFade>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3">
        {gallery.photos.map((photo, i) => (
          <BlurFade key={photo.src} delay={BLUR_FADE_DELAY * Math.min(i + 1, 8)}>
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group border-border relative aspect-square w-full overflow-hidden rounded-md border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={resolvePhotoSrc(photo.src)}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading={i < 8 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </button>
          </BlurFade>
        ))}
      </div>

      <PhotoLightbox
        open={lightboxIndex !== null}
        photos={gallery.photos}
        index={lightboxIndex ?? 0}
        locationLabel={gallery.title}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}

export default function PhotosPage() {
  const [activeGallery, setActiveGallery] = useState<string | null>(null);

  const active =
    activeGallery === "sketches"
      ? { title: "Sketches", photos: sketches }
      : galleries.find((g) => g.id === activeGallery);

  return (
    <main className="mx-auto flex min-h-dvh max-w-7xl flex-col px-6 py-8 pb-24 sm:px-16 md:px-20 md:py-16 md:pt-14 lg:px-24 lg:py-20 xl:px-32 xl:py-24">
      <section className="mt-16 sm:mt-28">
        {active ? (
          <GalleryDetail
            gallery={active}
            onBack={() => setActiveGallery(null)}
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
                Galleries
              </p>
              <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Life
              </h1>
              <p className="text-muted-foreground mb-10 max-w-md text-sm">
                Open a place, then a thumbnail for a full-screen view. Keys: ← →
                Esc.
              </p>
            </BlurFade>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {galleries.map((gallery, i) => (
                <GalleryTile
                  key={gallery.id}
                  gallery={gallery}
                  index={i}
                  onClick={() => setActiveGallery(gallery.id)}
                />
              ))}
              <SketchesTile
                index={galleries.length}
                onClick={() => setActiveGallery("sketches")}
              />
            </div>
          </>
        )}
      </section>
    </main>
  );
}
