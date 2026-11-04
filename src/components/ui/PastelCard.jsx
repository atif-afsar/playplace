import Icon from "./Icon";
import Reveal from "./Reveal";

const OUTER = {
  pink: "bg-pink-soft",
  green: "bg-green-soft",
  lilac: "bg-lilac-soft",
  yellow: "bg-yellow-soft",
  blue: "bg-blue-soft",
};
const ICON = {
  pink: "text-coral",
  green: "text-green-ink",
  lilac: "text-[#8a4fd0]",
  yellow: "text-[#a06c00]",
  blue: "text-blue",
};

/**
 * Pastel card: soft coloured background, large icon, white text panel.
 * Phones: compact row (icon left, text right). Tablet+: tall card as in the design reference.
 * `variant="inverse"` flips it (white card, pastel text panel).
 */
export default function PastelCard({ title, text, icon, color = "pink", variant = "default", delay = 0, as = "li", children }) {
  const inverse = variant === "inverse";
  return (
    <Reveal
      as={as}
      delay={delay}
      className={`group flex h-full flex-row items-stretch gap-1 rounded-3xl p-2.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift sm:flex-col sm:gap-0 sm:p-4 ${
        inverse ? "border border-line bg-white" : OUTER[color]
      }`}
    >
      <div className="flex w-14 shrink-0 items-center justify-center sm:block sm:w-auto sm:px-3 sm:pb-6 sm:pt-4">
        <Icon
          name={icon}
          className={`!text-[2.1rem] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:!text-[2.75rem] ${ICON[color]}`}
        />
      </div>
      <div className={`min-w-0 flex-1 rounded-2xl p-4 sm:mt-auto sm:flex-none sm:p-5 ${inverse ? OUTER[color] : "bg-white"}`}>
        <h3 className="text-[1.05rem] sm:text-lg">{title}</h3>
        {text && <p className="mt-1 text-sm leading-relaxed text-muted sm:mt-1.5 sm:text-[0.92rem]">{text}</p>}
        {children}
      </div>
    </Reveal>
  );
}
