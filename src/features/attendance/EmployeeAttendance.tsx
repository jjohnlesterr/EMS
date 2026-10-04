"use client";

import { AlarmClock, CalendarDays, Check, ImageDown, Plane, PencilLine, UserX } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MenuSelect } from "@/components/ui/MenuSelect";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PageHeader } from "@/components/layout/PageHeader";
import { useShell } from "@/components/layout/ShellContext";
import { ViewDetailsButton } from "@/components/data/cells";
import { DataTable, type Column } from "@/components/data/DataTable";
import { StatCard, StatGrid } from "@/components/data/StatCard";
import { formatDate, formatMonth, formatWeekday } from "@/lib/format";
import { MY_ATTENDANCE, TODAY } from "@/lib/mock-data";
import { ATTENDANCE_STRIPE } from "@/lib/status";
import type { AttendanceRecord } from "@/lib/types";
import { useList } from "@/lib/use-list";
import { AttendanceDetailsModal } from "./AttendanceDetailsModal";
import { attendanceFilterOptions, attendanceFilters, byDateDesc, downloadAttendanceCsv } from "./attendance-list";

const ALL_MONTHS = "all";

export function EmployeeAttendance() {
  const { user } = useShell();
  const records = MY_ATTENDANCE;
  const [selected, setSelected] = useState<AttendanceRecord | null>(null);

  const months = useMemo(() => {
    const keys = Array.from(new Set(records.map((r) => r.date.slice(0, 7))));
    return [
      { value: ALL_MONTHS, label: "All months" },
      ...keys.map((k) => ({ value: k, label: formatMonth(`${k}-01`) })),
    ];
  }, [records]);
  const [month, setMonth] = useState(TODAY.slice(0, 7));
  const inMonth = useMemo(
    () => (month === ALL_MONTHS ? records : records.filter((r) => r.date.startsWith(month))),
    [records, month],
  );

  const list = useList({
    items: inMonth,
    searchText: (r) => `${formatDate(r.date)} ${formatWeekday(r.date)} ${r.status}`,
    sorts: [byDateDesc],
    filters: attendanceFilters,
    pageSize: 7,
  });

  const count = (s: AttendanceRecord["status"]) => records.filter((r) => r.status === s).length;

  const columns: Column<AttendanceRecord>[] = [
    {
      key: "date",
      header: "Date",
      cell: (r) => (
        <>
          <p className="text-sm">{formatDate(r.date)}</p>
          <p className="text-xs text-gray">{formatWeekday(r.date)}</p>
        </>
      ),
    },
    { key: "in", header: "Time in", cell: (r) => <span className="text-sm">{r.timeIn ?? "---"}</span> },
    { key: "out", header: "Time out", cell: (r) => <span className="text-sm">{r.timeOut ?? "---"}</span>, hideBelow: "sm" },
    { key: "status", header: "Status", cell: (r) => <StatusBadge status={`attendance:${r.status}`} /> },
    { key: "action", header: "Action", cell: (r) => <ViewDetailsButton onClick={() => setSelected(r)} /> },
  ];

  return (
    <>
      <PageHeader title="Attendance Records" subtitle="Track and monitor your attendance history" />

      <StatGrid>
        <StatCard tone="green" title="Present" value={count("present")} caption="Present today" icon={<Check strokeWidth={3} />} />
        <StatCard tone="orange" title="Late" value={count("late")} caption="Arrived late today" icon={<AlarmClock />} />
        <StatCard tone="orange" title="On Leave" value={count("leave")} caption="Currently On Leave" icon={<Plane />} />
        <StatCard tone="red" title="Absent" value={count("absent")} caption="Absent today" icon={<UserX />} />
      </StatGrid>

      <section aria-label="Attendance history" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <MenuSelect
            label="Month"
            showValue
            icon={<CalendarDays />}
            value={month}
            options={months}
            onChange={setMonth}
            className="w-[calc(50%-6px)] sm:w-[170px]"
          />
          <MenuSelect
            label="Status"
            icon={<PencilLine />}
            value={list.filter}
            options={attendanceFilterOptions}
            onChange={list.setFilter}
            className="w-[calc(50%-6px)] sm:w-[140px]"
          />
          <div className="flex w-full items-center gap-3 sm:ml-auto sm:w-auto">
            <SearchInput
              value={list.query}
              onChange={(e) => list.setQuery(e.target.value)}
              placeholder="Search date or status..."
              className="flex-1 sm:w-[240px] xl:w-[300px]"
            />
            <Button
              size="md"
              leftIcon={<ImageDown className="size-4" />}
              onClick={() => downloadAttendanceCsv(list.visible, `attendance-${user.employeeId}.csv`)}
            >
              Export
            </Button>
          </div>
        </div>

        <DataTable
          caption="Attendance records"
          columns={columns}
          rows={list.pageItems}
          rowKey={(r) => r.id}
          stripe={(r) => ATTENDANCE_STRIPE[r.status]}
        />

        <Pagination
          page={list.page}
          pageCount={list.pageCount}
          shown={list.pageItems.length}
          total={list.total}
          noun="attendance"
          onPageChange={list.setPage}
        />
      </section>

      <AttendanceDetailsModal record={selected} employee={user} onClose={() => setSelected(null)} />
    </>
  );
}
