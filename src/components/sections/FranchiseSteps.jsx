import { FRANCHISE_PROCESS } from "../../data/franchiseProcess";
import Icon from "../ui/Icon";
import Mark from "../ui/Mark";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const COLORS = ["bg-coral", "bg-green", "bg-[#8a4fd0]", "bg-yellow", "bg-blue", "bg-coral", "bg-green"];

/** Seven-step journey as a simple numbered timeline. */
export default function FranchiseSteps({ tone = "white" }) {
  return (
    <Section tone={tone} id="how-it-works">
      <SectionHeading
        align="center"
        doodle
        title={
          <>
            How it <Mark color="green">works</Mark>
          </>
        }
        intro="Seven simple steps from your first call to opening day — and beyond."
      />
      <ol className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-7 lg:gap-3">
        <span className="absolute left-[7%] right-[7%] top-7 hidden h-1 rounded-full bg-[repeating-linear-gradient(90deg,#e6ebf1_0_10px,transparent_10px_18px)] lg:block" aria-hidden="true" />
        {FRANCHISE_PROCESS.map((s, i) => (
          <Reveal as="li" key={s.step} delay={i * 80} className="group relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
            <span
              className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-soft transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6 ${COLORS[i]}`}
            >
              <Icon name={s.icon} />
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-xs font-extrabold text-white ring-2 ring-white">
                {s.step}
              </span>
            </span>
            <div>
              <h3 className="text-lg lg:mt-2">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
