import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveContactLead } from "@/lib/contact-leads-store";
import { notifyContactLead } from "@/lib/notify-contact-lead";

const contactSchema = z.object({
  name: z.string().min(2, "Họ tên quá ngắn"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(8, "Số điện thoại không hợp lệ"),
  message: z.string().min(10, "Nội dung quá ngắn"),
  service: z.string().optional(),
  source: z.string().optional(),
  website: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { website, ...data } = parsed.data;

  if (website && website.trim().length > 0) {
    return NextResponse.json({
      success: true,
      message: "Đã nhận yêu cầu liên hệ.",
    });
  }

  const lead = await saveContactLead(data);
  const notify = await notifyContactLead(lead);

  const requireNotify = process.env.CONTACT_REQUIRE_NOTIFY === "true";
  if (requireNotify && !notify.telegram && !notify.emailed && !notify.webhooked) {
    return NextResponse.json(
      {
        error: "Không gửi được thông báo. Vui lòng gọi hotline.",
        details: notify.errors,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Đã nhận yêu cầu liên hệ. LLG VN sẽ phản hồi sớm.",
    delivered: {
      telegram: notify.telegram,
      email: notify.emailed,
      webhook: notify.webhooked,
    },
  });
}
