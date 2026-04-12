/**
 * Single catalog: each image once, tagged for gallery filters (OR: photo appears in every
 * gallery whose `tag` is listed on it). Same pattern as tag-filtered React galleries + optional
 * `data-*` hooks on the client.
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
    src: "/photos/machu-picchu-mist.jpg",
    alt: "Machu Picchu",
    tags: ["peru", "wonder", "travel", "hiking"],
  },
  {
    src: "/photos/rainbow-mountain.jpg",
    alt: "Rainbow Mountain",
    tags: ["peru", "travel", "hiking"],
  },
  {
    src: "/photos/red-valley-peru.jpg",
    alt: "Red Valley",
    tags: ["peru", "travel", "hiking"],
  },
  {
    src: "/photos/sacred-valley-peru.jpg",
    alt: "Sacred Valley",
    tags: ["peru", "travel", "hiking"],
  },
  {
    src: "/photos/andes-panorama.jpg",
    alt: "Andes mountains",
    tags: ["peru", "travel", "hiking"],
  },
  {
    src: "/photos/colosseum-rome.jpg",
    alt: "Inside the Colosseum, Rome",
    tags: ["italy", "wonder", "travel"],
  },
  {
    src: "/photos/cinque-terre.jpg",
    alt: "Cinque Terre",
    tags: ["italy", "travel", "hiking"],
  },
  {
    src: "/photos/venice-canal.jpg",
    alt: "Murano canal, Venice",
    tags: ["italy", "travel"],
  },
  {
    src: "/photos/leaning-tower-pisa.jpg",
    alt: "Leaning Tower of Pisa",
    tags: ["italy", "travel"],
  },
  {
    src: "/photos/taj-mahal.jpg",
    alt: "Taj Mahal",
    tags: ["india", "wonder", "travel"],
  },
  {
    src: "/photos/desert-sunset.jpg",
    alt: "Sunset over Thar Desert",
    tags: ["india", "travel"],
  },
  {
    src: "/photos/himalayas-forest.jpg",
    alt: "Himalayas",
    tags: ["india", "travel", "hiking"],
  },
  {
    src: "/photos/himalayas-meadow.jpg",
    alt: "Mountain meadow, Himalayas",
    tags: ["india", "travel", "hiking"],
  },
  {
    src: "/photos/chichen-itza.jpg",
    alt: "Chichén Itzá",
    tags: ["mexico", "wonder", "travel"],
  },
  {
    src: "/photos/mountain-sunset.jpg",
    alt: "Sunrise",
    tags: ["costa-rica", "travel", "hiking"],
  },
  {
    src: "/photos/costa-rica-rainforest.jpg",
    alt: "Rainforest trail",
    tags: ["costa-rica", "travel", "hiking"],
  },
  {
    src: "/photos/chateau-frontenac.jpg",
    alt: "Château Frontenac, Quebec City",
    tags: ["canada", "travel"],
  },
  {
    src: "/photos/forest-pool.jpg",
    alt: "Forest pool",
    tags: ["canada", "travel", "hiking"],
  },
  {
    src: "/photos/montreal-sunset.jpg",
    alt: "Sunset over Montreal",
    tags: ["canada", "travel"],
  },
  {
    src: "/photos/nyc-skyline.jpg",
    alt: "Manhattan skyline at dusk",
    tags: ["usa", "travel"],
  },
  {
    src: "/photos/hawaii-beach-sunset.jpg",
    alt: "Beach sunset, Hawaiʻi",
    tags: ["usa", "travel"],
  },
  {
    src: "/photos/hawaii-seashore.jpg",
    alt: "Seashore, Hawaiʻi",
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

const GALLERY_SPECS = [
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
    cover: "/photos/rainbow-mountain.jpg",
  },
  {
    id: "travel",
    title: "Travelling",
    tag: "travel",
    cover: "/photos/cinque-terre.jpg",
  },
  {
    id: "wonders",
    title: "Wonders",
    tag: "wonder",
    cover: "/photos/machu-picchu-mist.jpg",
  },
  {
    id: "peru",
    title: "Peru",
    tag: "peru",
    cover: "/photos/rainbow-mountain.jpg",
  },
  {
    id: "italy",
    title: "Italy",
    tag: "italy",
    cover: "/photos/cinque-terre.jpg",
  },
  {
    id: "india",
    title: "India",
    tag: "india",
    cover: "/photos/taj-mahal.jpg",
  },
  {
    id: "mexico",
    title: "Mexico",
    tag: "mexico",
    cover: "/photos/chichen-itza.jpg",
  },
  {
    id: "costa-rica",
    title: "Costa Rica",
    tag: "costa-rica",
    cover: "/photos/costa-rica-rainforest.jpg",
  },
  {
    id: "canada",
    title: "Canada",
    tag: "canada",
    cover: "/photos/chateau-frontenac.jpg",
  },
  {
    id: "usa",
    title: "United States",
    tag: "usa",
    cover: "/photos/nyc-skyline.jpg",
  },
  {
    id: "austria",
    title: "Austria",
    tag: "austria",
    cover: "/photos/frames/e85decfe-f4b9-495f-a35e-0e7a219ec1e2.jpg",
  },
  {
    id: "nature",
    title: "Nature",
    tag: "nature",
    cover: "/photos/frames/p1090170-22.jpg",
  },
  {
    id: "frames",
    title: "Frames",
    tag: "frames",
    cover: "/photos/frames/img-4604.jpeg",
  },
] as const;

function buildGalleries(): Gallery[] {
  return GALLERY_SPECS.map((spec) => ({
    id: spec.id,
    title: spec.title,
    cover: spec.cover,
    photos: PHOTO_CATALOG.filter((p) => p.tags.includes(spec.tag)).map(
      ({ src, alt }) => ({ src, alt }),
    ),
  }));
}

const allGalleries: Gallery[] = buildGalleries();

export function getAllGalleries(): readonly Gallery[] {
  return allGalleries;
}

/**
 * Legacy and alias query values → canonical gallery `id`.
 * Thematic filters: `sketching` → sketches, `travelling` → travel.
 */
export function normalizeGalleryParam(gParam: string | null): string | null {
  if (!gParam) return null;
  if (gParam === "hawaii") return "usa";
  if (gParam === "sketching") return "sketches";
  if (gParam === "travelling") return "travel";
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
