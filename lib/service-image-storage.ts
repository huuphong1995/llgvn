import { mkdir, readdir, unlink, writeFile } from "fs/promises";
import path from "path";

export const SERVICE_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "services");
export const SERVICE_UPLOAD_PUBLIC_PREFIX = "/uploads/services";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const MIME_TO_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const EXTENSION_TO_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

export function isUploadedServiceImage(image: string) {
  return image.startsWith(SERVICE_UPLOAD_PUBLIC_PREFIX);
}

function getExtensionFromFile(file: File) {
  if (MIME_TO_EXTENSION[file.type]) {
    return MIME_TO_EXTENSION[file.type];
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (extension in EXTENSION_TO_MIME) {
    return extension === "jpeg" ? "jpg" : extension;
  }

  return null;
}

export async function deleteUploadedServiceImages(serviceSlug: string) {
  try {
    const files = await readdir(SERVICE_UPLOAD_DIR);
    await Promise.all(
      files
        .filter((file) => file.startsWith(`${serviceSlug}.`))
        .map((file) => unlink(path.join(SERVICE_UPLOAD_DIR, file))),
    );
  } catch {
    // Thư mục upload có thể chưa tồn tại.
  }
}

export async function saveUploadedServiceImage(serviceSlug: string, file: File) {
  const extension = getExtensionFromFile(file);
  if (!extension) {
    throw new Error("Chỉ chấp nhận file JPG, PNG, WEBP hoặc GIF.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Ảnh không được lớn hơn 5MB.");
  }

  await mkdir(SERVICE_UPLOAD_DIR, { recursive: true });
  await deleteUploadedServiceImages(serviceSlug);

  const filename = `${serviceSlug}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(SERVICE_UPLOAD_DIR, filename), buffer);

  return `${SERVICE_UPLOAD_PUBLIC_PREFIX}/${filename}`;
}
