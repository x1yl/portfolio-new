import Link from "next/link";
import SiteShell from "./components/SiteShell";
import Signature from "./components/Signature";
import { FEATURED_PROJECTS } from "./lib/projects";
import { SITE } from "./lib/site";

export default function Home() {
  const tagline = `${SITE.role} in Brooklyn, New York.`;

  return (
    <SiteShell animateNav>
      <section className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="sr-only">
          Kevin Zheng — mechatronics student and developer
        </h1>
        <div className="w-full max-w-4xl">
          <Signature />
        </div>

        <p className="mt-8 max-w-3xl text-balance font-serif text-xl italic text-(--ink-soft) md:text-2xl">
          {tagline.split(" ").map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="animate-fade-up"
              style={{ animationDelay: `${3.4 + i * 0.07}s` }}
            >
              {word}{" "}
            </span>
          ))}
        </p>

        <p
          className="micro mt-5 animate-fade-up"
          style={{ animationDelay: "4s" }}
        >
          <span className="mr-2 text-(--brand)">●</span>
          {SITE.availability}
        </p>

        <div
          className="mt-10 flex animate-fade-up flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "4.2s" }}
        >
          <a
            href={SITE.resumePdf}
            download
            className="btn-hard no-underline"
          >
            Résumé ↓
          </a>
          <a
            href="#work"
            className="font-mono text-sm font-semibold text-(--ink-soft) underline decoration-(--line) underline-offset-4 transition-colors hover:text-(--brand)"
          >
            Selected work ↓
          </a>
        </div>
      </section>

      <section
        id="work"
        aria-labelledby="selected-work"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 pb-24"
      >
        <div className="flex items-end justify-between gap-4 border-b-[1.5px] border-(--ink) pb-3">
          <h2 id="selected-work" className="micro">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="micro transition-colors hover:text-(--brand)"
          >
            All projects →
          </Link>
        </div>

        <ul>
          {FEATURED_PROJECTS.map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group grid gap-2 border-b border-(--line) py-6 transition-colors hover:bg-(--brand-tint) sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="micro text-(--brand)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-serif text-2xl transition-transform group-hover:translate-x-1">
                    {project.title}
                  </span>
                  <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-(--ink-soft)">
                    {project.summary}
                  </span>
                </span>
                <span className="micro sm:text-right">{project.year}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm leading-relaxed text-(--ink-soft)">
          I study mechatronics and robotics at Brooklyn Tech. Most of what I
          build starts with a problem I actually have — a tracker for college
          applications, a question bank for SAT practice, a shortener for the
          links that got too long.{" "}
          <Link
            href="/about"
            className="font-semibold text-(--brand) underline underline-offset-4"
          >
            More about me →
          </Link>
        </p>
      </section>
    </SiteShell>
  );
}
