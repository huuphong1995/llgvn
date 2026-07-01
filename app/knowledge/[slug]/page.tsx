import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { NewsSidebar } from "@/components/NewsSidebar";
import { PageContainer } from "@/components/PageContainer";
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

  return (
    <PageContainer>
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-6">
        <article className="rounded-xl bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700">News</p>
          <div className="relative mt-3 h-72 w-full overflow-hidden rounded-lg">
            <Image
              src={
                article.image ||
                "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80"
              }
              alt={article.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <h1 className="mt-1 text-4xl font-bold leading-tight text-slate-900">
            {article.title}
          </h1>
          <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
            Đăng ngày {new Date(article.createdAt).toLocaleDateString("vi-VN")}
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-700">{article.summary}</p>
          <div className="mt-6 space-y-4 text-base leading-8 text-slate-800">
            <p>{article.content}</p>
          </div>
        </article>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 font-semibold">Nhận tư vấn</h2>
          <ContactForm />
        </div>
      </div>
      <div className="space-y-6">
        <NewsSidebar recentPosts={recentPosts} />
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
      </div>
      </div>
    </PageContainer>
  );
}
