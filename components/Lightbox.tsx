"use client";

import { useEffect, type ComponentProps, type ReactNode } from "react";
import FullFrame from "./FullFrame";

export default function Lightbox({
  path,
  tone,
  label,
  caption,
  meta,
  onClose,
}: {
  path: string;
  tone?: ComponentProps<typeof FullFrame>["tone"];
  label: string;
  caption: ReactNode;
  meta: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-6 backdrop-blur-sm"
      // Any click that isn't on the photo/video itself closes the lightbox.
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("img, video")) onClose();
      }}
    >
      <div className="relative w-full max-w-6xl">
        <FullFrame path={path} tone={tone} alt={label} />
        <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-paper-dim">
          <span>{caption}</span>
          <span className="text-safelight">{meta}</span>
        </div>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 rounded-sm bg-ink/70 px-2 py-1 font-mono text-xs uppercase tracking-[0.16em] text-paper-dim hover:text-safelight md:-right-12 md:-top-2 md:bg-transparent md:px-0 md:py-0"
          aria-label="Close"
        >
          Close ✕
        </button>
      </div>
    </div>
  );
}
