import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import SEO from "../../components/common/SEO";
import Hero from "../../components/public/Hero";
import Features from "../../components/public/Features";
import GalleryStrip from "../../components/public/GalleryStrip";
import CTASection from "../../components/public/CTASection";
import { PAGE_SEO } from "../../lib/seo";

export default function Home() {
  const seo = PAGE_SEO.home;
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-on-background">
      <SEO {...seo} includeFaq />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <GalleryStrip />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
