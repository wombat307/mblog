"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

interface CommentsProps {
  postSlug: string;
}

type Comment = {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  /** 作者的稳定标识（邮箱），用于权限校验。早期数据可能没有该字段。 */
  authorId?: string;
  /** 作者头像，登录评论才会写入。 */
  avatar?: string;
};

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export default function Comments({ postSlug }: CommentsProps) {
  // NEXT_PUBLIC_* 会在构建时被 Next 内联；但这里依然做兜底，避免运行时环境下出现 `process is not defined`。
  const env =
    typeof process !== "undefined" && process.env ? process.env : ({} as any);

  const commentsProvider = env.NEXT_PUBLIC_COMMENTS_PROVIDER as
    | string
    | undefined;
  const utterancesRepo = env.NEXT_PUBLIC_UTTERANCES_REPO as
    | string
    | undefined;
  const utterancesTheme =
    (env.NEXT_PUBLIC_UTTERANCES_THEME as string | undefined) ??
    "github-light";

  const useUtterances =
    commentsProvider === "utterances" || Boolean(utterancesRepo);

  const storageKey = useMemo(() => `mblog_comments:${postSlug}`, [postSlug]);

  const { data: session, status: sessionStatus } = useSession();
  const isAuthed = Boolean(session?.user);
  const currentUserId = session?.user?.email ?? undefined;

  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  const utterancesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Utterances：如果配置了 repo，就加载 iframe 评论（免费持久化到 GitHub Issues）。
    if (useUtterances) {
      if (!utterancesRepo) return;

      const container = utterancesContainerRef.current;
      if (!container) return;

      container.innerHTML = "";
      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.async = true;
      script.setAttribute("repo", utterancesRepo);
      script.setAttribute("issue-term", "pathname");
      script.setAttribute("theme", utterancesTheme);
      script.setAttribute("crossorigin", "anonymous");

      container.appendChild(script);
      return;
    }

    const raw = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
    const parsed = safeJsonParse<Comment[]>(raw);
    if (parsed && Array.isArray(parsed)) {
      setComments(parsed);
    } else {
      setComments([]);
    }
  }, [storageKey, useUtterances, utterancesRepo, utterancesTheme]);

  function formatTime(ts: number) {
    return new Date(ts).toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function persist(next: Comment[]) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Ignore write errors (e.g. storage disabled)
    }
  }

  function addComment(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isAuthed || !session?.user) {
      setError("请先登录后再发表评论。");
      return;
    }

    const trimmedContent = content.trim();
    const authorName = session.user.name?.trim() || session.user.email || "匿名";

    if (trimmedContent.length === 0) {
      setError("请填写评论内容。");
      return;
    }
    if (trimmedContent.length > 500) {
      setError("评论太长了（最多 500 个字符）。");
      return;
    }

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}_${Math.random().toString(16).slice(2)}`;

    const nextComment: Comment = {
      id,
      name: authorName,
      content: trimmedContent,
      createdAt: Date.now(),
      authorId: currentUserId,
      avatar: session.user.image ?? undefined,
    };

    const next = [nextComment, ...comments];
    setComments(next);
    persist(next);
    setContent("");
  }

  function deleteComment(id: string) {
    setError(null);
    const target = comments.find((c) => c.id === id);
    if (!target) return;
    if (!currentUserId || target.authorId !== currentUserId) {
      setError("只能删除自己发表的评论。");
      return;
    }
    const ok = window.confirm("确定删除这条评论吗？");
    if (!ok) return;

    const next = comments.filter((c) => c.id !== id);
    setComments(next);
    persist(next);
  }

  const cardCls =
    "rounded-2xl bg-white shadow-soft dark:bg-ink-900/60 dark:shadow-none dark:border dark:border-ink-800/80";
  const inputCls =
    "w-full rounded-lg border border-ink-200 bg-white px-3 text-ink-950 outline-none transition focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-50 dark:focus-visible:ring-offset-ink-950 placeholder:text-ink-400 dark:placeholder:text-ink-600";

  return (
    <section className="mt-12" aria-label="评论">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-sans font-semibold tracking-tight text-ink-950 dark:text-ink-50">评论</h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-500">
            {useUtterances
              ? "使用 Utterances（GitHub Issues）持久化评论。"
              : "本地存储演示版：仅保留在当前浏览器。"}
          </p>
        </div>
        {!useUtterances && comments.length > 0 && (
          <span className="rounded-full bg-ink-100 dark:bg-ink-800 px-3 py-1 text-xs text-ink-600 dark:text-ink-400">
            {comments.length} 条
          </span>
        )}
      </div>

      {useUtterances ? (
        <div className={`${cardCls} p-4`}>
          {!utterancesRepo ? (
            <p className="text-sm text-ink-600 dark:text-ink-400">
              你已选择 Utterances，但缺少环境变量：`NEXT_PUBLIC_UTTERANCES_REPO`。
              请在 Vercel 里填入 `owner/repo` 后重新部署。
            </p>
          ) : (
            <div ref={utterancesContainerRef} />
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            {sessionStatus === "loading" ? (
              <div className={`${cardCls} p-5 text-sm text-ink-500 dark:text-ink-500`}>
                正在检查登录状态…
              </div>
            ) : !isAuthed ? (
              <div className={`${cardCls} p-5`}>
                <p className="text-sm font-medium text-ink-950 dark:text-ink-50">
                  登录后再发表评论
                </p>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-500">
                  使用 Google 或 GitHub 账号快速登录，发布的内容会与你的账号关联。
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      signIn(undefined, {
                        callbackUrl:
                          typeof window !== "undefined"
                            ? window.location.pathname + window.location.hash
                            : "/",
                      })
                    }
                    className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-ink-950 dark:bg-ink-50 px-4 text-sm font-medium text-ink-50 dark:text-ink-950 transition hover:bg-ink-800 dark:hover:bg-ink-200"
                  >
                    去登录
                  </button>
                  <Link
                    href="/login"
                    className="text-center text-xs text-ink-500 hover:text-ink-900 dark:hover:text-ink-100 transition-colors"
                  >
                    了解登录方式 →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={addComment} className={`${cardCls} p-5`}>
                <div className="mb-4 flex items-center gap-3">
                  {session?.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt={session.user.name ?? "avatar"}
                      className="h-9 w-9 rounded-full object-cover ring-1 ring-ink-200 dark:ring-ink-700"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-sm font-semibold text-ink-700 dark:bg-ink-800 dark:text-ink-300">
                      {(session?.user?.name ?? "?").trim().charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink-950 dark:text-ink-50">
                      {session?.user?.name ?? "未命名用户"}
                    </p>
                    {session?.user?.email && (
                      <p className="truncate text-xs text-ink-500 dark:text-ink-500">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="mb-2 block text-sm font-medium text-ink-700 dark:text-ink-300"
                    htmlFor="comment-content"
                  >
                    评论内容
                  </label>
                  <textarea
                    id="comment-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={`min-h-28 py-2 resize-y ${inputCls}`}
                    placeholder="说点什么吧..."
                    maxLength={500}
                  />
                </div>

                {error && (
                  <p className="mb-3 text-sm text-red-500 dark:text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-ink-950 dark:bg-ink-50 px-4 text-sm font-medium text-ink-50 dark:text-ink-950 transition hover:bg-ink-800 dark:hover:bg-ink-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50 dark:focus-visible:ring-offset-ink-950"
                >
                  发布评论
                </button>
              </form>
            )}
          </div>

          <div>
            {comments.length === 0 ? (
              <div className={`${cardCls} p-5 text-sm text-ink-500 dark:text-ink-500`}>
                暂无评论，成为第一个吧。
              </div>
            ) : (
              <ul className="space-y-4">
                {comments.map((c) => {
                  const canDelete =
                    Boolean(currentUserId) && c.authorId === currentUserId;
                  return (
                  <li key={c.id} className={`${cardCls} p-5`}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {c.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={c.avatar}
                            alt={c.name}
                            className="h-9 w-9 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-100 dark:bg-ink-800 text-sm font-semibold text-ink-700 dark:text-ink-300">
                            {c.name.slice(0, 2)}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-ink-950 dark:text-ink-50">{c.name}</p>
                          <p className="text-xs text-ink-500 dark:text-ink-500">
                            {formatTime(c.createdAt)}
                          </p>
                        </div>
                      </div>
                      {canDelete && (
                        <button
                          type="button"
                          onClick={() => deleteComment(c.id)}
                          className="rounded-lg border border-ink-200 dark:border-ink-700 px-3 py-1 text-xs font-medium text-ink-600 dark:text-ink-400 transition hover:border-accent/40 hover:text-accent dark:hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50 dark:focus-visible:ring-offset-ink-950"
                        >
                          删除
                        </button>
                      )}
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
                      {c.content}
                    </p>
                  </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
