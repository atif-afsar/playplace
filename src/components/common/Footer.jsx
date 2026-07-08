const LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDjB5qcEkej6-ufuFW8FTp7ApKtFY3e-CMNQtExTNf9p2oKmqH30T8_ft3s0TX6oXQ_dh9ei-P-pYKqMbuNXAhlRYHdWJ5fy6NKxObjieuZLut98FhNKbnFmJvOx4ybOajqWggX6uKGhXkR7n9o_a-UREjqLUHuYzlngduZBUkWwBN6G_xzB-4oZo56t9JsnzgUd8ePza7QRpuErS4R8pCBlADbKtOvf9koipc_ET3ZgD6KzsuYEiMjhClDBq4lUZw4WA";

const COLUMNS = [
  { title: "Quick Links", items: ["About Us", "Admissions", "Academics", "Campus Map"] },
  { title: "Resources", items: ["Parent Portal", "Curriculum", "School Calendar", "Gallery"] },
  { title: "Support", items: ["Privacy Policy", "Terms of Service", "Contact Support", "FAQ"] },
];

const SOCIALS = ["share", "groups", "movie"];

export default function Footer() {
  return (
    <>
      <footer className="flex w-full flex-col justify-between gap-10 rounded-t-3xl bg-on-background px-6 py-16 text-surface-variant/80 md:flex-row md:px-16">
        <div className="max-w-xs space-y-6">
          <div className="flex items-center gap-2">
            <img src={LOGO} alt="Play Place" className="h-8 w-auto brightness-200" />
            <span className="text-2xl font-extrabold text-surface">Play Place</span>
          </div>
          <p className="text-base font-medium leading-relaxed">
            123 Sunshine Lane, Creative City, 45678
            <br />
            Email: hello@playplace.edu
            <br />
            Phone: (555) PLAY-NOW
          </p>
          <div className="flex gap-4">
            {SOCIALS.map((icon) => (
              <a
                key={icon}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-variant/20 transition-colors hover:bg-primary"
              >
                <span className="material-symbols-outlined text-surface">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-14">
          {COLUMNS.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-sm font-bold text-secondary-fixed">{col.title}</h4>
              <ul className="space-y-2 text-base font-medium">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-primary-container">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>

      <div className="w-full border-t border-surface-variant/10 bg-on-background px-6 py-6 text-center">
        <p className="text-sm font-bold text-surface-variant/50">
          © {new Date().getFullYear()} Play Place International School. Powered by Bal Vatika.
        </p>
      </div>
    </>
  );
}
