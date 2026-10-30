import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { adminPassword, isAdmin } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/db";
import { listReports, type ReportStatus } from "@/lib/reports";
import { login, logout, moderate } from "./actions";

// Moderation is for the site owner only, so it stays in English and out of search engines.
export const metadata: Metadata = { title: "Moderation", robots: { index: false, follow: false } };

export const dynamic = "force-dynamic";

export default async function AdminPage({ params, searchParams }: PageProps<"/[lang]/admin">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { error, view } = await searchParams;

  if (!adminPassword() || !isDatabaseConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-12 sm:pt-16">
        <h1 className="text-h1 font-extrabold">Moderation</h1>
        <p className="edge mt-6 rounded-card border-border bg-surface p-5">
          Moderation needs a database and a password. In Vercel, add Neon under Storage and set the{" "}
          <code>ADMIN_PASSWORD</code> environment variable, then redeploy.
        </p>
      </div>
    );
  }

  if (!(await isAdmin())) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-12 sm:pt-16">
        <h1 className="text-h1 font-extrabold">Moderation</h1>
        <form action={login} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="lang" value={lang} />
          {error && (
            <p role="alert" className="font-bold text-danger">
              That password is not right.
            </p>
          )}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="font-bold">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password"
              required
              className="min-h-12 w-full max-w-sm rounded-lg border-2 border-solid border-muted bg-surface px-3 py-2.5 text-text"
            />
          </div>
          <button type="submit" className={buttonVariants({ variant: "primary", className: "self-start" })}>
            Sign in
          </button>
        </form>
      </div>
    );
  }

  const status: ReportStatus = view === "approved" || view === "rejected" ? view : "pending";
  const reports = await listReports(status, 100);
  const categories = (await getDictionary("en")).wall.categories;
  const tabs: { id: ReportStatus; label: string }[] = [
    { id: "pending", label: "Waiting for review" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pt-12 sm:pt-16">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-h1 font-extrabold">Moderation</h1>
        <form action={logout}>
          <input type="hidden" name="lang" value={lang} />
          <button type="submit" className={buttonVariants({ size: "sm" })}>
            Sign out
          </button>
        </form>
      </div>
      <nav aria-label="Post status" className="mt-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`/${lang}/admin?view=${tab.id}`}
            className={buttonVariants({ variant: tab.id === status ? "primary" : "outline", size: "sm" })}
            aria-current={tab.id === status ? "page" : undefined}
          >
            {tab.label}
          </a>
        ))}
      </nav>

      <p className="mt-4 text-muted">
        Approve posts that describe a real place and problem. Reject anything that names or accuses private
        individuals, shows readable faces or number plates, or is spam.
      </p>

      {reports.length === 0 ? (
        <p className="edge mt-6 rounded-card border-border bg-surface p-5">Nothing here.</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {reports.map((r) => (
            <li key={r.id} className="edge grid gap-5 rounded-card border-border bg-surface p-5 sm:grid-cols-[16rem_1fr]">
              {r.photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.photoUrl}
                  alt={r.photoAlt || r.title}
                  className="aspect-[4/3] w-full rounded-lg bg-surface-sunk object-cover"
                />
              )}
              <div>
                <p className="edge inline-block rounded-full border-border bg-surface-sunk px-2.5 py-0.5 text-label font-semibold text-muted">
                  {categories[r.category]}
                </p>
                <h2 className="mt-2 text-lg font-bold">{r.title}</h2>
                <p className="text-small text-muted">
                  {r.area}, {r.state} · #{r.id} · {r.createdAt.toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" })}
                </p>
                <p className="mt-3 whitespace-pre-line [overflow-wrap:anywhere]">{r.description}</p>
                {r.photoAlt && <p className="mt-2 text-small text-muted">Photo description: {r.photoAlt}</p>}
                <div className="mt-4 flex flex-wrap gap-3">
                  {status !== "approved" && (
                    <form action={moderate}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="status" value="approved" />
                      <button type="submit" className={buttonVariants({ variant: "primary" })}>
                        Approve
                      </button>
                    </form>
                  )}
                  {status !== "rejected" && (
                    <form action={moderate}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="status" value="rejected" />
                      <button type="submit" className={buttonVariants({ variant: "outline" })}>
                        Reject
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
