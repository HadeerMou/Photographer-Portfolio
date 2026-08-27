"use client";

import { btsItems } from "@/lib/bts";
import PlaceholderFrame from "./PlaceholderFrame";
import { SectionHeading } from "./Gallery";
import { useReveal } from "@/lib/useReveal";

export default function BTS() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section id="bts" className="relative border-b border-graphite-light bg-ink-raised px-6 py-24 md:px-14 md:py-32">
      <div className="flex items-start justify-between gap-4">
        <SectionHeading
          eyebrow="Reel 04 — Workprint"
          title="BEHIND THE SCENES"
          note="Raw clips and stills from set — rigging light, scouting locations, and the mess between frames."
        />
        <div className="hidden shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-signal md:flex">
          <span className="tally-dot h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
          Recording
        </div>
      </div>

      <div ref={containerRef} className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {btsItems.map((item, i) => (
          <div
            key={item.id}
            className="reveal group relative aspect-video overflow-hidden border border-graphite-light"
            style={{ transitionDelay: `${(i % 6) * 70}ms` }}
          >
            <PlaceholderFrame
              path={item.path}
              tone={item.tone}
              icon={item.kind === "video" ? "film" : "camera"}
              className="transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {item.kind === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/50 bg-ink/50 backdrop-blur-sm transition-colors group-hover:border-safelight group-hover:text-safelight">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-paper" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            )}

            <div className="absolute left-2 top-2 flex items-center gap-1.5 rounded-sm bg-ink/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-paper-dim">
              {item.kind === "video" ? (
                <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-safelight" aria-hidden="true" />
              )}
              {item.kind}
            </div>
            <span className="absolute right-2 top-2 rounded-sm bg-ink/70 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.05em] text-paper-dim">
              {item.timecode}
            </span>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3">
              <p className="font-body text-xs text-paper">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-dim">
        Swap files into <span className="text-safelight">/public/bts</span> and point each entry
        in <span className="text-safelight">lib/bts.ts</span> at your own clips or photos.
      </p>
    </section>
  );
}
