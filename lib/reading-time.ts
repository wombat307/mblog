/**
 * 估算中英混排文本的阅读时间（分钟）。
 * 中文按 ~400 字/分钟、英文按 ~250 词/分钟。最少 1 分钟。
 */
export function readingTime(content: string): number {
  const cn = (content.match(/[一-龥]/g) || []).length;
  const en = (content.replace(/[一-龥]/g, "").match(/\b[a-zA-Z]+\b/g) || []).length;
  return Math.max(1, Math.ceil(cn / 400 + en / 250));
}
