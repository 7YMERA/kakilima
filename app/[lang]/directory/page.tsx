import { ArrowUpRight, FlaskConical, Landmark, Users, Video } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { advocates, kindOrder, type AdvocateKind } from "@/data/advocates";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

// One wayfinding icon per section, matching the Report it page.
const kindIcons: Record<AdvocateKind, typeof Users> = {
  groups: Users,
  creators: Video,
  officials: Landmark,
  research: FlaskConical,
};

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
    <div className="mx-auto max-w-5xl px-4 pt-12 sm:pt-16">
      <h1 className="text-h1 font-extrabold">{t.title}</h1>
      <p className="mt-4 max-w-2xl text-lead text-muted">{t.lead}</p>

      {kindOrder.map((kind) => {
        const people = advocates.filter((a) => a.kind === kind);
        if (people.length === 0) return null;
        const Icon = kindIcons[kind];
        return (
          <section key={kind} className="mt-12" aria-labelledby={`kind-${kind}`}>
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"
              >
                <Icon className="size-5.5" />
              </span>
              <div>
                <h2 id={`kind-${kind}`} className="text-h2 font-extrabold">
                  {t.kinds[kind]}
                </h2>
                {kind === "officials" && <p className="text-small text-muted">{t.officialsNote}</p>}
              </div>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {people.map((a) => (
                <li key={a.id} className="edge flex flex-col rounded-card border-border bg-surface p-5">
                  <h3 className="text-lg font-bold">{a.name}</h3>
                  <p className="mt-2">{t.entries[a.id]}</p>
                  <p className="sr-only">{t.topicsLabel}:</p>
                  <ul className="mt-3 mb-4 flex flex-wrap gap-1.5">
                    {a.topics.map((topic) => (
                      <li
                        key={topic}
                        className="edge rounded-full border-border bg-surface-sunk px-2.5 py-0.5 text-label font-semibold text-muted"
                      >
                        {t.topics[topic]}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-auto flex flex-wrap gap-2">
                    {a.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={buttonVariants({ variant: "outline", size: "sm" })}
                        >
                          <span className="sr-only">{a.name}: </span>
                          {t.linkTypes[link.type]}
                          <ArrowUpRight aria-hidden="true" />
                          <span className="sr-only"> {t.newTab}</span>
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

      <p className="mt-12 text-small text-muted">{t.suggest}</p>
    </div>
  );
}
