import slugify from "slugify";
import Article from "@/models/Article";
import { connectDb } from "./db";
import { sampleArticles } from "./sample-data";

export async function ensureSeedData() {
  await connectDb();
  await Promise.all(
    sampleArticles.map((article) =>
      Article.updateOne({ slug: article.slug }, article, { upsert: true }),
    ),
  );
}

export async function getArticles(options?: {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
}) {
  await ensureSeedData();
  const query: Record<string, unknown> = {};

  if (options?.q) {
    query.$or = [
      { title: { $regex: options.q, $options: "i" } },
      { summary: { $regex: options.q, $options: "i" } },
      { content: { $regex: options.q, $options: "i" } },
    ];
  }

  if (options?.category) query.category = options.category;

  const page = Math.max(1, options?.page || 1);
  const limit = Math.max(1, options?.limit || 20);
  const skip = (page - 1) * limit;

  const articles = await Article.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  return articles.map((article) => ({
    ...article,
    _id: String(article._id),
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  }));
}

export async function getArticleBySlug(slug: string) {
  await ensureSeedData();
  const article = await Article.findOne({ slug }).lean();
  if (!article) return null;
  return {
    ...article,
    _id: String(article._id),
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };
}

export function createSlug(input: string) {
  return slugify(input, { lower: true, strict: true, trim: true });
}
