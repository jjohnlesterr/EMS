import type { Metadata } from "next";
import { EmployeeDashboard } from "@/features/dashboard/EmployeeDashboard";

export const metadata: Metadata = { title: "Dashboard" };

export default function Page() {
  return <EmployeeDashboard />;
}
