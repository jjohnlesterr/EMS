"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleUserRound, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { signIn } from "@/lib/auth";
import { useFieldErrors } from "./useFieldErrors";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { shown, touch, attempt } = useFieldErrors({
    username: username.trim() ? undefined : "Please enter your username or company email.",
    password: password ? undefined : "Please enter your password.",
  });

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!attempt()) return;

    // Mock auth (src/lib/auth.ts): any non-empty credentials succeed.
    // Auth-only demo: end on a success page instead of a dashboard.
    await signIn(username.trim(), password);
    router.push("/auth-success");
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3">
      <Field label={<span className="sm:text-[13px]">Username/ Company Email</span>} error={shown("username")}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            inputSize="xl"
            icon={<CircleUserRound />}
            placeholder="Enter your employee ID"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={touch("username")}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Field label={<span className="sm:text-[13px]">Password</span>} error={shown("password")}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            type="password"
            inputSize="xl"
            icon={<Lock />}
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={touch("password")}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Link href="/login" className="-mt-1 self-start text-[13px] text-primary hover:underline">
        Forgot Password?
      </Link>
      <Button type="submit" className="mx-auto mt-1 h-11! w-full sm:h-10! sm:w-[202px]">
        Login
      </Button>
      <p className="mt-2 text-center text-[13px] text-black">
        Don&apos;t have an account?{" "}
        <Link href="/activate" className="text-primary hover:underline">
          Activate Account
        </Link>
      </p>
    </form>
  );
}
