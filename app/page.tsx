import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { ServiceTileCard } from "@/components/ServiceTileCard";
import { getArticles } from "@/lib/articles";
import { getServiceSlug } from "@/lib/featured-services";
import { getResolvedFeaturedServiceSections } from "@/lib/service-images";
import { SITE_CONTAINER_CLASS } from "@/lib/constants";
import heroBackground from "@/models/nenllgvn.png";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = (await getArticles()).filter((article) => article.isFeatured);
  const serviceSections = await getResolvedFeaturedServiceSections();

  return (
    <div className="space-y-12 pb-12">
      <section className="relative overflow-hidden bg-slate-900 py-14 text-white md:py-20">
        <Image
          src={heroBackground}
          alt="Nền LLG VN"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/45" />
        <div className={`relative ${SITE_CONTAINER_CLASS}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
            LLG VN
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
            Chính xác - Hiệu quả - Tin cậy
          </h1>
          <p className="mt-4 max-w-2xl text-slate-100">
            Dịch vụ tư vấn và kiểm nghiệm toàn diện, giúp doanh nghiệp đáp ứng yêu cầu pháp lý
            khắt khe và nâng cao giá trị thương hiệu trên thị trường.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-slate-900 sm:px-5 sm:text-base"
            >
              Tìm hiểu thêm
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/80 px-4 py-2.5 text-sm font-bold text-white sm:px-5 sm:text-base"
            >
              Nhận báo giá
            </Link>
          </div>
        </div>
      </section>

      <section className={SITE_CONTAINER_CLASS}>
        <div className="mb-5 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Dịch vụ tiêu biểu</h2>
            <p className="mt-1 text-slate-600">
              Cấu trúc dịch vụ phân tầng theo nhóm ngành, tương tự mô hình portal doanh nghiệp.
            </p>
          </div>
          <Link href="/services" className="text-sm font-semibold text-sky-700">
            Xem toàn bộ dịch vụ →
          </Link>
        </div>
        {serviceSections.map((section, sectionIndex) => (
          <Fragment key={section.heading}>
            <h3
              className={`mb-3 text-2xl font-medium text-emerald-700 ${sectionIndex > 0 ? "mt-8" : ""}`}
            >
              {section.heading}
            </h3>
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
      </section>

      <section className={SITE_CONTAINER_CLASS}>
        <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Tin tức & kiến thức nổi bật</h2>
          <Link href="/knowledge" className="text-sm font-semibold text-sky-700">
            Khám phá thêm
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((article) => (
            <ArticleCard key={article._id} article={article} featuredLayout />
          ))}
        </div>
      </section>

      <section className={`${SITE_CONTAINER_CLASS} grid gap-4 lg:grid-cols-[2fr,1fr]`}>
        <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-700 p-8 text-white">
          <h2 className="text-3xl font-bold">Liên hệ với LLG VN</h2>
          <p className="mt-2 max-w-xl text-emerald-50">
            Đội ngũ chuyên gia của chúng tôi hỗ trợ tư vấn nhanh trong ngày cho hồ sơ pháp lý
            y tế, thực phẩm và môi trường.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Hotline</p>
          <p className="text-2xl font-black text-slate-900">0862 564 895</p>
          <p className="mt-3 text-sm text-slate-500">Email</p>
          <p className="font-semibold text-slate-900">info@llgbiotech.vn</p>
        </div>
      </section>
    </div>
  );
}
