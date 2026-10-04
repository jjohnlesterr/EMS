import { CalendarDays, Clock3, ListChecks } from "lucide-react";
import { Dot, type MenuOption } from "@/components/ui/MenuSelect";
import type { FilterDef, SortDef } from "@/lib/use-list";
import type { LeaveRequest, LeaveStatus } from "@/lib/types";

export const leaveSorts: SortDef<LeaveRequest>[] = [
  { value: "newest", label: "Newest Request", compare: (a, b) => b.submittedAt.localeCompare(a.submittedAt) || b.id.localeCompare(a.id) },
  { value: "oldest", label: "Oldest First", compare: (a, b) => a.submittedAt.localeCompare(b.submittedAt) },
];

export const leaveSortOptions: MenuOption[] = [
  { value: "newest", label: "Newest Request", description: "Most recent first", icon: <Clock3 /> },
  { value: "oldest", label: "Oldest First", description: "Oldest first", icon: <CalendarDays /> },
];

const STATUSES: { value: LeaveStatus; label: string; dot: string }[] = [
  { value: "pending", label: "Pending", dot: "bg-orange" },
  { value: "approved", label: "Approved", dot: "bg-st-present" },
  { value: "rejected", label: "Rejected", dot: "bg-st-absent" },
];

export const leaveFilters: FilterDef<LeaveRequest>[] = [
  { value: "all", label: "All Status", predicate: () => true },
  ...STATUSES.map((s) => ({ value: s.value, label: s.label, predicate: (l: LeaveRequest) => l.status === s.value })),
];

export const leaveFilterOptions: MenuOption[] = [
  { value: "all", label: "All Status", description: "Show all status", icon: <ListChecks /> },
  ...STATUSES.map((s) => ({ value: s.value, label: s.label, icon: <Dot className={s.dot} /> })),
];
