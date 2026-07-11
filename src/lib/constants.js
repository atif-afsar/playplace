export const CLASS_OPTIONS = [
  "Playgroup",
  "Nursery",
  "LKG",
  "UKG",
  "Kindergarten 1",
  "Kindergarten 2",
];

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const TERMS = ["Term 1", "Term 2", "Term 3", "Final"];

export const EVENT_TYPES = [
  { value: "holiday", label: "Holiday", icon: "beach_access", color: "bg-error-container text-on-error-container" },
  { value: "term_start", label: "Term Start", icon: "play_arrow", color: "bg-tertiary-container text-on-tertiary-container" },
  { value: "term_end", label: "Term End", icon: "stop", color: "bg-secondary-container text-on-secondary-container" },
  { value: "exam", label: "Exam", icon: "edit_note", color: "bg-primary-fixed text-on-primary-fixed" },
  { value: "event", label: "School Event", icon: "celebration", color: "bg-primary-container text-on-primary-container" },
  { value: "closure", label: "Closure", icon: "block", color: "bg-surface-variant text-on-surface-variant" },
];

export const EVENT_TYPE_MAP = Object.fromEntries(EVENT_TYPES.map((t) => [t.value, t]));

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Academic year months in display order (April → March). */
export const SCHOOL_MONTH_ORDER = [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2];
