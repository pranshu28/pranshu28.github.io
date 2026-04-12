/**
 * Imports from `Frame/` → copy web formats to `public/photos/frames/` (HEIC not used in-browser).
 * `public/photos/frames/` should contain only files listed here (no extra copies in git).
 * Shape matches `TaggedPhoto` in `photo-catalog.ts` (kept separate to avoid circular imports).
 * Omits shots whose subject already appears in `CORE_PHOTO_CATALOG` (same landmark / scene), and
 * near-duplicates within the same trip/theme (one strong beach shot, one Venice icon, etc.).
 * Do not tag `wonder` here — that gallery is only the four headline landmarks in `CORE_PHOTO_CATALOG`.
 * All frames are travel captures; `hiking` only when the shot is clearly trail / trek /
 * backcountry on foot (not city views, generic peaks-at-sunset, or campus/park woods).
 */
export const FRAME_PHOTOS = [
  {
    src: "/photos/frames/0503549e-8280-4ff8-a086-3fa0a8d58f2d.jpg",
    alt: "Kunsthistorisches and Natural History Museum domes at night, Maria-Theresien-Platz, Vienna",
    tags: ["austria", "travel", "frames"],
  },
  {
    src: "/photos/frames/e85decfe-f4b9-495f-a35e-0e7a219ec1e2.jpg",
    alt: "St. Stephen's Cathedral (Stephansdom), Vienna — Gothic spire and patterned tile roof",
    tags: ["austria", "travel", "frames"],
  },
  {
    src: "/photos/frames/55cf6453-4bc3-450e-a8b9-d15b53555894.jpg",
    alt: "Naples street at dusk",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/a32eddce-58a1-4a3d-a17c-0292717362ae.jpg",
    alt: "Mountain sunset over layered ridges",
    tags: ["usa", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/djuf1669.jpg",
    alt: "Alpine meadow and peaks, Himachal Pradesh",
    tags: ["india", "nature", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/fjqq5987.jpg",
    alt: "Forest hiking portrait",
    tags: ["usa", "nature", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-0334.jpeg",
    alt: "Mehrangarh Fort, Jodhpur",
    tags: ["india", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-0414.jpeg",
    alt: "Bada Bagh cenotaphs, Jaisalmer",
    tags: ["india", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-0718.jpeg",
    alt: "Gadisar Lake pavilion, Jaisalmer",
    tags: ["india", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-20160814-164345-hdr.jpg",
    alt: "Monsoon valley and fields, Western Ghats",
    tags: ["india", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2207.jpeg",
    alt: "Autumn trees on a campus lawn",
    tags: ["canada", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2364.jpeg",
    alt: "Waikiki beach view",
    tags: ["usa", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2445.jpeg",
    alt: "Beach sunset with gathering clouds",
    tags: ["usa", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2968.jpeg",
    alt: "Turquoise sea, rocky shore, and coastal ruins",
    tags: ["nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-3143.jpeg",
    alt: "Cenote Ik Kil, Yucatán",
    tags: ["mexico", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-4604.jpeg",
    alt: "Rialto Bridge and Grand Canal, Venice",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-4722.jpeg",
    alt: "Bridge of Sighs, Venice",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-4838.jpeg",
    alt: "Florence Cathedral and Giotto's Campanile",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-5104.jpeg",
    alt: "Siena skyline and Duomo",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-5165.jpeg",
    alt: "Colosseum at night, Rome",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-5272-original.jpg",
    alt: "Ferns and forest trail portrait",
    tags: ["usa", "nature", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-5302.jpeg",
    alt: "Bramante Staircase, Vatican Museums",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-5359.jpeg",
    alt: "Pompeii victim cast",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/p1090170-22.jpg",
    alt: "Autumn hillside forest",
    tags: ["canada", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/stky6683-1-original.jpg",
    alt: "Friends in a Himalayan meadow",
    tags: ["india", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-3700-original.jpg",
    alt: "Father and child at beach sunset",
    tags: ["usa", "travel", "frames"],
  },
] as const satisfies ReadonlyArray<{
  readonly src: string;
  readonly alt: string;
  readonly tags: readonly string[];
}>;
