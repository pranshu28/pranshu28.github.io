import type { Photo } from "@/data/photo-catalog";

export type GallerySortMode = "catalog" | "place" | "date" | "random" | "az";

export function normalizeSortParam(value: string | null): GallerySortMode {
  if (
    value === "place" ||
    value === "date" ||
    value === "random" ||
    value === "az"
  ) {
    return value;
  }
  return "catalog";
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

function dateKey(photo: Photo): string {
  if (photo.takenAt) return photo.takenAt;
  const fromSrc = extractDateFromSrc(photo.src);
  return fromSrc ?? "\uFFFF";
}

/**
 * Reorders a copy of `photos`. `catalog` keeps input order. `random` is deterministic for a
 * given `randomSeed` (e.g. gallery id + `rs` query).
 */
export function sortGalleryPhotos(
  photos: readonly Photo[],
  mode: GallerySortMode,
  randomSeed: string,
): Photo[] {
  const copy = [...photos];
  switch (mode) {
    case "catalog":
      return copy;
    case "place":
      return copy.sort((a, b) => {
        const pa = a.sortPlace ?? "\uFFFF";
        const pb = b.sortPlace ?? "\uFFFF";
        if (pa !== pb) return pa.localeCompare(pb);
        return a.alt.localeCompare(b.alt);
      });
    case "date":
      return copy.sort((a, b) => {
        const da = dateKey(a);
        const db = dateKey(b);
        if (da !== db) return da.localeCompare(db);
        return a.alt.localeCompare(b.alt);
      });
    case "az":
      return copy.sort((a, b) => a.alt.localeCompare(b.alt));
    case "random":
      return seededShuffle(copy, randomSeed);
    default:
      return copy;
  }
}
