"use client";

import { CircleCheck, ClipboardCheck, ClipboardClock, Megaphone, MessageSquareWarning, NotebookTabs, Plane, UserCog } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PageHeader } from "@/components/layout/PageHeader";
import { PersonCell } from "@/components/data/cells";
import { CountTile } from "@/components/data/CountTile";
import { DataTable, type Column } from "@/components/data/DataTable";
import { SectionCard } from "@/components/data/SectionCard";
import { StatCard, StatGrid } from "@/components/data/StatCard";
import { AnnouncementIcon } from "@/features/announcements/AnnouncementIcon";
import { cn } from "@/lib/cn";
import { formatDate, formatRange, formatShortDate } from "@/lib/format";
import { TODAY } from "@/lib/mock-data";
import { useEms } from "@/lib/store";
import type { Announcement, LeaveRequest } from "@/lib/types";

const ANN_STATUS_TEXT: Record<Announcement["status"], string> = {
  published: "text-green",
  draft: "text-primary",
  scheduled: "text-orange",
};

export function ManagerDashboard() {
  const { employees, tasks, leaves, announcements, person } = useEms();

  const present = employees.filter((e) => e.todayStatus === "present").length;
  const late = employees.filter((e) => e.todayStatus === "late").length;
  const absent = employees.filter((e) => e.todayStatus === "absent").length;
  const onLeave = employees.filter((e) => e.todayStatus === "leave").length;
  const attending = present + late;
  const rate = Math.round((attending / employees.length) * 100);

  const taskCount = (s: string) => tasks.filter((t) => t.status === s).length;
  const active = tasks.filter((t) => t.status !== "completed").length;
  const pendingLeaves = leaves.filter((l) => l.status === "pending");

  // Latest request per employee, so the summary shows three different people.
  const leaveRows = [...leaves]
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .filter((l, i, all) => all.findIndex((x) => x.employeeId === l.employeeId) === i)
    .slice(0, 3);
  const annRows = [...announcements].sort((a, b) => b.postedAt.localeCompare(a.postedAt)).slice(0, 3);

  const leaveColumns: Column<LeaveRequest>[] = [
    {
      key: "employee",
      header: "Employee",
      cell: (l) => {
        const e = employees.find((x) => x.id === l.employeeId);
        return <PersonCell name={person(l.employeeId).name} subtitle={e?.position} className="justify-center" />;
      },
    },
    { key: "type", header: "Leave Type", cell: (l) => l.leaveType, hideBelow: "sm" },
    { key: "range", header: "Date Range", cell: (l) => <span className="text-gray">{formatRange(l.startDate, l.endDate)}</span>, hideBelow: "md" },
    { key: "status", header: "Status", cell: (l) => <StatusBadge status={`leave:${l.status}`} /> },
  ];

  const annColumns: Column<Announcement>[] = [
    {
      key: "title",
      wrap: true,
      header: "Announcements",
      cell: (a) => (
        <span className="flex items-center gap-2.5 text-left">
          <AnnouncementIcon icon={a.icon} className="size-8! bg-transparent! [&_svg]:size-5!" />
          {a.title}
        </span>
      ),
    },
    { key: "date", header: "Posted Date", cell: (a) => <span className="text-gray">{formatShortDate(a.postedAt)}</span>, hideBelow: "sm" },
    { key: "status", header: "Status", cell: (a) => <span className={cn("capitalize", ANN_STATUS_TEXT[a.status])}>{a.status}</span> },
  ];

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of your department’s current status and activities." />

      <StatGrid>
        <StatCard tone="blue" title="Total Employees" value={employees.length} caption="Department members" icon={<UserCog />} />
        <StatCard tone="green" title="Present Today" value={attending} caption={`${rate}% attendance rates`} icon={<CircleCheck />} />
        <StatCard tone="orange" title="Active Tasks" value={active} caption={`${taskCount("in-progress")} currently in progress`} icon={<ClipboardClock />} />
        <StatCard tone="cyan" title="Pending Leave Requests" value={pendingLeaves.length} caption="Awaiting review" icon={<Plane />} />
      </StatGrid>

      <div className="grid gap-3 lg:grid-cols-2 2xl:gap-4">
        <SectionCard size="sm" title="Attendance Overview" icon={<NotebookTabs className="text-primary" />}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <CountTile label="Present" value={present} labelClassName="text-green" />
            <CountTile label="Late" value={late} labelClassName="text-orange" />
            <CountTile label="Absent" value={absent} labelClassName="text-red" />
            <CountTile label="On Leave" value={onLeave} labelClassName="text-primary" />
          </div>
          <p className="mt-2.5 text-xs text-gray">Attendance records as of {formatDate(TODAY)}</p>
          <ButtonLink href="/manager/employees?tab=attendance" variant="secondary" className="mt-2.5 h-8 w-full text-xs text-primary">
            View Attendance Records
          </ButtonLink>
        </SectionCard>

        <SectionCard size="sm" title="Task Overview" icon={<ClipboardCheck className="text-orange" />}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <CountTile label="Pending" value={taskCount("not-started")} labelClassName="text-orange" />
            <CountTile label="In Progress" value={taskCount("in-progress")} labelClassName="text-primary" />
            <CountTile label="Completed" value={taskCount("completed")} labelClassName="text-green" />
            <CountTile label="Overdue" value={taskCount("overdue")} labelClassName="text-red" />
          </div>
          <p className="mt-2.5 text-xs text-gray">
            {tasks.length} total tasks as of {formatDate(TODAY)}
          </p>
          <ButtonLink href="/manager/tasks" variant="secondary" className="mt-2.5 h-8 w-full text-xs text-primary">
            View All Tasks
          </ButtonLink>
        </SectionCard>
      </div>

      <SectionCard size="sm" title="Leave Request Summary" icon={<MessageSquareWarning className="text-primary-dark" />}>
        <DataTable density="compact" caption="Recent leave requests" columns={leaveColumns} rows={leaveRows} rowKey={(l) => l.id} />
        <div className="mt-3 flex justify-center">
          <ButtonLink href="/manager/leave" variant="secondary" className="h-8 w-full max-w-[240px] text-xs text-primary">
            View All Requests
          </ButtonLink>
        </div>
      </SectionCard>

      <SectionCard size="sm" title="Recent Announcements" icon={<Megaphone className="text-primary" />}>
        <DataTable density="compact" caption="Recent announcements" columns={annColumns} rows={annRows} rowKey={(a) => a.id} />
        <div className="mt-3 flex justify-center">
          <ButtonLink href="/manager/announcements" variant="secondary" className="h-8 w-full max-w-[240px] text-xs text-primary">
            View All Announcements
          </ButtonLink>
        </div>
      </SectionCard>
    </>
  );
}
