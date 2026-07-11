import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const LOGO = "/favicon.png";

const PRIMARY_LINKS = [
  { label: "Home", to: "/", icon: "home" },
  { label: "Admissions", to: "/admissions", icon: "how_to_reg" },
  { label: "Academics", to: "/academics", icon: "menu_book" },
  { label: "Contact", to: "/contact", icon: "call" },
];

const MORE_LINKS = [
  { label: "About", to: "/about" },
  { label: "Calendar", to: "/calendar" },
  { label: "Gallery", to: "/gallery" },
  { label: "Login", to: "/login" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="glass-nav sticky top-0 z-50 w-full border-b-4 border-outline-variant shadow-md shadow-primary/10">
      <div className="relative mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={() => setOpen(false)}>
          <img
            src={LOGO}
            alt="Play Place International School"
            className="h-10 w-10 shrink-0 rounded-xl object-contain sm:h-11 sm:w-11"
            width="44"
            height="44"
            loading="eager"
            decoding="async"
          />
          <div className="min-w-0 leading-tight">
            <span className="block truncate text-lg font-extrabold tracking-tight text-on-background sm:text-2xl">
              Play Place
            </span>
            <span className="hidden text-[10px] font-bold uppercase tracking-wide text-on-surface-variant sm:block">
              International School · Aligarh
            </span>
          </div>
        </NavLink>

        {/* Desktop / large tablet */}
        <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
          {[...PRIMARY_LINKS, ...MORE_LINKS.filter((l) => l.label !== "Login")].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-bold transition-colors xl:px-4 ${
                  isActive ? "bg-primary-container/30 text-primary" : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `rounded-full px-3 py-2 text-sm font-bold ${isActive ? "text-primary" : "text-on-surface-variant hover:text-primary"}`
            }
          >
            Login
          </NavLink>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/admissions#apply-form"
            className="bouncy-button hidden rounded-full bg-primary px-4 py-2 text-xs font-bold text-white sm:inline-flex lg:px-5 lg:text-sm"
          >
            Apply
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-variant/40 text-on-background lg:hidden"
          >
            <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 top-[65px] z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav className="relative mx-3 max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-3xl border-2 border-surface-variant bg-surface-container-lowest p-4 shadow-2xl">
            <div className="mb-4 grid grid-cols-2 gap-2">
              {PRIMARY_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 rounded-2xl px-3 py-4 text-center text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-primary-container/25 text-primary"
                        : "bg-surface-container-low text-on-surface-variant"
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-2xl">{link.icon}</span>
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="space-y-1 border-t-2 border-surface-variant pt-3">
              {MORE_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-base font-bold ${
                      isActive ? "bg-surface-variant/50 text-primary" : "text-on-surface-variant"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <Link
              to="/admissions#apply-form"
              onClick={() => setOpen(false)}
              className="bouncy-button mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-white"
            >
              <span className="material-symbols-outlined">edit_note</span>
              Apply for Admission
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
