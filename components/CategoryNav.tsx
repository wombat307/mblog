import Link from "next/link";

interface CategoryNavProps {
  categories: string[];
  currentCategory?: string | null;
}

export default function CategoryNav({ categories, currentCategory }: CategoryNavProps) {
  const baseChip =
    "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200";
  const idleChip =
    "bg-ink-100/70 text-ink-600 hover:bg-ink-200 hover:text-ink-900 dark:bg-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-100";
  const activeChip =
    "bg-ink-950 text-ink-50 shadow-soft dark:bg-ink-50 dark:text-ink-950";

  return (
    <nav className="flex flex-wrap gap-2 mb-10" aria-label="文章分类">
      <Link href="/blog" className={`${baseChip} ${!currentCategory ? activeChip : idleChip}`}>
        全部
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/blog/category/${encodeURIComponent(cat)}`}
          className={`${baseChip} ${currentCategory === cat ? activeChip : idleChip}`}
        >
          {cat}
        </Link>
      ))}
    </nav>
  );
}
