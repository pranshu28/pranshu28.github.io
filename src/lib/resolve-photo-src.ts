/**
 * Host large galleries off GitHub: set NEXT_PUBLIC_PHOTOS_CDN at build time to a URL
 * that mirrors paths under /public (e.g. upload `public/photos/*` to R2/S3 and set
 * NEXT_PUBLIC_PHOTOS_CDN=https://your-cdn.example.com so /photos/a.jpg becomes
 * https://your-cdn.example.com/photos/a.jpg).
 *
 * Per-image external URLs: use a full https://... string as `src` in gallery data.
 */
export function resolvePhotoSrc(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_PHOTOS_CDN?.replace(/\/$/, "") ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}
