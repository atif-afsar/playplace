import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import SEO from "../../components/common/SEO";
import AboutHero from "../../components/public/about/AboutHero";
import MissionVision from "../../components/public/about/MissionVision";
import PrincipalMessage from "../../components/public/about/PrincipalMessage";
import JourneyTimeline from "../../components/public/about/JourneyTimeline";
import { PAGE_SEO } from "../../lib/seo";

export default function About() {
  const seo = PAGE_SEO.about;
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-on-background">
      <SEO
        {...seo}
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
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
