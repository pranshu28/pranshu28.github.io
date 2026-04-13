"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SMOOTH_CLASS = "scroll-smooth-doc";

/**
 * Per-route document scroll-behavior (see globals.css). Uses Next's pathname
 * (pathname includes a leading locale only if your routing adds one).
 *
 * - Home + blog: smooth anchors / default scroll APIs for long pages & TOC.
 * - Photos + legal: `auto` — dense media & policy text stay snappy; photos still pass
 *   explicit `scrollIntoView({ behavior: "smooth" })` where needed.
 */
function documentScrollSmooth(pathname: string): boolean {
  const p = pathname.replace(/\/$/, "") || "/";
  if (/^\/[^/]+$/.test(p)) return true;
  if (/^\/[^/]+\/blog$/.test(p)) return true;
  if (/^\/[^/]+\/blog\/.+/.test(p)) return true;
  return false;
}

export function DocumentScrollBehavior() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const enable = documentScrollSmooth(pathname);
    root.classList.toggle(SMOOTH_CLASS, enable);
    return () => {
      root.classList.remove(SMOOTH_CLASS);
    };
  }, [pathname]);

  return null;
}
