import Icon from "./Icon";
import Reveal from "./Reveal";

/** Bordered checklist rows that highlight on hover (and the first row by default). */
export default function CheckList({ items, className = "", highlightFirst = false }) {
  return (
    <ul className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item}
          delay={i * 70}
          className={`flex items-center gap-4 rounded-xl px-4 py-4 font-bold text-navy transition-colors duration-300 hover:bg-pink-soft ${
            highlightFirst && i === 1 ? "bg-pink-soft" : ""
          }`}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-navy/70">
            <Icon name="check" className="!text-lg" />
          </span>
          {item}
        </Reveal>
      ))}
    </ul>
  );
}
