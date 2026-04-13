#!/usr/bin/env node
/**
 * Removes EXIF / IPTC / XMP and applies orientation from EXIF before discarding it.
 * Only rewrites files that actually carry metadata (avoids churn on already-clean assets).
 *
 * Env: SKIP_STRIP_PHOTO_EXIF=1 — skip (e.g. local quick next build).
 *
 * Per-file failures are logged and skipped so one odd JPEG cannot fail CI.
 */
import { readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const RASTER_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function shouldProcessMetadata(meta) {
  if (meta.exif?.length) return true;
  if (meta.iptc?.length) return true;
  if (meta.xmp?.length) return true;
  if (meta.orientation != null && meta.orientation !== 1) return true;
  return false;
}

async function* walkFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      yield* walkFiles(full);
    } else if (e.isFile()) {
      yield full;
    }
  }
}

async function stripFile(absPath) {
  const rel = relative(ROOT, absPath);
  const buf = await readFile(absPath);

  let meta;
  try {
    meta = await sharp(buf, { failOn: "none" }).metadata();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn(`strip-photo-exif: skip ${rel} (metadata): ${msg}`);
    return "unchanged";
  }

  if (!shouldProcessMetadata(meta)) {
    return "unchanged";
  }

  const ext = extname(absPath).toLowerCase();
  let out;
  try {
    const base = sharp(buf, { failOn: "none" }).rotate();
    if (ext === ".png") {
      out = await base.png({ compressionLevel: 9, effort: 9 }).toBuffer();
    } else if (ext === ".webp") {
      out = await base.webp({ quality: 95 }).toBuffer();
    } else if (ext === ".avif") {
      out = await base.avif({ quality: 85 }).toBuffer();
    } else {
      out = await base.jpeg({ quality: 95, mozjpeg: true }).toBuffer();
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn(`strip-photo-exif: skip ${rel} (encode): ${msg}`);
    return "unchanged";
  }

  const tmp = `${absPath}.exif-strip.tmp`;
  await writeFile(tmp, out);
  await rename(tmp, absPath);
  return "stripped";
}

async function main() {
  if (process.env.SKIP_STRIP_PHOTO_EXIF === "1") {
    console.log("strip-photo-exif: SKIP_STRIP_PHOTO_EXIF=1, skipping.");
    return;
  }

  const photosDir = join(ROOT, "public", "photos");
  const extra = [join(ROOT, "public", "me.jpg")];

  let stripped = 0;
  let unchanged = 0;

  if (!(await stat(photosDir).catch(() => null))) {
    console.warn("strip-photo-exif: public/photos missing, skipping tree.");
  } else {
    for await (const abs of walkFiles(photosDir)) {
      const ext = extname(abs).toLowerCase();
      if (!RASTER_EXT.has(ext)) continue;
      const r = await stripFile(abs);
      if (r === "stripped") {
        stripped += 1;
        console.log(`strip-photo-exif: stripped ${relative(ROOT, abs)}`);
      } else {
        unchanged += 1;
      }
    }
  }

  for (const abs of extra) {
    if (!(await stat(abs).catch(() => null))) continue;
    const ext = extname(abs).toLowerCase();
    if (!RASTER_EXT.has(ext)) continue;
    const r = await stripFile(abs);
    if (r === "stripped") {
      stripped += 1;
      console.log(`strip-photo-exif: stripped ${relative(ROOT, abs)}`);
    } else {
      unchanged += 1;
    }
  }

  console.log(
    `strip-photo-exif: done (${stripped} rewritten, ${unchanged} unchanged).`,
  );
}

await main();
