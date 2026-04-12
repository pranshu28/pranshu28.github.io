/**
 * Imports from `Frame/` → run `python3 scripts/sync-frames-from-folder.py` to copy web formats
 * into `public/photos/frames/` (sibling to `photos/sketches/`). HEIC → JPEG
 * via `sips`. Skips `.mp4` / `.avif`. If both
 * `IMG_n.jpg` and `IMG_n.HEIC` exist, the raster copy wins (HEIC not exported twice).
 * `public/photos/frames/` should contain only files listed here.
 * Tag `wonder` only for clear New7 / headline UNESCO–scale landmarks in the frame (e.g. Machu Picchu,
 * Colosseum). Omit if the shot is ambiguous.
 * Tags: place key (see `PLACE_ALBUM_SPECS` / `LANDING_ALBUM_SPECS` in `photo-catalog.ts`), plus `travel`,
 * optional `hiking`, and `frames`. Do not use `nature` — it is not an album filter.
 * `hiking` only for clear trail / trek / backcountry on foot (not observation decks alone).
 * Drop redundant near-duplicate frames of the same scene (e.g. one Red Valley / Vinicunca-trek shot;
 * avoid a second frame that reads as the same ridge or mirador).
 * Alt text: describe place and scene; avoid third-person labels like “visitor” when the subject is you.
 */
export const FRAME_PHOTOS = [
  {
    src: "/photos/frames/0503549e-8280-4ff8-a086-3fa0a8d58f2d.jpg",
    alt: "Kunsthistorisches and Natural History Museum domes at night, Maria-Theresien-Platz, Vienna",
    tags: ["austria", "travel", "frames"],
  },
  {
    src: "/photos/frames/20230611-123339.jpg",
    alt: "Rocky forest trail through bright green deciduous woods",
    tags: ["canada", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/261f6472-c705-4cf0-b52b-e33462846fc2.jpg",
    alt: "Curved path through a sunlit deciduous forest with rope-lined edging",
    tags: ["austria", "travel", "frames"],
  },
  {
    src: "/photos/frames/55cf6453-4bc3-450e-a8b9-d15b53555894.jpg",
    alt: "Naples street at dusk",
    tags: ["italy", "travel", "frames"],
  },
  {
    src: "/photos/frames/92ce3525-8bf5-4828-9ce4-950afc68cd2b.jpg",
    alt: "Manhattan skyline at night looking south, with the New York Life Building and One World Trade Center",
    tags: ["usa", "travel", "frames"],
  },
  {
    src: "/photos/frames/a32eddce-58a1-4a3d-a17c-0292717362ae.jpg",
    alt: "Mountain sunset over layered ridges",
    tags: ["usa", "travel", "frames"],
  },
  {
    src: "/photos/frames/ca53e79c-8932-4b49-bc73-2bc4abae8d3a.jpg",
    alt: "Long green trellis tunnel and gravel path in formal palace gardens",
    tags: ["austria", "travel", "frames"],
  },
  {
    src: "/photos/frames/e85decfe-f4b9-495f-a35e-0e7a219ec1e2.jpg",
    alt: "St. Stephen's Cathedral (Stephansdom), Vienna — Gothic spire and patterned tile roof",
    tags: ["austria", "travel", "frames"],
  },
  {
    src: "/photos/frames/fjqq5987.jpg",
    alt: "Sunlit path through a tall deciduous forest",
    tags: ["usa", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/fnoz8370.jpg",
    alt: "Remote mountain campsite with tents at the edge of a pine forest below rocky peaks",
    tags: ["india", "travel", "hiking", "frames"],
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
    src: "/photos/frames/img-1454.jpg",
    alt: "Snow-covered city park with bare trees and winter sky",
    tags: ["canada", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-1996.jpg",
    alt: "Fallen red maple leaves on mossy grey rock in autumn",
    tags: ["canada", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-20160814-164345-hdr.jpg",
    alt: "Monsoon valley and fields, Western Ghats",
    tags: ["india", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2207.jpeg",
    alt: "Autumn trees on a campus lawn",
    tags: ["canada", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2364.jpeg",
    alt: "Waikiki beach view",
    tags: ["usa", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2445-edit.jpg",
    alt: "Beach sunset with gathering clouds",
    tags: ["usa", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2668.jpeg",
    alt: "Sunlight through a dense evergreen forest from a low angle",
    tags: ["usa", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2968.jpeg",
    alt: "Turquoise sea, rocky shore, and coastal ruins",
    tags: ["travel", "frames"],
  },
  {
    src: "/photos/frames/img-3143.jpeg",
    alt: "Cenote Ik Kil, Yucatán",
    tags: ["mexico", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-3243.jpg",
    alt: "Rock-framed overlook of a green valley, river, and distant town under a bright sky",
    tags: ["canada", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-3591.jpg",
    alt: "Rolling hills of forest in peak autumn color from above",
    tags: ["canada", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-3689.jpg",
    alt: "Wide leaf-strewn trail through autumn woods under an overcast sky",
    tags: ["canada", "travel", "hiking", "frames"],
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
    alt: "Narrow Venetian canal, stone bridge, and moored gondolas between tall façades",
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
    tags: ["italy", "travel", "wonder", "frames"],
  },
  {
    src: "/photos/frames/img-5272-original.jpg",
    alt: "Ferns and stone steps along a forest trail",
    tags: ["usa", "travel", "hiking", "frames"],
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
    tags: ["canada", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-6134.jpg",
    alt: "Rope-and-post railing above a forested valley, small lake, and rolling hills",
    tags: ["canada", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-6301.jpg",
    alt: "Fallen tree trunk over a clear green pond in forest, with a wooden walkway in the background",
    tags: ["canada", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-6683.jpg",
    alt: "Mirador Valle Rojo sign at 5045 m with the Red Valley below, Peru",
    tags: ["peru", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-6765.jpg",
    alt: "Forest-clad mountain faces and clouds in high contrast daylight",
    tags: ["peru", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-6813.jpg",
    alt: "Machu Picchu terraces and Huayna Picchu under a bright sky",
    tags: ["peru", "travel", "wonder", "frames"],
  },
  {
    src: "/photos/frames/img-6924.jpg",
    alt: "Panoramic view of rugged Andean ranges with a snow-capped peak under blue sky",
    tags: ["peru", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-6976.jpg",
    alt: "Volcanic crater with a steam plume and forested mountains beyond",
    tags: ["costa-rica", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-7045.jpg",
    alt: "Tropical waterfall plunging into a turquoise pool, framed by dense jungle foliage",
    tags: ["costa-rica", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-7059.jpg",
    alt: "Stone steps and path climbing through dense tropical rainforest with log-style railings",
    tags: ["costa-rica", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-7179.jpg",
    alt: "Orange sunset over rolling hills and distant water from an elevated wooden overlook",
    tags: ["costa-rica", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-7791.jpg",
    alt: "Deep V-shaped valley between steep green peaks and layered blue distant ranges",
    tags: ["peru", "travel", "frames"],
  },
  {
    src: "/photos/frames/p1090170-22.jpg",
    alt: "Autumn hillside forest",
    tags: ["canada", "travel", "frames"],
  },
  {
    src: "/photos/frames/p1090246-47-original.jpg",
    alt: "Summit overlook of autumn forest, lake, and distant mountains",
    tags: ["canada", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/pxl-20231001-171545947.mp-original.jpg",
    alt: "View from a wooden observation tower over peak autumn forest",
    tags: ["canada", "travel", "frames"],
  },
] as const satisfies ReadonlyArray<{
  readonly src: string;
  readonly alt: string;
  readonly tags: readonly string[];
}>;
