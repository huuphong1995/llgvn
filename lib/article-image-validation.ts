import { z } from "zod";
import { ARTICLE_UPLOAD_PUBLIC_PREFIX } from "@/lib/article-image-storage";

export const articleImageSchema = z
  .string()
  .refine(
    (value) =>
      value === "" ||
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith(ARTICLE_UPLOAD_PUBLIC_PREFIX),
    { message: "Ảnh phải là URL hoặc file đã upload." },
  );

export const optionalArticleImageSchema = articleImageSchema.optional().or(z.literal(""));
