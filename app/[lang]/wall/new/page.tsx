import type { Metadata } from "next";
import { Check } from "lucide-react";
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
    <div className="mx-auto max-w-3xl px-4 pt-12 sm:pt-16">
      <h1 className="text-h1 font-extrabold">{t.title}</h1>
      <p className="mt-4 text-lead text-muted">{t.lead}</p>
      <p className="mt-3">{t.privacy}</p>

      <section
        aria-labelledby="guidelines-title"
        className="edge mt-8 rounded-card border-border border-l-[6px] border-l-accent bg-surface p-5 shadow-card"
      >
        <h2 id="guidelines-title" className="text-lg font-bold">
          {t.guidelinesTitle}
        </h2>
        <ul className="mt-3 space-y-2.5">
          {t.guidelines.map((g) => (
            <li key={g} className="grid grid-cols-[1.5rem_1fr] gap-2">
              <span aria-hidden="true" className="mt-1 grid size-5 place-items-center rounded-full bg-brand text-brand-ink">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 text-muted">
        {t.officialReminder}{" "}
        <Link href={`/${lang}/report`} className="font-bold text-brand underline decoration-2 underline-offset-4">
          {t.officialLink}
        </Link>
      </p>

      <ReportForm lang={lang} t={t} categoryLabels={wall.categories} />
    </div>
  );
}
