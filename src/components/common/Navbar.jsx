import { useState } from "react";
import { NavLink } from "react-router-dom";

const LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAiU5CaOI8gKKTDE_fw1t9z6JtA9C1vN5ppyD8TG6ocmk2fGq1Fv5TQ72N2UvvmbCQdYNEQsplkiGKS7gfff1UyAOlP6nzMOP5Iic9N4KYg8wzOBpbhe0fAm6c44cVsCdAaXGVDX3qOYL6iyIPUuETI-97P3fAu_FzpiV6YfQKhrY8xWpkrr--6Ea79mP6vQxenhGhyZiRCpPJqMqHfBG2XNamNiqYlcGIaJ898PcOHdFXHKlx3mSTAcpq982EcPTIn1Q";

// `to: null` marks pages that are not built yet (rendered as inert links).
const LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Admissions", to: "/admissions" },
  { label: "Academics", to: null },
  { label: "Gallery", to: null },
  { label: "Contact", to: null },
  { label: "Login", to: null },
];

const base = "text-sm font-bold transition-colors";
const inactive = "text-on-surface-variant hover:text-primary";
const active = "border-b-4 border-primary pb-1 text-primary";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const renderLink = (link, mobile = false) => {
    if (!link.to) {
      return (
        <a
          key={link.label}
          href="#"
          onClick={() => mobile && setOpen(false)}
          className={
            mobile
              ? "rounded-2xl px-4 py-3 text-base font-bold text-on-surface-variant transition-colors hover:bg-surface-variant/40 hover:text-primary"
              : `${base} ${inactive}`
          }
        >
          {link.label}
        </a>
      );
    }
    return (
      <NavLink
        key={link.label}
        to={link.to}
        end={link.to === "/"}
        onClick={() => mobile && setOpen(false)}
        className={({ isActive }) =>
          mobile
            ? `rounded-2xl px-4 py-3 text-base font-bold transition-colors ${
                isActive ? "bg-surface-variant/40 text-primary" : "text-on-surface-variant hover:bg-surface-variant/40 hover:text-primary"
              }`
            : `${base} ${isActive ? active : inactive}`
        }
      >
        {link.label}
      </NavLink>
    );
  };

  return (
    <header className="glass-nav sticky top-0 z-50 mx-auto flex w-full max-w-[1200px] items-center justify-between rounded-b-3xl border-b-4 border-outline-variant px-6 py-4 shadow-md shadow-primary/10">
      <NavLink to="/" className="flex items-center gap-3">
        <img src={LOGO} alt="Play Place Logo" className="h-11 w-auto" />
        <span className="text-2xl font-extrabold tracking-tight text-on-background md:text-3xl">
          Play Place
        </span>
      </NavLink>

      <nav className="hidden items-center gap-6 md:flex">{LINKS.map((l) => renderLink(l))}</nav>

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
          {LINKS.map((l) => renderLink(l, true))}
        </nav>
      )}
    </header>
  );
}
