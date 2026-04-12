/**
 * Imports from `Frame/` → run `python3 scripts/sync-frames-from-folder.py` to copy web formats
 * into `public/photos/frames/` (HEIC → JPEG via `sips`). `public/photos/frames/` should contain
 * only files listed here (no orphan binaries in git).
 * Shape matches `TaggedPhoto` in `photo-catalog.ts` (kept separate to avoid circular imports).
 * Do not tag `wonder` here — that gallery is only the four headline landmarks in `CORE_PHOTO_CATALOG`.
 * All frames are travel captures; `hiking` only when the shot is clearly trail / trek /
 * backcountry on foot (not city views, generic peaks-at-sunset, or observation decks alone).
 */
export const FRAME_PHOTOS = [
  {
    src: "/photos/frames/0503549e-8280-4ff8-a086-3fa0a8d58f2d.jpg",
    alt: "Kunsthistorisches and Natural History Museum domes at night, Maria-Theresien-Platz, Vienna",
    tags: ["austria", "travel", "frames"],
  },
  {
    src: "/photos/frames/1a50ce1b-c251-4152-870a-569cf742b99a.jpg",
    alt: "Visitor in front of the Colosseum interior ruins and hypogeum, Rome, under a bright blue sky",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/53c64963-f68c-42d5-82b0-6e7af9b274b4.jpg",
    alt: "Visitor on the lawn of Piazza dei Miracoli with the Pisa Cathedral and Leaning Tower, Italy",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/55cf6453-4bc3-450e-a8b9-d15b53555894.jpg",
    alt: "Naples street at dusk",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/6c2730b1-3e6b-4f3d-ba8c-be5531d19be7-2.jpg",
    alt: "Low-angle view of Fairmont Le Château Frontenac, Quebec City, with green copper roofs and red brick",
    tags: ["canada", "travel", "frames"],
  },
  {
    src: "/photos/frames/92ce3525-8bf5-4828-9ce4-950afc68cd2b.jpg",
    alt: "Manhattan skyline at night looking south, with the New York Life Building and One World Trade Center",
    tags: ["usa", "travel", "frames"],
  },
  {
    src: "/photos/frames/a32eddce-58a1-4a3d-a17c-0292717362ae.jpg",
    alt: "Mountain sunset over layered ridges",
    tags: ["usa", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/b565410c-2c36-4d9e-b894-df7b1bb0301b.jpg",
    alt: "Rainbow Mountain (Vinicunca) stripes with a visitor arms outstretched on a high-altitude path, Peru",
    tags: ["peru", "nature", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/djuf1669.jpg",
    alt: "Alpine meadow and peaks, Himachal Pradesh",
    tags: ["india", "nature", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/e85decfe-f4b9-495f-a35e-0e7a219ec1e2.jpg",
    alt: "St. Stephen's Cathedral (Stephansdom), Vienna — Gothic spire and patterned tile roof",
    tags: ["austria", "travel", "frames"],
  },
  {
    src: "/photos/frames/f49152c0-87da-478a-b842-b88106cdc466.jpg",
    alt: "Canal in Venice with colorful façades, moored boats, and reflections under a clear sky",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/fjqq5987.jpg",
    alt: "Forest hiking portrait",
    tags: ["usa", "nature", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/fnoz8370.jpg",
    alt: "Remote mountain campsite with tents at the edge of a pine forest below rocky peaks",
    tags: ["india", "nature", "travel", "hiking", "frames"],
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
    src: "/photos/frames/img-0469-edit.jpg",
    alt: "Sunset over rippled sand dunes in the Thar Desert with figures on a distant ridge",
    tags: ["india", "nature", "travel", "frames"],
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
    src: "/photos/frames/img-2366.jpeg",
    alt: "Pastel sunset over turquoise shallows and a sandy shore",
    tags: ["usa", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2445-edit.jpg",
    alt: "Beach sunset with gathering clouds",
    tags: ["usa", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2668.jpeg",
    alt: "Sunlight through a dense evergreen forest from a low angle",
    tags: ["usa", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2968.jpeg",
    alt: "Turquoise sea, rocky shore, and coastal ruins",
    tags: ["nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-3066.jpg",
    alt: "Visitor in front of El Castillo (Temple of Kukulcán), Chichén Itzá, Mexico",
    tags: ["mexico", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-3143.jpeg",
    alt: "Cenote Ik Kil, Yucatán",
    tags: ["mexico", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-3176.jpeg",
    alt: "Tropical beach with palm tree, wooden pier, and turquoise water under a bright sky",
    tags: ["usa", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-3691.jpeg",
    alt: "Silhouetted trees and green ground cover at a coastal sunset over the ocean",
    tags: ["usa", "nature", "travel", "frames"],
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
    src: "/photos/frames/img-4786.jpeg",
    alt: "View from a gondola on a narrow Venetian canal toward a stone bridge and another gondola",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-4838.jpeg",
    alt: "Florence Cathedral and Giotto's Campanile",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-5032.jpeg",
    alt: "Manarola, Cinque Terre — colorful houses on cliffs above the Mediterranean",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-5053.jpg",
    alt: "Visitor at a wooden railing above Manarola, Cinque Terre, and turquoise cove water",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-5104.jpeg",
    alt: "Siena skyline and Duomo",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-5109.jpeg",
    alt: "Siena Cathedral facade — white and green marble stripes and rose window under blue sky",
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
    src: "/photos/frames/img-5448.jpeg",
    alt: "Sunset light on balconied apartment buildings in a European city street",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-6088.jpg",
    alt: "Layered sunset clouds over a silhouetted city skyline and treetops",
    tags: ["canada", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-6301.jpg",
    alt: "Fallen tree trunk over a clear green pond in forest, with a wooden walkway in the background",
    tags: ["canada", "nature", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-6663.jpg",
    alt: "Snow-capped Andean peak with hikers on winding trails in the arid foreground",
    tags: ["peru", "nature", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-6688.jpg",
    alt: "Red Valley, Peru — rust-red slopes, green patches, and a winding trail under cumulus clouds",
    tags: ["peru", "nature", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-6813.jpg",
    alt: "Visitor at Machu Picchu with terraces and Huayna Picchu under a bright sky",
    tags: ["peru", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-6882-edit.jpg",
    alt: "Machu Picchu ruins and terraces in mist with Huayna Picchu behind",
    tags: ["peru", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-6924.jpg",
    alt: "Panoramic view of rugged Andean ranges with a snow-capped peak under blue sky",
    tags: ["peru", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-6976.jpg",
    alt: "Visitor at a railing above a volcanic crater with steam and distant green mountains",
    tags: ["costa-rica", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-7059.jpg",
    alt: "Stone steps and path climbing through dense tropical rainforest with log-style railings",
    tags: ["costa-rica", "nature", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-7179.jpg",
    alt: "Orange sunset over rolling hills and distant water from an elevated wooden overlook",
    tags: ["costa-rica", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/p1090170-22.jpg",
    alt: "Autumn hillside forest",
    tags: ["canada", "nature", "travel", "frames"],
  },
  {
    src: "/photos/frames/pxl-20231001-171545947.mp-original.jpg",
    alt: "Visitor on a wooden observation deck above a vast forest in peak autumn color",
    tags: ["canada", "nature", "travel", "frames"],
  },
] as const satisfies ReadonlyArray<{
  readonly src: string;
  readonly alt: string;
  readonly tags: readonly string[];
}>;
