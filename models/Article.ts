import { Model, Schema, model, models } from "mongoose";

export interface ArticleDocument {
  title: string;
  slug: string;
  summary: string;
  content: string;
  image?: string;
  category: "legal-updates" | "guidelines" | "case-studies";
  tags: string[];
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<ArticleDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    category: {
      type: String,
      required: true,
      enum: ["legal-updates", "guidelines", "case-studies"],
    },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Article: Model<ArticleDocument> =
  models.Article || model<ArticleDocument>("Article", ArticleSchema);

export default Article;
