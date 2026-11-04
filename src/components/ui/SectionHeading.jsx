import Doodle from "./Doodle";

/**
 * Display heading with optional eyebrow and short intro.
 * Pass JSX as `title` and wrap words in <Mark> for the highlighter effect.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  tone = "dark",
  className = "",
  doodle = false,
}) {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <div className={`relative ${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {doodle && <Doodle className={`absolute -top-6 ${centered ? "left-1/2 ml-28" : "-left-3"} hidden sm:block`} />}
      {eyebrow && (
        <p
          className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] ${
            dark ? "bg-pink-soft text-coral" : "bg-white/15 text-yellow"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <Tag className={`text-[2rem] leading-[1.12] sm:text-[2.6rem] ${dark ? "" : "!text-white"}`}>{title}</Tag>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed sm:text-[1.05rem] ${dark ? "text-muted" : "text-white/80"}`}>{intro}</p>
      )}
    </div>
  );
}
