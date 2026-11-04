import { PHOTOS } from "../../data/school";
import Button from "../ui/Button";
import FramedPhoto from "../ui/FramedPhoto";
import Icon from "../ui/Icon";
import Mark from "../ui/Mark";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

const HIGHLIGHTS = [
  { icon: "workspace_premium", label: "Trusted brand" },
  { icon: "menu_book", label: "Ready curriculum" },
  { icon: "school", label: "Staff training" },
  { icon: "foundation", label: "Setup guidance" },
  { icon: "campaign", label: "Marketing support" },
  { icon: "support_agent", label: "Ongoing help" },
];

/** One clear franchise block for the homepage. */
export default function FranchiseSection() {
  return (
    <Section tone="blue" id="franchise">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <FramedPhoto photo={PHOTOS.corridorPlayArea} frame="green" aspect="aspect-[5/6]" />
          <Reveal
            delay={200}
            className="absolute -bottom-6 -right-2 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lift sm:right-6"
          >
            <span className="font-display text-4xl font-semibold text-coral">8</span>
            <span className="text-sm font-bold leading-tight text-navy">
              pillars of
              <br />
              partner support
            </span>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-coral">
              Franchise opportunity
            </p>
            <h2 className="text-[2rem] leading-[1.12] sm:text-[2.6rem]">
              Bring <Mark color="yellow">Play Place</Mark> to your city
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              Open your own preschool with a trusted brand and a team that supports you at every step.
            </p>
          </Reveal>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal
                as="li"
                key={h.label}
                delay={i * 60}
                className="group flex flex-col items-start gap-3 rounded-2xl bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-soft text-coral transition-colors group-hover:bg-coral group-hover:text-white">
                  <Icon name={h.icon} className="!text-xl" />
                </span>
                <span className="text-sm font-bold text-navy">{h.label}</span>
              </Reveal>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button to="/franchise">Explore franchise</Button>
            <Button to="/franchise#enquiry" variant="secondary">
              Enquire now
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
