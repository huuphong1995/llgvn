import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
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

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <article className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <p className="mt-3 text-slate-700">{article.summary}</p>
        <div className="mt-5 rounded-lg bg-slate-50 p-4 text-slate-800">
          {article.content}
        </div>
      </article>
      <aside className="space-y-6">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Bài viết liên quan</h2>
          <div className="mt-3 space-y-3">
            {related.map((item) => (
              <Link
                key={item._id}
                href={`/knowledge/${item.slug}`}
                className="block text-sm font-medium text-sky-700"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 font-semibold">Nhận tư vấn</h2>
          <ContactForm />
        </div>
      </aside>
    </div>
  );
}
