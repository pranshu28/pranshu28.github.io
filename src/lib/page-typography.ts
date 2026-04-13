/** Shared heading styles (Newsreader via `font-page-heading`). */

/** Homepage hero name */
export const heroNameClass =
  "font-page-heading text-3xl font-semibold tracking-tight sm:text-5xl xl:text-6xl/none";

/**
 * Section titles (h2): Research, Papers, Updates, Beyond Work, Education, etc.
 * Also: inline gallery sections on Beyond Work landing, legal page § headings.
 */
export const sectionHeadingClass =
  "font-page-heading text-xl font-semibold tracking-tight";

/**
 * Titled block under a section (h3): e.g. “Other projects” under Papers.
 * Same size as section titles for a flat hierarchy.
 */
export const subsectionHeadingClass =
  "font-page-heading text-foreground mb-1 text-xl font-semibold tracking-tight";

/** @deprecated Use `subsectionHeadingClass`. */
export const publicationsSubsectionHeadingClass = subsectionHeadingClass;

/** Inner pages (h1): Beyond Work hub, single album, blog list/post, privacy/terms. */
export const pageTitleClass =
  "font-page-heading text-3xl font-semibold tracking-tight md:text-4xl";
