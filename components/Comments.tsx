"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";

interface CommentsProps {
  postSlug: string;
}

type Comment = {
  id: string;
  name: string;
  content: string;
  createdAt: number;
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

  const [name, setName] = useState("");
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

    const trimmedName = name.trim();
    const trimmedContent = content.trim();

    if (trimmedName.length === 0) {
      setError("请填写你的名字。");
      return;
    }
    if (trimmedName.length > 30) {
      setError("名字太长了（最多 30 个字符）。");
      return;
    }
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
      name: trimmedName,
      content: trimmedContent,
      createdAt: Date.now(),
    };

    const next = [nextComment, ...comments];
    setComments(next);
    persist(next);
    setContent("");
  }

  function deleteComment(id: string) {
    setError(null);
    const ok = window.confirm("确定删除这条评论吗？");
    if (!ok) return;

    const next = comments.filter((c) => c.id !== id);
    setComments(next);
    persist(next);
  }

  return (
    <section className="mt-12 pt-8 border-t border-ink-200" aria-label="评论">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg text-ink-950">评论</h2>
          <p className="mt-1 text-sm text-ink-600">
            {useUtterances
              ? "使用 Utterances（GitHub Issues）持久化评论。"
              : "本地存储演示版：刷新后会保留在当前浏览器。"}
          </p>
        </div>
        {!useUtterances && comments.length > 0 && (
          <span className="rounded-full bg-ink-100 px-3 py-1 text-xs text-ink-600">
            {comments.length} 条
          </span>
        )}
      </div>

      {useUtterances ? (
        <div className="rounded-2xl border border-ink-200/80 bg-white/60 p-4 shadow-sm">
          {!utterancesRepo ? (
            <p className="text-sm text-ink-600">
              你已选择 Utterances，但缺少环境变量：`NEXT_PUBLIC_UTTERANCES_REPO`。
              请在 Vercel 里填入 `owner/repo` 后重新部署。
            </p>
          ) : (
            <div ref={utterancesContainerRef} />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-1">
            <form
              onSubmit={addComment}
              className="rounded-2xl border border-ink-200/80 bg-white/60 p-5 shadow-sm"
            >
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm text-ink-600"
                  htmlFor="comment-name"
                >
                  你的名字
                </label>
                <input
                  id="comment-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-full rounded-lg border border-ink-200/80 bg-white/80 px-3 text-ink-950 outline-none transition focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50"
                  placeholder="比如：袋熊"
                  maxLength={30}
                />
              </div>

              <div className="mb-4">
                <label
                  className="mb-2 block text-sm text-ink-600"
                  htmlFor="comment-content"
                >
                  评论内容
                </label>
                <textarea
                  id="comment-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-28 w-full resize-y rounded-lg border border-ink-200/80 bg-white/80 px-3 py-2 text-ink-950 outline-none transition focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50"
                  placeholder="说点什么吧..."
                  maxLength={500}
                />
              </div>

              {error && (
                <p className="mb-3 text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-white transition hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50"
              >
                发布评论
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            {comments.length === 0 ? (
              <div className="rounded-2xl border border-ink-200/80 bg-white/60 p-5 text-sm text-ink-600 shadow-sm">
                暂无评论，成为第一个吧。
              </div>
            ) : (
              <ul className="space-y-4">
                {comments.map((c) => (
                  <li
                    key={c.id}
                    className="rounded-2xl border border-ink-200/80 bg-white/60 p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-100 text-sm font-display text-ink-900">
                          {c.name.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-ink-950">{c.name}</p>
                          <p className="text-xs text-ink-500">
                            {formatTime(c.createdAt)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteComment(c.id)}
                        className="rounded-lg border border-ink-200/80 bg-white/60 px-3 py-1 text-xs font-medium text-ink-700 transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50"
                      >
                        删除
                      </button>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-ink-700">
                      {c.content}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
