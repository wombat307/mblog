import { getAllPosts, getPostBySlug } from "@/lib/posts";

const SITE_URL = "https://zhangxiaowan.top";
const SITE_NAME = "袋熊的网络空间";
const SITE_DESC =
  "袋熊的网络空间：基于 Next.js 的简洁个人博客，记录生活随笔、读书札记与技术心得。";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: string): string {
  const d = date ? new Date(date) : new Date();
  return Number.isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString();
}

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const latest = posts[0]?.date ? new Date(posts[0].date) : new Date();

  const items = posts
    .map((meta) => {
      const post = getPostBySlug(meta.slug);
      const link = `${SITE_URL}/blog/${meta.slug}`;
      const title = escapeXml(meta.title);
      const desc = escapeXml(meta.excerpt ?? post?.content.slice(0, 200) ?? "");
      const category = meta.category
        ? `<category>${escapeXml(meta.category)}</category>`
        : "";
      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${rfc822(meta.date)}</pubDate>
      <description>${desc}</description>
      ${category}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${latest.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
