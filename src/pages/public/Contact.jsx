import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import SEO from "../../components/common/SEO";
import ContactHero from "../../components/public/contact/ContactHero";
import ContactForm from "../../components/public/contact/ContactForm";
import FindUs from "../../components/public/contact/FindUs";
import ContactSocial from "../../components/public/contact/ContactSocial";
import { PAGE_SEO } from "../../lib/seo";

export default function Contact() {
  const seo = PAGE_SEO.contact;
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-on-background">
      <SEO
        {...seo}
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12 md:px-16">
        <ContactHero />
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <ContactForm />
          <FindUs />
        </div>
        <ContactSocial />
      </main>
      <Footer />
    </div>
  );
}
