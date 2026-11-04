import { ENVIRONMENT, PHOTOS } from "../../data/school";
import Button from "../ui/Button";
import CheckList from "../ui/CheckList";
import FramedPhoto from "../ui/FramedPhoto";
import Mark from "../ui/Mark";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import Doodle from "../ui/Doodle";

export default function EnvironmentSection() {
  return (
    <Section>
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <h2 className="text-[2rem] leading-[1.12] sm:text-[2.6rem]">
              A warm place where children <Mark color="green">learn confidently</Mark>
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              Play Place is a happy, balanced space where children feel loved, respected and excited to learn.
            </p>
            <div className="mt-7">
              <Button to="/academics">Our approach</Button>
            </div>
          </Reveal>
          <CheckList items={ENVIRONMENT} highlightFirst className="mt-10" />
        </div>
        <div className="relative">
          <Doodle shape="circle" color="text-coral/60" className="absolute -left-6 -top-6 z-10" size={52} slow />
          <FramedPhoto photo={PHOTOS.holiHandprints} />
        </div>
      </div>
    </Section>
  );
}
