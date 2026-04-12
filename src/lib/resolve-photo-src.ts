/**
 * Host large galleries off GitHub: set NEXT_PUBLIC_PHOTOS_CDN at build time to a URL
 * that mirrors paths under /public (e.g. upload `public/photos/**` to R2/S3 and set
 * NEXT_PUBLIC_PHOTOS_CDN=https://your-cdn.example.com so /photos/core/a.jpg (or frames/, sketches/)
 * becomes https://your-cdn.example.com/photos/core/a.jpg).
 *
 * Per-image external URLs: use a full https://... string as `src` in gallery data.
 *
 * If removed or renamed files still appear on the live site: (1) redeploy a fresh `pnpm build`
 * (`out/` is not in git — GitHub Actions must run). (2) With a CDN, re-sync `public/photos/**`
 * and purge cache — old `/photos/core/…` or deleted frames can linger there. (3) Hard-refresh
 * or disable cache to rule out a stale browser JS bundle (the photo list lives in client chunks).
 */
export function resolvePhotoSrc(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_PHOTOS_CDN?.replace(/\/$/, "") ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}
