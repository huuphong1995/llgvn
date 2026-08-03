import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { createSlug } from "@/lib/slug";
import {
  DEFAULT_SERVICE_CHILDREN_MAP,
  type StoredServiceChild,
} from "@/lib/service-children";

const STORE_PATH = path.join(process.cwd(), "data", "service-children.json");

export type { StoredServiceChild };

export type ServiceChildInput = {
  parentSlug: string;
  title: string;
  summary: string;
  content?: string;
  image?: string;
  isoLabel?: string;
  slug?: string;
};

function flattenDefaults(): StoredServiceChild[] {
  const now = new Date().toISOString();
  const items: StoredServiceChild[] = [];

  for (const [parentSlug, children] of Object.entries(DEFAULT_SERVICE_CHILDREN_MAP)) {
    for (const child of children) {
      items.push({
        ...child,
        _id: randomUUID(),
        parentSlug,
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  return items;
}

export async function readServiceChildrenStore(): Promise<StoredServiceChild[]> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoredServiceChild[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeServiceChildrenStore(items: StoredServiceChild[]) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(items, null, 2), "utf8");
}

export async function ensureServiceChildrenStore(): Promise<StoredServiceChild[]> {
  const existing = await readServiceChildrenStore();
  if (existing.length > 0) return existing;

  const seeded = flattenDefaults();
  try {
    await writeServiceChildrenStore(seeded);
  } catch {
    // Vercel/read-only filesystem: vẫn trả seed trong bộ nhớ.
  }
  return seeded;
}

export async function listServiceChildren(parentSlug?: string) {
  const items = await ensureServiceChildrenStore();
  if (!parentSlug) return items;
  return items.filter((item) => item.parentSlug === parentSlug);
}

export async function getServiceChildById(id: string) {
  const items = await ensureServiceChildrenStore();
  return items.find((item) => item._id === id) ?? null;
}

export async function createServiceChild(input: ServiceChildInput) {
  const items = await ensureServiceChildrenStore();
  const now = new Date().toISOString();
  const slug = input.slug?.trim() || createSlug(input.title);

  if (
    items.some(
      (item) => item.parentSlug === input.parentSlug && item.slug === slug,
    )
  ) {
    throw new Error("Đã tồn tại bài viết với tiêu đề/slug tương tự trong dịch vụ này.");
  }

  const child: StoredServiceChild = {
    _id: randomUUID(),
    parentSlug: input.parentSlug,
    slug,
    title: input.title.trim(),
    summary: input.summary.trim(),
    content: input.content?.trim() || undefined,
    image: input.image?.trim() || undefined,
    isoLabel: input.isoLabel?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  items.unshift(child);
  await writeServiceChildrenStore(items);
  return child;
}

export async function updateServiceChild(
  id: string,
  input: Partial<ServiceChildInput>,
) {
  const items = await ensureServiceChildrenStore();
  const index = items.findIndex((item) => item._id === id);
  if (index === -1) return null;

  const current = items[index];
  const nextParent = input.parentSlug ?? current.parentSlug;
  const nextTitle = input.title?.trim() ?? current.title;
  const nextSlug = input.slug?.trim()
    ? input.slug.trim()
    : input.title
      ? createSlug(input.title)
      : current.slug;

  if (
    items.some(
      (item) =>
        item._id !== id &&
        item.parentSlug === nextParent &&
        item.slug === nextSlug,
    )
  ) {
    throw new Error("Đã tồn tại bài viết với tiêu đề/slug tương tự trong dịch vụ này.");
  }

  const updated: StoredServiceChild = {
    ...current,
    parentSlug: nextParent,
    title: nextTitle,
    slug: nextSlug,
    summary: input.summary?.trim() ?? current.summary,
    content:
      input.content !== undefined
        ? input.content.trim() || undefined
        : current.content,
    image:
      input.image !== undefined
        ? input.image.trim() || undefined
        : current.image,
    isoLabel:
      input.isoLabel !== undefined
        ? input.isoLabel.trim() || undefined
        : current.isoLabel,
    updatedAt: new Date().toISOString(),
  };

  items[index] = updated;
  await writeServiceChildrenStore(items);
  return updated;
}

export async function deleteServiceChild(id: string) {
  const items = await ensureServiceChildrenStore();
  const next = items.filter((item) => item._id !== id);
  if (next.length === items.length) return false;
  await writeServiceChildrenStore(next);
  return true;
}
