"use client";

import { useMemo, useRef, useState } from "react";
import type { StoredServiceChild } from "@/lib/service-children";

type ParentOption = {
  slug: string;
  title: string;
};

type FormState = {
  parentSlug: string;
  title: string;
  summary: string;
  content: string;
  isoLabel: string;
  image: string;
};

const ISO_PARENT_SLUG = "dich-vu-dao-tao-tu-van-iso";

function formatApiError(error: unknown) {
  if (!error) return "Yêu cầu thất bại.";
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null && "formErrors" in error) {
    return "Vui lòng kiểm tra lại tiêu đề, tóm tắt và nội dung.";
  }
  return "Yêu cầu thất bại.";
}

interface AdminServiceChildrenManagerProps {
  initialItems: StoredServiceChild[];
  parentOptions: ParentOption[];
}

export function AdminServiceChildrenManager({
  initialItems,
  parentOptions,
}: AdminServiceChildrenManagerProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultParent =
    parentOptions.find((item) => item.slug === ISO_PARENT_SLUG)?.slug ??
    parentOptions[0]?.slug ??
    "";

  const emptyForm = (): FormState => ({
    parentSlug: defaultParent,
    title: "",
    summary: "",
    content: "",
    isoLabel: "",
    image: "",
  });

  const [items, setItems] = useState(initialItems);
  const [parentFilter, setParentFilter] = useState(defaultParent);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");
  const [working, setWorking] = useState(false);

  const filteredItems = useMemo(
    () =>
      parentFilter
        ? items.filter((item) => item.parentSlug === parentFilter)
        : items,
    [items, parentFilter],
  );

  const parentTitle = (slug: string) =>
    parentOptions.find((item) => item.slug === slug)?.title ?? slug;

  function resetForm() {
    setEditingId(null);
    setForm({ ...emptyForm(), parentSlug: parentFilter || defaultParent });
    setSelectedFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function startCreate() {
    resetForm();
    setMessage("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleFileChange(file: File | null) {
    setSelectedFile(file);
    if (!file) {
      setImagePreview(form.image);
      return;
    }
    setImagePreview(URL.createObjectURL(file));
  }

  function clearImage() {
    setSelectedFile(null);
    setImagePreview("");
    setForm((current) => ({ ...current, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function startEdit(item: StoredServiceChild) {
    setEditingId(item._id);
    setForm({
      parentSlug: item.parentSlug,
      title: item.title,
      summary: item.summary,
      content: item.content ?? "",
      isoLabel: item.isoLabel ?? "",
      image: item.image ?? "",
    });
    setSelectedFile(null);
    setImagePreview(item.image ?? "");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setMessage("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function refreshAll() {
    const response = await fetch("/api/service-children");
    if (!response.ok) return;
    const data = (await response.json()) as StoredServiceChild[];
    setItems(data);
  }

  async function uploadSelectedImage() {
    if (!selectedFile) {
      setMessage("Vui lòng chọn file ảnh trước khi tải lên.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    if (editingId) {
      formData.append("articleId", editingId);
    }

    const response = await fetch("/api/articles/upload", {
      method: "POST",
      body: formData,
    });

    const data = (await response.json()) as {
      image?: string;
      error?: string;
    };

    if (!response.ok || !data.image) {
      setMessage(data.error ?? "Upload ảnh thất bại.");
      return null;
    }

    setForm((current) => ({ ...current, image: data.image! }));
    setImagePreview(`${data.image}?v=${Date.now()}`);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    return data.image;
  }

  async function saveItem() {
    setWorking(true);
    setMessage("");

    let image = form.image.trim();
    if (selectedFile) {
      const uploadedImage = await uploadSelectedImage();
      if (!uploadedImage) {
        setWorking(false);
        return;
      }
      image = uploadedImage;
    }

    const payload = {
      parentSlug: form.parentSlug,
      title: form.title.trim(),
      summary: form.summary.trim(),
      content: form.content.trim(),
      isoLabel: form.isoLabel.trim(),
      image,
    };

    const response = await fetch(
      editingId ? `/api/service-children/${editingId}` : "/api/service-children",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const data = (await response.json()) as { error?: unknown };
      setMessage(formatApiError(data.error));
      setWorking(false);
      return;
    }

    const wasEditing = Boolean(editingId);
    await refreshAll();
    resetForm();
    setMessage(wasEditing ? "Đã cập nhật bài dịch vụ con." : "Đã tạo bài dịch vụ con.");
    setWorking(false);
  }

  async function deleteItem(item: StoredServiceChild) {
    if (!window.confirm(`Xóa bài "${item.title}"?`)) return;

    setWorking(true);
    const response = await fetch(`/api/service-children/${item._id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setMessage("Xóa bài viết thất bại.");
      setWorking(false);
      return;
    }

    await refreshAll();
    if (editingId === item._id) resetForm();
    setMessage("Đã xóa bài dịch vụ con.");
    setWorking(false);
  }

  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Quản lý bài con dịch vụ (ISO)</h2>
          <p className="mt-2 text-sm text-slate-600">
            Thêm / sửa / xóa các bài dưới dịch vụ cha (ví dụ{" "}
            <strong>Đào tạo tư vấn ISO</strong>). Bài mới có nội dung riêng sẽ hiện tại{" "}
            <code className="rounded bg-slate-100 px-1">/services/.../...</code>.
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          disabled={working}
          className="rounded bg-emerald-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          + Thêm bài ISO / dịch vụ con
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-slate-700">
          Lọc theo dịch vụ cha
          <select
            value={parentFilter}
            onChange={(event) => setParentFilter(event.target.value)}
            className="ml-2 rounded border px-3 py-2"
          >
            <option value="">Tất cả</option>
            {parentOptions.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.title}
              </option>
            ))}
          </select>
        </label>
        <span className="text-sm text-slate-500">{filteredItems.length} bài</span>
      </div>

      <div ref={formRef} className="mt-6 space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="font-semibold text-slate-900">
          {editingId ? "Sửa bài dịch vụ con" : "Tạo bài dịch vụ con"}
        </h3>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Dịch vụ cha</span>
          <select
            value={form.parentSlug}
            onChange={(event) =>
              setForm((current) => ({ ...current, parentSlug: event.target.value }))
            }
            className="mt-1 w-full rounded border bg-white px-3 py-2"
          >
            {parentOptions.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Tiêu đề</span>
          <input
            value={form.title}
            onChange={(event) =>
              setForm((current) => ({ ...current, title: event.target.value }))
            }
            className="mt-1 w-full rounded border bg-white px-3 py-2"
            placeholder="Đào tạo tư vấn ISO 9001:2015"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Tóm tắt</span>
          <textarea
            value={form.summary}
            onChange={(event) =>
              setForm((current) => ({ ...current, summary: event.target.value }))
            }
            rows={3}
            className="mt-1 w-full rounded border bg-white px-3 py-2"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">
            Nhãn ISO (hiển thị hình ISO — để trống nếu dùng ảnh)
          </span>
          <input
            value={form.isoLabel}
            onChange={(event) =>
              setForm((current) => ({ ...current, isoLabel: event.target.value }))
            }
            className="mt-1 w-full rounded border bg-white px-3 py-2"
            placeholder="9001, 14001, HACCP..."
          />
        </label>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-medium text-slate-800">Ảnh đại diện</p>
          <p className="mt-1 text-xs text-slate-500">
            Chọn file ảnh từ máy (JPEG, PNG, WebP, GIF). Nếu có ảnh upload, trang sẽ hiện ảnh
            thay cho khung ISO.
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-md bg-slate-100 sm:w-56">
              {imagePreview || form.image ? (
                <img
                  src={imagePreview || form.image}
                  alt="Xem trước ảnh"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-sm text-slate-500">Chưa có ảnh</span>
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
                className="block w-full text-sm text-slate-700 file:mr-3 file:rounded file:border-0 file:bg-sky-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-sky-700"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    setWorking(true);
                    const uploaded = await uploadSelectedImage();
                    setWorking(false);
                    if (uploaded) {
                      setMessage("Đã tải ảnh lên. Nhấn Lưu để gắn vào bài viết.");
                    }
                  }}
                  disabled={working || !selectedFile}
                  className="rounded bg-sky-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                  Tải ảnh lên
                </button>
                {imagePreview || form.image || selectedFile ? (
                  <button
                    type="button"
                    onClick={clearImage}
                    disabled={working}
                    className="rounded border px-4 py-2 text-sm disabled:opacity-60"
                  >
                    Xóa ảnh
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">
            Nội dung bài (tuỳ chọn — hỗ trợ emoji ✅ ❌ 📌 như bài kiến thức)
          </span>
          <textarea
            value={form.content}
            onChange={(event) =>
              setForm((current) => ({ ...current, content: event.target.value }))
            }
            rows={10}
            className="mt-1 w-full rounded border bg-white px-3 py-2 font-mono text-sm"
            placeholder="Viết nội dung chi tiết cho bài ISO mới..."
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void saveItem()}
            disabled={working}
            className="rounded bg-sky-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {editingId ? "Cập nhật" : "Tạo mới"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              disabled={working}
              className="rounded border px-4 py-2 text-sm disabled:opacity-60"
            >
              Hủy sửa
            </button>
          ) : null}
        </div>

        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      </div>

      <ul className="mt-6 divide-y rounded-lg border">
        {filteredItems.map((item) => (
          <li
            key={item._id}
            className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                {parentTitle(item.parentSlug)}
                {item.isoLabel ? ` · ISO ${item.isoLabel}` : ""}
              </p>
              <h4 className="mt-1 font-semibold text-slate-900">{item.title}</h4>
              <p className="mt-1 text-sm text-slate-600">{item.summary}</p>
              <p className="mt-1 text-xs text-slate-400">
                /services/{item.parentSlug}/{item.slug}
                {item.content ? " · có nội dung riêng" : ""}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => startEdit(item)}
                disabled={working}
                className="rounded border px-3 py-1.5 text-sm disabled:opacity-60"
              >
                Sửa
              </button>
              <button
                type="button"
                onClick={() => void deleteItem(item)}
                disabled={working}
                className="rounded border border-red-200 px-3 py-1.5 text-sm text-red-700 disabled:opacity-60"
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
        {filteredItems.length === 0 ? (
          <li className="p-4 text-sm text-slate-500">Chưa có bài nào trong bộ lọc này.</li>
        ) : null}
      </ul>
    </section>
  );
}
