---
title: 用 Tailwind 落地一套自洽的设计 Token
date: 2026-03-20
excerpt: 不再东拼西凑颜色 — 用 CSS 变量 + Tailwind theme 把 ink、accent、shadow 一次性收拢。
category: 技术
tags:
  - Tailwind
  - 设计系统
---

## 起点：颜色管理失控

项目里同时存在 `text-gray-700`、`text-zinc-600`、`text-[#3f3f46]` 三种灰，深色模式各写一遍，组件越多越难维护。

## 思路：先定义意图，再定义颜色

```ts
// tailwind.config.ts
colors: {
  ink: { 50: "#fafafa", 500: "#71717a", 950: "#09090b" },
  accent: { DEFAULT: "#2563eb", dark: "#1d4ed8", light: "#60a5fa" },
}
```

- `ink-*` 表达"文字/边框/背景"的中性梯度
- `accent` 只在交互元素上出现

页面里只写 `text-ink-600`，不再出现具体色号。

## 深色模式

不用 CSS 变量切换 — 直接靠 Tailwind 的 `dark:` 前缀，约束自己每个浅色都写一个对应的深色。看起来啰嗦，胜在静态可读。

## 阴影

只保留两档：`shadow-soft` 与 `shadow-soft-md`。亮色用阴影建立层次，暗色直接用边框替代，避免黑底叠黑阴影看不见。

## 留下的口子

字号梯度还没收拢，仍在 `text-sm` / `text-[15px]` 之间反复横跳，下一步处理。
