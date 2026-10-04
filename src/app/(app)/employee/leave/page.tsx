import type { Metadata } from "next";
import { EmployeeLeave } from "@/features/leave/EmployeeLeave";

export const metadata: Metadata = { title: "Leave Requests" };

export default function Page() {
  return <EmployeeLeave />;
}
