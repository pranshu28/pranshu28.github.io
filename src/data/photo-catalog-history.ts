/**
 * Heritage / archaeology / monuments under `public/photos/history/`.
 * HEIC sources: convert with `sips -s format jpeg IMG_nnnn.HEIC --out img-nnnn.jpg` (see frames sync).
 * Omit `.mp4` from the catalog (same as frames). JPEG paths are what the site serves.
 */
export const HISTORY_PHOTOS = [
  {
    src: "/photos/history/img-0430.jpg",
    alt: "Kuldhara ruins, Thar Desert",
    title: "Kuldhara ghost village",
    place: "Kuldhara, Rajasthan, India",
    takenAt: "2021-11-15",
    sortPlace: "india",
    sortCity: "jaisalmer",
    sortVenue: "kuldhara",
    tags: ["india", "history", "travel"],
    description: "An ancient abandoned village in Rajasthan, India - shrouded in mystery. Legend has it that the villagers mysteriously disappeared overnight, leaving behind their homes and possessions. Today, it’s known as a haunted site, with many believing the ghostly remnants of the past still linger.",
  },
  {
    src: "/photos/history/img-0673.jpg",
    alt: "Jaisalmer Fort above the old city",
    title: "Jaisalmer Fort",
    place: "Jaisalmer, Rajasthan, India",
    takenAt: "2021-11-16",
    sortPlace: "india",
    sortCity: "jaisalmer",
    sortVenue: "jaisalmer-fort-panorama",
    tags: ["india", "history", "travel"],
    description: "World's only living fort - built in the 12th century.",
  },
  {
    src: "/photos/history/img-4858.jpg",
    alt: "David replica, Piazza della Signoria, Florence",
    title: "David, Piazza della Signoria",
    place: "Florence, Italy",
    takenAt: "2024-07-29",
    sortPlace: "italy",
    sortCity: "florence",
    sortVenue: "piazza-della-signoria-david",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/history/img-4961.jpg",
    alt: "Saint Catherine sanctuary, Siena",
    title: "Saint Catherine sanctuary oratory",
    place: "Siena, Italy",
    takenAt: "2024-08-02",
    sortPlace: "italy",
    sortCity: "siena",
    sortVenue: "santuario-santa-caterina-oratorio",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/history/img-5198.jpg",
    alt: "St. Peter’s Basilica dome interior",
    title: "St. Peter’s dome",
    place: "Vatican City",
    takenAt: "2024-08-03",
    sortPlace: "italy",
    sortCity: "rome",
    sortVenue: "st-peters-dome-interior",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/history/img-5379.jpg",
    alt: "Pompeii, Regio I street",
    title: "Pompeii, Regio I",
    place: "Pompeii, Italy",
    takenAt: "2024-08-03",
    sortPlace: "italy",
    sortCity: "pompeii",
    sortVenue: "regio-i-street",
    tags: ["italy", "history", "travel", "frames"],
    description:
      "An ancient Roman city, was buried under volcanic ash and pumice after the eruption of Mount Vesuvius in 79 AD, preserving its streets, buildings, and even the people in time.",
  },
  {
    src: "/photos/history/pompeii-thermopolium.jpg",
    alt: "Thermopolium, Pompeii",
    title: "Thermopolium",
    place: "Pompeii, Italy",
    sortPlace: "italy",
    sortCity: "pompeii",
    sortVenue: "thermopolium",
    takenAt: "2024-08-03",
    tags: ["italy", "history", "travel"],
    description: "An ancient Roman fast food spot, complete with colorful frescoes and even food remains, giving a glimpse into everyday life 2,000 years ago.",
  },
] as const satisfies ReadonlyArray<{
  readonly src: string;
  readonly alt: string;
  readonly tags: readonly string[];
  readonly title?: string;
  readonly place?: string;
  readonly year?: number;
  readonly description?: string;
  readonly takenAt?: string;
  readonly sortPlace?: string;
  readonly sortCity?: string;
  readonly sortVenue?: string;
}>;
