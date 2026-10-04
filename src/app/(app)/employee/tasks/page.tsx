import type { Metadata } from "next";
import { TasksView } from "@/features/tasks/TasksView";

export const metadata: Metadata = { title: "My Tasks" };

export default function Page() {
  return <TasksView />;
}
