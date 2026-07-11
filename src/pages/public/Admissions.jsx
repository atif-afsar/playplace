import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import SEO from "../../components/common/SEO";
import AdmissionsHero from "../../components/public/admissions/AdmissionsHero";
import AdmissionSteps from "../../components/public/admissions/AdmissionSteps";
import AdmissionForm from "../../components/public/admissions/AdmissionForm";
import { PAGE_SEO } from "../../lib/seo";

export default function Admissions() {
  const seo = PAGE_SEO.admissions;
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-on-background">
      <SEO
        {...seo}
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Admissions", path: "/admissions" },
        ]}
      />
      <Navbar />
      <main>
        <AdmissionsHero />
        <AdmissionSteps />
        <AdmissionForm />
      </main>
      <Footer />
    </div>
  );
}
