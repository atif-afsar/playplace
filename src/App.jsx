import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import HomePage from "./pages/HomePage";

// Inner pages are code-split so the homepage loads only what it needs.
const AboutPage = lazy(() => import("./pages/AboutPage"));
const AcademicsPage = lazy(() => import("./pages/AcademicsPage"));
const AdmissionsPage = lazy(() => import("./pages/AdmissionsPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const FranchiseEcosystemPage = lazy(() => import("./pages/FranchiseEcosystemPage"));
const FranchiseOpportunityPage = lazy(() => import("./pages/FranchiseOpportunityPage"));
const QualitySupportPage = lazy(() => import("./pages/QualitySupportPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/LegalPage").then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import("./pages/LegalPage").then((m) => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

/**
 * Retired URLs from the previous site (backend portals and calendar).
 * The same redirects exist server-side in vercel.json; these cover dev/preview.
 */
const LEGACY_REDIRECTS = [
  { path: "/login", to: "/" },
  { path: "/admin/*", to: "/" },
  { path: "/parent/*", to: "/" },
  { path: "/calendar", to: "/contact" },
  { path: "/digital-ecosystem", to: "/franchise-ecosystem" },
];

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="academics" element={<AcademicsPage />} />
        <Route path="admissions" element={<AdmissionsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="franchise-ecosystem" element={<FranchiseEcosystemPage />} />
        <Route path="franchise" element={<FranchiseOpportunityPage />} />
        <Route path="quality-support" element={<QualitySupportPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsPage />} />
        {LEGACY_REDIRECTS.map((r) => (
          <Route key={r.path} path={r.path} element={<Navigate to={r.to} replace />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
