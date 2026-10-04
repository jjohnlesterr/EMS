import type { Metadata } from "next";
import { TasksView } from "@/features/tasks/TasksView";

export const metadata: Metadata = { title: "Task Management" };

export default function Page() {
  return <TasksView />;
}
