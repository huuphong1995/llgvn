import { SITE_CONTACT } from "@/lib/constants";
import type { ContactLead } from "@/lib/contact-leads-store";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildTelegramText(lead: ContactLead) {
  const phone = lead.phone || "—";
  const lines = [
    "<b>🔔 Lead mới từ website LLG VN</b>",
    "",
    `<b>Họ tên:</b> ${escapeHtml(lead.name)}`,
    `<b>Điện thoại:</b> ${escapeHtml(phone)}`,
    `<b>Email:</b> ${escapeHtml(lead.email)}`,
  ];

  if (lead.service) {
    lines.push(`<b>Dịch vụ:</b> ${escapeHtml(lead.service)}`);
  }
  if (lead.source) {
    lines.push(`<b>Nguồn:</b> ${escapeHtml(lead.source)}`);
  }

  lines.push("", "<b>Nội dung:</b>", escapeHtml(lead.message));

  if (lead.phone) {
    const digits = lead.phone.replace(/\D/g, "");
    lines.push("", `📞 Gọi: tel:${digits}`, `💬 Zalo khách: https://zalo.me/${digits}`);
  }

  lines.push(`✉️ Email: ${escapeHtml(lead.email)}`);
  return lines.join("\n");
}

function buildEmailHtml(lead: ContactLead) {
  const zaloCustomer = lead.phone
    ? `https://zalo.me/${lead.phone.replace(/\D/g, "")}`
    : "";

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="margin:0 0 12px">Lead liên hệ mới từ website LLG VN</h2>
      <p><strong>Họ tên:</strong> ${escapeHtml(lead.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
      <p><strong>Điện thoại:</strong> ${escapeHtml(lead.phone || "—")}</p>
      ${lead.service ? `<p><strong>Dịch vụ quan tâm:</strong> ${escapeHtml(lead.service)}</p>` : ""}
      ${lead.source ? `<p><strong>Nguồn:</strong> ${escapeHtml(lead.source)}</p>` : ""}
      <p><strong>Nội dung:</strong></p>
      <pre style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px">${escapeHtml(lead.message)}</pre>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0" />
      <p>
        ${lead.phone ? `<a href="tel:${escapeHtml(lead.phone.replace(/\s/g, ""))}">Gọi khách</a> · ` : ""}
        ${zaloCustomer ? `<a href="${zaloCustomer}">Nhắn Zalo khách</a> · ` : ""}
        <a href="mailto:${escapeHtml(lead.email)}">Reply email</a>
      </p>
      <p style="color:#64748b;font-size:12px">Hotline LLG: ${SITE_CONTACT.phoneDisplay}</p>
    </div>
  `;
}

export type NotifyContactResult = {
  telegram: boolean;
  emailed: boolean;
  webhooked: boolean;
  errors: string[];
};

export async function notifyContactLead(lead: ContactLead): Promise<NotifyContactResult> {
  const errors: string[] = [];
  let telegram = false;
  let emailed = false;
  let webhooked = false;

  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (botToken && chatId) {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: buildTelegramText(lead),
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        },
      );

      const body = (await response.json()) as { ok?: boolean; description?: string };
      if (!response.ok || !body.ok) {
        errors.push(`Telegram thất bại: ${body.description || response.statusText}`);
      } else {
        telegram = true;
      }
    } catch (error) {
      errors.push(
        error instanceof Error
          ? `Telegram lỗi: ${error.message}`
          : "Telegram lỗi không xác định.",
      );
    }
  } else {
    errors.push("Chưa cấu hình TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID.");
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || SITE_CONTACT.email;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      "LLG VN Website <onboarding@resend.dev>";

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: lead.email,
          subject: `[LLG VN] Lead mới — ${lead.name}${lead.service ? ` (${lead.service})` : ""}`,
          html: buildEmailHtml(lead),
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        errors.push(`Email thất bại: ${body || response.statusText}`);
      } else {
        emailed = true;
      }
    } catch (error) {
      errors.push(
        error instanceof Error ? `Email lỗi: ${error.message}` : "Email lỗi không xác định.",
      );
    }
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact_lead",
          lead,
        }),
      });
      if (!response.ok) {
        errors.push(`Webhook thất bại: ${response.status} ${response.statusText}`);
      } else {
        webhooked = true;
      }
    } catch (error) {
      errors.push(
        error instanceof Error
          ? `Webhook lỗi: ${error.message}`
          : "Webhook lỗi không xác định.",
      );
    }
  }

  return { telegram, emailed, webhooked, errors };
}
