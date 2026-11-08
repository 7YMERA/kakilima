import "server-only";
import postgres from "postgres";

// Vercel's Neon integration sets DATABASE_URL; POSTGRES_URL is the older name.
const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

let client: postgres.Sql | null = null;
let schemaReady: Promise<unknown> | null = null;

export function isDatabaseConfigured() {
  return Boolean(url);
}

// Returns a ready-to-use client, creating the table on first use so there is no separate migration step.
export async function getSql() {
  if (!url) throw new Error("DATABASE_URL is not set");
  if (!client) {
    // prepare: false keeps this working through Neon's connection pooler.
    client = postgres(url, { prepare: false, max: 3, onnotice: () => {} });
  }
  schemaReady ??= client`
    CREATE TABLE IF NOT EXISTS reports (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
      category TEXT NOT NULL,
      state TEXT NOT NULL,
      area TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      photo_url TEXT,
      photo_alt TEXT,
      locale TEXT NOT NULL,
      ip_hash TEXT NOT NULL
    )
  `.then(() => client!`CREATE INDEX IF NOT EXISTS reports_status_created ON reports (status, created_at DESC)`);
  try {
    await schemaReady;
  } catch (err) {
    schemaReady = null;
    throw err;
  }
  return client;
}
