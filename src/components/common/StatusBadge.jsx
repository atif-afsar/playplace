const STYLES = {
  // Admission statuses
  pending: {
    label: "Pending",
    className: "bg-secondary-container text-on-secondary-container border-secondary/20",
    dot: true,
  },
  approved: {
    label: "Approved",
    className: "bg-tertiary text-on-tertiary border-tertiary-fixed-dim",
    icon: "check_circle",
  },
  rejected: {
    label: "Rejected",
    className: "bg-error-container text-on-error-container border-error/20",
    icon: "cancel",
  },
  // Fee statuses
  paid: {
    label: "Paid",
    className: "bg-tertiary text-on-tertiary border-tertiary-fixed-dim",
    icon: "check_circle",
  },
  due: {
    label: "Due",
    className: "bg-secondary-container text-on-secondary-container border-secondary/20",
    dot: true,
  },
  overdue: {
    label: "Overdue",
    className: "bg-error-container text-on-error-container border-error/20",
    icon: "warning",
  },
  // Attendance / student statuses
  present: {
    label: "Present",
    className: "bg-tertiary text-on-tertiary border-tertiary-fixed-dim",
    icon: "check_circle",
  },
  absent: {
    label: "Absent",
    className: "bg-error-container text-on-error-container border-error/20",
    icon: "cancel",
  },
  active: {
    label: "Active",
    className: "bg-tertiary text-on-tertiary border-tertiary-fixed-dim",
    icon: "check_circle",
  },
  inactive: {
    label: "Inactive",
    className: "bg-surface-variant text-on-surface-variant border-outline-variant",
    dot: true,
  },
};

export default function StatusBadge({ status, label }) {
  const s = STYLES[status] || STYLES.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold shadow-sm ${s.className}`}
    >
      {s.dot && <span className="h-2 w-2 animate-pulse rounded-full bg-current opacity-70" />}
      {s.icon && (
        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {s.icon}
        </span>
      )}
      {label || s.label}
    </span>
  );
}
