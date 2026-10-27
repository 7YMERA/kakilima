import Link from "next/link";

const pillars = [
  {
    title: "Report it properly",
    body: "Every official complaint channel in one place, so your pothole or broken walkway lands on the right desk.",
  },
  {
    title: "Find your people",
    body: "A directory of the NGOs and individuals already pushing for safer roads and better trains. Coming soon.",
  },
  {
    title: "Share what you face",
    body: "A public wall of the sidewalks, crossings and stations that fail us every day. Coming soon.",
  },
  {
    title: "Hold leaders to account",
    body: "Track what is reported in each constituency and keep elected representatives informed. Coming later.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Untuk jalan yang lebih selamat</p>
          <h1>Streets that are safe to walk. Trains worth waiting for.</h1>
          <p className="lead">
            KakiLima brings together Malaysians who are tired of broken sidewalks, dangerous crossings and
            unreliable public transport, and helps turn that frustration into action.
          </p>
          <div className="actions">
            <Link href="/report" className="button primary">
              Report a problem
            </Link>
            <Link href="/about" className="button">
              Why KakiLima
            </Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <h2>What we&apos;re building</h2>
        <div className="grid">
          {pillars.map((p) => (
            <article key={p.title} className="card">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
