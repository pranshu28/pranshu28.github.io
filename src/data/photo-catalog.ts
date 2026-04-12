/**
 * Single catalog: each image once, tagged for gallery filters (OR: photo appears in every
 * gallery whose `tag` is listed on it). Same pattern as tag-filtered React galleries + optional
 * `data-*` hooks on the client.
 *
 * Asset layout under `public/photos/`: `core/` (curated hero shots, `CORE_PHOTO_CATALOG`),
 * `frames/` (see `photo-catalog-frames.ts`), `sketches/`, plus `index.html` redirect to the app.
 */

import { FRAME_PHOTOS } from "./photo-catalog-frames";

export type Photo = { src: string; alt: string };

export type TaggedPhoto = {
  readonly src: string;
  readonly alt: string;
  /** Slugs; a gallery includes this photo if its `tag` is present here. */
  readonly tags: readonly string[];
};

export type Gallery = {
  id: string;
  title: string;
  cover: string;
  photos: Photo[];
};

export type ActiveGallery = {
  id: string;
  title: string;
  photos: Photo[];
  cover?: string;
};

/**
 * Order preserved for every derived gallery (filter walks this array in order).
 * Core photos first; `FRAME_PHOTOS` append (see `photo-catalog-frames.ts`).
 */
const CORE_PHOTO_CATALOG: readonly TaggedPhoto[] = [
  {
    src: "/photos/core/machu-picchu-mist.jpg",
    alt: "Machu Picchu",
    tags: ["peru", "wonder", "travel"],
  },
  {
    src: "/photos/core/rainbow-mountain.jpg",
    alt: "Rainbow Mountain",
    tags: ["peru", "travel", "hiking"],
  },
  {
    src: "/photos/core/red-valley-peru.jpg",
    alt: "Red Valley",
    tags: ["peru", "travel", "hiking"],
  },
  {
    src: "/photos/core/sacred-valley-peru.jpg",
    alt: "Sacred Valley",
    tags: ["peru", "travel"],
  },
  {
    src: "/photos/core/colosseum-rome.jpg",
    alt: "Inside the Colosseum, Rome",
    tags: ["italy", "wonder", "travel"],
  },
  {
    src: "/photos/core/cinque-terre.jpg",
    alt: "Cinque Terre",
    tags: ["italy", "travel"],
  },
  {
    src: "/photos/core/venice-canal.jpg",
    alt: "Murano canal, Venice",
    tags: ["italy", "travel"],
  },
  {
    src: "/photos/core/leaning-tower-pisa.jpg",
    alt: "Leaning Tower of Pisa",
    tags: ["italy", "travel"],
  },
  {
    src: "/photos/core/taj-mahal.jpg",
    alt: "Taj Mahal",
    tags: ["india", "wonder", "travel"],
  },
  {
    src: "/photos/core/desert-sunset.jpg",
    alt: "Sunset over Thar Desert",
    tags: ["india", "travel"],
  },
  {
    src: "/photos/core/himalayas-meadow.jpg",
    alt: "Mountain meadow, Himalayas",
    tags: ["india", "travel", "hiking"],
  },
  {
    src: "/photos/core/chichen-itza.jpg",
    alt: "Chichén Itzá",
    tags: ["mexico", "wonder", "travel"],
  },
  {
    src: "/photos/core/mountain-sunset.jpg",
    alt: "Sunrise",
    tags: ["costa-rica", "travel"],
  },
  {
    src: "/photos/core/costa-rica-rainforest.jpg",
    alt: "Rainforest trail",
    tags: ["costa-rica", "travel", "hiking"],
  },
  {
    src: "/photos/core/chateau-frontenac.jpg",
    alt: "Château Frontenac, Quebec City",
    tags: ["canada", "travel"],
  },
  {
    src: "/photos/core/forest-pool.jpg",
    alt: "Forest pool",
    tags: ["canada", "travel"],
  },
  {
    src: "/photos/core/montreal-sunset.jpg",
    alt: "Sunset over Montreal",
    tags: ["canada", "travel"],
  },
  {
    src: "/photos/core/nyc-skyline.jpg",
    alt: "Manhattan skyline at dusk",
    tags: ["usa", "travel"],
  },
  {
    src: "/photos/core/hawaii-beach-sunset.jpg",
    alt: "Beach sunset, Hawaiʻi",
    tags: ["usa", "travel"],
  },
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
];

export const PHOTO_CATALOG: readonly TaggedPhoto[] = [
  ...CORE_PHOTO_CATALOG,
  ...FRAME_PHOTOS,
];

/**
 * SmugMug-style landing: a few albums only. Each `cover` is chosen to be visually
 * distinct from the others (overlapping photos inside albums are fine).
 * Every `cover` path must be a real `src` in `PHOTO_CATALOG` with that album's `tag`
 * so the hero image also appears inside the album grid.
 */
const LANDING_ALBUM_SPECS = [
  {
    id: "sketches",
    title: "Sketching",
    tag: "sketch",
    cover: "/photos/sketches/horse.jpg",
  },
  {
    id: "hiking",
    title: "Hiking",
    tag: "hiking",
    cover: "/photos/core/rainbow-mountain.jpg",
  },
  {
    id: "travel",
    title: "Travelling",
    tag: "travel",
    cover: "/photos/frames/img-4604.jpeg",
  },
  {
    id: "wonders",
    title: "Wonders",
    tag: "wonder",
    cover: "/photos/core/taj-mahal.jpg",
  },
] as const;

/** Place / archive albums — reachable via `?g=` but not shown on the main landing grid. */
const PLACE_ALBUM_SPECS = [
  {
    id: "peru",
    title: "Peru",
    tag: "peru",
    cover: "/photos/core/machu-picchu-mist.jpg",
  },
  {
    id: "italy",
    title: "Italy",
    tag: "italy",
    cover: "/photos/core/cinque-terre.jpg",
  },
  {
    id: "india",
    title: "India",
    tag: "india",
    cover: "/photos/core/taj-mahal.jpg",
  },
  {
    id: "mexico",
    title: "Mexico",
    tag: "mexico",
    cover: "/photos/core/chichen-itza.jpg",
  },
  {
    id: "costa-rica",
    title: "Costa Rica",
    tag: "costa-rica",
    cover: "/photos/core/costa-rica-rainforest.jpg",
  },
  {
    id: "canada",
    title: "Canada",
    tag: "canada",
    cover: "/photos/core/chateau-frontenac.jpg",
  },
  {
    id: "usa",
    title: "United States",
    tag: "usa",
    cover: "/photos/core/nyc-skyline.jpg",
  },
  {
    id: "austria",
    title: "Austria",
    tag: "austria",
    cover: "/photos/frames/e85decfe-f4b9-495f-a35e-0e7a219ec1e2.jpg",
  },
  {
    id: "frames",
    title: "Frames",
    tag: "frames",
    cover: "/photos/frames/0503549e-8280-4ff8-a086-3fa0a8d58f2d.jpg",
  },
] as const;

const GALLERY_SPECS = [...LANDING_ALBUM_SPECS, ...PLACE_ALBUM_SPECS] as const;

function specToGallery(
  spec: (typeof GALLERY_SPECS)[number],
): Gallery {
  return {
    id: spec.id,
    title: spec.title,
    cover: spec.cover,
    photos: PHOTO_CATALOG.filter((p) => p.tags.includes(spec.tag)).map(
      ({ src, alt }) => ({ src, alt }),
    ),
  };
}

function buildGalleries(): Gallery[] {
  return GALLERY_SPECS.map(specToGallery);
}

const allGalleries: Gallery[] = buildGalleries();

const landingAlbums: Gallery[] = LANDING_ALBUM_SPECS.map(specToGallery);

export function getAllGalleries(): readonly Gallery[] {
  return allGalleries;
}

/** Album tiles for the main photos landing (subset of `getAllGalleries()`). */
export function getLandingAlbums(): readonly Gallery[] {
  return landingAlbums;
}

/**
 * Legacy and alias query values → canonical gallery `id`.
 * Thematic filters: `sketching` → sketches, `travelling` → travel.
 * `nature` was a removed landing album; old links open Travelling.
 */
export function normalizeGalleryParam(gParam: string | null): string | null {
  if (!gParam) return null;
  if (gParam === "hawaii") return "usa";
  if (gParam === "sketching") return "sketches";
  if (gParam === "travelling") return "travel";
  if (gParam === "nature") return "travel";
  return gParam;
}

export function resolveActiveGallery(gParam: string | null): ActiveGallery | null {
  const key = normalizeGalleryParam(gParam);
  if (!key) return null;
  const found = allGalleries.find((x) => x.id === key);
  if (!found || found.photos.length === 0) return null;
  return {
    id: found.id,
    title: found.title,
    photos: found.photos,
    cover: found.cover,
  };
}
