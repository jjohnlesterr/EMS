import { CalendarDays, Clock3, ListChecks } from "lucide-react";
import { Dot, type MenuOption } from "@/components/ui/MenuSelect";
import type { FilterDef, SortDef } from "@/lib/use-list";
import type { AttendanceStatus, Employee } from "@/lib/types";

const timeValue = (t?: string) => {
  if (!t) return Number.POSITIVE_INFINITY;
  const [hm, mer] = t.split(" ");
  const [h, m] = hm.split(":").map(Number);
  return ((h % 12) + (mer === "PM" ? 12 : 0)) * 60 + m;
};

/** Sorts for any row that carries an employee name and an optional time in. */
export function nameTimeSorts<T>(name: (row: T) => string, timeIn: (row: T) => string | undefined): SortDef<T>[] {
  return [
    { value: "name", label: "Employee Name", compare: (a, b) => name(a).localeCompare(name(b)) },
    { value: "time", label: "Time In", compare: (a, b) => timeValue(timeIn(a)) - timeValue(timeIn(b)) },
  ];
}

export const nameTimeSortOptions: MenuOption[] = [
  { value: "name", label: "Employee Name", description: "A to Z", icon: <Clock3 /> },
  { value: "time", label: "Time In", description: "Earliest", icon: <CalendarDays /> },
];

const STATUSES: { value: AttendanceStatus; label: string; dot: string }[] = [
  { value: "present", label: "Present", dot: "bg-st-present" },
  { value: "late", label: "Late", dot: "bg-st-late" },
  { value: "leave", label: "On Leave", dot: "bg-st-leave" },
  { value: "absent", label: "Absent", dot: "bg-st-absent" },
];

export const employeeFilters: FilterDef<Employee>[] = [
  { value: "all", label: "All Employees", predicate: () => true },
  ...STATUSES.map((s) => ({ value: s.value, label: s.label, predicate: (e: Employee) => e.todayStatus === s.value })),
  { value: "inactive", label: "Inactive", predicate: (e) => e.employmentStatus === "inactive" },
];

export const employeeFilterOptions: MenuOption[] = [
  { value: "all", label: "All Employees", description: "Show all employees", icon: <ListChecks /> },
  ...STATUSES.map((s) => ({ value: s.value, label: s.label, icon: <Dot className={s.dot} /> })),
  { value: "inactive", label: "Inactive", description: "Deactivated accounts", icon: <Dot className="bg-gray" /> },
];
