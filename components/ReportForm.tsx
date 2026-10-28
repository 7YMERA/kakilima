"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { submitReport, type ErrorCode, type Field, type SubmitState } from "@/app/[lang]/wall/actions";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { categories, states } from "@/lib/report-options";

type Props = {
  lang: Locale;
  t: Dictionary["wall"]["form"];
  categoryLabels: Dictionary["wall"]["categories"];
};

const initial: SubmitState = { status: "idle" };

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
      <div ref={successRef} tabIndex={-1} role="status" className="card notice success">
        <h2>{t.successTitle}</h2>
        <p>{t.successBody}</p>
        <div className="actions">
          <a href={`/${lang}/wall/new`} className="button primary">
            {t.another}
          </a>
          <Link href={`/${lang}/wall`} className="button">
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
    <form action={action} className="report-form" noValidate key={state.status === "error" ? state.attempt : 0}>
      {state.status === "error" && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="card notice error">
          {state.formError ? (
            <p>{errorText(state.formError)}</p>
          ) : (
            <>
              <h2>{t.errorSummary}</h2>
              <ul>
                {fieldOrder
                  .filter((f) => errors[f])
                  .map((f) => (
                    <li key={f}>
                      <a href={`#${f}`}>
                        {labelFor[f]}: {errorText(errors[f]!)}
                      </a>
                    </li>
                  ))}
              </ul>
            </>
          )}
          <p className="small">{t.photoReattach}</p>
        </div>
      )}

      <input type="hidden" name="locale" value={lang} />
      {/* Hidden from people and screen readers; only bots fill it in. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="category">
          {t.category} <span className="req">({t.required})</span>
        </label>
        <select
          id="category"
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

      <div className="field-row">
        <div className="field">
          <label htmlFor="state">
            {t.state} <span className="req">({t.required})</span>
          </label>
          <select
            id="state"
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

        <div className="field">
          <label htmlFor="area">
            {t.area} <span className="req">({t.required})</span>
          </label>
          <p id="area-hint" className="hint">
            {t.areaHint}
          </p>
          <input
            id="area"
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

      <div className="field">
        <label htmlFor="title">
          {t.titleLabel} <span className="req">({t.required})</span>
        </label>
        <p id="title-hint" className="hint">
          {t.titleHint}
        </p>
        <input
          id="title"
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

      <div className="field">
        <label htmlFor="description">
          {t.description} <span className="req">({t.required})</span>
        </label>
        <p id="description-hint" className="hint">
          {t.descriptionHint}
        </p>
        <textarea
          id="description"
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

      <div className="field">
        <label htmlFor="photo">
          {t.photo} <span className="req">({t.optional})</span>
        </label>
        <p id="photo-hint" className="hint">
          {t.photoHint}
        </p>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          aria-invalid={Boolean(err("photo"))}
          aria-describedby={describedBy("photo", true)}
        />
        {err("photo") && <FieldError id="photo-error" text={errorText(err("photo")!)} />}
      </div>

      <div className="field">
        <label htmlFor="photoAlt">
          {t.photoAlt} <span className="req">({t.optional})</span>
        </label>
        <p id="photoAlt-hint" className="hint">
          {t.photoAltHint}
        </p>
        <input
          id="photoAlt"
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

      <div className="field checkbox">
        <input
          id="agree"
          name="agree"
          type="checkbox"
          aria-invalid={Boolean(err("agree"))}
          aria-describedby={describedBy("agree", false)}
        />
        <label htmlFor="agree">{t.agree}</label>
        {err("agree") && <FieldError id="agree-error" text={errorText(err("agree")!)} />}
      </div>

      <button type="submit" className="button primary" disabled={pending} aria-disabled={pending}>
        {pending ? t.submitting : t.submit}
      </button>
    </form>
  );
}

function FieldError({ id, text }: { id: string; text: string }) {
  return (
    <p id={id} className="field-error">
      <span aria-hidden="true">⚠ </span>
      {text}
    </p>
  );
}
