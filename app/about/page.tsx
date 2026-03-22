"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { ParallaxLink } from "@/app/components/ParallaxLink";
import { Card, CardContent, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";

const skills = {
  Languages: ["TypeScript", "JavaScript", "Python", "Java", "HTML/CSS"],
  Frameworks: ["Next.js", "React", "Node.js", "Express", "Tailwind CSS"],
  Tools: ["Git", "VS Code", "Docker"],
  Interests: ["Backend", "Auth & Database", "Open Source", "APIs"],
};

export default function About() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const bgMove = 20;

  return (
    <main className="relative w-screen min-h-screen overflow-x-hidden text-strong">
      <div
        className="fixed -inset-12.5 w-[calc(100%+100px)] h-[calc(100%+100px)] transition-transform duration-100 ease-out pointer-events-none"
        style={{
          transform: `translate(${-mousePos.x * bgMove}px, ${
            -mousePos.y * bgMove
          }px)`,
        }}
      >
        <Image
          src="/background.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col p-8 pb-24 md:p-12 md:pb-12">
        <header className="relative z-50 flex justify-between items-start text-slate-100 mb-16">
          <Link
            href="/"
            className="font-serif tracking-widest opacity-70 hover:opacity-100 transition-opacity animate-cascade"
          >
            © Kevin Zheng
          </Link>
          <nav className="hidden md:flex font-serif gap-8 tracking-wide">
            {["Projects", "About", "Contact"].map((item, i) => (
              <ParallaxLink
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`px-4 py-2 text-slate-50 hover:underline hover:opacity-95 transition-opacity animate-cascade ${
                  item === "About" ? "border-b border-slate-100" : ""
                }`}
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                {item}
              </ParallaxLink>
            ))}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="md:hidden text-strong"
                aria-label="Open navigation menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Navigate</SheetTitle>
                <SheetDescription>
                  Quick links to portfolio sections.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-3">
                {["Home", "Projects", "About", "Contact"].map((item) => (
                  <Button
                    key={item}
                    asChild
                    variant="secondary"
                    className="justify-start normal-case tracking-normal"
                  >
                    <a href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                      {item}
                    </a>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <div className="max-w-7xl mx-auto w-full">
          <h1
            className="text-6xl md:text-7xl font-serif text-slate-100 mb-8 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            About Me
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div
              className="space-y-6 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-lg text-slate-50 leading-relaxed font-serif">
                Hi, I&apos;m Kevin Zheng, a 16-year-old developer based in
                Brooklyn, New York. I focus mainly on backend and database
                development.
              </p>
              <p className="text-lg text-slate-50 leading-relaxed font-serif">
                I enjoy creating passion projects that challenge my skills and
                allow me to learn new technologies. I&apos;m always learning and
                exploring different areas of software development.
              </p>
            </div>

            <Card
              className="animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              <CardContent className="p-8">
                <CardTitle className="mb-6 text-3xl">Quick Facts</CardTitle>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-slate-100 mr-3">📍</span>
                    <div>
                      <span className="text-slate-100 font-serif">
                        Location
                      </span>
                      <p className="text-slate-100">Brooklyn, New York</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-100 mr-3">🎓</span>
                    <div>
                      <span className="text-slate-100 font-serif">
                        Education
                      </span>
                      <p className="text-slate-100">High School Student</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-100 mr-3">💻</span>
                    <div>
                      <span className="text-slate-100 font-serif">Focus</span>
                      <p className="text-slate-100">Backend Development</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <h2
              className="text-4xl md:text-5xl font-serif text-slate-100 mb-8 animate-fade-up"
              style={{ animationDelay: "0.6s" }}
            >
              Skills & Technologies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, items], i) => (
                <Card
                  key={category}
                  className="animate-fade-up"
                  style={{ animationDelay: `${0.7 + i * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-serif text-slate-100 mb-4">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="px-4 py-2 text-[0.7rem] hover:bg-white/15"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
