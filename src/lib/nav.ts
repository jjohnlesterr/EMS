import type { Role } from "./types";

export type NavIcon = "dashboard" | "attendance" | "employees" | "tasks" | "announcements" | "leave";

export interface NavItem {
  label: string;
  href: string;
  icon: NavIcon;
}

/** Sidebar order follows the finalized Figma for each role. */
export const NAV_ITEMS: Record<Role, NavItem[]> = {
  employee: [
    { label: "Dashboard", href: "/employee/dashboard", icon: "dashboard" },
    { label: "Attendance", href: "/employee/attendance", icon: "attendance" },
    { label: "Tasks", href: "/employee/tasks", icon: "tasks" },
    { label: "Announcements", href: "/employee/announcements", icon: "announcements" },
    { label: "Leave Requests", href: "/employee/leave", icon: "leave" },
  ],
  manager: [
    { label: "Dashboard", href: "/manager/dashboard", icon: "dashboard" },
    { label: "Employee Management", href: "/manager/employees", icon: "employees" },
    { label: "Tasks", href: "/manager/tasks", icon: "tasks" },
    { label: "Leave Requests", href: "/manager/leave", icon: "leave" },
    { label: "Announcements", href: "/manager/announcements", icon: "announcements" },
  ],
};

export const ROLE_LABEL: Record<Role, string> = {
  employee: "Employee",
  manager: "Department Manager",
};

export const roleHome = (role: Role) => `/${role}/dashboard`;
export const profileHref = (role: Role) => `/${role}/profile`;
