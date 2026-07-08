export function initials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

/** Percentage → letter grade, per PRD (90+ A, 75+ B, 60+ C, 40+ D, else F). */
export function calcGrade(marksObtained, maxMarks) {
  const max = Number(maxMarks) || 0;
  if (max <= 0) return "—";
  const pct = (Number(marksObtained) / max) * 100;
  if (pct >= 90) return "A";
  if (pct >= 75) return "B";
  if (pct >= 60) return "C";
  if (pct >= 40) return "D";
  return "F";
}
