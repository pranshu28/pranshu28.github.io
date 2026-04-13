import "./globals.css";

import type { Metadata } from "next";
import { Inter as FontSans, Newsreader } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";

import { DocumentScrollBehavior } from "@/components/blocks/document-scroll-behavior";
import Footer from "@/components/blocks/footer";
import Navbar from "@/components/blocks/navbar/navbar";
import { ScrollRestore } from "@/components/blocks/scroll-restore";
import JsonLdScripts from "@/components/jsonld-scripts";
import { GoogleTagManager } from "@/components/third-party";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontPageHeading = Newsreader({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: DEFAULT_LOCALE });

  return constructMetadata({
    description: t("headline"),
    locale: DEFAULT_LOCALE as Locale,
    path: `/`,
  });
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setRequestLocale(DEFAULT_LOCALE);
  const messages = await getMessages();

  return (
    <html lang={DEFAULT_LOCALE} suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=()"
        />
        <JsonLdScripts locale={DEFAULT_LOCALE} />
      </head>

      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
          fontPageHeading.variable,
        )}
      >
        <NextIntlClientProvider locale={DEFAULT_LOCALE} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <TooltipProvider delayDuration={0}>
              <ScrollRestore />
              <DocumentScrollBehavior />
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
