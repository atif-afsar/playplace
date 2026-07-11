import Reveal from "../../common/Reveal";
import { CONTACT_CARDS, SCHOOL_CONTACT, telHref } from "../../../lib/contact";

export default function FindUs() {
  return (
    <div className="space-y-6">
      <Reveal className="rounded-[2rem] border-2 border-surface-variant bg-surface-container-high p-8 shadow-[0_10px_30px_-5px_rgba(209,228,251,0.5)] md:p-12">
        <h2 className="mb-8 text-3xl font-extrabold text-primary">Find Us</h2>
        <div className="space-y-8">
          {CONTACT_CARDS.map((item) => (
            <div key={item.icon} className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.ring}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {item.icon}
                </span>
              </div>
              <div>
                {item.title && (
                  <a
                    href={item.href}
                    className="text-xl font-bold text-primary transition-colors hover:underline"
                  >
                    {item.title}
                  </a>
                )}
                {item.lines.map((line) =>
                  item.icon === "call" ? (
                    <a
                      key={line}
                      href={telHref(line)}
                      className="block text-base font-bold text-primary transition-colors hover:underline"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="text-base font-bold leading-snug text-on-surface">
                      {line}
                    </p>
                  )
                )}
                {item.sub && (
                  <p className="mt-1 text-base font-medium text-on-surface-variant">{item.sub}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={100} className="overflow-hidden rounded-[2rem] border-2 border-surface-variant shadow-[0_10px_30px_-5px_rgba(209,228,251,0.5)]">
        <div className="relative aspect-[4/3] w-full min-h-[320px] bg-surface-variant">
          <iframe
            src={SCHOOL_CONTACT.mapsEmbedUrl}
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Play Place International School — near Monarch Apartments, Aligarh"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-surface-variant bg-surface-container-low px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <span className="text-sm font-bold text-on-surface">Near Monarch Apartments, Aligarh</span>
          </div>
          <a
            href={SCHOOL_CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-white px-4 py-2 text-sm font-bold text-on-surface transition-colors hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-lg">directions</span>
            Open in Maps
          </a>
        </div>
      </Reveal>
    </div>
  );
}
