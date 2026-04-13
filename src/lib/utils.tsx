import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Icons } from "@/components/icons";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Latest 4-digit year in a label (e.g. `"2017 – 2019"` → 2019, `"CoLLAs 2024"` → 2024). */
export function maxYearFromDatesLabel(dates: string): number {
  if (typeof dates !== "string") return 0;
  const years =
    dates.match(/\d{4}/g)?.map((y) => Number.parseInt(y, 10)) ?? [];
  let max = 0;
  for (const y of years) {
    if (y > max) max = y;
  }
  return max;
}

/** Newest-first by `dates` year; stable when years tie. */
export function sortByLatestYearDesc<T extends { dates: string }>(
  items: readonly T[],
): T[] {
  return [...items]
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const ya = maxYearFromDatesLabel(a.item.dates);
      const yb = maxYearFromDatesLabel(b.item.dates);
      if (yb !== ya) return yb - ya;
      return a.index - b.index;
    })
    .map(({ item }) => item);
}

/** Parse `start` / `end` strings like `Sep 2025`, `2023`, `Present` for ordering. */
function experienceBoundaryMs(s: string, role: "start" | "end"): number {
  if (typeof s !== "string") return 0;
  const t = s.trim();
  if (!t) return 0;
  if (role === "end" && t.toLowerCase() === "present") {
    return Number.MAX_SAFE_INTEGER;
  }
  const monYear = /^([A-Za-z]{3,9})\s+(\d{4})$/.exec(t);
  if (monYear) {
    const ms = Date.parse(`${monYear[1]} 15, ${monYear[2]}`);
    if (!Number.isFinite(ms)) return 0;
    return ms;
  }
  const years = t.match(/\b(\d{4})\b/g);
  if (years?.length) {
    const yi = Number.parseInt(years[years.length - 1], 10);
    const month = role === "end" ? 11 : 0;
    const day = role === "end" ? 31 : 1;
    return Date.UTC(yi, month, day);
  }
  const parsed = Date.parse(t);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Experience rows: newest first by end date (`Present` last-in-time), then by start date. */
export function sortWorkExperienceDesc<T extends { start: string; end: string }>(
  items: readonly T[],
): T[] {
  return [...items]
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const endB = experienceBoundaryMs(b.item.end, "end");
      const endA = experienceBoundaryMs(a.item.end, "end");
      if (endB !== endA) return endB - endA;
      const startB = experienceBoundaryMs(b.item.start, "start");
      const startA = experienceBoundaryMs(a.item.start, "start");
      if (startB !== startA) return startB - startA;
      return a.index - b.index;
    })
    .map(({ item }) => item);
}

/** In-app routes for static export; not `/papers/…` or static assets under `/photos/{core,frames,…}`. */
export function isLocaleScopedAppPath(href: unknown): boolean {
  if (typeof href !== "string" || href.length === 0) return false;
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  const path = href.split("?")[0].split("#")[0];
  if (path.startsWith("/blog")) return true;
  if (path === "/beyond-work" || path.startsWith("/beyond-work/")) return true;
  if (path === "/photos" || path.startsWith("/photos/")) return true;
  if (path.startsWith("/privacy-policy")) return true;
  if (path.startsWith("/terms-of-service")) return true;
  return false;
}

export function formatDate(date: string, locale: string = "en-US") {
  if (typeof date !== "string" || date.length === 0) return "";
  const currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date).getTime();
  const timeDifference = Math.abs(currentDate - targetDate);
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const fullDate = new Date(date).toLocaleString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return locale.startsWith("zh") ? "今天" : "Today";
  } else if (daysAgo < 7) {
    const agoText = locale.startsWith("zh") ? "天前" : "d ago";
    return `${fullDate} (${daysAgo}${agoText})`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    const agoText = locale.startsWith("zh") ? "周前" : "w ago";
    return `${fullDate} (${weeksAgo}${agoText})`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    const agoText = locale.startsWith("zh") ? "个月前" : "mo ago";
    return `${fullDate} (${monthsAgo}${agoText})`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    const agoText = locale.startsWith("zh") ? "年前" : "y ago";
    return `${fullDate} (${yearsAgo}${agoText})`;
  }
}

export function jsonldScript(jsonLd: string) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}

export function getIconComponent(iconName: string) {
  const key = typeof iconName === "string" ? iconName : "";
  const iconMap: Record<string, (props: React.HTMLAttributes<SVGElement>) => React.ReactElement> = {
    globe: Icons.globe,
    github: Icons.github,
    paper: Icons.paper,
    bookopen: Icons.bookopen,
    newspaper: Icons.newspaper,
    x: Icons.x,
  };
  
  const IconComponent = iconMap[key] || Icons.globe;
  return <IconComponent className="size-3" />;
}
