/**
 * Raster sketches under `public/photos/sketches/`. Listed here so `PHOTO_CATALOG` stays
 * one concatenation of sources (`photo-catalog.ts`).
 */
export const SKETCH_PHOTOS = [
  { src: "/photos/sketches/horse.jpg", alt: "Rearing horse", tags: ["sketch"] },
  {
    src: "/photos/sketches/elephant.jpg",
    alt: "Elephant emerging from the forest",
    tags: ["sketch"],
  },
  { src: "/photos/sketches/solitude.jpg", alt: "Solitude", tags: ["sketch"] },
  {
    src: "/photos/sketches/deer-in-snow.jpg",
    alt: "Deer in snow",
    tags: ["sketch"],
  },
  {
    src: "/photos/sketches/trees-by-sea.jpg",
    alt: "Trees by the sea",
    tags: ["sketch"],
  },
  {
    src: "/photos/sketches/cityscape-lens.jpg",
    alt: "Cityscape through a lens",
    tags: ["sketch"],
  },
] as const satisfies ReadonlyArray<{
  readonly src: string;
  readonly alt: string;
  readonly tags: readonly string[];
}>;
