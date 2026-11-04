import Seo from "../components/ui/Seo";
import HomeHero from "../components/sections/HomeHero";
import IntroSection from "../components/sections/IntroSection";
import EnvironmentSection from "../components/sections/EnvironmentSection";
import ProgrammesSection from "../components/sections/ProgrammesSection";
import FranchiseSection from "../components/sections/FranchiseSection";
import GalleryMarquee from "../components/sections/GalleryMarquee";
import FranchiseCTA from "../components/sections/FranchiseCTA";
import { PAGE_SEO } from "../data/seo";

export default function HomePage() {
  return (
    <>
      <Seo {...PAGE_SEO.home} />
      <HomeHero />
      <IntroSection />
      <EnvironmentSection />
      <ProgrammesSection />
      <FranchiseSection />
      <GalleryMarquee />
      <FranchiseCTA />
    </>
  );
}
