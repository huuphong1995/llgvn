import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminArticlesManager } from "@/components/AdminArticlesManager";
import { AdminServiceImagesForm } from "@/components/AdminServiceImagesForm";
import { verifyAdminToken } from "@/lib/auth";
import { getArticles } from "@/lib/articles";

export default async function AdminPage() {
  const token = (await cookies()).get("llg_admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    redirect("/admin/login");
  }

  const articles = await getArticles({ limit: 100 });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bảng điều khiển quản trị</h1>
      <AdminServiceImagesForm />
      <AdminArticlesManager initialArticles={articles} />
    </div>
  );
}
