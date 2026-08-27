import PlaceholderFrame from "./PlaceholderFrame";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col border-b border-graphite-light md:h-[100svh] md:min-h-[640px] md:items-end"
    >
      {/* Photo — its own block on mobile, full-bleed background from md up */}
      <div className="relative aspect-[4/3] w-full overflow-hidden md:absolute md:inset-0 md:aspect-auto">
        <PlaceholderFrame
          path="/photos/camera/DSC_3884.jpg"
          tone="amber"
          icon="aperture"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />

        {/* Viewfinder crosshair corners */}
        <Corner className="left-4 top-4 border-l border-t md:left-14 md:top-24" />
        <Corner className="right-4 top-4 border-r border-t md:right-14 md:top-24" />
        <Corner className="bottom-4 left-4 border-b border-l md:bottom-40 md:left-14" />
        <Corner className="bottom-4 right-4 border-b border-r md:bottom-40 md:right-14" />

        {/* Frame counter, top right — like a camera's shot count */}
        <div className="absolute right-4 top-4 z-10 text-right font-mono text-[11px] uppercase tracking-[0.18em] text-paper-dim md:right-14 md:top-8">
          <div>frame</div>
          <div className="text-safelight">001 / 024</div>
        </div>
      </div>

      {/* EXIF-style HUD, content — flows below the photo on mobile, overlays it at the bottom from md up */}
      <div className="relative z-10 w-full px-6 py-8 md:px-14 md:pb-14 md:pt-0">
        <div className="mb-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-dim">
          <span>f/1.8</span>
          <span>1/250s</span>
          <span>iso 400</span>
          <span>35mm</span>
          <span className="text-safelight">manual focus</span>
        </div>

        <h1 className="max-w-4xl font-display text-[13vw] leading-[0.92] tracking-tight text-paper sm:text-6xl md:text-7xl lg:text-[6.4rem]">
          I CHASE LIGHT
          <br />
          UNTIL IT <span className="text-safelight">CONFESSES</span>
          <br />
          SOMETHING TRUE.
        </h1>

        <div className="mt-8 flex flex-col gap-6 border-t border-graphite-light pt-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md font-body text-sm leading-relaxed text-paper-dim">
            Hadeer Mouwad — Photographing people, places, and the moments that
            make them worth remembering. Available worldwide for editorial, and
            campaign work.
          </p>
          <a
            href="#work"
            className="group inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper"
          >
            <span className="border-b border-safelight pb-1 transition-colors group-hover:text-safelight">
              View the contact sheet
            </span>
            <span aria-hidden="true" className="text-safelight">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute z-10 h-6 w-6 border-paper/40 ${className}`}
    />
  );
}
