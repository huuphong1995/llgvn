import ArticleModel from "@/models/Article";
import {
  createArticleInStore,
  deleteArticleFromStore,
  ensureArticleStore,
  getArticleBySlugFromStore,
  getArticleFromStore,
  updateArticleInStore,
  type ArticleInput,
} from "@/lib/article-store";
import { connectDb } from "@/lib/db";
import { createSlug } from "@/lib/slug";
import type { Article } from "@/types/article";

export { createSlug };

function filterArticles(
  articles: Article[],
  options?: {
    q?: string;
    category?: string;
    page?: number;
    limit?: number;
  },
) {
  const page = Math.max(1, options?.page || 1);
  const limit = Math.max(1, options?.limit || 20);
  const skip = (page - 1) * limit;

  const filtered = articles.filter((article) => {
    if (options?.category && article.category !== options.category) return false;
    if (!options?.q) return true;
    const q = options.q.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.content.toLowerCase().includes(q)
    );
  });

  return filtered
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(skip, skip + limit);
}

async function trySyncArticleToMongo(article: Article) {
  try {
    await connectDb();
    await ArticleModel.findOneAndUpdate(
      { slug: article.slug },
      {
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content,
        image: article.image ?? "",
        category: article.category,
        tags: article.tags,
        isFeatured: article.isFeatured,
      },
      { upsert: true, new: true },
    );
  } catch {
    // MongoDB không bắt buộc.
  }
}

async function tryDeleteArticleFromMongo(slug: string) {
  try {
    await connectDb();
    await ArticleModel.deleteOne({ slug });
  } catch {
    // MongoDB không bắt buộc.
  }
}

export async function getArticles(options?: {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
}) {
  const articles = await ensureArticleStore();
  return filterArticles(articles, options);
}

export async function getArticleBySlug(slug: string) {
  return getArticleBySlugFromStore(slug);
}

export async function createArticle(input: ArticleInput) {
  const article = await createArticleInStore(input);
  await trySyncArticleToMongo(article);
  return article;
}

export async function updateArticle(id: string, input: Partial<ArticleInput>) {
  const previous = await getArticleFromStore(id);
  const article = await updateArticleInStore(id, input);

  if (!article) {
    return null;
  }

  if (previous && previous.slug !== article.slug) {
    await tryDeleteArticleFromMongo(previous.slug);
  }

  await trySyncArticleToMongo(article);
  return article;
}

export async function deleteArticle(id: string) {
  const article = await getArticleFromStore(id);
  if (!article) {
    return false;
  }

  const deleted = await deleteArticleFromStore(id);
  if (deleted) {
    await tryDeleteArticleFromMongo(article.slug);
  }
  return deleted;
}

// Giữ tương thích với seed API cũ.
export async function ensureSeedData() {
  await ensureArticleStore();
}
