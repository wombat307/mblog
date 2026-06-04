import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import Markdown from "@/components/Markdown";
import Comments from "@/components/Comments";
import JsonLd from "@/components/JsonLd";
import { readingTime } from "@/lib/reading-time";

const SITE_URL = "https://zhangxiaowan.top";
const SITE_NAME = "袋熊挖呀挖";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };
  const url = `/blog/${slug}`;
  const description =
    post.excerpt ??
    `阅读《${post.title}》—— 袋熊挖呀挖博客${post.category ? `「${post.category}」分类` : ""}文章。`;
  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description,
      publishedTime: post.date || undefined,
      tags: post.tags,
      images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: ["/og-default.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const url = `${SITE_URL}/blog/${slug}`;
  const description =
    post.excerpt ??
    `阅读《${post.title}》—— ${SITE_NAME}${post.category ? `「${post.category}」分类` : ""}文章。`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    author: { "@type": "Person", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: `${SITE_URL}/og-default.jpg`,
    inLanguage: "zh-CN",
    keywords: post.tags?.join(", "),
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "博客", item: `${SITE_URL}/blog` },
      ...(post.category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: post.category,
              item: `${SITE_URL}/blog/category/${post.category}`,
            },
            { "@type": "ListItem", position: 4, name: post.title, item: url },
          ]
        : [{ "@type": "ListItem", position: 3, name: post.title, item: url }]),
    ],
  };

  const minutes = readingTime(post.content);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-900 dark:text-ink-500 dark:hover:text-ink-100 mb-10 transition-colors"
      >
        <span aria-hidden>←</span> 返回博客列表
      </Link>
      <header className="mb-12">
        <div className="flex items-center gap-3 flex-wrap text-xs text-ink-500 dark:text-ink-500 uppercase tracking-wider">
          {post.category && (
            <>
              <Link
                href={`/blog/category/${encodeURIComponent(post.category)}`}
                className="font-medium text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-accent normal-case tracking-normal"
              >
                {post.category}
              </Link>
              <span className="text-ink-300 dark:text-ink-700">·</span>
            </>
          )}
          <time>{dateStr}</time>
          <span className="text-ink-300 dark:text-ink-700">·</span>
          <span>{minutes} 分钟阅读</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-ink-950 dark:text-ink-50 mt-4 leading-tight">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-5 text-lg text-ink-600 dark:text-ink-400 leading-relaxed">
            {post.excerpt}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-ink-100 dark:bg-ink-800/80 px-2 py-0.5 text-[11px] text-ink-500 dark:text-ink-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <hr className="border-0 h-px bg-ink-200 dark:bg-ink-800 mb-12" />
      <div className="min-w-0">
        <Markdown content={post.content} />
      </div>
      <hr className="border-0 h-px bg-ink-200 dark:bg-ink-800 mt-16 mb-10" />
      <Comments postSlug={slug} />
    </article>
  );
}
