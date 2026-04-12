/**
 * Imports from `Frame/` → run `python3 scripts/sync-frames-from-folder.py` to copy web formats
 * into `public/photos/frames/` (sibling to `photos/core/` and `photos/sketches/`). HEIC → JPEG
 * via `sips`. Skips `.mp4` / `.avif`. If both
 * `IMG_n.jpg` and `IMG_n.HEIC` exist, the raster copy wins (HEIC not exported twice).
 * `public/photos/frames/` should contain only files listed here. After syncing from `Frame/`, the
 * set of files on disk and this list must match (see `scripts/sync-frames-from-folder.py`).
 * Do not tag `wonder` here — wonders live in `photo-catalog-core.ts` (your shots only).
 * `hiking` only for clear trail / trek / backcountry on foot (not observation decks alone).
 * If a frame repeats a `CORE_PHOTO_CATALOG` landmark or the same scene (e.g. second Machu Picchu,
 * second NYC skyline), **omit it from this list** — keep the `core/` shot as the canonical copy.
 * Alt text: describe place and scene; avoid third-person labels like “visitor” when the subject is you.
 *
 * Every entry sets `sortPlace` (country slug), `sortCity`, and `sortVenue` for place-sort
 * (country → city → venue). Add `takenAt` / `year` from EXIF or when the filename encodes a date
 * (`YYYYMMDD`); otherwise omit until you have a reliable date.
 */
export const FRAME_PHOTOS = [
  {
    src: "/photos/frames/0503549e-8280-4ff8-a086-3fa0a8d58f2d.jpg",
    alt: "Kunsthistorisches and Natural History Museum domes at night, Maria-Theresien-Platz, Vienna",
    description:
      "Maria-Theresien-Platz after hours: the twin museum domes lit like lanterns, façades in warm stone, traffic reduced to light trails.",
    sortPlace: "austria",
    sortCity: "vienna",
    sortVenue: "maria-theresien-platz-museums",
    tags: ["austria", "history", "travel", "frames", "vienna", "night", "kunsthistorisches"],
  },
  {
    src: "/photos/frames/20230611-123339.jpg",
    alt: "Rocky forest trail through bright green deciduous woods",
    sortPlace: "canada",
    sortCity: "quebec",
    sortVenue: "forest-trail",
    takenAt: "2023-06-11",
    tags: ["canada", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/261f6472-c705-4cf0-b52b-e33462846fc2.jpg",
    alt: "Curved path through a sunlit deciduous park",
    description:
      "A curved lawn path through deciduous trees — Montreal’s botanical garden in gentle sun. The kind of place where the pun writes itself: for what it’s earth.",
    sortPlace: "canada",
    sortCity: "montreal",
    sortVenue: "botanical-garden",
    tags: ["canada", "travel", "hiking", "frames", "montreal", "botanical-garden"],
  },
  {
    src: "/photos/frames/55cf6453-4bc3-450e-a8b9-d15b53555894.jpg",
    alt: "Naples street at dusk",
    description:
      "Narrow street at dusk, balconies stacked above a last stripe of warm light. Lilian Whiting wasn’t wrong: after Rome’s gravity, Florence’s polish, and Venice’s dream logic, Naples reads as pure pull.",
    sortPlace: "italy",
    sortCity: "naples",
    sortVenue: "street-dusk",
    tags: ["italy", "history", "travel", "frames", "naples", "campania"],
  },
  {
    src: "/photos/frames/ca53e79c-8932-4b49-bc73-2bc4abae8d3a.jpg",
    alt: "Long green trellis tunnel and gravel path in formal palace gardens",
    description:
      "Long trellis tunnel at Schönbrunn: gravel underfoot, leaves filtering the light, palace yellow peeking through the green.",
    sortPlace: "austria",
    sortCity: "vienna",
    sortVenue: "schonbrunn-gardens",
    tags: ["austria", "history", "travel", "frames", "schonbrunn", "vienna"],
  },
  {
    src: "/photos/frames/djuf1669.jpg",
    alt: "Alpine meadow and peaks, Himachal Pradesh",
    sortPlace: "india",
    sortCity: "himachal-pradesh",
    sortVenue: "alpine-meadow",
    tags: ["india", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/e85decfe-f4b9-495f-a35e-0e7a219ec1e2.jpg",
    alt: "St. Stephen's Cathedral (Stephansdom), Vienna — Gothic spire and patterned tile roof",
    description:
      "Stephansdom’s south tower and chevron roof tiles from below — the silhouette most people mean when they say Vienna.",
    sortPlace: "austria",
    sortCity: "vienna",
    sortVenue: "stephansdom",
    tags: ["austria", "history", "travel", "frames", "stephansdom", "gothic"],
  },
  {
    src: "/photos/frames/fjqq5987.jpg",
    alt: "Sunlit path through a tall deciduous forest",
    sortPlace: "india",
    sortCity: "kasol",
    sortVenue: "deciduous-forest-path",
    tags: ["india", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/fnoz8370.jpg",
    alt: "Remote mountain campsite with tents at the edge of a pine forest below rocky peaks",
    sortPlace: "india",
    sortCity: "manali",
    sortVenue: "mountain-campsite",
    tags: ["india", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-0334.jpeg",
    alt: "Mehrangarh Fort, Jodhpur",
    description:
      "Mehrangarh’s sandstone massifs rise above a sea of indigo roofs — the blue city compressed under the fort.",
    sortPlace: "india",
    sortCity: "jodhpur",
    sortVenue: "mehrangarh-fort",
    tags: ["india", "history", "travel", "frames", "jodhpur", "rajasthan", "blue-city"],
  },
  {
    src: "/photos/frames/img-0414.jpeg",
    alt: "Bada Bagh cenotaphs, Jaisalmer",
    sortPlace: "india",
    sortCity: "jaisalmer",
    sortVenue: "bada-bagh",
    tags: ["india", "history", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-0718.jpeg",
    alt: "Gadisar Lake pavilion, Jaisalmer",
    sortPlace: "india",
    sortCity: "jaisalmer",
    sortVenue: "gadisar-lake",
    tags: ["india", "history", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-1454.jpg",
    alt: "Snow-covered city park with bare trees and winter sky",
    sortPlace: "canada",
    sortCity: "montreal",
    sortVenue: "jarry-park-winter",
    tags: ["canada", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-1996.jpg",
    alt: "Fallen red maple leaves on mossy grey rock in autumn",
    sortPlace: "canada",
    sortCity: "quebec",
    sortVenue: "autumn-maple-leaves",
    tags: ["canada", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-20160814-164345-hdr.jpg",
    alt: "Monsoon valley and green fields, Araku Valley",
    place: "Araku Valley, Andhra Pradesh, India",
    sortPlace: "india",
    sortCity: "araku-valley",
    sortVenue: "monsoon-valley",
    takenAt: "2016-08-14",
    tags: ["india", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-2207.jpeg",
    alt: "Autumn trees on a campus lawn",
    description:
      "Autumn on a campus lawn in Toronto — maples turning, weekend pace, short light.",
    sortPlace: "canada",
    sortCity: "toronto",
    sortVenue: "campus-lawn-autumn",
    tags: ["canada", "travel", "frames", "toronto", "autumn"],
  },
  {
    src: "/photos/frames/img-2364.jpeg",
    alt: "Waikiki beach view",
    sortPlace: "usa",
    sortCity: "hawaii",
    sortVenue: "waikiki-beach",
    tags: ["usa", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-2668.jpeg",
    alt: "Sunlight through a dense evergreen forest from a low angle",
    sortPlace: "usa",
    sortCity: "seattle",
    sortVenue: "evergreen-forest",
    tags: ["usa", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-2968.jpeg",
    alt: "Turquoise Caribbean sea, rocky shore, and coastal ruins",
    description:
      "Caribbean blue against dark rock, low ruins on the point — the Yucatán coast where the sea eats the archaeology.",
    sortPlace: "mexico",
    sortCity: "cancun",
    sortVenue: "coastal-ruins",
    tags: ["mexico", "history", "travel", "frames", "cancun", "caribbean", "riviera-maya"],
  },
  {
    src: "/photos/frames/img-3143.jpeg",
    alt: "Cenote Ik Kil, Yucatán",
    description:
      "Ik Kil from the rim: roots dangling like rigging, a thin falls threading the opening, swimmers in bright jackets dotting jade water. Cenotes are collapsed limestone vaults fed by rain and groundwater; the Yucatán’s ring of them sits roughly on the buried scar of the Chicxulub impact — science fiction geology you can swim in.",
    sortPlace: "mexico",
    sortCity: "cancun",
    sortVenue: "cenote-ik-kil",
    tags: [
      "mexico",
      "history",
      "travel",
      "frames",
      "cenote",
      "ik-kil",
      "yucatan",
      "chicxulub",
      "swimming",
    ],
  },
  {
    src: "/photos/frames/img-3176.jpeg",
    alt: "Tropical beach with palm tree, wooden pier, and turquoise water under a bright sky",
    sortPlace: "mexico",
    sortCity: "cancun",
    sortVenue: "tropical-beach-pier",
    tags: ["mexico", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-3243.jpg",
    alt: "Rock-framed overlook of a green valley, river, and distant town under a bright sky",
    sortPlace: "canada",
    sortCity: "montreal",
    sortVenue: "valley-overlook",
    tags: ["canada", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-3591.jpg",
    alt: "Rolling hills of forest in peak autumn color from above",
    sortPlace: "canada",
    sortCity: "quebec",
    sortVenue: "autumn-forest-hills",
    tags: ["canada", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-3689.jpg",
    alt: "Wide leaf-strewn trail through autumn woods under an overcast sky",
    sortPlace: "canada",
    sortCity: "quebec",
    sortVenue: "autumn-woods-trail",
    tags: ["canada", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-3691.jpeg",
    alt: "Silhouetted trees and green ground cover at a coastal sunset over the ocean",
    description:
      "Silhouetted trees and low brush against a cooling Pacific — the same Maui trip as the open beach sunset, this time picking a way along rough lava at the water’s edge.",
    sortPlace: "usa",
    sortCity: "hawaii",
    sortVenue: "coastal-sunset-silhouette",
    tags: ["usa", "travel", "frames", "maui", "hawaii", "lava", "coast", "sunset"],
  },
  {
    src: "/photos/frames/img-4604.jpeg",
    alt: "Rialto Bridge and Grand Canal, Venice",
    description:
      "Rialto’s arch and the Grand Canal in hard daylight — vaporetti, gondolas, façades leaning over the water. Do Lafzon Ki Hai 🎶🤌",
    sortPlace: "italy",
    sortCity: "venice",
    sortVenue: "rialto-grand-canal",
    tags: ["italy", "history", "travel", "frames", "venice", "rialto", "grand-canal"],
  },
  {
    src: "/photos/frames/img-4722.jpeg",
    alt: "Bridge of Sighs, Venice",
    sortPlace: "italy",
    sortCity: "venice",
    sortVenue: "bridge-of-sighs",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-4786.jpeg",
    alt: "Narrow Venetian canal, stone bridge, and moored gondolas between tall façades",
    sortPlace: "italy",
    sortCity: "venice",
    sortVenue: "canal-gondolas",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-4838.jpeg",
    alt: "Florence Cathedral and Giotto's Campanile",
    description:
      "Brunelleschi’s dome and Giotto’s campanile sharing one vertical slice of sky — marble geometry that, for me, edged out the tower-in-a-field shot from Pisa on the same Italy loop.",
    sortPlace: "italy",
    sortCity: "florence",
    sortVenue: "duomo-campanile",
    tags: ["italy", "history", "travel", "frames", "florence", "duomo", "renaissance"],
  },
  {
    src: "/photos/frames/img-5032.jpeg",
    alt: "Manarola, Cinque Terre — colorful houses on cliffs above the Mediterranean",
    description:
      "Manarola again from the classic angle — pastel walls, tiny harbor, sea darkening to sapphire. Still feels unreal from this ledge.",
    sortPlace: "italy",
    sortCity: "manarola",
    sortVenue: "manarola-cliffs",
    tags: ["italy", "history", "travel", "frames", "cinque-terre", "manarola", "liguria"],
  },
  {
    src: "/photos/frames/img-5104.jpeg",
    alt: "Siena skyline and Duomo",
    sortPlace: "italy",
    sortCity: "siena",
    sortVenue: "skyline-duomo",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-5109.jpeg",
    alt: "Siena Cathedral facade — white and green marble stripes and rose window under blue sky",
    sortPlace: "italy",
    sortCity: "siena",
    sortVenue: "duomo-facade",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-5165.jpeg",
    alt: "Colosseum at night, Rome",
    description:
      "The Colosseum under floodlight — arches stacked like ribs, tourists reduced to motion blur. Third wonder checked earlier that week from inside the arena; this is the same ruin dressed for night.",
    sortPlace: "italy",
    sortCity: "rome",
    sortVenue: "colosseum-night",
    tags: [
      "italy",
      "history",
      "travel",
      "frames",
      "rome",
      "colosseum",
      "seven-wonders",
      "night",
    ],
  },
  {
    src: "/photos/frames/img-5272-original.jpg",
    alt: "Ferns and stone steps along a forest trail",
    sortPlace: "usa",
    sortCity: "seattle",
    sortVenue: "forest-trail-steps",
    tags: ["usa", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-5295.jpg",
    alt: "Sunlit boulders and forested slopes below West Tiger Mountain, Cascade foothills near Seattle",
    place: "West Tiger Mountain, Washington",
    sortPlace: "usa",
    sortCity: "issaquah",
    sortVenue: "west-tiger-mountain",
    tags: ["usa", "travel", "hiking", "frames", "seattle", "cascades", "washington"],
  },
  {
    src: "/photos/frames/img-5302.jpeg",
    alt: "Bramante Staircase, Vatican Museums",
    sortPlace: "italy",
    sortCity: "rome",
    sortVenue: "vatican-bramante-staircase",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-5359.jpeg",
    alt: "Pompeii victim cast",
    description:
      "Plaster cast of a body hollow left by ash — the most human object in Pompeii, folded in on itself while the street scenes still look like someone stepped away for lunch.",
    sortPlace: "italy",
    sortCity: "pompeii",
    sortVenue: "plaster-cast",
    tags: ["italy", "history", "travel", "frames", "pompeii", "vesuvius"],
  },
  {
    src: "/photos/frames/img-5448.jpeg",
    alt: "Sunset light on balconied apartment buildings in a European city street",
    sortPlace: "italy",
    sortCity: "naples",
    sortVenue: "apartment-street-sunset",
    tags: ["italy", "history", "travel", "frames"],
  },
  {
    src: "/photos/frames/img-6134.jpg",
    alt: "Rope-and-post railing above a forested valley, small lake, and rolling hills",
    sortPlace: "canada",
    sortCity: "montreal",
    sortVenue: "valley-lake-overlook",
    tags: ["canada", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-6663.jpg",
    alt: "Winding trails across arid slopes below a snow-capped Andean peak",
    sortPlace: "peru",
    sortCity: "cusco-region",
    sortVenue: "andean-trails",
    tags: ["peru", "history", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-6683.jpg",
    alt: "Mirador Valle Rojo sign at 5045 m with the Red Valley below, Peru",
    description:
      "Wooden mirador sign carved with altitude — 5045 m — and the Valle Rojo rolling out in rust-red folds behind. Cold air, sharp shadow, lungs reminding you you’re not in the syllabus anymore.",
    sortPlace: "peru",
    sortCity: "cusco-region",
    sortVenue: "mirador-valle-rojo",
    tags: [
      "peru",
      "history",
      "travel",
      "hiking",
      "frames",
      "valle-rojo",
      "rainbow-mountain",
      "vinicunca",
      "high-altitude",
    ],
  },
  {
    src: "/photos/frames/b565410c-2c36-4d9e-b894-df7b1bb0301b.jpg",
    alt: "Hiker with arms outstretched in front of Rainbow Mountain’s striped mineral slopes, Vinicunca, Peru",
    title: "Vinicunca",
    place: "Vinicunca, Cusco Region, Peru",
    description:
      "About 5200 m and the stripes behind you look painted — rust, lavender, ochre, grey — until you remember it’s all mineral and altitude. Same brutal, beautiful day as the Red Valley mirador; this frame is the “I actually made it” shot.",
    sortPlace: "peru",
    sortCity: "cusco-region",
    sortVenue: "vinicunca-rainbow-mountain",
    tags: [
      "peru",
      "travel",
      "hiking",
      "frames",
      "rainbow-mountain",
      "vinicunca",
      "high-altitude",
      "andes",
      "cusco-region",
    ],
  },
  {
    src: "/photos/frames/img-6765.jpg",
    alt: "Forest-clad mountain faces and clouds in high contrast daylight",
    sortPlace: "peru",
    sortCity: "cusco-region",
    sortVenue: "cloud-forest-peaks",
    tags: ["peru", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/img-6842.jpg",
    alt: "Inca stone ruins and terraces above the Urubamba valley, Machu Picchu",
    description:
      "Dry-laid walls stepping down toward the Urubamba gorge — the citadel’s engineering as loud as the peaks. Fourth wonder; three in three years; still processing the scale.",
    sortPlace: "peru",
    sortCity: "machu-picchu",
    sortVenue: "machu-picchu-terraces",
    tags: ["peru", "history", "travel", "hiking", "frames", "machu-picchu", "inca", "seven-wonders"],
  },
  {
    src: "/photos/frames/img-6976.jpg",
    alt: "Visitor at the railing above Poás Volcano crater, steam rising from acidic lake",
    place: "Poás Volcano, Costa Rica",
    description:
      "Poás from the safety rail: grey crater walls, a pale green lake, and a column of steam that keeps rewriting the skyline. Elsewhere on the same road trip we also caught the quieter, extinct crater viewpoint.",
    sortPlace: "costa-rica",
    sortCity: "poas-volcano",
    sortVenue: "volcanic-crater",
    tags: ["costa-rica", "travel", "hiking", "frames", "poas", "volcano", "roadtrip", "pura-vida"],
  },
  {
    src: "/photos/frames/img-7045.jpg",
    alt: "Tropical waterfall plunging into a turquoise pool, framed by dense jungle foliage",
    description:
      "Catarata de La Fortuna: one white column dropping seventy meters into turquoise pool, people tiny on the rocks for scale, jungle pressing in from every side.",
    sortPlace: "costa-rica",
    sortCity: "la-fortuna",
    sortVenue: "jungle-waterfall",
    tags: ["costa-rica", "travel", "hiking", "frames", "la-fortuna", "waterfall", "rainforest", "pura-vida"],
  },
  {
    src: "/photos/frames/img-7179.jpg",
    alt: "Orange sunset over rolling hills and distant water from an elevated wooden overlook",
    description:
      "From a wooden overlook: rolling highlands going amber, a glint of water between ridges, air thick enough to feel like mist — the tail end of a Costa Rica road trip.",
    sortPlace: "costa-rica",
    sortCity: "san-jose",
    sortVenue: "hills-sunset-overlook",
    tags: ["costa-rica", "travel", "frames", "roadtrip", "pura-vida", "sunset"],
  },
  {
    src: "/photos/frames/img-7791.jpg",
    alt: "Deep V-shaped valley between steep green peaks and layered blue distant ranges",
    sortPlace: "peru",
    sortCity: "machu-picchu",
    sortVenue: "v-valley-andes",
    tags: ["peru", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/p1090170-22.jpg",
    alt: "Autumn hillside forest",
    sortPlace: "canada",
    sortCity: "quebec",
    sortVenue: "autumn-hillside-forest",
    tags: ["canada", "travel", "hiking", "frames"],
  },
  {
    src: "/photos/frames/p1090246-47-original.jpg",
    alt: "Summit overlook of autumn forest, lake, and distant mountains",
    description:
      "Summit view over a quilt of red and gold forest, a slice of lake, hazy mountains beyond — Quebec autumn when the Laurentians turn all the way up.",
    sortPlace: "canada",
    sortCity: "quebec",
    sortVenue: "summit-autumn-overlook",
    tags: [
      "canada",
      "travel",
      "hiking",
      "frames",
      "quebec",
      "autumn",
      "mont-tremblant",
      "laurentians",
      "fall-colors",
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
