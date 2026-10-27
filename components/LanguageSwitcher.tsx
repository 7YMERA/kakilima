"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { htmlLang, localeNames, locales, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  // Keep the visitor on the same page when they switch language.
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <nav aria-label={label} className="language-switcher">
      <span className="control-label" aria-hidden="true">
        {label}
      </span>
      <ul>
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={`/${l}${rest}`}
              lang={htmlLang[l]}
              hrefLang={htmlLang[l]}
              aria-current={l === current ? "true" : undefined}
              className="pill"
            >
              {localeNames[l]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
