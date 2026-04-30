import { ArticleCard } from "@/components/ArticleCard";
import { CategoryList } from "@/components/CategoryList";
import { SearchBar } from "@/components/SearchBar";
import { getArticles } from "@/lib/articles";
import Link from "next/link";

interface KnowledgePageProps {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}

export default async function KnowledgePage({ searchParams }: KnowledgePageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page || "1");
  const articles = await getArticles({
    q: params.q,
    category: params.category,
    page: currentPage,
    limit: 6,
  });

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">Kho kiến thức</h1>
        <p className="mt-2 text-slate-700">
          Cập nhật pháp lý, hướng dẫn thực tiễn và các nghiên cứu tình huống tư vấn.
        </p>
      </section>

      <SearchBar />
      <CategoryList selected={params.category} />

      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>

      <div className="flex gap-2">
        {currentPage > 1 && (
          <Link
            href={`/knowledge?page=${currentPage - 1}${params.q ? `&q=${params.q}` : ""}${params.category ? `&category=${params.category}` : ""}`}
            className="rounded border px-3 py-1 text-sm"
          >
            Trang trước
          </Link>
        )}
        {articles.length === 6 && (
          <Link
            href={`/knowledge?page=${currentPage + 1}${params.q ? `&q=${params.q}` : ""}${params.category ? `&category=${params.category}` : ""}`}
            className="rounded border px-3 py-1 text-sm"
          >
            Trang sau
          </Link>
        )}
      </div>
    </div>
  );
}
