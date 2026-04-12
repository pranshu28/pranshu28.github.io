import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

import { siteConfig } from "@/data/site";

export const LOCALES = ["en"];
export const DEFAULT_LOCALE = "en";
export const LOCALE_ICONS = {
  en: "En",
};
export const LOCALE_TO_HREFLANG: Record<Locale, string> = {
  en: "en-US",
};

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  // Always prefix so static export paths (`out/en/blog`, `out/en/photos`, …) match
  // in-page hrefs. `as-needed` omits `/en` for the default locale but Next still
  // emits pages under `/en/`, which breaks links on GitHub Pages.
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export type Locale = (typeof routing.locales)[number];

export function getLocaleUrl(locale: Locale, path: string = ""): string {
  const pathname = getPathname({ locale, href: path || "/" });
  return new URL(pathname, siteConfig.url).toString();
}
