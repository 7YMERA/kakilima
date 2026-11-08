"use server";

import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { isDatabaseConfigured } from "@/lib/db";
import { isPhotoStorageConfigured, MAX_PHOTO_BYTES, storePhoto } from "@/lib/photos";
import { categories, states, type Category } from "@/lib/report-options";
import { countRecentFrom, createReport } from "@/lib/reports";

export type Field = "category" | "state" | "area" | "title" | "description" | "photo" | "photoAlt" | "agree";

export type ErrorCode =
  | "required"
  | "tooShort"
  | "tooLong"
  | "invalid"
  | "photoTooBig"
  | "photoType"
  | "agree"
  | "rateLimited"
  | "server"
  | "notReady";

export type FormValues = Partial<Record<Exclude<Field, "photo" | "agree">, string>>;

export type SubmitState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; fieldErrors: Partial<Record<Field, ErrorCode>>; formError?: ErrorCode; values: FormValues; attempt: number };

const MAX_POSTS_PER_HOUR = 5;

const limits = {
  area: [2, 120],
  title: [5, 120],
  description: [20, 2000],
  photoAlt: [0, 200],
} as const;

function text(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function checkLength(value: string, [min, max]: readonly [number, number], required: boolean): ErrorCode | undefined {
  if (!value) return required ? "required" : undefined;
  if (value.length < min) return "tooShort";
  if (value.length > max) return "tooLong";
}

// Only a salted hash of the IP is stored, and only to stop one person flooding the wall.
async function visitorHash() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const salt = process.env.IP_HASH_SALT ?? process.env.ADMIN_PASSWORD ?? "kakilima";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function submitReport(prev: SubmitState, form: FormData): Promise<SubmitState> {
  const attempt = prev.status === "error" ? prev.attempt + 1 : 1;
  const values: FormValues = {
    category: text(form, "category"),
    state: text(form, "state"),
    area: text(form, "area"),
    title: text(form, "title"),
    description: text(form, "description"),
    photoAlt: text(form, "photoAlt"),
  };
  const fail = (fieldErrors: Partial<Record<Field, ErrorCode>>, formError?: ErrorCode): SubmitState =>
    ({ status: "error", fieldErrors, formError, values, attempt });

  // Bots fill in every field, including this one that people never see.
  if (text(form, "website")) return { status: "success" };

  if (!isDatabaseConfigured()) return fail({}, "notReady");

  const errors: Partial<Record<Field, ErrorCode>> = {};
  if (!(categories as readonly string[]).includes(values.category!)) errors.category = "invalid";
  if (!(states as readonly string[]).includes(values.state!)) errors.state = "invalid";
  for (const key of ["area", "title", "description", "photoAlt"] as const) {
    const err = checkLength(values[key]!, limits[key], key !== "photoAlt");
    if (err) errors[key] = err;
  }
  if (form.get("agree") !== "on") errors.agree = "agree";

  const photo = form.get("photo");
  const hasPhoto = photo instanceof File && photo.size > 0;
  if (hasPhoto) {
    if (photo.size > MAX_PHOTO_BYTES) errors.photo = "photoTooBig";
    else if (!photo.type.startsWith("image/")) errors.photo = "photoType";
  }

  if (Object.keys(errors).length > 0) return fail(errors);

  try {
    const ipHash = await visitorHash();
    if ((await countRecentFrom(ipHash, 60)) >= MAX_POSTS_PER_HOUR) return fail({}, "rateLimited");

    let photoUrl: string | null = null;
    if (hasPhoto && isPhotoStorageConfigured()) {
      try {
        photoUrl = await storePhoto(photo);
      } catch {
        // sharp can't read every format (some HEIC files); treat it as a bad file.
        return fail({ photo: "photoType" });
      }
    }

    await createReport({
      category: values.category as Category,
      state: values.state!,
      area: values.area!,
      title: values.title!,
      description: values.description!,
      photoUrl,
      photoAlt: photoUrl ? values.photoAlt || null : null,
      locale: text(form, "locale") || "en",
      ipHash,
    });
  } catch (err) {
    console.error("submitReport failed", err);
    return fail({}, "server");
  }

  revalidatePath("/[lang]/admin", "page");
  return { status: "success" };
}
