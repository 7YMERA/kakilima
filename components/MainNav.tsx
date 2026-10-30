"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export default function MainNav({ label, links }: { label: string; links: { href: string; text: string }[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-1">
        {links.map((l) => {
          const current = pathname === l.href || pathname.startsWith(`${l.href}/`);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-full px-3.5 font-bold no-underline transition-colors",
                  "after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-[3px] after:rounded-full after:transition-transform after:duration-200",
                  current
                    ? "bg-brand-soft text-brand after:scale-x-100 after:bg-accent"
                    : "text-text after:scale-x-0 after:bg-brand hover:bg-brand-soft hover:text-brand hover:after:scale-x-100",
                )}
              >
                {l.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
