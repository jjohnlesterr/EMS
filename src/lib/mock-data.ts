/**
 * Mock data for the frontend-only phase. Shapes mirror src/lib/types.ts so the
 * store can later be swapped for API calls without touching components.
 * Visible rows reproduce the Figma content; the rest pad lists to Figma's
 * "Showing X of Y" totals.
 */
import type {
  Announcement,
  AppNotification,
  AttendanceRecord,
  AttendanceStatus,
  Employee,
  LeaveRequest,
  Task,
} from "./types";

/** Mock "now" — the Figma screens are dated Thursday, July 9, 2026. */
export const NOW = "2026-07-09T10:00:00";
export const TODAY = NOW.slice(0, 10);

export const DEPARTMENT = "Information Technology";

const base = {
  department: DEPARTMENT,
  birthDate: "2005-01-17",
  civilStatus: "Single" as const,
  address: "San Antonio, Nueva Ecija, Philippines",
  employeeType: "Regular" as const,
  dateHired: "2026-07-15",
  workLocation: "Main Office",
  supervisor: "Bryl Lim",
  employmentStatus: "active" as const,
  phone: "09971506683",
};

const FIGMA_EMPLOYEES: Employee[] = [
  {
    ...base, id: "u-john", employeeId: "EMP-2026-12345", name: "John Lester Tan", firstName: "Tan",
    role: "employee", position: "Full-Stack Developer", email: "johnlester@gmail.com",
    personalEmail: "lestertan110@gmail.com", gender: "Male", todayStatus: "present",
  },
  {
    ...base, id: "u-aiko", employeeId: "EMP-2026-12341", name: "Aiko Nakamura", firstName: "Aiko",
    role: "employee", position: "Front-end Developer", email: "aiko@gmail.com",
    personalEmail: "aiko@gmail.com", gender: "Female", todayStatus: "absent",
  },
  {
    ...base, id: "u-mia", employeeId: "EMP-2026-12342", name: "Mia Carte", firstName: "Mia",
    role: "employee", position: "Back-end Developer", email: "mia@gmail.com",
    personalEmail: "mia@gmail.com", gender: "Female", todayStatus: "leave",
  },
  {
    ...base, id: "u-reina", employeeId: "EMP-2026-12343", name: "Reina Fujimoto", firstName: "Reina",
    role: "employee", position: "Senior Developer", email: "reina@gmail.com",
    personalEmail: "reina@gmail.com", gender: "Female", todayStatus: "late",
  },
  {
    ...base, id: "u-chloe", employeeId: "EMP-2026-12344", name: "Chloe Bennett", firstName: "Chloe",
    role: "employee", position: "Junior Developer", email: "chloe@gmail.com",
    personalEmail: "chloe@gmail.com", gender: "Female", todayStatus: "late",
  },
  {
    ...base, id: "u-yuna", employeeId: "EMP-2026-12346", name: "Yuna Takahash", firstName: "Yuna",
    role: "employee", position: "Graphic Designer", email: "yuna@gmail.com",
    personalEmail: "yuna@gmail.com", gender: "Female", todayStatus: "leave",
  },
  {
    ...base, id: "u-hailey", employeeId: "EMP-2026-12347", name: "Hailey Morgan", firstName: "Hailey",
    role: "employee", position: "Secretary", email: "hailey@gmail.com",
    personalEmail: "hailey@gmail.com", gender: "Female", todayStatus: "absent",
  },
];

const FILLER_NAMES = [
  "Jana Celine", "Aliya Faith Razon", "Marco Reyes", "Paolo Santos", "Bea Villanueva", "Carlo Mendoza",
  "Denise Cruz", "Ethan Lim", "Faye Garcia", "Gino Ramos", "Hannah Dela Cruz", "Ivan Torres",
  "Julia Navarro", "Kevin Bautista", "Lara Aquino", "Miguel Castillo", "Nina Flores", "Oscar Domingo",
  "Pia Morales", "Rafael Valdez", "Sofia Herrera", "Tomas Ocampo", "Ursula Pascual", "Victor Salazar",
];
const FILLER_POSITIONS = ["Front-end Developer", "Back-end Developer", "QA Engineer", "UI/UX Designer", "DevOps Engineer", "IT Support"];
const FILLER_STATUS: AttendanceStatus[] = ["present", "present", "present", "late", "present", "absent", "leave", "present"];

const FILLER_EMPLOYEES: Employee[] = FILLER_NAMES.map((name, i) => {
  const slug = name.split(" ")[0].toLowerCase();
  return {
    ...base,
    id: `u-${slug}-${i}`,
    employeeId: `EMP-2026-${12348 + i}`,
    name,
    firstName: name.split(" ")[0],
    role: "employee",
    position: i === 0 ? "Front-end Developer" : i === 1 ? "Back-end Developer" : FILLER_POSITIONS[i % FILLER_POSITIONS.length],
    email: `${slug}@gmail.com`,
    personalEmail: `${slug}@gmail.com`,
    gender: i % 3 === 0 ? "Male" : "Female",
    todayStatus: FILLER_STATUS[i % FILLER_STATUS.length],
    employmentStatus: i % 9 === 8 ? "inactive" : "active",
  };
});

export const EMPLOYEES: Employee[] = [...FIGMA_EMPLOYEES, ...FILLER_EMPLOYEES];

export const MANAGER: Employee = {
  ...base,
  id: "u-enid",
  employeeId: "EMP-2026-10001",
  name: "Enid Sinclair",
  firstName: "Enid",
  role: "manager",
  position: "Department Manager",
  email: "enid.sinclair@gmail.com",
  personalEmail: "enid.sinclair@gmail.com",
  gender: "Female",
  supervisor: "Administrator",
  todayStatus: "present",
};

/** Second manager voice used in the Figma task comment thread. */
export const COMMENT_MANAGER = { id: "u-mark", name: "Mark Anthony" };

export const CURRENT_EMPLOYEE_ID = "u-john";

/** Mock credentials. Login accepts the username or the company email. */
export const MOCK_ACCOUNTS = [
  { username: "johnlester", email: "johnlester@gmail.com", password: "Password123!", userId: "u-john" },
  { username: "enid", email: "enid.sinclair@gmail.com", password: "Password123!", userId: "u-enid" },
];

/* ----------------------------- Attendance ------------------------------ */

const FIGMA_ATTENDANCE: Omit<AttendanceRecord, "id" | "employeeId">[] = [
  { date: "2026-07-09", timeIn: "8:00 AM", timeOut: "5:00 PM", status: "present", totalHours: 9, breakHours: 1 },
  { date: "2026-07-08", status: "absent" },
  { date: "2026-07-07", status: "absent" },
  { date: "2026-07-06", status: "absent" },
  { date: "2026-07-05", timeIn: "8:45 AM", timeOut: "5:00 PM", status: "late", totalHours: 8.25, breakHours: 1 },
  { date: "2026-07-04", status: "leave" },
  { date: "2026-07-03", timeIn: "8:00 AM", timeOut: "5:00 PM", status: "present", totalHours: 9, breakHours: 1 },
];

function isoDaysBefore(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d - days));
  return date.toISOString().slice(0, 10);
}

const OLDER_PATTERN: AttendanceStatus[] = ["present", "present", "late", "present", "present", "present", "absent", "present"];

export const MY_ATTENDANCE: AttendanceRecord[] = [
  ...FIGMA_ATTENDANCE,
  ...Array.from({ length: 24 }, (_, i) => {
    const status = OLDER_PATTERN[i % OLDER_PATTERN.length];
    const worked = status === "present" || status === "late";
    return {
      date: isoDaysBefore("2026-07-02", i),
      status,
      timeIn: worked ? (status === "late" ? "8:30 AM" : "8:00 AM") : undefined,
      timeOut: worked ? "5:00 PM" : undefined,
      totalHours: worked ? (status === "late" ? 8.5 : 9) : undefined,
      breakHours: worked ? 1 : undefined,
    };
  }),
].map((r, i) => ({ ...r, id: `att-${i}`, employeeId: CURRENT_EMPLOYEE_ID }));

/** Department attendance for today (manager view), one row per employee. */
export const DEPARTMENT_ATTENDANCE: AttendanceRecord[] = EMPLOYEES.map((e, i) => {
  const worked = e.todayStatus === "present" || e.todayStatus === "late";
  return {
    id: `datt-${i}`,
    employeeId: e.id,
    date: TODAY,
    status: e.todayStatus,
    timeIn: worked ? (e.todayStatus === "late" ? "8:45 AM" : "8:00 AM") : undefined,
    timeOut: worked ? "5:00 PM" : undefined,
    totalHours: worked ? 8.5 : undefined,
    breakHours: worked ? 1 : undefined,
  };
});

/* -------------------------------- Tasks -------------------------------- */

const comments = [
  { id: "c1", authorId: COMMENT_MANAGER.id, message: "Please include the payroll summary for all departments before submitting.", createdAt: "2026-09-04T10:15:00", read: true },
  { id: "c2", authorId: COMMENT_MANAGER.id, message: "Looks good mate", createdAt: "2026-09-04T10:15:00", read: false },
  { id: "c3", authorId: "u-john", message: "Thanks Man. I’ll update the deductions section. And please give my salary.", createdAt: "2026-09-04T10:15:00", read: true },
];

const FIGMA_TASKS: Task[] = [
  {
    id: "t1", title: "Prepare Payroll Report", description: "Please prepare the monthly payroll report and submit it for review",
    assigneeId: "u-john", dateAssigned: "2026-07-08", startDate: "2026-07-08", dueDate: "2026-07-20", status: "in-progress", icon: "document",
    attachment: { name: "Payroll_Report_July2026.pdf", size: "1.2MB" }, comments,
  },
  {
    id: "t2", title: "Inventory Audit", description: "Check and audit all IT equipment and supplies.",
    assigneeId: "u-john", dateAssigned: "2026-07-07", startDate: "2026-07-07", dueDate: "2026-07-26", status: "completed", icon: "archive", comments: [],
  },
  {
    id: "t3", title: "Team Meeting Preparation", description: "Prepare presentation and documents for the upcoming team meeting.",
    assigneeId: "u-john", dateAssigned: "2026-07-06", startDate: "2026-07-06", dueDate: "2026-07-21", status: "not-started", icon: "people", comments: [],
  },
];

const EXTRA_TASK_TITLES: [string, string, Task["icon"]][] = [
  ["Update Employee Handbook", "Revise the IT section of the employee handbook.", "document"],
  ["Server Backup Check", "Verify last week’s automated server backups.", "archive"],
  ["Onboarding Session", "Facilitate onboarding for the two new hires.", "people"],
  ["Network Cabling Audit", "Inspect and label the 3rd floor network cabling.", "archive"],
  ["Quarterly Report Draft", "Draft the Q2 department performance report.", "document"],
  ["Software License Renewal", "Renew the expiring design software licenses.", "document"],
  ["Security Training Follow-up", "Collect completion certificates from the team.", "people"],
  ["Helpdesk Ticket Cleanup", "Close resolved helpdesk tickets older than 30 days.", "archive"],
  ["Sprint Retrospective Notes", "Summarize action items from the last retrospective.", "document"],
];
const EXTRA_STATUS: Task["status"][] = ["in-progress", "completed", "overdue", "not-started", "completed", "overdue", "in-progress", "completed", "not-started"];
const TEAM_ASSIGNEES = ["u-john", "u-aiko", "u-mia", "u-reina", "u-chloe", "u-yuna", "u-hailey", "u-john", "u-aiko"];

export const TASKS: Task[] = [
  ...FIGMA_TASKS,
  ...EXTRA_TASK_TITLES.map(([title, description, icon], i): Task => ({
    id: `t${i + 4}`, title, description, icon,
    assigneeId: TEAM_ASSIGNEES[i],
    dateAssigned: isoDaysBefore("2026-07-01", i * 2),
    startDate: isoDaysBefore("2026-07-01", i * 2),
    dueDate: isoDaysBefore("2026-07-30", i * 3),
    status: EXTRA_STATUS[i],
    comments: [],
  })),
];

/* ---------------------------- Leave requests --------------------------- */

const MY_LEAVES: LeaveRequest[] = [
  {
    id: "l1", employeeId: "u-john", leaveType: "Vacation Leave", startDate: "2026-07-15", endDate: "2026-07-19", days: 5,
    reason: "Family Vacation", submittedAt: "2026-07-08", status: "approved",
    reviewedBy: { office: "HR Department", name: "Jana Celine" }, remarks: "Approved by HR Manager, Have a safe vacation!",
    attachment: { name: "Leave_Request_July2026.pdf", size: "1.2MB" },
  },
  {
    id: "l2", employeeId: "u-john", leaveType: "Sick Leave", startDate: "2026-07-08", endDate: "2026-07-08", days: 1,
    reason: "Medical Check-up", submittedAt: "2026-07-08", status: "rejected",
    reviewedBy: { office: "HR Department", name: "Jana Celine" }, remarks: "Insufficient leave credits for this period.",
  },
  {
    id: "l3", employeeId: "u-john", leaveType: "Emergency Leave", startDate: "2026-07-08", endDate: "2026-07-09", days: 2,
    reason: "Family Emergency", submittedAt: "2026-07-08", status: "approved",
    reviewedBy: { office: "HR Department", name: "Jana Celine" }, remarks: "Take care.",
  },
  {
    id: "l4", employeeId: "u-john", leaveType: "Emergency Leave", startDate: "2026-07-08", endDate: "2026-07-10", days: 3,
    reason: "Emergency Leave", submittedAt: "2026-07-08", status: "pending",
  },
];

const TEAM_LEAVES: [string, string, number, LeaveRequest["status"]][] = [
  ["u-aiko", "Sick Leave", 4, "approved"],
  ["u-mia", "Personal Leave", 5, "approved"],
  ["u-reina", "Emergency Leave", 4, "pending"],
  ["u-chloe", "Vacation Leave", 5, "pending"],
  ["u-yuna", "Personal Leave", 4, "approved"],
  ["u-hailey", "Sick Leave", 5, "rejected"],
  ["u-john", "Vacation Leave", 3, "approved"],
  ["u-aiko", "Vacation Leave", 2, "pending"],
];

export const LEAVE_REQUESTS: LeaveRequest[] = [
  ...MY_LEAVES,
  ...TEAM_LEAVES.map(([employeeId, leaveType, days, status], i): LeaveRequest => ({
    id: `l${i + 5}`, employeeId, leaveType, days, status,
    startDate: isoDaysBefore("2026-07-19", i * 6 + days - 1),
    endDate: isoDaysBefore("2026-07-19", i * 6),
    reason: leaveType === "Sick Leave" ? "Medical rest" : leaveType === "Vacation Leave" ? "Family Vacation" : "Personal matters",
    submittedAt: isoDaysBefore("2026-07-09", i + 1),
    reviewedBy: status === "pending" ? undefined : { office: "IT Department", name: "Enid Sinclair" },
    attachment: { name: "Leave_Request_July2026.pdf", size: "1.2MB" },
  })),
];

export const LEAVE_TYPES = ["Vacation Leave", "Sick Leave", "Personal Leave", "Emergency Leave"];

/* ----------------------------- Announcements --------------------------- */

const HOLIDAY_BODY =
  "Dear, Employees,\n\nPlease be informed that the office will be closed on Wednesday, July 9, 2026 in observance of the holiday. Regular operations will resume on Thursday, July 10, 2026.\n\nThank you and stay safe!\n\nBest regards,\nHR Department";

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1", title: "Holiday Announcement", icon: "calendar", author: "HR Department", audience: "All Department Employee",
    excerpt: "Please be informed that the office will be closed on Wednesday, July 9, 2026 in observance...",
    body: HOLIDAY_BODY, postedAt: "2026-07-09T08:00:00", status: "published", read: false,
  },
  {
    id: "a2", title: "Monthly Team Meeting", icon: "people", author: "Admin Office", audience: "All Department Employee",
    excerpt: "This is to remind everyone about our monthly team meeting on July 15, 2026 at 10:00 AM...",
    body: "This is to remind everyone about our monthly team meeting on July 15, 2026 at 10:00 AM in the main conference room. Please prepare your updates.\n\nBest regards,\nAdmin Office",
    postedAt: "2026-07-08T10:00:00", status: "published", read: true,
  },
  {
    id: "a3", title: "Cybersecurity Awareness Training", icon: "shield", author: "IT Department", audience: "All Department Employee",
    excerpt: "All employees are required to complete the cybersecurity training by July 20, 2026...",
    body: "All employees are required to complete the cybersecurity training by July 20, 2026. The module takes about 45 minutes.\n\nBest regards,\nIT Department",
    postedAt: "2026-07-07T10:00:00", status: "published", read: false,
  },
  {
    id: "a4", title: "System Maintenance", icon: "wrench", author: "IT Department", audience: "All Department Employee",
    excerpt: "The system will undergo scheduled maintenance on July 12, 2026 from 12:00 AM to 4:00 AM...",
    body: "The system will undergo scheduled maintenance on July 12, 2026 from 12:00 AM to 4:00 AM. Some services will be unavailable during this window.\n\nBest regards,\nIT Department",
    postedAt: "2026-07-06T10:00:00", status: "published", read: false,
  },
  ...[
    ["Team Meeting Reminder", "published"],
    ["System Maintenance", "published"],
    ["Team Building", "scheduled"],
    ["Team Meeting Reminder", "draft"],
    ["Team Building", "scheduled"],
    ["System Maintenance", "scheduled"],
    ["Team Building", "published"],
    ["New Employee Onboarding Program", "published"],
  ].map(([title, status], i): Announcement => ({
    id: `a${i + 5}`,
    title,
    icon: title.startsWith("System") ? "wrench" : title.startsWith("Team Building") ? "people" : "calendar",
    author: "IT Department",
    audience: "All Department Employee",
    excerpt: `${title} for all department employees.`,
    body: `${title} details will be shared with all department employees.\n\nBest regards,\nIT Department`,
    postedAt: `2026-05-${String(20 + i).padStart(2, "0")}T11:00:00`,
    status: status as Announcement["status"],
    read: true,
  })),
];

/* ----------------------------- Notifications --------------------------- */

export const EMPLOYEE_NOTIFICATIONS: AppNotification[] = [
  { id: "n1", kind: "task", title: "New task assigned", message: "Prepare Payroll Report has been assigned to you.", createdAt: "2026-07-09T09:55:00", read: false },
  { id: "n2", kind: "leave", title: "Leave request approved", message: "Your leave for Jul 8 – Jul 14, 2026 has been approved.", createdAt: "2026-07-09T08:00:00", read: false },
  { id: "n3", kind: "announcement", title: "New announcement", message: "Holiday Announcement was posted by HR Department.", createdAt: "2026-07-09T07:00:00", read: false },
];

export const MANAGER_NOTIFICATIONS: AppNotification[] = [
  { id: "mn1", kind: "task", title: "New task assigned", message: "Prepare Payroll Report has been assigned to you.", createdAt: "2026-07-09T09:55:00", read: false },
  { id: "mn2", kind: "leave", title: "Leave request approved", message: "John Lester Tan’s leave request for Jul 8 – Jul 14 has been approved.", createdAt: "2026-07-09T08:00:00", read: false },
  { id: "mn3", kind: "leave", title: "New leave request", message: "Reina Fujimoto submitted an Emergency Leave request.", createdAt: "2026-07-09T07:00:00", read: false },
];
