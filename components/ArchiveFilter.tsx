"use client";

import { useMemo, useState } from "react";
import { archivePhotos, type Source } from "@/lib/archivePhotos";
import PlaceholderFrame from "./PlaceholderFrame";
import { useReveal } from "@/lib/useReveal";

const PAGE_SIZE = 8;

const SOURCES: { value: Source; label: string }[] = [
  { value: "camera", label: "Camera" },
  { value: "phone", label: "Phone" },
];

export default function ArchiveFilter() {
  const [source, setSource] = useState<Source>("camera");
  const [type, setType] = useState<string | null>(null);
  const [subtype, setSubtype] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useReveal<HTMLDivElement>();

  const types = useMemo(() => {
    const seen = new Set<string>();
    archivePhotos
      .filter((p) => p.source === source)
      .forEach((p) => seen.add(p.type));
    return Array.from(seen);
  }, [source]);

  const activeType = type && types.includes(type) ? type : types[0] ?? null;

  const subtypes = useMemo(() => {
    const seen = new Set<string>();
    archivePhotos
      .filter((p) => p.source === source && p.type === activeType && p.subtype)
      .forEach((p) => seen.add(p.subtype as string));
    return Array.from(seen);
  }, [source, activeType]);

  const activeSubtype =
    subtypes.length === 0
      ? null
      : subtype && subtypes.includes(subtype)
        ? subtype
        : subtypes[0];

  const filtered = useMemo(
    () =>
      archivePhotos.filter(
        (p) =>
          p.source === source &&
          p.type === activeType &&
          (activeSubtype === null || p.subtype === activeSubtype)
      ),
    [source, activeType, activeSubtype]
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE
  );
  const active = archivePhotos.find((p) => p.id === activeId) ?? null;

  function selectSource(next: Source) {
    setSource(next);
    setType(null);
    setSubtype(null);
    setPage(0);
  }

  function selectType(next: string) {
    setType(next);
    setSubtype(null);
    setPage(0);
  }

  function selectSubtype(next: string) {
    setSubtype(next);
    setPage(0);
  }

  return (
    <div>
      <div className="flex flex-col gap-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-safelight">
            Step 01 — Shot on
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SOURCES.map((s) => (
              <button
                key={s.value}
                onClick={() => selectSource(s.value)}
                className={`border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                  source === s.value
                    ? "border-safelight text-safelight"
                    : "border-graphite-light text-paper-dim hover:text-paper"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-safelight">
            Step 02 — Type
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => selectType(t)}
                className={`border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                  activeType === t
                    ? "border-safelight text-safelight"
                    : "border-graphite-light text-paper-dim hover:text-paper"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {subtypes.length > 0 && (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-safelight">
              Step 03 — Brand
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {subtypes.map((st) => (
                <button
                  key={st}
                  onClick={() => selectSubtype(st)}
                  className={`border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                    activeSubtype === st
                      ? "border-safelight text-safelight"
                      : "border-graphite-light text-paper-dim hover:text-paper"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-dim">
        {filtered.length} {filtered.length === 1 ? "frame" : "frames"} — page{" "}
        {currentPage + 1} of {pageCount}
      </p>

      <div
        ref={containerRef}
        className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
      >
        {pageItems.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setActiveId(photo.id)}
            className="reveal group relative aspect-square overflow-hidden border border-graphite-light text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-safelight"
            style={{ transitionDelay: `${(i % 8) * 60}ms` }}
          >
            <PlaceholderFrame
              path={photo.path}
              tone={photo.tone}
              className="transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-paper-dim">
                {photo.caption}
              </span>
            </div>
            <span className="absolute left-2 top-2 rounded-sm bg-ink/70 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-paper-dim">
              {photo.frame}
            </span>
          </button>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-[0.16em] text-paper-dim">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="border border-graphite-light px-3 py-1.5 transition-colors hover:text-safelight disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Prev
          </button>
          <span>
            {currentPage + 1} / {pageCount}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={currentPage >= pageCount - 1}
            className="border border-graphite-light px-3 py-1.5 transition-colors hover:text-safelight disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}

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
              <span>
                {active.caption} — {active.subtype ?? active.type}
              </span>
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
    </div>
  );
}
