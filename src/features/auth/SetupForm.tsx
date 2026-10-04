"use client";

import { useRouter } from "next/navigation";
import { CircleUserRound, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { MOCK_ACCOUNTS } from "@/lib/mock-data";
import { roleHome } from "@/lib/nav";
import { passwordError } from "@/lib/validation";

type Errors = { username?: string; password?: string; confirm?: string };

export function SetupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function submit(e: FormEvent) {
    e.preventDefault();
    const name = username.trim();
    if (name.length < 4) return setErrors({ username: "Username must be at least 4 characters." });
    if (MOCK_ACCOUNTS.some((a) => a.username === name.toLowerCase())) {
      return setErrors({ username: "This username is already taken." });
    }
    const pwError = passwordError(password);
    if (pwError) return setErrors({ password: pwError });
    if (confirm !== password) return setErrors({ confirm: "Passwords do not match." });
    setErrors({});
    router.push(roleHome("employee"));
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3.5">
      <Field label="New Username" error={errors.username}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            inputSize="lg"
            icon={<CircleUserRound />}
            placeholder="Enter new Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Field label="New Password" error={errors.password}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            type="password"
            inputSize="lg"
            icon={<Lock />}
            placeholder="Enter your password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Field label="Confirm Password" error={errors.confirm}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            type="password"
            inputSize="lg"
            icon={<Lock />}
            placeholder="Confirm new password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Button type="submit" className="mx-auto mt-2 w-[180px]">
        Save Changes
      </Button>
    </form>
  );
}
