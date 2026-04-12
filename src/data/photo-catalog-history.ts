/**
 * Heritage / archaeology / monuments under `public/photos/history/`.
 * HEIC sources: convert with `sips -s format jpeg IMG_nnnn.HEIC --out img-nnnn.jpg` (see frames sync).
 * Omit `.mp4` from the catalog (same as frames). JPEG paths are what the site serves.
 */
export const HISTORY_PHOTOS = [
  {
    src: "/photos/history/img-0430.jpg",
    alt: "Ruins of Kuldhara abandoned village from above, sandstone walls in the Thar Desert",
    title: "Kuldhara ghost village",
    place: "Kuldhara, Rajasthan, India",
    description:
      "Dry stone lanes and roofless rooms seen from above — a Paliwal village near Jaisalmer empty since the early 1800s. Thirteenth-century prosperity, then abandonment: maybe drought and hardship, maybe, as local story goes, pressure from minister Salim Singh. Over time the silence turned into ghost lore; from the ridge it mostly reads as wind and geometry.",
    takenAt: "2021-11-15",
    sortPlace: "india",
    sortCity: "jaisalmer",
    sortVenue: "kuldhara",
    tags: ["india", "history", "travel"],
  },
  {
    src: "/photos/history/img-0673.jpg",
    alt: "Panoramic view of Jaisalmer Fort on Trikuta Hill above the golden city",
    title: "Jaisalmer Fort",
    place: "Jaisalmer, Rajasthan, India",
    description:
      "Sonar Quila — one of the few living forts; UNESCO World Heritage with the old town below.",
    takenAt: "2021-11-16",
    sortPlace: "india",
    sortCity: "jaisalmer",
    sortVenue: "jaisalmer-fort-panorama",
    tags: ["india", "history", "travel"],
  },
  {
    src: "/photos/history/img-4858.jpg",
    alt: "Michelangelo’s David replica in Piazza della Signoria, Palazzo Vecchio behind",
    title: "David, Piazza della Signoria",
    place: "Florence, Italy",
    takenAt: "2024-07-28",
    sortPlace: "italy",
    sortCity: "florence",
    sortVenue: "piazza-della-signoria-david",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/history/img-4961.jpg",
    alt: "Oratorio della Cucina, frescoed chapel in the Sanctuary of Saint Catherine, Siena",
    title: "Saint Catherine sanctuary oratory",
    place: "Siena, Italy",
    takenAt: "2024-07-30",
    sortPlace: "italy",
    sortCity: "siena",
    sortVenue: "santuario-santa-caterina-oratorio",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/history/img-5198.jpg",
    alt: "Interior of the dome of St. Peter’s Basilica, golden mosaics and Latin inscription",
    title: "St. Peter’s dome",
    place: "Vatican City",
    description:
      "Mosaic drum completed under Sixtus V (completed 1590); lantern above the crossing of the basilica.",
    takenAt: "2024-08-03",
    sortPlace: "italy",
    sortCity: "rome",
    sortVenue: "st-peters-dome-interior",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/history/img-5379.jpg",
    alt: "Cobblestone street in Pompeii, Regio I, stepping stones and brick ruins under blue sky",
    title: "Pompeii, Regio I",
    place: "Pompeii, Italy",
    description:
      "Regio I: stepping stones across a cobbled street, brick and plaster ruins catching hard Italian sun. Vesuvius sits on the horizon — the same mountain that buried the town under meters of ash in 79 CE, freezing streets like this one. The rest of the day wandered from plaster bodies to a thermopolium counter, fresco fragments, the big theatre, and chariot ruts — a checklist that still feels like one continuous afternoon.",
    takenAt: "2024-08-04",
    sortPlace: "italy",
    sortCity: "pompeii",
    sortVenue: "regio-i-street",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/history/pompeii-thermopolium.jpg",
    alt: "Roman thermopolium counter with dolia sockets and amphorae, Pompeii",
    title: "Thermopolium",
    place: "Pompeii, Italy",
    description:
      "Stone counter punched with jar sockets, amphorae stacked in the corner — a Roman lunch counter. The Pompeii street above has stepping stones; down here it’s ordinary appetite made permanent.",
    sortPlace: "italy",
    sortCity: "pompeii",
    sortVenue: "thermopolium",
    tags: ["italy", "history", "travel"],
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
