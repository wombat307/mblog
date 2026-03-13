import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  category?: string;
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => getSlugFromFilename(f));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt,
    tags: data.tags ?? [],
    category: data.category,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .map(({ content: _, ...meta }) => meta);
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}

/** 从所有文章中收集不重复的分类（按出现顺序） */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const set = new Set<string>();
  for (const p of posts) {
    if (p.category?.trim()) set.add(p.category.trim());
  }
  return Array.from(set);
}

/** 按分类筛选文章，仍按日期倒序 */
export function getPostsByCategory(category: string): PostMeta[] {
  const decoded = decodeURIComponent(category);
  return getAllPosts().filter((p) => p.category?.trim() === decoded);
}
