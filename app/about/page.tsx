import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="container section prose">
      <h1>About KakiLima</h1>
      <p className="lead">
        A <em>kaki lima</em> is the five-foot walkway in front of Malaysian shophouses: a space meant for
        people on foot. Too often today it is broken, blocked or missing entirely.
      </p>
      <p>
        KakiLima is a community project for everyone who wants Malaysian streets to be safe to walk, cycle and
        wait on, and for public transport to be a real choice rather than a last resort.
      </p>
      <h2>What we believe</h2>
      <ul>
        <li>Road safety is a public responsibility, not just a driver&apos;s problem.</li>
        <li>Good sidewalks and reliable trains are basic infrastructure, not luxuries.</li>
        <li>Problems get fixed faster when they are documented, visible and shared.</li>
        <li>Elected representatives work better when they know what their constituents face.</li>
      </ul>
      <h2>Where we are</h2>
      <p>
        We are just getting started. Right now you can find the official channels to report problems. A
        directory of advocates and a public space to share what you face are on the way.
      </p>
    </section>
  );
}
