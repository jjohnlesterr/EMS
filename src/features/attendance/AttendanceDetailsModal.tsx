"use client";

import { Clock3, Coffee, Hourglass, LogIn, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Modal } from "@/components/ui/Modal";
import { InfoRow } from "@/components/data/cells";
import { formatDate, formatHours } from "@/lib/format";
import type { AttendanceRecord, Employee } from "@/lib/types";

interface Props {
  record: AttendanceRecord | null;
  employee: Employee;
  onClose: () => void;
}

/** Attendance Details card (Figma 248:4769), shared by Employee and Manager. */
export function AttendanceDetailsModal({ record, employee, onClose }: Props) {
  const working = record?.totalHours !== undefined ? record.totalHours - (record.breakHours ?? 0) : undefined;
  return (
    <Modal open={record !== null} onClose={onClose} title="Attendance Details" width={480}>
      {record && (
        <>
          <div className="flex items-center gap-5 border-b border-line pb-5">
            <Avatar name={employee.name} src={employee.avatar} size={110} />
            <div className="min-w-0">
              <p className="font-serif text-lg font-bold text-black">{employee.name}</p>
              <p className="mt-1.5 text-xs text-black">Employee ID: {employee.employeeId}</p>
              <p className="mt-2 text-xs text-gray">
                IT Department • {employee.position}
              </p>
              <p className="mt-2 text-xs text-primary">{formatDate(record.date)}</p>
            </div>
          </div>
          <InfoRow icon={<LogIn className="text-st-present" />} label="Time In" value={record.timeIn ?? "---"} />
          <InfoRow icon={<LogOut className="text-st-absent" />} label="Time Out" value={record.timeOut ?? "---"} />
          <InfoRow icon={<Clock3 />} label="Total Hours" value={formatHours(record.totalHours)} />
          <InfoRow icon={<Coffee className="text-orange" />} label="Break Time" value={record.breakHours ? `${record.breakHours} hr` : "---"} />
          <InfoRow icon={<Hourglass className="text-primary-dark" />} label="Working Hours" value={formatHours(working)} className="border-b-0" />
        </>
      )}
    </Modal>
  );
}
