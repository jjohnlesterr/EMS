export type Role = "employee" | "manager";

export type AttendanceStatus = "present" | "absent" | "late" | "leave";
export type TaskStatus = "not-started" | "in-progress" | "completed" | "overdue";
export type LeaveStatus = "pending" | "approved" | "rejected";
export type AnnouncementStatus = "published" | "draft" | "scheduled";
export type EmploymentStatus = "active" | "inactive";

export interface User {
  id: string;
  employeeId: string;
  name: string;
  firstName: string;
  role: Role;
  position: string;
  department: string;
  email: string;
  avatar?: string;
}

export interface Employee extends User {
  personalEmail: string;
  phone: string;
  birthDate: string;
  gender: "Male" | "Female";
  civilStatus: "Single" | "Married" | "Widowed" | "Separated";
  address: string;
  employeeType: "Regular" | "Probationary" | "Contractual";
  dateHired: string;
  workLocation: string;
  supervisor: string;
  employmentStatus: EmploymentStatus;
  /** Today's attendance, used by the manager's department views. */
  todayStatus: AttendanceStatus;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string; // ISO yyyy-mm-dd
  timeIn?: string; // "8:00 AM"
  timeOut?: string;
  status: AttendanceStatus;
  totalHours?: number;
  breakHours?: number;
}

export interface TaskComment {
  id: string;
  authorId: string;
  message: string;
  createdAt: string; // ISO
  read: boolean;
}

export interface Attachment {
  name: string;
  size: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  dateAssigned: string;
  startDate: string;
  dueDate: string;
  status: TaskStatus;
  icon: "document" | "archive" | "people";
  attachment?: Attachment;
  notes?: string;
  comments: TaskComment[];
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  submittedAt: string;
  status: LeaveStatus;
  attachment?: Attachment;
  reviewedBy?: { office: string; name: string };
  remarks?: string;
}

export interface Announcement {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  author: string; // "HR Department"
  audience: string;
  postedAt: string; // ISO
  status: AnnouncementStatus;
  read: boolean;
  icon: "calendar" | "people" | "shield" | "wrench";
  attachment?: Attachment;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  kind: "task" | "leave" | "announcement";
}
