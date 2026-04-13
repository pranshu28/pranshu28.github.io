import { type Photo, photoDisplayTitle } from "@/data/photo-catalog";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function basenameFromSrc(src: string): string {
  const seg = src.split("/").pop() ?? "";
  const dot = seg.lastIndexOf(".");
  return dot > 0 ? seg.slice(0, dot) : seg;
}

function splitWords(normalized: string): string[] {
  return normalized.split(" ").filter((w) => w.length > 0);
}

/** True if Levenshtein distance is at most one (insert / delete / substitute). */
function levenshteinAtMost1(a: string, b: string): boolean {
  const la = a.length;
  const lb = b.length;
  if (la === 0 || lb === 0) return Math.max(la, lb) <= 1;
  if (Math.abs(la - lb) > 1) return false;
  let i = 0;
  while (i < la && i < lb && a.charCodeAt(i) === b.charCodeAt(i)) i++;
  if (i === la && i === lb) return true;
  if (la === lb) {
    return a.slice(i + 1) === b.slice(i + 1);
  }
  if (la + 1 === lb) {
    return a.slice(i) === b.slice(i + 1);
  }
  if (la === lb + 1) {
    return a.slice(i + 1) === b.slice(i);
  }
  return false;
}

function tokenScore(
  token: string,
  haystack: string,
  words: readonly string[],
): number {
  if (token.length === 0) return 0;
  if (haystack.includes(token)) return 92;
  for (const w of words) {
    if (w.startsWith(token) && token.length >= 2) return 68;
  }
  for (const w of words) {
    if (token.length >= 3 && w.length >= token.length && w.includes(token)) {
      return 52;
    }
    if (token.length === 2 && w.length >= 4 && w.includes(token)) return 34;
  }
  if (token.length >= 4) {
    for (const w of words) {
      if (w.length >= 3 && levenshteinAtMost1(token, w)) return 44;
    }
  }
  return 0;
}

function buildHaystack(photo: Photo): { full: string; title: string } {
  const displayTitle = normalize(photoDisplayTitle(photo));
  const parts = [
    displayTitle,
    normalize(photo.alt),
    photo.place ? normalize(photo.place) : "",
    photo.description ? normalize(photo.description) : "",
    photo.sortPlace ? normalize(photo.sortPlace.replace(/-/g, " ")) : "",
    photo.sortCity ? normalize(photo.sortCity.replace(/-/g, " ")) : "",
    photo.sortVenue ? normalize(photo.sortVenue.replace(/-/g, " ")) : "",
    photo.year != null ? String(photo.year) : "",
    photo.takenAt ? normalize(photo.takenAt) : "",
    normalize(basenameFromSrc(photo.src).replace(/[-_]/g, " ")),
  ];
  const full = normalize(parts.filter(Boolean).join(" "));
  return { full, title: displayTitle };
}

export type RankedPhoto = {
  photo: Photo;
  score: number;
  originalIndex: number;
};

/**
 * Ranks photos by text relevance (title, alt, place, description, sort slugs, filename).
 * Empty `query` returns rows in original order with score 0.
 */
export function rankPhotosForSearch(
  photos: readonly Photo[],
  query: string,
): RankedPhoto[] {
  const q = normalize(query);
  if (q.length === 0) {
    return photos.map((photo, originalIndex) => ({
      photo,
      score: 0,
      originalIndex,
    }));
  }
  const tokens = splitWords(q);
  if (tokens.length === 0) {
    return photos.map((photo, originalIndex) => ({
      photo,
      score: 0,
      originalIndex,
    }));
  }

  const ranked = photos.map((photo, originalIndex) => {
    const { full, title } = buildHaystack(photo);
    const words = splitWords(full);
    const titleWords = splitWords(title);
    let score = 0;
    if (full.includes(q)) score += 240;
    for (const t of tokens) {
      score += tokenScore(t, full, words);
      if (title.includes(t)) score += 48;
      for (const tw of titleWords) {
        if (tw.startsWith(t) && t.length >= 2) score += 28;
      }
    }
    for (let i = 0; i < tokens.length - 1; i++) {
      const a = tokens[i]!;
      const b = tokens[i + 1]!;
      const pair = `${a} ${b}`;
      if (pair.length >= 4 && full.includes(pair)) score += 62;
    }
    return { photo, score, originalIndex };
  });

  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.originalIndex - b.originalIndex;
  });

  return ranked;
}

/** Non-empty query: only matches, best-first. Empty query: full list in given order. */
export function filterPhotosBySearchQuery(
  photos: readonly Photo[],
  query: string,
): Photo[] {
  const q = normalize(query);
  if (q.length === 0) return [...photos];
  return rankPhotosForSearch(photos, query)
    .filter((x) => x.score > 0)
    .map((x) => x.photo);
}
