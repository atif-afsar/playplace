import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import SEO from "../../components/common/SEO";
import GalleryHero from "../../components/public/gallery/GalleryHero";
import GalleryGrid from "../../components/public/gallery/GalleryGrid";
import { PAGE_SEO } from "../../lib/seo";

export default function Gallery() {
  const seo = PAGE_SEO.gallery;
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-on-background">
      <SEO
        {...seo}
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />
      <Navbar />
      <main>
        <GalleryHero />
        <GalleryGrid />
      </main>
      <Footer />
    </div>
  );
}
