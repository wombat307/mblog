import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-ink-200/80 bg-ink-50/95 backdrop-blur supports-[backdrop-filter]:bg-ink-50/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl text-ink-950 hover:text-accent transition-colors"
        >
          mblog
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
