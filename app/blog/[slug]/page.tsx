import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import Markdown from "@/components/Markdown";
import Comments from "@/components/Comments";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: `${post.title} | mblog`,
    description: post.excerpt ?? undefined,
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

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/blog"
        className="text-sm text-ink-500 hover:text-accent mb-6 inline-block"
      >
        ← 返回博客列表
      </Link>
      <header className="mb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <time className="text-xs text-ink-500 uppercase tracking-wider">
            {dateStr}
          </time>
          {post.category && (
            <Link
              href={`/blog/category/${encodeURIComponent(post.category)}`}
              className="text-xs font-medium text-accent hover:text-accent-dark"
            >
              {post.category}
            </Link>
          )}
        </div>
        <h1 className="font-display text-3xl text-ink-950 mt-2 sm:text-4xl">
          {post.title}
        </h1>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-ink-100 px-2 py-0.5 text-xs text-ink-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="min-w-0">
        <Markdown content={post.content} />
      </div>
      <Comments postSlug={slug} />
    </article>
  );
}
