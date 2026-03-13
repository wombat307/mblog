/**
 * 文章评论区域（预留）
 * 后续可接入：Giscus / Utterances，或自建评论 API
 */

interface CommentsProps {
  postSlug: string;
}

export default function Comments({ postSlug }: CommentsProps) {
  // 占位：评论功能上线前不渲染内容，仅保留区块便于后续接入
  return (
    <section className="mt-12 pt-8 border-t border-ink-200" aria-label="评论">
      <h2 className="font-display text-lg text-ink-900 mb-4">评论</h2>
      <p className="text-sm text-ink-500">
        评论功能即将开放。
        {/* 接入后在此渲染 Giscus/Utterances 或自建评论列表，postSlug 用于关联当前文章 */}
      </p>
    </section>
  );
}
