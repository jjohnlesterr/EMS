"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmploymentInfoCard } from "@/features/profile/EmploymentInfoCard";
import { PersonalInfoCard } from "@/features/profile/PersonalInfoCard";
import type { Employee } from "@/lib/types";

/** Employee Details (Figma 473:5373): the profile cards, read-only for managers. */
export function EmployeeDetailsModal({ employee, onClose }: { employee: Employee | null; onClose: () => void }) {
  return (
    <Modal open={employee !== null} onClose={onClose} title="Employee Details" width={860}>
      {employee && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Avatar name={employee.name} src={employee.avatar} size={72} />
            <div className="min-w-0">
              <p className="font-serif text-lg text-black">{employee.name}</p>
              <p className="text-xs text-gray">
                {employee.employeeId} • {employee.position}
              </p>
              <StatusBadge status={`attendance:${employee.todayStatus}`} size="sm" className="mt-2" />
            </div>
          </div>
          <PersonalInfoCard key={employee.id} employee={employee} editable={false} />
          <EmploymentInfoCard employee={employee} />
        </div>
      )}
    </Modal>
  );
}
