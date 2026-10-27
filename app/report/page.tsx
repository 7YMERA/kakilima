import type { Metadata } from "next";
import { channelGroups } from "@/data/report-channels";

export const metadata: Metadata = {
  title: "Report it",
  description: "Official channels for reporting road, sidewalk and public transport problems in Malaysia.",
};

export default function ReportPage() {
  return (
    <section className="container section">
      <h1>Report it</h1>
      <p className="lead">
        A complaint on social media gets likes. A complaint in the official system gets a ticket number that
        someone has to close. Use both, but always file the official one.
      </p>

      <div className="tips card">
        <h2>Make your report count</h2>
        <ul>
          <li>Take a clear photo, plus one wider shot that shows where it is.</li>
          <li>Drop an exact pin or note the nearest landmark and road name.</li>
          <li>Say who is at risk: wheelchair users, children walking to school, riders at night.</li>
          <li>Keep your reference number and follow up if nothing happens.</li>
        </ul>
      </div>

      {channelGroups.map((group) => (
        <div key={group.title} className="channel-group">
          <h2>{group.title}</h2>
          <p className="muted">{group.intro}</p>
          <div className="grid">
            {group.channels.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="card channel">
                <h3>{c.name}</h3>
                <p className="muted small">{c.runBy}</p>
                <p>{c.use}</p>
                <span className="link-label">Open ↗</span>
              </a>
            ))}
          </div>
        </div>
      ))}

      <p className="muted small">
        Spotted a wrong link or a channel we missed? Let us know so we can fix it.
      </p>
    </section>
  );
}
