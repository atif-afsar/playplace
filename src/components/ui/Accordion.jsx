import { useId, useState } from "react";
import Icon from "./Icon";

/**
 * Accessible accordion: real <button>s with aria-expanded / aria-controls,
 * keyboard operable with Tab, Enter and Space.
 */
export default function Accordion({ items, headingLevel = 3, defaultOpen = 0 }) {
  const baseId = useId();
  const [open, setOpen] = useState(defaultOpen);
  const Heading = `h${headingLevel}`;

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div
            key={item.q}
            className={`rounded-2xl border transition-colors duration-300 ${isOpen ? "border-transparent bg-pink-soft" : "border-line bg-white hover:border-navy/20"}`}
          >
            <Heading className="!font-sans !text-base !tracking-normal">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-navy sm:px-6 sm:py-5"
              >
                <span>{item.q}</span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-45 bg-coral text-white" : "bg-blue-soft text-navy"
                  }`}
                >
                  <Icon name="add" className="!text-xl" />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 leading-relaxed text-muted sm:px-6"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
