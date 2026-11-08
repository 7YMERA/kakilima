import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import sharp from "sharp";

export const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

export function isPhotoStorageConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN) || process.env.NODE_ENV !== "production";
}

// Re-encodes the photo, which also strips EXIF data such as the GPS position of the
// person who took it, then stores it. Returns the public URL.
export async function storePhoto(file: File): Promise<string> {
  const input = Buffer.from(await file.arrayBuffer());
  const output = await sharp(input)
    .rotate() // apply the camera's orientation before the metadata is dropped
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

  const name = `reports/${randomUUID()}.jpg`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(name, output, { access: "public", contentType: "image/jpeg" });
    return blob.url;
  }

  // Local development without Blob: keep photos in public/uploads (git-ignored).
  const dir = path.join(process.cwd(), "public", "uploads", "reports");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(process.cwd(), "public", "uploads", name), output);
  return `/uploads/${name}`;
}
