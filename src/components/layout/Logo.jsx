import { SITE } from "../../config/site";

/**
 * Official Play Place logo mark with wordmark.
 * REVIEW: only a 100×100 PNG is available — replace with a high-resolution or SVG logo.
 */
export default function Logo({ tone = "dark" }) {
  const dark = tone === "dark";
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white lg:h-12 lg:w-12">
        <img src={SITE.logo} alt="" width="48" height="48" className="h-full w-full object-contain" />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-xl font-semibold lg:text-[1.4rem] ${dark ? "text-navy" : "text-white"}`}>
          Play<span className="text-coral">Place</span>
        </span>
        <span className={`mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.16em] ${dark ? "text-green-ink" : "text-white/60"}`}>
          International School
        </span>
      </span>
    </span>
  );
}
