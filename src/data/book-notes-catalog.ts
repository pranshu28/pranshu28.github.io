/**
 * Book notes: Medium essays are synced from RSS into `book-notes-medium.generated.json`
 * (`pnpm sync:book-notes` or automatic `pnpm build` / scheduled CI). The Goodreads CTA is appended here.
 *
 * On Medium, tag book summaries with **books** or **nonfiction**. Goodreads tile uses
 * `goodreads-collage.jpg` from `pnpm sync:goodreads-collage` (read shelf RSS, gallery-wall layout).
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

const GOODREADS_SPEC = {
  coverSrc: "/photos/book-notes/goodreads-collage.jpg",
  alt: "Goodreads, recent reads from my library",
  title: "More books in my library",
  openHref: "https://www.goodreads.com/user/show/49705608-pranshu-malviya",
  description: "Goodreads shelf.",
  takenAt: "2026-01-01",
  place: "Goodreads",
  sortVenue: "goodreads",
} as const satisfies BookNoteSpec;

export const BOOK_NOTE_SPECS: readonly BookNoteSpec[] = [
  ...(mediumGenerated as BookNoteSpec[]),
  GOODREADS_SPEC,
];
