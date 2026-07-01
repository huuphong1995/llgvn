import type { ServiceImageDisplay } from "@/lib/service-image-display";

export type ArticleCategory = "legal-updates" | "guidelines" | "case-studies";

export interface Article {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageDisplay?: ServiceImageDisplay;
  category: ArticleCategory;
  tags: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}
