"use client";

import { useState } from "react";
import { SITE } from "../lib/site";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-(--brand) underline underline-offset-4"
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
