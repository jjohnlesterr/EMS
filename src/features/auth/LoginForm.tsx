"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleUserRound, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { signIn } from "@/lib/auth";
import { roleHome } from "@/lib/nav";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  async function submit(e: FormEvent) {
    e.preventDefault();
    const id = username.trim();
    const next: typeof errors = {};
    if (!id) next.username = "Please enter your username or company email.";
    if (!password) next.password = "Please enter your password.";
    setErrors(next);
    if (next.username || next.password) return;

    // Mock auth (src/lib/auth.ts): any non-empty credentials succeed.
    const result = await signIn(id, password);
    router.push(roleHome(result.role));
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3.5">
      <Field label="Username/ Company Email" error={errors.username}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            inputSize="lg"
            icon={<CircleUserRound />}
            placeholder="Enter your employee ID"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Field label="Password" error={errors.password}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            type="password"
            inputSize="lg"
            icon={<Lock />}
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Link href="/login" className="-mt-1.5 self-start text-xs text-primary-dark hover:underline">
        Forgot Password?
      </Link>
      <Button type="submit" className="mx-auto mt-1 w-[180px]">
        Login
      </Button>
      <p className="text-center text-xs text-black">
        Don&apos;t have an account?{" "}
        <Link href="/activate" className="text-primary-dark hover:underline">
          Activate Account
        </Link>
      </p>
    </form>
  );
}
