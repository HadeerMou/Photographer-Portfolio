"use client";

import { useEffect, useMemo, useState } from "react";
import { archivePhotos, type Span } from "@/lib/archivePhotos";
import PlaceholderFrame from "./PlaceholderFrame";
import { useReveal } from "@/lib/useReveal";

const spanClass: Record<Span, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

export default function Gallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useReveal<HTMLDivElement>();
  const photos = useMemo(() => archivePhotos.filter((p) => p.featured), []);
  const active = photos.find((p) => p.id === activeId) ?? null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="work" className="relative border-b border-graphite-light px-6 py-24 md:px-14 md:py-32">
      <SectionHeading
        eyebrow="Roll 01 — Selects"
        title="THE CONTACT SHEET"
        note="Click any frame to open it full size. Every image is tagged the way it left the camera."
      />

      <div
        ref={containerRef}
        className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 grid-flow-dense md:auto-rows-[220px] md:grid-cols-4 md:gap-4"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setActiveId(photo.id)}
            className={`reveal group relative overflow-hidden border border-graphite-light text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-safelight ${spanClass[photo.span ?? "square"]}`}
            style={{ transitionDelay: `${(i % 8) * 60}ms` }}
          >
            <PlaceholderFrame path={photo.path} tone={photo.tone} className="transition-transform duration-500 group-hover:scale-[1.04]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper-dim">
                {photo.subtype ?? photo.type}
              </span>
              <span className="font-mono text-[10px] text-safelight">{photo.frame}</span>
            </div>
            <span className="absolute left-2 top-2 rounded-sm bg-ink/70 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-paper-dim">
              {photo.frame}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.caption}, frame ${active.frame}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-6 backdrop-blur-sm"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/5] w-full md:aspect-[3/2]">
              <PlaceholderFrame path={active.path} tone={active.tone} icon="film" />
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-paper-dim">
              <span>{active.caption} — {active.subtype ?? active.type}</span>
              <span className="text-safelight">Frame {active.frame}</span>
            </div>
            <button
              onClick={() => setActiveId(null)}
              className="absolute -top-10 right-0 font-mono text-xs uppercase tracking-[0.16em] text-paper-dim hover:text-safelight md:-top-2 md:-right-12"
              aria-label="Close"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-safelight">{eyebrow}</p>
        <h2 className="mt-2 font-display text-4xl tracking-tight text-paper md:text-6xl">{title}</h2>
      </div>
      {note && <p className="max-w-xs text-sm leading-relaxed text-paper-dim">{note}</p>}
    </div>
  );
}
