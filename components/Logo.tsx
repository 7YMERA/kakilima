// The mark is a tile of yellow tactile paving, the raised dots that guide blind people along a kaki lima.
export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false" className="size-7 shrink-0">
        <rect width="28" height="28" rx="7" className="fill-accent" />
        {[7, 14, 21].flatMap((cy) =>
          [7, 14, 21].map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" className="fill-accent-ink" />),
        )}
      </svg>
      <span className="font-display text-logo font-extrabold tracking-tight text-text">
        Kaki<span className="text-brand">Lima</span>
      </span>
    </span>
  );
}
