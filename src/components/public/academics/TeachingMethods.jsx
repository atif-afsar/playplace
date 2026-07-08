import Reveal from "../../common/Reveal";

const METHODS = [
  {
    title: "Play-based Learning",
    border: "border-secondary-container",
    ring: "bg-secondary-container/20",
    icon: "extension",
    text: "Learning through exploration, discovery, and hands-on activities.",
  },
  {
    title: "Story Telling",
    border: "border-primary-container",
    ring: "bg-primary-container/20",
    icon: "auto_stories",
    text: "Sparking imagination and language skills through engaging narratives.",
  },
  {
    title: "Art & Craft",
    border: "border-tertiary-container",
    ring: "bg-tertiary-container/20",
    icon: "palette",
    text: "Encouraging creativity and self-expression through various mediums.",
  },
  {
    title: "Outdoor Activities",
    border: "border-surface-variant",
    ring: "bg-surface-variant/30",
    icon: "park",
    text: "Promoting physical health and a love for nature through active play.",
  },
];

export default function TeachingMethods() {
  return (
    <section className="bg-surface-container py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <Reveal className="mb-16 flex flex-col items-end justify-between gap-4 md:flex-row">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-primary sm:text-5xl">How We Teach</h2>
            <p className="max-w-xl text-lg font-medium text-on-surface-variant">
              We blend traditional excellence with modern pedagogy to create a vibrant learning
              environment.
            </p>
          </div>
          <span className="material-symbols-outlined hidden text-7xl text-secondary-fixed-dim md:block">
            celebration
          </span>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {METHODS.map((m, i) => (
            <Reveal
              key={m.title}
              delay={i * 100}
              className={`group rounded-2xl border-b-8 bg-surface-container-lowest p-8 transition-all duration-300 hover:-translate-y-2 ${m.border}`}
            >
              <div
                className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${m.ring}`}
              >
                <span className="material-symbols-outlined text-5xl text-primary">{m.icon}</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-on-surface">{m.title}</h3>
              <p className="text-base font-medium text-on-surface-variant">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
