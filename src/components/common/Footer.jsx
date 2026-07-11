import { Link } from "react-router-dom";
import { CONTACT_CARDS, CREDITS, SCHOOL_CONTACT, telHref } from "../../lib/contact";

const LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDjB5qcEkej6-ufuFW8FTp7ApKtFY3e-CMNQtExTNf9p2oKmqH30T8_ft3s0TX6oXQ_dh9ei-P-pYKqMbuNXAhlRYHdWJ5fy6NKxObjieuZLut98FhNKbnFmJvOx4ybOajqWggX6uKGhXkR7n9o_a-UREjqLUHuYzlngduZBUkWwBN6G_xzB-4oZo56t9JsnzgUd8ePza7QRpuErS4R8pCBlADbKtOvf9koipc_ET3ZgD6KzsuYEiMjhClDBq4lUZw4WA";

const COLUMNS = [
  {
    title: "Quick Links",
    items: [
      { label: "About Us", to: "/about" },
      { label: "Admissions", to: "/admissions" },
      { label: "Academics", to: "/academics" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Parent Portal", to: "/login" },
      { label: "School Calendar", to: "/calendar" },
      { label: "Gallery", to: "/gallery" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Privacy Policy", to: "/contact" },
      { label: "Contact Support", to: "/contact" },
    ],
  },
];

const QUICK_ACTIONS = [
  { icon: "call", label: "Call Us", href: telHref(SCHOOL_CONTACT.phones[0]) },
  { icon: "mail", label: "Email", href: `mailto:${SCHOOL_CONTACT.email}` },
  { icon: "directions", label: "Directions", href: SCHOOL_CONTACT.mapsUrl, external: true },
];

export default function Footer() {
  return (
    <>
      <footer className="w-full rounded-t-3xl bg-on-background px-6 py-16 text-surface-variant/80 md:px-16">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-12 lg:flex-row">
          <div className="max-w-md space-y-6">
            <div className="flex items-center gap-2">
              <img src={LOGO} alt="Play Place" className="h-8 w-auto brightness-200" />
              <span className="text-2xl font-extrabold text-surface">Play Place</span>
            </div>

            <div className="space-y-5">
              {CONTACT_CARDS.map((item) => (
                <div key={item.icon} className="flex items-start gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.ring}`}
                  >
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    {item.title && (
                      <a
                        href={item.href}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="block font-bold text-primary-container transition-colors hover:text-primary"
                      >
                        {item.title}
                      </a>
                    )}
                    {item.lines.map((line) =>
                      item.icon === "call" ? (
                        <a
                          key={line}
                          href={telHref(line)}
                          className="block font-bold text-primary-container transition-colors hover:text-primary"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="font-bold leading-snug text-surface">
                          {line}
                        </p>
                      )
                    )}
                    {item.sub && (
                      <p className="mt-0.5 text-sm font-medium text-surface-variant/70">{item.sub}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {QUICK_ACTIONS.map((action) =>
                action.external ? (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-surface-variant/30 bg-surface-variant/10 px-5 py-2.5 text-sm font-bold text-surface transition-colors hover:border-primary hover:bg-primary hover:text-on-primary"
                  >
                    <span className="material-symbols-outlined text-lg">{action.icon}</span>
                    {action.label}
                  </a>
                ) : (
                  <a
                    key={action.label}
                    href={action.href}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-surface-variant/30 bg-surface-variant/10 px-5 py-2.5 text-sm font-bold text-surface transition-colors hover:border-primary hover:bg-primary hover:text-on-primary"
                  >
                    <span className="material-symbols-outlined text-lg">{action.icon}</span>
                    {action.label}
                  </a>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-14">
            {COLUMNS.map((col) => (
              <div key={col.title} className="space-y-4">
                <h4 className="text-sm font-bold text-secondary-fixed">{col.title}</h4>
                <ul className="space-y-2 text-base font-medium">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link to={item.to} className="transition-colors hover:text-primary-container">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>

      <div className="w-full border-t border-surface-variant/10 bg-on-background px-6 py-6 text-center">
        <p className="text-sm font-bold text-surface-variant/50">
          © {new Date().getFullYear()} {SCHOOL_CONTACT.name}. Powered by{" "}
          <a
            href={CREDITS.poweredBy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-container transition-colors hover:text-primary hover:underline"
          >
            {CREDITS.poweredBy.name}
          </a>
          .
        </p>
        <p className="mt-2 text-xs font-bold text-surface-variant/40">
          Website By{" "}
          <a
            href={CREDITS.websiteBy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 transition-colors hover:text-primary hover:underline"
          >
            {CREDITS.websiteBy.name}
          </a>
        </p>
      </div>
    </>
  );
}
