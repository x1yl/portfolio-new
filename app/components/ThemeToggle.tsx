"use client";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme !== "dark";
    root.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("kz-theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="flex h-9 w-9 items-center justify-center rounded-md border-[1.5px] border-(--line) bg-(--surface) text-(--ink) transition-colors hover:border-(--ink)"
    >
      <Moon className="theme-icon-light h-4 w-4" />
      <Sun className="theme-icon-dark h-4 w-4" />
    </button>
  );
}
