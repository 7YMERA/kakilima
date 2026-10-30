import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "kk_admin";

function token(password: string) {
  return createHmac("sha256", password).update("kakilima-admin-v1").digest("hex");
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export const adminPassword = () => process.env.ADMIN_PASSWORD || null;

export async function isAdmin() {
  const password = adminPassword();
  if (!password) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  return Boolean(value && safeEqual(value, token(password)));
}

export async function logIn(attempt: string) {
  const password = adminPassword();
  if (!password || !safeEqual(token(attempt), token(password))) return false;
  (await cookies()).set(COOKIE, token(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function logOut() {
  (await cookies()).delete(COOKIE);
}
