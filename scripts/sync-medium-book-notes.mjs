#!/usr/bin/env node
/**
 * Pulls book-note posts from your Medium RSS at build time, saves covers under
 * `public/photos/book-notes/medium/`, writes `src/data/book-notes-medium.generated.json`,
 * Book notes album cover on Beyond work uses `goodreads-collage.jpg` (see `sync-goodreads-collage.mjs`).
 *
 * On Medium, tag book summaries with **books** or **nonfiction**. Tech posts that use
 * those tags are dropped if they also have a topic in EXCLUDE_CATEGORIES.
 *
 * Env: SKIP_MEDIUM_SYNC=1 — skip (offline). MEDIUM_BOOK_NOTES_FEED — RSS URL override.
 * If the RSS fetch fails but JSON already exists, the script exits 0 and keeps prior data.
 */
import { existsSync } from "node:fs";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const MEDIUM_FEED =
  process.env.MEDIUM_BOOK_NOTES_FEED?.trim() ||
  "https://medium.com/feed/@pranshumalviya";

const OUT_JSON = join(ROOT, "src/data/book-notes-medium.generated.json");
const OUT_IMG_DIR = join(ROOT, "public/photos/book-notes/medium");

/** Lowercase Medium topic slugs that disqualify a story (even if also tagged books). */
const EXCLUDE_CATEGORIES = new Set([
  "arangodb",
  "graph-database",
  "performance-testing",
  "jmeter",
  "programming",
  "software-engineering",
]);

const INCLUDE_CATEGORIES = new Set(["books", "nonfiction"]);

/**
 * Exact hero URLs as embedded in each story’s HTML (RSS `content:encoded` first `<figure>`).
 * Add a row here when Medium’s feed order changes or figure detection fails. Keys = Medium `p/` id.
 */
const COVER_IMAGE_BY_POST_ID = {
  bbef4605721f:
    "https://cdn-images-1.medium.com/max/1024/1*iJaWwIlVqsKab5_4qSd-jg.jpeg",
  "8dd3ebc7380a":
    "https://cdn-images-1.medium.com/max/715/1*vZvcwp9PnI8Byz0k4SZ24A.jpeg",
  "8c950a7b6659":
    "https://cdn-images-1.medium.com/max/625/1*uIrC6flDZ_Oo-jpoUA80Hw.jpeg",
};

function extractCdata(block, tag) {
  const re = new RegExp(
    `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`,
    "i",
  );
  const m = block.match(re);
  if (m) return m[1].trim();
  const plain = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i");
  const m2 = block.match(plain);
  return m2 ? m2[1].trim() : "";
}

function extractContentEncoded(block) {
  const m = block.match(
    /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/i,
  );
  return m ? m[1] : "";
}

function extractCategories(block) {
  const out = [];
  const re = /<category><!\[CDATA\[([^\]]*)\]\]><\/category>/gi;
  let m;
  while ((m = re.exec(block)) !== null) {
    out.push(String(m[1]).toLowerCase().trim());
  }
  return out;
}

function parseGuidToPostId(guid) {
  const m = guid.match(/medium\.com\/p\/([a-f0-9]+)/i);
  if (m) return m[1];
  const m2 = guid.match(/postId=([a-f0-9]+)/i);
  if (m2) return m2[1];
  return null;
}

function firstMediumImageUrl(html) {
  const re =
    /https:\/\/(?:cdn-images-1|miro)\.medium\.com\/[^\s"'<>]+/gi;
  const m = re.exec(html);
  return m ? m[0].replace(/[),.;]+$/, "") : null;
}

/** First `<figure>` image — matches how book posts show the cover on Medium. */
function firstFigureMediumImage(html) {
  const m = html.match(
    /<figure\b[^>]*>[\s\S]*?<img[^>]*\bsrc=["'](https:\/\/(?:cdn-images-1|miro)\.medium\.com\/[^"']+)/i,
  );
  return m ? m[1].replace(/[),.;]+$/, "") : null;
}

function pickCoverImageUrl(html, postId) {
  if (postId && COVER_IMAGE_BY_POST_ID[postId]) {
    return COVER_IMAGE_BY_POST_ID[postId];
  }
  return firstFigureMediumImage(html) || firstMediumImageUrl(html);
}

function cleanMediumUrl(url) {
  const u = new URL(url.split("?")[0]);
  return u.toString();
}

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(s) {
  return decodeEntities(String(s).replace(/<[^>]+>/g, " ")).replace(
    /\s+/g,
    " ",
  );
}

function textSummary(html, title) {
  const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) =>
    m[1].trim(),
  );
  for (const chunk of paras) {
    let raw = stripTags(chunk).trim();
    raw = raw.replace(/^Available at:\s*Amazon\s*/i, "").trim();
    if (raw.length < 50) continue;
    if (/goodreads\.com/i.test(raw) && raw.length < 140) continue;
    return raw.length > 240 ? `${raw.slice(0, 237)}…` : raw;
  }
  let fallback = stripTags(html).trim().replace(/^Available at:\s*Amazon\s*/i, "");
  if (fallback.length > 50) {
    return fallback.length > 240 ? `${fallback.slice(0, 237)}…` : fallback;
  }
  return `Book notes on Medium: ${title}`;
}

function parseRssItems(xml) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const block = m[1];
    const title = extractCdata(block, "title");
    const linkRaw = extractCdata(block, "link");
    const pubDate = extractCdata(block, "pubDate");
    const guid = extractCdata(block, "guid");
    const categories = extractCategories(block);
    const content = extractContentEncoded(block);
    if (!title || !linkRaw) continue;
    items.push({
      title,
      link: cleanMediumUrl(linkRaw),
      pubDate,
      guid,
      categories,
      content,
    });
  }
  return items;
}

function qualifies(item) {
  if (item.categories.some((c) => EXCLUDE_CATEGORIES.has(c))) return false;
  return item.categories.some((c) => INCLUDE_CATEGORIES.has(c));
}

function parsePubTime(pubDate) {
  const t = Date.parse(pubDate);
  return Number.isFinite(t) ? t : 0;
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; pranshu28.github.io book-notes sync)",
    },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`Image fetch ${res.status} ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
}

async function main() {
  if (process.env.SKIP_MEDIUM_SYNC === "1") {
    console.error(
      "[sync-medium-book-notes] SKIP_MEDIUM_SYNC=1 — leaving existing JSON and images.",
    );
    return;
  }

  let xml;
  try {
    const res = await fetch(MEDIUM_FEED, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; pranshu28.github.io book-notes sync)",
      },
      redirect: "follow",
    });
    if (!res.ok) {
      throw new Error(`Medium RSS ${res.status}`);
    }
    xml = await res.text();
  } catch (e) {
    console.error(
      `[sync-medium-book-notes] RSS fetch failed (keeping repo files): ${e}`,
    );
    if (!existsSync(OUT_JSON)) {
      process.exit(1);
    }
    return;
  }

  const rawItems = parseRssItems(xml);
  const bookItems = rawItems.filter(qualifies);

  bookItems.sort(
    (a, b) => parsePubTime(b.pubDate) - parsePubTime(a.pubDate),
  );

  await mkdir(OUT_IMG_DIR, { recursive: true });

  const keepIds = new Set();
  const specs = [];

  for (const item of bookItems) {
    const postId =
      parseGuidToPostId(item.guid) ||
      String(item.link.split("/").filter(Boolean).pop() || "").slice(-12) ||
      `x${specs.length}`;
    const imgUrl = pickCoverImageUrl(item.content, postId);
    if (!imgUrl) {
      console.error(
        `[sync-medium-book-notes] skip (no hero image in RSS HTML): ${item.title}`,
      );
      continue;
    }
    keepIds.add(postId);
    const ext = imgUrl.includes(".png") ? "png" : "jpg";
    const fileName = `${postId}.${ext}`;
    const publicPath = `/photos/book-notes/medium/${fileName}`;
    const diskPath = join(OUT_IMG_DIR, fileName);
    try {
      await downloadImage(imgUrl, diskPath);
    } catch (e) {
      console.error(
        `[sync-medium-book-notes] skip (cover download failed): ${item.title} — ${e}`,
      );
      keepIds.delete(postId);
      continue;
    }
    const taken = new Date(item.pubDate);
    const takenAt = Number.isFinite(taken.getTime())
      ? taken.toISOString().slice(0, 10)
      : "1970-01-01";
    const titlePlain = item.title.replace(/<[^>]+>/g, "").trim();
    specs.push({
      coverSrc: publicPath,
      alt: `Book notes: ${titlePlain}`,
      title: titlePlain,
      openHref: item.link,
      description: textSummary(item.content, titlePlain),
      takenAt,
    });
  }

  const existing = await readdir(OUT_IMG_DIR).catch(() => []);
  for (const name of existing) {
    const id = name.replace(/\.(jpg|jpeg|png|webp)$/i, "");
    if (!keepIds.has(id)) {
      await rm(join(OUT_IMG_DIR, name), { force: true });
    }
  }

  await writeFile(OUT_JSON, `${JSON.stringify(specs, null, 2)}\n`, "utf8");
  console.log(
    `book-notes: synced ${specs.length} Medium post(s) → ${OUT_JSON}`,
  );
}

await main();
