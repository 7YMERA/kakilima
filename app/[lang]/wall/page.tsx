import type { Metadata } from "next";
import { Camera } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
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
    <div className="mx-auto max-w-5xl px-4 pt-12 sm:pt-16">
      <h1 className="text-h1 font-extrabold">{t.title}</h1>
      <p className="mt-4 max-w-2xl text-lead text-muted">{t.lead}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link href={`/${lang}/wall/new`} className={buttonVariants({ variant: "primary" })}>
          <Camera aria-hidden="true" />
          {t.shareCta}
        </Link>
        <p className="text-small text-muted">{t.reviewNote}</p>
      </div>

      {reports === null || reports.length === 0 ? (
        <p className="edge mt-10 rounded-card border-border bg-surface p-5">{reports === null ? t.notReady : t.empty}</p>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((r) => (
            <li key={r.id}>
              <article
                aria-labelledby={`report-${r.id}`}
                className="edge flex h-full flex-col overflow-hidden rounded-card border-border bg-surface"
              >
                {r.photoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.photoUrl}
                    alt={r.photoAlt || r.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full bg-surface-sunk object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="edge self-start rounded-full border-border bg-surface-sunk px-2.5 py-0.5 text-label font-semibold text-muted">
                    {t.categories[r.category]}
                  </p>
                  <h2 id={`report-${r.id}`} className="mt-3 text-lg font-bold">
                    {r.title}
                  </h2>
                  <p className="mt-1 text-small text-muted">
                    <span className="sr-only">{t.location}: </span>
                    {r.area}, {r.state}
                    <br />
                    {t.reportedOn} <time dateTime={r.createdAt.toISOString()}>{date.format(r.createdAt)}</time>
                  </p>
                  <p className="mt-3 whitespace-pre-line [overflow-wrap:anywhere]">{r.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
