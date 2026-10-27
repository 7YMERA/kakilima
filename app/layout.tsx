import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KakiLima",
    template: "%s · KakiLima",
  },
  description:
    "A community hub for safer streets, walkable sidewalks and better public transport in Malaysia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="logo">
              Kaki<span>Lima</span>
            </Link>
            <nav>
              <Link href="/report">Report it</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>KakiLima is an independent community project. We are not affiliated with any government agency.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
