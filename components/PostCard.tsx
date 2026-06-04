import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
  variant?: "card" | "row";
}

export default function PostCard({ post, variant = "row" }: PostCardProps) {
  const d = post.date ? new Date(post.date) : null;
  const day = d ? d.getDate() : "";
  const monthYear = d
    ? `${d.getFullYear()}年${d.getMonth() + 1}月`
    : "";

  if (variant === "card") {
    return (
      <article className="group rounded-2xl bg-white shadow-soft hover:shadow-soft-md transition-all duration-200 p-6 dark:bg-ink-900/60 dark:shadow-none dark:border dark:border-ink-800/80 dark:hover:border-ink-700">
        <PostInner post={post} day={day} monthYear={monthYear} />
      </article>
    );
  }

  return (
    <article className="group grid grid-cols-[auto_1fr] gap-5 sm:gap-8 py-7">
      <DateStamp day={day} monthYear={monthYear} />
      <div className="min-w-0">
        <PostInner post={post} day={day} monthYear={monthYear} hideDate />
      </div>
    </article>
  );
}

function DateStamp({ day, monthYear }: { day: string | number; monthYear: string }) {
  return (
    <div className="flex flex-col items-start pt-1 select-none">
      <span className="font-display text-3xl leading-none text-ink-950 dark:text-ink-50 tabular-nums sm:text-4xl">
        {day}
      </span>
      <span className="mt-1 text-[11px] tracking-wider uppercase text-ink-500 dark:text-ink-500">
        {monthYear}
      </span>
    </div>
  );
}

function PostInner({
  post,
  hideDate,
}: {
  post: PostMeta;
  day: string | number;
  monthYear: string;
  hideDate?: boolean;
}) {
  return (
    <>
      {!hideDate && (
        <div className="flex items-center gap-3 mb-2 text-xs text-ink-500 dark:text-ink-500">
          {post.category && (
            <Link
              href={`/blog/category/${encodeURIComponent(post.category)}`}
              className="font-medium text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-accent"
            >
              {post.category}
            </Link>
          )}
        </div>
      )}
      {hideDate && post.category && (
        <Link
          href={`/blog/category/${encodeURIComponent(post.category)}`}
          className="inline-block mb-2 text-xs font-medium text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-accent"
        >
          {post.category}
        </Link>
      )}
      <h2 className="text-xl font-sans font-semibold text-ink-950 dark:text-ink-50 leading-snug">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-accent dark:hover:text-accent-light transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      {post.excerpt && (
        <p className="mt-2 text-[15px] text-ink-600 dark:text-ink-400 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-ink-100 dark:bg-ink-800/80 px-2 py-0.5 text-[11px] text-ink-500 dark:text-ink-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
