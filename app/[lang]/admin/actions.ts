"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin, logIn, logOut } from "@/lib/admin-auth";
import { setReportStatus, type ReportStatus } from "@/lib/reports";

export async function login(form: FormData) {
  const ok = await logIn(String(form.get("password") ?? ""));
  const lang = String(form.get("lang") ?? "en");
  redirect(`/${lang}/admin${ok ? "" : "?error=1"}`);
}

export async function logout(form: FormData) {
  await logOut();
  redirect(`/${String(form.get("lang") ?? "en")}/admin`);
}

export async function moderate(form: FormData) {
  if (!(await isAdmin())) throw new Error("Not signed in");
  const id = Number(form.get("id"));
  const status = String(form.get("status")) as ReportStatus;
  if (!Number.isInteger(id) || !["approved", "rejected", "pending"].includes(status)) throw new Error("Bad request");
  await setReportStatus(id, status);
  revalidatePath("/[lang]/admin", "page");
  revalidatePath("/[lang]/wall", "page");
}
