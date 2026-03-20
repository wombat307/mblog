import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-ink-200/80 bg-ink-50/95 backdrop-blur supports-[backdrop-filter]:bg-ink-50/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-display text-xl text-ink-950 hover:text-accent transition-colors"
        >
          {/* Simple wombat icon (inline SVG) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6 text-ink-950 group-hover:text-accent"
            fill="none"
          >
            {/* body */}
            <path
              d="M9.2 6.6c.8-1.6 4.8-1.6 5.6 0 .4.8.4 1.7 0 2.5-.7 1.2-1.8 1.8-2.8 1.8s-2.1-.6-2.8-1.8c-.4-.8-.4-1.7 0-2.5Z"
              fill="currentColor"
              opacity="0.12"
            />
            <path
              d="M7.6 12.2c.2-2.7 2.4-4.6 4.4-4.6s4.2 1.9 4.4 4.6c.2 2.8-1 6.2-4.4 6.2s-4.6-3.4-4.4-6.2Z"
              fill="currentColor"
            />
            {/* ears */}
            <path
              d="M8.4 9.1c-.9-.4-1.7-1.6-1.4-2.6.2-.7.9-.9 1.5-.5.9.6 1.3 1.8 1.1 2.6-.1.6-.6 1-1.2 1Z"
              fill="currentColor"
            />
            <path
              d="M15.6 9.1c.9-.4 1.7-1.6 1.4-2.6-.2-.7-.9-.9-1.5-.5-.9.6-1.3 1.8-1.1 2.6.1.6.6 1 1.2 1Z"
              fill="currentColor"
            />
            {/* face */}
            <path
              d="M10.3 14.5c.3.4.9.7 1.7.7s1.4-.3 1.7-.7"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M9.2 13.2c.3-.6.9-1 1.6-1"
              stroke="#ffffff"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.75"
            />
            <path
              d="M14.8 13.2c-.3-.6-.9-1-1.6-1"
              stroke="#ffffff"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.75"
            />
          </svg>
          <span>袋熊的网络空间</span>
        </Link>
        <nav className="flex gap-6 text-sm text-ink-600">
          <Link href="/" className="hover:text-accent transition-colors">
            首页
          </Link>
          <Link href="/blog" className="hover:text-accent transition-colors">
            博客
          </Link>
          <Link href="/login" className="hover:text-accent transition-colors">
            登录
          </Link>
        </nav>
      </div>
    </header>
  );
}
