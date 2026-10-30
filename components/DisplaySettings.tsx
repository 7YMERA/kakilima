"use client";

import { MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export const DISPLAY_STORAGE_KEY = "kakilima-display";

const sizes = ["normal", "large", "larger"] as const;
type Size = (typeof sizes)[number];

type Labels = {
  label: string;
  textSize: string;
  sizes: Record<Size, string>;
  contrast: string;
};

// Runs before first paint (see layout) so the saved size and contrast apply without a flash.
export const displayInitScript = `try{var s=JSON.parse(localStorage.getItem("${DISPLAY_STORAGE_KEY}")||"{}");var d=document.documentElement;if(s.size)d.dataset.textSize=s.size;if(s.contrast)d.dataset.contrast="high";}catch(e){}`;

export default function DisplaySettings({ labels }: { labels: Labels }) {
  const [size, setSize] = useState<Size>("normal");
  const [contrast, setContrast] = useState(false);
  // The thumb only slides once the visitor picks a size, not when a saved size is restored on load.
  const [picked, setPicked] = useState(false);

  // Re-apply on mount too: switching language swaps the <html> element's attributes
  // without a full reload, so the pre-paint script alone isn't enough.
  useEffect(() => {
    let saved: { size?: string; contrast?: boolean } = {};
    try {
      saved = JSON.parse(localStorage.getItem(DISPLAY_STORAGE_KEY) || "{}");
    } catch {}
    const next = {
      size: (sizes as readonly string[]).includes(saved.size ?? "") ? (saved.size as Size) : "normal",
      contrast: saved.contrast === true,
    };
    setSize(next.size);
    setContrast(next.contrast);
    apply(next);
  }, []);

  function apply(next: { size: Size; contrast: boolean }) {
    const d = document.documentElement;
    d.dataset.textSize = next.size;
    if (next.contrast) d.dataset.contrast = "high";
    else delete d.dataset.contrast;
  }

  function save(next: { size: Size; contrast: boolean }) {
    apply(next);
    try {
      localStorage.setItem(DISPLAY_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage can be blocked; the setting still applies for this visit.
    }
  }

  return (
    // "user" makes Motion skip the thumb's slide when the system asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <div role="group" aria-label={labels.label} className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <fieldset className="flex items-center gap-x-3">
          <legend className="float-left mr-3 text-label font-bold text-muted">{labels.textSize}</legend>
          {/* Segmented control: the brand-coloured thumb slides to the chosen size. */}
          <div className="edge flex rounded-full border-border bg-surface p-0.5">
            {sizes.map((s, i) => {
              const checked = size === s;
              return (
                <label
                  key={s}
                  className={cn(
                    "relative inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full px-2 font-bold leading-none transition-colors",
                    checked ? "text-brand-ink" : "text-text hover:bg-brand-soft hover:text-brand",
                  )}
                >
                  <input
                    type="radio"
                    name="text-size"
                    value={s}
                    checked={checked}
                    onChange={() => {
                      setSize(s);
                      save({ size: s, contrast });
                    }}
                    className="absolute inset-0 m-0 cursor-pointer opacity-0"
                  />
                  {checked && (
                    <motion.span
                      layoutId="text-size-thumb"
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full bg-brand"
                      transition={picked ? { type: "spring", stiffness: 500, damping: 38 } : { duration: 0 }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none relative"
                    style={{ fontSize: `${1 + i * 0.2}em` }}
                  >
                    A
                  </span>
                  <span className="sr-only">{labels.sizes[s]}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <button
          type="button"
          aria-pressed={contrast}
          onClick={() => {
            setContrast(!contrast);
            save({ size, contrast: !contrast });
          }}
          className={cn(
            "edge inline-flex min-h-11 items-center gap-2.5 rounded-full py-1 pr-4 pl-1.5 text-ui font-bold transition-colors",
            contrast
              ? "border-brand bg-brand text-brand-ink hover:border-brand-hover hover:bg-brand-hover"
              : "border-border bg-surface text-text hover:border-brand hover:bg-brand-soft",
          )}
        >
          {/* A small switch so on and off read at a glance, not only by colour. */}
          <span
            aria-hidden="true"
            className={cn(
              "edge relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-0.5",
              contrast ? "border-brand-ink bg-brand-ink" : "border-border bg-surface-sunk",
            )}
          >
            <span
              className={cn(
                "size-5.5 rounded-full shadow-card transition-transform duration-200",
                contrast ? "translate-x-5 bg-brand" : "translate-x-0 bg-muted",
              )}
            />
          </span>
          {labels.contrast}
        </button>
      </div>
    </MotionConfig>
  );
}
