import type { Metadata } from "next";
import { Fragment } from "react";
import { PageContainer } from "@/components/PageContainer";
import { ServiceTileCard } from "@/components/ServiceTileCard";
import { getServiceSlug } from "@/lib/featured-services";
import { getResolvedFeaturedServiceSections } from "@/lib/service-images";

export const metadata: Metadata = {
  title: "Dịch vụ tư vấn | LLG VN",
  description:
    "Các dịch vụ tư vấn thử nghiệm, công bố sản phẩm và đào tạo tư vấn ISO của LLG VN dành cho doanh nghiệp.",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const serviceSections = await getResolvedFeaturedServiceSections();

  return (
    <PageContainer className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold">Dịch vụ tư vấn</h1>
        <p className="mt-2 text-slate-700">
          Hỗ trợ pháp lý và tuân thủ trọn gói từ chuẩn bị hồ sơ đến làm việc với cơ quan quản lý.
        </p>
      </section>

      {serviceSections.map((section, sectionIndex) => (
        <Fragment key={section.heading}>
          <h2
            className={`text-2xl font-semibold text-emerald-700 ${sectionIndex > 0 ? "pt-4" : ""}`}
          >
            {section.heading}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {section.tiles.map((item) => (
              <ServiceTileCard
                key={item.title}
                title={item.title}
                image={item.image}
                imageDisplay={item.imageDisplay}
                isoLabel={item.isoLabel}
                href={`/services/${getServiceSlug(item)}`}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </PageContainer>
  );
}
