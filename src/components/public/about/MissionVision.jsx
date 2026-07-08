import Reveal from "../../common/Reveal";

const CARDS = [
  {
    icon: "auto_awesome",
    title: "Our Mission",
    titleColor: "text-primary",
    underline: "bg-primary-container",
    text: "We are dedicated to nurturing creativity and curiosity in every child. By providing a safe, joyful environment, we inspire our little learners to explore the world through structured play and imaginative discovery.",
  },
  {
    icon: "public",
    title: "Our Vision",
    titleColor: "text-tertiary",
    underline: "bg-tertiary-container",
    text: "To empower future global citizens who are compassionate, resilient, and lifelong learners. We envision a world where the foundations of early childhood set the stage for a lifetime of wonder and contribution.",
  },
];

export default function MissionVision() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {CARDS.map((c, i) => (
          <Reveal
            key={c.title}
            delay={i * 140}
            className="group relative overflow-hidden rounded-[2.5rem] border-2 border-surface-variant bg-surface-container-lowest p-10 shadow-[0_10px_30px_-5px_rgba(159,65,34,0.1)] transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
              <span className="material-symbols-outlined text-[128px]">{c.icon}</span>
            </div>
            <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface-variant/40 shadow-lg shadow-primary/10">
                <span className={`material-symbols-outlined text-5xl ${c.titleColor}`}>{c.icon}</span>
              </div>
              <h2 className={`text-3xl font-extrabold ${c.titleColor}`}>{c.title}</h2>
              <p className="text-lg font-medium text-on-surface-variant">{c.text}</p>
              <div className={`h-2 w-16 rounded-full ${c.underline}`} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
