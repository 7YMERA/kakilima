import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DisplaySettings, { displayInitScript } from "@/components/DisplaySettings";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { hasLocale, htmlLang, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
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

  return (
    <html lang={htmlLang[lang]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: displayInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {dict.nav.skip}
        </a>
        <header className="site-header">
          <div className="container header-inner">
            <Link href={`/${lang}`} className="logo" aria-label="KakiLima">
              Kaki<span>Lima</span>
            </Link>
            <nav aria-label={dict.nav.main} className="main-nav">
              <Link href={`/${lang}/report`}>{dict.nav.report}</Link>
              <Link href={`/${lang}/wall`}>{dict.nav.wall}</Link>
              <Link href={`/${lang}/directory`}>{dict.nav.directory}</Link>
              <Link href={`/${lang}/about`}>{dict.nav.about}</Link>
            </nav>
          </div>
          <div className="toolbar">
            <div className="container toolbar-inner">
              <LanguageSwitcher current={lang} label={dict.language.label} />
              <DisplaySettings labels={dict.a11y} />
            </div>
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <div className="container">
            <p>{dict.footer.disclaimer}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
