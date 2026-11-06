import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "../../components/SiteShell";
import { getProject, PROJECTS } from "../../lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — Kevin Zheng`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: project.image
        ? [
            {
              url: project.image,
              width: 1440,
              height: 900,
              alt: project.imageAlt ?? `${project.title} screenshot`,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((item) => item.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const hostname = project.live
    ? new URL(project.live).hostname.replace(/^www\./, "")
    : null;

  return (
    <SiteShell>
      <article className="mx-auto max-w-6xl px-6 py-16">
        <div className="micro flex items-center gap-2">
          <Link href="/projects" className="hover:text-(--brand)">
            Projects
          </Link>
          <span aria-hidden>/</span>
          <span>{project.title}</span>
        </div>

        <header className="mt-5">
          <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-(--ink-soft)">
            {project.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs font-semibold">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--brand) underline decoration-(--line) underline-offset-4"
              >
                Visit live site ↗
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--ink-soft) underline decoration-(--line) underline-offset-4"
              >
                View code ↗
              </a>
            )}
          </div>
        </header>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y-[1.5px] border-(--line) py-5 sm:grid-cols-4">
          <div>
            <dt className="micro mb-1">Role</dt>
            <dd className="text-sm font-medium">{project.role}</dd>
          </div>
          <div>
            <dt className="micro mb-1">Timeline</dt>
            <dd className="text-sm font-medium">{project.year}</dd>
          </div>
          <div>
            <dt className="micro mb-1">Type</dt>
            <dd className="text-sm font-medium">{project.type}</dd>
          </div>
          <div>
            <dt className="micro mb-1">Stack</dt>
            <dd className="text-sm font-medium">{project.stack.slice(0, 2).join(", ")}</dd>
          </div>
        </dl>

        {project.image ? (
          <figure className="mt-10">
            <div className="hard-card overflow-hidden">
              <div className="flex items-center gap-2 border-b-[1.5px] border-(--ink) bg-(--brand-tint) px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full border border-(--ink) bg-(--paper)" />
                <span className="h-2.5 w-2.5 rounded-full border border-(--ink) bg-(--paper)" />
                <span className="h-2.5 w-2.5 rounded-full border border-(--ink) bg-(--paper)" />
                <span className="micro ml-2 truncate">
                  {hostname ?? project.title}
                </span>
              </div>
              <Image
                src={project.image}
                alt={project.imageAlt ?? `${project.title} screenshot`}
                width={1440}
                height={900}
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="w-full"
                priority
              />
            </div>
            <figcaption className="micro mt-2">
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-(--brand)"
                >
                  Live view · {hostname} ↗
                </a>
              ) : (
                project.title
              )}
            </figcaption>
          </figure>
        ) : (
          <div className="hard-card mt-10 flex min-h-48 flex-col items-center justify-center bg-(--brand-tint) p-10 text-center">
            <p className="micro mb-2">Case study</p>
            <p className="font-serif text-3xl font-semibold">{project.title}</p>
            <p className="micro mt-3">{project.stack.join(" · ")}</p>
          </div>
        )}

        <div className="mt-12 space-y-10">
          {project.sections.map((section) => (
            <section
              key={section.heading}
              className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10"
            >
              <h2 className="font-serif text-2xl font-semibold leading-tight">
                {section.heading}
              </h2>
              <div className="max-w-3xl">
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mb-3 leading-relaxed text-(--ink-soft)"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 leading-relaxed text-(--ink-soft)"
                      >
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
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t-[1.5px] border-(--ink) pt-6">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hard no-underline"
            >
              Visit live site ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-semibold text-(--ink-soft) underline decoration-(--line) underline-offset-4 transition-colors hover:text-(--brand)"
            >
              View code ↗
            </a>
          )}
          <Link
            href="/projects"
            className="ml-auto font-mono text-sm font-semibold text-(--ink-soft) underline decoration-(--line) underline-offset-4 transition-colors hover:text-(--brand)"
          >
            All projects
          </Link>
        </div>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="group mt-8 flex items-center justify-between gap-4 border-[1.5px] border-(--line) bg-(--surface) p-5 transition-colors hover:border-(--ink) hover:bg-(--brand-tint)"
        >
          <span>
            <span className="micro block">Next project</span>
            <span className="mt-1 block font-serif text-xl font-semibold">
              {nextProject.title}
            </span>
          </span>
          <span
            aria-hidden
            className="font-mono text-xl transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </article>
    </SiteShell>
  );
}
