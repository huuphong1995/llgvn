import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { getAllFeaturedServices, getServiceSlug } from "@/lib/featured-services";
import { listServiceChildren } from "@/lib/service-children-store";
import { getResolvedFeaturedServiceSections } from "@/lib/service-images";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/knowledge`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/news`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const [articles, serviceSections, serviceChildren] = await Promise.all([
    getArticles({ limit: 500 }),
    getResolvedFeaturedServiceSections(),
    listServiceChildren(),
  ]);

  const services = getAllFeaturedServices(serviceSections).map((service) => {
    const slug = getServiceSlug(service);
    return {
      url: `${base}/services/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    };
  });

  const knowledge = articles
    .filter(
      (article) =>
        article.category === "guidelines" || article.category === "case-studies",
    )
    .map((article) => ({
      url: `${base}/knowledge/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  // Tin tức hiện dùng chung trang chi tiết /knowledge/[slug]
  const news = articles
    .filter((article) => article.category === "legal-updates")
    .map((article) => ({
      url: `${base}/knowledge/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const serviceArticles = serviceChildren.map((child) => ({
    url: `${base}/services/${child.parentSlug}/${child.slug}`,
    lastModified: new Date(child.updatedAt || child.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...services, ...knowledge, ...news, ...serviceArticles];
}
