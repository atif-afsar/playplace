import { Link } from "react-router-dom";
import LoginIllustration from "../../components/public/login/LoginIllustration";
import LoginCard from "../../components/public/login/LoginCard";
import SEO from "../../components/common/SEO";
import { CREDITS } from "../../lib/contact";
import { PAGE_SEO } from "../../lib/seo";

const CLOUDS = [
  { w: 128, h: 48, top: 40, delay: -2 },
  { w: 192, h: 64, top: 160, delay: -10 },
  { w: 96, h: 32, top: 320, delay: -5 },
  { w: 160, h: 56, top: "50%", delay: -15 },
];

export default function Login() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-surface-container-low p-4">
      <SEO {...PAGE_SEO.login} />
      <Link
        to="/"
        className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-primary shadow-sm backdrop-blur-sm transition-transform hover:scale-105"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Back to Home
      </Link>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-secondary-container opacity-40 blur-3xl" />
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className="login-cloud"
            style={{
              width: c.w,
              height: c.h,
              top: typeof c.top === "number" ? c.top : c.top,
              animationDelay: `${c.delay}s`,
              animationDuration: `${15 + i * 3}s`,
            }}
          />
        ))}
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-16 md:flex-row md:gap-24">
        <LoginIllustration />
        <LoginCard />
      </main>

      <footer className="pointer-events-none fixed bottom-0 left-0 z-20 flex w-full justify-center px-6 py-4">
        <div className="pointer-events-auto rounded-full border border-surface-variant bg-white/80 px-6 py-2 backdrop-blur-sm">
          <p className="text-sm font-bold text-on-surface-variant">
            © {new Date().getFullYear()} Play Place International School.{" "}
            <span className="hidden md:inline">
              Powered by{" "}
              <a
                href={CREDITS.poweredBy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-colors hover:underline"
              >
                {CREDITS.poweredBy.name}
              </a>
              .
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
