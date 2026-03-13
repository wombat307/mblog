import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl text-ink-950">404</h1>
      <p className="mt-2 text-ink-600">页面未找到</p>
      <Link
        href="/"
        className="mt-6 inline-block text-accent hover:text-accent-dark font-medium"
      >
        返回首页
      </Link>
    </div>
  );
}
