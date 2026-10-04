"use client";

import { CircleCheck, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import { PASSWORD_RULES, passwordError } from "@/lib/validation";
import { ProfileSection } from "./ProfileSection";

type Errors = Partial<Record<"current" | "next" | "confirm", string>>;

export function ChangePasswordCard({ id }: { id?: string }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);

  function reset() {
    setCurrent("");
    setNext("");
    setConfirm("");
    setErrors({});
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const out: Errors = {};
    if (!current) out.current = "Enter your current password.";
    const pw = passwordError(next);
    if (pw) out.next = pw;
    else if (next === current) out.next = "Choose a password different from your current one.";
    if (confirm !== next) out.confirm = "Passwords do not match.";
    setErrors(out);
    if (Object.keys(out).length) return;
    reset();
    setSaved(true);
  }

  return (
    <ProfileSection id={id} title="Change Password" className="py-4">
      <form onSubmit={submit} noValidate className="flex flex-col gap-3 sm:px-2">
        <Field label={<span className="text-xs text-gray">Current Password</span>} error={errors.current}>
          {({ id: fid, describedBy, invalid }) => (
            <TextInput id={fid} type="password" icon={<Lock />} placeholder="Enter your current password" autoComplete="current-password"
              value={current} onChange={(e) => { setCurrent(e.target.value); setSaved(false); }} aria-describedby={describedBy} invalid={invalid} />
          )}
        </Field>
        <Field
          label={<span className="text-xs text-gray">New Password</span>}
          error={errors.next}
          hint={
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {PASSWORD_RULES.map((r) => {
                const ok = r.test(next);
                return (
                  <li key={r.label} className={cn("flex items-center gap-1.5 text-[11px]", ok ? "text-st-present" : "text-gray")}>
                    <CircleCheck aria-hidden className={cn("size-4", ok ? "text-green" : "text-gray/60")} />
                    {r.label}
                  </li>
                );
              })}
            </ul>
          }
        >
          {({ id: fid, describedBy, invalid }) => (
            <TextInput id={fid} type="password" icon={<Lock />} placeholder="Enter your new password" autoComplete="new-password"
              value={next} onChange={(e) => { setNext(e.target.value); setSaved(false); }} aria-describedby={describedBy} invalid={invalid} />
          )}
        </Field>
        <Field label={<span className="text-xs text-gray">Confirm Password</span>} error={errors.confirm}>
          {({ id: fid, describedBy, invalid }) => (
            <TextInput id={fid} type="password" icon={<Lock />} placeholder="Confirm your new password" autoComplete="new-password"
              value={confirm} onChange={(e) => { setConfirm(e.target.value); setSaved(false); }} aria-describedby={describedBy} invalid={invalid} />
          )}
        </Field>
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          {saved && (
            <p role="status" className="mr-auto text-sm text-st-present">
              Password updated.
            </p>
          )}
          <Button variant="secondary" onClick={reset} className="w-[118px]">
            Cancel
          </Button>
          <Button type="submit" className="w-[150px]">
            Update Password
          </Button>
        </div>
      </form>
    </ProfileSection>
  );
}
