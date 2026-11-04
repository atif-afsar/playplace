import Seo from "../components/ui/Seo";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Mark from "../components/ui/Mark";
import PastelCard from "../components/ui/PastelCard";
import FramedPhoto from "../components/ui/FramedPhoto";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import Accordion from "../components/ui/Accordion";
import FranchiseSteps from "../components/sections/FranchiseSteps";
import { FranchiseEnquiryForm } from "../components/forms/enquiryForms";
import { PAGE_SEO } from "../data/seo";
import { PARTNER_SUPPORT, PARTNER_SUPPORT_NOTE, WHY_PLAY_PLACE } from "../data/franchiseBenefits";
import { FRANCHISE_FAQ } from "../data/faq";
import { PHOTOS, HEROES } from "../data/school";
import { CONTACT, telHref } from "../config/site";

export default function FranchiseOpportunityPage() {
  return (
    <>
      <Seo {...PAGE_SEO.franchise} />
      <PageHero
        breadcrumb="Franchise"
        photo={HEROES.franchise}
        title="Open a Play Place preschool in your city"
        intro="A trusted brand, a ready curriculum and a team that supports you at every step."
        actions={
          <>
            <Button href="#enquiry" size="lg">
              Enquire now
            </Button>
            <Button href="#how-it-works" variant="glass" size="lg" arrowIcon="arrow_downward">
              How it works
            </Button>
          </>
        }
      />

      {/* Why */}
      <Section>
        <SectionHeading
          align="center"
          doodle
          title={
            <>
              Why partner with <Mark>Play Place</Mark>
            </>
          }
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_PLAY_PLACE.map((b, i) => (
            <PastelCard key={b.title} {...b} variant={i % 2 ? "inverse" : "default"} delay={(i % 3) * 90} />
          ))}
        </ul>
      </Section>

      {/* What you get */}
      <Section tone="cream">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <FramedPhoto photo={PHOTOS.activityCorner} frame="coral" />
          <div>
            <Reveal>
              <h2 className="text-[2rem] leading-[1.12] sm:text-[2.6rem]">
                What you <Mark color="yellow">receive</Mark>
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted">Support across the full life of your centre.</p>
            </Reveal>
            <ul className="mt-8 grid gap-x-6 sm:grid-cols-2">
              {PARTNER_SUPPORT.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={(i % 2) * 60}
                  className="flex items-center gap-3 border-b border-line py-3.5 font-bold text-navy"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coral text-white">
                    <Icon name="check" className="!text-base" />
                  </span>
                  {item}
                </Reveal>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">{PARTNER_SUPPORT_NOTE}</p>
          </div>
        </div>
      </Section>

      <FranchiseSteps />

      {/* FAQ */}
      <Section tone="blue" width="narrow" id="faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading
            title={
              <>
                Questions? <Mark color="green">Answers.</Mark>
              </>
            }
            intro="Can't find what you're looking for? Call us any time during school hours."
          />
          <Accordion items={FRANCHISE_FAQ} />
        </div>
      </Section>

      {/* Enquiry */}
      <Section id="enquiry">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 [&>*]:min-w-0">
          <div>
            <SectionHeading
              doodle
              title={
                <>
                  Let’s <Mark color="yellow">talk</Mark>
                </>
              }
              intro="Share a few details and our team will get back to you."
            />
            <ul className="mt-8 space-y-3">
              {CONTACT.phones.map((p) => (
                <li key={p}>
                  <a href={telHref(p)} className="group flex items-center gap-3 font-bold text-navy hover:text-coral">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-soft text-green-ink transition-colors group-hover:bg-coral group-hover:text-white">
                      <Icon name="call" />
                    </span>
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-3 font-bold text-navy hover:text-coral [overflow-wrap:anywhere]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-soft text-blue transition-colors group-hover:bg-coral group-hover:text-white">
                    <Icon name="mail" />
                  </span>
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
          <Reveal className="rounded-[2rem] bg-pink-soft p-6 sm:p-10">
            <h3 className="text-2xl">Franchise enquiry</h3>
            <p className="mb-6 mt-1 text-sm text-muted">Fields marked * are required.</p>
            <FranchiseEnquiryForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
