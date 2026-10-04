import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/AuthShell";
import { SetupForm } from "@/features/auth/SetupForm";

export const metadata: Metadata = { title: "First Time Setup" };

export default function SetupPage() {
  return (
    <AuthShell
      panel="setup"
      icon="authIconSetup"
      title="First Time Setup"
      subtitle="Create a new username and password to secure your account"
    >
      <SetupForm />
    </AuthShell>
  );
}
