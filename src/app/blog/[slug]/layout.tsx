import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MobileTOC } from "@/components/blog/toc/mobile-toc";
import { TableOfContents } from "@/components/blog/toc/table-of-contents";
import type { Locale } from "@/i18n/routing";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/routing";
import { getAvailableLocales, getBlogPosts, getPost } from "@/lib/blog";
import { generateBlogPostingJsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { jsonldScript } from "@/lib/utils";

export async function generateStaticParams() {
  const enPosts = await getBlogPosts("en");
  const enArray = Array.isArray(enPosts) ? enPosts : [];
  return enArray
    .filter((post) => post?.slug)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const locale = DEFAULT_LOCALE as Locale;
  const post = await getPost(params.slug, locale);

  if (!post) {
    return undefined;
  }

  const { title, date: publishedTime, summary: description } = post.metadata;

  const blogPath = `/blog/${post.slug}`;
  const availableLocales = await getAvailableLocales(params.slug, [...LOCALES]);

  const baseMetadata = await constructMetadata({
    title,
    description,
    path: blogPath,
    locale,
    availableLocales,
  });

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
      publishedTime,
    },
  };
}

export default async function BlogLayout(props: {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}) {
  const params = await props.params;
  const locale = DEFAULT_LOCALE;
  const post = await getPost(params.slug, locale);

  if (!post) {
    notFound();
  }

  const blogPostingJsonLd = await generateBlogPostingJsonLd(post);

  return (
    <main
      id="blog"
      className="pt-16 pb-12 sm:pt-24 sm:pb-14 md:pt-32 md:pb-16 lg:pt-36 xl:pt-40"
    >
      {jsonldScript(blogPostingJsonLd)}

      <div className="fixed top-32 left-6 z-10 hidden xl:block">
        <TableOfContents content={post.source} />
      </div>

      <MobileTOC content={post.source} />

      {props.children}
    </main>
  );
}
