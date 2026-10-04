import type { Metadata } from "next";
import { EmployeeAttendance } from "@/features/attendance/EmployeeAttendance";

export const metadata: Metadata = { title: "Attendance Records" };

export default function Page() {
  return <EmployeeAttendance />;
}
