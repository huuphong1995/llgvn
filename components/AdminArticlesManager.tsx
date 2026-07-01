"use client";

import { useMemo, useRef, useState } from "react";
import { ArticleImageFrame } from "@/components/ArticleImageFrame";
import {
  ARTICLE_CATEGORY_HINTS,
  ARTICLE_CATEGORY_LABELS,
} from "@/lib/article-categories";
import {
  DEFAULT_SERVICE_IMAGE_DISPLAY,
  type ServiceImageDisplay,
  type ServiceImageFit,
} from "@/lib/service-image-display";
import type { Article, ArticleCategory } from "@/types/article";

type ArticleFilter = "all" | "news" | "knowledge" | "featured";

type ArticleFormState = {
  title: string;
  summary: string;
  content: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  imageDisplay: ServiceImageDisplay;
  category: ArticleCategory;
  tags: string;
  isFeatured: boolean;
};

const emptyForm: ArticleFormState = {
  title: "",
  summary: "",
  content: "",
  image: "",
  imageDisplay: DEFAULT_SERVICE_IMAGE_DISPLAY,
  category: "legal-updates",
  tags: "",
  isFeatured: false,
};

function formatApiError(error: unknown) {
  if (!error) return "Yêu cầu thất bại.";
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null && "formErrors" in error) {
    return "Vui lòng kiểm tra lại tiêu đề, tóm tắt và nội dung bài viết.";
  }
  return "Yêu cầu thất bại.";
}

interface AdminArticlesManagerProps {
  initialArticles: Article[];
}

function getFilterLabel(filter: ArticleFilter) {
  switch (filter) {
    case "news":
      return "Tin tức";
    case "knowledge":
      return "Kiến thức";
    case "featured":
      return "Nổi bật trang chủ";
    default:
      return "Tất cả";
  }
}

function matchesFilter(article: Article, filter: ArticleFilter) {
  if (filter === "news") return article.category === "legal-updates";
  if (filter === "knowledge") {
    return article.category === "guidelines" || article.category === "case-studies";
  }
  if (filter === "featured") return article.isFeatured;
  return true;
}

export function AdminArticlesManager({ initialArticles }: AdminArticlesManagerProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState(initialArticles);
  const [filter, setFilter] = useState<ArticleFilter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleFormState>(emptyForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");
  const [working, setWorking] = useState(false);

  const filteredArticles = useMemo(
    () => articles.filter((article) => matchesFilter(article, filter)),
    [articles, filter],
  );

  const featuredCount = articles.filter((article) => article.isFeatured).length;
  const newsCount = articles.filter((article) => article.category === "legal-updates").length;
  const knowledgeCount = articles.filter(
    (article) => article.category === "guidelines" || article.category === "case-studies",
  ).length;

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setSelectedFile(null);
    setImagePreview("");
  }

  function startCreate(category: ArticleCategory = "legal-updates") {
    resetForm();
    setForm({ ...emptyForm, category });
    setMessage("");
  }

  function handleFileChange(file: File | null) {
    setSelectedFile(file);
    if (!file) {
      setImagePreview(form.image);
      return;
    }
    setImagePreview(URL.createObjectURL(file));
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
      width?: number;
      height?: number;
      error?: string;
    };

    if (!response.ok || !data.image) {
      setMessage(data.error ?? "Upload ảnh thất bại.");
      return null;
    }

    setForm((current) => ({
      ...current,
      image: data.image!,
      imageWidth: data.width,
      imageHeight: data.height,
    }));
    setImagePreview(`${data.image}?v=${Date.now()}`);
    setSelectedFile(null);
    return data.image;
  }

  function updateImageDisplay(patch: Partial<ServiceImageDisplay>) {
    setForm((current) => ({
      ...current,
      imageDisplay: { ...current.imageDisplay, ...patch },
    }));
  }

  function startEdit(article: Article) {
    setEditingId(article._id);
    setForm({
      title: article.title,
      summary: article.summary,
      content: article.content,
      image: article.image ?? "",
      imageWidth: article.imageWidth,
      imageHeight: article.imageHeight,
      imageDisplay: article.imageDisplay ?? DEFAULT_SERVICE_IMAGE_DISPLAY,
      category: article.category,
      tags: article.tags.join(", "),
      isFeatured: article.isFeatured,
    });
    setSelectedFile(null);
    setImagePreview(article.image ?? "");
    setMessage("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function refreshArticles() {
    const response = await fetch("/api/articles");
    if (!response.ok) return;
    const data = (await response.json()) as Article[];
    setArticles(
      data.map((article) => ({
        ...article,
        _id: String(article._id),
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      })),
    );
  }

  async function saveArticle() {
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
      title: form.title.trim(),
      summary: form.summary.trim(),
      content: form.content.trim(),
      image,
      imageWidth: form.imageWidth,
      imageHeight: form.imageHeight,
      category: form.category,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isFeatured: form.isFeatured,
      imageDisplay: form.imageDisplay,
    };

    const response = await fetch(
      editingId ? `/api/articles/${editingId}` : "/api/articles",
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
    await refreshArticles();
    resetForm();
    setMessage(wasEditing ? "Đã cập nhật bài viết." : "Đã tạo bài viết mới.");
    setWorking(false);
  }

  async function deleteArticle(article: Article) {
    if (!window.confirm(`Xóa bài "${article.title}"?`)) return;

    setWorking(true);
    const response = await fetch(`/api/articles/${article._id}`, { method: "DELETE" });

    if (!response.ok) {
      setMessage("Xóa bài viết thất bại.");
      setWorking(false);
      return;
    }

    await refreshArticles();
    if (editingId === article._id) resetForm();
    setMessage("Đã xóa bài viết.");
    setWorking(false);
  }

  async function toggleFeatured(article: Article) {
    setWorking(true);
    const response = await fetch(`/api/articles/${article._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !article.isFeatured }),
    });

    if (!response.ok) {
      setMessage("Cập nhật trạng thái nổi bật thất bại.");
      setWorking(false);
      return;
    }

    await refreshArticles();
    setMessage(
      article.isFeatured
        ? "Đã bỏ hiển thị nổi bật trên trang chủ."
        : "Đã đưa bài lên mục Tin tức & kiến thức nổi bật trang chủ.",
    );
    setWorking(false);
  }

  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Quản lý Tin tức & Kiến thức</h2>
          <p className="mt-2 text-sm text-slate-600">
            Tin tức hiển thị tại <strong>/news</strong>. Kiến thức hiển thị tại{" "}
            <strong>/knowledge</strong>. Bài đánh dấu nổi bật sẽ xuất hiện ở mục{" "}
            <strong>Tin tức & kiến thức nổi bật</strong> trên trang chủ.
          </p>
        </div>
        <button
          type="button"
          onClick={() => startCreate(filter === "knowledge" ? "guidelines" : "legal-updates")}
          disabled={working}
          className="rounded bg-sky-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          + Thêm bài viết
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {(
          [
            ["all", `Tất cả (${articles.length})`],
            ["news", `Tin tức (${newsCount})`],
            ["knowledge", `Kiến thức (${knowledgeCount})`],
            ["featured", `Nổi bật trang chủ (${featuredCount})`],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-full px-3 py-1.5 ${
              filter === value
                ? "bg-emerald-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {filteredArticles.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-600">
            Chưa có bài nào trong nhóm {getFilterLabel(filter).toLowerCase()}.
          </p>
        ) : (
          filteredArticles.map((article) => (
            <div key={article._id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
                      {ARTICLE_CATEGORY_LABELS[article.category]}
                    </span>
                    {article.isFeatured ? (
                      <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Nổi bật trang chủ
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-2 font-semibold text-slate-900">{article.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{article.summary}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    {ARTICLE_CATEGORY_HINTS[article.category]} · Đăng{" "}
                    {new Date(article.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(article)}
                    disabled={working}
                    className="rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-700 disabled:opacity-60"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFeatured(article)}
                    disabled={working}
                    className="rounded border border-amber-300 px-3 py-1.5 text-sm text-amber-800 disabled:opacity-60"
                  >
                    {article.isFeatured ? "Bỏ nổi bật" : "Đưa lên trang chủ"}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteArticle(article)}
                    disabled={working}
                    className="rounded border border-red-200 px-3 py-1.5 text-sm text-red-700 disabled:opacity-60"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div ref={formRef} className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-lg font-semibold text-slate-900">
          {editingId ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
        </h3>

        <div className="mt-4 grid gap-3">
          <input
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="Tiêu đề"
            className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm"
          />
          <textarea
            value={form.summary}
            onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
            placeholder="Tóm tắt"
            rows={2}
            className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm"
          />
          <textarea
            value={form.content}
            onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
            placeholder="Nội dung bài viết"
            rows={8}
            className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm"
          />

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm font-medium text-slate-800">Ảnh đại diện</p>
            <div className="mt-3 flex flex-col gap-4 xl:flex-row">
              <div className="w-full shrink-0 xl:w-[320px]">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Xem trước khung thẻ
                </p>
                {imagePreview || form.image ? (
                  <ArticleImageFrame
                    src={imagePreview || form.image}
                    alt="Xem trước ảnh bài viết"
                    display={form.imageDisplay}
                    imageWidth={form.imageWidth}
                    imageHeight={form.imageHeight}
                    className="rounded-md"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-slate-100 text-sm text-slate-500">
                    Chưa có ảnh
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-4">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-slate-700 file:mr-3 file:rounded file:border-0 file:bg-sky-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-sky-700"
                />
                <button
                  type="button"
                  onClick={async () => {
                    setWorking(true);
                    const uploaded = await uploadSelectedImage();
                    setWorking(false);
                    if (uploaded) {
                      setMessage("Đã tải ảnh lên. Nhấn Lưu thay đổi để cập nhật bài viết.");
                    }
                  }}
                  disabled={working || !selectedFile}
                  className="rounded bg-sky-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                  Tải ảnh lên
                </button>
                <input
                  value={form.image}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, image: event.target.value }));
                    if (!selectedFile) {
                      setImagePreview(event.target.value);
                    }
                  }}
                  placeholder="Hoặc dán link ảnh (https://...)"
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm"
                />

                <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 space-y-4">
                  <p className="text-sm font-medium text-slate-800">Căn chỉnh ảnh trong khung</p>

                  <div>
                    <label className="mb-1 block text-sm text-slate-700">Kiểu hiển thị</label>
                    <select
                      value={form.imageDisplay.fit}
                      onChange={(event) =>
                        updateImageDisplay({ fit: event.target.value as ServiceImageFit })
                      }
                      className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="cover">Lấp đầy khung (vừa khung, có thể cắt ảnh)</option>
                      <option value="contain">Hiện toàn bộ ảnh (không cắt)</option>
                    </select>
                  </div>

                  <label className="block text-sm text-slate-700">
                    Thu nhỏ / phóng to: {form.imageDisplay.scale}%
                    <input
                      type="range"
                      min={50}
                      max={150}
                      step={1}
                      value={form.imageDisplay.scale}
                      onChange={(event) =>
                        updateImageDisplay({ scale: Number(event.target.value) })
                      }
                      className="mt-2 w-full"
                    />
                  </label>

                  <label className="block text-sm text-slate-700">
                    Vị trí ngang: {form.imageDisplay.positionX}%
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={form.imageDisplay.positionX}
                      onChange={(event) =>
                        updateImageDisplay({ positionX: Number(event.target.value) })
                      }
                      className="mt-2 w-full"
                    />
                  </label>

                  <label className="block text-sm text-slate-700">
                    Vị trí dọc: {form.imageDisplay.positionY}%
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={form.imageDisplay.positionY}
                      onChange={(event) =>
                        updateImageDisplay({ positionY: Number(event.target.value) })
                      }
                      className="mt-2 w-full"
                    />
                  </label>
                </div>

                <p className="text-xs text-slate-500">
                  Hỗ trợ JPG, PNG, WEBP, GIF. Tối đa 5MB. Muốn ảnh vừa khung, chọn{" "}
                  <strong>Lấp đầy khung</strong> rồi kéo vị trí ngang/dọc.
                </p>
              </div>
            </div>
          </div>

          <select
            value={form.category}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                category: event.target.value as ArticleCategory,
              }))
            }
            className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="legal-updates">Tin tức (/news)</option>
            <option value="guidelines">Hướng dẫn (/knowledge)</option>
            <option value="case-studies">Nghiên cứu tình huống (/knowledge)</option>
          </select>
          <input
            value={form.tags}
            onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
            placeholder="Tag, cách nhau bởi dấu phẩy"
            className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm"
          />
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(event) =>
                setForm((current) => ({ ...current, isFeatured: event.target.checked }))
              }
            />
            Hiển thị ở mục <strong>Tin tức & kiến thức nổi bật</strong> trên trang chủ
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={saveArticle}
            disabled={working}
            className="rounded bg-emerald-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {working ? "Đang xử lý..." : editingId ? "Lưu thay đổi" : "Đăng bài"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              disabled={working}
              className="rounded border border-slate-300 px-4 py-2 text-sm text-slate-700 disabled:opacity-60"
            >
              Hủy chỉnh sửa
            </button>
          ) : null}
        </div>
      </div>

      {message ? <p className="mt-4 text-sm text-slate-700">{message}</p> : null}
    </section>
  );
}
