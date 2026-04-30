import { ServiceCard } from "@/components/ServiceCard";

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold">Dịch vụ tư vấn</h1>
        <p className="mt-2 text-slate-700">
          Hỗ trợ pháp lý và tuân thủ trọn gói từ chuẩn bị hồ sơ đến làm việc với cơ quan quản lý.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <ServiceCard
          title="Tư vấn Y tế"
          description="Hỗ trợ chuyên sâu về hồ sơ và tuân thủ trong lĩnh vực y tế."
          items={["Hỗ trợ xin giấy phép", "Hồ sơ pháp lý"]}
        />
        <ServiceCard
          title="Tư vấn Thực phẩm"
          description="Dịch vụ tuân thủ đáng tin cậy cho doanh nghiệp thực phẩm."
          items={["Công bố sản phẩm", "Tuân thủ an toàn thực phẩm"]}
        />
        <ServiceCard
          title="Tư vấn Môi trường"
          description="Hỗ trợ pháp lý môi trường cho dự án đầu tư và vận hành."
          items={[
            "Đánh giá tác động môi trường (ĐTM)",
            "Giấy phép môi trường",
          ]}
        />
      </div>
    </div>
  );
}
