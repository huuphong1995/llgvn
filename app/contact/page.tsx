import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageContainer } from "@/components/PageContainer";
import { SITE_CONTACT } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Liên hệ",
  description: `Liên hệ LLG VN để được tư vấn công bố, thử nghiệm và ISO. Hotline ${SITE_CONTACT.phoneDisplay}, email ${SITE_CONTACT.email}.`,
  path: "/contact",
});

type ContactPageProps = {
  searchParams?: Promise<{ service?: string }> | { service?: string };
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolved = await Promise.resolve(searchParams);
  const service = resolved?.service?.trim();
  const initialService = service && service.length > 0 ? service : undefined;
  const mapQuery = encodeURIComponent(SITE_CONTACT.address);

  return (
    <PageContainer>
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Liên hệ LLG VN</h1>
          <p className="mt-3 text-slate-700">Điện thoại: {SITE_CONTACT.phoneDisplay}</p>
          <p className="text-slate-700">Email: {SITE_CONTACT.email}</p>
          <p className="text-slate-700">Địa chỉ: {SITE_CONTACT.address}</p>
          <div className="mt-5 overflow-hidden rounded-xl">
            <iframe
              title="Bản đồ LLG VN"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
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
