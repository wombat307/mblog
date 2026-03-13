import { getAllPosts, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";

export const metadata = {
  title: "博客 | mblog",
  description: "全部文章列表",
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
