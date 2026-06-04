import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/60 bg-ink-50/80 backdrop-blur-md supports-[backdrop-filter]:bg-ink-50/70 dark:border-ink-800/60 dark:bg-ink-950/80 dark:supports-[backdrop-filter]:bg-ink-950/70">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-base font-semibold text-ink-950 dark:text-ink-50 transition-colors"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6 text-ink-950 dark:text-ink-50 group-hover:text-accent transition-colors"
            fill="none"
          >
            <path
              d="M9.2 6.6c.8-1.6 4.8-1.6 5.6 0 .4.8.4 1.7 0 2.5-.7 1.2-1.8 1.8-2.8 1.8s-2.1-.6-2.8-1.8c-.4-.8-.4-1.7 0-2.5Z"
              fill="currentColor"
              opacity="0.12"
            />
            <path
              d="M7.6 12.2c.2-2.7 2.4-4.6 4.4-4.6s4.2 1.9 4.4 4.6c.2 2.8-1 6.2-4.4 6.2s-4.6-3.4-4.4-6.2Z"
              fill="currentColor"
            />
            <path
              d="M8.4 9.1c-.9-.4-1.7-1.6-1.4-2.6.2-.7.9-.9 1.5-.5.9.6 1.3 1.8 1.1 2.6-.1.6-.6 1-1.2 1Z"
              fill="currentColor"
            />
            <path
              d="M15.6 9.1c.9-.4 1.7-1.6 1.4-2.6-.2-.7-.9-.9-1.5-.5-.9.6-1.3 1.8-1.1 2.6.1.6.6 1 1.2 1Z"
              fill="currentColor"
            />
            <path
              d="M10.3 14.5c.3.4.9.7 1.7.7s1.4-.3 1.7-.7"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="opacity-90 [stroke:white] dark:[stroke:#09090b]"
            />
            <path
              d="M9.2 13.2c.3-.6.9-1 1.6-1"
              strokeWidth="1.1"
              strokeLinecap="round"
              className="opacity-75 [stroke:white] dark:[stroke:#09090b]"
            />
            <path
              d="M14.8 13.2c-.3-.6-.9-1-1.6-1"
              strokeWidth="1.1"
              strokeLinecap="round"
              className="opacity-75 [stroke:white] dark:[stroke:#09090b]"
            />
          </svg>
          <span>袋熊挖呀挖</span>
        </Link>
        <div className="flex items-center gap-1">
          <nav className="hidden sm:flex items-center gap-1 text-sm text-ink-600 dark:text-ink-400 mr-1">
            <Link href="/" className="rounded-full px-3 py-1.5 hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800 dark:hover:text-ink-100 transition-colors">
              首页
            </Link>
            <Link href="/blog" className="rounded-full px-3 py-1.5 hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800 dark:hover:text-ink-100 transition-colors">
              博客
            </Link>
            <Link href="/login" className="rounded-full px-3 py-1.5 hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800 dark:hover:text-ink-100 transition-colors">
              登录
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
