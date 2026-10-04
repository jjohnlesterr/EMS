"use client";

import { CalendarRange, CircleCheck, FileText, History, Hourglass, Send, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Field, Textarea } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AttachmentChip, InfoRow } from "@/components/data/cells";
import { formatDate, formatWeekday } from "@/lib/format";
import { useEms } from "@/lib/store";
import type { LeaveRequest, Role } from "@/lib/types";

interface Props {
  leave: LeaveRequest | null;
  role: Role;
  onClose: () => void;
}

/**
 * Leave Request Details.
 * Employee (Figma 498:12147): read-only status + reviewer remarks.
 * Manager (Figma 492:12408): requester card, remarks box, Approve / Reject with confirmation.
 */
export function LeaveDetailsModal({ leave, role, onClose }: Props) {
  return (
    <Modal
      open={leave !== null}
      onClose={onClose}
      title="Leave Request Details"
      description={role === "employee" ? "View the details and status of your leave requests." : undefined}
      width={role === "employee" ? 558 : 600}
    >
      {leave && (role === "manager" ? <ManagerBody key={leave.id} leave={leave} onClose={onClose} /> : <EmployeeBody leave={leave} />)}
    </Modal>
  );
}

const dateRange = (l: LeaveRequest) =>
  l.startDate === l.endDate ? formatDate(l.startDate) : `${formatDate(l.startDate)} - ${formatDate(l.endDate)}`;

function EmployeeBody({ leave }: { leave: LeaveRequest }) {
  return (
    <div className="flex flex-col">
      <InfoRow label="Leave Type" value={leave.leaveType} />
      <InfoRow
        label="Date Range"
        value={
          <>
            {dateRange(leave)}
            <span className="block text-xs text-gray">({leave.days} {leave.days === 1 ? "Day" : "Days"})</span>
          </>
        }
      />
      <InfoRow label="Reason" value={leave.reason} />
      <InfoRow label="Requested On" value={formatDate(leave.submittedAt)} />
      <InfoRow label="Status" value={<StatusBadge status={`leave:${leave.status}`} />} />
      <InfoRow
        label="Reviewed By"
        value={
          leave.reviewedBy ? (
            <>
              {leave.reviewedBy.office}
              <span className="block text-xs text-gray">{leave.reviewedBy.name}</span>
            </>
          ) : (
            <span className="text-gray">Awaiting review</span>
          )
        }
      />
      <InfoRow label="Remarks" value={leave.remarks ?? <span className="text-gray">—</span>} className="border-b-0" />
    </div>
  );
}

function ManagerBody({ leave, onClose }: { leave: LeaveRequest; onClose: () => void }) {
  const { employees, manager, updateLeave } = useEms();
  const employee = employees.find((e) => e.id === leave.employeeId);
  const [remarks, setRemarks] = useState(leave.remarks ?? "");
  const [confirm, setConfirm] = useState<"approved" | "rejected" | null>(null);

  function decide(status: "approved" | "rejected") {
    updateLeave(leave.id, {
      status,
      remarks: remarks.trim() || undefined,
      reviewedBy: { office: "IT Department", name: manager.name },
    });
    setConfirm(null);
    onClose();
  }

  return (
    <>
      <div className="flex items-center gap-5 border-b border-line pb-5">
        <Avatar name={employee?.name ?? ""} src={employee?.avatar} size={110} />
        <div className="min-w-0">
          <p className="font-serif text-lg font-bold text-black">{employee?.name}</p>
          <p className="mt-1.5 text-xs text-black">Employee ID: {employee?.employeeId}</p>
          <p className="mt-2 text-xs text-gray">IT Department • {employee?.position}</p>
          <StatusBadge status={`leave:${leave.status}`} size="sm" className="mt-2.5" />
        </div>
      </div>
      <InfoRow icon={<History />} label="Leave Type" value={leave.leaveType} />
      <InfoRow icon={<CalendarRange />} label="Date Range" value={dateRange(leave)} />
      <InfoRow icon={<Hourglass />} label="Total Days" value={`${leave.days} ${leave.days === 1 ? "Day" : "Days"}`} />
      <InfoRow
        icon={<Send />}
        label="Date Submitted"
        value={`${formatDate(leave.submittedAt)} (${formatWeekday(leave.submittedAt).slice(0, 3)})`}
      />
      <InfoRow icon={<FileText />} label="Reason" value={leave.reason} />
      {leave.attachment && (
        <div className="border-b border-line py-3">
          <p className="mb-2 font-serif text-sm text-black">Attachment</p>
          <AttachmentChip {...leave.attachment} />
        </div>
      )}
      <Field label={<span className="font-serif text-base text-primary">Message Remarks</span>} className="pt-4">
        {({ id }) => (
          <Textarea id={id} value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Add remarks (optional)" />
        )}
      </Field>

      <div className="mt-5 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} className="w-[100px]">
          Cancel
        </Button>
        {leave.status === "pending" && (
          <>
            <Button variant="danger" onClick={() => setConfirm("rejected")} className="w-[100px]">
              Reject
            </Button>
            <Button onClick={() => setConfirm("approved")} className="w-[100px]">
              Approve
            </Button>
          </>
        )}
      </div>

      <ConfirmDialog
        open={confirm === "rejected"}
        tone="danger"
        icon={<TriangleAlert />}
        title="Are you sure you want to reject this leave request?"
        message="This action will mark the request as rejected and notify the employee"
        confirmLabel="Reject Request"
        onCancel={() => setConfirm(null)}
        onConfirm={() => decide("rejected")}
      />
      <ConfirmDialog
        open={confirm === "approved"}
        tone="success"
        icon={<CircleCheck />}
        title="Are you sure you want to approve this leave request?"
        message="This action will mark the request as approved and notify the employee"
        confirmLabel="Approve Request"
        onCancel={() => setConfirm(null)}
        onConfirm={() => decide("approved")}
      />
    </>
  );
}
