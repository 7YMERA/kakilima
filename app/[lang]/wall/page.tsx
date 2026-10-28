import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, htmlLang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { isDatabaseConfigured } from "@/lib/db";
import { listReports, type Report } from "@/lib/reports";

// Approved posts change as volunteers review them, so render on each request.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[lang]/wall">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).wall;
  return { title: t.title, description: t.lead };
}

export default async function WallPage({ params }: PageProps<"/[lang]/wall">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).wall;

  let reports: Report[] | null = null;
  if (isDatabaseConfigured()) {
    try {
      reports = await listReports("approved");
    } catch (err) {
      console.error("listReports failed", err);
    }
  }

  const date = new Intl.DateTimeFormat(htmlLang[lang], { dateStyle: "medium", timeZone: "Asia/Kuala_Lumpur" });

  return (
    <div className="container section">
      <h1>{t.title}</h1>
      <p className="lead">{t.lead}</p>
      <div className="actions">
        <Link href={`/${lang}/wall/new`} className="button primary">
          {t.shareCta}
        </Link>
      </div>
      <p className="muted small">{t.reviewNote}</p>

      {reports === null ? (
        <p className="card notice">{t.notReady}</p>
      ) : reports.length === 0 ? (
        <p className="card notice">{t.empty}</p>
      ) : (
        <ul className="grid plain-list wall-grid">
          {reports.map((r) => (
            <li key={r.id}>
              <article className="card report" aria-labelledby={`report-${r.id}`}>
                {r.photoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.photoUrl} alt={r.photoAlt || r.title} loading="lazy" className="report-photo" />
                )}
                <p className="tag">{t.categories[r.category]}</p>
                <h2 id={`report-${r.id}`}>{r.title}</h2>
                <p className="report-meta muted small">
                  <span className="visually-hidden">{t.location}: </span>
                  {r.area}, {r.state}
                  <br />
                  {t.reportedOn} <time dateTime={r.createdAt.toISOString()}>{date.format(r.createdAt)}</time>
                </p>
                <p className="report-body">{r.description}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
