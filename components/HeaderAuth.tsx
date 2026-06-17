"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function HeaderAuth() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  if (status === "loading") {
    return (
      <span className="hidden sm:inline-block h-7 w-7 rounded-full bg-ink-100 dark:bg-ink-800 animate-pulse" />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="hidden sm:inline-flex rounded-full px-3 py-1.5 text-sm text-ink-600 dark:text-ink-400 hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800 dark:hover:text-ink-100 transition-colors"
      >
        登录
      </Link>
    );
  }

  const initial = (session.user.name ?? session.user.email ?? "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="用户菜单"
        aria-expanded={open}
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-ink-100 text-sm font-medium text-ink-700 ring-1 ring-ink-200 hover:ring-ink-300 dark:bg-ink-800 dark:text-ink-200 dark:ring-ink-700 dark:hover:ring-ink-600 transition-all"
      >
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.image}
            alt={session.user.name ?? "avatar"}
            className="h-full w-full object-cover"
          />
        ) : (
          initial
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-ink-200/70 bg-white p-3 shadow-soft-md dark:border-ink-800 dark:bg-ink-900">
          <div className="px-2 pb-2 border-b border-ink-200/70 dark:border-ink-800">
            <p className="truncate text-sm font-medium text-ink-950 dark:text-ink-50">
              {session.user.name ?? "未命名用户"}
            </p>
            {session.user.email && (
              <p className="truncate text-xs text-ink-500 dark:text-ink-500">
                {session.user.email}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/" });
            }}
            className="mt-2 w-full rounded-lg px-2 py-1.5 text-left text-sm text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800 transition-colors"
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}
