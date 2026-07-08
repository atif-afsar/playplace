import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { label: "Dashboard", icon: "dashboard", to: "/parent/dashboard" },
  { label: "Timetable", icon: "calendar_month", to: "/parent/timetable" },
  { label: "Results", icon: "grade", to: "/parent/results" },
  { label: "Fees", icon: "payments", to: "/parent/fees" },
  { label: "Notices", icon: "campaign", to: "/parent/notices" },
];

export default function ParentLayout({ children }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const firstName = (profile?.full_name || "Parent").split(" ")[0];

  return (
    <div className="flex min-h-screen flex-col bg-background text-on-background">
      <header className="sticky top-0 z-40 border-b-2 border-surface-variant bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border-b-4 border-primary bg-primary-container">
              <span className="material-symbols-outlined text-2xl text-on-primary-container">
                family_restroom
              </span>
            </div>
            <div>
              <h1 className="font-display text-lg font-extrabold leading-none text-primary">Play Place</h1>
              <p className="text-xs font-bold text-on-surface-variant opacity-70">Parent Portal</p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-primary-container text-on-primary-container"
                      : "text-on-surface-variant hover:bg-surface-variant/60"
                  }`
                }
                end={item.to === "/parent/dashboard"}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold leading-none text-on-surface">{firstName}</p>
              <p className="text-xs text-on-surface-variant">Parent</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-secondary-container font-bold text-on-secondary-container">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleSignOut}
              title="Sign out"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary sm:flex"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant md:hidden"
              aria-label="Menu"
            >
              <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t-2 border-surface-variant bg-surface px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-primary-container text-on-primary-container"
                        : "text-on-surface-variant hover:bg-surface-variant/60"
                    }`
                  }
                  end={item.to === "/parent/dashboard"}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={handleSignOut}
                className="mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-primary hover:bg-surface-variant/60"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Sign out
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-[1200px] flex-grow px-6 py-10">{children}</main>

      <footer className="mt-auto border-t-2 border-surface-variant bg-surface-container-low">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
          <p className="text-base font-medium text-on-surface-variant">
            © {new Date().getFullYear()} Play Place International School. Powered by Bal Vatika.
          </p>
          <div className="flex gap-6">
            <NavLink to="/contact" className="font-bold text-on-surface-variant transition-colors hover:text-primary">
              Contact
            </NavLink>
            <NavLink to="/about" className="font-bold text-on-surface-variant transition-colors hover:text-primary">
              About
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
