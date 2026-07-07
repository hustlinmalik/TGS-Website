// ─────────────────────────────────────────────────────────────────────────────
// Markdown content loader — this is the "GitHub as CMS" layer.
// Content lives as .md files in /content. Edit those files (locally or right in
// GitHub's web editor), commit, and Vercel rebuilds automatically.
// ─────────────────────────────────────────────────────────────────────────────
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Collection = "services" | "locations" | "blog";

export type Doc<T = Record<string, unknown>> = {
  slug: string;
  frontmatter: T;
  contentHtml: string;
  rawContent: string;
};

function dir(collection: Collection) {
  return path.join(CONTENT_DIR, collection);
}

export function getSlugs(collection: Collection): string[] {
  const d = dir(collection);
  if (!fs.existsSync(d)) return [];
  return fs
    .readdirSync(d)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

async function toHtml(markdown: string): Promise<string> {
  const processed = await remark().use(html).process(markdown);
  return processed.toString();
}

export async function getDoc<T = Record<string, unknown>>(
  collection: Collection,
  slug: string
): Promise<Doc<T>> {
  const fullPath = path.join(dir(collection), `${slug}.md`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const contentHtml = await toHtml(content);
  return { slug, frontmatter: data as T, contentHtml, rawContent: content };
}

export async function getAllDocs<T = Record<string, unknown>>(
  collection: Collection
): Promise<Doc<T>[]> {
  const slugs = getSlugs(collection);
  const docs = await Promise.all(slugs.map((s) => getDoc<T>(collection, s)));
  return docs;
}

// Frontmatter shapes
export type ServiceFrontmatter = {
  title: string;
  slug: string;
  order?: number;
  shortDescription: string;
  priceNote?: string;
  metaTitle?: string;
  metaDescription?: string;
};

export type BlogFrontmatter = {
  title: string;
  date: string; // ISO
  excerpt: string;
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
};

export type LocationFrontmatter = {
  city: string;
  region: string;
  metaTitle?: string;
  metaDescription?: string;
};
