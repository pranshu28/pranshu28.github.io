import Link from "next/link";
import { getTranslations } from "next-intl/server";

import Brief from "@/components/portfolio/brief";
import Contact from "@/components/portfolio/contact";
import Education from "@/components/portfolio/education";
import NewsSection from "@/components/portfolio/news";
import PreprintsOthers from "@/components/portfolio/preprints-others";
import ProjectsSection from "@/components/portfolio/projects-section/projects-section";
import SocialLinks from "@/components/portfolio/socallinks";
import Work from "@/components/portfolio/work";
import { CustomReactMarkdown } from "@/components/react-markdown";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY, siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";
import { generatePersonJsonLd } from "@/lib/jsonld";
import { transformSocialData } from "@/lib/social-icons";
import {
  getIconComponent,
  jsonldScript,
  sortByLatestYearDesc,
} from "@/lib/utils";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });

  // Get data from i18n
  const socialData = transformSocialData(
    t.raw("social") as Record<
      string,
      {
        name: string;
        url: string;
        icon: string;
        navbar?: boolean;
        content?: boolean;
        footer?: boolean;
      }
    >,
  );
  const personJsonLd = await generatePersonJsonLd(locale);

  // Helper function to safely get collections items
  const getCollectionItems = <T,>(key: string): T[] => {
    try {
      const parentKey = key.split(".")[0];
      const collection = t.raw(parentKey) as
        | { items?: T[] | undefined }
        | undefined
        | null;
      // Check if collection exists and has items property that is an array
      if (
        collection &&
        typeof collection === "object" &&
        "items" in collection &&
        Array.isArray(collection.items)
      ) {
        return collection.items as T[];
      }
      return [];
    } catch {
      // If the key doesn't exist or any error occurs, return empty array
      return [];
    }
  };

  // Get collections data and check if items are empty
  const newsItems = getCollectionItems<{
    date: string;
    title: string;
    content: string;
  }>("news.items");
  const publicationsItems = getCollectionItems<{
    title: string;
    href?: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: string[];
    authors: string;
    links?: Array<{ type: string; href: string; icon: string }>;
    image?: string;
    video?: string;
  }>("publications.items");
  const educationItems = getCollectionItems<{
    school: string;
    href: string;
    degree: string;
    logoUrl: string;
    start: string;
    end: string;
  }>("education.items");
  const workItems = getCollectionItems<{
    company: string;
    href: string;
    badges: readonly string[];
    location: string;
    title: string;
    logoUrl: string;
    start: string;
    end: string;
    description: string;
  }>("work.items");

  const preprintItems = getCollectionItems<{
    title: string;
    dates: string;
    authors: string;
    href?: string;
  }>("preprints.items");

  const earlierWorkProjects = sortByLatestYearDesc(
    getCollectionItems<{
      title: string;
      href?: string;
      dates: string;
      active: boolean;
      description: string;
      technologies: string[];
      authors: string;
      links?: Array<{ type: string; href: string; icon: string }>;
      image?: string;
      video?: string;
    }>("projects.items"),
  );

  const serviceData = (t.raw("service") as {
    reviewing: string[];
    teaching: string[];
    volunteering: string[];
  }) ?? { reviewing: [], teaching: [], volunteering: [] };

  return (
    <main className="mx-auto flex min-h-dvh max-w-7xl flex-col space-y-8 px-6 py-8 pb-24 sm:space-y-10 sm:px-16 md:px-20 md:py-16 md:pt-14 lg:px-24 lg:py-20 xl:px-32 xl:py-24">
      {/* Hero Section */}
      <section id="hero" className="mt-16 sm:mt-28">
        {jsonldScript(personJsonLd)}
        <BlurFade delay={0}>
          <Brief
            name={t("name.full")}
            firstName={t("name.given")}
            surname={t("name.family")}
            initials={t("name.initials")}
            subtitle={t("subtitle")}
            description={t("headline")}
            avatarUrl={siteConfig.avatarUrl}
            className="mx-auto w-full max-w-2xl space-y-8"
            locale={locale}
          />
        </BlurFade>
      </section>

      {/* Social Links Section */}
      <section id="social">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <SocialLinks socials={socialData} />
        </BlurFade>
      </section>

      {/* About Section */}
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{t("sections.about")}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose text-muted-foreground dark:prose-invert max-w-full font-sans text-sm text-pretty [&_img]:my-0 [&_img]:inline-block [&_img]:h-[1em] [&_img]:w-auto [&_img]:align-baseline">
            <CustomReactMarkdown>{t("bioMarkdown")}</CustomReactMarkdown>
          </div>
        </BlurFade>
      </section>

      {/* News Section */}
      {newsItems && newsItems.length > 0 && (
        <section id="news">
          <NewsSection
            news={newsItems}
            delay={BLUR_FADE_DELAY * 5}
            title={t("sections.news.title")}
            showAllText={t("showAll")}
          />
        </section>
      )}

      {/* Publications Section */}
      {publicationsItems && publicationsItems.length > 0 && (
        <section id="publications">
          <div className="w-full space-y-12 py-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
                  {t("sections.research")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t("sections.publications.title")}
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("sections.viewFullPublications")}{" "}
                  <Link
                    href={socialData.GoogleScholar.url}
                    className="text-foreground underline hover:no-underline"
                    target="_blank"
                  >
                    {socialData.GoogleScholar.name}
                  </Link>
                </p>
              </div>
            </div>
            <ProjectsSection
              projects={publicationsItems.map((project) => ({
                ...project,
                links: project.links?.map((link) => ({
                  ...link,
                  icon: getIconComponent(link.icon),
                })),
              }))}
              delay={BLUR_FADE_DELAY * 3}
              mobileDisplayCount={6}
              desktopDisplayCount={6}
              showAllText={t("showAll")}
            />

            {preprintItems.length > 0 && (
              <PreprintsOthers
                items={preprintItems}
                title={t("sections.publications.othersTitle")}
                subtitle={t("sections.publications.othersSubtitle")}
                showAllText={t("showAll")}
                showLessText={t("showLess")}
                delay={BLUR_FADE_DELAY}
                initialVisible={4}
              />
            )}
          </div>
        </section>
      )}

      {/* Education Section */}
      {educationItems && educationItems.length > 0 && (
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <h2 className="text-xl font-bold">{t("sections.education")}</h2>
            <Education educations={educationItems} />
          </div>
        </section>
      )}

      {/* Work Section */}
      {Array.isArray(workItems) && workItems.length > 0 && (
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <h2 className="text-xl font-bold">
              {t("sections.workExperience")}
            </h2>
            <Work work={workItems} />
          </div>
        </section>
      )}

      {/* Service & Teaching Section */}
      <section id="service">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="flex min-h-0 flex-col gap-y-4">
            <h2 className="text-xl font-bold">
              {t("sections.academicServices")}
            </h2>
            <div className="text-muted-foreground space-y-4 text-sm">
              <div>
                <span className="text-foreground mb-1 block font-medium">
                  {t("sections.serviceReviewer")}
                </span>
                <span>{serviceData.reviewing.join(" · ")}</span>
              </div>
              <div>
                <span className="text-foreground mb-1 block font-medium">
                  {t("sections.serviceTeachingAssistant")}
                </span>
                <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-0.5">
                  {serviceData.teaching.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-foreground mb-1 block font-medium">
                  {t("sections.serviceVolunteering")}
                </span>
                <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-0.5 [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2">
                  {serviceData.volunteering.map((line, i) => (
                    <li key={i}>
                      <CustomReactMarkdown inline>{line}</CustomReactMarkdown>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* Earlier Work Section */}
      {earlierWorkProjects.length > 0 && (
        <section id="projects">
          <div className="flex min-h-0 flex-col gap-y-3">
            <h2 className="text-xl font-bold">{t("sections.earlierWork")}</h2>
            <ProjectsSection
              projects={earlierWorkProjects.map((project) => ({
                ...project,
                links: project.links?.map((link) => ({
                  ...link,
                  icon: getIconComponent(link.icon),
                })),
              }))}
              delay={BLUR_FADE_DELAY * 3}
              mobileDisplayCount={4}
              desktopDisplayCount={3}
              showAllText={t("showAll")}
            />
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact">
        <div className="grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
          <Contact
            emailUrl={socialData.email.url}
            contactLabel={t("sections.contact")}
            getInTouch={t("sections.getInTouch")}
            contactDescription={t("sections.contactDescription")}
            viaEmail={t("sections.viaEmail")}
          />
        </div>
      </section>
    </main>
  );
}
