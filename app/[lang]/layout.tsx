import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import DisplaySettings, { displayInitScript } from "@/components/DisplaySettings";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import MainNav from "@/components/MainNav";
import { buttonVariants } from "@/components/ui/button";
import { hasLocale, htmlLang, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import "@fontsource-variable/atkinson-hyperlegible-next";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: { default: "KakiLima", template: "%s · KakiLima" },
    description: dict.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}`])),
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const navLinks = [
    { href: `/${lang}/report`, text: dict.nav.report },
    { href: `/${lang}/wall`, text: dict.nav.wall },
    { href: `/${lang}/directory`, text: dict.nav.directory },
    { href: `/${lang}/about`, text: dict.nav.about },
  ];

  return (
    <html lang={htmlLang[lang]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: displayInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="skip-link rounded-lg bg-brand px-4 py-3 font-bold text-brand-ink no-underline shadow-card"
        >
          {dict.nav.skip}
        </a>
        <header className="edge border-x-0 border-t-0 border-border bg-surface">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2">
            <Link
              href={`/${lang}`}
              aria-label="KakiLima"
              className="-mx-2 inline-flex min-h-11 items-center rounded-xl px-2 no-underline"
            >
              <Logo />
            </Link>
            <MainNav label={dict.nav.main} links={navLinks} />
          </div>
          <div className="edge border-x-0 border-b-0 border-border bg-surface-sunk">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-2.5">
              <LanguageSwitcher current={lang} label={dict.language.label} />
              <DisplaySettings labels={dict.a11y} />
            </div>
          </div>
        </header>
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <section aria-labelledby="cta-title" className="mt-16 bg-text text-bg">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 id="cta-title" className="text-h2 font-extrabold tracking-tight">
                {dict.cta.title}
              </h2>
              <p className="mt-2 text-lg">{dict.cta.body}</p>
            </div>
            <Link
              href={`/${lang}/report`}
              className={buttonVariants({
                variant: "inverse",
                className: "sm:shrink-0",
              })}
            >
              {dict.cta.button}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
        <footer className="edge border-x-0 border-b-0 border-border bg-surface-sunk">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-md">
              <Logo />
              <p className="mt-3 text-small text-muted">{dict.footer.disclaimer}</p>
            </div>
            <ul className="flex flex-wrap gap-x-5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center font-bold text-brand underline decoration-2 underline-offset-4 hover:decoration-accent"
                  >
                    {l.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
