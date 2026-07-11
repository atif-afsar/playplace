import Reveal from "../../common/Reveal";
import { SCHOOL_CONTACT, telHref } from "../../../lib/contact";

const SOCIALS = [
  { icon: "mail", color: "text-primary", href: `mailto:${SCHOOL_CONTACT.email}`, label: "Email us" },
  { icon: "call", color: "text-tertiary", href: telHref(SCHOOL_CONTACT.phones[0]), label: "Call us" },
  { icon: "location_on", color: "text-secondary", href: SCHOOL_CONTACT.mapsUrl, label: "Get directions", external: true },
];

export default function ContactSocial() {
  return (
    <Reveal className="mt-24 text-center">
      <h2 className="mb-8 text-2xl font-extrabold text-on-surface">Reach us anytime</h2>
      <div className="flex justify-center gap-6">
        {SOCIALS.map((s) => (
          <a
            key={s.icon}
            href={s.href}
            {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            title={s.label}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-surface-variant bg-white shadow-[0_10px_30px_-5px_rgba(209,228,251,0.5)] transition-transform hover:scale-110"
          >
            <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
          </a>
        ))}
      </div>
    </Reveal>
  );
}
