import "server-only";
import { getSql } from "./db";
import type { Category } from "./report-options";

export type ReportStatus = "pending" | "approved" | "rejected";

export type Report = {
  id: number;
  createdAt: Date;
  status: ReportStatus;
  category: Category;
  state: string;
  area: string;
  title: string;
  description: string;
  photoUrl: string | null;
  photoAlt: string | null;
};

export type NewReport = Omit<Report, "id" | "createdAt" | "status"> & { locale: string; ipHash: string };

type Row = {
  id: number;
  created_at: Date;
  status: ReportStatus;
  category: Category;
  state: string;
  area: string;
  title: string;
  description: string;
  photo_url: string | null;
  photo_alt: string | null;
};

const toReport = (r: Row): Report => ({
  id: r.id,
  createdAt: r.created_at,
  status: r.status,
  category: r.category,
  state: r.state,
  area: r.area,
  title: r.title,
  description: r.description,
  photoUrl: r.photo_url,
  photoAlt: r.photo_alt,
});

export async function createReport(r: NewReport) {
  const sql = await getSql();
  await sql`
    INSERT INTO reports (category, state, area, title, description, photo_url, photo_alt, locale, ip_hash)
    VALUES (${r.category}, ${r.state}, ${r.area}, ${r.title}, ${r.description}, ${r.photoUrl}, ${r.photoAlt}, ${r.locale}, ${r.ipHash})
  `;
}

export async function countRecentFrom(ipHash: string, withinMinutes: number) {
  const sql = await getSql();
  const [row] = await sql<{ n: number }[]>`
    SELECT count(*)::int AS n FROM reports
    WHERE ip_hash = ${ipHash} AND created_at > now() - make_interval(mins => ${withinMinutes})
  `;
  return row.n;
}

export async function listReports(status: ReportStatus, limit = 60) {
  const sql = await getSql();
  const rows = await sql<Row[]>`
    SELECT id, created_at, status, category, state, area, title, description, photo_url, photo_alt
    FROM reports WHERE status = ${status} ORDER BY created_at DESC LIMIT ${limit}
  `;
  return rows.map(toReport);
}

export async function setReportStatus(id: number, status: ReportStatus) {
  const sql = await getSql();
  await sql`UPDATE reports SET status = ${status} WHERE id = ${id}`;
}
