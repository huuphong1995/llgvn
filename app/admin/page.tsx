import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminArticlesManager } from "@/components/AdminArticlesManager";
import { AdminContactLeads } from "@/components/AdminContactLeads";
import { AdminServiceChildrenManager } from "@/components/AdminServiceChildrenManager";
import { AdminServiceImagesForm } from "@/components/AdminServiceImagesForm";
import { verifyAdminToken } from "@/lib/auth";
import { getArticles } from "@/lib/articles";
import { listContactLeads } from "@/lib/contact-leads-store";
import {
  featuredServiceSections,
  getAllFeaturedServices,
  getServiceSlug,
} from "@/lib/featured-services";
import { ensureServiceChildrenStore } from "@/lib/service-children-store";
import { getResolvedFeaturedServiceSections } from "@/lib/service-images";

export default async function AdminPage() {
  const token = (await cookies()).get("llg_admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    redirect("/admin/login");
  }

  const [articles, serviceChildren, serviceSections, leads] = await Promise.all([
    getArticles({ limit: 100 }),
    ensureServiceChildrenStore(),
    getResolvedFeaturedServiceSections(),
    listContactLeads(100),
  ]);

  const parentOptions = getAllFeaturedServices(serviceSections).map((service) => ({
    slug: getServiceSlug(service),
    title: service.title,
  }));

  const parents =
    parentOptions.length > 0
      ? parentOptions
      : getAllFeaturedServices(featuredServiceSections).map((service) => ({
          slug: getServiceSlug(service),
          title: service.title,
        }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bảng điều khiển quản trị</h1>
      <AdminContactLeads leads={leads} />
      <AdminServiceImagesForm />
      <AdminServiceChildrenManager initialItems={serviceChildren} parentOptions={parents} />
      <AdminArticlesManager initialArticles={articles} />
    </div>
  );
}
