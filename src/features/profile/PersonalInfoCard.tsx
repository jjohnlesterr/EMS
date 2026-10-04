"use client";

import { SquarePen } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Select, Textarea, TextInput } from "@/components/ui/Field";
import { formatDate } from "@/lib/format";
import { useEms } from "@/lib/store";
import type { Employee } from "@/lib/types";
import { EMAIL_PATTERN } from "@/lib/validation";
import { ProfileSection } from "./ProfileSection";

const CIVIL = ["Single", "Married", "Widowed", "Separated"].map((v) => ({ value: v, label: v }));

/**
 * Personal Information. Name, birth date and gender are managed by HR and stay
 * locked (grey in Figma); the rest becomes editable after "Edit".
 */
export function PersonalInfoCard({ employee, editable = true, id }: { employee: Employee; editable?: boolean; id?: string }) {
  const { updateEmployee } = useEms();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(employee);
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const locked = !editing;

  const set = <K extends keyof Employee>(key: K, value: Employee[K]) => setDraft((d) => ({ ...d, [key]: value }));

  function cancel() {
    setDraft(employee);
    setErrors({});
    setEditing(false);
  }

  function save(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!EMAIL_PATTERN.test(draft.personalEmail)) next.email = "Enter a valid email address.";
    if (!/^09\d{9}$/.test(draft.phone)) next.phone = "Enter an 11-digit mobile number starting with 09.";
    setErrors(next);
    if (Object.keys(next).length) return;
    updateEmployee(employee.id, {
      civilStatus: draft.civilStatus,
      personalEmail: draft.personalEmail,
      phone: draft.phone,
      address: draft.address,
    });
    setEditing(false);
  }

  return (
    <ProfileSection
      id={id}
      title="Personal Information"
      action={
        editable &&
        !editing && (
          <Button size="sm" leftIcon={<SquarePen className="size-4" />} onClick={() => setEditing(true)} className="h-8 px-3">
            Edit
          </Button>
        )
      }
    >
      <form onSubmit={save} noValidate className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Field label={<span className="text-xs text-gray">Full Name</span>}>
          {({ id }) => <TextInput id={id} value={draft.name} disabled />}
        </Field>
        <Field label={<span className="text-xs text-gray">Birth Date</span>}>
          {({ id }) => <TextInput id={id} value={formatDate(draft.birthDate)} disabled />}
        </Field>
        <Field label={<span className="text-xs text-gray">Gender</span>}>
          {({ id }) => <Select id={id} value={draft.gender} disabled options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }]} />}
        </Field>
        <Field label={<span className="text-xs text-gray">Civil Status</span>}>
          {({ id }) => (
            <Select
              id={id}
              value={draft.civilStatus}
              disabled={locked}
              onChange={(e) => set("civilStatus", e.target.value as Employee["civilStatus"])}
              options={CIVIL}
              className="disabled:bg-white disabled:text-black"
            />
          )}
        </Field>
        <Field label={<span className="text-xs text-gray">Personal Email</span>} error={errors.email}>
          {({ id, describedBy, invalid }) => (
            <TextInput
              id={id}
              type="email"
              value={draft.personalEmail}
              readOnly={locked}
              onChange={(e) => set("personalEmail", e.target.value)}
              aria-describedby={describedBy}
              invalid={invalid}
            />
          )}
        </Field>
        <Field label={<span className="text-xs text-gray">Phone Number</span>} error={errors.phone}>
          {({ id, describedBy, invalid }) => (
            <TextInput
              id={id}
              inputMode="tel"
              value={draft.phone}
              readOnly={locked}
              onChange={(e) => set("phone", e.target.value)}
              aria-describedby={describedBy}
              invalid={invalid}
            />
          )}
        </Field>
        <Field label={<span className="text-xs text-gray">Address</span>} className="sm:col-span-2">
          {({ id }) => (
            <Textarea id={id} value={draft.address} readOnly={locked} onChange={(e) => set("address", e.target.value)} className="min-h-[52px]" />
          )}
        </Field>
        {editable && (
          <div className="flex justify-end gap-3 sm:col-span-2">
            <Button variant="secondary" size="sm" onClick={cancel} disabled={!editing} className="h-8 w-[118px]">
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={!editing} className="h-8 w-[128px]">
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </ProfileSection>
  );
}
