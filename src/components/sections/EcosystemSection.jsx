import { useId, useState } from "react";
import { PILLARS } from "../../data/pillars";
import { SITE } from "../../config/site";
import Icon from "../ui/Icon";
import IconBadge from "../ui/IconBadge";
import Mark from "../ui/Mark";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const ACTIVE = {
  pink: "bg-coral text-white",
  green: "bg-green-ink text-white",
  lilac: "bg-[#8a4fd0] text-white",
  yellow: "bg-[#d69a00] text-white",
  blue: "bg-blue text-white",
};

/**
 * The eight pillars as a connected circle around the Play Place logo.
 * Desktop: interactive (hover / focus / click a pillar). Mobile: card grid.
 */
export default function EcosystemSection({ tone = "white" }) {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const pillar = PILLARS[active];

  return (
    <Section tone={tone} id="pillars">
      <SectionHeading
        align="center"
        doodle
        title={
          <>
            Eight pillars, <Mark>one support system</Mark>
          </>
        }
        intro="Everything a partner needs to open and run a quality preschool."
      />

      <div className="mt-14 hidden items-center gap-12 lg:grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative mx-auto aspect-square w-full max-w-[540px]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow [animation-duration:60s]" aria-hidden="true">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#e6ebf1" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
          </svg>
          <div className="absolute inset-[24%] rounded-full bg-blue-soft" aria-hidden="true" />
          <div className="absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white shadow-lift">
            <img src={SITE.logo} alt="" width="56" height="56" className="h-14 w-14 object-contain" />
            <span className="mt-1 font-display text-sm font-semibold text-navy">Play Place</span>
          </div>

          <ul aria-label="Franchise ecosystem pillars">
            {PILLARS.map((p, i) => {
              const a = ((-90 + i * 45) * Math.PI) / 180;
              const isActive = i === active;
              return (
                <li
                  key={p.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${50 + 38 * Math.cos(a)}%`, top: `${50 + 38 * Math.sin(a)}%` }}
                >
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-controls={panelId}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex w-32 flex-col items-center gap-2 text-center"
                  >
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-soft transition-all duration-300 ${
                        isActive ? `${ACTIVE[p.color]} scale-110` : "bg-white text-navy group-hover:scale-105"
                      }`}
                    >
                      <Icon name={p.icon} />
                    </span>
                    <span className={`text-[0.8rem] font-bold leading-tight ${isActive ? "text-navy" : "text-muted"}`}>
                      {p.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div id={panelId} aria-live="polite">
          <div key={pillar.id} className="animate-pop rounded-3xl bg-cream p-8">
            <IconBadge name={pillar.icon} color={pillar.color} size="lg" />
            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.14em] text-coral">Pillar {pillar.number}</p>
            <h3 className="mt-1 text-3xl">{pillar.title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">{pillar.summary}</p>
            <ul className="mt-6 space-y-3">
              {pillar.points.map((pt) => (
                <li key={pt} className="flex items-center gap-3 font-bold text-navy">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-soft text-green-ink">
                    <Icon name="check" className="!text-base" />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
        {PILLARS.map((p, i) => (
          <Reveal as="li" key={p.id} delay={(i % 2) * 70} className="rounded-3xl bg-cream p-5">
            <div className="flex items-center gap-3">
              <IconBadge name={p.icon} color={p.color} size="sm" />
              <h3 className="text-lg">{p.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
