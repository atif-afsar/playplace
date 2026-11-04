import { HEROES } from "../../data/school";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Doodle from "../ui/Doodle";
import Mark from "../ui/Mark";

export default function HomeHero() {
  const photo = HEROES.home;
  return (
    <section className="px-3 pt-2 sm:px-5">
      <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[2rem] bg-navy">
        <img
          src={photo.src}
          srcSet={photo.srcSet || `${photo.srcSmall} 560w, ${photo.src} 960w`}
          sizes="100vw"
          alt={photo.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full animate-kenburns object-cover"
          style={{ objectPosition: photo.position }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/25 via-50% to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy/60 to-transparent lg:hidden" aria-hidden="true" />

        <Doodle shape="star" color="text-yellow" className="absolute left-[46%] top-14 hidden md:block" size={34} />
        <Doodle shape="squiggle" color="text-green" className="absolute bottom-16 left-[38%] hidden md:block" size={56} slow />

        <Container className="relative flex min-h-[560px] flex-col justify-between gap-10 py-14 sm:min-h-[620px] lg:flex-row lg:items-end lg:py-20">
          <div className="max-w-2xl self-center lg:self-auto lg:pb-16">
            <p className="mb-5 inline-flex animate-fade-up items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold text-white backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-yellow" aria-hidden="true" />
              Preschool &amp; Play School in Aligarh
            </p>
            <h1 className="animate-fade-up text-[2.7rem] leading-[1.05] !text-white sm:text-6xl lg:text-7xl">
              Build a brighter beginning. Grow with <Mark color="light">Play Place.</Mark>
            </h1>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:150ms]">
              <Button to="/admissions" size="lg">
                Admissions
              </Button>
              <Button to="/franchise" variant="glass" size="lg">
                Explore franchise
              </Button>
            </div>
          </div>

          <div className="w-full max-w-sm animate-fade-up self-end rounded-3xl border border-white/15 bg-navy/55 p-6 text-white backdrop-blur-md [animation-delay:300ms]">
            <p className="leading-relaxed text-white/90">
              A play-based preschool in Aligarh for Playgroup to UKG — now inviting franchise partners to bring Play
              Place to their cities.
            </p>
            <div className="mt-5">
              <Button to="/academics" size="sm">
                Explore programmes
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
