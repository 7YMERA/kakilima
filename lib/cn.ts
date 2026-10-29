// Joins class names, skipping falsy ones. Enough for this site without pulling in clsx.
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
