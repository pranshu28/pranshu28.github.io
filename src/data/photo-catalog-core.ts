/**
 * Curated hero rasters under `public/photos/core/`. Listed before sketches and frames in
 * `PHOTO_CATALOG` so place albums surface these first.
 *
 * Wonders album (`wonder` tag): only your own photos here — no hotlinked or third-party image URLs.
 *
 * Set `sortPlace` (country slug), `sortCity`, and `sortVenue` on every entry so place-sort is
 * country → city → venue. Add `takenAt` (ISO) or `year` when known (EXIF or trip notes).
 */
export const CORE_PHOTO_CATALOG = [
  {
    src: "/photos/core/machu-picchu-main.jpg",
    alt: "Machu Picchu — terraces and Huayna Picchu behind",
    title: "Machu Picchu",
    place: "Sacred Valley, Peru",
    description:
      "At the citadel with Huayna Picchu behind — add or rewrite this line anytime.",
    sortPlace: "peru",
    sortCity: "cusco-region",
    sortVenue: "machu-picchu-citadel",
    tags: ["peru", "wonder", "travel", "hiking", "history"],
  },
  {
    src: "/photos/core/machu-picchu-mist.jpg",
    alt: "Machu Picchu in cloud and mist",
    sortPlace: "peru",
    sortCity: "cusco-region",
    sortVenue: "machu-picchu-mist",
    tags: ["peru", "travel", "hiking", "history"],
  },
  {
    src: "/photos/core/red-valley-peru.jpg",
    alt: "Red Valley",
    sortPlace: "peru",
    sortCity: "cusco-region",
    sortVenue: "red-valley",
    tags: ["peru", "travel", "hiking"],
  },
  {
    src: "/photos/core/sacred-valley-peru.jpg",
    alt: "Sacred Valley",
    sortPlace: "peru",
    sortCity: "sacred-valley",
    sortVenue: "urubamba-valley",
    tags: ["peru", "travel", "hiking"],
  },
  {
    src: "/photos/core/colosseum-rome.jpg",
    alt: "Inside the Colosseum, Rome",
    sortPlace: "italy",
    sortCity: "rome",
    sortVenue: "colosseum-interior",
    tags: ["italy", "wonder", "travel", "history"],
  },
  {
    src: "/photos/core/cinque-terre.jpg",
    alt: "Cinque Terre",
    sortPlace: "italy",
    sortCity: "la-spezia-province",
    sortVenue: "cinque-terre-coast",
    tags: ["italy", "travel", "history"],
  },
  {
    src: "/photos/core/venice-canal.jpg",
    alt: "Murano canal, Venice",
    sortPlace: "italy",
    sortCity: "venice",
    sortVenue: "murano-canal",
    tags: ["italy", "travel", "history"],
  },
  {
    src: "/photos/core/leaning-tower-pisa.jpg",
    alt: "Leaning Tower of Pisa",
    sortPlace: "italy",
    sortCity: "pisa",
    sortVenue: "leaning-tower",
    tags: ["italy", "travel", "history"],
  },
  {
    src: "/photos/core/taj-mahal.jpg",
    alt: "Taj Mahal",
    sortPlace: "india",
    sortCity: "agra",
    sortVenue: "taj-mahal",
    tags: ["india", "wonder", "travel", "history"],
  },
  {
    src: "/photos/core/desert-sunset.jpg",
    alt: "Sunset over Thar Desert",
    sortPlace: "india",
    sortCity: "rajasthan",
    sortVenue: "thar-desert",
    tags: ["india", "travel"],
  },
  {
    src: "/photos/core/chichen-itza.jpg",
    alt: "Chichén Itzá",
    sortPlace: "mexico",
    sortCity: "yucatan",
    sortVenue: "chichen-itza",
    tags: ["mexico", "wonder", "travel", "history"],
  },
  {
    src: "/photos/core/mountain-sunset.jpg",
    alt: "Sunrise",
    sortPlace: "costa-rica",
    sortCity: "san-jose",
    sortVenue: "mountain-sunrise",
    tags: ["costa-rica", "travel", "hiking"],
  },
  {
    src: "/photos/core/costa-rica-rainforest.jpg",
    alt: "Rainforest trail",
    sortPlace: "costa-rica",
    sortCity: "la-fortuna",
    sortVenue: "rainforest-trail",
    tags: ["costa-rica", "travel", "hiking"],
  },
  {
    src: "/photos/core/chateau-frontenac.jpg",
    alt: "Château Frontenac, Quebec City",
    sortPlace: "canada",
    sortCity: "quebec-city",
    sortVenue: "chateau-frontenac",
    tags: ["canada", "travel", "history"],
  },
  {
    src: "/photos/core/forest-pool.jpg",
    alt: "Forest pool",
    sortPlace: "canada",
    sortCity: "vancouver",
    sortVenue: "forest-pool",
    tags: ["canada", "travel"],
  },
  {
    src: "/photos/core/montreal-sunset.jpg",
    alt: "Sunset over Montreal",
    sortPlace: "canada",
    sortCity: "montreal",
    sortVenue: "sunset-skyline",
    tags: ["canada", "travel"],
  },
  {
    src: "/photos/core/nyc-skyline.jpg",
    alt: "Manhattan skyline at dusk",
    sortPlace: "usa",
    sortCity: "new-york-city",
    sortVenue: "manhattan-dusk",
    tags: ["usa", "travel"],
  },
  {
    src: "/photos/core/hawaii-beach-sunset.jpg",
    alt: "Beach sunset, Hawaiʻi",
    sortPlace: "usa",
    sortCity: "hawaii",
    sortVenue: "beach-sunset",
    tags: ["usa", "travel"],
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
