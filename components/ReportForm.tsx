"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { submitReport, type ErrorCode, type Field, type SubmitState } from "@/app/[lang]/wall/actions";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { categories, states } from "@/lib/report-options";

type Props = {
  lang: Locale;
  t: Dictionary["wall"]["form"];
  categoryLabels: Dictionary["wall"]["categories"];
};

const initial: SubmitState = { status: "idle" };

const fieldClass = "flex flex-col gap-1.5";
const labelClass = "font-bold";
const markClass = "text-small font-normal text-muted";
const hintClass = "text-small text-muted";
const inputClass =
  "min-h-12 w-full rounded-lg border-2 border-solid border-muted bg-surface px-3 py-2.5 text-text " +
  "aria-[invalid=true]:border-danger";

// Order matches the form, so the error summary reads top to bottom.
const fieldOrder: Field[] = ["category", "state", "area", "title", "description", "photo", "photoAlt", "agree"];

export default function ReportForm({ lang, t, categoryLabels }: Props) {
  const [state, action, pending] = useActionState(submitReport, initial);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the result so screen reader and keyboard users hear it straight away.
  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="edge mt-10 rounded-card border-2 border-brand bg-surface p-5">
        <h2 className="text-h2 font-extrabold">{t.successTitle}</h2>
        <p className="mt-2">{t.successBody}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={`/${lang}/wall/new`} className={buttonVariants({ variant: "primary" })}>
            {t.another}
          </a>
          <Link href={`/${lang}/wall`} className={buttonVariants({ variant: "outline" })}>
            {t.backToWall}
          </Link>
        </div>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};
  const err = (f: Field) => errors[f];
  const labelFor: Record<Field, string> = {
    category: t.category,
    state: t.state,
    area: t.area,
    title: t.titleLabel,
    description: t.description,
    photo: t.photo,
    photoAlt: t.photoAlt,
    agree: t.guidelinesTitle,
  };
  const describedBy = (f: Field, hint: boolean) =>
    [hint ? `${f}-hint` : null, err(f) ? `${f}-error` : null].filter(Boolean).join(" ") || undefined;
  const errorText = (code: ErrorCode) => t.errors[code];

  return (
    <form action={action} className="mt-10 flex flex-col gap-6" noValidate key={state.status === "error" ? state.attempt : 0}>
      {state.status === "error" && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="edge rounded-card border-2 border-danger bg-surface p-5">
          {state.formError ? (
            <p className="font-bold">{errorText(state.formError)}</p>
          ) : (
            <>
              <h2 className="text-lg font-bold">{t.errorSummary}</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {fieldOrder
                  .filter((f) => errors[f])
                  .map((f) => (
                    <li key={f}>
                      <a href={`#${f}`} className="font-bold text-danger underline">
                        {labelFor[f]}: {errorText(errors[f]!)}
                      </a>
                    </li>
                  ))}
              </ul>
            </>
          )}
          <p className="mt-3 text-small text-muted">{t.photoReattach}</p>
        </div>
      )}

      <input type="hidden" name="locale" value={lang} />
      {/* Hidden from people and screen readers; only bots fill it in. */}
      <div className="absolute -left-[10000px] size-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={fieldClass}>
        <label htmlFor="category" className={labelClass}>
          {t.category} <span className={markClass}>({t.required})</span>
        </label>
        <select
          id="category"
className={inputClass}
          name="category"
          required
          defaultValue={values.category ?? ""}
          aria-invalid={Boolean(err("category"))}
          aria-describedby={describedBy("category", false)}
        >
          <option value="" disabled>
            {t.chooseCategory}
          </option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {categoryLabels[c]}
            </option>
          ))}
        </select>
        {err("category") && <FieldError id="category-error" text={errorText(err("category")!)} />}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className={fieldClass}>
          <label htmlFor="state" className={labelClass}>
            {t.state} <span className={markClass}>({t.required})</span>
          </label>
          <select
            id="state"
className={inputClass}
            name="state"
            required
            defaultValue={values.state ?? ""}
            aria-invalid={Boolean(err("state"))}
            aria-describedby={describedBy("state", false)}
          >
            <option value="" disabled>
              {t.chooseState}
            </option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {err("state") && <FieldError id="state-error" text={errorText(err("state")!)} />}
        </div>

        <div className={fieldClass}>
          <label htmlFor="area" className={labelClass}>
            {t.area} <span className={markClass}>({t.required})</span>
          </label>
          <p id="area-hint" className={hintClass}>
            {t.areaHint}
          </p>
          <input
            id="area"
className={inputClass}
            name="area"
            type="text"
            required
            maxLength={120}
            autoComplete="off"
            defaultValue={values.area}
            aria-invalid={Boolean(err("area"))}
            aria-describedby={describedBy("area", true)}
          />
          {err("area") && <FieldError id="area-error" text={errorText(err("area")!)} />}
        </div>
      </div>

      <div className={fieldClass}>
        <label htmlFor="title" className={labelClass}>
          {t.titleLabel} <span className={markClass}>({t.required})</span>
        </label>
        <p id="title-hint" className={hintClass}>
          {t.titleHint}
        </p>
        <input
          id="title"
className={inputClass}
          name="title"
          type="text"
          required
          maxLength={120}
          autoComplete="off"
          defaultValue={values.title}
          aria-invalid={Boolean(err("title"))}
          aria-describedby={describedBy("title", true)}
        />
        {err("title") && <FieldError id="title-error" text={errorText(err("title")!)} />}
      </div>

      <div className={fieldClass}>
        <label htmlFor="description" className={labelClass}>
          {t.description} <span className={markClass}>({t.required})</span>
        </label>
        <p id="description-hint" className={hintClass}>
          {t.descriptionHint}
        </p>
        <textarea
          id="description"
className={inputClass}
          name="description"
          required
          rows={6}
          maxLength={2000}
          defaultValue={values.description}
          aria-invalid={Boolean(err("description"))}
          aria-describedby={describedBy("description", true)}
        />
        {err("description") && <FieldError id="description-error" text={errorText(err("description")!)} />}
      </div>

      <div className={fieldClass}>
        <label htmlFor="photo" className={labelClass}>
          {t.photo} <span className={markClass}>({t.optional})</span>
        </label>
        <p id="photo-hint" className={hintClass}>
          {t.photoHint}
        </p>
        <input
          id="photo"
className={inputClass}
          name="photo"
          type="file"
          accept="image/*"
          aria-invalid={Boolean(err("photo"))}
          aria-describedby={describedBy("photo", true)}
        />
        {err("photo") && <FieldError id="photo-error" text={errorText(err("photo")!)} />}
      </div>

      <div className={fieldClass}>
        <label htmlFor="photoAlt" className={labelClass}>
          {t.photoAlt} <span className={markClass}>({t.optional})</span>
        </label>
        <p id="photoAlt-hint" className={hintClass}>
          {t.photoAltHint}
        </p>
        <input
          id="photoAlt"
className={inputClass}
          name="photoAlt"
          type="text"
          maxLength={200}
          autoComplete="off"
          defaultValue={values.photoAlt}
          aria-invalid={Boolean(err("photoAlt"))}
          aria-describedby={describedBy("photoAlt", true)}
        />
        {err("photoAlt") && <FieldError id="photoAlt-error" text={errorText(err("photoAlt")!)} />}
      </div>

      <div className="flex flex-wrap items-start gap-3">
        <input
          id="agree"
          name="agree"
          type="checkbox"
          className="mt-0.5 size-6 shrink-0 accent-brand"
          aria-invalid={Boolean(err("agree"))}
          aria-describedby={describedBy("agree", false)}
        />
        <label htmlFor="agree" className="flex-1">{t.agree}</label>
        {err("agree") && <FieldError id="agree-error" text={errorText(err("agree")!)} className="basis-full" />}
      </div>

      <button type="submit" className={buttonVariants({ variant: "primary", className: "self-start" })} disabled={pending} aria-disabled={pending}>
        {pending ? t.submitting : t.submit}
      </button>
    </form>
  );
}

function FieldError({ id, text, className }: { id: string; text: string; className?: string }) {
  return (
    <p id={id} className={cn("font-bold text-danger", className)}>
      <span aria-hidden="true">⚠ </span>
      {text}
    </p>
  );
}
