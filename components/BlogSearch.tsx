"use client";

import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

interface BlogSearchProps {
  posts: PostMeta[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const haystack = [
        p.title,
        p.excerpt ?? "",
        p.category ?? "",
        ...(p.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query]);

  return (
    <>
      <div className="relative mb-8">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 dark:text-ink-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索文章标题、摘要或标签…"
          aria-label="搜索文章"
          className="w-full rounded-full border border-ink-200/70 bg-white pl-10 pr-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-ink-800 dark:bg-ink-900/60 dark:text-ink-100 dark:placeholder:text-ink-500 dark:focus:border-accent-light"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="清除搜索"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800 dark:hover:text-ink-200 transition-colors"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {query && (
        <p className="mb-4 text-xs text-ink-500 dark:text-ink-500">
          匹配 {filtered.length} 篇
        </p>
      )}

      {filtered.length === 0 ? (
        <p className="text-ink-500 py-12 text-center">
          没有匹配 “{query}” 的文章。
        </p>
      ) : (
        <ul className="divide-y divide-ink-200/70 dark:divide-ink-800/70">
          {filtered.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
