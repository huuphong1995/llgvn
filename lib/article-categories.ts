import type { ArticleCategory } from "@/types/article";

export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  "legal-updates": "Tin tức",
  guidelines: "Hướng dẫn",
  "case-studies": "Nghiên cứu tình huống",
};

export const ARTICLE_CATEGORY_HINTS: Record<ArticleCategory, string> = {
  "legal-updates": "Hiển thị tại trang Tin tức (/news)",
  guidelines: "Hiển thị tại Kho kiến thức (/knowledge)",
  "case-studies": "Hiển thị tại Kho kiến thức (/knowledge)",
};
