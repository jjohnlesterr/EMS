import type { Metadata } from "next";
import { ManagerLeave } from "@/features/leave/ManagerLeave";

export const metadata: Metadata = { title: "Leave Requests" };

export default function Page() {
  return <ManagerLeave />;
}
