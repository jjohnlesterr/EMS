const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Parses an ISO date (yyyy-mm-dd or full ISO) as a local calendar date. */
export function parseDate(iso: string): Date {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** "July 9, 2026" */
export function formatDate(iso: string): string {
  const d = parseDate(iso);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/** "Jul 9, 2026" */
export function formatShortDate(iso: string): string {
  const d = parseDate(iso);
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
}

/** "Thursday" */
export function formatWeekday(iso: string): string {
  return WEEKDAYS[parseDate(iso).getDay()];
}

/** "July 2026" */
export function formatMonth(iso: string): string {
  const d = parseDate(iso);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** "May 15 - May 18, 2026" */
export function formatRange(startIso: string, endIso: string): string {
  const s = parseDate(startIso);
  const e = parseDate(endIso);
  return `${MONTHS[s.getMonth()].slice(0, 3)} ${s.getDate()} - ${MONTHS[e.getMonth()].slice(0, 3)} ${e.getDate()}, ${e.getFullYear()}`;
}

/** "11:00 AM" from a full ISO timestamp. */
export function formatTime(iso: string): string {
  const [hh, mm] = iso.slice(11, 16).split(":").map(Number);
  const suffix = hh >= 12 ? "PM" : "AM";
  const h = hh % 12 === 0 ? 12 : hh % 12;
  return `${h}:${String(mm).padStart(2, "0")} ${suffix}`;
}

/** Inclusive day count between two ISO dates. */
export function daysBetween(startIso: string, endIso: string): number {
  const ms = parseDate(endIso).getTime() - parseDate(startIso).getTime();
  return Math.max(0, Math.round(ms / 86_400_000) + 1);
}

/** Relative "2 hours ago" label measured from the mock "now". */
export function timeAgo(iso: string, now: string): string {
  const diff = Math.max(0, new Date(now).getTime() - new Date(iso).getTime());
  const minutes = Math.round(diff / 60_000);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export function formatHours(hours?: number): string {
  if (hours === undefined) return "---";
  const whole = Math.floor(hours);
  const mins = Math.round((hours - whole) * 60);
  return mins ? `${whole}hrs ${mins}mins` : `${whole} hrs`;
}
