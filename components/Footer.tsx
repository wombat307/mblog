import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-ink-200/60 dark:border-ink-800/60">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-ink-500 dark:text-ink-500 sm:flex-row sm:px-6">
        <p>© {year} 袋熊挖呀挖</p>
        <div className="flex items-center gap-4">
          <Link href="/feed.xml" className="hover:text-ink-900 dark:hover:text-ink-100 transition-colors">
            RSS
          </Link>
          <Link href="/sitemap.xml" className="hover:text-ink-900 dark:hover:text-ink-100 transition-colors">
            Sitemap
          </Link>
          <span className="text-ink-300 dark:text-ink-700">·</span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
