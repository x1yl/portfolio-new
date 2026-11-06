import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "./components/SiteShell";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="micro mb-4">Errata</p>
        <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
          This page is missing from the edition.
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-(--ink-soft)">
          The link may be out of date, or the page moved somewhere else. Try
          one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-hard no-underline">
            Back home
          </Link>
          <Link
            href="/projects"
            className="font-mono text-sm font-semibold text-(--ink-soft) underline decoration-(--line) underline-offset-4 transition-colors hover:text-(--brand)"
          >
            Browse projects →
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
