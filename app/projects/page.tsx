import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "../components/SiteShell";
import { PROJECTS } from "../lib/projects";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Kevin Zheng — full-stack apps, local-first tools, and a portfolio built from scratch.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="micro mb-3">Projects</p>
        <h1 className="mb-5 font-serif text-4xl font-semibold md:text-5xl">
          Things I&apos;ve built.
        </h1>
        <p className="mb-12 max-w-3xl leading-relaxed text-(--ink-soft)">
          A mix of full-stack apps, local-first tools, and the site you&apos;re
          reading. Each case study covers the problem, the build, and what
          I&apos;d change next.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <article
              key={project.slug}
              className="hard-card flex flex-col overflow-hidden"
            >
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`Read the ${project.title} case study`}
                className="block border-b-[1.5px] border-(--ink) bg-(--paper)"
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? `${project.title} screenshot`}
                    width={1440}
                    height={900}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="aspect-16/10 w-full object-cover transition-transform duration-300 hover:scale-[1.015]"
                  />
                ) : (
                  <div className="flex aspect-16/10 w-full items-center justify-center bg-(--brand-tint) p-8">
                    <span className="font-serif text-4xl font-semibold text-(--ink)">
                      {project.title}
                    </span>
                  </div>
                )}
              </Link>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-serif text-2xl leading-tight">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="transition-colors hover:text-(--brand)"
                    >
                      {project.title}
                    </Link>
                  </h2>
                  <span className="micro shrink-0">{project.year}</span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-(--ink-soft)">
                  {project.summary}
                </p>

                <p className="micro mt-4">
                  {project.role} · {project.type}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] font-semibold text-(--brand)">
                  {project.stack.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 font-mono text-xs font-semibold">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-(--ink) underline decoration-(--line) underline-offset-4 transition-colors hover:text-(--brand)"
                  >
                    Case study →
                  </Link>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-(--ink-soft) underline decoration-(--line) underline-offset-4 transition-colors hover:text-(--brand)"
                    >
                      Live ↗
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-(--ink-soft) underline decoration-(--line) underline-offset-4 transition-colors hover:text-(--brand)"
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="micro mt-12">
          More experiments on{" "}
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--brand) underline underline-offset-4"
          >
            GitHub ↗
          </a>
        </p>
      </div>
    </SiteShell>
  );
}
