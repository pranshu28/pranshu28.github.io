/**
 * Single catalog: each image once, tagged for gallery filters (OR: photo appears in every
 * gallery whose `tag` is listed on it). Same pattern as tag-filtered React galleries + optional
 * `data-*` hooks on the client.
 *
 * Asset layout under `public/photos/`: `frames/` (`photo-catalog-frames.ts`),
 * `sketches/` (`photo-catalog-sketches.ts`), plus `index.html` redirect to the app.
 *
 * Live site = whatever was in the last deployed `out/` build (and CDN mirror if configured).
 * Deleting files locally does not change production until CI deploys; see `resolve-photo-src.ts`.
 */

import { FRAME_PHOTOS } from "./photo-catalog-frames";
import { SKETCH_PHOTOS } from "./photo-catalog-sketches";

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
 * Order preserved for every derived gallery (filter walks this array in order):
 * sketches first, then frames.
 */
export const PHOTO_CATALOG: readonly TaggedPhoto[] = [
  ...SKETCH_PHOTOS,
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
    cover: "/photos/frames/img-6683.jpg",
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
    cover: "/photos/frames/img-6813.jpg",
  },
] as const;

/** Place / archive albums — reachable via `?g=` but not shown on the main landing grid. */
const PLACE_ALBUM_SPECS = [
  {
    id: "peru",
    title: "Peru",
    tag: "peru",
    cover: "/photos/frames/img-6813.jpg",
  },
  {
    id: "italy",
    title: "Italy",
    tag: "italy",
    cover: "/photos/frames/img-5032.jpeg",
  },
  {
    id: "india",
    title: "India",
    tag: "india",
    cover: "/photos/frames/img-0334.jpeg",
  },
  {
    id: "mexico",
    title: "Mexico",
    tag: "mexico",
    cover: "/photos/frames/img-3143.jpeg",
  },
  {
    id: "costa-rica",
    title: "Costa Rica",
    tag: "costa-rica",
    cover: "/photos/frames/img-7059.jpg",
  },
  {
    id: "canada",
    title: "Canada",
    tag: "canada",
    cover: "/photos/frames/img-3243.jpg",
  },
  {
    id: "usa",
    title: "United States",
    tag: "usa",
    cover: "/photos/frames/92ce3525-8bf5-4828-9ce4-950afc68cd2b.jpg",
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
