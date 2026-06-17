import Link from "next/link";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/zhangxiaowan",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
        />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2H21.5l-7.59 8.67L22.5 22h-6.815l-5.34-6.98L4.21 22H.952l8.11-9.27L1.5 2h6.99l4.82 6.38L18.244 2Zm-1.193 18h1.844L7.04 4H5.094l11.957 16Z" />
      </svg>
    ),
  },
  {
    name: "微博",
    href: "https://weibo.com/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
        <path d="M10.32 20.6c-4.21.42-7.84-1.49-8.11-4.27-.27-2.79 2.92-5.38 7.13-5.8 4.21-.42 7.84 1.49 8.11 4.27.27 2.79-2.92 5.38-7.13 5.8Zm6.74-9.79c-.44-.13-.74-.22-.51-.79.5-1.25.55-2.33.01-3.1-1.02-1.45-3.8-1.37-6.99-.03 0 0-1 .44-.74-.35.49-1.59.42-2.92-.35-3.69-1.75-1.74-6.39.07-10.36 4.06C-.78 9.83-2 13.06-2 15.85c0 5.34 6.85 8.59 13.55 8.59 8.78 0 14.62-5.1 14.62-9.14 0-2.44-2.06-3.83-3.11-4.49Zm2.4-6.5c-1.67-1.85-4.13-2.55-6.41-2.07-.53.11-.86.63-.75 1.15.12.52.65.85 1.18.74 1.62-.34 3.36.16 4.55 1.47 1.18 1.31 1.5 3.08.98 4.65a.972.972 0 0 0 .61 1.23.97.97 0 0 0 1.22-.61c.74-2.21.28-4.7-1.38-6.56ZM17.8 5.59a3.342 3.342 0 0 0-3.22-1.04.84.84 0 0 0 .35 1.63 1.66 1.66 0 0 1 1.59.51c.41.46.54 1.1.34 1.68a.83.83 0 0 0 .53 1.06c.44.15.92-.08 1.07-.52a3.34 3.34 0 0 0-.66-3.32ZM9.5 17.86c-2.36.22-4.39-1.04-4.55-2.79-.15-1.76 1.66-3.37 4.02-3.59 2.36-.21 4.4 1.05 4.55 2.81.15 1.75-1.66 3.36-4.02 3.57Zm-1.42-1.6c-.71.34-1.6.13-1.97-.46s-.1-1.36.6-1.7c.7-.34 1.59-.13 1.96.47.36.59.1 1.35-.59 1.69Zm1.43-2.32a.601.601 0 0 1-.81.18.601.601 0 0 1-.18-.81c.18-.27.55-.36.81-.18.27.18.36.55.18.81Z" />
      </svg>
    ),
  },
  {
    name: "邮箱",
    href: "mailto:anita99zxw@gmail.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    name: "RSS",
    href: "/feed.xml",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
        <path d="M4 4.444C14.838 4.444 19.556 9.162 19.556 20h-3.112C16.444 10.881 13.119 7.556 4 7.556V4.444Zm0 6.223c5.556 0 8.889 3.333 8.889 8.889H9.778c0-3.778-2.111-5.889-5.778-5.889v-3Zm2.222 6.222a1.778 1.778 0 1 1 0 3.555 1.778 1.778 0 0 1 0-3.555Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-ink-200/60 dark:border-ink-800/60">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-10 sm:px-6">
        <nav aria-label="社交媒体" className="flex items-center gap-2">
          {socials.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              aria-label={s.name}
              title={s.name}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-950 text-ink-50 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-800 hover:shadow-soft-md dark:bg-ink-50 dark:text-ink-950 dark:shadow-none dark:hover:bg-ink-200"
            >
              {s.icon}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-center gap-2 text-sm text-ink-500 dark:text-ink-500 sm:flex-row sm:gap-4">
          <p>© {year} 袋熊挖呀挖</p>
          <span className="hidden text-ink-300 dark:text-ink-700 sm:inline">·</span>
          <Link
            href="/sitemap.xml"
            className="hover:text-ink-900 dark:hover:text-ink-100 transition-colors"
          >
            Sitemap
          </Link>
          <span className="hidden text-ink-300 dark:text-ink-700 sm:inline">·</span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
