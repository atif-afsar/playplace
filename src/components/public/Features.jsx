import Reveal from "../common/Reveal";

const FEATURES = [
  {
    icon: "health_and_safety",
    ring: "bg-tertiary/10 text-tertiary",
    title: "Safe Environment",
    text: "Our campus is designed with a child-safe aesthetic, ensuring a secure and nurturing space for play.",
  },
  {
    icon: "extension",
    ring: "bg-secondary-container/40 text-secondary",
    title: "Playful Learning",
    text: "Curiosity is our curriculum. We use interactive play to teach foundational academic concepts.",
  },
  {
    icon: "school",
    ring: "bg-primary-container/30 text-primary",
    title: "Expert Teachers",
    text: "Dedicated educators who specialize in early childhood development and compassionate care.",
  },
  {
    icon: "palette",
    ring: "bg-tertiary-container/40 text-tertiary",
    title: "Fun Activities",
    text: "From finger painting to music, every day is packed with diverse creative explorations.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <Reveal className="mb-14 space-y-4 text-center">
        <h2 className="text-3xl font-extrabold text-on-background">Our Happy Little World</h2>
        <div className="mx-auto h-2 w-24 rounded-full bg-secondary-container" />
      </Reveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Reveal
            key={f.title}
            delay={i * 120}
            className="cloud-card flex flex-col items-center space-y-6 rounded-3xl bg-surface-container-lowest p-8 text-center"
          >
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-full ${f.ring}`}
            >
              <span className="material-symbols-outlined text-[44px]">{f.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-on-background">{f.title}</h3>
            <p className="text-base font-medium text-on-surface-variant">{f.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
