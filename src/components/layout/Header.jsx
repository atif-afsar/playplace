import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MAIN_NAV } from "../../data/navigation";
import { CONTACT, SITE, telHref } from "../../config/site";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Logo from "./Logo";

const linkBase = "relative rounded-full px-3 py-2 text-[0.95rem] font-bold transition-colors";
const linkState = ({ isActive }) => `${linkBase} ${isActive ? "text-coral" : "text-navy hover:text-coral"}`;

function Dropdown({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const panelId = useId();
  const { pathname } = useLocation();
  const active = item.children.some((c) => pathname.startsWith(c.to));

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`${linkBase} inline-flex items-center gap-0.5 ${active ? "text-coral" : "text-navy hover:text-coral"}`}
      >
        {item.label}
        <Icon name="expand_more" className={`!text-xl transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div id={panelId} hidden={!open} className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3">
        <ul className="animate-pop rounded-3xl border border-line bg-white p-2 shadow-lift">
          {item.children.map((child) => (
            <li key={child.to}>
              <NavLink
                to={child.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-pink-soft ${isActive ? "bg-pink-soft" : ""}`
                }
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-soft text-navy transition-colors group-hover:bg-coral group-hover:text-white">
                  <Icon name={child.icon} className="!text-xl" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-navy">{child.label}</span>
                  <span className="block text-xs text-muted">{child.description}</span>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const MOBILE_ICONS = {
  "/": { icon: "home", tone: "bg-pink-soft text-coral" },
  "/about": { icon: "favorite", tone: "bg-green-soft text-green-ink" },
  "/academics": { icon: "menu_book", tone: "bg-lilac-soft text-[#8a4fd0]" },
  "/admissions": { icon: "how_to_reg", tone: "bg-yellow-soft text-[#a06c00]" },
  "/gallery": { icon: "photo_camera", tone: "bg-blue-soft text-blue" },
};

/**
 * Full-screen mobile menu. Rendered in a portal on <body> because the header
 * uses backdrop-filter, which would otherwise trap a `position: fixed` child
 * inside the header's own 72px box.
 */
function MobileMenu({ id, onClose }) {
  const firstLinkRef = useRef(null);
  const phone = CONTACT.phones[0];

  useEffect(() => {
    firstLinkRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose(true);
    const onResize = () => window.innerWidth >= 1024 && onClose();
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [onClose]);

  const simple = MAIN_NAV.filter((i) => !i.children);
  const groups = MAIN_NAV.filter((i) => i.children);

  return createPortal(
    <div
      id={id}
      className="fixed inset-x-0 bottom-0 top-[4.5rem] z-[45] overflow-y-auto overscroll-contain bg-white lg:hidden"
    >
      <nav aria-label="Mobile" className="mx-auto max-w-xl animate-fade-up px-5 pb-10 pt-5 [animation-duration:0.35s]">
        <ul className="grid grid-cols-2 gap-3">
          {simple.map((item, index) => {
            const meta = MOBILE_ICONS[item.to] || MOBILE_ICONS["/"];
            return (
              <li key={item.to} className={index === 0 ? "col-span-2" : ""}>
                <NavLink
                  ref={index === 0 ? firstLinkRef : undefined}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    `flex h-full min-w-0 items-center gap-2.5 rounded-2xl border-2 p-3 text-[0.95rem] font-bold transition-colors sm:gap-3 sm:p-3.5 sm:text-base ${
                      isActive ? "border-coral bg-pink-soft text-coral" : "border-line text-navy active:bg-cream"
                    }`
                  }
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${meta.tone}`}>
                    <Icon name={meta.icon} className="!text-[1.3rem]" />
                  </span>
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {groups.map((g) => (
          <div key={g.label} className="mt-6 rounded-3xl bg-blue-soft p-3">
            <p className="px-2 pb-2 pt-1 text-xs font-extrabold uppercase tracking-[0.14em] text-coral">{g.label}</p>
            <ul className="space-y-1.5">
              {g.children.map((child) => (
                <li key={child.to}>
                  <NavLink
                    to={child.to}
                    onClick={() => onClose()}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-2xl p-3 transition-colors ${isActive ? "bg-white shadow-soft" : "active:bg-white"}`
                    }
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-navy">
                      <Icon name={child.icon} className="!text-[1.3rem]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold text-navy">{child.label}</span>
                      <span className="block text-xs text-muted">{child.description}</span>
                    </span>
                    <Icon name="chevron_right" className="ml-auto !text-xl text-muted" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-6 grid gap-3">
          <Button to="/contact" size="lg" onClick={() => onClose()} className="w-full !justify-between">
            Contact us
          </Button>
          <a
            href={telHref(phone)}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-line py-3 font-bold text-navy active:bg-cream"
          >
            <Icon name="call" className="!text-xl text-green-ink" />
            Call {phone}
          </a>
        </div>
      </nav>
    </div>,
    document.body
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback((returnFocus) => {
    setMenuOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled || menuOpen ? "shadow-soft" : ""
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:h-20 lg:px-8">
        <Link to="/" className="shrink-0 rounded-xl" onClick={() => setMenuOpen(false)} aria-label={`${SITE.name} — home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {MAIN_NAV.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <Dropdown item={item} />
                ) : (
                  <NavLink to={item.to} end={item.to === "/"} className={linkState}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button to="/contact" size="sm">
              Contact us
            </Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-soft text-navy transition-colors hover:bg-pink-soft lg:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} className="!text-[1.6rem]" />
          </button>
        </div>
      </div>
      {menuOpen && <MobileMenu id={menuId} onClose={closeMenu} />}
    </header>
  );
}
