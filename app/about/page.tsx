import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageContainer } from "@/components/PageContainer";
import { SITE_CONTAINER_CLASS } from "@/lib/constants";
import heroBackground from "@/models/nenllgvn.png";

function IconFlask() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden>
      <path d="M9 3h6M10 3v5.2L5.5 18a2.5 2.5 0 002.2 3.5h8.6a2.5 2.5 0 002.2-3.5L14 8.2V3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 14h9" strokeLinecap="round" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden>
      <path d="M7 3h7l4 4v14H7V3z" strokeLinejoin="round" />
      <path d="M14 3v4h4M9.5 12h5M9.5 16h5" strokeLinecap="round" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden>
      <path d="M12 3l8 3.5v5.2c0 4.6-3.2 8.7-8 9.8-4.8-1.1-8-5.2-8-9.8V6.5L12 3z" strokeLinejoin="round" />
      <path d="M9.2 12.2l1.9 1.9 3.7-3.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden>
      <path
        d="M12 20s-7-4.4-7-9.2A3.9 3.9 0 0112 8a3.9 3.9 0 017 2.8C19 15.6 12 20 12 20z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden>
      <path d="M13 2L5 13h6l-1 9 9-12h-6l0-8z" strokeLinejoin="round" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" strokeLinecap="round" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
      <path d="M9 4l6 2 5-2v14l-5 2-6-2-5 2V6l5-2z" strokeLinejoin="round" />
      <path d="M9 4v14M15 6v14" strokeLinecap="round" />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
      <rect x="6" y="5" width="12" height="16" rx="2" />
      <path d="M9 5V4h6v1M9 11h6M9 15h4" strokeLinecap="round" />
    </svg>
  );
}

function IconHandshake() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
      <path d="M8 13l2.5 2.5a2 2 0 002.8 0L17 12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12l3.5-3.5a2 2 0 012.8 0L12 11M21 12l-3.5 3.5a2 2 0 01-2.8 0L12 13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconBadge({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${className}`}
    >
      {children}
    </span>
  );
}

const strengths = [
  {
    title: "Tư vấn thử nghiệm",
    description:
      "Định hướng chỉ tiêu, chọn phòng lab phù hợp và đọc hiểu kết quả kiểm nghiệm để hồ sơ đạt yêu cầu ngay từ vòng đầu.",
    icon: <IconFlask />,
    tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
    accent: "from-emerald-500 to-emerald-600",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tư vấn công bố",
    description:
      "Soạn và rà soát hồ sơ công bố thực phẩm, bao bì, thiết bị y tế, hợp chuẩn hợp quy theo đúng quy định hiện hành.",
    icon: <IconDocument />,
    tone: "bg-sky-50 text-sky-700 border-sky-100",
    accent: "from-sky-500 to-sky-600",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Đào tạo tư vấn ISO",
    description:
      "Đồng hành xây dựng, duy trì hệ thống ISO 9001, 14001, 45001, 22000, HACCP, 13485 phù hợp quy mô doanh nghiệp.",
    icon: <IconShield />,
    tone: "bg-teal-50 text-teal-700 border-teal-100",
    accent: "from-teal-500 to-teal-600",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
];

const values = [
  {
    title: "Chính xác",
    description: "Mỗi hồ sơ được rà soát theo quy định mới nhất, hạn chế sai sót và vòng chỉnh sửa.",
    icon: <IconTarget />,
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Tận tâm",
    description: "Đồng hành từ tư vấn ban đầu đến khi hồ sơ hoàn tất và doanh nghiệp vận hành ổn định.",
    icon: <IconHeart />,
    tone: "bg-sky-100 text-sky-700",
  },
  {
    title: "Hiệu quả",
    description: "Tối ưu thời gian, chi phí và lộ trình triển khai theo mục tiêu kinh doanh thực tế.",
    icon: <IconBolt />,
    tone: "bg-teal-100 text-teal-700",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Tiếp nhận & đánh giá",
    description: "Lắng nghe nhu cầu, rà soát hiện trạng và xác định phạm vi tư vấn phù hợp.",
    icon: <IconSearch />,
    tone: "bg-emerald-600",
  },
  {
    step: "02",
    title: "Lập lộ trình",
    description: "Đề xuất quy trình, danh mục hồ sơ, mốc thời gian và trách nhiệm rõ ràng.",
    icon: <IconMap />,
    tone: "bg-sky-600",
  },
  {
    step: "03",
    title: "Triển khai hồ sơ",
    description: "Soạn thảo, chuẩn hóa tài liệu, phối hợp kiểm nghiệm và hoàn thiện hồ sơ nộp.",
    icon: <IconClipboard />,
    tone: "bg-teal-600",
  },
  {
    step: "04",
    title: "Đồng hành sau triển khai",
    description: "Hỗ trợ phản hồi cơ quan quản lý, chỉnh sửa bổ sung và tư vấn duy trì tuân thủ.",
    icon: <IconHandshake />,
    tone: "bg-slate-800",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-12">
      <section className="relative overflow-hidden bg-slate-900 py-16 text-white md:py-20">
        <Image
          src={heroBackground}
          alt="Nền LLG VN"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/55 to-emerald-900/35" />
        <div className={`relative ${SITE_CONTAINER_CLASS}`}>
          <div className="max-w-3xl text-left">
            <p className="text-sm font-semibold text-sky-200">Giới thiệu</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              LLG VN — đối tác tư vấn tuân thủ cho doanh nghiệp
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
              Chúng tôi đồng hành cùng doanh nghiệp trong thử nghiệm, công bố sản phẩm và
              đào tạo tư vấn ISO — chính xác, tận tâm, hiệu quả.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900"
              >
                Liên hệ tư vấn
              </Link>
              <Link
                href="/services"
                className="rounded-lg border border-white/80 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Xem dịch vụ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PageContainer className="space-y-16 pt-12">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-emerald-700">Về LLG VN</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Chúng tôi là ai
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
              <p>
                LLG VN là đơn vị tư vấn chuyên sâu về tuân thủ pháp lý cho doanh nghiệp
                hoạt động trong lĩnh vực thực phẩm, bao bì, trang thiết bị y tế và hệ thống
                quản lý chất lượng.
              </p>
              <p>
                Thay vì chỉ “làm giúp hồ sơ”, chúng tôi giúp doanh nghiệp hiểu rõ yêu cầu
                pháp lý, chuẩn hóa quy trình nội bộ và giảm rủi ro khi đưa sản phẩm ra thị
                trường hoặc vận hành hệ thống ISO.
              </p>
              <p>
                Mỗi dự án đều được triển khai theo nguyên tắc{" "}
                <span className="font-semibold text-slate-900">
                  chuyên nghiệp — tận tâm — hiệu quả
                </span>
                , với lộ trình rõ ràng và trách nhiệm cụ thể.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80"
                alt="Môi trường làm việc chuyên nghiệp"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
            <aside className="rounded-xl border border-sky-100 bg-sky-50 px-5 py-4">
              <p className="text-sm font-semibold text-sky-800">Cam kết của LLG VN</p>
              <ul className="mt-3 space-y-2.5 text-sm leading-6 text-slate-700">
                {[
                  "Tư vấn đúng quy định, cập nhật theo văn bản pháp lý mới nhất",
                  "Minh bạch phạm vi công việc, tiến độ và chi phí từ đầu",
                  "Ưu tiên hồ sơ “đúng ngay lần đầu”, hạn chế phải sửa đi sửa lại",
                  "Đồng hành đến khi doanh nghiệp sẵn sàng vận hành độc lập",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <IconCheck />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-6 py-10 sm:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Giá trị cốt lõi
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Ba giá trị định hướng cách LLG VN làm việc với mọi khách hàng.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((item) => (
              <div key={item.title} className="rounded-xl border border-white bg-white/80 p-5 shadow-sm">
                <IconBadge className={item.tone}>{item.icon}</IconBadge>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Lĩnh vực thế mạnh
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Năng lực tư vấn bám sát các nhóm dịch vụ chính trên trang chủ.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {strengths.map((item, index) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative h-40">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.accent} opacity-55`} />
                  <div className="absolute bottom-3 left-3">
                    <IconBadge className={`border ${item.tone}`}>{item.icon}</IconBadge>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-wide text-slate-500">
                    0{index + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                  <Link
                    href="/services"
                    className="mt-4 inline-block text-sm font-semibold text-sky-700 hover:text-sky-900"
                  >
                    Xem chi tiết →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl bg-emerald-600 px-6 py-8 text-white sm:px-8">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
              <IconTarget />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Sứ mệnh</h2>
            <p className="mt-4 text-base leading-8 text-emerald-50">
              Giúp doanh nghiệp đáp ứng yêu cầu pháp lý một cách tự tin, nhanh chóng và
              bền vững — để tập trung phát triển sản phẩm và thương hiệu thay vì loay hoay
              với hồ sơ.
            </p>
          </div>
          <div className="rounded-2xl bg-sky-700 px-6 py-8 text-white sm:px-8">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
              <IconShield />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Tầm nhìn</h2>
            <p className="mt-4 text-base leading-8 text-sky-50">
              Trở thành đối tác tư vấn tuân thủ đáng tin cậy tại Việt Nam cho doanh nghiệp
              trong lĩnh vực thực phẩm, y tế và hệ thống quản lý chất lượng theo chuẩn quốc
              tế.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Cách chúng tôi làm việc
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Quy trình rõ ràng giúp doanh nghiệp nắm được từng bước và chủ động phối hợp.
          </p>

          <div className="mt-8 hidden items-start lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
            {processSteps.map((item, index) => (
              <div key={item.step} className="contents">
                <div className="text-center">
                  <div
                    className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white shadow-md ${item.tone}`}
                  >
                    {item.icon}
                  </div>
                  <p className="mt-3 text-xs font-semibold text-slate-400">{item.step}</p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-600">{item.description}</p>
                </div>
                {index < processSteps.length - 1 ? (
                  <div className="flex items-center px-2 pt-6" aria-hidden>
                    <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-slate-200 via-sky-300 to-slate-200" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:hidden">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white ${item.tone}`}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">{item.step}</p>
                  <h3 className="mt-0.5 text-sm font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-xs leading-6 text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Tư vấn theo ngành",
              description: "Am hiểu đặc thù thực phẩm, bao bì, thiết bị y tế và ISO.",
              icon: <IconFlask />,
              tone: "bg-emerald-50 text-emerald-700",
            },
            {
              title: "Hồ sơ thực chiến",
              description: "Ưu tiên tài liệu đúng mẫu, đúng chỉ tiêu, dễ nộp và dễ bảo vệ.",
              icon: <IconDocument />,
              tone: "bg-sky-50 text-sky-700",
            },
            {
              title: "Đồng hành dài hạn",
              description: "Không chỉ hoàn tất hồ sơ mà còn hỗ trợ duy trì tuân thủ sau đó.",
              icon: <IconHandshake />,
              tone: "bg-teal-50 text-teal-700",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <IconBadge className={item.tone}>{item.icon}</IconBadge>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-12 text-white sm:px-10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-2xl" />
          <div className="absolute -bottom-12 left-10 h-40 w-40 rounded-full bg-sky-500/20 blur-2xl" />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Sẵn sàng đồng hành cùng doanh nghiệp của bạn
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Chia sẻ nhu cầu của bạn — LLG VN sẽ đề xuất lộ trình tư vấn phù hợp với ngành
              hàng, quy mô và mục tiêu đưa sản phẩm ra thị trường.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900"
              >
                Liên hệ tư vấn ngay
              </Link>
              <a
                href="tel:0862564895"
                className="rounded-lg border border-white/70 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Gọi 0862 564 895
              </a>
            </div>
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
