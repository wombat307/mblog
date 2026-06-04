import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";

const BLOG_DESC =
  "袋熊的网络空间博客全部文章列表，涵盖生活随笔、读书札记与技术心得。";

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
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl text-ink-950 mb-8">全部文章</h1>
      <CategoryNav categories={categories} />
      {posts.length === 0 ? (
        <p className="text-ink-500">暂无文章。</p>
      ) : (
        <ul className="space-y-6">
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
