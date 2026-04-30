import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticles } from "@/lib/articles";
import heroBackground from "@/models/nenllgvn.png";

export default async function Home() {
  const featured = (await getArticles()).filter((article) => article.isFeatured);

  const serviceTiles = [
    "Thử nghiệm thực phẩm",
    "Kiểm nghiệm nước",
    "Kiểm nghiệm đất",
    "Công bố mỹ phẩm",
    "Công bố thực phẩm chức năng",
    "Tư vấn ĐTM",
    "Giấy phép môi trường",
    "Hồ sơ pháp lý y tế",
    "Đào tạo ISO/IEC 17025",
  ];

  return (
    <div className="space-y-12 pb-12">
      <section className="relative overflow-hidden bg-slate-900 px-4 py-20 text-white">
        <Image
          src={heroBackground}
          alt="Nền LLG VN"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/45" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
            LLG VN
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Chính xác - Hiệu quả - Đáng tin cậy
          </h1>
          <p className="mt-4 max-w-2xl text-slate-100">
            Dịch vụ tư vấn và kiểm nghiệm toàn diện, giúp doanh nghiệp đáp ứng yêu cầu pháp lý
            khắt khe và nâng cao giá trị thương hiệu trên thị trường.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="rounded-lg bg-white px-5 py-2.5 font-bold text-slate-900">
              Tìm hiểu thêm
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/80 px-5 py-2.5 font-bold text-white"
            >
              Nhận báo giá
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Dịch vụ tiêu biểu</h2>
            <p className="mt-1 text-slate-600">
              Cấu trúc dịch vụ phân tầng theo nhóm ngành, tương tự mô hình portal doanh nghiệp.
            </p>
          </div>
          <Link href="/services" className="text-sm font-semibold text-sky-700">
            Xem toàn bộ dịch vụ →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceTiles.map((service) => (
            <article
              key={service}
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-900">{service}</h3>
              <p className="mt-2 text-sm text-slate-600">
                Xây dựng hồ sơ theo chuẩn, giảm rủi ro trả hồ sơ và tối ưu tiến độ phê duyệt.
              </p>
              <p className="mt-3 text-sm font-bold text-sky-700 group-hover:text-emerald-700">
                Xem thêm &gt;
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Tin tức & kiến thức nổi bật</h2>
          <Link href="/knowledge" className="text-sm font-semibold text-sky-700">
            Khám phá thêm
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 lg:grid-cols-[2fr,1fr]">
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
