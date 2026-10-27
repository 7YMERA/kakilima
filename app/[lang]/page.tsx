import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).home;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 id="hero-title">{t.title}</h1>
          <p className="lead">{t.lead}</p>
          <div className="actions">
            <Link href={`/${lang}/report`} className="button primary">
              {t.ctaReport}
            </Link>
            <Link href={`/${lang}/about`} className="button">
              {t.ctaAbout}
            </Link>
          </div>
        </div>
      </section>

      <section className="container section" aria-labelledby="building-title">
        <h2 id="building-title">{t.buildingTitle}</h2>
        <ul className="grid plain-list">
          {t.pillars.map((p) => (
            <li key={p.title} className="card">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
