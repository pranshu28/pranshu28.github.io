"use client";

import { BLUR_FADE_DELAY } from "@/data/site";
import { BlurFade } from "@/components/ui/blur-fade";
import Link from "next/link";
import { useState } from "react";

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
    photos: [
      { src: "/photos/chichen-itza.jpg", alt: "Chichén Itzá" },
    ],
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
      { src: "/photos/chateau-frontenac.jpg", alt: "Château Frontenac, Quebec City" },
      { src: "/photos/forest-pool.jpg", alt: "Forest pool" },
      { src: "/photos/montreal-sunset.jpg", alt: "Sunset over Montreal" },
    ],
  },
  {
    id: "usa",
    title: "USA",
    cover: "/photos/nyc-skyline.jpg",
    photos: [
      { src: "/photos/nyc-skyline.jpg", alt: "Manhattan skyline at dusk" },
    ],
  },
];

const sketches: Photo[] = [
  { src: "/photos/sketches/horse.jpg", alt: "Rearing horse" },
  { src: "/photos/sketches/elephant.jpg", alt: "Elephant emerging from the forest" },
  { src: "/photos/sketches/solitude.jpg", alt: "Solitude" },
  { src: "/photos/sketches/deer-in-snow.jpg", alt: "Deer in snow" },
  { src: "/photos/sketches/trees-by-sea.jpg", alt: "Trees by the sea" },
  { src: "/photos/sketches/cityscape-lens.jpg", alt: "Cityscape through a lens" },
];

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
        onClick={onClick}
        className="group relative block w-full overflow-hidden rounded-lg focus:outline-none"
        style={{ aspectRatio: "3 / 2" }}
      >
        <img
          src={gallery.cover}
          alt={gallery.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={index < 4 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
        <div className="absolute bottom-0 left-0 p-4 sm:p-5">
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            {gallery.title}
          </h3>
          <p className="text-xs text-white/70">
            {gallery.photos.length} {gallery.photos.length === 1 ? "photo" : "photos"}
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
        onClick={onClick}
        className="group relative block w-full overflow-hidden rounded-lg focus:outline-none"
        style={{ aspectRatio: "3 / 2" }}
      >
        <img
          src="/photos/sketches/horse.jpg"
          alt="Sketches"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
        <div className="absolute bottom-0 left-0 p-4 sm:p-5">
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            Sketches
          </h3>
          <p className="text-xs text-white/70">
            {sketches.length} drawings
          </p>
        </div>
      </button>
    </BlurFade>
  );
}

function GalleryDetail({
  gallery,
  onBack,
}: {
  gallery: { title: string; photos: Photo[] };
  onBack: () => void;
}) {
  return (
    <div>
      <BlurFade delay={0}>
        <button
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground mb-6 inline-block text-sm transition-colors"
        >
          &larr; All galleries
        </button>
        <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
          {gallery.title}
        </h2>
      </BlurFade>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {gallery.photos.map((photo, i) => (
          <BlurFade key={photo.src} delay={BLUR_FADE_DELAY * (i + 1)}>
            <div className="mb-4 break-inside-avoid">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full rounded-lg object-cover"
                loading={i < 3 ? "eager" : "lazy"}
              />
              <p className="text-muted-foreground mt-1.5 text-xs">
                {photo.alt}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>
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
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground mb-8 inline-block text-sm transition-colors"
              >
                &larr; Back
              </Link>
              <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Life
              </h1>
              <p className="text-muted-foreground mb-10 text-sm">
                Places I&apos;ve been, things I&apos;ve seen.
              </p>
            </BlurFade>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
