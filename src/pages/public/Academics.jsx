import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import SEO from "../../components/common/SEO";
import AcademicsHero from "../../components/public/academics/AcademicsHero";
import LearningJourney from "../../components/public/academics/LearningJourney";
import TeachingMethods from "../../components/public/academics/TeachingMethods";
import AcademicsCTA from "../../components/public/academics/AcademicsCTA";
import { PAGE_SEO } from "../../lib/seo";

export default function Academics() {
  const seo = PAGE_SEO.academics;
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-on-background">
      <SEO
        {...seo}
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Academics", path: "/academics" },
        ]}
      />
      <Navbar />
      <main className="space-y-16 pb-20 md:space-y-24">
        <AcademicsHero />
        <LearningJourney />
        <TeachingMethods />
        <AcademicsCTA />
      </main>
      <Footer />
    </div>
  );
}
