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
import { DEFAULT_LOCALE } from "@/i18n/routing";
import { generatePersonJsonLd } from "@/lib/jsonld";
import { sectionHeadingClass } from "@/lib/page-typography";
import { transformSocialData } from "@/lib/social-icons";
import {
  getIconComponent,
  jsonldScript,
  sortByLatestYearDesc,
  sortWorkExperienceDesc,
} from "@/lib/utils";

export default async function Page() {
  const locale = DEFAULT_LOCALE;
  const t = await getTranslations({ locale });

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

  const getCollectionItems = <T,>(key: string): T[] => {
    try {
      const parentKey = key.split(".")[0];
      const collection = t.raw(parentKey) as
        | { items?: T[] | undefined }
        | undefined
        | null;
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
      return [];
    }
  };

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
  type WorkEntry = {
    company: string;
    href: string;
    badges: readonly string[];
    location: string;
    title: string;
    logoUrl: string;
    start: string;
    end: string;
    description: string;
  };

  const WORK_EXPERIENCE_VISIBLE_COUNT = 5;
  const workBundle = t.raw("work") as
    | { items?: WorkEntry[]; moreItems?: WorkEntry[] }
    | undefined;
  const workAll = [
    ...(Array.isArray(workBundle?.items) ? workBundle.items : []),
    ...(Array.isArray(workBundle?.moreItems) ? workBundle.moreItems : []),
  ];
  const workSorted = sortWorkExperienceDesc(workAll);
  const workItems = workSorted.slice(0, WORK_EXPERIENCE_VISIBLE_COUNT);
  const workMoreItems = workSorted.slice(WORK_EXPERIENCE_VISIBLE_COUNT);

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

  return (
    <main className="mx-auto flex min-h-dvh max-w-7xl flex-col space-y-8 px-6 py-8 pb-24 sm:space-y-10 sm:px-16 md:px-20 md:py-16 md:pt-14 lg:px-24 lg:py-20 xl:px-32 xl:py-24">
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

      <section id="social">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <SocialLinks socials={socialData} />
        </BlurFade>
      </section>

      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className={sectionHeadingClass}>{t("sections.about")}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose text-muted-foreground dark:prose-invert max-w-full font-sans text-sm text-pretty [&_img]:my-0 [&_img]:inline-block [&_img]:h-[1em] [&_img]:w-auto [&_img]:align-baseline">
            <CustomReactMarkdown>{t("bioMarkdown")}</CustomReactMarkdown>
          </div>
        </BlurFade>
      </section>

      {newsItems && newsItems.length > 0 && (
        <section id="news">
          <NewsSection
            news={newsItems}
            delay={BLUR_FADE_DELAY * 6}
            title={t("sections.news.title")}
            showAllText={t("showAll")}
            showLessText={t("showLess")}
          />
        </section>
      )}

      {publicationsItems && publicationsItems.length > 0 && (
        <section id="publications">
          <div className="flex min-h-0 w-full flex-col space-y-8">
            <h2 className={sectionHeadingClass}>
              {t("sections.publications.title")}
            </h2>
            <ProjectsSection
              projects={publicationsItems.map((project) => ({
                ...project,
                links: project.links?.map((link) => ({
                  ...link,
                  icon: getIconComponent(link.icon),
                })),
              }))}
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

      {educationItems && educationItems.length > 0 && (
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <h2 className={sectionHeadingClass}>{t("sections.education")}</h2>
            <Education educations={educationItems} />
          </div>
        </section>
      )}

      {workItems.length > 0 || workMoreItems.length > 0 ? (
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <h2 className={sectionHeadingClass}>
              {t("sections.workExperience")}
            </h2>
            <Work
              work={workItems}
              moreWork={workMoreItems}
              showAllText={t("showAll")}
              showLessText={t("showLess")}
            />
          </div>
        </section>
      ) : null}

      {earlierWorkProjects.length > 0 && (
        <section id="projects">
          <div className="flex min-h-0 flex-col gap-y-3">
            <h2 className={sectionHeadingClass}>{t("sections.earlierWork")}</h2>
            <ProjectsSection
              projects={earlierWorkProjects.map((project) => ({
                ...project,
                links: project.links?.map((link) => ({
                  ...link,
                  icon: getIconComponent(link.icon),
                })),
              }))}
              mobileDisplayCount={4}
              desktopDisplayCount={3}
              showAllText={t("showAll")}
            />
          </div>
        </section>
      )}

      <section id="beyond-work" aria-labelledby="beyond-work-heading">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 id="beyond-work-heading" className={sectionHeadingClass}>
            {t("sections.beyondWork.title")}
          </h2>
          <CustomReactMarkdown
            className="text-muted-foreground dark:prose-invert prose mt-2 max-w-2xl text-sm leading-relaxed [&_a]:text-foreground [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:no-underline"
          >
            {t("sections.beyondWork.contentMarkdown")}
          </CustomReactMarkdown>
        </BlurFade>
      </section>

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
