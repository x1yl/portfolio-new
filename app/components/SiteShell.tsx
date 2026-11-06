"use client";
import Link from "next/link";
import { ParallaxLink } from "./ParallaxLink";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { SITE } from "../lib/site";

const LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Résumé", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function SiteShell({
  children,
  animateNav = false,
}: {
  children: React.ReactNode;
  animateNav?: boolean;
}) {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-(--surface) px-4 py-2 font-semibold text-(--ink) focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:border-[1.5px] focus:border-(--ink)"
      >
        Skip to content
      </a>

      {/* static background, tinted to sit on the paper */}
      <div
        aria-hidden
        className="site-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.webp')" }}
      />
      <div
        aria-hidden
        className="site-fade absolute inset-0 bg-linear-to-b from-transparent via-transparent to-(--paper)"
      />

      <header className="sticky top-0 z-20 flex items-center justify-between border-b-2 border-(--ink) bg-(--paper) px-6 py-4 print:hidden md:px-12">
        <ParallaxLink
          href="/"
          className={`font-serif text-xl font-semibold tracking-tight ${animateNav ? "animate-cascade" : ""}`}
          style={animateNav ? { animationDelay: "0.1s" } : undefined}
        >
          Kevin Zheng
        </ParallaxLink>
        <div className="flex items-center gap-3">
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {LINKS.map((item, i) => (
              <ParallaxLink
                key={item.href}
                href={item.href}
                className={`micro px-4 py-2 text-[12px]! transition-colors hover:text-(--brand) ${animateNav ? "animate-cascade" : ""}`}
                style={
                  animateNav
                    ? { animationDelay: `${0.2 + i * 0.15}s` }
                    : undefined
                }
              >
                {item.label}
              </ParallaxLink>
            ))}
          </nav>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-md border-[1.5px] border-(--ink) bg-(--surface) shadow-[2px_2px_0_var(--ink)] transition-all hover:-translate-x-px hover:-translate-y-px hover:shadow-[3px_3px_0_var(--ink)] active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0_var(--ink)] md:hidden"
              >
                <Menu className="h-5 w-5" strokeWidth={2.25} />
              </button>
            </SheetTrigger>
            <SheetContent className="w-64">
              <SheetTitle className="sr-only">Site menu</SheetTitle>
              <SheetDescription className="sr-only">
                Links to the main pages of Kevin Zheng&apos;s portfolio.
              </SheetDescription>
              <nav
                aria-label="Mobile navigation"
                className="mt-10 flex flex-col gap-1"
              >
                {LINKS.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="rounded-lg px-4 py-3 font-serif text-xl transition-colors hover:bg-(--brand-tint)"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div id="main-content" className="relative z-10 flex-1">
        {children}
      </div>

      <footer className="micro relative z-10 flex flex-col justify-between gap-3 px-6 pb-20 pt-6 print:hidden sm:flex-row sm:pb-6 md:px-12">
        <span>
          © {new Date().getFullYear()} Kevin Zheng · Brooklyn, NY
        </span>
        <nav
          aria-label="Social links"
          className="flex flex-wrap gap-x-5 gap-y-2 sm:pr-16"
        >
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-(--brand)"
          >
            GitHub
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-(--brand)"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="transition-colors hover:text-(--brand)"
          >
            Email
          </a>
          <Link
            href="/resume"
            className="transition-colors hover:text-(--brand)"
          >
            Résumé
          </Link>
        </nav>
      </footer>
    </main>
  );
}
