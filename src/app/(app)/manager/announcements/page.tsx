import type { Metadata } from "next";
import { ManagerAnnouncements } from "@/features/announcements/ManagerAnnouncements";

export const metadata: Metadata = { title: "Announcements" };

export default function Page() {
  return <ManagerAnnouncements />;
}
