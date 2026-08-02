import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/ArticleContent";
import { ContactForm } from "@/components/ContactForm";
import { NewsSidebar } from "@/components/NewsSidebar";
import { PageContainer } from "@/components/PageContainer";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/article-categories";
import { getArticleBySlug, getArticles } from "@/lib/articles";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = (await getArticles({ category: article.category }))
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);
  const recentPosts = (await getArticles({ limit: 5 })).slice(0, 5);
  const tags = article.tags
    .flatMap((tag) => tag.split(/\s+/))
    .map((tag) => tag.replace(/^#+/, "").trim())
    .filter(Boolean);

  return (
    <PageContainer className="py-8">
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
                {ARTICLE_CATEGORY_LABELS[article.category]}
              </span>
              <span className="text-xs text-slate-500">
                Đăng ngày {new Date(article.createdAt).toLocaleDateString("vi-VN")}
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              {article.title}
            </h1>

            {article.summary ? (
              <p className="mt-4 border-l-4 border-emerald-500 bg-emerald-50/70 px-4 py-3 text-base leading-7 text-slate-700">
                {article.summary}
              </p>
            ) : null}

            <div className="relative mt-6 flex min-h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100 sm:min-h-64">
              <Image
                src={
                  article.image ||
                  "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80"
                }
                alt={article.title}
                width={article.imageWidth ?? 1200}
                height={article.imageHeight ?? 800}
                unoptimized
                className="h-auto max-h-[28rem] w-full object-contain"
              />
            </div>

            {tags.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-8 border-t border-slate-100 pt-6">
              <ArticleContent content={article.content} />
            </div>
          </article>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Nhận tư vấn từ LLG VN</h2>
            <p className="mt-1 text-sm text-slate-600">
              Để lại thông tin để được hỗ trợ về hồ sơ công bố và tuân thủ pháp lý.
            </p>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <NewsSidebar recentPosts={recentPosts} />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900">Bài viết liên quan</h2>
            <div className="mt-3 space-y-3">
              {related.map((item) => (
                <Link
                  key={item._id}
                  href={`/knowledge/${item.slug}`}
                  className="block rounded-lg border border-slate-100 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
