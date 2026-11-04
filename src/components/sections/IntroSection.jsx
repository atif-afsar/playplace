import { HIGHLIGHTS, STATS } from "../../data/school";
import Mark from "../ui/Mark";
import PastelCard from "../ui/PastelCard";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import StatsStrip from "../ui/StatsStrip";
import Doodle from "../ui/Doodle";

export default function IntroSection() {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
        <Reveal>
          <h2 className="text-[2rem] leading-[1.12] sm:text-[2.6rem]">
            Helping children grow with <Mark>joy, curiosity</Mark> and <Mark>confidence</Mark>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-md leading-relaxed text-muted lg:ml-auto">
            At Play Place, our preschool in Aligarh, every child learns best when they feel safe, happy and supported.
            Our classrooms are full of colour, stories and play.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-14">
        <Doodle className="absolute -top-8 left-[30%] hidden sm:block" />
        <ul className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {HIGHLIGHTS.map((h, i) => (
            <PastelCard key={h.title} {...h} variant={i === 1 ? "inverse" : "default"} delay={i * 100} />
          ))}
        </ul>
      </div>

      <StatsStrip stats={STATS} className="mt-16" />
    </Section>
  );
}
