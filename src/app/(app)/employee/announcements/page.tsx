import type { Metadata } from "next";
import { EmployeeAnnouncements } from "@/features/announcements/EmployeeAnnouncements";

export const metadata: Metadata = { title: "Announcements" };

export default function Page() {
  return <EmployeeAnnouncements />;
}
