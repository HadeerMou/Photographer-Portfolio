const socials = [
  { label: "Instagram", href: "https://www.instagram.com/h_pic" },
  { label: "Email", href: "mailto:hadeermouwad@gmail.com" },
  /* { label: "Behance", href: "https://behance.net" }, */
];

export default function Footer() {
  return (
    <footer id="contact" className="relative px-6 py-24 md:px-14 md:py-32">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-safelight">
            Roll complete — 024 exposures
          </p>
          <h2 className="mt-2 max-w-xl font-display text-4xl leading-[0.95] tracking-tight text-paper md:text-6xl">
            LET&rsquo;S SHOOT SOMETHING TRUE.
          </h2>
          <a
            href="mailto:hello@alexamoran.com"
            className="mt-6 inline-block border-b border-safelight pb-1 font-mono text-sm uppercase tracking-[0.16em] text-paper transition-colors hover:text-safelight"
          >
            Hadeermouwad@gmail.com
          </a>
        </div>

        <nav className="flex gap-6 font-mono text-xs uppercase tracking-[0.16em] text-paper-dim">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              className="transition-colors hover:text-safelight"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-16 flex flex-col gap-2 border-t border-graphite-light pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-dim md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Hadeer Mouwad Photography</span>
        <span>Based in Cairo City — available worldwide</span>
        <span className="text-safelight">— END OF ROLL —</span>
      </div>
    </footer>
  );
}
