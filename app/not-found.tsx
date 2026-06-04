import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
      <p className="text-sm uppercase tracking-wider text-ink-500 dark:text-ink-500 mb-3">
        404
      </p>
      <h1 className="font-display text-5xl text-ink-950 dark:text-ink-50">
        页面未找到
      </h1>
      <p className="mt-4 text-ink-600 dark:text-ink-400">
        这里没有你要找的内容，但首页一定有。
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1 rounded-full bg-ink-950 dark:bg-ink-50 px-5 py-2.5 text-sm font-medium text-ink-50 dark:text-ink-950 hover:bg-ink-800 dark:hover:bg-ink-200 transition-colors"
      >
        ← 返回首页
      </Link>
    </div>
  );
}
