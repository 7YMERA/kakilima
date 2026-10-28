import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
      <div className="container section prose">
        <h1>Moderation</h1>
        <p className="card notice">
          Moderation needs a database and a password. In Vercel, add Neon under Storage and set the{" "}
          <code>ADMIN_PASSWORD</code> environment variable, then redeploy.
        </p>
      </div>
    );
  }

  if (!(await isAdmin())) {
    return (
      <div className="container section prose">
        <h1>Moderation</h1>
        <form action={login} className="report-form">
          <input type="hidden" name="lang" value={lang} />
          {error && (
            <p role="alert" className="field-error">
              That password is not right.
            </p>
          )}
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <button type="submit" className="button primary">
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
    <div className="container section">
      <div className="admin-head">
        <h1>Moderation</h1>
        <form action={logout}>
          <input type="hidden" name="lang" value={lang} />
          <button type="submit" className="pill">
            Sign out
          </button>
        </form>
      </div>
      <nav aria-label="Post status" className="admin-tabs">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`/${lang}/admin?view=${tab.id}`}
            className="pill"
            aria-current={tab.id === status ? "page" : undefined}
          >
            {tab.label}
          </a>
        ))}
      </nav>

      <p className="muted">
        Approve posts that describe a real place and problem. Reject anything that names or accuses private
        individuals, shows readable faces or number plates, or is spam.
      </p>

      {reports.length === 0 ? (
        <p className="card notice">Nothing here.</p>
      ) : (
        <ul className="plain-list admin-list">
          {reports.map((r) => (
            <li key={r.id} className="card report admin-report">
              {r.photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.photoUrl} alt={r.photoAlt || r.title} className="report-photo" />
              )}
              <div>
                <p className="tag">{categories[r.category]}</p>
                <h2>{r.title}</h2>
                <p className="muted small">
                  {r.area}, {r.state} · #{r.id} · {r.createdAt.toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" })}
                </p>
                <p className="report-body">{r.description}</p>
                {r.photoAlt && <p className="small muted">Photo description: {r.photoAlt}</p>}
                <div className="actions">
                  {status !== "approved" && (
                    <form action={moderate}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="status" value="approved" />
                      <button type="submit" className="button primary">
                        Approve
                      </button>
                    </form>
                  )}
                  {status !== "rejected" && (
                    <form action={moderate}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="status" value="rejected" />
                      <button type="submit" className="button">
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
