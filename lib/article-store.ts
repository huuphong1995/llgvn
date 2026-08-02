import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { sampleArticles } from "@/lib/sample-data";
import { createSlug } from "@/lib/slug";
import {
  normalizeServiceImageDisplay,
  type ServiceImageDisplay,
} from "@/lib/service-image-display";
import type { Article, ArticleCategory } from "@/types/article";

const STORE_PATH = path.join(process.cwd(), "data", "articles.json");

export type ArticleInput = {
  title: string;
  summary: string;
  content: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageDisplay?: Partial<ServiceImageDisplay>;
  category: ArticleCategory;
  tags: string[];
  isFeatured: boolean;
};

function createDefaultArticles(): Article[] {
  const now = new Date().toISOString();
  return sampleArticles.map((article) => ({
    ...article,
    _id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  }));
}

export async function readArticleStore(): Promise<Article[]> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Article[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeArticleStore(articles: Article[]) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(articles, null, 2), "utf8");
}

export async function ensureArticleStore(): Promise<Article[]> {
  const existing = await readArticleStore();
  if (existing.length > 0) {
    return existing;
  }

  const seeded = createDefaultArticles();
  await writeArticleStore(seeded);
  return seeded;
}

export async function getArticleFromStore(id: string) {
  const articles = await ensureArticleStore();
  return articles.find((article) => article._id === id) ?? null;
}

export async function getArticleBySlugFromStore(slug: string) {
  const articles = await ensureArticleStore();
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function createArticleInStore(input: ArticleInput) {
  const articles = await ensureArticleStore();
  const now = new Date().toISOString();
  const slug = createSlug(input.title);

  if (articles.some((article) => article.slug === slug)) {
    throw new Error("Đã tồn tại bài viết với tiêu đề tương tự.");
  }

  const article: Article = {
    _id: randomUUID(),
    slug,
    title: input.title,
    summary: input.summary,
    content: input.content,
    image: input.image || "",
    imageWidth: input.imageWidth,
    imageHeight: input.imageHeight,
    category: input.category,
    tags: input.tags,
    isFeatured: input.isFeatured,
    imageDisplay: input.imageDisplay
      ? normalizeServiceImageDisplay(input.imageDisplay)
      : undefined,
    createdAt: now,
    updatedAt: now,
  };

  articles.unshift(article);
  await writeArticleStore(articles);
  return article;
}

export async function updateArticleInStore(id: string, input: Partial<ArticleInput>) {
  const articles = await ensureArticleStore();
  const index = articles.findIndex((article) => article._id === id);

  if (index === -1) {
    return null;
  }

  const current = articles[index];
  const nextTitle = input.title ?? current.title;
  const nextSlug = input.title ? createSlug(input.title) : current.slug;

  if (
    nextSlug !== current.slug &&
    articles.some((article) => article.slug === nextSlug && article._id !== id)
  ) {
    throw new Error("Đã tồn tại bài viết với tiêu đề tương tự.");
  }

  const updated: Article = {
    ...current,
    title: nextTitle,
    slug: nextSlug,
    summary: input.summary ?? current.summary,
    content: input.content ?? current.content,
    image: input.image !== undefined ? input.image : current.image,
    imageWidth: input.imageWidth ?? current.imageWidth,
    imageHeight: input.imageHeight ?? current.imageHeight,
    category: input.category ?? current.category,
    tags: input.tags ?? current.tags,
    isFeatured: input.isFeatured ?? current.isFeatured,
    imageDisplay:
      input.imageDisplay !== undefined
        ? normalizeServiceImageDisplay({
            ...current.imageDisplay,
            ...input.imageDisplay,
          })
        : current.imageDisplay,
    updatedAt: new Date().toISOString(),
  };

  articles[index] = updated;
  await writeArticleStore(articles);
  return updated;
}

export async function deleteArticleFromStore(id: string) {
  const articles = await ensureArticleStore();
  const nextArticles = articles.filter((article) => article._id !== id);

  if (nextArticles.length === articles.length) {
    return false;
  }

  await writeArticleStore(nextArticles);
  return true;
}
