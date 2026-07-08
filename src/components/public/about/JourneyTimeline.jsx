import Reveal from "../../common/Reveal";

const MILESTONES = [
  {
    title: "Founded in 2010",
    titleColor: "text-primary",
    node: "bg-primary-container text-white",
    nodeIcon: "child_care",
    sideIcon: "auto_stories",
    sideColor: "text-primary-container",
    text: "Play Place opened its doors with just two classrooms and a big dream to redefine early childhood education through play.",
  },
  {
    title: "First Graduating Class 2016",
    titleColor: "text-secondary",
    node: "bg-secondary-container text-on-secondary-container",
    nodeIcon: "school",
    sideIcon: "toys",
    sideColor: "text-secondary-container",
    text: "A proud moment as our first cohort of 'Little Explorers' graduated to primary school, fully prepared and eager to learn.",
  },
  {
    title: "New Campus Wing 2022",
    titleColor: "text-tertiary",
    node: "bg-tertiary-container text-white",
    nodeIcon: "domain",
    sideIcon: "potted_plant",
    sideColor: "text-tertiary-container",
    text: "We expanded our facilities with a state-of-the-art sensory garden, a junior library, and an indoor imaginative play zone.",
  },
];

function Card({ m, align }) {
  return (
    <div
      className={`inline-block max-w-md rounded-[2rem] border-2 border-surface-variant bg-surface-container-lowest p-8 shadow-[0_10px_30px_-5px_rgba(159,65,34,0.1)] transition-transform hover:scale-105 ${
        align === "right" ? "md:text-right" : ""
      }`}
    >
      <h3 className={`mb-2 text-2xl font-extrabold ${m.titleColor}`}>{m.title}</h3>
      <p className="text-on-surface-variant">{m.text}</p>
    </div>
  );
}

export default function JourneyTimeline() {
  return (
    <section className="mx-auto max-w-[1200px] overflow-hidden px-6 py-16 md:py-24">
      <Reveal className="mb-16 text-center">
        <h2 className="text-4xl font-black text-on-surface sm:text-5xl">Our Journey</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-on-surface-variant">
          Growth is a wonderful adventure! Here are some of the milestones that shaped our school
          into the place it is today.
        </p>
      </Reveal>

      <div className="relative">
        <div className="absolute bottom-0 left-1/2 top-0 hidden w-1 -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_5px,#d1e4fb_5px,#d1e4fb_10px)] md:block" />

        <div className="relative space-y-16 md:space-y-24">
          {MILESTONES.map((m, i) => {
            const leftText = i % 2 === 0; // milestone card on the left for even rows
            return (
              <Reveal
                key={m.title}
                className="flex flex-col items-center gap-8 md:flex-row md:gap-0"
              >
                {/* Left slot */}
                <div className="order-2 flex-1 md:order-1 md:pr-16 md:text-right">
                  {leftText ? (
                    <div className="flex justify-center md:justify-end">
                      <Card m={m} align="right" />
                    </div>
                  ) : (
                    <div className="hidden items-center justify-end gap-4 opacity-40 md:flex">
                      <span className={`material-symbols-outlined text-5xl ${m.sideColor}`}>
                        {m.sideIcon}
                      </span>
                    </div>
                  )}
                </div>

                {/* Node */}
                <div
                  className={`order-1 z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white shadow-lg md:order-2 ${m.node}`}
                >
                  <span className="material-symbols-outlined text-4xl">{m.nodeIcon}</span>
                </div>

                {/* Right slot */}
                <div className="order-3 flex-1 md:pl-16">
                  {leftText ? (
                    <div className="hidden items-center gap-4 opacity-40 md:flex">
                      <span className={`material-symbols-outlined text-5xl ${m.sideColor}`}>
                        {m.sideIcon}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-center md:justify-start">
                      <Card m={m} align="left" />
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
