import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Icons } from "@/components/icons";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Latest 4-digit year in a label (e.g. `"2017 – 2019"` → 2019, `"CoLLAs 2024"` → 2024). */
export function maxYearFromDatesLabel(dates: string): number {
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

/** In-app routes under `[locale]` for static export; not `/papers/…` or static `/photos/{core,frames,sketches}/…`. */
export function isLocaleScopedAppPath(href: string): boolean {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  const path = href.split("?")[0].split("#")[0];
  if (path.startsWith("/blog")) return true;
  if (path === "/photos" || path === "/photos/") return true;
  if (path.startsWith("/privacy-policy")) return true;
  if (path.startsWith("/terms-of-service")) return true;
  return false;
}

export function formatDate(date: string, locale: string = "en-US") {
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
  const iconMap: Record<string, (props: React.HTMLAttributes<SVGElement>) => React.ReactElement> = {
    globe: Icons.globe,
    github: Icons.github,
    paper: Icons.paper,
    bookopen: Icons.bookopen,
    newspaper: Icons.newspaper,
  };
  
  const IconComponent = iconMap[iconName] || Icons.globe;
  return <IconComponent className="size-3" />;
}
