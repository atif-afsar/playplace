import Seo from "../components/ui/Seo";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Mark from "../components/ui/Mark";
import PastelCard from "../components/ui/PastelCard";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import FranchiseCTA from "../components/sections/FranchiseCTA";
import { PAGE_SEO } from "../data/seo";
import { QUALITY_CYCLE, SUPPORT_AREAS } from "../data/qualitySupport";
import { TEAMS } from "../data/teams";
import { HEROES } from "../data/school";

const CYCLE_COLORS = ["bg-coral", "bg-green", "bg-[#8a4fd0]", "bg-yellow", "bg-blue"];

export default function QualitySupportPage() {
  return (
    <>
      <Seo {...PAGE_SEO.quality} />
      <PageHero
        breadcrumb="Quality & Support"
        photo={HEROES.quality}
        title="Support that continues after opening day"
        intro="Training, guidance and regular quality checks for every Play Place centre."
      />

      <Section>
        <SectionHeading
          align="center"
          doodle
          title={
            <>
              How we <Mark>support you</Mark>
            </>
          }
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SUPPORT_AREAS.map((s, i) => (
            <PastelCard key={s.title} {...s} variant={i % 2 ? "inverse" : "default"} delay={(i % 4) * 80} />
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-muted">Support details are set out in each franchise agreement.</p>
      </Section>

      <Section tone="cream">
        <SectionHeading
          align="center"
          title={
            <>
              A cycle of <Mark color="green">getting better</Mark>
            </>
          }
        />
        <ol className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
          {QUALITY_CYCLE.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 90} className={`group flex items-center gap-4 ${i === QUALITY_CYCLE.length - 1 ? "col-span-2 justify-center" : ""}`}>
              <div className="flex w-full flex-col items-center rounded-3xl bg-white p-5 sm:w-40 sm:p-6 text-center shadow-soft transition-transform duration-300 group-hover:-translate-y-1.5">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white ${CYCLE_COLORS[i]}`}>
                  <Icon name={c.icon} />
                </span>
                <h3 className="mt-4 text-lg">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">{c.text}</p>
              </div>
              {i < QUALITY_CYCLE.length - 1 && <Icon name="arrow_forward" className="hidden text-coral lg:inline-block" />}
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading
          title={
            <>
              The teams <Mark color="yellow">behind you</Mark>
            </>
          }
        />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {TEAMS.map((t, i) => (
            <Reveal
              as="li"
              key={t.name}
              delay={(i % 4) * 60}
              className="group rounded-3xl border border-line p-4 transition-all sm:p-6 duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-blue-soft"
            >
              <Icon name={t.icon} className="!text-3xl text-coral transition-transform group-hover:scale-110" />
              <h3 className="mt-3 text-base sm:text-lg">{t.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t.text}</p>
            </Reveal>
          ))}
          <Reveal as="li" delay={180} className="rounded-3xl bg-coral p-4 text-white sm:p-6">
            <Icon name="storefront" className="!text-3xl" />
            <h3 className="mt-3 text-base !text-white sm:text-lg">Your centre team</h3>
            <p className="mt-1 text-sm leading-relaxed text-white/90">Working hand in hand with all of us.</p>
          </Reveal>
        </ul>
      </Section>

      <FranchiseCTA />
    </>
  );
}
