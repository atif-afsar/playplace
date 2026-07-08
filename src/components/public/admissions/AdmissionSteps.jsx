import Reveal from "../../common/Reveal";

const STEPS = [
  {
    num: "1",
    ring: "bg-surface-container-low",
    title: "Fill Form",
    titleColor: "text-primary",
    text: "Tell us about your little one and your family's journey.",
    icon: "edit_note",
  },
  {
    num: "2",
    ring: "bg-secondary-container/20",
    title: "Submit Documents",
    titleColor: "text-secondary",
    text: "Provide necessary certificates and health records for safety.",
    icon: "description",
  },
  {
    num: "3",
    ring: "bg-tertiary-container/20",
    title: "Interaction Session",
    titleColor: "text-tertiary",
    text: "A friendly meet-and-greet to get to know our educators.",
    icon: "groups",
  },
  {
    num: "4",
    ring: "bg-primary-container/20",
    title: "Get Confirmation",
    titleColor: "text-primary-container",
    text: "Welcome to the family! Start your adventure with us.",
    icon: "celebration",
  },
];

export default function AdmissionSteps() {
  return (
    <section className="bg-surface-container-low px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-on-surface">Easy 4-Step Process</h2>
          <p className="text-base font-medium text-on-surface-variant">
            Simple and straightforward steps to enroll your child.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 100}
              className="cloud-card group flex flex-col items-center rounded-[2rem] bg-white p-8 text-center transition-transform duration-300 hover:scale-105"
            >
              <div className="relative mb-6 h-24 w-24">
                <div
                  className={`absolute inset-0 scale-110 rounded-full transition-transform group-hover:rotate-12 ${s.ring}`}
                />
                <div className="relative z-10 flex h-full w-full items-center justify-center">
                  <span className={`material-symbols-outlined text-5xl ${s.titleColor}`}>
                    {s.icon}
                  </span>
                </div>
              </div>
              <h3 className={`mb-2 text-xl font-bold ${s.titleColor}`}>{s.title}</h3>
              <p className="text-base font-medium text-on-surface-variant">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
