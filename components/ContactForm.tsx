"use client";

import { FormEvent, useState } from "react";

interface ContactFormProps {
  initialService?: string;
}

export function ContactForm({ initialService }: ContactFormProps) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const initialMessage = initialService
    ? `Tôi cần tư vấn về dịch vụ: ${initialService}.`
    : "";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    const formData = new FormData(event.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Không thể gửi vào lúc này. Vui lòng thử lại.");
      return;
    }

    setStatus("success");
    setMessage("Cảm ơn bạn. LLG VN sẽ liên hệ sớm nhất.");
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border p-6">
      <input
        name="name"
        required
        placeholder="Họ và tên"
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email liên hệ"
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
      />
      <input
        name="phone"
        placeholder="Số điện thoại"
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
      />
      <textarea
        name="message"
        required
        placeholder="Nội dung yêu cầu tư vấn"
        defaultValue={initialMessage}
        rows={5}
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-emerald-700 px-5 py-2 font-semibold text-white disabled:opacity-60"
      >
        {status === "loading" ? "Đang gửi..." : "Gửi yêu cầu"}
      </button>
      {message && (
        <p className={status === "error" ? "text-red-600" : "text-emerald-700"}>
          {message}
        </p>
      )}
    </form>
  );
}
