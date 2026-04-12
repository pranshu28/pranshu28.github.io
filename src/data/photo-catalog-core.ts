/**
 * Curated hero rasters under `public/photos/core/`. Listed before sketches and frames in
 * `PHOTO_CATALOG` so place albums surface these first.
 */
export const CORE_PHOTO_CATALOG = [
  {
    src: "/photos/core/machu-picchu-mist.jpg",
    alt: "Machu Picchu",
    tags: ["peru", "wonder", "travel"],
  },
  {
    src: "/photos/core/rainbow-mountain.jpg",
    alt: "Rainbow Mountain",
    tags: ["peru", "travel", "hiking"],
  },
  {
    src: "/photos/core/red-valley-peru.jpg",
    alt: "Red Valley",
    tags: ["peru", "travel", "hiking"],
  },
  {
    src: "/photos/core/sacred-valley-peru.jpg",
    alt: "Sacred Valley",
    tags: ["peru", "travel"],
  },
  {
    src: "/photos/core/colosseum-rome.jpg",
    alt: "Inside the Colosseum, Rome",
    tags: ["italy", "wonder", "travel"],
  },
  {
    src: "/photos/core/cinque-terre.jpg",
    alt: "Cinque Terre",
    tags: ["italy", "travel"],
  },
  {
    src: "/photos/core/venice-canal.jpg",
    alt: "Murano canal, Venice",
    tags: ["italy", "travel"],
  },
  {
    src: "/photos/core/leaning-tower-pisa.jpg",
    alt: "Leaning Tower of Pisa",
    tags: ["italy", "travel"],
  },
  {
    src: "/photos/core/taj-mahal.jpg",
    alt: "Taj Mahal",
    tags: ["india", "wonder", "travel"],
  },
  {
    src: "/photos/core/desert-sunset.jpg",
    alt: "Sunset over Thar Desert",
    tags: ["india", "travel"],
  },
  {
    src: "/photos/core/himalayas-meadow.jpg",
    alt: "Mountain meadow, Himalayas",
    tags: ["india", "travel", "hiking"],
  },
  {
    src: "/photos/core/chichen-itza.jpg",
    alt: "Chichén Itzá",
    tags: ["mexico", "wonder", "travel"],
  },
  {
    src: "/photos/core/mountain-sunset.jpg",
    alt: "Sunrise",
    tags: ["costa-rica", "travel"],
  },
  {
    src: "/photos/core/costa-rica-rainforest.jpg",
    alt: "Rainforest trail",
    tags: ["costa-rica", "travel", "hiking"],
  },
  {
    src: "/photos/core/chateau-frontenac.jpg",
    alt: "Château Frontenac, Quebec City",
    tags: ["canada", "travel"],
  },
  {
    src: "/photos/core/forest-pool.jpg",
    alt: "Forest pool",
    tags: ["canada", "travel"],
  },
  {
    src: "/photos/core/montreal-sunset.jpg",
    alt: "Sunset over Montreal",
    tags: ["canada", "travel"],
  },
  {
    src: "/photos/core/nyc-skyline.jpg",
    alt: "Manhattan skyline at dusk",
    tags: ["usa", "travel"],
  },
  {
    src: "/photos/core/hawaii-beach-sunset.jpg",
    alt: "Beach sunset, Hawaiʻi",
    tags: ["usa", "travel"],
  },
] as const satisfies ReadonlyArray<{
  readonly src: string;
  readonly alt: string;
  readonly tags: readonly string[];
}>;
