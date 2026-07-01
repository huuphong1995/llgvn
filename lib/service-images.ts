import ServiceImage from "@/models/ServiceImage";
import { connectDb } from "@/lib/db";
import {
  featuredServiceSections,
  getAllFeaturedServices,
  getServiceSlug,
  type FeaturedServiceSection,
} from "@/lib/featured-services";
import {
  normalizeServiceImageDisplay,
  type ServiceImageDisplay,
} from "@/lib/service-image-display";
import {
  readServiceImageStore,
  removeServiceImageOverride,
  setServiceImageDisplay,
  setServiceImageOverride,
  type ServiceImageEntry,
} from "@/lib/service-image-store";
import {
  SERVICE_UPLOAD_DIR,
  SERVICE_UPLOAD_PUBLIC_PREFIX,
  isUploadedServiceImage,
} from "@/lib/service-image-storage";
import { readdir } from "fs/promises";

export type AdminServiceImageItem = {
  slug: string;
  title: string;
  sectionHeading: string;
  image: string;
  defaultImage: string;
  imageDisplay: ServiceImageDisplay;
};

async function getMongoServiceImageOverrides(): Promise<Record<string, string>> {
  try {
    await connectDb();
    const docs = await ServiceImage.find().lean();
    return Object.fromEntries(docs.map((doc) => [doc.serviceSlug, doc.image]));
  } catch {
    return {};
  }
}

async function getUploadDirectoryOverrides(): Promise<Record<string, string>> {
  try {
    const files = await readdir(SERVICE_UPLOAD_DIR);
    const overrides: Record<string, string> = {};

    for (const file of files) {
      const match = file.match(/^(.+)\.(jpg|jpeg|png|webp|gif)$/i);
      if (!match) continue;
      overrides[match[1]] = `${SERVICE_UPLOAD_PUBLIC_PREFIX}/${file}`;
    }

    return overrides;
  } catch {
    return {};
  }
}

export async function getServiceImageStore(): Promise<Record<string, ServiceImageEntry>> {
  const [fileStore, directoryStore] = await Promise.all([
    readServiceImageStore(),
    getUploadDirectoryOverrides(),
  ]);

  const merged: Record<string, ServiceImageEntry> = { ...fileStore };

  for (const [slug, image] of Object.entries(directoryStore)) {
    merged[slug] = {
      ...merged[slug],
      image,
    };
  }

  try {
    const mongoStore = await getMongoServiceImageOverrides();
    for (const [slug, image] of Object.entries(mongoStore)) {
      merged[slug] = {
        ...merged[slug],
        image,
      };
    }
  } catch {
    // MongoDB không bắt buộc.
  }

  return merged;
}

export async function getServiceImageOverrides(): Promise<Record<string, string>> {
  const store = await getServiceImageStore();
  return Object.fromEntries(
    Object.entries(store)
      .filter(([, entry]) => Boolean(entry.image))
      .map(([slug, entry]) => [slug, entry.image!]),
  );
}

export function applyServiceImageOverrides(
  sections: FeaturedServiceSection[],
  store: Record<string, ServiceImageEntry>,
): FeaturedServiceSection[] {
  return sections.map((section) => ({
    ...section,
    tiles: section.tiles.map((tile) => {
      const slug = getServiceSlug(tile);
      const entry = store[slug];
      if (!entry) {
        return tile;
      }

      const nextTile = { ...tile };

      if (entry.image && isUploadedServiceImage(entry.image)) {
        nextTile.image = entry.image;
        nextTile.isoLabel = undefined;
      } else if (entry.image && entry.image !== tile.image) {
        nextTile.image = entry.image;
      }

      if (entry.display) {
        nextTile.imageDisplay = normalizeServiceImageDisplay(entry.display);
      }

      return nextTile;
    }),
  }));
}

export async function getResolvedFeaturedServiceSections(): Promise<FeaturedServiceSection[]> {
  const store = await getServiceImageStore();
  return applyServiceImageOverrides(featuredServiceSections, store);
}

export function getAdminServiceImageItems(
  store: Record<string, ServiceImageEntry> = {},
): AdminServiceImageItem[] {
  return getAllFeaturedServices(featuredServiceSections).map((service) => {
    const slug = getServiceSlug(service);
    const defaultImage =
      featuredServiceSections
        .flatMap((section) => section.tiles)
        .find((tile) => getServiceSlug(tile) === slug)?.image ?? service.image;
    const entry = store[slug];

    return {
      slug,
      title: service.title,
      sectionHeading: service.sectionHeading,
      image: entry?.image ?? defaultImage,
      defaultImage,
      imageDisplay: normalizeServiceImageDisplay(entry?.display),
    };
  });
}

export async function getAdminServiceImageItemsResolved(): Promise<AdminServiceImageItem[]> {
  const store = await getServiceImageStore();
  return getAdminServiceImageItems(store);
}

export async function upsertServiceImage(serviceSlug: string, image: string) {
  await setServiceImageOverride(serviceSlug, image);

  try {
    await connectDb();
    await ServiceImage.findOneAndUpdate(
      { serviceSlug },
      { serviceSlug, image },
      { upsert: true, new: true },
    );
  } catch {
    // MongoDB không bắt buộc; ảnh vẫn lưu qua file JSON.
  }
}

export async function updateServiceImageDisplay(
  serviceSlug: string,
  display: Partial<ServiceImageDisplay>,
) {
  await setServiceImageDisplay(serviceSlug, normalizeServiceImageDisplay(display));
}

export async function deleteServiceImage(serviceSlug: string) {
  await removeServiceImageOverride(serviceSlug);

  try {
    await connectDb();
    await ServiceImage.deleteOne({ serviceSlug });
  } catch {
    // MongoDB không bắt buộc.
  }
}
