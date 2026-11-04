import { Link } from "react-router-dom";
import { CONTACT, CREDITS, SITE, SOCIAL, telHref } from "../../config/site";
import { FOOTER_NAV } from "../../data/navigation";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Doodle from "../ui/Doodle";
import Icon from "../ui/Icon";
import InstagramIcon from "../ui/InstagramIcon";
import Logo from "./Logo";

const ext = { target: "_blank", rel: "noopener noreferrer" };

function ContactRow({ icon, color, label, children, href, external }) {
  const inner = (
    <>
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 ${color}`}>
        <Icon name={icon} className="!text-[1.3rem]" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-bold uppercase tracking-[0.14em] text-white/50">{label}</span>
        <span className="mt-0.5 block font-bold text-white [overflow-wrap:anywhere] group-hover:text-yellow">{children}</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} className="group flex items-center gap-4" {...(external ? ext : {})}>
      {inner}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  ) : (
    <div className="group flex items-center gap-4">{inner}</div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const phone = CONTACT.phones[0];

  return (
    <footer className="relative mt-10 overflow-hidden rounded-t-[2.5rem] bg-navy-deep text-white/70">
      {/* soft colour blobs + doodles */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-coral/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-green/15 blur-3xl" aria-hidden="true" />
      <Doodle shape="star" color="text-yellow" className="absolute right-[8%] top-10 hidden md:block" size={28} />
      <Doodle shape="squiggle" color="text-green/70" className="absolute bottom-28 left-[8%] hidden lg:block" size={52} slow />

      <Container className="relative">
        {/* CTA strip */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-12 md:flex-row md:items-center">
          <div>
            <p className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Let’s give your child a <span className="text-yellow">joyful</span> start.
            </p>
            <p className="mt-2 text-white/70">Admissions open for Playgroup, Nursery, LKG and UKG.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/admissions" size="lg">
              Apply now
            </Button>
            <Button href={telHref(phone)} variant="glass" size="lg" arrowIcon="call">
              {phone}
            </Button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <Link to="/" className="inline-block rounded-xl" aria-label={`${SITE.name} — home`}>
              <Logo tone="light" />
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed">
              A joyful, play-based preschool in Aligarh — now welcoming franchise partners to bring Play Place to new
              cities.
            </p>
            <a href={SITE.unitOfUrl} {...ext} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-yellow">
              {SITE.unitOf}
              <Icon name="arrow_outward" className="!text-base" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <ul className="mt-7 flex gap-3" aria-label="Social media and contact">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...ext}
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af]"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={telHref(phone)}
                  aria-label={`Call ${phone}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-green"
                >
                  <Icon name="call" className="!text-xl" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  aria-label="Email us"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-coral"
                >
                  <Icon name="mail" className="!text-xl" />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-[1fr_1.5fr_1fr] lg:col-span-5 lg:pl-4">
            {FOOTER_NAV.map((col) => (
              <nav key={col.title} aria-label={`${col.title} links`}>
                <h2 className="font-display text-lg !text-white">{col.title}</h2>
                <ul className="mt-4 space-y-3 text-[0.95rem]">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="group inline-flex items-center transition-colors hover:text-yellow">
                        <Icon
                          name="chevron_right"
                          className="!w-0 !text-base opacity-0 transition-all duration-300 group-hover:!w-4 group-hover:opacity-100"
                        />
                        <span>{l.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-7">
              <h2 className="font-display text-lg !text-white">Get in touch</h2>
              <address className="mt-5 space-y-5 not-italic">
                <ContactRow icon="call" color="bg-green" label="Call us" href={telHref(phone)}>
                  {phone}
                </ContactRow>
                <ContactRow icon="mail" color="bg-coral" label="Email" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </ContactRow>
                <ContactRow icon="location_on" color="bg-[#8a4fd0]" label="Visit" href={CONTACT.mapsUrl} external>
                  {CONTACT.addressFull}
                </ContactRow>
                <ContactRow icon="schedule" color="bg-blue" label="School hours">
                  {CONTACT.hours}
                </ContactRow>
              </address>
            </div>
          </div>
        </div>
      </Container>

      {/* Big faded wordmark */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[19vw] font-semibold leading-[0.8] text-white/[0.04] lg:text-[13rem]"
      >
        PlayPlace
      </p>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.name}. {SITE.unitOf}.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <Link to="/privacy-policy" className="hover:text-yellow">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-yellow">
                Terms of Use
              </Link>
            </li>
            <li>
              Website by{" "}
              <a href={CREDITS.websiteBy.url} {...ext} className="font-semibold text-white/75 hover:text-yellow">
                {CREDITS.websiteBy.name}
              </a>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
