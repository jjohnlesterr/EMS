"use client";

import { useRouter } from "next/navigation";
import { CircleUserRound, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { MOCK_ACCOUNTS } from "@/lib/mock-data";
import { PASSWORD_RULES } from "@/lib/validation";
import { useFieldErrors } from "./useFieldErrors";

type Errors = { username?: string; password?: string; confirm?: string };

const PASSWORD_REQUIREMENTS = PASSWORD_RULES.map((r) => r.requirement);

function validate(username: string, password: string, confirm: string): Errors {
  const errors: Errors = {};
  const name = username.trim();
  if (!name) errors.username = "Please enter a username.";
  else if (name.length < 4) errors.username = "Username must be at least 4 characters.";
  else if (MOCK_ACCOUNTS.some((a) => a.username === name.toLowerCase())) errors.username = "Username is already taken.";

  if (!password) errors.password = "Please enter a password.";
  else if (!PASSWORD_RULES.every((r) => r.test(password))) errors.password = "Password must contain at least:";

  if (!confirm) errors.confirm = "Please confirm your password.";
  else if (confirm !== password) errors.confirm = "Passwords do not match.";
  return errors;
}

export function SetupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const errors = validate(username, password, confirm);
  const { shown, touch, attempt } = useFieldErrors(errors);
  const passwordShown = shown("password");

  function submit(e: FormEvent) {
    e.preventDefault();
    // Auth-only demo: setup finishes the flow back at Login.
    if (attempt()) router.push("/login");
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3">
      <Field label={<span className="sm:text-[10px]">New Username</span>} error={shown("username")}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            inputSize="xl"
            icon={<CircleUserRound />}
            placeholder="Enter new Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={touch("username")}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Field
        label={<span className="sm:text-[10px]">New Password</span>}
        error={passwordShown}
        errorDetails={password && passwordShown ? PASSWORD_REQUIREMENTS : undefined}
      >
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            type="password"
            inputSize="xl"
            icon={<Lock />}
            placeholder="Enter your password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={touch("password")}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Field label={<span className="sm:text-[10px]">Confirm Password</span>} error={shown("confirm")}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            type="password"
            inputSize="xl"
            icon={<Lock />}
            placeholder="Confirm new password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={touch("confirm")}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Button type="submit" className="mx-auto mt-2 h-11! w-full sm:h-10! sm:w-[202px]">
        Save Changes
      </Button>
    </form>
  );
}
