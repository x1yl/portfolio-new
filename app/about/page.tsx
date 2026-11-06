import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../components/SiteShell";
import {
  EDUCATION,
  EXPERIENCE,
  LEADERSHIP,
  SKILL_GROUPS,
} from "../lib/resume";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kevin Zheng is a mechatronics and robotics student at Brooklyn Technical High School. He builds web tools and enjoys the overlap between mechanical engineering and software.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="micro mb-3">About</p>
        <h1 className="mb-8 font-serif text-4xl font-semibold md:text-5xl">
          Hey, I&apos;m Kevin.
        </h1>

        <div className="max-w-3xl space-y-4 leading-relaxed text-(--ink)">
          <p>
            I&apos;m a senior at Brooklyn Technical High School, class of 2027,
            in the Mechatronics &amp; Robotics program. I&apos;m interested in
            the overlap between mechanical engineering and software — and in
            the tools that live in that overlap.
          </p>
          <p>
            I also program the control system for FTC Team 27705, where I work
            on RoadRunner drive code, sensor integration, and mechanism
            control.
          </p>
          <p>
            Most of what I build starts with something I actually need. This
            past year that meant a college application tracker, a question bank
            for SAT practice, and a link shortener for the share URLs that got
            too long. I care about interfaces that are fast, readable, and
            honest about what they do.
          </p>
        </div>

        <dl className="hard-card mt-10 grid gap-x-6 gap-y-5 p-6 sm:grid-cols-2">
          <div>
            <dt className="micro mb-1">Based in</dt>
            <dd className="font-medium">{SITE.location}</dd>
          </div>
          <div>
            <dt className="micro mb-1">Studying</dt>
            <dd className="font-medium">
              Mechatronics &amp; Robotics, Brooklyn Tech &apos;27
            </dd>
          </div>
          <div>
            <dt className="micro mb-1">GPA</dt>
            <dd className="font-medium">3.7</dd>
          </div>
          <div>
            <dt className="micro mb-1">Looking for</dt>
            <dd className="font-medium">
              Summer 2027 internships in mechatronics &amp; robotics
            </dd>
          </div>
        </dl>

        <section className="mt-16">
          <h2 className="font-serif text-2xl font-semibold">
            Experience &amp; leadership
          </h2>
          <div className="mt-6 space-y-8 border-l-2 border-(--line) pl-6">
            {[...LEADERSHIP, ...EXPERIENCE].map((entry) => (
              <div key={`${entry.title}-${entry.date}`}>
                <p className="micro mb-1">{entry.date}</p>
                <h3 className="font-serif text-xl font-semibold">
                  {entry.href ? (
                    <Link
                      href={entry.href}
                      className="transition-colors hover:text-(--brand)"
                    >
                      {entry.title}
                    </Link>
                  ) : (
                    entry.title
                  )}
                </h3>
                <p className="text-sm font-medium text-(--ink-soft)">
                  {entry.subtitle}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
                {entry.bullets.length > 0 && (
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-(--ink-soft)">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 bg-(--brand)"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-serif text-2xl font-semibold">Education</h2>
          <div className="mt-6 space-y-8">
            {EDUCATION.map((entry) => (
              <div key={entry.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-serif text-xl font-semibold">
                    {entry.title}
                  </h3>
                  <p className="micro">{entry.date}</p>
                </div>
                <p className="text-sm font-medium text-(--ink-soft)">
                  {entry.subtitle}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
                {entry.bullets.length > 0 && (
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-(--ink-soft)">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-serif text-2xl font-semibold">Skills</h2>
          <div className="mt-6 space-y-7">
            {Object.entries(SKILL_GROUPS).map(([group, items]) => (
              <div key={group}>
                <h3 className="micro mb-3">{group}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 flex flex-wrap items-center gap-4 border-t-[1.5px] border-(--ink) pt-6">
          <Link href="/resume" className="btn-hard no-underline">
            Full résumé →
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="font-mono text-sm font-semibold text-(--ink-soft) underline decoration-(--line) underline-offset-4 transition-colors hover:text-(--brand)"
          >
            {SITE.email}
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-semibold text-(--ink-soft) underline decoration-(--line) underline-offset-4 transition-colors hover:text-(--brand)"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </SiteShell>
  );
}
