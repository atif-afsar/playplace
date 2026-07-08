import { useEffect } from "react";

export default function AdminModal({ title, icon, onClose, children, footer, maxWidth = "max-w-lg" }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative flex max-h-[90vh] w-full ${maxWidth} flex-col overflow-hidden rounded-3xl border-2 border-surface-variant bg-surface-container-lowest shadow-2xl`}>
        <div className="flex items-center justify-between border-b-2 border-surface-variant p-6">
          <h3 className="flex items-center gap-2 text-2xl font-black text-on-surface">
            {icon && <span className="material-symbols-outlined text-primary">{icon}</span>}
            {title}
          </h3>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-variant"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 border-t-2 border-surface-variant bg-surface-container-low p-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
