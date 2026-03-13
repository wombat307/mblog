---
title: 用 Next.js 搭建博客
date: 2025-03-12
excerpt: 简要记录使用 Next.js App Router 与 Markdown 搭建静态博客的步骤。
category: 科技
tags:
  - Next.js
  - 教程
---

用 Next.js 搭建博客可以兼顾**开发体验**和**性能**：既能在本地用 Markdown 写作，又能输出静态页面，部署到 Vercel 或任何静态托管都很方便。

## 技术选型

- **框架**：Next.js 14，使用 App Router
- **内容**：Markdown 文件 + gray-matter 解析 frontmatter
- **渲染**：react-markdown 渲染正文
- **样式**：Tailwind CSS

## 目录结构

- `app/`：页面与布局（首页、博客列表、文章详情）
- `components/`：Header、Footer、PostCard、Markdown 等组件
- `lib/posts.ts`：读取 `content/posts` 下的 .md，解析并排序
- `content/posts/`：存放所有博文 .md 文件

## 小结

这样你就有了一个可扩展的博客骨架，后续可以加上分类、搜索、评论等能力。
