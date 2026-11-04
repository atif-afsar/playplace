const TONES = {
  info: "border-blue/20 bg-blue-soft text-navy [&_.icon]:text-blue",
  warning: "border-yellow bg-yellow-soft text-navy [&_.icon]:text-[#9a6a00]",
  dark: "border-white/15 bg-white/5 text-white/85 [&_.icon]:text-yellow",
};

/** Inline note for "proposed", "future concept" and hand-off explanations. */
export default function Notice({ icon = "info", tone = "info", className = "", children, ...rest }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm leading-relaxed ${TONES[tone]} ${className}`}
      {...rest}
    >
      <span data-icon={icon} className="icon mt-0.5 !text-lg" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
