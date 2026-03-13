# 扩展指南：登录与评论

本文档说明如何在此基础上接入**登录**与**评论**功能。

---

## 登录

### 预留位置

- **路由**：`app/login/page.tsx`（占位页，可替换为登录表单或 OAuth 入口）
- **鉴权逻辑**：`lib/auth.ts`（当前为 stub，可接入 NextAuth 的 `getSession`）
- **导航**：`components/Header.tsx` 中已有「登录」链接，登录后可改为显示用户信息 + 退出

### 推荐方案：NextAuth.js / Auth.js

1. 安装：`npm install next-auth`
2. 在 `app/api/auth/[...nextauth]/route.ts` 配置 Provider（如 GitHub、Credentials）
3. 用 `getServerSession()` 在服务端、`useSession()` 在客户端判断登录态
4. 在 `lib/auth.ts` 中封装 `getSession()`，供 layout 或需要鉴权的 API 使用

---

## 评论

### 预留位置

- **组件**：`components/Comments.tsx`（当前为占位，文章页已预留评论区域）
- **文章页**：`app/blog/[slug]/page.tsx` 底部已渲染 `<Comments postSlug={slug} />`

### 方案一：第三方（零后端）

- **Giscus**：用 GitHub Discussions 做评论，按 repo + 文章 URL 关联
- **Utterances**：同样基于 GitHub Issues

接入时在 `Comments.tsx` 内嵌入对应脚本或 iframe 即可。

### 方案二：自建评论

1. 数据库：为评论建表（如 post_slug、author、content、created_at）
2. API：`app/api/comments/route.ts`（GET 按 slug 拉取，POST 需登录后发表）
3. 在 `Comments.tsx` 中调用上述 API，展示列表 + 发表表单（未登录可提示先登录）

---

按需实现其一或两者后，删除或替换对应占位组件/页面即可。
