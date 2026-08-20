import type { ContactLead } from "@/lib/contact-leads-store";

interface AdminContactLeadsProps {
  leads: ContactLead[];
}

function formatTime(value: string) {
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function AdminContactLeads({ leads }: AdminContactLeadsProps) {
  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Lead liên hệ</h2>
          <p className="mt-2 text-sm text-slate-600">
            Form website lưu tại đây và gửi về bot Telegram (khi đã cấu hình{" "}
            <code className="rounded bg-slate-100 px-1">TELEGRAM_BOT_TOKEN</code>).
          </p>
        </div>
        <span className="text-sm text-slate-500">{leads.length} lead gần đây</span>
      </div>

      <ul className="mt-5 divide-y rounded-lg border">
        {leads.map((lead) => {
          const phoneDigits = lead.phone?.replace(/\D/g, "") ?? "";
          return (
            <li key={lead._id} className="space-y-2 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-slate-900">{lead.name}</h3>
                <time className="text-xs text-slate-500">{formatTime(lead.createdAt)}</time>
              </div>
              <p className="text-sm text-slate-700">
                {lead.email}
                {lead.phone ? ` · ${lead.phone}` : ""}
                {lead.service ? ` · ${lead.service}` : ""}
              </p>
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                {lead.message}
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                {lead.phone ? (
                  <>
                    <a
                      href={`tel:${phoneDigits}`}
                      className="rounded border px-2.5 py-1 text-emerald-800 hover:bg-emerald-50"
                    >
                      Gọi
                    </a>
                    <a
                      href={`https://zalo.me/${phoneDigits}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded border px-2.5 py-1 text-sky-800 hover:bg-sky-50"
                    >
                      Zalo khách
                    </a>
                  </>
                ) : null}
                <a
                  href={`mailto:${lead.email}`}
                  className="rounded border px-2.5 py-1 text-slate-700 hover:bg-slate-50"
                >
                  Email
                </a>
              </div>
            </li>
          );
        })}
        {leads.length === 0 ? (
          <li className="p-4 text-sm text-slate-500">Chưa có lead nào.</li>
        ) : null}
      </ul>
    </section>
  );
}
