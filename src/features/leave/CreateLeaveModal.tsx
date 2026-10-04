"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, FileUpload, Select, Textarea, TextInput } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { daysBetween } from "@/lib/format";
import { LEAVE_TYPES, TODAY } from "@/lib/mock-data";
import { useEms } from "@/lib/store";

/** Create Leave Request form (Figma 498:12497). */
export function CreateLeaveModal({ open, employeeId, onClose }: { open: boolean; employeeId: string; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={<span className="text-2xl">Create Leave Request</span>}
      description="Fill out the form below to submit a new leave request."
      width={733}
    >
      {open && <CreateLeaveForm employeeId={employeeId} onClose={onClose} />}
    </Modal>
  );
}

type Errors = Partial<Record<"type" | "start" | "end" | "reason", string>>;

function CreateLeaveForm({ employeeId, onClose }: { employeeId: string; onClose: () => void }) {
  const { addLeave } = useEms();
  const [leaveType, setLeaveType] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<string>();
  const [errors, setErrors] = useState<Errors>({});

  const days = start && end && end >= start ? daysBetween(start, end) : 0;

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!leaveType) next.type = "Select the type of leave.";
    if (!start) next.start = "Select a start date.";
    if (!end) next.end = "Select an end date.";
    else if (start && end < start) next.end = "End date must be on or after the start date.";
    if (!reason.trim()) next.reason = "Tell us the reason for your leave.";
    setErrors(next);
    if (Object.keys(next).length) return;
    addLeave({
      employeeId,
      leaveType,
      startDate: start,
      endDate: end,
      days,
      reason: reason.trim(),
      submittedAt: TODAY,
      status: "pending",
      attachment: file ? { name: file, size: "—" } : undefined,
    });
    onClose();
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <Field label="Leave Type" required error={errors.type}>
        {({ id, describedBy, invalid }) => (
          <Select
            id={id}
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            placeholder="Select leave type"
            options={LEAVE_TYPES.map((t) => ({ value: t, label: t }))}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <Field label="Start Date" error={errors.start}>
          {({ id, describedBy, invalid }) => (
            <TextInput id={id} type="date" min={TODAY} value={start} onChange={(e) => setStart(e.target.value)} aria-describedby={describedBy} invalid={invalid} />
          )}
        </Field>
        <Field label="End Date" error={errors.end}>
          {({ id, describedBy, invalid }) => (
            <TextInput id={id} type="date" min={start || TODAY} value={end} onChange={(e) => setEnd(e.target.value)} aria-describedby={describedBy} invalid={invalid} />
          )}
        </Field>
      </div>
      <Field label="Duration">
        {({ id }) => (
          <TextInput id={id} readOnly value={days ? `${days} ${days === 1 ? "Day" : "Days"} (Auto Calculated)` : "Auto Calculated"} className="bg-page! text-gray" />
        )}
      </Field>
      <Field label="Reasons" error={errors.reason}>
        {({ id, describedBy, invalid }) => (
          <Textarea id={id} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Family vacation outside the city" aria-describedby={describedBy} invalid={invalid} />
        )}
      </Field>
      <Field label="Attachment" optional>
        {({ id }) => <FileUpload id={id} value={file} onChange={setFile} />}
      </Field>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} className="w-[120px]">
          Cancel
        </Button>
        <Button type="submit" className="w-[150px]">
          Submit Request
        </Button>
      </div>
    </form>
  );
}
