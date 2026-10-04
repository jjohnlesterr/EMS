"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, FileUpload, Select, Textarea, TextInput } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { TASK_STATUS_OPTIONS } from "@/lib/status";
import { useEms } from "@/lib/store";
import type { Role, Task, TaskStatus } from "@/lib/types";
import { TaskSummary } from "./TaskSummary";

interface Props {
  task: Task | null;
  role: Role;
  onClose: () => void;
}

/**
 * Update Task Status (employee) / Update Task Progress (manager, Figma 497:8631).
 * Managers can also move the due date.
 */
export function UpdateTaskModal({ task, role, onClose }: Props) {
  return (
    <Modal
      open={task !== null}
      onClose={onClose}
      title={role === "manager" ? "Update Task Progress" : "Update Task Status"}
      width={620}
    >
      {task && <UpdateTaskForm key={task.id} task={task} role={role} onClose={onClose} />}
    </Modal>
  );
}

function UpdateTaskForm({ task, role, onClose }: { task: Task; role: Role; onClose: () => void }) {
  const { updateTask } = useEms();
  const [status, setStatus] = useState<TaskStatus | "">("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState<string>();
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string>();

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!status) return setError("Select the new status.");
    updateTask(task.id, {
      status,
      dueDate: dueDate || task.dueDate,
      notes: notes || task.notes,
      attachment: file ? { name: file, size: "—" } : task.attachment,
    });
    onClose();
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <TaskSummary task={task} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Update Status" required error={error}>
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              placeholder="Select new status"
              options={TASK_STATUS_OPTIONS}
              aria-describedby={describedBy}
              invalid={invalid}
            />
          )}
        </Field>
        {role === "manager" && (
          <Field label="Update Due Date" optional>
            {({ id }) => <TextInput id={id} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />}
          </Field>
        )}
      </div>
      <Field label="Attach New File" optional>
        {({ id }) => <FileUpload id={id} value={file} onChange={setFile} />}
      </Field>
      <Field
        label="Remarks / Progress Notes"
        hint={<p className="text-xs text-gray">You can provide additional notes about the progress of this task.</p>}
      >
        {({ id }) => (
          <Textarea id={id} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Added payroll summary and attached the final report…" />
        )}
      </Field>
      <div className="flex justify-end gap-3 pt-1">
        <Button variant="secondary" onClick={onClose} className="w-[120px]">
          Cancel
        </Button>
        <Button type="submit" className="w-[140px]">
          Save changes
        </Button>
      </div>
    </form>
  );
}
