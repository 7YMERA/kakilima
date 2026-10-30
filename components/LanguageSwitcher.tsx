"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { htmlLang, localeNames, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

export default function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  // Keep the visitor on the same page when they switch language.
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <nav aria-label={label} className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      <span className="text-label font-bold text-muted" aria-hidden="true">
        {label}
      </span>
      <ul className="flex flex-wrap gap-1.5">
        {locales.map((l) => {
          const active = l === current;
          return (
            <li key={l}>
              <Link
                href={`/${l}${rest}`}
                lang={htmlLang[l]}
                hrefLang={htmlLang[l]}
                aria-current={active ? "true" : undefined}
                className={buttonVariants({
                  size: "sm",
                  variant: active ? "primary" : "outline",
                  className: cn(!active && "font-semibold"),
                })}
              >
                {active && <Check aria-hidden="true" strokeWidth={3} />}
                {localeNames[l]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
