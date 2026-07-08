import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import AboutHero from "../../components/public/about/AboutHero";
import MissionVision from "../../components/public/about/MissionVision";
import PrincipalMessage from "../../components/public/about/PrincipalMessage";
import JourneyTimeline from "../../components/public/about/JourneyTimeline";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />
      <main>
        <AboutHero />
        <MissionVision />
        <PrincipalMessage />
        <JourneyTimeline />
      </main>
      <Footer />
    </div>
  );
}
