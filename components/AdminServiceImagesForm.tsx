"use client";

import { useEffect, useState } from "react";
import { ServiceImageFrame } from "@/components/ServiceImageFrame";
import {
  DEFAULT_SERVICE_IMAGE_DISPLAY,
  type ServiceImageDisplay,
  type ServiceImageFit,
} from "@/lib/service-image-display";

type ServiceImageItem = {
  slug: string;
  title: string;
  sectionHeading: string;
  image: string;
  defaultImage: string;
  imageDisplay: ServiceImageDisplay;
};

export function AdminServiceImagesForm() {
  const [services, setServices] = useState<ServiceImageItem[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [displays, setDisplays] = useState<Record<string, ServiceImageDisplay>>({});
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [workingSlug, setWorkingSlug] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      const response = await fetch("/api/services/images");
      if (!response.ok) {
        setMessage("Không tải được danh sách dịch vụ.");
        setLoading(false);
        return;
      }

      const data = (await response.json()) as ServiceImageItem[];
      setServices(data);
      setPreviews(Object.fromEntries(data.map((item) => [item.slug, item.image])));
      setDisplays(Object.fromEntries(data.map((item) => [item.slug, item.imageDisplay])));
      setLoading(false);
    }

    loadServices();
  }, []);

  function handleFileChange(slug: string, file: File | null) {
    setSelectedFiles((current) => ({ ...current, [slug]: file }));

    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviews((current) => ({ ...current, [slug]: objectUrl }));
  }

  function updateDisplay(slug: string, patch: Partial<ServiceImageDisplay>) {
    setDisplays((current) => ({
      ...current,
      [slug]: { ...(current[slug] ?? DEFAULT_SERVICE_IMAGE_DISPLAY), ...patch },
    }));
  }

  async function uploadService(slug: string) {
    const file = selectedFiles[slug];
    if (!file) {
      setMessage("Vui lòng chọn file ảnh trước khi tải lên.");
      return;
    }

    setWorkingSlug(slug);
    setMessage("");

    const formData = new FormData();
    formData.append("serviceSlug", slug);
    formData.append("file", file);

    const response = await fetch("/api/services/images/upload", {
      method: "POST",
      body: formData,
    });

    const data = (await response.json()) as { service?: ServiceImageItem; error?: string };

    if (!response.ok || !data.service) {
      setMessage(data.error ?? "Upload ảnh thất bại.");
      setWorkingSlug(null);
      return;
    }

    setServices((current) =>
      current.map((item) => (item.slug === slug ? data.service! : item)),
    );
    setPreviews((current) => ({
      ...current,
      [slug]: `${data.service!.image}?v=${Date.now()}`,
    }));
    setDisplays((current) => ({
      ...current,
      [slug]: data.service!.imageDisplay,
    }));
    setSelectedFiles((current) => ({ ...current, [slug]: null }));
    setMessage(`Đã cập nhật ảnh cho "${data.service.title}".`);
    setWorkingSlug(null);
  }

  async function saveDisplay(slug: string) {
    const display = displays[slug] ?? DEFAULT_SERVICE_IMAGE_DISPLAY;

    setWorkingSlug(slug);
    setMessage("");

    const response = await fetch("/api/services/images/upload", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceSlug: slug, ...display }),
    });

    const data = (await response.json()) as { service?: ServiceImageItem; error?: string };

    if (!response.ok || !data.service) {
      setMessage(data.error ?? "Lưu căn chỉnh ảnh thất bại.");
      setWorkingSlug(null);
      return;
    }

    setServices((current) =>
      current.map((item) => (item.slug === slug ? data.service! : item)),
    );
    setDisplays((current) => ({
      ...current,
      [slug]: data.service!.imageDisplay,
    }));
    setMessage(`Đã lưu căn chỉnh ảnh cho "${data.service.title}". Tải lại trang chủ để xem.`);
    setWorkingSlug(null);
  }

  async function resetService(slug: string, defaultImage: string) {
    setWorkingSlug(slug);
    setMessage("");

    const response = await fetch(`/api/services/images/upload?serviceSlug=${encodeURIComponent(slug)}`, {
      method: "DELETE",
    });

    const data = (await response.json()) as { service?: ServiceImageItem; error?: string };

    if (!response.ok || !data.service) {
      setMessage(data.error ?? "Khôi phục ảnh mặc định thất bại.");
      setWorkingSlug(null);
      return;
    }

    setServices((current) =>
      current.map((item) => (item.slug === slug ? data.service! : item)),
    );
    setPreviews((current) => ({ ...current, [slug]: defaultImage }));
    setDisplays((current) => ({
      ...current,
      [slug]: DEFAULT_SERVICE_IMAGE_DISPLAY,
    }));
    setSelectedFiles((current) => ({ ...current, [slug]: null }));
    setMessage(`Đã khôi phục ảnh mặc định cho "${data.service.title}".`);
    setWorkingSlug(null);
  }

  if (loading) {
    return (
      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-600">Đang tải danh sách dịch vụ...</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Quản lý ảnh dịch vụ trang chủ</h2>
      <p className="mt-2 text-sm text-slate-600">
        Tải ảnh lên rồi dùng các thanh trượt bên dưới để căn vị trí, thu/phóng và chọn hiển thị toàn
        bộ ảnh nếu bị che mất nội dung.
      </p>

      <div className="mt-5 space-y-4">
        {services.map((service) => {
          const display = displays[service.slug] ?? DEFAULT_SERVICE_IMAGE_DISPLAY;

          return (
            <div key={service.slug} className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-col gap-4 xl:flex-row">
                <div className="w-full shrink-0 xl:w-[270px]">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Xem trước khung thẻ
                  </p>
                  <ServiceImageFrame
                    src={previews[service.slug] || service.defaultImage}
                    alt={service.title}
                    display={display}
                    className="rounded-md"
                  />
                </div>

                <div className="min-w-0 flex-1 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      {service.sectionHeading}
                    </p>
                    <h3 className="font-semibold text-slate-900">{service.title}</h3>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Chọn file ảnh
                    </label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(event) =>
                        handleFileChange(service.slug, event.target.files?.[0] ?? null)
                      }
                      className="block w-full text-sm text-slate-700 file:mr-3 file:rounded file:border-0 file:bg-sky-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-sky-700"
                    />
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 space-y-4">
                    <p className="text-sm font-medium text-slate-800">Căn chỉnh ảnh trong khung</p>

                    <div>
                      <label className="mb-1 block text-sm text-slate-700">Kiểu hiển thị</label>
                      <select
                        value={display.fit}
                        onChange={(event) =>
                          updateDisplay(service.slug, {
                            fit: event.target.value as ServiceImageFit,
                          })
                        }
                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
                      >
                        <option value="cover">Lấp đầy khung (có thể cắt ảnh)</option>
                        <option value="contain">Hiện toàn bộ ảnh (không cắt)</option>
                      </select>
                    </div>

                    <label className="block text-sm text-slate-700">
                      Thu nhỏ / phóng to: {display.scale}%
                      <input
                        type="range"
                        min={50}
                        max={150}
                        step={1}
                        value={display.scale}
                        onChange={(event) =>
                          updateDisplay(service.slug, { scale: Number(event.target.value) })
                        }
                        className="mt-2 w-full"
                      />
                    </label>

                    <label className="block text-sm text-slate-700">
                      Vị trí ngang: {display.positionX}%
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={display.positionX}
                        onChange={(event) =>
                          updateDisplay(service.slug, { positionX: Number(event.target.value) })
                        }
                        className="mt-2 w-full"
                      />
                    </label>

                    <label className="block text-sm text-slate-700">
                      Vị trí dọc: {display.positionY}%
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={display.positionY}
                        onChange={(event) =>
                          updateDisplay(service.slug, { positionY: Number(event.target.value) })
                        }
                        className="mt-2 w-full"
                      />
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => uploadService(service.slug)}
                      disabled={workingSlug === service.slug}
                      className="rounded bg-sky-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                    >
                      {workingSlug === service.slug ? "Đang xử lý..." : "Tải ảnh lên"}
                    </button>
                    <button
                      type="button"
                      onClick={() => saveDisplay(service.slug)}
                      disabled={workingSlug === service.slug}
                      className="rounded bg-emerald-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                    >
                      Lưu căn chỉnh
                    </button>
                    <button
                      type="button"
                      onClick={() => resetService(service.slug, service.defaultImage)}
                      disabled={workingSlug === service.slug}
                      className="rounded border border-slate-300 px-4 py-2 text-sm text-slate-700 disabled:opacity-60"
                    >
                      Khôi phục mặc định
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {message ? <p className="mt-4 text-sm text-slate-700">{message}</p> : null}
    </section>
  );
}
