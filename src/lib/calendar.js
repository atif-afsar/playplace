import { SCHOOL_MONTH_ORDER } from "./constants";

/** e.g. "2025-26" for academic year starting April 2025 */
export function getSchoolYear(date = new Date()) {
  const y = date.getFullYear();
  const m = date.getMonth();
  if (m >= 3) return `${y}-${String(y + 1).slice(-2)}`;
  return `${y - 1}-${String(y).slice(-2)}`;
}

export function schoolYearOptions(count = 3) {
  const current = getSchoolYear();
  const startY = parseInt(current.split("-")[0], 10);
  return Array.from({ length: count }, (_, i) => {
    const y = startY - 1 + i;
    return `${y}-${String(y + 1).slice(-2)}`;
  });
}

export function schoolYearLabel(schoolYear) {
  const startY = parseInt(schoolYear.split("-")[0], 10);
  return `Academic Year ${startY} – ${startY + 1}`;
}

/** Calendar year for a month index within school year (Apr=0 … Mar=11). */
export function monthYearForSchoolYear(schoolYear, monthIndex) {
  const startY = parseInt(schoolYear.split("-")[0], 10);
  const month = SCHOOL_MONTH_ORDER[monthIndex];
  const year = month >= 3 ? startY : startY + 1;
  return { year, month };
}

export function toDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseDateKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Monday-first week: 0 = Mon … 6 = Sun */
export function mondayFirstWeekday(date) {
  const d = date.getDay();
  return d === 0 ? 6 : d - 1;
}

export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/** Expand event to all date keys it covers (inclusive). */
export function eventDateKeys(event) {
  const keys = [];
  const start = parseDateKey(event.event_date);
  const end = event.end_date ? parseDateKey(event.end_date) : start;
  const cur = new Date(start);
  while (cur <= end) {
    keys.push(toDateKey(cur.getFullYear(), cur.getMonth(), cur.getDate()));
    cur.setDate(cur.getDate() + 1);
  }
  return keys;
}

/** Map events array → { 'YYYY-MM-DD': [events] } */
export function groupEventsByDate(events) {
  const map = {};
  for (const ev of events) {
    for (const key of eventDateKeys(ev)) {
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    }
  }
  return map;
}

export function formatEventDate(event) {
  const start = parseDateKey(event.event_date);
  const opts = { month: "short", day: "numeric", year: "numeric" };
  if (!event.end_date || event.end_date === event.event_date) {
    return start.toLocaleDateString("en-US", opts);
  }
  const end = parseDateKey(event.end_date);
  return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}`;
}
