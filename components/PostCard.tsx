import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="group rounded-lg border border-ink-200/80 bg-white p-5 shadow-sm transition hover:border-accent/30 hover:shadow-md">
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
      <h2 className="mt-2 font-display text-lg text-ink-950 group-hover:text-accent transition-colors">
        <Link href={`/blog/${post.slug}`} className="block">
          {post.title}
        </Link>
      </h2>
      {post.excerpt && (
        <p className="mt-2 text-sm text-ink-600 line-clamp-2">{post.excerpt}</p>
      )}
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
    </article>
  );
}
