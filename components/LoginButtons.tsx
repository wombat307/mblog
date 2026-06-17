"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface LoginButtonsProps {
  providers: { google: boolean; github: boolean };
}

export default function LoginButtons({ providers }: LoginButtonsProps) {
  const { data: session, status } = useSession();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";

  if (status === "loading") {
    return (
      <p className="text-center text-sm text-ink-500 dark:text-ink-500">
        检查登录状态…
      </p>
    );
  }

  if (session?.user) {
    return (
      <div className="text-center">
        <div className="flex flex-col items-center gap-3">
          {session.user.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt={session.user.name ?? "avatar"}
              className="h-16 w-16 rounded-full ring-2 ring-ink-200 dark:ring-ink-800"
            />
          )}
          <div>
            <p className="text-base font-medium text-ink-950 dark:text-ink-50">
              {session.user.name}
            </p>
            {session.user.email && (
              <p className="text-sm text-ink-500 dark:text-ink-500">
                {session.user.email}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-6 inline-flex items-center justify-center rounded-full border border-ink-200 bg-white px-5 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-200 dark:hover:bg-ink-800 transition-colors"
        >
          退出登录
        </button>
      </div>
    );
  }

  const anyProvider = providers.google || providers.github;

  if (!anyProvider) {
    return (
      <div className="rounded-xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700/60 dark:bg-amber-900/20 dark:text-amber-200">
        <p className="font-medium mb-1">尚未配置 OAuth 凭证</p>
        <p>
          请在 <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/50">.env.local</code> 中填入
          <code className="mx-1 rounded bg-amber-100 px-1 dark:bg-amber-900/50">GOOGLE_CLIENT_ID</code>
          或
          <code className="ml-1 rounded bg-amber-100 px-1 dark:bg-amber-900/50">GITHUB_ID</code>
          ，重启 dev server 后再试。
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {providers.google && (
        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="inline-flex items-center justify-center gap-3 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-900 hover:bg-ink-50 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-50 dark:hover:bg-ink-800 transition-colors"
        >
          <GoogleIcon />
          使用 Google 账号登录
        </button>
      )}
      {providers.github && (
        <button
          onClick={() => signIn("github", { callbackUrl })}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-ink-950 px-5 py-2.5 text-sm font-medium text-ink-50 hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-950 dark:hover:bg-ink-200 transition-colors"
        >
          <GitHubIcon />
          使用 GitHub 账号登录
        </button>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M21.6 12.227c0-.709-.064-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-2 3.018v2.51h3.236c1.891-1.741 2.982-4.305 2.982-7.351Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.964-.895 6.618-2.422l-3.236-2.51c-.895.6-2.04.955-3.382.955-2.605 0-4.81-1.759-5.595-4.122H3.064v2.59A9.996 9.996 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.405 13.9a5.998 5.998 0 0 1 0-3.8V7.51H3.064a9.996 9.996 0 0 0 0 8.98l3.341-2.59Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C16.96 3.014 14.695 2 12 2a9.996 9.996 0 0 0-8.936 5.51l3.341 2.59C7.19 7.736 9.395 5.977 12 5.977Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}
