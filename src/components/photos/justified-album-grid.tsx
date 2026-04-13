"use client";

import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { type Photo, photoDisplayTitle } from "@/data/photo-catalog";
import { resolveAlbumGridSrc } from "@/lib/album-image-src";
import { computeJustifiedRows } from "@/lib/justified-gallery-layout";

const GAP_PX = 5;
const MIN_ROW_H = 118;
const MAX_ROW_H = 360;
const DEFAULT_AR = 1.5;

function maxItemsForWidth(containerWidth: number): number {
  if (containerWidth < 400) return 2;
  if (containerWidth < 640) return 3;
  return 4;
}

type JustifiedAlbumGridProps = {
  photos: readonly Photo[];
  onOpenPhoto: (index: number) => void;
  ariaLabel: string;
};

export function JustifiedAlbumGrid({
  photos,
  onOpenPhoto,
  ariaLabel,
}: JustifiedAlbumGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [aspectBySrc, setAspectBySrc] = useState<Record<string, number>>({});

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      setWidth(Number.isFinite(w) ? Math.floor(w) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const aspects = useMemo(
    () => photos.map((p) => aspectBySrc[p.src] ?? DEFAULT_AR),
    [photos, aspectBySrc],
  );

  const rows = useMemo(
    () =>
      width > 0
        ? computeJustifiedRows(
            aspects,
            width,
            GAP_PX,
            MIN_ROW_H,
            MAX_ROW_H,
            maxItemsForWidth(width),
          )
        : [],
    [aspects, width],
  );

  const onImgLoad = useCallback((src: string, natW: number, natH: number) => {
    if (natW <= 0 || natH <= 0) return;
    const ar = natW / natH;
    setAspectBySrc((prev) => {
      if (prev[src] === ar) return prev;
      return { ...prev, [src]: ar };
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-w-0"
      aria-label={ariaLabel}
    >
      {rows.map((row, ri) => (
        <div
          key={ri}
          className="flex w-full flex-row flex-nowrap justify-start"
          style={{
            gap: GAP_PX,
            marginBottom: ri < rows.length - 1 ? GAP_PX : 0,
          }}
        >
          {row.indices.map((photoIndex, wi) => {
            const photo = photos[photoIndex];
            if (!photo) return null;
            const wPx = Math.max(1, Math.round(row.widths[wi] ?? 0));
            const hPx = Math.max(1, Math.round(row.height));
            const gridSrc = resolveAlbumGridSrc(photo.src);
            const cellClass =
              "group border-border relative shrink-0 overflow-hidden border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";
            const img = (
              <img
                src={gridSrc}
                alt={photo.alt}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading={photoIndex < 14 ? "eager" : "lazy"}
                decoding="async"
                onLoad={(e) => {
                  const im = e.currentTarget;
                  onImgLoad(photo.src, im.naturalWidth, im.naturalHeight);
                }}
              />
            );
            if (photo.openHref) {
              return (
                <a
                  key={`${photo.src}-${photoIndex}`}
                  href={photo.openHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-photo-src={photo.src}
                  title={photoDisplayTitle(photo)}
                  className={cellClass}
                  style={{ width: wPx, height: hPx }}
                >
                  {img}
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
                </a>
              );
            }
            return (
              <button
                key={`${photo.src}-${photoIndex}`}
                type="button"
                data-photo-src={photo.src}
                title={photoDisplayTitle(photo)}
                onClick={() => onOpenPhoto(photoIndex)}
                className={cellClass}
                style={{ width: wPx, height: hPx }}
              >
                {img}
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
