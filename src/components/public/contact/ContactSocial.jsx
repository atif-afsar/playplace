import Reveal from "../../common/Reveal";

const SOCIALS = [
  { icon: "photo_camera", color: "text-primary" },
  { icon: "videocam", color: "text-tertiary" },
  { icon: "groups", color: "text-secondary" },
];

export default function ContactSocial() {
  return (
    <Reveal className="mt-24 text-center">
      <h2 className="mb-8 text-2xl font-extrabold text-on-surface">Follow our daily adventures!</h2>
      <div className="flex justify-center gap-6">
        {SOCIALS.map((s) => (
          <a
            key={s.icon}
            href="#"
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-surface-variant bg-white shadow-[0_10px_30px_-5px_rgba(209,228,251,0.5)] transition-transform hover:scale-110"
          >
            <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
          </a>
        ))}
      </div>
    </Reveal>
  );
}
