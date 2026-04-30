export type ArticleCategory = "legal-updates" | "guidelines" | "case-studies";

export interface Article {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: ArticleCategory;
  tags: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}
