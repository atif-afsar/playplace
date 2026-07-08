import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Hero from "../../components/public/Hero";
import Features from "../../components/public/Features";
import GalleryStrip from "../../components/public/GalleryStrip";
import CTASection from "../../components/public/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-on-background">
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
