import Image from "next/image";
import Link from "next/link";
import { ArticleImageFrame } from "@/components/ArticleImageFrame";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  featuredLayout?: boolean;
}

export function ArticleCard({ article, featuredLayout = false }: ArticleCardProps) {
  const categoryMap: Record<Article["category"], string> = {
    "legal-updates": "Cập nhật pháp lý",
    guidelines: "Hướng dẫn",
    "case-studies": "Nghiên cứu tình huống",
  };

  const imageSrc =
    article.image ||
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80";

  const imageDisplay = featuredLayout
    ? { ...article.imageDisplay, fit: "contain" as const }
    : article.imageDisplay;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <ArticleImageFrame
        src={imageSrc}
        alt={article.title}
        display={imageDisplay}
        imageWidth={article.imageWidth}
        imageHeight={article.imageHeight}
      />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
          {categoryMap[article.category]}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">{article.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{article.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700"
            >
              #{tag}
            </span>
          ))}
        </div>
        <Link
          href={`/knowledge/${article.slug}`}
          className="mt-4 inline-block text-sm font-semibold text-sky-700 hover:text-sky-900"
        >
          Đọc bài viết →
        </Link>
      </div>
    </article>
  );
}
