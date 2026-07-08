import Reveal from "../../common/Reveal";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA6eDY6iqQLWjhSj-x69fecpa-wEpR2-A5r9V1UuZn4O9EFH2TYCXDIzclhLM8NmsyEY4WNl_Ovi1G1YNF2toxVL4V4kBLh4Q-siLiHMeI56uBri22wFQx5hiAmeMn5wHsjkVyAokuINKz6Fr1-HTOcgYb_e0EH-OmXBlyOBnL7893b5KGYSqGRae2z0oxZWeXoykaZUFzeL4RK2e11RJYgsLzYG3rA6zM995Uf632a8JLbwySU-yTw";

export default function AdmissionsHero() {
  return (
    <section className="relative mx-auto max-w-[1200px] overflow-hidden px-6 pb-24 pt-12">
      <div className="bubble-shape absolute -z-10 right-0 top-0 h-96 w-96 bg-surface-container-high opacity-50 blur-3xl" />
      <div className="bubble-shape absolute -z-10 bottom-0 left-0 h-72 w-72 bg-secondary-container opacity-30 blur-3xl" />

      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal className="order-2 md:order-1">
          <h1 className="mb-6 text-4xl font-black leading-tight text-primary sm:text-5xl">
            Join the <span className="text-secondary">Play Place</span> Family!
          </h1>
          <p className="mb-8 max-w-lg text-lg font-medium text-on-surface-variant">
            Embark on a journey of discovery, creativity, and joy. Our admissions process is
            designed to be as friendly and warm as our classrooms.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#apply-form"
              className="bouncy-button rounded-2xl border-[#7f2a0d] bg-primary px-8 py-4 text-xl font-bold text-white transition-transform hover:scale-105"
            >
              Start Application
            </a>
            <button
              type="button"
              className="flex items-center gap-2 rounded-2xl border-2 border-primary px-6 py-4 text-sm font-bold text-primary transition-all hover:bg-primary-fixed/20"
            >
              <span className="material-symbols-outlined">download</span>
              Download Brochure
            </button>
          </div>
        </Reveal>

        <Reveal delay={120} className="order-1 flex justify-center md:order-2">
          <div className="relative aspect-square w-full max-w-md">
            <div className="absolute inset-0 scale-95 rotate-3 rounded-[2rem] bg-surface-variant opacity-50" />
            <img
              src={HERO_IMG}
              alt="Children walking through Welcome to Play Place archway"
              className="relative z-10 h-full w-full rounded-[2rem] border-4 border-white object-cover shadow-xl"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
