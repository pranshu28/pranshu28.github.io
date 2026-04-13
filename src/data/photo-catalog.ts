/**
 * Single catalog: each image once, tagged for gallery filters (OR: photo appears in every
 * gallery whose `tag` is listed on it). Same pattern as tag-filtered React galleries + optional
 * `data-*` hooks on the client.
 *
 * Per-image metadata (all optional on `TaggedPhoto`): `title`, `place`, `year`, `description`,
 * `takenAt` (ISO `YYYY-MM-DD`).
 * Display `place` on `Photo` is built in **country — city/region** order: explicit `place` is
 * normalized (e.g. `City, Country` → `Country — City`), or derived from `sortPlace` / tags + `sortCity`.
 * Place sort uses three slugs (lowercase, hyphenated): `sortPlace` (country), `sortCity`,
 * `sortVenue` (POI). Set all three on each catalog photo; if `sortPlace` is omitted, the first
 * matching place tag is used. Omit city/venue only when unknown — those keys sort last within the country.
 * Keep `alt` short for accessibility; put longer copy in `description`.
 *
 * Asset layout under `public/photos/`: `core/`, `frames/`, `sketches/`, `history/`
 * (`photo-catalog-history.ts`), plus `index.html`.
 *
 * Live site = whatever was in the last deployed `out/` build (and CDN mirror if configured).
 * Deleting files locally does not change production until CI deploys; see `resolve-photo-src.ts`.
 */

import { BOOK_NOTE_SPECS } from "./book-notes-catalog";
import { CORE_PHOTO_CATALOG } from "./photo-catalog-core";
import { FRAME_PHOTOS } from "./photo-catalog-frames";
import { HISTORY_PHOTOS } from "./photo-catalog-history";
import { SKETCH_PHOTOS } from "./photo-catalog-sketches";

export type Photo = {
  src: string;
  /** When set, grid opens this URL (e.g. Medium) instead of the photo lightbox. */
  openHref?: string;
  /** Short accessibility text on `<img alt>`; keep concise even if `title` / `description` exist. */
  alt: string;
  /** Short headline in the lightbox (e.g. place-forward or editorial title). */
  title?: string;
  /** Human-readable location for display (country first, e.g. "Peru — Cusco region"). */
  place?: string;
  /** Calendar year when known (sorting uses `takenAt` first, then `year` as Jan 1, then filename heuristics). */
  year?: number;
  /** Longer caption (your edits on top of any draft text). */
  description?: string;
  /** ISO YYYY-MM-DD when known (preferred over `year` for date sort). */
  takenAt?: string;
  /** Country slug for place sort (e.g. `peru`); optional, inferred from tags when missing. */
  sortPlace?: string;
  /** City or region slug (e.g. `rome`, `cusco-region`); optional. */
  sortCity?: string;
  /** Exact place / POI slug (e.g. `colosseum-interior`); optional. */
  sortVenue?: string;
};

export type TaggedPhoto = {
  readonly src: string;
  readonly alt: string;
  /** Slugs; a gallery includes this photo if its `tag` is present here. */
  readonly tags: readonly string[];
  readonly title?: string;
  readonly place?: string;
  readonly year?: number;
  readonly description?: string;
  readonly takenAt?: string;
  readonly sortPlace?: string;
  readonly sortCity?: string;
  readonly sortVenue?: string;
};

/** First matching tag wins when building `Photo.sortPlace`. */
const PLACE_TAGS_FOR_SORT: readonly string[] = [
  "austria",
  "brazil",
  "canada",
  "china",
  "costa-rica",
  "india",
  "italy",
  "jordan",
  "mexico",
  "peru",
  "usa",
];

function inferSortPlace(tags: readonly string[]): string | undefined {
  for (const p of PLACE_TAGS_FOR_SORT) {
    if (tags.includes(p)) return p;
  }
  return undefined;
}

/** English labels for `sortPlace` slugs (and `unknown-travel` when country tags are absent). */
const PLACE_SLUG_LABEL: Record<string, string> = {
  austria: "Austria",
  brazil: "Brazil",
  canada: "Canada",
  china: "China",
  "costa-rica": "Costa Rica",
  india: "India",
  italy: "Italy",
  jordan: "Jordan",
  mexico: "Mexico",
  peru: "Peru",
  usa: "United States",
  "unknown-travel": "Various places",
  books: "Books",
};

function titleCaseFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/** `Town, Country` or `A, B, Country` → `Country — …` when the last comma segment is `country`. */
function reorderTrailingCommaCountry(
  explicit: string,
  country: string,
): string | null {
  const parts = explicit.split(",").map((s) => s.trim());
  if (parts.length < 2) return null;
  const last = parts[parts.length - 1]!;
  if (last.toLowerCase() !== country.toLowerCase()) return null;
  const rest = parts.slice(0, -1).join(", ");
  return `${country} — ${rest}`;
}

function normalizeExplicitPlaceCountryFirst(
  explicit: string,
  country: string,
): string {
  const reordered = reorderTrailingCommaCountry(explicit, country);
  if (reordered) return reordered;
  const lower = explicit.toLowerCase();
  const c = country.toLowerCase();
  if (
    lower.startsWith(`${c} —`) ||
    lower.startsWith(`${c},`) ||
    lower === c
  ) {
    return explicit;
  }
  return `${country} — ${explicit}`;
}

function computedDisplayPlace(
  p: TaggedPhoto,
  sortPlace: string | undefined,
): string | undefined {
  if (sortPlace === "unknown-travel") {
    const city =
      p.sortCity && p.sortCity !== "unknown"
        ? titleCaseFromSlug(p.sortCity)
        : undefined;
    return city ? `Various places — ${city}` : "Various places";
  }

  const country = sortPlace
    ? (PLACE_SLUG_LABEL[sortPlace] ?? titleCaseFromSlug(sortPlace))
    : undefined;
  const explicit = p.place?.trim();
  if (explicit) {
    if (country) return normalizeExplicitPlaceCountryFirst(explicit, country);
    return explicit;
  }
  if (!country) return undefined;
  const city =
    p.sortCity && p.sortCity !== "unknown"
      ? titleCaseFromSlug(p.sortCity)
      : undefined;
  return city ? `${country} — ${city}` : country;
}

function toGalleryPhoto(p: TaggedPhoto): Photo {
  const sortPlace = p.sortPlace ?? inferSortPlace(p.tags);
  return {
    src: p.src,
    openHref: undefined,
    alt: p.alt,
    title: p.title,
    place: computedDisplayPlace(p, sortPlace),
    year: p.year,
    description: p.description,
    takenAt: p.takenAt,
    sortPlace,
    sortCity: p.sortCity,
    sortVenue: p.sortVenue,
  };
}

function bookNotesAsPhotos(): Photo[] {
  return BOOK_NOTE_SPECS.map((b) => ({
    src: b.coverSrc,
    openHref: b.openHref,
    alt: b.alt,
    title: b.title,
    place: b.place ?? "Book notes — Medium",
    description: b.description,
    takenAt: b.takenAt,
    sortPlace: "books",
    sortCity: "notes",
    sortVenue: b.sortVenue ?? "medium",
  }));
}

/** Lightbox / UI headline: `title` when set, otherwise `alt`. */
export function photoDisplayTitle(p: Pick<Photo, "alt" | "title">): string {
  const t = p.title?.trim();
  return t && t.length > 0 ? t : p.alt;
}

/** Sort / A–Z key: `title` when set, otherwise `alt`. */
export function photoSortLabel(p: Pick<Photo, "alt" | "title">): string {
  return photoDisplayTitle(p);
}

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
 * core → sketches → frames → history.
 */
export const PHOTO_CATALOG: readonly TaggedPhoto[] = [
  ...CORE_PHOTO_CATALOG,
  ...SKETCH_PHOTOS,
  ...FRAME_PHOTOS,
  ...HISTORY_PHOTOS,
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
    title: "Sketches",
    tag: "sketch",
    cover: "/photos/sketches/horse.jpg",
  },
  {
    id: "book-notes",
    title: "Book notes",
    tag: "__book_notes__",
    cover: "/photos/book-notes/goodreads-collage.jpg",
  },
  {
    id: "hiking",
    title: "Hiking",
    tag: "hiking",
    cover: "/photos/core/red-valley-peru.jpg",
  },
  {
    id: "history",
    title: "History",
    tag: "history",
    cover: "/photos/history/img-5198.jpg",
  },
  {
    id: "wonders",
    /** Classic seven; bump counts when you add another. NBSPs reduce awkward line breaks in tiles. */
    title: "Wonders:\u00A04/7\u00A0\u2713",
    tag: "wonder",
    cover: "/photos/core/taj-mahal.jpg",
  },
  {
    id: "travel",
    title: "All photos",
    /** Filtered in `specToGallery`: all photos except `sketch` (main feed on the Beyond work page). */
    tag: "travel",
    cover: "/photos/frames/img-4604.jpeg",
  },
] as const;

/** Nav tiles on `/beyond-work/`; main `travel` grid is embedded below on the same page. */
export const LANDING_NAV_ALBUM_IDS = [
  "sketches",
  "book-notes",
  "hiking",
  "history",
  "wonders",
] as const;

/** Only `travel` is embedded on `/beyond-work`; other landing albums open full-page (`?g=`). */
export const INLINE_LANDING_GALLERY_IDS: readonly string[] = ["travel"];

/** Place / archive albums — reachable via `?g=` but not shown on the main landing grid. */
const PLACE_ALBUM_SPECS = [
  {
    id: "peru",
    title: "Peru",
    tag: "peru",
    cover: "/photos/core/machu-picchu-main.jpg",
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

/** Same `src` only once per gallery (defensive; catalog should already be unique). */
function dedupeTaggedPhotosBySrc(
  photos: readonly TaggedPhoto[],
): TaggedPhoto[] {
  const out: TaggedPhoto[] = [];
  const seen = new Set<string>();
  for (const p of photos) {
    if (seen.has(p.src)) continue;
    seen.add(p.src);
    out.push(p);
  }
  return out;
}

function specToGallery(
  spec: (typeof GALLERY_SPECS)[number],
): Gallery {
  if (spec.id === "book-notes") {
    return {
      id: spec.id,
      title: spec.title,
      cover: spec.cover,
      photos: bookNotesAsPhotos(),
    };
  }
  const raw =
    spec.id === "travel"
      ? PHOTO_CATALOG.filter((p) => !p.tags.includes("sketch"))
      : PHOTO_CATALOG.filter((p) => p.tags.includes(spec.tag));
  const photos = dedupeTaggedPhotosBySrc(raw);
  return {
    id: spec.id,
    title: spec.title,
    cover: spec.cover,
    photos: photos.map(toGalleryPhoto),
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

/** Nav row on photos: Sketches, Book notes, Hiking, History, Wonders (travel grid is separate below). */
export function getNavLandingAlbums(): readonly Gallery[] {
  const byId = new Map(landingAlbums.map((g) => [g.id, g]));
  return LANDING_NAV_ALBUM_IDS.map((id) => byId.get(id)).filter(
    (g): g is Gallery => g != null,
  );
}

/**
 * Legacy and alias query values → canonical gallery `id`.
 * Thematic filters: `sketching` → sketches, `travelling` → travel (Gallery album).
 * `nature` was a removed landing album; old links open Gallery (`?g=travel`).
 */
export function normalizeGalleryParam(gParam: string | null): string | null {
  if (!gParam) return null;
  if (gParam === "hawaii") return "usa";
  if (gParam === "sketching") return "sketches";
  if (gParam === "travelling") return "travel";
  if (gParam === "nature") return "travel";
  return gParam;
}

export function usesCombinedPhotosLayout(gParam: string | null): boolean {
  const g = normalizeGalleryParam(gParam);
  if (g === null) return true;
  return INLINE_LANDING_GALLERY_IDS.includes(g);
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
