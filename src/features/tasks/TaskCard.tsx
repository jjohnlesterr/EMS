import { CalendarDays, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/format";
import type { Role, Task } from "@/lib/types";
import { TaskIcon } from "./TaskIcon";

interface TaskCardProps {
  task: Task;
  role: Role;
  /** Shown under the description for managers. */
  assigneeName?: string;
  onView: () => void;
  onUpdate: () => void;
  onComments: () => void;
}

/** Task row card (Figma Frame 406). Action layout differs per role, as drawn. */
export function TaskCard({ task, role, assigneeName, onView, onUpdate, onComments }: TaskCardProps) {
  const unread = task.comments.filter((c) => !c.read).length;
  const comments = (
    <Button
      variant="success"
      size="sm"
      onClick={onComments}
      leftIcon={<MessageSquareText className="size-4 text-st-present" />}
      className="relative w-full text-[13px]"
      aria-label={unread > 0 ? `Comments, ${unread} unread` : undefined}
    >
      Comments
      {unread > 0 && (
        <span aria-hidden className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-st-present text-[10px] text-white">
          {unread}
        </span>
      )}
    </Button>
  );

  return (
    <article className="flex flex-col gap-2.5 rounded-[10px] border border-gray/50 bg-white p-2.5 lg:flex-row lg:items-center lg:gap-4">
      <div className="flex min-w-0 flex-1 gap-3 p-1">
        <TaskIcon icon={task.icon} className="mt-1" />
        <div className="min-w-0">
          <h3 className="font-serif text-sm text-black 2xl:text-[15px]">{task.title}</h3>
          <p className="mt-0.5 max-w-[520px] text-xs text-gray">{task.description}</p>
          {assigneeName && <p className="mt-1 text-xs text-primary-dark">Assigned to {assigneeName}</p>}
          <p className="mt-1 flex items-center gap-1.5 text-xs text-gray">
            <CalendarDays aria-hidden className="size-3.5 text-black" />
            Due: {formatDate(task.dueDate)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 px-2.5 lg:contents">
        <StatusBadge status={`task:${task.status}`} />

        {role === "employee" ? (
          <div className="grid w-full gap-1.5 sm:w-[220px] lg:shrink-0">
            <div className="grid grid-cols-2 gap-1.5">
              <Button size="sm" onClick={onView} className="h-8 w-full text-xs">
                View all
              </Button>
              <Button variant="outline" size="sm" onClick={onUpdate} className="h-8 w-full text-xs">
                Update Status
              </Button>
            </div>
            {comments}
          </div>
        ) : (
          <div className="grid w-full gap-1.5 sm:w-[200px] lg:shrink-0">
            <Button size="sm" onClick={onView} className="h-8 w-full text-xs">
              View
            </Button>
            <div className="grid grid-cols-2 gap-1.5">
              <Button variant="outline" size="sm" onClick={onUpdate} className="h-8 px-1 text-[11px]">
                Update Progress
              </Button>
              {comments}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
