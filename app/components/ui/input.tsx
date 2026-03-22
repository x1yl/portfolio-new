"use client";

import * as React from "react";

import { cn } from "@/app/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-lg border border-white/30 bg-white/14 px-4 py-3 text-base text-slate-50 placeholder:text-slate-100/85 outline-none backdrop-blur-sm transition-[border-color,background-color,box-shadow] file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-white/55 focus-visible:ring-2 focus-visible:ring-white/55",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
