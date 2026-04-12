"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { Photo } from "@/data/photo-catalog";
import {
  buildJustifiedRows,
  defaultAspectRatio,
} from "@/lib/justify-photo-rows";
import { resolvePhotoSrc } from "@/lib/resolve-photo-src";

type JustifiedPhotoGridProps = {
  photos: readonly Photo[];
  onPhotoClick: (index: number) => void;
  galleryLabel: string;
};

/**
 * Edge-to-edge justified layout (no gutters), similar to SmugMug / Flickr rows.
 */
export function JustifiedPhotoGrid({
  photos,
  onPhotoClick,
  galleryLabel,
}: JustifiedPhotoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadStartedRef = useRef(new Set<string>());
  const [widthPx, setWidthPx] = useState(0);
  const [aspects, setAspects] = useState<Record<string, number>>({});

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    setWidthPx(w);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, photos.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const aspectList = useMemo(() => {
    const d = defaultAspectRatio();
    return photos.map((p) => aspects[p.src] ?? d);
  }, [photos, aspects]);

  const minRowH = useMemo(() => {
    if (widthPx <= 0) return 120;
    return Math.max(96, Math.min(170, widthPx * 0.28));
  }, [widthPx]);

  const rows = useMemo(() => {
    return buildJustifiedRows(aspectList, widthPx, minRowH);
  }, [aspectList, widthPx, minRowH]);

  useEffect(() => {
    const seen = loadStartedRef.current;
    for (const p of photos) {
      if (seen.has(p.src)) continue;
      seen.add(p.src);
      const src = resolvePhotoSrc(p.src);
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        if (w <= 0 || h <= 0) return;
        const a = w / h;
        setAspects((prev) =>
          prev[p.src] !== undefined ? prev : { ...prev, [p.src]: a },
        );
      };
      img.src = src;
    }
  }, [photos]);

  if (photos.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-md"
      role="list"
      aria-label={`${galleryLabel} photos`}
    >
      {widthPx <= 0 ? (
        <div className="bg-muted aspect-[3/2] w-full animate-pulse rounded-md" />
      ) : (
        <div className="flex flex-col gap-0">
          {rows.map((row, rowIdx) => {
            return (
              <div
                key={`row-${rowIdx}-${row.indices.join("-")}`}
                className="flex w-full min-w-0 gap-0"
                style={{ height: row.height }}
              >
                {row.indices.map((photoIndex) => {
                  const r = aspectList[photoIndex] ?? defaultAspectRatio();
                  const p = photos[photoIndex];
                  return (
                    <button
                      key={`${p.src}-${photoIndex}`}
                      type="button"
                      role="listitem"
                      data-photo-src={p.src}
                      className="group relative min-w-0 overflow-hidden border-0 bg-black p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      style={{ flex: `${r} 1 0px`, height: "100%" }}
                      onClick={() => onPhotoClick(photoIndex)}
                    >
                      <img
                        src={resolvePhotoSrc(p.src)}
                        alt={p.alt}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        loading={rowIdx === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
