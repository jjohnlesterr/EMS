"use client";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { AttachmentChip } from "@/components/data/cells";
import { formatDate } from "@/lib/format";
import { useEms } from "@/lib/store";
import type { Task } from "@/lib/types";

/** Read-only task facts shared by View Task Details and Update Task modals. */
export function TaskSummary({ task, showAttachment = true }: { task: Task; showAttachment?: boolean }) {
  const { employees } = useEms();
  const assignee = employees.find((e) => e.id === task.assigneeId);
  return (
    <dl className="grid gap-x-6 gap-y-4 rounded-[10px] border border-line bg-page p-4 text-sm sm:grid-cols-2">
      <Item label="Task Name" value={task.title} wide />
      <Item
        label="Assigned to:"
        value={
          <>
            {assignee?.name}
            <span className="block text-xs text-gray">{assignee?.employeeId}</span>
          </>
        }
      />
      <Item label="Department" value={assignee?.department} />
      <Item label="Date Assigned" value={formatDate(task.dateAssigned)} />
      <Item label="Due Date" value={formatDate(task.dueDate)} />
      <Item label="Status" value={<StatusBadge status={`task:${task.status}`} size="sm" />} />
      {showAttachment && task.attachment && (
        <Item label="Attachment" value={<AttachmentChip {...task.attachment} />} wide />
      )}
    </dl>
  );
}

function Item({ label, value, wide }: { label: string; value: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="text-xs text-gray">{label}</dt>
      <dd className="mt-1 text-black">{value}</dd>
    </div>
  );
}
