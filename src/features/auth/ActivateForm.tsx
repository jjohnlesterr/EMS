"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleUserRound, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { EMPLOYEES } from "@/lib/mock-data";
import { EMAIL_PATTERN, EMPLOYEE_ID_PATTERN } from "@/lib/validation";
import { useFieldErrors } from "./useFieldErrors";

type Errors = { employeeId?: string; email?: string };

function validate(employeeId: string, email: string): Errors {
  const errors: Errors = {};
  const idValue = employeeId.trim().toUpperCase();
  const employee = EMPLOYEES.find((x) => x.employeeId === idValue);
  if (!idValue) errors.employeeId = "Please enter your employee ID.";
  else if (!EMPLOYEE_ID_PATTERN.test(idValue)) errors.employeeId = "Enter a valid Employee ID (e.g. EMP-2026-12345).";
  else if (!employee) errors.employeeId = "Employee ID not found. Please check and try again.";

  const mail = email.trim().toLowerCase();
  if (!mail) errors.email = "Please enter your company email.";
  else if (!EMAIL_PATTERN.test(mail)) errors.email = "Enter a valid company email address.";
  else if (employee && mail !== employee.email) errors.email = "This email does not match the Employee ID.";
  return errors;
}

export function ActivateForm() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const { shown, touch, attempt } = useFieldErrors(validate(employeeId, email));

  function submit(e: FormEvent) {
    e.preventDefault();
    if (attempt()) router.push("/setup");
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3">
      <Field label={<span className="sm:text-[10px]">Employee ID</span>} error={shown("employeeId")}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            inputSize="xl"
            icon={<CircleUserRound />}
            placeholder="Enter your employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            onBlur={touch("employeeId")}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Field label={<span className="sm:text-[10px]">Company Email</span>} error={shown("email")}>
        {({ id, describedBy, invalid }) => (
          <TextInput
            id={id}
            type="email"
            inputSize="xl"
            icon={<Mail />}
            placeholder="Enter your company email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={touch("email")}
            aria-describedby={describedBy}
            invalid={invalid}
          />
        )}
      </Field>
      <Button type="submit" className="mx-auto mt-2 h-11! w-full sm:h-10! sm:w-[202px]">
        Activate Account
      </Button>
      <p className="mt-1.5 text-center text-[13px] text-black">
        Already activated?{" "}
        <Link href="/login" className="text-primary-dark hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
