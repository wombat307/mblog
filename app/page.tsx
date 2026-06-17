import Link from "next/link";
import {
  getAllPosts,
  getAllCategories,
  getPostBySlug,
  getPostsByCategory,
  type PostMeta,
} from "@/lib/posts";
import Markdown from "@/components/Markdown";
import { readingTime } from "@/lib/reading-time";

// 不覆盖 metadata：页面级 openGraph/alternates 会完全替换父级，覆盖会丢失 RSS alternate 与默认 OG 图。

// 按段落累加内容直到接近 maxChars，确保不在段落中途截断。
function previewMarkdown(content: string, maxChars: number): string {
  const blocks = content.trim().split(/\n{2,}/);
  let out = "";
  for (const block of blocks) {
    if (out.length + block.length > maxChars && out.length > 0) break;
    out += (out ? "\n\n" : "") + block;
    if (out.length >= maxChars) break;
  }
  return out;
}

export default function HomePage() {
  const allPosts = getAllPosts();
  const latestMeta = allPosts[0];
  const latest = latestMeta ? getPostBySlug(latestMeta.slug) : null;
  const categories = getAllCategories();

  // 每个分类取最新一篇，组成"按分类速览"
  const byCategory = categories
    .map((cat) => {
      const posts = getPostsByCategory(cat);
      const newest = posts[0];
      return newest ? { category: cat, count: posts.length, newest } : null;
    })
    .filter((x): x is { category: string; count: number; newest: PostMeta } => x !== null);

  if (!latest) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-ink-500 py-12">
          暂无文章，请在 content/posts 下添加 .md 文件。
        </p>
      </div>
    );
  }

  const dateStr = latest.date
    ? new Date(latest.date).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const minutes = readingTime(latest.content);
  const preview = previewMarkdown(latest.content, 100);
  const truncated = preview.length < latest.content.trim().length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <article>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-500 mb-3">
          最新文章
        </p>
        <header className="mb-10">
          <div className="flex items-center gap-3 flex-wrap text-xs text-ink-500 dark:text-ink-500 uppercase tracking-wider">
            {latest.category && (
              <>
                <Link
                  href={`/blog/category/${encodeURIComponent(latest.category)}`}
                  className="font-medium text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-accent normal-case tracking-normal"
                >
                  {latest.category}
                </Link>
                <span className="text-ink-300 dark:text-ink-700">·</span>
              </>
            )}
            {dateStr && <time dateTime={latest.date}>{dateStr}</time>}
            <span className="text-ink-300 dark:text-ink-700">·</span>
            <span>{minutes} 分钟阅读</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink-950 dark:text-ink-50 mt-3 leading-snug">
            <Link
              href={`/blog/${latest.slug}`}
              className="hover:text-accent dark:hover:text-accent-light transition-colors"
            >
              {latest.title}
            </Link>
          </h1>
          {latest.excerpt && (
            <p className="mt-5 text-lg text-ink-600 dark:text-ink-400 leading-relaxed">
              {latest.excerpt}
            </p>
          )}
          {latest.tags && latest.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {latest.tags.map((tag) => (
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
        <hr className="border-0 h-px bg-ink-200 dark:bg-ink-800 mb-10" />
        <div className="min-w-0 relative">
          <Markdown content={preview} />
          {truncated && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-ink-50 dark:to-ink-950"
            />
          )}
        </div>
        <div className="mt-8 flex items-center justify-end">
          <Link
            href={`/blog/${latest.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-accent transition-colors"
          >
            {truncated ? "继续阅读" : "查看独立页"} →
          </Link>
        </div>
      </article>

      {byCategory.length > 0 && (
        <>
          <hr className="border-0 h-px bg-ink-200 dark:bg-ink-800 my-14" />
          <section>
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-500">
                按分类速览
              </h2>
              <Link
                href="/blog"
                className="text-sm text-ink-500 hover:text-ink-950 dark:text-ink-500 dark:hover:text-ink-100 transition-colors"
              >
                时间线 →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {byCategory.map(({ category, count, newest }) => (
                <CategoryCard
                  key={category}
                  category={category}
                  count={count}
                  newest={newest}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function CategoryCard({
  category,
  count,
  newest,
}: {
  category: string;
  count: number;
  newest: PostMeta;
}) {
  const d = newest.date ? new Date(newest.date) : null;
  const dateLabel = d
    ? `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
        d.getDate(),
      ).padStart(2, "0")}`
    : "";

  return (
    <article className="group rounded-2xl bg-white p-5 shadow-soft transition-all hover:shadow-soft-md dark:bg-ink-900/60 dark:shadow-none dark:border dark:border-ink-800/80 dark:hover:border-ink-700">
      <div className="flex items-center justify-between mb-3">
        <Link
          href={`/blog/category/${encodeURIComponent(category)}`}
          className="text-xs font-medium tracking-wider uppercase text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-accent"
        >
          {category}
        </Link>
        <span className="text-[11px] text-ink-400 dark:text-ink-600">
          {count} 篇
        </span>
      </div>
      <h3 className="font-sans text-base font-semibold leading-snug text-ink-950 dark:text-ink-50">
        <Link
          href={`/blog/${newest.slug}`}
          className="hover:text-accent dark:hover:text-accent-light transition-colors"
        >
          {newest.title}
        </Link>
      </h3>
      {newest.excerpt && (
        <p className="mt-2 text-sm text-ink-600 dark:text-ink-400 line-clamp-2 leading-relaxed">
          {newest.excerpt}
        </p>
      )}
      {dateLabel && (
        <p className="mt-3 text-[11px] tabular-nums tracking-wider text-ink-400 dark:text-ink-600">
          {dateLabel}
        </p>
      )}
    </article>
  );
}
