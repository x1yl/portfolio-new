"use client";
import SiteShell from "../components/SiteShell";
import { ParallaxLink } from "../components/ParallaxLink";

const PROJECTS: {
  title: string;
  description: string;
  href: string;
  tags?: string[];
}[] = [
  {
    title: "College Application Tracker",
    description:
      "A local-first tracker for college applications — deadlines, essays, checklists, and school-specific admissions stats parsed straight from uploaded Overgrad pages. Features compressed share links and dark mode.",
    href: "https://college.kevinzheng.fyi",
    tags: ["TypeScript", "localStorage", "data-parsing"],
  },
  {
    title: "KZ Links",
    description:
      "A serverless link shortener with a 30-day TTL, built for the tracker's share URLs. Zero-dependency Upstash REST client, open CORS so any of my sites can mint links.",
    href: "https://links.kevinzheng.fyi",
    tags: ["Vercel", "Upstash", "serverless"],
  },
  {
    title: "Portfolio",
    description:
      "This site — animated SVG signature, mouse-parallax background, floating music player, and a contact form behind Cloudflare Turnstile. Neo-brutalist 'Academic Print' design system with light/dark themes.",
    href: "https://kevinzheng.fyi",
    tags: ["Next.js", "Tailwind", "animation"],
  },
];

export default function Projects() {
  return (
    <SiteShell>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="micro mb-3">Projects</p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-12">
          Things I've built.
        </h1>

        {PROJECTS.length === 0 ? (
          <div className="hard-card border-dashed border-(--line)! p-12 text-center">
            <p className="font-serif text-2xl mb-2">Nothing public yet.</p>
            <p className="text-(--ink-soft) mb-6">
              Check back soon — or see what I'm up to on GitHub.
            </p>
            <ParallaxLink
              href="https://github.com"
              className="font-mono text-sm text-(--brand) font-semibold underline underline-offset-4"
            >
              github.com →
            </ParallaxLink>
          </div>
        ) : (
          <div className="grid gap-6">
            {PROJECTS.map((p) => (
              <a
                key={p.title}
                href={p.href}
                className="hard-card block p-6 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform no-underline"
              >
                <h2 className="font-serif text-2xl mb-1 text-(--ink)">
                  {p.title}
                </h2>
                <p className="text-(--ink-soft)">{p.description}</p>
                <div className="flex flex-wrap gap-2 font-mono text-xs text-(--brand)">
                  {p.tags?.map((t) => (
                    <span key={t} className="whitespace-nowrap">
                      #{t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
