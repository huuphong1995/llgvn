import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/PageContainer";
import { ServiceSectionView } from "@/components/ServiceSectionView";
import { getFeaturedServiceBySlug, getSectionForService } from "@/lib/featured-services";
import { getServiceChildren } from "@/lib/service-children";
import { getResolvedFeaturedServiceSections } from "@/lib/service-images";

interface ServiceParentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServiceParentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const serviceSections = await getResolvedFeaturedServiceSections();
  const service = getFeaturedServiceBySlug(slug, serviceSections);

  if (!service) {
    return { title: "Dịch vụ không tồn tại | LLG VN" };
  }

  return {
    title: `${service.title} | LLG VN`,
    description: `Danh sách bài viết thuộc chủ đề ${service.title} của LLG VN.`,
  };
}

export default async function ServiceParentPage({ params }: ServiceParentPageProps) {
  const { slug } = await params;
  const serviceSections = await getResolvedFeaturedServiceSections();
  const service = getFeaturedServiceBySlug(slug, serviceSections);
  if (!service) notFound();

  const section = getSectionForService(slug, serviceSections);
  const children = getServiceChildren(slug, service);

  const articles = children.map((child) => ({
    title: child.title,
    summary: child.summary,
    image: child.image ?? service.image,
    href: `/services/${slug}/${child.slug}`,
    isoLabel: child.isoLabel,
  }));

  return (
    <PageContainer className="py-8">
      <ServiceSectionView
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Dịch vụ", href: "/services" },
          ...(section ? [{ label: section.heading, href: "/services" }] : []),
          { label: service.title },
        ]}
        topicTitle={service.title}
        articles={articles}
      />
    </PageContainer>
  );
}
