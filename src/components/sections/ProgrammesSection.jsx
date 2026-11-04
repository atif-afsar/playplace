import { PROGRAMMES } from "../../data/school";
import Button from "../ui/Button";
import Mark from "../ui/Mark";
import PastelCard from "../ui/PastelCard";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

/** Our four early years classes. */
export default function ProgrammesSection({ tone = "cream", showAction = true, as = "h2" }) {
  return (
    <Section tone={tone} id="programmes">
      <SectionHeading
        as={as}
        align="center"
        doodle
        title={
          <>
            Our <Mark color="yellow">programmes</Mark>
          </>
        }
        intro="Four joyful stages, each designed for your child's age."
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROGRAMMES.map((p, i) => (
          <PastelCard
            key={p.name}
            title={p.name}
            text={p.text}
            icon={p.icon}
            color={p.color}
            variant={i % 2 ? "inverse" : "default"}
            delay={i * 90}
          >
            {p.full && <p className="mt-2 text-xs font-bold uppercase tracking-wide text-muted/80">{p.full}</p>}
          </PastelCard>
        ))}
      </ul>
      {showAction && (
        <div className="mt-12 text-center">
          <Button to="/admissions">Apply for admission</Button>
        </div>
      )}
    </Section>
  );
}
