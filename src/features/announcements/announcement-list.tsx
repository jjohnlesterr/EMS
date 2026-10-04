import { CalendarDays, Clock3, ListChecks, Mail, MailOpen, MessageSquareDot, Timer } from "lucide-react";
import type { MenuOption } from "@/components/ui/MenuSelect";
import type { FilterDef, SortDef } from "@/lib/use-list";
import type { Announcement } from "@/lib/types";

export const announcementSorts: SortDef<Announcement>[] = [
  { value: "newest", label: "Newest", compare: (a, b) => b.postedAt.localeCompare(a.postedAt) },
  { value: "oldest", label: "Oldest First", compare: (a, b) => a.postedAt.localeCompare(b.postedAt) },
];

export const announcementSortOptions: MenuOption[] = [
  { value: "newest", label: "Newest", description: "Latest announcement", icon: <Clock3 /> },
  { value: "oldest", label: "Oldest First", description: "oldest first", icon: <CalendarDays /> },
];

/** Employee filter: read state. */
export const readFilters: FilterDef<Announcement>[] = [
  { value: "all", label: "All Announcement", predicate: () => true },
  { value: "unread", label: "Unread", predicate: (a) => !a.read },
  { value: "read", label: "Read", predicate: (a) => a.read },
];

export const readFilterOptions: MenuOption[] = [
  { value: "all", label: "All Announcement", description: "Show all", icon: <ListChecks /> },
  { value: "unread", label: "Unread", description: "Show unread only", icon: <Mail /> },
  { value: "read", label: "Read", description: "Show read only", icon: <MailOpen /> },
];

/** Manager filter: publishing state. */
export const statusFilters: FilterDef<Announcement>[] = [
  { value: "all", label: "All Announcement", predicate: () => true },
  { value: "published", label: "Published", predicate: (a) => a.status === "published" },
  { value: "scheduled", label: "Scheduled", predicate: (a) => a.status === "scheduled" },
  { value: "draft", label: "Draft", predicate: (a) => a.status === "draft" },
];

export const statusFilterOptions: MenuOption[] = [
  { value: "all", label: "All Announcement", description: "Show all", icon: <ListChecks /> },
  { value: "published", label: "Published", description: "Already posted", icon: <MessageSquareDot /> },
  { value: "scheduled", label: "Scheduled", description: "Posted soon", icon: <Timer /> },
  { value: "draft", label: "Draft", description: "Not posted yet", icon: <Mail /> },
];
