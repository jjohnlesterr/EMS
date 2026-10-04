"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IdCard, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { EMPLOYEES } from "@/lib/mock-data";
import { EMAIL_PATTERN, EMPLOYEE_ID_PATTERN } from "@/lib/validation";

export function ActivateForm() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ employeeId?: string; email?: string }>({});

  function submit(e: FormEvent) {
    e.preventDefault();
    const idValue = employeeId.trim().toUpperCase();
    if (!EMPLOYEE_ID_PATTERN.test(idValue)) {
      return setErrors({ employeeId: "Enter a valid Employee ID (e.g. EMP-2026-12345)." });
    }
    const employee = EMPLOYEES.find((x) => x.employeeId === idValue);
    if (!employee) return setErrors({ employeeId: "This Employee ID is not registered." });
    const mail = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(mail)) return setErrors({ email: "Enter a valid company email address." });
    if (mail !== employee.email) return setErrors({ email: "This email does not match the Employee ID." });
    setErrors({});
    router.push("/setup");
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3.5">
      <Field label="Employee ID" error={errors.employeeId}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            inputSize="lg"
            icon={<IdCard />}
            placeholder="Enter your employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Field label="Company Email" error={errors.email}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            type="email"
            inputSize="lg"
            icon={<Mail />}
            placeholder="Enter your company email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Button type="submit" className="mx-auto mt-2 w-[180px]">
        Activate
      </Button>
      <p className="text-center text-xs text-black">
        Already have an account?{" "}
        <Link href="/login" className="text-primary-dark hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
