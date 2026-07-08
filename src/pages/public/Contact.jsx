import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import ContactHero from "../../components/public/contact/ContactHero";
import ContactForm from "../../components/public/contact/ContactForm";
import FindUs from "../../components/public/contact/FindUs";
import ContactSocial from "../../components/public/contact/ContactSocial";

export default function Contact() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-on-background">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-6 py-12 md:px-16">
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
