import Link from "next/link";
import { getArticles } from "@/lib/articles";

export default async function NewsPage() {
  const updates = await getArticles({ category: "legal-updates" });

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">Tin tức pháp lý</h1>
        <p className="mt-2 text-slate-700">
          Các cập nhật pháp lý và quy định mới nhất liên quan đến doanh nghiệp của bạn.
        </p>
      </section>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        {updates.map((article) => (
          <div key={article._id} className="border-b py-4 last:border-0">
            <Link
              href={`/knowledge/${article.slug}`}
              className="text-lg font-semibold text-slate-900 hover:text-sky-700"
            >
              {article.title}
            </Link>
            <p className="mt-1 text-sm text-slate-600">{article.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
