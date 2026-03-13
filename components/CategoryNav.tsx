import Link from "next/link";

interface CategoryNavProps {
  categories: string[];
  currentCategory?: string | null;
}

export default function CategoryNav({ categories, currentCategory }: CategoryNavProps) {
  return (
    <nav className="flex flex-wrap gap-2 border-b border-ink-200 pb-6 mb-8" aria-label="文章分类">
      <Link
        href="/blog"
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          !currentCategory
            ? "bg-accent text-white"
            : "bg-ink-100 text-ink-600 hover:bg-ink-200 hover:text-ink-800"
        }`}
      >
        全部
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/blog/category/${encodeURIComponent(cat)}`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            currentCategory === cat
              ? "bg-accent text-white"
              : "bg-ink-100 text-ink-600 hover:bg-ink-200 hover:text-ink-800"
          }`}
        >
          {cat}
        </Link>
      ))}
    </nav>
  );
}
