"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";

import { ResumeCard } from "@/components/portfolio/resume-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";

interface Work {
  company: string;
  logoUrl: string;
  title: string;
  href?: string;
  badges?: readonly string[];
  start: string;
  end?: string;
  description: string;
  location: string;
}

interface WorkProps {
  work: readonly Work[];
  moreWork?: readonly Work[];
  showAllText?: string;
  showLessText?: string;
}

function workRowKey(item: Work): string {
  return `${item.company}\0${item.title}\0${item.start}\0${item.end ?? ""}`;
}

export default function Work({
  work,
  moreWork = [],
  showAllText = "Show All",
  showLessText = "Show Less",
}: WorkProps) {
  const [showAll, setShowAll] = useState(false);

  const displayed = useMemo(() => {
    if (!showAll || moreWork.length === 0) return [...work];
    return [...work, ...moreWork];
  }, [work, moreWork, showAll]);

  const hasMore = moreWork.length > 0;

  return (
    <div className="flex flex-col gap-y-3">
      {displayed.map((item) => (
        <ResumeCard
          key={workRowKey(item)}
          logoUrl={item.logoUrl}
          altText={item.company}
          title={item.company}
          location={item.location}
          subtitle={item.title}
          href={item.href}
          badges={item.badges}
          period={`${item.start} - ${item.end ?? "Present"}`}
          description={item.description}
        />
      ))}
      {hasMore ? (
        <BlurFade delay={0.15}>
          <div className="flex justify-center pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAll((v) => !v)}
              className="flex items-center gap-2"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  {showLessText}
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  {showAllText}
                </>
              )}
            </Button>
          </div>
        </BlurFade>
      ) : null}
    </div>
  );
}
