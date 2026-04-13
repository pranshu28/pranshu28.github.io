"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CustomReactMarkdown } from "@/components/react-markdown";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Link as I18nLink } from "@/i18n/routing";
import { subsectionHeadingClass } from "@/lib/page-typography";
import { isLocaleScopedAppPath } from "@/lib/utils";

const DEFAULT_VISIBLE = 4;

export interface PreprintOtherItem {
  readonly title: string;
  readonly dates: string;
  readonly authors: string;
  readonly href?: string;
}

interface PreprintsOthersProps {
  readonly items: readonly PreprintOtherItem[];
  readonly title: string;
  readonly subtitle: string;
  readonly showAllText: string;
  readonly showLessText: string;
  readonly delay?: number;
  readonly initialVisible?: number;
}

export default function PreprintsOthers({
  items,
  title,
  subtitle,
  showAllText,
  showLessText,
  delay = 0,
  initialVisible = DEFAULT_VISIBLE,
}: PreprintsOthersProps) {
  const [showAll, setShowAll] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayed = showAll ? items : items.slice(0, initialVisible);
  const hasMore = items.length > initialVisible;

  const row = (p: PreprintOtherItem, i: number) => (
    <BlurFade key={`${p.title}-${p.dates}-${i}`} delay={delay + (i + 1) * 0.05}>
      <div className="text-sm">
        {typeof p.href === "string" && p.href.length > 0 ? (
          p.href.startsWith("http") ? (
            <a
              href={p.href}
              className="font-medium underline decoration-muted-foreground/40 underline-offset-2 hover:decoration-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.title}
            </a>
          ) : isLocaleScopedAppPath(p.href) ? (
            <I18nLink
              href={p.href}
              className="font-medium underline decoration-muted-foreground/40 underline-offset-2 hover:decoration-foreground"
            >
              {p.title}
            </I18nLink>
          ) : (
            <Link
              href={p.href}
              className="font-medium underline decoration-muted-foreground/40 underline-offset-2 hover:decoration-foreground"
            >
              {p.title}
            </Link>
          )
        ) : (
          <span className="font-medium">{p.title}</span>
        )}
        <span className="text-muted-foreground">
          {" — "}
          <CustomReactMarkdown>{p.authors}</CustomReactMarkdown>
        </span>
        <span className="text-muted-foreground ml-1 text-xs">({p.dates})</span>
      </div>
    </BlurFade>
  );

  if (!mounted) {
    return (
      <div className="mt-8">
        <h3 className={subsectionHeadingClass}>{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">{subtitle}</p>
        <div className="space-y-3">
          {items.slice(0, initialVisible).map((p, i) => row(p, i))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className={subsectionHeadingClass}>{title}</h3>
      <p className="text-muted-foreground mb-4 text-sm">{subtitle}</p>
      <div className="space-y-3">
        {displayed.map((p, i) => row(p, i))}
      </div>
      {hasMore && (
        <div className="flex justify-center pt-3">
          {!showAll ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2"
            >
              <ChevronDown className="h-4 w-4" />
              {showAllText}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(false)}
              className="flex items-center gap-2"
            >
              <ChevronUp className="h-4 w-4" />
              {showLessText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
