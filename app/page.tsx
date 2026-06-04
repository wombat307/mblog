import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <section>
        <h2 className="font-display text-2xl text-ink-950 mb-6">最近文章</h2>
        {posts.length === 0 ? (
          <p className="text-ink-500">暂无文章，请在 content/posts 下添加 .md 文件。</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
        {posts.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="text-accent hover:text-accent-dark text-sm font-medium"
            >
              查看全部 →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
