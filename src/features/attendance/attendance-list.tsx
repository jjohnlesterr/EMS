import { Dot, type MenuOption } from "@/components/ui/MenuSelect";
import type { FilterDef, SortDef } from "@/lib/use-list";
import type { AttendanceRecord, AttendanceStatus } from "@/lib/types";

const STATUSES: { value: AttendanceStatus; label: string; dot: string }[] = [
  { value: "present", label: "Present", dot: "bg-st-present" },
  { value: "late", label: "Late", dot: "bg-st-late" },
  { value: "leave", label: "On Leave", dot: "bg-st-leave" },
  { value: "absent", label: "Absent", dot: "bg-st-absent" },
];

/** Status filter shared by the employee and department attendance tables. */
export const attendanceFilters: FilterDef<AttendanceRecord>[] = [
  { value: "all", label: "All records", description: "Show all attendance", predicate: () => true },
  ...STATUSES.map((s) => ({ value: s.value, label: s.label, predicate: (r: AttendanceRecord) => r.status === s.value })),
];

export const attendanceFilterOptions: MenuOption[] = [
  { value: "all", label: "All records", description: "Show all attendance", icon: <Dot className="bg-gray" /> },
  ...STATUSES.map((s) => ({ value: s.value, label: s.label, icon: <Dot className={s.dot} /> })),
];

export const byDateDesc: SortDef<AttendanceRecord> = {
  value: "newest",
  label: "Newest",
  compare: (a, b) => b.date.localeCompare(a.date),
};

/** CSV export of the visible attendance rows. */
export function downloadAttendanceCsv(rows: AttendanceRecord[], fileName: string) {
  const header = "Date,Time in,Time out,Status";
  const body = rows.map((r) => [r.date, r.timeIn ?? "", r.timeOut ?? "", r.status].join(","));
  const blob = new Blob([[header, ...body].join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
