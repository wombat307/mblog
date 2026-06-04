import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  // Return raw category names — Next.js handles percent-encoding when matching
  // requests. Returning encoded values made the prerendered route identifier
  // itself percent-encoded, which 404'd when browsers requested the encoded URL.
  const categories = getAllCategories();
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const name = decodeURIComponent(category);
  const description = `袋熊挖呀挖博客「${name}」分类下的全部文章列表与札记。`;
  const url = `/blog/category/${name}`;
  return {
    title: `${name} · 分类`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${name} · 分类`,
      description,
      images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} · 分类`,
      description,
      images: ["/og-default.jpg"],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryName = decodeURIComponent(category);
  const categories = getAllCategories();

  if (!categories.includes(categoryName)) {
    notFound();
  }

  const posts = getPostsByCategory(category);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-10">
        <p className="text-sm text-ink-500 dark:text-ink-500 mb-2 uppercase tracking-wider">
          分类
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-ink-950 dark:text-ink-50 leading-tight">
          {categoryName}
        </h1>
        <p className="mt-3 text-ink-500 dark:text-ink-500 text-sm">
          共 {posts.length} 篇
        </p>
      </header>
      <CategoryNav categories={categories} currentCategory={categoryName} />
      {posts.length === 0 ? (
        <p className="text-ink-500">该分类下暂无文章。</p>
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
