import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";

const BLOG_DESC =
  "袋熊挖呀挖博客全部文章列表，涵盖生活随笔、读书札记与技术心得。";

export const metadata: Metadata = {
  title: "全部文章",
  description: BLOG_DESC,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "全部文章",
    description: BLOG_DESC,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "全部文章",
    description: BLOG_DESC,
    images: ["/og-default.jpg"],
  },
};

export default function BlogListPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-10">
        <p className="text-sm text-ink-500 dark:text-ink-500 mb-2 uppercase tracking-wider">
          归档
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-ink-950 dark:text-ink-50 leading-tight">
          全部文章
        </h1>
        <p className="mt-3 text-ink-500 dark:text-ink-500 text-sm">
          共 {posts.length} 篇
        </p>
      </header>
      <CategoryNav categories={categories} />
      {posts.length === 0 ? (
        <p className="text-ink-500">暂无文章。</p>
      ) : (
        <ul className="divide-y divide-ink-200/70 dark:divide-ink-800/70">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
