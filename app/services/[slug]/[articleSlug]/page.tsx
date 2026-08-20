import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/ArticleContent";
import { ContactForm } from "@/components/ContactForm";
import { IsoLabelVisual } from "@/components/IsoLabelVisual";
import { PageContainer } from "@/components/PageContainer";
import { ServiceBreadcrumbs } from "@/components/ServiceBreadcrumbs";
import {
  getFeaturedServiceBySlug,
  getSectionForService,
} from "@/lib/featured-services";
import {
  getChildArticleContent,
  getServiceChildArticle,
} from "@/lib/service-children";
import { buildPageMetadata } from "@/lib/seo";
import { getResolvedFeaturedServiceSections } from "@/lib/service-images";

interface ServiceArticlePageProps {
  params: Promise<{ slug: string; articleSlug: string }>;
}

export async function generateMetadata({
  params,
}: ServiceArticlePageProps): Promise<Metadata> {
  const { slug, articleSlug } = await params;
  const serviceSections = await getResolvedFeaturedServiceSections();
  const service = getFeaturedServiceBySlug(slug, serviceSections);
  const child = service ? await getServiceChildArticle(slug, articleSlug, service) : null;

  if (!service || !child) {
    return buildPageMetadata({
      title: "Bài viết không tồn tại",
      description: "Không tìm thấy bài viết dịch vụ trên LLG VN.",
      path: `/services/${slug}/${articleSlug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: child.title,
    description: child.summary,
    path: `/services/${slug}/${articleSlug}`,
    image: child.image ?? service.image,
    type: "article",
  });
}

export default async function ServiceArticlePage({ params }: ServiceArticlePageProps) {
  const { slug, articleSlug } = await params;
  const serviceSections = await getResolvedFeaturedServiceSections();
  const service = getFeaturedServiceBySlug(slug, serviceSections);
  if (!service) notFound();

  const child = await getServiceChildArticle(slug, articleSlug, service);
  if (!child) notFound();

  const structuredContent = child.content
    ? null
    : getChildArticleContent(slug, child);
  const section = getSectionForService(slug, serviceSections);

  return (
    <PageContainer className="py-8">
      <div className="space-y-6">
        <ServiceBreadcrumbs
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Dịch vụ", href: "/services" },
            ...(section ? [{ label: section.heading, href: "/services" }] : []),
            { label: service.title, href: `/services/${slug}` },
            { label: child.title },
          ]}
        />

        <article className="rounded-xl bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
            {service.title}
          </p>
          <div className="relative mt-3 w-full overflow-hidden rounded-lg bg-slate-100">
            {child.image ? (
              <Image
                src={child.image}
                alt={child.title}
                width={1600}
                height={900}
                unoptimized
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
              />
            ) : child.isoLabel !== undefined ? (
              <div className="relative aspect-[16/9] w-full sm:min-h-72">
                <IsoLabelVisual label={child.isoLabel} />
              </div>
            ) : (
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={service.image}
                  alt={child.title}
                  fill
                  unoptimized
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 960px"
                />
              </div>
            )}
          </div>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            {structuredContent?.pageTitle ?? child.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">{child.summary}</p>

          {child.content ? (
            <div className="mt-8">
              <ArticleContent content={child.content} />
            </div>
          ) : structuredContent ? (
            <div className="mt-8 space-y-8">
              {structuredContent.sections.map((sectionBlock, index) => (
                <section
                  key={`${sectionBlock.heading ?? "section"}-${index}`}
                  className="space-y-4"
                >
                  {sectionBlock.heading ? (
                    <h2 className="text-2xl font-semibold text-slate-900">
                      {sectionBlock.heading}
                    </h2>
                  ) : null}
                  {sectionBlock.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-slate-800">
                      {paragraph}
                    </p>
                  ))}
                  {sectionBlock.bullets && sectionBlock.bullets.length > 0 ? (
                    <ul className="list-disc space-y-2 pl-6 text-base leading-8 text-slate-800">
                      {sectionBlock.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-base leading-8 text-slate-700">
              LLG VN cung cấp dịch vụ {child.title.toLowerCase()} với quy trình tư vấn rõ ràng,
              hỗ trợ doanh nghiệp chuẩn bị hồ sơ và tuân thủ quy định pháp luật. Liên hệ với chúng
              tôi để được tư vấn chi tiết.
            </p>
          )}
        </article>

        <div className="rounded-xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Nhận tư vấn về dịch vụ này</h2>
          <p className="mt-2 text-sm text-slate-600">
            Dịch vụ bạn quan tâm: <span className="font-semibold">{service.title}</span>
          </p>
          <div className="mt-4">
            <ContactForm initialService={service.title} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
