"use client";

import { useEffect, useState } from "react";

interface PostActionsProps {
  postSlug: string;
}

type Reaction = "like" | "dislike" | null;

const REACTION_KEY = "mblog_reaction:";
const BOOKMARK_KEY = "mblog_bookmark:";

export default function PostActions({ postSlug }: PostActionsProps) {
  const [mounted, setMounted] = useState(false);
  const [reaction, setReaction] = useState<Reaction>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const r = localStorage.getItem(REACTION_KEY + postSlug);
      if (r === "like" || r === "dislike") setReaction(r);
      setBookmarked(localStorage.getItem(BOOKMARK_KEY + postSlug) === "1");
    } catch {
      // ignore storage errors
    }
  }, [postSlug]);

  function flashToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1500);
  }

  function persistReaction(next: Reaction) {
    try {
      if (next) localStorage.setItem(REACTION_KEY + postSlug, next);
      else localStorage.removeItem(REACTION_KEY + postSlug);
    } catch {
      // ignore
    }
  }

  function toggleLike() {
    const next: Reaction = reaction === "like" ? null : "like";
    setReaction(next);
    persistReaction(next);
    if (next) flashToast("已点赞 ❤");
  }

  function toggleDislike() {
    const next: Reaction = reaction === "dislike" ? null : "dislike";
    setReaction(next);
    persistReaction(next);
    if (next) flashToast("已记下你的反馈");
  }

  function toggleBookmark() {
    const next = !bookmarked;
    setBookmarked(next);
    try {
      if (next) localStorage.setItem(BOOKMARK_KEY + postSlug, "1");
      else localStorage.removeItem(BOOKMARK_KEY + postSlug);
    } catch {
      // ignore
    }
    flashToast(next ? "已加入收藏" : "已移除收藏");
  }

  const baseBtn =
    "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30";
  const idle =
    "border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900 dark:border-ink-800 dark:bg-ink-900/60 dark:text-ink-400 dark:hover:border-ink-700 dark:hover:text-ink-100";
  const activeLike =
    "border-rose-300/70 bg-rose-50 text-rose-600 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300";
  const activeDislike =
    "border-ink-400/70 bg-ink-100 text-ink-800 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-200";
  const activeBookmark =
    "border-amber-300/70 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300";

  return (
    <div className="relative my-12 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={toggleLike}
        aria-pressed={reaction === "like"}
        disabled={!mounted}
        className={`${baseBtn} ${reaction === "like" ? activeLike : idle}`}
      >
        <HeartIcon filled={reaction === "like"} />
        <span>{reaction === "like" ? "已点赞" : "点赞"}</span>
      </button>

      <button
        type="button"
        onClick={toggleDislike}
        aria-pressed={reaction === "dislike"}
        disabled={!mounted}
        className={`${baseBtn} ${reaction === "dislike" ? activeDislike : idle}`}
      >
        <ThumbDownIcon filled={reaction === "dislike"} />
        <span>{reaction === "dislike" ? "已踩" : "踩"}</span>
      </button>

      <button
        type="button"
        onClick={toggleBookmark}
        aria-pressed={bookmarked}
        disabled={!mounted}
        className={`${baseBtn} ${bookmarked ? activeBookmark : idle}`}
      >
        <BookmarkIcon filled={bookmarked} />
        <span>{bookmarked ? "已收藏" : "收藏"}</span>
      </button>

      <div
        aria-live="polite"
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-12 rounded-full bg-ink-950 px-3 py-1.5 text-xs font-medium text-ink-50 shadow-soft-md transition-all duration-200 dark:bg-ink-50 dark:text-ink-950 ${
          toast ? "opacity-100 -translate-y-14" : "opacity-0"
        }`}
      >
        {toast}
      </div>
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function ThumbDownIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 14V2" />
      <path d="M9 18.5A2.5 2.5 0 0 0 11.5 21H12l3-6V4H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H9v1.5Z" />
    </svg>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />
    </svg>
  );
}
