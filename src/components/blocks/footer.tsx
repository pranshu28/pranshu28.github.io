"use client";

import { useTranslations } from "next-intl";

import { siteConfig } from "@/data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations();

  return (
    <footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur">
      <div className="text-muted-foreground mx-auto max-w-7xl px-6 py-10 pb-16 text-center text-sm sm:px-16 md:px-20 md:text-left lg:px-24 xl:px-32">
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
          <span>
            © {currentYear} {t("name.full")}
          </span>
          <span>
            {t("footer.bottom.lastUpdated")}: {siteConfig.lastUpdated}
          </span>
        </div>
      </div>
    </footer>
  );
}
