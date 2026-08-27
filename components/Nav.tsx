const links = [
  { href: "/#work", label: "Work" },
  { href: "/#bts", label: "Behind the Scenes" },
  { href: "/#about", label: "About" },
  { href: "/archive", label: "Full Archive" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-graphite-light/70 bg-ink/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-14">
        <a
          href="/"
          className="font-display text-lg tracking-wider text-paper"
        >
          HADEER MOUWAD
        </a>
        <nav className="hidden gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-dim md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-safelight"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="/#contact"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-safelight md:hidden"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
