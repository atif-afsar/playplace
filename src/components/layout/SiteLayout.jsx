import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

/** Scrolls to the top on navigation, or to the #hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const scroll = () => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      // Wait one frame so lazily loaded pages have rendered their sections.
      const t = setTimeout(scroll, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);
  return null;
}

function PageFallback() {
  return <div className="min-h-[60vh]" aria-busy="true" />;
}

export default function SiteLayout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-navy px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
