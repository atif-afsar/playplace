import Reveal from "../../common/Reveal";

const LEVELS = [
  {
    title: "Playgroup",
    ring: "bg-secondary-container/30",
    icon: "toys",
    text: "A gentle introduction to school life through play and social interaction.",
  },
  {
    title: "Nursery",
    ring: "bg-tertiary-container/30",
    icon: "local_florist",
    text: "Developing foundational skills, language, and motor coordination.",
  },
  {
    title: "LKG",
    ring: "bg-primary-container/20",
    icon: "cottage",
    text: "Building early literacy, numeracy, and environmental awareness.",
  },
  {
    title: "UKG",
    ring: "bg-surface-variant/40",
    icon: "public",
    text: "Preparing for primary school with advanced phonics and problem-solving.",
  },
  {
    title: "Grade 1–2",
    ring: "bg-primary-fixed/40",
    icon: "menu_book",
    text: "Deepening academic knowledge through a creative and structured curriculum.",
  },
];

export default function LearningJourney() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 md:px-16">
      <Reveal className="mb-16 space-y-4 text-center">
        <h2 className="text-3xl font-extrabold text-on-surface">Our Learning Journey</h2>
        <p className="mx-auto max-w-2xl text-lg font-medium text-on-surface-variant">
          From the first steps in Playgroup to the creative challenges of Grade 2, we support
          your child at every stage of their development.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {LEVELS.map((level, i) => (
          <Reveal
            key={level.title}
            delay={i * 80}
            className="card-glow group relative flex flex-col items-center rounded-[2rem] border-2 border-surface-variant bg-surface-container-lowest p-6 text-center"
          >
            <div
              className={`mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full ${level.ring}`}
            >
              <span className="material-symbols-outlined text-5xl text-primary transition-transform group-hover:scale-110">
                {level.icon}
              </span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-primary">{level.title}</h3>
            <p className="text-base font-medium leading-snug text-on-surface-variant">
              {level.text}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
