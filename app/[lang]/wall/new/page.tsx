import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReportForm from "@/components/ReportForm";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata({ params }: PageProps<"/[lang]/wall/new">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).wall.form;
  return { title: t.title, description: t.lead };
}

export default async function NewReportPage({ params }: PageProps<"/[lang]/wall/new">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const wall = (await getDictionary(lang)).wall;
  const t = wall.form;

  return (
    <div className="container section prose">
      <h1>{t.title}</h1>
      <p className="lead">{t.lead}</p>
      <p>{t.privacy}</p>

      <section className="tips card" aria-labelledby="guidelines-title">
        <h2 id="guidelines-title">{t.guidelinesTitle}</h2>
        <ul>
          {t.guidelines.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </section>

      <p className="muted">
        {t.officialReminder} <Link href={`/${lang}/report`}>{t.officialLink}</Link>
      </p>

      <ReportForm lang={lang} t={t} categoryLabels={wall.categories} />
    </div>
  );
}
