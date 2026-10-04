import type {
  AnnouncementStatus,
  AttendanceStatus,
  EmploymentStatus,
  LeaveStatus,
  TaskStatus,
} from "./types";

/**
 * Single source of truth for every status badge in the app.
 * `variant` picks the badge shape used in Figma:
 *  - "solid": filled pill with white text + icon (attendance, announcements)
 *  - "outlined": filled chip with darker 1px edge and dark text (tasks)
 *  - "dot": tinted pill with a colored dot (leave requests)
 */
export type BadgeVariant = "solid" | "outlined" | "dot";
export type BadgeIcon = "check" | "user-x" | "alarm" | "plane" | "clock" | "x-circle" | "none";

export interface BadgeStyle {
  label: string;
  variant: BadgeVariant;
  className: string;
  icon?: BadgeIcon;
  dotClassName?: string;
}

export type StatusKey =
  | `attendance:${AttendanceStatus}`
  | `task:${TaskStatus}`
  | `leave:${LeaveStatus}`
  | `announcement:${AnnouncementStatus}`
  | `employment:${EmploymentStatus}`;

export const STATUS_STYLES: Record<StatusKey, BadgeStyle> = {
  "attendance:present": { label: "Present", variant: "solid", icon: "check", className: "bg-st-present text-white" },
  "attendance:absent": { label: "Absent", variant: "solid", icon: "user-x", className: "bg-st-absent text-white" },
  "attendance:late": { label: "Late", variant: "solid", icon: "alarm", className: "bg-st-late text-white" },
  "attendance:leave": { label: "Leave", variant: "solid", icon: "plane", className: "bg-st-leave text-white" },

  "task:in-progress": { label: "In Progress", variant: "outlined", className: "bg-st-progress border-st-progress-edge text-black" },
  "task:completed": { label: "Completed", variant: "outlined", className: "bg-green border-st-done-edge text-black" },
  "task:not-started": { label: "Not started", variant: "outlined", className: "bg-st-todo border-st-todo-edge text-black" },
  "task:overdue": { label: "Overdue", variant: "outlined", className: "bg-orange border-[#c26a1d] text-black" },

  "leave:approved": { label: "Approved", variant: "dot", className: "bg-[#dcf5e4] text-black", dotClassName: "bg-st-present" },
  "leave:pending": { label: "Pending", variant: "dot", className: "bg-[#ffe9cc] text-black", dotClassName: "bg-orange" },
  "leave:rejected": { label: "Rejected", variant: "dot", className: "bg-[#ffe0e0] text-black", dotClassName: "bg-st-absent" },

  "announcement:published": { label: "Published", variant: "solid", className: "bg-st-present text-white" },
  "announcement:draft": { label: "Draft", variant: "solid", className: "bg-st-late text-white" },
  "announcement:scheduled": { label: "Scheduled", variant: "solid", className: "bg-st-leave text-white" },

  "employment:active": { label: "Active", variant: "dot", className: "bg-[#dcf5e4] text-black", dotClassName: "bg-green" },
  "employment:inactive": { label: "Inactive", variant: "dot", className: "bg-[#ffe0e0] text-black", dotClassName: "bg-st-absent" },
};

/** Row stripe colors used by the attendance/employee tables. */
export const ATTENDANCE_STRIPE: Record<AttendanceStatus, string> = {
  present: "bg-st-present",
  absent: "bg-st-absent",
  late: "bg-st-late",
  leave: "bg-st-leave",
};

export const TASK_STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "not-started", label: "Not Started" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];
