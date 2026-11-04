import Seo from "../components/ui/Seo";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Mark from "../components/ui/Mark";
import Reveal from "../components/ui/Reveal";
import PastelCard from "../components/ui/PastelCard";
import FramedPhoto from "../components/ui/FramedPhoto";
import CheckList from "../components/ui/CheckList";
import Button from "../components/ui/Button";
import CTABand from "../components/ui/CTABand";
import ProgrammesSection from "../components/sections/ProgrammesSection";
import { PAGE_SEO } from "../data/seo";
import { LEARNING_AREAS, PHOTOS, HEROES } from "../data/school";

/** REVIEW: EYFS/NEP alignment is intentionally not claimed until confirmed. */
export default function AcademicsPage() {
  return (
    <>
      <Seo {...PAGE_SEO.academics} />
      <PageHero
        breadcrumb="Academics"
        photo={HEROES.academics}
        title="Learning that feels like play"
        intro="A gentle, structured day full of stories, activities and discovery."
      />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <FramedPhoto photo={PHOTOS.curiosityRoom} frame="yellow" />
          <div>
            <Reveal>
              <h2 className="text-[2rem] leading-[1.12] sm:text-[2.6rem]">
                Children learn best <Mark color="yellow">through play</Mark>
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                Our curriculum gives each day a clear rhythm, with plenty of room for play, movement and creativity.
              </p>
            </Reveal>
            <CheckList
              className="mt-8"
              highlightFirst
              items={["Hands-on activities", "Stories, songs and rhymes", "Art, craft and music", "Festivals and themed weeks"]}
            />
          </div>
        </div>
      </Section>

      <ProgrammesSection as="h2" showAction={false} />

      <Section>
        <SectionHeading
          align="center"
          doodle
          title={
            <>
              Growing the <Mark>whole child</Mark>
            </>
          }
          intro="Six areas of development, woven into every day."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LEARNING_AREAS.map((a, i) => (
            <PastelCard key={a.title} {...a} variant={i % 2 ? "inverse" : "default"} delay={(i % 3) * 80} />
          ))}
        </ul>
      </Section>

      <CTABand
        title="Would you like your child to learn with us?"
        text="Visit our school and meet the team."
        actions={
          <>
            <Button to="/admissions" variant="light" size="lg">
              Admissions
            </Button>
            <Button to="/contact" variant="glass" size="lg">
              Contact us
            </Button>
          </>
        }
      />
    </>
  );
}
