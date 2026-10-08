"use client";
import { useEffect, useState } from "react";
import { ParallaxLink } from "./ParallaxLink";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const LINKS = ["Projects", "About", "Contact"];

export default function SiteShell({
  children,
  animateNav = false,
}: {
  children: React.ReactNode;
  animateNav?: boolean;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setPos({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col">
      {/* parallax background, tinted to sit on the paper */}
      <div
        className="absolute inset-[-3%] bg-cover bg-center opacity-[0.14] dark:opacity-[0.18]"
        style={{
          backgroundImage: "url('/background.png')",
          mixBlendMode: "multiply",
          transform: `translate(${pos.x * -18}px, ${pos.y * -18}px) scale(1.06)`,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-(--paper)" />

      <header className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-12 py-4 bg-(--paper) border-b-2 border-(--ink)">
        <ParallaxLink
          href="/"
          className={`font-serif text-xl font-semibold tracking-tight ${animateNav ? "animate-cascade" : ""}`}
          style={animateNav ? { animationDelay: "0.1s" } : undefined}
        >
          Kevin Zheng
        </ParallaxLink>
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((item, i) => (
              <ParallaxLink
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`micro text-[12px]! px-4 py-2 hover:text-(--brand) transition-colors ${animateNav ? "animate-cascade" : ""}`}
                style={
                  animateNav
                    ? { animationDelay: `${0.2 + i * 0.15}s` }
                    : undefined
                }
              >
                {item}
              </ParallaxLink>
            ))}
          </nav>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="md:hidden flex items-center justify-center w-10 h-10 bg-(--surface) border-[1.5px] border-(--ink) rounded-md shadow-[2px_2px_0_var(--ink)] transition-all hover:-translate-x-px hover:-translate-y-px hover:shadow-[3px_3px_0_var(--ink)] active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0_var(--ink)]"
              >
                <Menu className="h-5 w-5" strokeWidth={2.25} />
              </button>
            </SheetTrigger>
            <SheetContent className="w-64 border-l-2 border-(--ink) bg-(--paper)">
              <nav className="flex flex-col gap-1 mt-10">
                {LINKS.map((item) => (
                  <ParallaxLink
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="px-4 py-3 rounded-lg font-serif text-xl hover:bg-(--brand-tint) transition-colors"
                  >
                    {item}
                  </ParallaxLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="relative z-10 flex-1">{children}</div>

      <footer className="relative z-10 px-6 md:px-12 py-6 flex justify-between micro">
        <span>© {new Date().getFullYear()} Kevin Zheng</span>
      </footer>
    </main>
  );
}
