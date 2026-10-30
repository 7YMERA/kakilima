import { ArrowUpRight, Check, Construction, TrainFront } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { channelGroups, type ChannelGroupId } from "@/data/report-channels";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

// One wayfinding icon per group, so the two lists are easy to tell apart at a glance.
const groupIcons: Record<ChannelGroupId, typeof Construction> = {
  roads: Construction,
  transit: TrainFront,
};

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
    <div className="mx-auto max-w-5xl px-4 pt-12 sm:pt-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div>
          <h1 className="text-h1 font-extrabold">{t.title}</h1>
          <p className="mt-4 max-w-2xl text-lead text-muted">{t.lead}</p>
        </div>

        <section
          aria-labelledby="tips-title"
          className="edge rounded-card border-border border-l-[6px] border-l-accent bg-surface p-5 shadow-card"
        >
          <h2 id="tips-title" className="text-lg font-bold">
            {t.tipsTitle}
          </h2>
          <ul className="mt-3 space-y-2.5">
            {t.tips.map((tip) => (
              <li key={tip} className="grid grid-cols-[1.5rem_1fr] gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1 grid size-5 place-items-center rounded-full bg-brand text-brand-ink"
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {channelGroups.map((group) => {
        const Icon = groupIcons[group.id];
        return (
          <section key={group.id} className="mt-12" aria-labelledby={`group-${group.id}`}>
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"
              >
                <Icon className="size-5.5" />
              </span>
              <div>
                <h2 id={`group-${group.id}`} className="text-h2 font-extrabold">
                  {t.groups[group.id].title}
                </h2>
                <p className="text-muted">{t.groups[group.id].intro}</p>
              </div>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.channels.map((c, i) => (
                <li
                  key={c.id}
                  className="edge group relative flex flex-col rounded-card border-border bg-surface p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-card active:translate-y-0 motion-reduce:hover:translate-y-0"
                >
                  <h3 className="text-lg font-bold">
                    {/* Only the name is the link, so screen readers hear a short name; its ::after covers the card. */}
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="stretched-link text-text no-underline after:absolute after:inset-0 after:rounded-card"
                    >
                      {c.name}
                      <span className="sr-only"> {t.newTab}</span>
                    </a>
                  </h3>
                  <p className="mt-0.5 text-small font-semibold text-muted">{t.channels[c.id].runBy}</p>
                  <p className="mt-3 mb-4">{t.channels[c.id].use}</p>
                  <span
                    aria-hidden="true"
                    className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start font-bold text-brand underline decoration-2 underline-offset-4 group-hover:decoration-accent"
                  >
                    {t.open}
                    <ArrowUpRight className="size-[1.1em] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className="mt-12 text-small text-muted">{t.feedback}</p>
    </div>
  );
}
