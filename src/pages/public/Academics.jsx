import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import AcademicsHero from "../../components/public/academics/AcademicsHero";
import LearningJourney from "../../components/public/academics/LearningJourney";
import TeachingMethods from "../../components/public/academics/TeachingMethods";
import AcademicsCTA from "../../components/public/academics/AcademicsCTA";

export default function Academics() {
  return (
    <div className="min-h-screen bg-background text-on-background">
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
