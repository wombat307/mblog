import type { Metadata } from "next";
import Link from "next/link";

const ABOUT_DESC =
  "关于袋熊挖呀挖 — 一个用来记录读书札记、生活随笔与技术心得的个人小站。";

export const metadata: Metadata = {
  title: "关于我",
  description: ABOUT_DESC,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: "关于我",
    description: ABOUT_DESC,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "关于我",
    description: ABOUT_DESC,
    images: ["/og-default.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-10">
        <p className="text-sm text-ink-500 dark:text-ink-500 mb-2 uppercase tracking-wider">
          About
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-ink-950 dark:text-ink-50 leading-tight">
          你好，我是袋熊
        </h1>
        <p className="mt-4 text-ink-600 dark:text-ink-400 text-base leading-relaxed">
          这里是我的小小角落，用来记录读过的书、写过的代码、走过的弯路。
        </p>
      </header>

      <section className="prose-content space-y-6 text-[15px] leading-relaxed text-ink-700 dark:text-ink-300">
        <div>
          <h2 className="font-display text-2xl text-ink-950 dark:text-ink-50 mb-2">
            我是谁
          </h2>
          <p>
            一名前端工程师，喜欢挖来挖去 — 挖代码、挖书、挖生活里那些被忽略的小事。
            白天搬砖，晚上做菜，间隙读读书。
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink-950 dark:text-ink-50 mb-2">
            这里写什么
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <Link
                href="/blog/category/%E8%AF%BB%E4%B9%A6"
                className="text-accent hover:text-accent-dark dark:text-accent-light"
              >
                读书
              </Link>
              ：札记、摘抄、一些不成熟的想法
            </li>
            <li>
              <Link
                href="/blog/category/%E6%8A%80%E6%9C%AF"
                className="text-accent hover:text-accent-dark dark:text-accent-light"
              >
                技术
              </Link>
              ：踩过的坑、工具使用心得
            </li>
            <li>
              <Link
                href="/blog/category/%E7%94%9F%E6%B4%BB"
                className="text-accent hover:text-accent-dark dark:text-accent-light"
              >
                生活
              </Link>
              ：随手记下的日常碎片
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink-950 dark:text-ink-50 mb-2">
            关于这个博客
          </h2>
          <p>
            站点基于 Next.js 14 与 Tailwind CSS 构建，文章使用 Markdown 撰写，
            部署在 Vercel。源码风格力求极简，专注阅读体验。
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink-950 dark:text-ink-50 mb-2">
            联系我
          </h2>
          <p>
            想聊聊？欢迎邮件:{" "}
            <a
              href="mailto:anita99zxw@gmail.com"
              className="text-accent hover:text-accent-dark dark:text-accent-light"
            >
              anita99zxw@gmail.com
            </a>
            。
          </p>
        </div>
      </section>
    </div>
  );
}
