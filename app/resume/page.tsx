import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../components/SiteShell";
import PrintButton from "./PrintButton";
import PrintResume from "./PrintResume";
import {
  EDUCATION,
  EXPERIENCE,
  LEADERSHIP,
  RESUME_PROJECTS,
  SKILL_GROUPS,
  type ResumeEntry,
} from "../lib/resume";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Kevin Zheng's résumé — mechatronics and robotics student at Brooklyn Technical High School, developer, and vice president of BTHS Action.",
  alternates: { canonical: "/resume" },
};

function Entry({ entry }: { entry: ResumeEntry }) {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-serif text-lg font-semibold">
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
        <p className="micro">{entry.date}</p>
      </div>
      {(entry.subtitle || entry.location) && (
        <p className="text-sm font-medium text-(--ink-soft)">
          {entry.subtitle}
          {entry.location ? ` · ${entry.location}` : ""}
        </p>
      )}
      {entry.bullets.length > 0 && (
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-(--ink-soft)">
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
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t-[1.5px] border-(--line) pt-6 print:pt-3">
      <h2 className="micro mb-4 print:mb-2 print:break-after-avoid">
        {title}
      </h2>
      <div className="space-y-5 print:space-y-3">{children}</div>
    </section>
  );
}

export default function Resume() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-6 py-16 print:hidden">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-6 print:mb-4">
          <div>
            <p className="micro mb-2 print:hidden">Résumé</p>
            <h1 className="font-serif text-4xl font-semibold md:text-5xl print:text-3xl">
              Kevin Zheng
            </h1>
            <p className="mt-2 text-lg text-(--ink-soft) print:mt-1 print:text-base">
              Mechatronics &amp; robotics student · Developer
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs font-semibold print:mt-2">
              <span className="text-(--ink-soft)">Brooklyn, NY</span>
              <a
                href={`mailto:${SITE.email}`}
                className="underline decoration-(--line) underline-offset-4 hover:text-(--brand)"
              >
                {SITE.email}
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-(--line) underline-offset-4 hover:text-(--brand)"
              >
                github.com/x1yl
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-(--line) underline-offset-4 hover:text-(--brand)"
              >
                linkedin.com/in/kevzheng
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 print:hidden">
            <a
              href={SITE.resumePdf}
              download
              className="btn-hard no-underline"
            >
              Download PDF ↓
            </a>
            <PrintButton />
          </div>
        </header>

        <div className="space-y-8 print:space-y-4">
          <Section title="Education">
            {EDUCATION.map((entry) => (
              <Entry key={entry.title} entry={entry} />
            ))}
          </Section>

          <Section title="Experience">
            {EXPERIENCE.map((entry) => (
              <Entry key={entry.title} entry={entry} />
            ))}
          </Section>

          <Section title="Leadership">
            {LEADERSHIP.map((entry) => (
              <Entry key={entry.title} entry={entry} />
            ))}
          </Section>

          <Section title="Projects">
            {RESUME_PROJECTS.map((entry) => (
              <Entry key={entry.title} entry={entry} />
            ))}
          </Section>

          <Section title="Skills">
            <div className="grid gap-4 sm:grid-cols-2 print:grid-cols-2">
              {Object.entries(SKILL_GROUPS).map(([group, items]) => (
                <div key={group}>
                  <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-(--ink)">
                    {group}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-(--ink-soft)">
                    {items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
      <PrintResume />
    </SiteShell>
  );
}
