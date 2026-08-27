import PlaceholderFrame from "./PlaceholderFrame";

const kit = ["Digital Camera", "Mobile Photography"];

export default function About() {
  return (
    <section
      id="about"
      className="relative border-b border-graphite-light px-6 py-24 md:px-14 md:py-32"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div className="relative aspect-[5/5] w-full">
          <PlaceholderFrame
            path="/bts/IMG_3366.JPG"
            tone="paper"
            icon="camera"
          />
          <span className="absolute -bottom-4 left-4 rounded-sm border border-graphite-light bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-dim">
            Frame 000 — the photographer
          </span>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-safelight">
            Photographer&rsquo;s Statement
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-tight text-paper md:text-5xl">
            ABOUT HADEER
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-paper-dim">
            <p>
              I’m a photographer working across portrait, lifestyle, landscape,
              nature, travel, and product photography. My work is driven by a
              curiosity for people, places, and the details of everyday life,
              with an emphasis on natural moments and considered composition.
            </p>
            <p>
              I work interchangeably with both digital cameras and mobile
              photography, choosing the medium that best suits the subject and
              the story. I’m drawn to natural light, authentic moments, strong
              compositions, and images that feel honest rather than overly
              constructed.
            </p>
            <p>
              Available for editorial, campaign, lifestyle, portrait, product,
              and travel work worldwide — currently based in Cairo.
            </p>
          </div>

          <div className="mt-10 border-t border-graphite-light pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-dim">
              Kit
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {kit.map((item) => (
                <li
                  key={item}
                  className="font-mono text-xs text-paper before:mr-2 before:text-safelight before:content-['—']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
