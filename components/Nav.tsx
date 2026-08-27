"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#bts", label: "Behind the Scenes" },
  { href: "/#about", label: "About" },
  { href: "/archive", label: "Full Archive" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

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
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-paper transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-paper transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-graphite-light/70 bg-ink px-6 py-6 font-mono text-sm uppercase tracking-[0.18em] text-paper-dim md:hidden">
          <ul className="flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block transition-colors hover:text-safelight"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
