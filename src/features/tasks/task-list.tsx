import { CalendarDays, Clock3, ListChecks } from "lucide-react";
import { Dot, type MenuOption } from "@/components/ui/MenuSelect";
import type { FilterDef, SortDef } from "@/lib/use-list";
import type { Task, TaskStatus } from "@/lib/types";

export const taskSorts: SortDef<Task>[] = [
  { value: "newest", label: "Newest Tasks", description: "Recently Assigned", compare: (a, b) => b.dateAssigned.localeCompare(a.dateAssigned) },
  { value: "due", label: "Due Date", description: "Sort by Due date", compare: (a, b) => a.dueDate.localeCompare(b.dueDate) },
];

export const taskSortOptions: MenuOption[] = [
  { value: "newest", label: "Newest Tasks", description: "Recently Assigned", icon: <Clock3 /> },
  { value: "due", label: "Due Date", description: "Sort by Due date", icon: <CalendarDays /> },
];

const STATUS_FILTERS: { value: TaskStatus; label: string; description: string; dot: string }[] = [
  { value: "not-started", label: "Not Started", description: "not yet started", dot: "bg-st-todo-edge" },
  { value: "in-progress", label: "In Progress", description: "Tasks in progress", dot: "bg-st-progress" },
  { value: "completed", label: "Completed", description: "Completed Tasks", dot: "bg-green" },
  { value: "overdue", label: "Overdue", description: "Overdue Tasks", dot: "bg-primary" },
];

export const taskFilters: FilterDef<Task>[] = [
  { value: "all", label: "All Tasks", predicate: () => true },
  ...STATUS_FILTERS.map((s) => ({ value: s.value, label: s.label, predicate: (t: Task) => t.status === s.value })),
];

export const taskFilterOptions: MenuOption[] = [
  { value: "all", label: "All Tasks", description: "Show all tasks", icon: <ListChecks /> },
  ...STATUS_FILTERS.map((s) => ({ value: s.value, label: s.label, description: s.description, icon: <Dot className={s.dot} /> })),
];
