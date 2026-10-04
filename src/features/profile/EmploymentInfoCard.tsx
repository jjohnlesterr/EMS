import { Lock } from "lucide-react";
import { ReadOnlyValue } from "@/components/data/cells";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/format";
import type { Employee } from "@/lib/types";
import { ProfileSection } from "./ProfileSection";

/** Employment Information — always read-only ("Managed by Administrator"). */
export function EmploymentInfoCard({ employee, id }: { employee: Employee; id?: string }) {
  return (
    <ProfileSection
      id={id}
      title="Employment Information"
      action={
        <span className="flex items-center gap-1.5 text-xs text-gray">
          <Lock aria-hidden className="size-3.5" />
          Managed by Administrator
        </span>
      }
    >
      <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
        <ReadOnlyValue label="Employee ID" value={employee.employeeId} />
        <ReadOnlyValue label="Department" value={employee.department} />
        <ReadOnlyValue label="Position" value={employee.position} />
        <ReadOnlyValue label="Employee Type" value={employee.employeeType} />
        <ReadOnlyValue label="Date Hired" value={formatDate(employee.dateHired)} />
        <ReadOnlyValue label="Employment Status" value={<StatusBadge status={`employment:${employee.employmentStatus}`} size="sm" />} />
        <ReadOnlyValue label="Work Location" value={employee.workLocation} />
        <ReadOnlyValue label="Immediate Supervisor" value={employee.supervisor} />
      </div>
    </ProfileSection>
  );
}
