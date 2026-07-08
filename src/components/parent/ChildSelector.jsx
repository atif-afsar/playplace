import { initials } from "../../lib/format";

/**
 * Shows a chip per child. Hidden when the parent has only one child.
 * Read-only control — no admin actions here.
 */
export default function ChildSelector({ children, selectedId, onSelect }) {
  if (!children || children.length <= 1) return null;
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {children.map((c) => {
        const active = c.id === selectedId;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 transition-colors ${
              active
                ? "border-primary bg-primary-container/20"
                : "border-surface-variant bg-white hover:border-primary/40"
            }`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-container text-sm font-black text-on-primary-container">
              {initials(c.full_name)}
            </span>
            <span className="text-left">
              <span className="block text-sm font-bold text-on-surface">{c.full_name}</span>
              <span className="block text-xs font-medium text-on-surface-variant">{c.class || "Class TBA"}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
