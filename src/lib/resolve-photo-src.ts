/**
 * Photo `src` values must be site-owned assets under `/public` (paths like `/photos/core/...`).
 * Do not hotlink third-party or random website images in the catalog.
 *
 * Optional: set NEXT_PUBLIC_PHOTOS_CDN at build time to a base URL that mirrors `public/photos/**`
 * on your own storage (e.g. R2/S3). Only `/photos/...` paths are passed here; the env is your CDN
 * origin, not arbitrary image URLs.
 *
 * If removed or renamed files still appear on the live site: (1) redeploy a fresh `pnpm build`
 * (`out/` is not in git — GitHub Actions must run). (2) With a CDN, re-sync `public/photos/**`
 * and purge cache — old `/photos/core/…` or deleted frames can linger there. (3) Hard-refresh
 * or disable cache to rule out a stale browser JS bundle (the photo list lives in client chunks).
 */
export function resolvePhotoSrc(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    throw new Error(
      "resolvePhotoSrc: external image URLs are not allowed; add the file under public/photos and use a /photos/... path.",
    );
  }
  const base = process.env.NEXT_PUBLIC_PHOTOS_CDN?.replace(/\/$/, "") ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}
