"use client";

import { useTranslations } from "next-intl";

import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/data/site";
import { Link as I18nLink } from "@/i18n/routing";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations();

  return (
    <footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-10 pb-16 sm:px-16 md:px-20 lg:px-24 xl:px-32">
        <nav
          className="text-muted-foreground mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm"
          aria-label="Footer"
        >
          <I18nLink
            href="/blog"
            prefetch={false}
            className="hover:text-foreground transition-colors"
          >
            Blog
          </I18nLink>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <I18nLink
            href="/privacy-policy"
            prefetch={false}
            className="hover:text-foreground transition-colors"
          >
            {t("footer.legal.privacyPolicy")}
          </I18nLink>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <I18nLink
            href="/terms-of-service"
            prefetch={false}
            className="hover:text-foreground transition-colors"
          >
            {t("footer.legal.termsDisclaimer")}
          </I18nLink>
        </nav>

        <Separator className="mb-6" />

        <div className="text-muted-foreground flex flex-col items-center gap-2 text-center text-sm md:flex-row md:justify-between md:text-left">
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
