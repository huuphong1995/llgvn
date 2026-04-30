export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Về LLG VN</h1>
        <p className="mt-3 text-slate-700">
          LLG VN là công ty tư vấn chuyên nghiệp, đồng hành cùng doanh nghiệp trong
          các lĩnh vực y tế, thực phẩm và môi trường thông qua giải pháp pháp lý và
          triển khai hồ sơ hiệu quả.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Sứ mệnh</h2>
          <p className="mt-2 text-slate-700">
            Giúp doanh nghiệp tuân thủ quy định với sự tự tin, tốc độ và minh bạch.
          </p>
        </article>
        <article className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Tầm nhìn</h2>
          <p className="mt-2 text-slate-700">
            Trở thành đối tác tư vấn được tin cậy hàng đầu tại Việt Nam cho các ngành
            có yêu cầu pháp lý cao.
          </p>
        </article>
      </section>

      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Đội ngũ</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {["Trưởng nhóm pháp chế", "Chuyên gia hồ sơ pháp lý", "Chuyên gia môi trường"].map(
            (role) => (
              <div key={role} className="rounded-lg border p-4 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-sky-100" />
                <p className="mt-3 font-semibold">{role}</p>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
