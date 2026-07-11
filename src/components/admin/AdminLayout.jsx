import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminNotifications from "./AdminNotifications";
import { CREDITS } from "../../lib/contact";

const NAV = [
  { label: "Dashboard", icon: "dashboard", to: "/admin/dashboard" },
  { label: "Admissions", icon: "how_to_reg", to: "/admin/admissions" },
  { label: "Students", icon: "groups", to: "/admin/students" },
  { label: "Attendance", icon: "event_available", to: "/admin/attendance" },
  { label: "Results", icon: "grade", to: "/admin/results" },
  { label: "Timetable", icon: "calendar_month", to: "/admin/timetable" },
  { label: "Fees", icon: "payments", to: "/admin/fees" },
  { label: "Notices", icon: "campaign", to: "/admin/notices" },
  { label: "Calendar", icon: "event", to: "/admin/calendar" },
];

function SidebarContent({ profile, onSignOut, onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col items-center p-8">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-b-4 border-primary bg-primary-container shadow-lg">
          <span className="material-symbols-outlined text-4xl text-on-primary-container">school</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-primary">Play Place</h1>
        <p className="text-sm font-bold text-on-surface-variant opacity-70">Admin Panel</p>
      </div>

      <nav className="flex-grow space-y-2 px-4">
        {NAV.map((item) =>
          item.disabled ? (
            <span
              key={item.label}
              title="Coming soon"
              className="flex cursor-not-allowed items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-on-surface-variant opacity-40"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </span>
          ) : (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                  isActive
                    ? "border-b-4 border-primary bg-primary-container text-on-primary-container shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </NavLink>
          )
        )}
      </nav>

      <div className="p-6">
        <div className="flex items-center gap-3 rounded-2xl border-2 border-outline-variant bg-surface-container-lowest p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-secondary bg-secondary-container font-bold text-on-secondary-container">
            {(profile?.full_name || profile?.email || "A").charAt(0).toUpperCase()}
          </div>
          <div className="flex-grow overflow-hidden">
            <p className="truncate text-sm font-bold leading-none">
              {profile?.full_name || "Admin"}
            </p>
            <p className="truncate text-xs text-on-surface-variant opacity-60">
              {profile?.email}
            </p>
          </div>
          <button
            onClick={onSignOut}
            title="Sign out"
            className="text-on-surface-variant transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ title, breadcrumb, description, actions, children }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/admin/admissions?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="flex min-h-screen bg-background text-on-background">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 flex-shrink-0 overflow-y-auto border-r-2 border-outline-variant/30 bg-surface-variant lg:block">
        <SidebarContent profile={profile} onSignOut={handleSignOut} />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-surface-variant">
            <SidebarContent
              profile={profile}
              onSignOut={handleSignOut}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      <main className="flex min-h-screen flex-grow flex-col overflow-x-hidden">
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b-4 border-outline-variant bg-surface/90 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant lg:hidden"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students, fees, or events..."
                className="w-80 rounded-full border-2 border-outline-variant bg-surface-container-low py-2 pl-12 pr-4 text-base outline-none transition-all focus:border-primary"
              />
            </form>
          </div>
          <div className="flex items-center gap-6">
            <AdminNotifications />
            <div className="flex items-center gap-3 border-l-2 border-outline-variant pl-6">
              <div className="text-right">
                <p className="text-sm font-bold text-on-surface">{profile?.full_name || "Admin"}</p>
                <p className="text-xs text-on-surface-variant">Administrator</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary-container font-bold text-on-primary-container">
                {(profile?.full_name || "A").charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-grow p-6 md:p-10">
          <div className="mx-auto w-full max-w-[1200px]">
            {(title || actions) && (
              <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  {breadcrumb && (
                    <nav className="mb-2 flex items-center gap-2 text-sm font-bold text-on-surface-variant opacity-60">
                      <span>Admin</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                      <span className="text-primary">{breadcrumb}</span>
                    </nav>
                  )}
                  {title && (
                    <h2 className="text-4xl font-black tracking-tight text-on-background">{title}</h2>
                  )}
                  {description && (
                    <p className="mt-1 max-w-xl text-lg font-medium text-on-surface-variant">
                      {description}
                    </p>
                  )}
                </div>
                {actions && <div className="flex flex-wrap gap-4">{actions}</div>}
              </div>
            )}
            {children}
          </div>
        </div>

        <footer className="mt-auto flex flex-col items-center justify-between gap-4 border-t-2 border-outline-variant bg-surface-container-low px-6 py-6 md:flex-row">
          <p className="text-base font-medium text-on-surface-variant">
            © {new Date().getFullYear()} Play Place International School. Powered by{" "}
            <a
              href={CREDITS.poweredBy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary transition-colors hover:underline"
            >
              {CREDITS.poweredBy.name}
            </a>
            .
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="font-bold text-on-surface-variant transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/contact" className="font-bold text-on-surface-variant transition-colors hover:text-primary">
              Support
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
