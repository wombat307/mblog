import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const name = decodeURIComponent(category);
  return {
    title: `${name} | 分类 | mblog`,
    description: `「${name}」分类下的文章`,
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
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl text-ink-950 mb-2">分类：{categoryName}</h1>
      <p className="text-ink-500 text-sm mb-8">共 {posts.length} 篇</p>
      <CategoryNav categories={categories} currentCategory={categoryName} />
      {posts.length === 0 ? (
        <p className="text-ink-500">该分类下暂无文章。</p>
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
