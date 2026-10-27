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
    <div className="container section prose">
      <h1>{t.title}</h1>
      <p className="lead">{t.lead}</p>
      <p>{t.body}</p>
      <h2>{t.beliefsTitle}</h2>
      <ul>
        {t.beliefs.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <h2>{t.whereTitle}</h2>
      <p>{t.where}</p>
    </div>
  );
}
