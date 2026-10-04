"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Task } from "@/lib/types";
import { TaskSummary } from "./TaskSummary";

/** View Task Details (Figma 483:10127). */
export function TaskDetailsModal({ task, onClose }: { task: Task | null; onClose: () => void }) {
  return (
    <Modal
      open={task !== null}
      onClose={onClose}
      title="View Task Details"
      titleIcon={<FileText aria-hidden className="size-5 text-primary" />}
      width={560}
      footer={
        <Button variant="secondary" onClick={onClose} className="w-[120px]">
          Close
        </Button>
      }
    >
      {task && (
        <div className="flex flex-col gap-4">
          <TaskSummary task={task} />
          <div>
            <p className="text-xs text-gray">Description</p>
            <p className="mt-1 text-sm text-black">{task.description}</p>
          </div>
          {task.notes && (
            <div>
              <p className="text-xs text-gray">Notes</p>
              <p className="mt-1 text-sm text-black">{task.notes}</p>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
