import type { Metadata } from "next";
import Link from "next/link";
import { ArticleImageFrame } from "@/components/ArticleImageFrame";
import { NewsSidebar } from "@/components/NewsSidebar";
import { PageContainer } from "@/components/PageContainer";
import { getArticles } from "@/lib/articles";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tin tức pháp lý",
  description:
    "Cập nhật pháp lý, quy định mới về công bố sản phẩm, an toàn thực phẩm và thiết bị y tế dành cho doanh nghiệp.",
  path: "/news",
});

export default async function NewsPage() {
  const updates = await getArticles({ category: "legal-updates" });
  const recentPosts = (await getArticles({ limit: 5 })).slice(0, 5);

  return (
    <PageContainer>
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <section>
            <p className="text-xs font-bold uppercase tracking-wider text-sky-700">News</p>
            <h1 className="text-3xl font-bold">Tin tức pháp lý</h1>
            <p className="mt-2 text-slate-700">
              Các cập nhật pháp lý và quy định mới nhất liên quan đến doanh nghiệp của bạn.
            </p>
          </section>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            {updates.map((article) => (
              <article key={article._id} className="border-b py-5 last:border-0">
                <div className="mb-3">
                  <ArticleImageFrame
                    src={
                      article.image ||
                      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                    }
                    alt={article.title}
                    display={{ ...article.imageDisplay, fit: "contain" }}
                    imageWidth={article.imageWidth}
                    imageHeight={article.imageHeight}
                  />
                </div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Đăng ngày {new Date(article.createdAt).toLocaleDateString("vi-VN")}
                </p>
                <Link
                  href={`/knowledge/${article.slug}`}
                  className="mt-1 block text-2xl font-bold text-slate-900 hover:text-sky-700"
                >
                  {article.title}
                </Link>
                <p className="mt-2 text-base leading-7 text-slate-700">{article.summary}</p>
              </article>
            ))}
          </div>
        </div>
        <NewsSidebar recentPosts={recentPosts} searchPath="/knowledge" />
      </div>
    </PageContainer>
  );
}
