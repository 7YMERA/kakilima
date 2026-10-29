import { cn } from "@/lib/cn";

// Adapted from shadcn/ui's Button variants, without cva/Radix. Works on <a>, <Link> and <button>.
// Every variant keeps a 48px (default) or 44px (sm) minimum height for easy tapping.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold no-underline select-none whitespace-nowrap " +
  "transition-[background-color,border-color,color,transform] duration-150 active:translate-y-px " +
  "motion-reduce:active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55 [&_svg]:size-[1.1em] [&_svg]:shrink-0";

const variants = {
  primary: "edge border-brand bg-brand text-brand-ink hover:border-brand-hover hover:bg-brand-hover",
  outline: "edge border-border bg-surface text-text hover:border-brand hover:bg-brand-soft",
  ghost: "border-0 bg-transparent text-text hover:bg-brand-soft hover:text-brand",
};

const sizes = {
  default: "min-h-12 px-5 text-base",
  sm: "min-h-11 min-w-11 px-3.5 text-ui leading-none",
};

export function buttonVariants({
  variant = "outline",
  size = "default",
  className,
}: { variant?: keyof typeof variants; size?: keyof typeof sizes; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}
