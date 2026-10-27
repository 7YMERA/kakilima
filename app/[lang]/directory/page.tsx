import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { advocates, kindOrder } from "@/data/advocates";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata({ params }: PageProps<"/[lang]/directory">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).directory;
  return { title: t.title, description: t.lead };
}

export default async function DirectoryPage({ params }: PageProps<"/[lang]/directory">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).directory;

  return (
    <div className="container section">
      <h1>{t.title}</h1>
      <p className="lead">{t.lead}</p>

      {kindOrder.map((kind) => {
        const people = advocates.filter((a) => a.kind === kind);
        if (people.length === 0) return null;
        return (
          <section key={kind} className="channel-group" aria-labelledby={`kind-${kind}`}>
            <h2 id={`kind-${kind}`}>{t.kinds[kind]}</h2>
            {kind === "officials" && <p className="muted small">{t.officialsNote}</p>}
            <ul className="grid plain-list">
              {people.map((a) => (
                <li key={a.id} className="card advocate">
                  <h3>{a.name}</h3>
                  <p>{t.entries[a.id]}</p>
                  <p className="visually-hidden">{t.topicsLabel}:</p>
                  <ul className="tags plain-list">
                    {a.topics.map((topic) => (
                      <li key={topic} className="tag">
                        {t.topics[topic]}
                      </li>
                    ))}
                  </ul>
                  <ul className="advocate-links plain-list">
                    {a.links.map((link) => (
                      <li key={link.url}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="pill">
                          <span className="visually-hidden">{a.name}: </span>
                          {t.linkTypes[link.type]}
                          <span aria-hidden="true">&nbsp;↗</span>
                          <span className="visually-hidden"> {t.newTab}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className="muted small">{t.suggest}</p>
    </div>
  );
}
