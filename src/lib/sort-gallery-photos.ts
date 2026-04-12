import { type Photo, photoSortLabel } from "@/data/photo-catalog";

export type GallerySortMode = "place" | "date" | "random";

/** Default album order is shuffle (`random`). Legacy `catalog` / `az` URLs map to shuffle. */
export function normalizeSortParam(value: string | null): GallerySortMode {
  if (value === "place" || value === "date" || value === "random") {
    return value;
  }
  return "random";
}

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededShuffle<T>(items: T[], seed: string): T[] {
  const arr = [...items];
  let state = hashSeed(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0;
    const j = state % (i + 1);
    const t = arr[i];
    arr[i] = arr[j]!;
    arr[j] = t!;
  }
  return arr;
}

function extractDateFromSrc(src: string): string | undefined {
  const compact = src.match(/(\d{4})(\d{2})(\d{2})/);
  if (compact) return `${compact[1]}-${compact[2]}-${compact[3]}`;
  const dashed = src.match(/\b(\d{4}-\d{2}-\d{2})\b/);
  return dashed?.[1];
}

const UNKNOWN_DATE = "\uFFFF";

function dateKey(photo: Photo): string {
  if (photo.takenAt) return photo.takenAt;
  if (photo.year != null && Number.isFinite(photo.year)) {
    return `${photo.year}-01-01`;
  }
  const fromSrc = extractDateFromSrc(photo.src);
  return fromSrc ?? UNKNOWN_DATE;
}

/** Newest first; photos with no date sort last. */
function compareDateDesc(da: string, db: string): number {
  const ua = da === UNKNOWN_DATE;
  const ub = db === UNKNOWN_DATE;
  if (ua && ub) return 0;
  if (ua) return 1;
  if (ub) return -1;
  return db.localeCompare(da);
}

function comparePlaceTieBreak(a: Photo, b: Photo): number {
  const pa = a.sortPlace ?? "\uFFFF";
  const pb = b.sortPlace ?? "\uFFFF";
  if (pa !== pb) return pa.localeCompare(pb);
  const ca = a.sortCity ?? "\uFFFF";
  const cb = b.sortCity ?? "\uFFFF";
  if (ca !== cb) return ca.localeCompare(cb);
  const va = a.sortVenue ?? "\uFFFF";
  const vb = b.sortVenue ?? "\uFFFF";
  if (va !== vb) return va.localeCompare(vb);
  return photoSortLabel(a).localeCompare(photoSortLabel(b));
}

/**
 * Reorders a copy of `photos`. `random` is deterministic for a given `randomSeed`
 * (e.g. gallery id + `rs` query).
 *
 * **Place:** country → city → venue → date (newest first) → title/alt.
 * **Date:** date (newest first) → country → city → venue → title/alt.
 */
export function sortGalleryPhotos(
  photos: readonly Photo[],
  mode: GallerySortMode,
  randomSeed: string,
): Photo[] {
  const copy = [...photos];
  switch (mode) {
    case "place":
      return copy.sort((a, b) => {
        const pa = a.sortPlace ?? "\uFFFF";
        const pb = b.sortPlace ?? "\uFFFF";
        if (pa !== pb) return pa.localeCompare(pb);
        const ca = a.sortCity ?? "\uFFFF";
        const cb = b.sortCity ?? "\uFFFF";
        if (ca !== cb) return ca.localeCompare(cb);
        const va = a.sortVenue ?? "\uFFFF";
        const vb = b.sortVenue ?? "\uFFFF";
        if (va !== vb) return va.localeCompare(vb);
        const d = compareDateDesc(dateKey(a), dateKey(b));
        if (d !== 0) return d;
        return photoSortLabel(a).localeCompare(photoSortLabel(b));
      });
    case "date":
      return copy.sort((a, b) => {
        const da = dateKey(a);
        const db = dateKey(b);
        const dc = compareDateDesc(da, db);
        if (dc !== 0) return dc;
        return comparePlaceTieBreak(a, b);
      });
    case "random":
      return seededShuffle(copy, randomSeed);
    default:
      return seededShuffle(copy, randomSeed);
  }
}
