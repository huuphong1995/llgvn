import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminArticleForm } from "@/components/AdminArticleForm";
import { verifyAdminToken } from "@/lib/auth";
import { getArticles } from "@/lib/articles";

export default async function AdminPage() {
  const token = (await cookies()).get("llg_admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    redirect("/admin/login");
  }

  const articles = await getArticles();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bảng điều khiển quản trị</h1>
      <AdminArticleForm />
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Bài viết gần đây</h2>
        <div className="mt-3 space-y-3">
          {articles.map((article) => (
            <div key={article._id} className="rounded border p-3">
              <p className="font-medium">{article.title}</p>
              <p className="text-sm text-slate-600">{article.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
