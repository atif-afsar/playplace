import Seo from "../components/ui/Seo";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Mark from "../components/ui/Mark";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import IconBadge from "../components/ui/IconBadge";
import Button from "../components/ui/Button";
import EcosystemSection from "../components/sections/EcosystemSection";
import FranchiseCTA from "../components/sections/FranchiseCTA";
import { PAGE_SEO } from "../data/seo";
import { RESPONSIBILITIES } from "../data/franchiseBenefits";
import { HEROES } from "../data/school";

export default function FranchiseEcosystemPage() {
  return (
    <>
      <Seo {...PAGE_SEO.franchiseEcosystem} />
      <PageHero
        breadcrumb="Franchise Ecosystem"
        photo={HEROES.ecosystem}
        title="Everything your preschool needs, in one place"
        intro="Curriculum, training, setup, marketing and quality — connected and ready for you."
        actions={
          <Button href="#pillars" size="lg" arrowIcon="arrow_downward">
            See the pillars
          </Button>
        }
      />

      <EcosystemSection />

      <Section tone="cream">
        <SectionHeading
          align="center"
          doodle
          title={
            <>
              Who does <Mark color="yellow">what</Mark>
            </>
          }
          intro="A clear partnership — we bring the model, you bring the local heart."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-navy p-8 text-white sm:p-10">
            <IconBadge name="apartment" color="onDark" size="lg" />
            <h3 className="mt-6 text-2xl !text-white">Play Place provides</h3>
            <ul className="mt-6 space-y-3.5">
              {RESPONSIBILITIES.headquarters.map((r) => (
                <li key={r} className="flex items-center gap-3 font-semibold text-white/90">
                  <Icon name="check_circle" fill className="text-yellow" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-[2rem] bg-green-soft p-8 sm:p-10">
            <IconBadge name="storefront" color="white" size="lg" />
            <h3 className="mt-6 text-2xl">You manage</h3>
            <ul className="mt-6 space-y-3.5">
              {RESPONSIBILITIES.partner.map((r) => (
                <li key={r} className="flex items-center gap-3 font-semibold text-navy">
                  <Icon name="check_circle" fill className="text-green-ink" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <FranchiseCTA title="Ready to grow with Play Place?" text="See how the partnership works and send us an enquiry." />
    </>
  );
}
