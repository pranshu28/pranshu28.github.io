import { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import { getPathname, LOCALES } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

const siteUrl = siteConfig.url;

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"
  | undefined;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: Array<"/" | "/blog" | "/beyond-work/"> = [
    "/",
    "/blog",
    "/beyond-work/",
  ];

  const pages = LOCALES.flatMap((locale) => {
    return staticPages.map((page) => ({
      url: `${siteUrl}${getPathname({ locale, href: page })}`,
      lastModified: new Date(),
      changeFrequency: (["/", "/blog", "/beyond-work/"].includes(page)
        ? "weekly"
        : "monthly") as ChangeFrequency,
      priority:
        page === "/"
          ? 1.0
          : page === "/blog"
            ? 0.8
            : page === "/beyond-work/"
              ? 0.85
              : 0.5,
    }));
  });

  const allBlogSitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const posts = await getBlogPosts(locale);
    posts
      .filter(
        (post) =>
          post.slug &&
          (post.metadata.status !== "draft" || !post.metadata.status),
      )
      .forEach((post) => {
        const slugPart = post.slug.replace(/^\//, "").replace(/^blogs\//, "");
        if (slugPart) {
          allBlogSitemapEntries.push({
            url: `${siteUrl}${getPathname({
              locale,
              href: `/blog/${slugPart}`,
            })}`,
            lastModified: post.metadata.updatedAt
              ? new Date(post.metadata.updatedAt as string)
              : post.metadata.date
                ? new Date(post.metadata.date)
                : new Date(),
            changeFrequency: "monthly" as ChangeFrequency,
            priority: 0.7,
          });
        }
      });
  }

  return [...pages, ...allBlogSitemapEntries];
}
