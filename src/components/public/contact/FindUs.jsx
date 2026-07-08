import Reveal from "../../common/Reveal";

const MAP_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC4b2Lw3jtrjViAhCbdB06zUMiTo6xwsj4RFnoKcbbc08cX0XwxzKJgOm3wAVDhKWVSwhk7SQGOgL_DWGpxjAitTzuy1MdQ84OyV1fEToGYHCEwJKJ7OmjlNDk_z5R5L6aY8dj0_H6oYl4kq-OgZKMy7qmv1Mus-2Jpwa_BvrKIdfvpJnui12Q5d1XSs26hG26qVc8AxJX0w83W9t50ub1SDc6sxYEXImLKVWUSgeAvWGsJWz0n3tlu";

const INFO = [
  {
    icon: "location_on",
    ring: "bg-tertiary-container text-on-tertiary-container",
    title: "School Campus",
    lines: ["123 Learning Lane, Playful Valley,", "Education City, EC 56789"],
  },
  {
    icon: "call",
    ring: "bg-secondary-container text-on-secondary-container",
    title: "Call Us",
    lines: ["+1 (800) PLAY-SCHOOL", "Mon – Fri, 8am – 4pm"],
  },
  {
    icon: "mail",
    ring: "bg-surface-dim text-primary",
    title: "Email Us",
    lines: ["admissions@playplace.edu", "general@playplace.edu"],
  },
];

export default function FindUs() {
  return (
    <div className="space-y-6">
      <Reveal className="rounded-[2rem] border-2 border-surface-variant bg-surface-container-high p-8 shadow-[0_10px_30px_-5px_rgba(209,228,251,0.5)] md:p-12">
        <h2 className="mb-8 text-3xl font-extrabold text-primary">Find Us</h2>
        <div className="space-y-6">
          {INFO.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.ring}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {item.icon}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface">{item.title}</h3>
                {item.lines.map((line) => (
                  <p key={line} className="text-base font-medium text-on-surface-variant">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={100} className="group relative h-80 overflow-hidden rounded-[2rem] border-2 border-surface-variant shadow-[0_10px_30px_-5px_rgba(209,228,251,0.5)]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${MAP_IMG}')` }}
        />
        <div className="absolute inset-0 bg-black/5" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2 rounded-full border-2 border-primary bg-white p-4 shadow-lg">
            <span className="material-symbols-outlined text-[32px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <span className="font-bold text-primary">Play Place School</span>
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          <button
            type="button"
            className="rounded-full border border-outline-variant bg-white/90 px-4 py-2 text-sm font-bold text-on-surface backdrop-blur-sm transition-colors hover:bg-white"
          >
            Open in Maps
          </button>
        </div>
      </Reveal>
    </div>
  );
}
