import type { Metadata } from "next";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import { notFound } from "next/navigation";

import Footer from "@/components/blocks/footer";
import Navbar from "@/components/blocks/navbar/navbar";
import { ScrollRestore } from "@/components/blocks/scroll-restore";
import JsonLdScripts from "@/components/jsonld-scripts";
import { GoogleTagManager } from "@/components/third-party";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DEFAULT_LOCALE, LOCALES, routing } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* Fonts */
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

/* Metadata */
type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return constructMetadata({
    description: t("headline"),
    locale: locale as Locale,
    path: `/`,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale - if invalid, trigger 404
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale || DEFAULT_LOCALE} suppressHydrationWarning>
      <head>
        <JsonLdScripts locale={locale} />
      </head>

      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        {/* Main Layout */}
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <TooltipProvider delayDuration={0}>
              <ScrollRestore />
              <Navbar />
              {children}
              <Footer />
            </TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>

        {process.env.NODE_ENV === "development" ? null : (
          <GoogleTagManager />
        )}
      </body>
    </html>
  );
}
