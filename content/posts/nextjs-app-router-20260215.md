---
title: Next.js App Router 上手三个月的真实体感
date: 2026-02-15
excerpt: 从 Pages Router 切到 App Router 三个月，记录下让我惊喜与让我踩坑的部分。
category: 技术
tags:
  - Next.js
  - React
  - 前端
---

## 让我惊喜的部分

### 默认服务端组件

数据获取直接写在组件里，不需要 `getServerSideProps` 这层胶水。心智模型反而更接近原始的 React。

### 嵌套布局

`layout.tsx` 真正做到了"局部布局只在局部刷新"。从 dashboard 走向 settings 不会让顶部头像重新闪一下，体验上的提升肉眼可见。

### Streaming + Suspense

`loading.tsx` 几乎零成本，慢接口不再阻塞首屏。

## 让我踩坑的部分

### 客户端组件污染

一个 `useState` 就要在文件头写 `"use client"`，紧接着这个组件的整棵子树都得跟着上客户端，需要刻意把状态下沉到叶子节点。

### Metadata 的继承规则

页面级 `openGraph` 会**完全覆盖**父级，而不是合并。我在这个博客上就栽过 — 子页面覆写 OG 后 RSS 的 alternate 直接没了。

### 第三方库的 ESM 兼容

仍有不少包不支持 RSC，需要包一层 `"use client"` wrapper。

## 我会选它吗

会。但前提是项目愿意承担一定的学习坡度。如果只是给营销页做静态生成，Pages Router 仍然更省心。
