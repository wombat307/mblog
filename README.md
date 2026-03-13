# mblog

基于 **Next.js 14** 的轻量博客系统，使用 Markdown 写作，支持 frontmatter（标题、日期、摘要、标签）。适合个人博客、技术笔记或文档站。

---

## 目录

- [功能](#功能)
- [快速开始](#快速开始)
- [写文章](#写文章)
- [项目结构](#项目结构)
- [脚本说明](#脚本说明)
- [技术栈](#技术栈)
- [部署](#部署)
- [后续扩展](#后续扩展)
- [License](#license)

---

## 功能

- **首页**：站点简介 + 最近 5 篇文章卡片
- **博客列表**：全部文章按日期倒序，支持摘要、标签与分类展示；顶部可按分类筛选（如生活、科技）
- **分类页**：`/blog/category/分类名` 查看该分类下所有文章
- **文章详情**：Markdown 渲染、代码高亮样式、评论区域占位
- **登录页**：占位页，便于后续接入鉴权
- **全局**：响应式布局、404 页、统一导航与页脚

---

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) 18.17+（推荐 LTS）
- npm / yarn / pnpm

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

### 构建与预览

```bash
npm run build
npm start
```

生产构建会静态生成所有文章页，可直接部署到任意 Node 或静态托管。

---

## 写文章

在 `content/posts` 下新建 `.md` 文件，例如 `my-post.md`：

```markdown
---
title: 文章标题
date: 2025-03-13
excerpt: 可选摘要，会显示在列表和首页
category: 科技
tags:
  - 标签1
  - 标签2
---

正文使用标准 Markdown 语法...
```

说明：

- **文件名**（去掉 `.md`）即文章 slug，如 `my-post.md` → 访问路径 `/blog/my-post`
- **date** 用于排序，格式建议 `YYYY-MM-DD`
- **category** 为可选，用于分类（如生活、科技），填写后会在列表页出现分类筛选并在卡片上显示分类链接
- **excerpt**、**tags** 为可选，不写则列表不显示摘要或标签

---

## 项目结构

```
mblog/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 根布局（字体、Header、Footer）
│   ├── page.tsx            # 首页
│   ├── globals.css         # 全局样式与 Markdown 正文样式
│   ├── not-found.tsx       # 404 页
│   ├── blog/
│   │   ├── page.tsx        # 博客列表（含分类导航）
│   │   ├── [slug]/page.tsx # 文章详情（含评论区域）
│   │   └── category/[category]/page.tsx  # 按分类筛选文章
│   └── login/
│       └── page.tsx        # 登录占位页
├── components/
│   ├── Header.tsx          # 顶部导航
│   ├── Footer.tsx          # 页脚
│   ├── PostCard.tsx        # 文章卡片（列表/首页，含分类标签）
│   ├── CategoryNav.tsx     # 分类筛选导航（全部 / 生活 / 科技 等）
│   ├── Markdown.tsx        # Markdown 正文渲染
│   └── Comments.tsx        # 评论区域占位
├── lib/
│   ├── posts.ts            # 文章读取、解析、排序
│   └── auth.ts             # 鉴权占位（后续接 NextAuth 等）
├── content/
│   └── posts/              # 所有 Markdown 文章
├── docs/
│   └── EXTENDING.md        # 登录、评论扩展说明
├── public/                 # 静态资源（可选）
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## 脚本说明

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（默认 3000 端口） |
| `npm run build` | 生产构建（含静态生成文章页） |
| `npm start` | 运行生产构建结果 |
| `npm run lint` | 运行 ESLint |

---

## 技术栈

- [Next.js 14](https://nextjs.org/)（App Router、服务端/静态渲染）
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)（frontmatter 解析）
- [react-markdown](https://github.com/remarkjs/react-markdown)（Markdown 渲染）

---

## 部署

### Vercel（推荐）

1. 将仓库推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目，构建命令 `npm run build`，输出目录默认
3. 部署后每次 push 可自动构建发布

### 其他平台

- **Node**：`npm run build && npm start`，需配置启动命令与 Node 版本
- **静态导出**：若需纯静态，可在 `next.config.mjs` 中设置 `output: 'export'`（注意动态路由需在构建时能解析完全）

---

## 后续扩展

项目已预留扩展点，便于后续接入：

| 功能 | 预留位置 | 建议方案 |
|------|----------|----------|
| **登录** | `app/login/`、`lib/auth.ts`、Header 导航 | [NextAuth.js](https://next-auth.js.org/) 或 Auth.js，支持 GitHub/邮箱等 |
| **评论** | `components/Comments.tsx`、文章详情页底部 | 第三方：Giscus（GitHub Discussions）/ Utterances；或自建 API + 数据库 |

详细步骤见 [docs/EXTENDING.md](docs/EXTENDING.md)。

---

## License

MIT
