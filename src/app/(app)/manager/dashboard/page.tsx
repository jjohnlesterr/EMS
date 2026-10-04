import type { Metadata } from "next";
import { ManagerDashboard } from "@/features/dashboard/ManagerDashboard";

export const metadata: Metadata = { title: "Dashboard" };

export default function Page() {
  return <ManagerDashboard />;
}
