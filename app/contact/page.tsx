import { ContactForm } from "@/components/ContactForm";
import { PageContainer } from "@/components/PageContainer";

type ContactPageProps = {
  searchParams?: {
    service?: string;
  };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const service = searchParams?.service?.trim();
  const initialService = service && service.length > 0 ? service : undefined;

  return (
    <PageContainer>
      <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Liên hệ LLG VN</h1>
        <p className="mt-3 text-slate-700">Điện thoại: 0862 564 895</p>
        <p className="text-slate-700">Email: info@llgbiotech.vn</p>
        <div className="mt-5 overflow-hidden rounded-xl">
          <iframe
            title="Bản đồ LLG VN"
            src="https://www.google.com/maps?q=Ho%20Chi%20Minh%20City&output=embed"
            className="h-64 w-full"
          />
        </div>
      </section>
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Nhận tư vấn</h2>
        {initialService ? (
          <p className="mb-3 text-sm text-slate-600">
            Dịch vụ bạn quan tâm: <span className="font-semibold">{initialService}</span>
          </p>
        ) : null}
        <ContactForm initialService={initialService} />
      </section>
      </div>
    </PageContainer>
  );
}
