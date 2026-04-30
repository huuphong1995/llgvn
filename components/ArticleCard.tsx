import Link from "next/link";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const categoryMap: Record<Article["category"], string> = {
    "legal-updates": "Cập nhật pháp lý",
    guidelines: "Hướng dẫn",
    "case-studies": "Nghiên cứu tình huống",
  };

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
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
    </article>
  );
}
