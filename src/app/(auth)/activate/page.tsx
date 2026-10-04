import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/AuthShell";
import { ActivateForm } from "@/features/auth/ActivateForm";

export const metadata: Metadata = { title: "Activate Account" };

export default function ActivatePage() {
  return (
    <AuthShell
      panel="logo"
      icon="authIconActivate"
      title="Activate Account"
      subtitle="Use your employee ID and company email to activate your account"
    >
      <ActivateForm />
    </AuthShell>
  );
}
