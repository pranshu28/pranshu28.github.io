/**
 * Book notes: Medium essays from `book-notes-medium.generated.json`, plus a Goodreads tile
 * (collage: `goodreads-collage.jpg` from `pnpm sync:goodreads-collage`). Both appear in the
 * `book-notes` gallery; reading log is also linked from Beyond Work intro copy.
 */
import mediumGenerated from "./book-notes-medium.generated.json";

export type BookNoteSpec = {
  coverSrc: string;
  alt: string;
  title: string;
  openHref: string;
  description: string;
  takenAt: string;
  /** Overrides default “Book notes — Medium” in the photo catalog. */
  place?: string;
  /** Overrides default `medium` sort slug (search / grouping). */
  sortVenue?: string;
};

export const BOOK_NOTE_MEDIUM_SPECS: readonly BookNoteSpec[] =
  mediumGenerated as BookNoteSpec[];

export const GOODREADS_READING_LOG_SPEC = {
  coverSrc: "/photos/book-notes/goodreads-collage.jpg",
  alt: "Reading log on Goodreads — shelf and recently finished books",
  title: "Reading log",
  openHref: "https://www.goodreads.com/user/show/49705608-pranshu-malviya",
  description: "Open my Goodreads profile for the full shelf (not a Medium essay).",
  takenAt: "2026-01-01",
  place: "Reading log — Goodreads",
  sortVenue: "goodreads",
} as const satisfies BookNoteSpec;

/** Medium posts + Goodreads tile for the `book-notes` gallery. */
export const BOOK_NOTE_SPECS: readonly BookNoteSpec[] = [
  ...BOOK_NOTE_MEDIUM_SPECS,
  GOODREADS_READING_LOG_SPEC,
];
