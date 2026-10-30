import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlurFade } from "@/components/ui/blur-fade";
import { buttonVariants } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).home;
  // One entry per pillar; null means that part is not built yet.
  const pillarLinks: (string | null)[] = [`/${lang}/report`, `/${lang}/directory`, null, null];

  return (
    <>
      <section className="relative overflow-hidden" aria-labelledby="hero-title">
        <div className="mx-auto max-w-5xl px-4 pt-14 pb-16 sm:pt-20 sm:pb-20">
          <BlurFade>
            <p className="mb-4 inline-flex items-center gap-2.5 text-label font-bold tracking-[0.08em] text-brand uppercase">
              <span aria-hidden="true" className="h-1 w-8 rounded-full bg-accent" />
              {t.eyebrow}
            </p>
          </BlurFade>
          <BlurFade delay={0.06}>
            <h1 id="hero-title" className="max-w-[40rem] text-display font-extrabold tracking-tight">
              {t.title}
            </h1>
          </BlurFade>
          <BlurFade delay={0.12}>
            <p className="mt-5 max-w-2xl text-lead text-muted">{t.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${lang}/report`} className={buttonVariants({ variant: "primary" })}>
                {t.ctaReport}
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href={`/${lang}/about`} className={buttonVariants({ variant: "outline" })}>
                {t.ctaAbout}
              </Link>
            </div>
          </BlurFade>
        </div>
        {/* A strip of tactile paving along the foot of the hero, like the kerb edge of a kaki lima. */}
        <div aria-hidden="true" className="edge h-5 border-x-0 border-border bg-accent text-accent-ink/25">
          <DotPattern size={14} radius={2.6} className="size-full" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pt-12" aria-labelledby="building-title">
        <h2 id="building-title" className="text-h2 font-extrabold">
          {t.buildingTitle}
        </h2>
        {/*
          The roadmap is drawn as a rail line: stations that are open are solid and link to their page,
          the rest are still being built (hollow, dashed track).
        */}
        <ol className="relative mt-8 grid gap-6 lg:grid-cols-4 lg:gap-5">
          {t.pillars.map((p, i) => {
            const href = pillarLinks[i];
            const open = Boolean(href);
            const trackOpen = open && Boolean(pillarLinks[i + 1]);
            return (
              <li
                key={p.title}
                className="relative grid grid-cols-[2rem_1fr] gap-x-4 lg:grid-cols-1 lg:grid-rows-[2rem_1fr] lg:gap-y-4"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-8 bottom-[-1.5rem] left-[calc(1rem-1.5px)] w-[3px] lg:top-[calc(1rem-1.5px)] lg:right-[-1.25rem] lg:bottom-auto lg:left-8 lg:h-[3px] lg:w-auto",
                    i === t.pillars.length - 1 && "hidden",
                    trackOpen
                      ? "bg-brand"
                      : "bg-[repeating-linear-gradient(to_bottom,var(--border)_0_6px,transparent_6px_11px)] lg:bg-[repeating-linear-gradient(to_right,var(--border)_0_6px,transparent_6px_11px)]",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative z-10 grid size-8 place-items-center rounded-full border-[3px]",
                    open ? "border-brand bg-brand" : "border-border bg-bg",
                  )}
                >
                  {open && <span className="size-2.5 rounded-full bg-accent" />}
                </span>
                <div
                  className={cn(
                    "edge group relative h-full rounded-card p-5 transition-[border-color,box-shadow,transform] duration-200",
                    open
                      ? "border-brand bg-brand-soft hover:-translate-y-0.5 hover:shadow-card motion-reduce:hover:translate-y-0"
                      : "border-border bg-surface",
                  )}
                >
                  <h3 className="mb-2 text-lg font-bold">
                    {href ? (
                      <Link
                        href={href}
                        className="stretched-link text-text no-underline after:absolute after:inset-0 after:rounded-card group-hover:text-brand"
                      >
                        {p.title}
                        <ArrowRight
                          aria-hidden="true"
                          className="ml-1.5 inline size-[1em] align-[-0.12em] transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <p className="text-muted">{p.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
