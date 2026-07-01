import { randomUUID } from "crypto";
import { mkdir, readdir, unlink, writeFile } from "fs/promises";
import path from "path";

export const ARTICLE_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "articles");
export const ARTICLE_UPLOAD_PUBLIC_PREFIX = "/uploads/articles";

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

export function isUploadedArticleImage(image: string) {
  return image.startsWith(ARTICLE_UPLOAD_PUBLIC_PREFIX);
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

export async function deleteUploadedArticleImages(articleKey: string) {
  try {
    const files = await readdir(ARTICLE_UPLOAD_DIR);
    await Promise.all(
      files
        .filter((file) => file.startsWith(`${articleKey}.`))
        .map((file) => unlink(path.join(ARTICLE_UPLOAD_DIR, file))),
    );
  } catch {
    // Thư mục upload có thể chưa tồn tại.
  }
}

export async function saveUploadedArticleImage(file: File, articleKey?: string) {
  const extension = getExtensionFromFile(file);
  if (!extension) {
    throw new Error("Chỉ chấp nhận file JPG, PNG, WEBP hoặc GIF.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Ảnh không được lớn hơn 5MB.");
  }

  const key = articleKey ?? randomUUID();
  await mkdir(ARTICLE_UPLOAD_DIR, { recursive: true });
  await deleteUploadedArticleImages(key);

  const filename = `${key}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const dimensions = getImageDimensions(buffer);
  await writeFile(path.join(ARTICLE_UPLOAD_DIR, filename), buffer);

  return {
    image: `${ARTICLE_UPLOAD_PUBLIC_PREFIX}/${filename}`,
    width: dimensions?.width,
    height: dimensions?.height,
  };
}

function getImageDimensions(buffer: Buffer) {
  if (buffer.length >= 24 && buffer[0] === 0x89 && buffer[1] === 0x50) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      const segmentLength = buffer.readUInt16BE(offset + 2);
      if (segmentLength < 2) break;
      if (marker >= 0xc0 && marker <= 0xc3) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      offset += segmentLength + 2;
    }
  }

  return null;
}
