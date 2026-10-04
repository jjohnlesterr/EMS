import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/AuthShell";
import { LoginForm } from "@/features/auth/LoginForm";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <AuthShell panel="logo" icon="authIconLogin" title="Welcome Back!" subtitle="Login to access your account">
      <LoginForm />
    </AuthShell>
  );
}
