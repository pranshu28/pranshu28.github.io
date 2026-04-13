import { resolvePhotoSrc } from "@/lib/resolve-photo-src";

/**
 * Grid / album tiles: same rules as `resolvePhotoSrc` — site-owned paths under `public/`.
 */
export function resolveAlbumGridSrc(path: string): string {
  if (typeof path !== "string" || path.length === 0) {
    return "";
  }
  if (path.startsWith("https://") || path.startsWith("http://")) {
    throw new Error(
      "resolveAlbumGridSrc: external image URLs are not allowed; add the file under public/ and use a site path.",
    );
  }
  return resolvePhotoSrc(path);
}
