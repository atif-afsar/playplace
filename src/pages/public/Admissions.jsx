import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import AdmissionsHero from "../../components/public/admissions/AdmissionsHero";
import AdmissionSteps from "../../components/public/admissions/AdmissionSteps";
import AdmissionForm from "../../components/public/admissions/AdmissionForm";

export default function Admissions() {
  return (
    <div className="min-h-screen bg-background text-on-background">
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
