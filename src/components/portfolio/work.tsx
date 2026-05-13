"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { ResumeCard } from "@/components/portfolio/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

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

interface WorkGroup {
  key: string;
  company: string;
  logoUrl: string;
  href?: string;
  location: string;
  badges?: readonly string[];
  roles: Work[];
}

function groupKey(item: Work): string {
  return `${item.company}\0${item.href ?? ""}\0${item.logoUrl}`;
}

function groupWork(items: readonly Work[]): WorkGroup[] {
  const groups = new Map<string, WorkGroup>();

  for (const item of items) {
    const key = groupKey(item);
    const existing = groups.get(key);
    if (existing) {
      existing.roles.push(item);
      continue;
    }

    groups.set(key, {
      key,
      company: item.company,
      logoUrl: item.logoUrl,
      href: item.href,
      location: item.location,
      badges: item.badges,
      roles: [item],
    });
  }

  return [...groups.values()];
}

function groupPeriod(roles: readonly Work[]): string {
  const newest = roles[0];
  const oldest = roles[roles.length - 1];
  return `${oldest.start} - ${newest.end ?? "Present"}`;
}

function GroupedWorkCard({ group }: { group: WorkGroup }) {
  const card = (
    <Card className="flex transition-[box-shadow] duration-300 ease-out hover:shadow-lg">
      <div className="flex-none">
        <Avatar className="bg-muted-background dark:bg-foreground m-auto size-12 border">
          <AvatarImage
            src={group.logoUrl}
            alt={group.company}
            className="object-contain"
          />
          <AvatarFallback>{group.company[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="ml-4 min-w-0 grow">
        <CardHeader>
          <div className="flex items-start justify-between gap-x-2">
            <div className="min-w-0">
              <h3 className="text-xs leading-none font-semibold sm:text-sm">
                {group.company}
              </h3>
              <div className="font-sans text-xs">
                {group.roles.length} roles
              </div>
            </div>
            <div className="text-muted-foreground text-right text-xs tabular-nums sm:text-sm">
              {group.location} | {groupPeriod(group.roles)}
            </div>
          </div>
          <div className="mt-3 space-y-2 border-l pl-3">
            {group.roles.map((role) => (
              <div key={workRowKey(role)} className="space-y-0.5">
                <div className="text-xs leading-snug font-medium">
                  {role.title}
                </div>
                <div className="text-muted-foreground text-xs tabular-nums">
                  {role.start} - {role.end ?? "Present"}
                </div>
              </div>
            ))}
          </div>
        </CardHeader>
      </div>
    </Card>
  );

  if (!group.href || group.href.trim() === "") {
    return <div className="block">{card}</div>;
  }

  return (
    <Link href={group.href} className="block">
      {card}
    </Link>
  );
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

  const grouped = useMemo(() => groupWork(displayed), [displayed]);
  const hasMore = moreWork.length > 0;

  return (
    <div className="flex flex-col gap-y-3">
      {grouped.map((group) =>
        group.roles.length > 1 ? (
          <GroupedWorkCard key={group.key} group={group} />
        ) : (
          <ResumeCard
            key={workRowKey(group.roles[0])}
            logoUrl={group.roles[0].logoUrl}
            altText={group.roles[0].company}
            title={group.roles[0].company}
            location={group.roles[0].location}
            subtitle={group.roles[0].title}
            href={group.roles[0].href}
            badges={group.roles[0].badges}
            period={`${group.roles[0].start} - ${
              group.roles[0].end ?? "Present"
            }`}
            description={group.roles[0].description}
          />
        ),
      )}
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
