"use client";

import { useState } from "react";

export function AdminArticleForm() {
  const [result, setResult] = useState("");

  async function submit(formData: FormData) {
    const payload = {
      title: formData.get("title"),
      summary: formData.get("summary"),
      content: formData.get("content"),
      category: formData.get("category"),
      tags: String(formData.get("tags") || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isFeatured: formData.get("isFeatured") === "on",
    };

    const response = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setResult(response.ok ? "Đã lưu bài viết." : "Tạo bài viết thất bại.");
  }

  return (
    <form action={submit} className="space-y-3 rounded-xl border bg-white p-5">
      <h3 className="text-lg font-semibold">Tạo bài viết</h3>
      <input
        name="title"
        required
        placeholder="Tiêu đề"
        className="w-full rounded border px-3 py-2"
      />
      <textarea
        name="summary"
        required
        placeholder="Tóm tắt"
        rows={2}
        className="w-full rounded border px-3 py-2"
      />
      <textarea
        name="content"
        required
        placeholder="Nội dung bài viết (có thể nâng cấp rich text sau)"
        rows={8}
        className="w-full rounded border px-3 py-2"
      />
      <select name="category" className="w-full rounded border px-3 py-2">
        <option value="legal-updates">Cập nhật pháp lý</option>
        <option value="guidelines">Hướng dẫn</option>
        <option value="case-studies">Nghiên cứu tình huống</option>
      </select>
      <input
        name="tags"
        placeholder="Tag, cách nhau bởi dấu phẩy"
        className="w-full rounded border px-3 py-2"
      />
      <label className="flex items-center gap-2 text-sm">
        <input name="isFeatured" type="checkbox" />
        Đánh dấu nổi bật
      </label>
      <button className="rounded bg-sky-700 px-4 py-2 text-white">Đăng bài</button>
      {result && <p className="text-sm text-slate-700">{result}</p>}
    </form>
  );
}
