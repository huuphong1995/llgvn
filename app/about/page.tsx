import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";

export default function AboutPage() {
  const team = [
    {
      name: "Nguyễn Minh An",
      role: "Giám đốc Tư vấn pháp lý",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Trần Thu Hà",
      role: "Trưởng bộ phận Hồ sơ công bố",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Lê Quốc Bảo",
      role: "Chuyên gia Môi trường và ĐTM",
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <PageContainer className="space-y-12 pb-10">
      <section className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-12 text-white md:px-10">
        <Image
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80"
          alt="Giới thiệu LLG VN"
          fill
          unoptimized
          className="absolute inset-0 object-cover opacity-35"
        />
        <div className="relative max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
            Về chúng tôi
          </p>
          <h1 className="mt-3 text-3xl font-black md:text-5xl">
            LLG VN - Đối tác tư vấn tuân thủ toàn diện cho doanh nghiệp
          </h1>
          <p className="mt-4 text-slate-100">
            Chúng tôi hỗ trợ doanh nghiệp triển khai hồ sơ pháp lý, công bố sản phẩm và
            thủ tục môi trường theo hướng nhanh, chuẩn và bền vững.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { value: "10+", label: "Năm kinh nghiệm" },
          { value: "1,200+", label: "Hồ sơ đã triển khai" },
          { value: "98%", label: "Khách hàng hài lòng" },
          { value: "24h", label: "Phản hồi tư vấn ban đầu" },
        ].map((item) => (
          <article key={item.label} className="rounded-xl bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-black text-sky-700">{item.value}</p>
            <p className="mt-1 text-sm text-slate-600">{item.label}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Sứ mệnh</h2>
          <p className="mt-2 leading-7 text-slate-700">
            Giúp doanh nghiệp tuân thủ quy định với sự tự tin, tốc độ và minh bạch.
          </p>
          <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-slate-600">
            <li>Đơn giản hóa quy trình pháp lý phức tạp</li>
            <li>Chuẩn hóa hồ sơ ngay từ đầu, giảm vòng chỉnh sửa</li>
            <li>Đồng hành đến khi doanh nghiệp vận hành ổn định</li>
          </ul>
        </article>
        <article className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Tầm nhìn</h2>
          <p className="mt-2 leading-7 text-slate-700">
            Trở thành đối tác tư vấn được tin cậy hàng đầu tại Việt Nam cho các ngành
            có yêu cầu pháp lý cao.
          </p>
          <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-slate-600">
            <li>Phát triển hệ sinh thái tư vấn dựa trên dữ liệu</li>
            <li>Liên tục cập nhật thay đổi quy định mới</li>
            <li>Xây dựng chuẩn dịch vụ tư vấn chuyên nghiệp</li>
          </ul>
        </article>
      </section>

      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Năng lực cốt lõi</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border p-4">
            <h3 className="font-semibold">Y tế</h3>
            <p className="mt-2 text-sm text-slate-600">
              Tư vấn cấp phép, công bố và hồ sơ pháp lý trang thiết bị y tế.
            </p>
          </article>
          <article className="rounded-lg border p-4">
            <h3 className="font-semibold">Thực phẩm</h3>
            <p className="mt-2 text-sm text-slate-600">
              Công bố sản phẩm, kiểm nghiệm và hồ sơ tuân thủ an toàn thực phẩm.
            </p>
          </article>
          <article className="rounded-lg border p-4">
            <h3 className="font-semibold">Môi trường</h3>
            <p className="mt-2 text-sm text-slate-600">
              ĐTM, giấy phép môi trường và báo cáo giám sát định kỳ.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Đội ngũ</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="rounded-lg border p-4 text-center">
              <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-semibold text-slate-900">{member.name}</p>
              <p className="text-sm text-slate-600">{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-gradient-to-r from-emerald-600 to-sky-700 p-8 text-white">
        <h2 className="text-2xl font-bold">Sẵn sàng đồng hành cùng doanh nghiệp của bạn</h2>
        <p className="mt-2 max-w-2xl text-emerald-50">
          Đặt lịch tư vấn để nhận lộ trình triển khai hồ sơ phù hợp theo ngành, quy mô
          và mục tiêu vận hành của doanh nghiệp.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-lg bg-white px-5 py-2 font-semibold text-sky-800"
        >
          Liên hệ tư vấn ngay
        </Link>
      </section>
    </PageContainer>
  );
}
