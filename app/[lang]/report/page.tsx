import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { channelGroups } from "@/data/report-channels";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata({ params }: PageProps<"/[lang]/report">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).report;
  return { title: t.title, description: t.lead };
}

export default async function ReportPage({ params }: PageProps<"/[lang]/report">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).report;

  return (
    <div className="container section">
      <h1>{t.title}</h1>
      <p className="lead">{t.lead}</p>

      <section className="tips card" aria-labelledby="tips-title">
        <h2 id="tips-title">{t.tipsTitle}</h2>
        <ul>
          {t.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      {channelGroups.map((group) => (
        <section key={group.id} className="channel-group" aria-labelledby={`group-${group.id}`}>
          <h2 id={`group-${group.id}`}>{t.groups[group.id].title}</h2>
          <p className="muted">{t.groups[group.id].intro}</p>
          <ul className="grid plain-list">
            {group.channels.map((c) => (
              <li key={c.id}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="card channel">
                  <h3>{c.name}</h3>
                  <p className="muted small">{t.channels[c.id].runBy}</p>
                  <p>{t.channels[c.id].use}</p>
                  <span className="link-label">
                    {t.open} <span aria-hidden="true">↗</span>
                    <span className="visually-hidden"> {t.newTab}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="muted small">{t.feedback}</p>
    </div>
  );
}
