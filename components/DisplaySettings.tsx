"use client";

import { useEffect, useState } from "react";

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
    <div role="group" aria-label={labels.label} className="display-settings">
      <fieldset className="size-picker">
        <legend className="control-label">{labels.textSize}</legend>
        {sizes.map((s, i) => (
          <label key={s} className="pill size-option">
            <input
              type="radio"
              name="text-size"
              value={s}
              checked={size === s}
              onChange={() => {
                setSize(s);
                save({ size: s, contrast });
              }}
            />
            <span aria-hidden="true" style={{ fontSize: `${1 + i * 0.2}em` }}>
              A
            </span>
            <span className="visually-hidden">{labels.sizes[s]}</span>
          </label>
        ))}
      </fieldset>
      <button
        type="button"
        className="pill"
        aria-pressed={contrast}
        onClick={() => {
          setContrast(!contrast);
          save({ size, contrast: !contrast });
        }}
      >
        {labels.contrast}
      </button>
    </div>
  );
}
