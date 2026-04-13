#!/usr/bin/env node
/**
 * Builds `public/photos/book-notes/goodreads-collage.jpg` — staggered “gallery wall” of four
 * recent reads (Goodreads read-shelf RSS): matted covers, slight rotations, soft wall gradient.
 * Used for the Goodreads tile in Book notes and the Book notes album cover on Beyond work.
 *
 * Env: SKIP_GOODREADS_COLLAGE=1 — skip. GOODREADS_READ_RSS — RSS URL override.
 */
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const RSS_URL =
  process.env.GOODREADS_READ_RSS?.trim() ||
  "https://www.goodreads.com/review/list_rss/49705608?shelf=read&per_page=12";

const OUT_JPG = join(ROOT, "public/photos/book-notes/goodreads-collage.jpg");
const OUT_DIR = dirname(OUT_JPG);

const W = 1080;
const H = 810;

function parseLargeCovers(xml, limit) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];
    const urlM = block.match(
      /<book_large_image_url><!\[CDATA\[([^\]]+)\]\]><\/book_large_image_url>/i,
    );
    if (!urlM) continue;
    const url = urlM[1].trim();
    if (!url.startsWith("http")) continue;
    items.push(url);
    if (items.length >= limit) break;
  }
  return items;
}

async function wallBackgroundPng() {
  const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wall" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f0ebe3"/>
      <stop offset="45%" stop-color="#e5ddd2"/>
      <stop offset="100%" stop-color="#d8cfc2"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#wall)"/>
</svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function mattedRotated(buf, coverW, coverH, rotationDeg, matPx, wallRgb) {
  const core = await sharp(buf)
    .resize(coverW, coverH, { fit: "cover", position: "centre" })
    .extend({
      top: matPx,
      bottom: matPx,
      left: matPx,
      right: matPx,
      background: { r: 252, g: 250, b: 246 },
    })
    .toBuffer();

  return sharp(core)
    .rotate(rotationDeg, {
      background: { ...wallRgb, alpha: 1 },
    })
    .png()
    .toBuffer();
}

async function main() {
  if (process.env.SKIP_GOODREADS_COLLAGE === "1") {
    console.error(
      "[sync-goodreads-collage] SKIP_GOODREADS_COLLAGE=1 — leaving existing JPG.",
    );
    return;
  }

  const res = await fetch(RSS_URL, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; pranshu28.github.io goodreads collage)",
    },
    redirect: "follow",
  });
  if (!res.ok) {
    console.error(
      `[sync-goodreads-collage] RSS ${res.status} — keeping existing JPG if any.`,
    );
    if (!existsSync(OUT_JPG)) process.exit(1);
    return;
  }
  const xml = await res.text();

  const urls = parseLargeCovers(xml, 4);
  if (urls.length < 4) {
    console.error(
      `[sync-goodreads-collage] need 4 covers, got ${urls.length} — keeping existing JPG if any.`,
    );
    if (!existsSync(OUT_JPG)) process.exit(1);
    return;
  }

  const buffers = [];
  for (const url of urls) {
    const ir = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; pranshu28.github.io goodreads collage)",
      },
      redirect: "follow",
    });
    if (!ir.ok) {
      throw new Error(`Cover fetch ${ir.status} ${url}`);
    }
    buffers.push(Buffer.from(await ir.arrayBuffer()));
  }

  await mkdir(OUT_DIR, { recursive: true });

  const wallRgb = { r: 229, g: 221, b: 210 };

  const layout = [
    { x: 56, y: 52, cw: 248, ch: 372, rot: -6.5, mat: 18 },
    { x: 448, y: 40, cw: 236, ch: 354, rot: 5, mat: 17 },
    { x: 188, y: 400, cw: 240, ch: 360, rot: -3.8, mat: 17 },
    { x: 580, y: 412, cw: 230, ch: 345, rot: 5.8, mat: 16 },
  ];

  const cardPngs = await Promise.all(
    layout.map((L, i) =>
      mattedRotated(buffers[i], L.cw, L.ch, L.rot, L.mat, wallRgb),
    ),
  );

  const wallBuf = await wallBackgroundPng();

  await sharp(wallBuf)
    .composite(
      cardPngs.map((input, i) => ({
        input,
        left: layout[i].x,
        top: layout[i].y,
      })),
    )
    .jpeg({ quality: 91, mozjpeg: true })
    .toFile(OUT_JPG);

  console.log(
    `[sync-goodreads-collage] wrote ${OUT_JPG.replace(ROOT + "/", "")}`,
  );
}

await main();
