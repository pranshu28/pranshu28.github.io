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
      "Above the terraces with Huayna Picchu behind — fourth of seven wonders for me, and the third wonder in three years.",
    sortPlace: "peru",
    sortCity: "cusco-region",
    sortVenue: "machu-picchu-citadel",
    tags: [
      "peru",
      "wonder",
      "travel",
      "hiking",
      "history",
      "machu-picchu",
      "seven-wonders",
      "inca",
      "sacred-valley",
    ],
  },
  {
    src: "/photos/core/machu-picchu-mist.jpg",
    alt: "Machu Picchu in cloud and mist",
    description:
      "Same citadel, different mood: Huayna Picchu half-lost in cloud, mist threading through the green terraces and grey walls. Soft, diffuse light — the site feels older and quieter when the peaks disappear.",
    sortPlace: "peru",
    sortCity: "cusco-region",
    sortVenue: "machu-picchu-mist",
    tags: ["peru", "travel", "hiking", "history", "machu-picchu", "cloud-forest"],
  },
  {
    src: "/photos/core/red-valley-peru.jpg",
    alt: "Red Valley",
    description:
      "Iron-red slopes cut with improbable strips of green; a thin trail zig-zags far below. After Vinicunca and the Red Valley, this was the “out of syllabus and out of breath” day — thin air and saturated color that feel almost fake until you’re standing in them.",
    sortPlace: "peru",
    sortCity: "cusco-region",
    sortVenue: "red-valley",
    tags: [
      "peru",
      "travel",
      "hiking",
      "rainbow-mountain",
      "vinicunca",
      "valle-rojo",
      "andes",
      "high-altitude",
    ],
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
    description:
      "Upper tier of the arena, railing at my knees, the hypogeum and seating bowls falling away under a saturated Roman sky. Third of seven wonders ticked — less postcard, more vertigo and scale.",
    sortPlace: "italy",
    sortCity: "rome",
    sortVenue: "colosseum-interior",
    tags: [
      "italy",
      "wonder",
      "travel",
      "history",
      "colosseum",
      "rome",
      "roman-empire",
      "seven-wonders",
      "europe",
    ],
  },
  {
    src: "/photos/core/cinque-terre.jpg",
    alt: "Cinque Terre",
    description:
      "Manarola from above: houses stacked like paint samples on the cliff, a pocket of turquoise water, boats the size of toys. The kind of coast you assume is oversold until you see how the village actually meets the sea.",
    sortPlace: "italy",
    sortCity: "la-spezia-province",
    sortVenue: "cinque-terre-coast",
    tags: ["italy", "travel", "history", "cinque-terre", "manarola", "mediterranean", "liguria"],
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
    description:
      "Temple of Kukulcán behind me, stepped stone and a wide dusty plaza, clouds piled high. Second wonder on my list — a place where artisans and sky-watchers once shared the same city; the astronomy still feels baked into the geometry.",
    sortPlace: "mexico",
    sortCity: "yucatan",
    sortVenue: "chichen-itza",
    tags: [
      "mexico",
      "wonder",
      "travel",
      "history",
      "chichen-itza",
      "maya",
      "seven-wonders",
      "yucatan",
    ],
  },
  {
    src: "/photos/core/mountain-sunset.jpg",
    alt: "Misty sunset over layered mountains and distant water, Costa Rica",
    description:
      "Layered ridges dissolving in haze; a narrow band of fire where the sun slips under the clouds and flares on distant water. One of those Pura Vida evenings on a road trip that also took us to Poás, La Fortuna, and the high forest.",
    sortPlace: "costa-rica",
    sortCity: "san-jose",
    sortVenue: "mountain-sunrise",
    tags: ["costa-rica", "travel", "hiking", "roadtrip", "pura-vida", "sunset", "cloud-forest"],
  },
  {
    src: "/photos/core/costa-rica-rainforest.jpg",
    alt: "Stone stairs and wooden railings climbing through dense green forest toward La Fortuna waterfall",
    description:
      "Stone and brick stairs climbing through wall-to-wall green — rough timber railings, damp wood, palms and ferns closing overhead. The approach to La Fortuna’s waterfall: loud humidity, nowhere to rush. Hummingbirds elsewhere on the same trip were their own miniature spectacle.",
    sortPlace: "costa-rica",
    sortCity: "la-fortuna",
    sortVenue: "rainforest-trail",
    tags: [
      "costa-rica",
      "travel",
      "hiking",
      "la-fortuna",
      "waterfall",
      "rainforest",
      "roadtrip",
      "pura-vida",
    ],
  },
  {
    src: "/photos/core/chateau-frontenac.jpg",
    alt: "Château Frontenac, Quebec City",
    description:
      "Château Frontenac from street level: red brick, stone trim, green copper roofs and turrets filling the frame against a high summer sky. Famous enough to hold a Guinness record for being photographed — easy to see why everyone raises their phone.",
    sortPlace: "canada",
    sortCity: "quebec-city",
    sortVenue: "chateau-frontenac",
    tags: [
      "canada",
      "travel",
      "history",
      "quebec-city",
      "chateau-frontenac",
      "fairmont",
      "old-quebec",
    ],
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
    description:
      "Blue hour over the grid: One World Trade Center’s spire catching the last light on the right, the gold crown of the New York Life Building glowing left of frame, and a river of windows and headlights below. Taken from high above Midtown — the same trip included Empire State and One World observatories, but this frame is the whole island at once.",
    sortPlace: "usa",
    sortCity: "new-york-city",
    sortVenue: "manhattan-dusk",
    tags: [
      "usa",
      "travel",
      "nyc",
      "manhattan",
      "skyline",
      "blue-hour",
      "one-world-trade",
      "empire-state",
    ],
  },
  {
    src: "/photos/core/hawaii-beach-sunset.jpg",
    alt: "Beach sunset, Hawaiʻi",
    description:
      "Maui at the turn of 2023: people scattered along the sand, small surf rolling in, and a strip of molten orange squeezed under heavy cloud — like the horizon was lit from below. Earlier walks on lava-rock shoreline on the same trip made every sunset here feel a little more volcanic.",
    sortPlace: "usa",
    sortCity: "hawaii",
    sortVenue: "beach-sunset",
    tags: [
      "usa",
      "travel",
      "maui",
      "hawaii",
      "beach",
      "sunset",
      "pacific",
      "new-year",
      "2023",
      "kaanapali",
      "lahaina",
      "lava",
    ],
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
