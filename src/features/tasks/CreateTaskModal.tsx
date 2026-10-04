"use client";

import { ArrowLeftRight, FileText } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, FileUpload, Select, Textarea, TextInput } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { TODAY } from "@/lib/mock-data";
import { TASK_STATUS_OPTIONS } from "@/lib/status";
import { useEms } from "@/lib/store";
import type { TaskStatus } from "@/lib/types";

/** Create New Task form (Figma 483:9800). */
export function CreateTaskModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Task"
      titleIcon={<FileText aria-hidden className="size-5 text-primary" />}
      width={560}
    >
      {open && <CreateTaskForm onClose={onClose} />}
    </Modal>
  );
}

type Errors = Partial<Record<"title" | "description" | "assignee" | "dueDate", string>>;

function CreateTaskForm({ onClose }: { onClose: () => void }) {
  const { employees, addTask } = useEms();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState<TaskStatus>("not-started");
  const [startDate, setStartDate] = useState(TODAY);
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState<string>();
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!title.trim()) next.title = "Enter a task title.";
    if (!description.trim()) next.description = "Enter a short description.";
    if (!assignee) next.assignee = "Select an employee.";
    if (!dueDate) next.dueDate = "Select a due date.";
    else if (dueDate < startDate) next.dueDate = "Due date must be after the start date.";
    setErrors(next);
    if (Object.keys(next).length) return;
    addTask({
      title: title.trim(),
      description: description.trim(),
      assigneeId: assignee,
      status,
      dateAssigned: TODAY,
      startDate,
      dueDate,
      icon: "document",
      notes: notes.trim() || undefined,
      attachment: file ? { name: file, size: "—" } : undefined,
    });
    onClose();
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <Field label="Task Title" required error={errors.title}>
        {({ id, describedBy, invalid }) => (
          <TextInput id={id} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title" aria-describedby={describedBy} invalid={invalid} />
        )}
      </Field>
      <Field label="Description" required error={errors.description}>
        {({ id, describedBy, invalid }) => (
          <TextInput id={id} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter task description" aria-describedby={describedBy} invalid={invalid} />
        )}
      </Field>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-12">
        <Field label="Assigned to" required error={errors.assignee}>
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              placeholder="Select Employee"
              options={employees.filter((x) => x.employmentStatus === "active").map((x) => ({ value: x.id, label: x.name }))}
              aria-describedby={describedBy}
              invalid={invalid}
            />
          )}
        </Field>
        <Field label="Initial Status" required>
          {({ id }) => (
            <Select id={id} value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)} options={TASK_STATUS_OPTIONS} />
          )}
        </Field>
      </div>
      <div className="grid items-start gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
        <Field label="Start Date" required>
          {({ id }) => <TextInput id={id} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />}
        </Field>
        <ArrowLeftRight aria-hidden className="mt-9 hidden size-4 text-black sm:block" />
        <Field label="Due Date" required error={errors.dueDate}>
          {({ id, describedBy, invalid }) => (
            <TextInput id={id} type="date" value={dueDate} min={startDate} onChange={(e) => setDueDate(e.target.value)} aria-describedby={describedBy} invalid={invalid} />
          )}
        </Field>
      </div>
      <Field label="Attachment" optional>
        {({ id }) => <FileUpload id={id} value={file} onChange={setFile} />}
      </Field>
      <Field label={<>Notes: <span className="text-gray">(Optional)</span></>}>
        {({ id }) => <Textarea id={id} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add additional notes..." />}
      </Field>
      <div className="flex justify-end gap-3 pt-1">
        <Button variant="secondary" onClick={onClose} className="w-[120px]">
          Cancel
        </Button>
        <Button type="submit" className="w-[140px]">
          Assign Task
        </Button>
      </div>
    </form>
  );
}
