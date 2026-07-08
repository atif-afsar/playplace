import { useState } from "react";

const LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAiU5CaOI8gKKTDE_fw1t9z6JtA9C1vN5ppyD8TG6ocmk2fGq1Fv5TQ72N2UvvmbCQdYNEQsplkiGKS7gfff1UyAOlP6nzMOP5Iic9N4KYg8wzOBpbhe0fAm6c44cVsCdAaXGVDX3qOYL6iyIPUuETI-97P3fAu_FzpiV6YfQKhrY8xWpkrr--6Ea79mP6vQxenhGhyZiRCpPJqMqHfBG2XNamNiqYlcGIaJ898PcOHdFXHKlx3mSTAcpq982EcPTIn1Q";

const LINKS = ["Home", "About", "Admissions", "Academics", "Gallery", "Contact", "Login"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-nav sticky top-0 z-50 mx-auto flex w-full max-w-[1200px] items-center justify-between rounded-b-3xl border-b-4 border-outline-variant px-6 py-4 shadow-md shadow-primary/10">
      <div className="flex items-center gap-3">
        <img src={LOGO} alt="Play Place Logo" className="h-11 w-auto" />
        <span className="text-2xl font-extrabold tracking-tight text-on-background md:text-3xl">
          Play Place
        </span>
      </div>

      <nav className="hidden items-center gap-6 md:flex">
        {LINKS.map((link, i) => (
          <a
            key={link}
            href="#"
            className={
              i === 0
                ? "border-b-4 border-primary pb-1 text-sm font-bold text-primary"
                : "text-sm font-bold text-on-surface-variant transition-colors hover:text-primary"
            }
          >
            {link}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <button className="bouncy-button hidden rounded-full bg-primary px-6 py-2 text-sm font-bold text-white transition-all hover:scale-105 sm:block">
          Admissions Open
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-full text-on-background md:hidden"
        >
          <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
        </button>
      </div>

      {open && (
        <nav className="absolute left-0 top-full mt-2 flex w-full flex-col gap-1 rounded-3xl border-2 border-surface-variant bg-surface-container-lowest p-4 shadow-lg md:hidden">
          {LINKS.map((link) => (
            <a
              key={link}
              href="#"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-base font-bold text-on-surface-variant transition-colors hover:bg-surface-variant/40 hover:text-primary"
            >
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
