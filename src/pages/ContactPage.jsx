import Seo from "../components/ui/Seo";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Mark from "../components/ui/Mark";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import InstagramIcon from "../components/ui/InstagramIcon";
import { ContactEnquiryForm } from "../components/forms/enquiryForms";
import { PAGE_SEO } from "../data/seo";
import { CONTACT, SOCIAL, telHref } from "../config/site";

export default function ContactPage() {
  const cards = [
    {
      icon: "location_on",
      bg: "bg-pink-soft",
      ic: "bg-coral",
      title: "Visit us",
      body: (
        <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-coral">
          {CONTACT.addressFull}
          <span className="sr-only"> (opens Google Maps in a new tab)</span>
        </a>
      ),
    },
    {
      icon: "call",
      bg: "bg-green-soft",
      ic: "bg-green",
      title: "Call us",
      body: (
        <>
          {CONTACT.phones.map((p) => (
            <a key={p} href={telHref(p)} className="block font-bold text-navy hover:text-coral">
              {p}
            </a>
          ))}
          <span className="mt-1 block text-sm">{CONTACT.hours}</span>
        </>
      ),
    },
    {
      icon: "mail",
      bg: "bg-lilac-soft",
      ic: "bg-[#8a4fd0]",
      title: "Email us",
      body: (
        <a href={`mailto:${CONTACT.email}`} className="font-bold text-navy hover:text-coral [overflow-wrap:anywhere]">
          {CONTACT.email}
        </a>
      ),
    },
  ];

  return (
    <>
      <Seo {...PAGE_SEO.contact} />
      <PageHero breadcrumb="Contact" title="We’d love to hear from you" intro="Parents, partners and friends — here’s how to reach us." />

      <Section>
        <ul className="grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 90} className={`group rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1.5 ${c.bg}`}>
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white transition-transform group-hover:rotate-6 ${c.ic}`}>
                <Icon name={c.icon} className="!text-3xl" />
              </span>
              <h2 className="mt-5 text-2xl">{c.title}</h2>
              <div className="mt-2 leading-relaxed text-muted">{c.body}</div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="cream" id="message">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14 [&>*]:min-w-0">
          <div>
            <SectionHeading
              doodle
              title={
                <>
                  Send a <Mark color="yellow">message</Mark>
                </>
              }
            />
            <Reveal className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
              <ContactEnquiryForm />
            </Reveal>
          </div>
          <div className="flex flex-col gap-5">
            <Reveal className="overflow-hidden rounded-[2rem] shadow-soft">
              <iframe
                title="Map showing Play Place International School near Monarch Apartments, Aligarh"
                src={CONTACT.mapsEmbedUrl}
                className="h-80 w-full lg:h-[24rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
            <Reveal className="rounded-[2rem] bg-navy p-7 text-white">
              <h2 className="text-2xl !text-white">Interested in a franchise?</h2>
              <p className="mt-2 text-white/80">Share your city and plans with our team.</p>
              <div className="mt-5">
                <Button to="/franchise#enquiry" variant="light">
                  Franchise enquiry
                </Button>
              </div>
            </Reveal>
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[2rem] bg-white p-5 shadow-soft transition-transform hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white">
                  <InstagramIcon className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-navy">Follow us on {s.label}</span>
                  <span className="block text-sm text-muted [overflow-wrap:anywhere]">{s.handle}</span>
                </span>
                <Icon name="arrow_outward" className="ml-auto text-coral transition-transform group-hover:rotate-45" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
