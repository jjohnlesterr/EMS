"use client";

import { CircleAlert, Clock3, ListChecks, CheckCheck, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { PageHeader } from "@/components/layout/PageHeader";
import { useShell } from "@/components/layout/ShellContext";
import { StatCard, StatGrid } from "@/components/data/StatCard";
import { Toolbar } from "@/components/data/Toolbar";
import { useEms } from "@/lib/store";
import type { Task } from "@/lib/types";
import { useList } from "@/lib/use-list";
import { CreateTaskModal } from "./CreateTaskModal";
import { TaskCard } from "./TaskCard";
import { TaskCommentsModal } from "./TaskCommentsModal";
import { TaskDetailsModal } from "./TaskDetailsModal";
import { taskFilterOptions, taskFilters, taskSortOptions, taskSorts } from "./task-list";
import { UpdateTaskModal } from "./UpdateTaskModal";

const COPY = {
  employee: { title: "View assigned task", subtitle: "View and manage the tasks assigned to you." },
  manager: { title: "Task Management", subtitle: "Create, assign, and monitor tasks within your department." },
};

type Dialog = { kind: "view" | "update" | "comments"; task: Task } | { kind: "create" } | null;

/** Task list for both roles: employees see their own tasks, managers see the department's. */
export function TasksView() {
  const { role, user } = useShell();
  const { tasks, person } = useEms();
  const [dialog, setDialog] = useState<Dialog>(null);

  const scoped = role === "employee" ? tasks.filter((t) => t.assigneeId === user.id) : tasks;
  const list = useList({
    items: scoped,
    searchText: (t) => `${t.title} ${t.description} ${t.status.replace("-", " ")} ${person(t.assigneeId).name}`,
    sorts: taskSorts,
    filters: taskFilters,
    pageSize: 5,
  });
  const count = (s: Task["status"]) => scoped.filter((t) => t.status === s).length;
  const close = () => setDialog(null);

  return (
    <>
      <PageHeader {...COPY[role]} />

      <StatGrid>
        <StatCard tinted={false} emphasis iconStyle="soft" tone="blue" title="Total Assigned" value={scoped.length} caption="Tasks" icon={<ListChecks />} />
        <StatCard tinted={false} emphasis iconStyle="soft" tone="orange" title="In Progress" value={count("in-progress")} caption="Tasks" icon={<Clock3 />} />
        <StatCard tinted={false} emphasis tone="green" title="Completed" value={count("completed")} caption="Tasks" icon={<CheckCheck />} />
        <StatCard tinted={false} emphasis tone="orange" title="Overdue" value={count("overdue")} caption="Tasks" icon={<CircleAlert />} />
      </StatGrid>

      <section aria-label="Tasks" className="flex flex-col gap-4">
        <Toolbar
          boxed
          search={{ value: list.query, onChange: list.setQuery, placeholder: "Search tasks or status..." }}
          sort={{ value: list.sort, onChange: list.setSort, options: taskSortOptions }}
          filter={{ value: list.filter, onChange: list.setFilter, options: taskFilterOptions }}
          actions={
            role === "manager" && (
              <Button leftIcon={<Plus className="size-4" />} onClick={() => setDialog({ kind: "create" })} className="w-full sm:w-auto">
                Create Task
              </Button>
            )
          }
        />

        <div className="flex flex-col gap-2.5">
          {list.pageItems.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              role={role}
              assigneeName={role === "manager" ? person(t.assigneeId).name : undefined}
              onView={() => setDialog({ kind: "view", task: t })}
              onUpdate={() => setDialog({ kind: "update", task: t })}
              onComments={() => setDialog({ kind: "comments", task: t })}
            />
          ))}
          {list.pageItems.length === 0 && (
            <p className="rounded-[10px] border border-line bg-white py-12 text-center text-sm text-gray">No tasks match your search or filter.</p>
          )}
        </div>

        <Pagination
          page={list.page}
          pageCount={list.pageCount}
          shown={list.pageItems.length}
          total={list.total}
          noun="tasks"
          onPageChange={list.setPage}
        />
      </section>

      <TaskDetailsModal task={dialog?.kind === "view" ? dialog.task : null} onClose={close} />
      <UpdateTaskModal task={dialog?.kind === "update" ? dialog.task : null} role={role} onClose={close} />
      <TaskCommentsModal task={dialog?.kind === "comments" ? dialog.task : null} authorId={user.id} onClose={close} />
      <CreateTaskModal open={dialog?.kind === "create"} onClose={close} />
    </>
  );
}
