import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: (await getDictionary(lang)).about.title };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).about;

  return (
    <div className="mx-auto max-w-3xl px-4 pt-12 sm:pt-16">
      <h1 className="text-h1 font-extrabold">{t.title}</h1>

      {/* The definition of "kaki lima" is the heart of the name, so it is set apart as a pull quote. */}
      <div className="edge mt-6 rounded-card border-border border-l-[6px] border-l-accent bg-brand-soft p-6 sm:p-8">
        <p className="font-display text-quote leading-snug font-semibold text-text">{t.lead}</p>
      </div>

      <p className="mt-6">{t.body}</p>

      <h2 className="mt-12 text-h2 font-extrabold">{t.beliefsTitle}</h2>
      <ul className="edge mt-5 rounded-card border-border bg-surface px-5 [&>li+li]:edge [&>li+li]:border-x-0 [&>li+li]:border-b-0 [&>li+li]:border-border">
        {t.beliefs.map((b) => (
          <li key={b} className="grid grid-cols-[1.25rem_1fr] gap-3 py-4">
            <span aria-hidden="true" className="mt-[0.8em] h-1 w-4 rounded-full bg-accent" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-h2 font-extrabold">{t.whereTitle}</h2>
      <p className="mt-3">{t.where}</p>
    </div>
  );
}
