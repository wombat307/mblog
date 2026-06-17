import { Suspense } from "react";
import type { Metadata } from "next";
import LoginButtons from "@/components/LoginButtons";

export const metadata: Metadata = {
  title: "登录",
  description: "使用 Google 或 GitHub 账号快速登录袋熊挖呀挖。",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  const providers = {
    google: Boolean(
      process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
    ),
    github: Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET),
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6 sm:py-24">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-wider text-ink-500 dark:text-ink-500 mb-2">
          Sign in
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink-950 dark:text-ink-50 leading-tight">
          欢迎回来
        </h1>
        <p className="mt-3 text-sm text-ink-500 dark:text-ink-500">
          选择一种方式登录，开启评论与收藏功能。
        </p>
      </div>
      <Suspense
        fallback={
          <p className="text-center text-sm text-ink-500 dark:text-ink-500">
            加载中…
          </p>
        }
      >
        <LoginButtons providers={providers} />
      </Suspense>
      <p className="mt-10 text-center text-xs text-ink-400 dark:text-ink-600">
        登录即表示你同意我们仅使用账号信息用于身份识别。
      </p>
    </div>
  );
}
