import Seo from "../components/ui/Seo";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Mark from "../components/ui/Mark";
import Reveal from "../components/ui/Reveal";
import PastelCard from "../components/ui/PastelCard";
import FramedPhoto from "../components/ui/FramedPhoto";
import CheckList from "../components/ui/CheckList";
import IconBadge from "../components/ui/IconBadge";
import Button from "../components/ui/Button";
import FranchiseCTA from "../components/sections/FranchiseCTA";
import { PAGE_SEO } from "../data/seo";
import { PHOTOS, VALUES, HEROES } from "../data/school";

export default function AboutPage() {
  return (
    <>
      <Seo {...PAGE_SEO.about} />
      <PageHero
        breadcrumb="About us"
        photo={HEROES.about}
        title="Where early learning feels like play"
        intro="A caring preschool in Aligarh — a unit of Yasir Ali Classes."
      />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <h2 className="text-[2rem] leading-[1.12] sm:text-[2.6rem]">
                About <Mark>Play Place</Mark>
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-muted">
                We welcome children in Playgroup, Nursery, LKG and UKG near Monarch Apartments on Aligarh Bypass Road.
                Every day blends gentle structure with play, stories, art and celebrations.
              </p>
            </Reveal>
            <CheckList
              className="mt-8"
              items={["Bright, child-friendly classrooms", "Learning through play", "Festivals and celebrations"]}
            />
            <div className="mt-8">
              <Button to="/gallery" variant="secondary">
                See our school
              </Button>
            </div>
          </div>
          <FramedPhoto photo={PHOTOS.ramadanCelebration} frame="green" />
        </div>
      </Section>

      <Section tone="cream">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-white p-8 shadow-soft sm:p-10">
            <IconBadge name="visibility" color="blue" size="lg" />
            <h3 className="mt-6 text-2xl">Our vision</h3>
            <p className="mt-3 leading-relaxed text-muted">
              To build a trusted, high-quality and future-ready preschool network that supports every child’s early
              development.
            </p>
          </Reveal>
          <Reveal delay={120} className="rounded-[2rem] bg-white p-8 shadow-soft sm:p-10">
            <IconBadge name="flag" color="pink" size="lg" />
            <h3 className="mt-6 text-2xl">Our mission</h3>
            <p className="mt-3 leading-relaxed text-muted">
              To nurture creativity and curiosity in a safe, joyful place where children explore through play.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading
          align="center"
          doodle
          title={
            <>
              What we <Mark color="green">believe in</Mark>
            </>
          }
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <PastelCard key={v.title} {...v} variant={i % 2 ? "inverse" : "default"} delay={i * 80} />
          ))}
        </ul>
      </Section>

      <FranchiseCTA
        title="Sharing our approach with more children"
        text="We’re inviting partners to open Play Place preschools in new cities."
      />
    </>
  );
}
