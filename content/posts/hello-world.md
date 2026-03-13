---
title: Hello World
date: 2025-03-13
excerpt: 欢迎使用 mblog，这是第一篇文章。
category: 生活
tags:
  - 随笔
  - 介绍
---

欢迎来到 **mblog**！这是一个基于 Next.js 的博客系统。

## 功能特点

- 使用 **Markdown** 撰写文章，支持 frontmatter（标题、日期、摘要、标签）
- **Next.js 14** App Router，服务端渲染与静态生成
- 简洁的排版与配色，适合阅读

## 如何写新文章

在 `content/posts` 目录下新建 `.md` 文件，在文件顶部写上 YAML frontmatter：

```yaml
---
title: 你的文章标题
date: 2025-03-13
excerpt: 简短摘要（可选）
tags:
  - 标签1
  - 标签2
---

正文从这里开始...
```

保存后重新构建或刷新即可在首页和博客列表看到新文章。

祝写作愉快！
