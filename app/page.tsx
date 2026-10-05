"use client";
import { useEffect, useState } from "react";
import SiteShell from "./components/SiteShell";
import Signature from "./components/Signature";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsActive(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <SiteShell animateNav>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="w-full max-w-5xl">
          <Signature active={isActive} />
        </div>

        <p className="mt-8 font-serif italic text-xl md:text-2xl text-(--ink-soft)">
          {"17 yo, based in Brooklyn, New York.".split(" ").map((w, i) => (
            <span
              key={i}
              className="animate-fade-up"
              style={{ animationDelay: `${3.4 + i * 0.09}s` }}
            >
              {w}{" "}
            </span>
          ))}
        </p>

        <a
          href="/Kevin Zheng Resume.pdf"
          download
          className="btn-hard mt-12 animate-fade-up no-underline"
          style={{ animationDelay: "4.1s" }}
        >
          Resume ↓
        </a>
      </div>
    </SiteShell>
  );
}
