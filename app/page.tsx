import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

// 不覆盖 metadata：页面级 openGraph/alternates 会完全替换父级，覆盖会丢失 RSS alternate 与默认 OG 图。

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <section className="mb-12">
        <p className="text-sm text-ink-500 dark:text-ink-500 mb-3 uppercase tracking-wider">
          袋熊挖呀挖
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-ink-950 dark:text-ink-50 leading-tight">
          挖呀挖，挖出生活、读书<br className="hidden sm:block" />与一点技术。
        </h1>
        <p className="mt-4 text-ink-600 dark:text-ink-400 text-lg leading-relaxed">
          一个用 Next.js 写的极简个人博客，写给自己看，也欢迎被你看见。
        </p>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-500">
            最近文章
          </h2>
          <Link
            href="/blog"
            className="text-sm text-ink-500 hover:text-ink-950 dark:text-ink-500 dark:hover:text-ink-100 transition-colors"
          >
            全部 →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-ink-500 py-12">暂无文章，请在 content/posts 下添加 .md 文件。</p>
        ) : (
          <ul className="divide-y divide-ink-200/70 dark:divide-ink-800/70">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
