"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center rounded-md border-[1.5px] border-(--ink) bg-(--surface) px-4 py-2.5 font-semibold text-(--ink) shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-x-px hover:-translate-y-px"
    >
      Print
    </button>
  );
}
