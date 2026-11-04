import Seo from "../components/ui/Seo";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Mark from "../components/ui/Mark";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import ProgrammesSection from "../components/sections/ProgrammesSection";
import { AdmissionEnquiryForm } from "../components/forms/enquiryForms";
import Accordion from "../components/ui/Accordion";
import { PARENT_FAQ } from "../data/faq";
import { PAGE_SEO } from "../data/seo";
import { ADMISSION_STEPS, HEROES } from "../data/school";
import { CONTACT, telHref } from "../config/site";

const STEP_COLORS = ["bg-coral", "bg-green", "bg-[#8a4fd0]", "bg-yellow"];

export default function AdmissionsPage() {
  return (
    <>
      <Seo {...PAGE_SEO.admissions} />
      <PageHero
        breadcrumb="Admissions"
        photo={HEROES.admissions}
        title="Begin your child’s Play Place journey"
        intro="Admissions for Playgroup, Nursery, LKG and UKG."
        actions={
          <>
            <Button href="#apply" size="lg">
              Enquire now
            </Button>
            <Button href={telHref(CONTACT.phones[0])} variant="glass" size="lg" arrowIcon="call">
              {CONTACT.phones[0]}
            </Button>
          </>
        }
      />

      <ProgrammesSection tone="white" showAction={false} />

      <Section tone="cream">
        <SectionHeading
          align="center"
          doodle
          title={
            <>
              Four <Mark color="green">easy steps</Mark>
            </>
          }
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ADMISSION_STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="group rounded-3xl bg-white p-6 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1.5">
              <span className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-white transition-transform group-hover:rotate-6 ${STEP_COLORS[i]}`}>
                <Icon name={s.icon} className="!text-3xl" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-extrabold ring-2 ring-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 text-xl">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="blue" width="narrow" id="faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 [&>*]:min-w-0">
          <SectionHeading
            title={
              <>
                Parents ask, <Mark color="green">we answer</Mark>
              </>
            }
            intro="Quick answers about classes, location, timings and admissions."
          />
          <Accordion items={PARENT_FAQ} />
        </div>
      </Section>

      <Section id="apply">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 [&>*]:min-w-0">
          <div>
            <SectionHeading
              title={
                <>
                  Admission <Mark color="yellow">enquiry</Mark>
                </>
              }
              intro="Tell us about your child and we’ll get back to you."
            />
            <dl className="mt-8 space-y-4">
              <div className="rounded-2xl bg-blue-soft p-5">
                <dt className="font-bold text-navy">School hours</dt>
                <dd className="mt-1 text-sm text-muted">{CONTACT.hours}</dd>
              </div>
              <div className="rounded-2xl bg-green-soft p-5">
                <dt className="font-bold text-navy">Visit us</dt>
                <dd className="mt-1 text-sm text-muted">{CONTACT.addressFull}</dd>
              </div>
            </dl>
          </div>
          <Reveal className="rounded-[2rem] bg-pink-soft p-6 sm:p-10">
            <AdmissionEnquiryForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
