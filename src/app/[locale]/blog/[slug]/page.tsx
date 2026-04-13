import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { getBlogPosts, getPost } from "@/lib/blog";
import { pageTitleClass } from "@/lib/page-typography";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const enPosts = await getBlogPosts("en");
  const enArray = Array.isArray(enPosts) ? enPosts : [];
  return enArray
    .filter((post) => post?.slug)
    .map((post) => ({ locale: "en", slug: post.slug }));
}

export default async function Blog(props: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const post = await getPost(params.slug, locale);
  const t = await getTranslations({ locale });

  if (!post) {
    return null;
  }

  const readingTime = post.metadata.readingTime || 1;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-10">
      <h1 className={`${pageTitleClass} mb-3`}>{post.metadata.title}</h1>
      <div className="mb-8 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <p>{formatDate(post.metadata.date, locale)}</p>
          <span className="mx-1">&middot;</span>
          <p>{t("blog.readingTime", { minutes: readingTime })}</p>
        </div>
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
    </div>
  );
}
