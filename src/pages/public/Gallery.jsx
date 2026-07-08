import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import GalleryHero from "../../components/public/gallery/GalleryHero";
import GalleryGrid from "../../components/public/gallery/GalleryGrid";

export default function Gallery() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-on-background">
      <Navbar />
      <main>
        <GalleryHero />
        <GalleryGrid />
      </main>
      <Footer />
    </div>
  );
}
