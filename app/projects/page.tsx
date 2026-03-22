"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Menu } from "lucide-react";
import { siGithub } from "simple-icons";
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

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

const projects: Project[] = [];

export default function Projects() {
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
                  item === "Projects" ? "border-b border-slate-100" : ""
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
            className="text-6xl md:text-7xl font-serif text-slate-100 mb-6 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Projects
          </h1>
          <p
            className="text-lg md:text-xl text-soft font-serif mb-10 max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            A collection of my work, experiments, and creative endeavors.
          </p>

          <div
            className="mt-8 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:bg-white/12 transition-colors"
                >
                  <CardContent className="p-6 flex h-full flex-col">
                    <CardTitle className="mb-3 text-2xl group-hover:text-white transition-colors">
                      {project.title}
                    </CardTitle>
                    <p className="text-slate-50 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="font-mono text-[0.7rem]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-auto flex gap-3">
                      {project.github && (
                        <Button
                          asChild
                          variant="secondary"
                          size="sm"
                          className="normal-case tracking-normal"
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub Repository"
                          >
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              dangerouslySetInnerHTML={{ __html: siGithub.svg }}
                            />
                            GitHub
                          </a>
                        </Button>
                      )}
                      {project.link && (
                        <Button
                          asChild
                          variant="secondary"
                          size="sm"
                          className="normal-case tracking-normal"
                        >
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live
                          </a>
                        </Button>
                      )}
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
