import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { ServiceImageDisplay } from "@/lib/service-image-display";

const STORE_PATH = path.join(process.cwd(), "data", "service-images.json");

export type ServiceImageEntry = {
  image?: string;
  display?: Partial<ServiceImageDisplay>;
};

function normalizeEntry(value: unknown): ServiceImageEntry | null {
  if (typeof value === "string" && value.trim()) {
    return { image: value.trim() };
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const entry: ServiceImageEntry = {};

  if (typeof record.image === "string" && record.image.trim()) {
    entry.image = record.image.trim();
  }

  if (record.display && typeof record.display === "object") {
    entry.display = record.display as Partial<ServiceImageDisplay>;
  }

  if (!entry.image && !entry.display) {
    return null;
  }

  return entry;
}

export async function readServiceImageStore(): Promise<Record<string, ServiceImageEntry>> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const store: Record<string, ServiceImageEntry> = {};

    for (const [slug, value] of Object.entries(parsed)) {
      const entry = normalizeEntry(value);
      if (entry) {
        store[slug] = entry;
      }
    }

    return store;
  } catch {
    return {};
  }
}

export async function writeServiceImageStore(data: Record<string, ServiceImageEntry>) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
}

export async function setServiceImageOverride(serviceSlug: string, image: string) {
  const store = await readServiceImageStore();
  store[serviceSlug] = {
    ...store[serviceSlug],
    image,
  };
  await writeServiceImageStore(store);
}

export async function setServiceImageDisplay(
  serviceSlug: string,
  display: Partial<ServiceImageDisplay>,
) {
  const store = await readServiceImageStore();
  store[serviceSlug] = {
    ...store[serviceSlug],
    display,
  };
  await writeServiceImageStore(store);
}

export async function removeServiceImageOverride(serviceSlug: string) {
  const store = await readServiceImageStore();
  delete store[serviceSlug];
  await writeServiceImageStore(store);
}
