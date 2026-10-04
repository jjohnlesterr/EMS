"use client";

import { AlarmClock, CalendarDays, Check, MonitorCheck, NotebookPen, Plane, SquareX, UserCog, UserX } from "lucide-react";
import { useMemo, useState } from "react";
import { MenuSelect } from "@/components/ui/MenuSelect";
import { Pagination } from "@/components/ui/Pagination";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tabs } from "@/components/ui/Tabs";
import { PageHeader } from "@/components/layout/PageHeader";
import { PersonCell, ViewDetailsButton } from "@/components/data/cells";
import { DataTable, type Column } from "@/components/data/DataTable";
import { StatCard, StatGrid } from "@/components/data/StatCard";
import { Toolbar } from "@/components/data/Toolbar";
import { AttendanceDetailsModal } from "@/features/attendance/AttendanceDetailsModal";
import { attendanceFilterOptions, attendanceFilters } from "@/features/attendance/attendance-list";
import { formatHours, formatMonth, formatShortDate } from "@/lib/format";
import { DEPARTMENT_ATTENDANCE } from "@/lib/mock-data";
import { ATTENDANCE_STRIPE } from "@/lib/status";
import { useEms } from "@/lib/store";
import type { AttendanceRecord, Employee } from "@/lib/types";
import { useList } from "@/lib/use-list";
import { EmployeeDetailsModal } from "./EmployeeDetailsModal";
import { employeeFilterOptions, employeeFilters, nameTimeSortOptions, nameTimeSorts } from "./employee-list";

export type EmployeeTab = "employees" | "attendance";

const employeeSorts = nameTimeSorts<Employee>(
  (e) => e.name,
  (e) => DEPARTMENT_ATTENDANCE.find((r) => r.employeeId === e.id)?.timeIn,
);

/** Employee Management (Figma 473:4956 / 474:7314). */
export function EmployeeManagement({ initialTab = "employees" }: { initialTab?: EmployeeTab }) {
  const [tab, setTab] = useState<EmployeeTab>(initialTab);
  return (
    <>
      <PageHeader title="Employee Management" subtitle="View employees and review attendance within your department." />
      <Tabs<EmployeeTab>
        label="Employee Management"
        value={tab}
        onChange={setTab}
        items={[
          { value: "employees", label: "Employees", icon: <UserCog /> },
          { value: "attendance", label: "Attendance", icon: <NotebookPen /> },
        ]}
      />
      {tab === "employees" ? <EmployeesTab /> : <AttendanceTab />}
    </>
  );
}

function EmployeesTab() {
  const { employees } = useEms();
  const [selected, setSelected] = useState<Employee | null>(null);
  const list = useList({
    items: employees,
    searchText: (e) => `${e.name} ${e.email} ${e.employeeId} ${e.position}`,
    sorts: employeeSorts,
    filters: employeeFilters,
    pageSize: 7,
  });

  const active = employees.filter((e) => e.employmentStatus === "active").length;
  const columns: Column<Employee>[] = [
    { key: "name", header: "Employee", cell: (e) => <PersonCell name={e.name} avatar={e.avatar} /> },
    { key: "id", header: "Employee ID", cell: (e) => e.employeeId, hideBelow: "md" },
    { key: "position", header: "Position", cell: (e) => e.position, hideBelow: "lg" },
    { key: "email", header: "Email", cell: (e) => e.email, hideBelow: "xl" },
    { key: "status", header: "Status", cell: (e) => <StatusBadge status={`attendance:${e.todayStatus}`} /> },
    { key: "action", header: "Action", cell: (e) => <ViewDetailsButton onClick={() => setSelected(e)} /> },
  ];

  return (
    <>
      <StatGrid>
        <StatCard tone="blue" title="Total Employees" value={employees.length} caption="Department members" icon={<UserCog />} />
        <StatCard tone="green" title="Active Employees" value={active} caption="Currently Active" icon={<MonitorCheck />} />
        <StatCard tone="cyan" title="On Leave" value={employees.filter((e) => e.todayStatus === "leave").length} caption="Currently On Leave" icon={<Plane />} />
        <StatCard tone="red" title="Inactive" value={employees.length - active} caption="Not Active" icon={<SquareX />} />
      </StatGrid>

      <section aria-label="Department employees" className="flex flex-col gap-4">
        <Toolbar
          search={{ value: list.query, onChange: list.setQuery, placeholder: "Search by name, email, or ID..." }}
          sort={{ value: list.sort, onChange: list.setSort, options: nameTimeSortOptions }}
          filter={{ value: list.filter, onChange: list.setFilter, options: employeeFilterOptions }}
        />
        <DataTable
          caption="Department employees"
          columns={columns}
          rows={list.pageItems}
          rowKey={(e) => e.id}
          stripe={(e) => ATTENDANCE_STRIPE[e.todayStatus]}
        />
        <Pagination page={list.page} pageCount={list.pageCount} shown={list.pageItems.length} total={list.total} noun="employees" onPageChange={list.setPage} />
      </section>

      <EmployeeDetailsModal employee={selected} onClose={() => setSelected(null)} />
    </>
  );
}

type Row = AttendanceRecord & { employee: Employee };

const rowSorts = nameTimeSorts<Row>((r) => r.employee.name, (r) => r.timeIn);

function AttendanceTab() {
  const { employees } = useEms();
  const [selected, setSelected] = useState<Row | null>(null);

  const rows = useMemo<Row[]>(
    () =>
      DEPARTMENT_ATTENDANCE.flatMap((r) => {
        const employee = employees.find((e) => e.id === r.employeeId);
        return employee ? [{ ...r, employee }] : [];
      }),
    [employees],
  );
  const months = useMemo(
    () => Array.from(new Set(rows.map((r) => r.date.slice(0, 7)))).map((k) => ({ value: k, label: formatMonth(`${k}-01`) })),
    [rows],
  );
  const [month, setMonth] = useState(months[0]?.value ?? "");
  const inMonth = useMemo(() => rows.filter((r) => r.date.startsWith(month)), [rows, month]);

  const list = useList<Row>({
    items: inMonth,
    searchText: (r) => `${r.employee.name} ${r.status}`,
    sorts: rowSorts,
    filters: attendanceFilters,
    pageSize: 7,
  });

  const count = (s: AttendanceRecord["status"]) => inMonth.filter((r) => r.status === s).length;
  const columns: Column<Row>[] = [
    { key: "name", header: "Employee", cell: (r) => <PersonCell name={r.employee.name} avatar={r.employee.avatar} /> },
    { key: "date", header: "Date", cell: (r) => formatShortDate(r.date), hideBelow: "md" },
    { key: "in", header: "Time In", cell: (r) => r.timeIn ?? "---" },
    { key: "out", header: "Time Out", cell: (r) => r.timeOut ?? "---", hideBelow: "sm" },
    { key: "hours", header: "Total Hours", cell: (r) => formatHours(r.totalHours), hideBelow: "lg" },
    { key: "status", header: "Status", cell: (r) => <StatusBadge status={`attendance:${r.status}`} /> },
    { key: "action", header: "Action", cell: (r) => <ViewDetailsButton onClick={() => setSelected(r)} /> },
  ];

  return (
    <>
      <StatGrid>
        <StatCard tone="green" title="Present" value={count("present")} caption="Present today" icon={<Check strokeWidth={3} />} />
        <StatCard tone="orange" title="Late" value={count("late")} caption="Arrived late today" icon={<AlarmClock />} />
        <StatCard tone="cyan" title="On Leave" value={count("leave")} caption="Currently On Leave" icon={<Plane />} />
        <StatCard tone="red" title="Absent" value={count("absent")} caption="Absent today" icon={<UserX />} />
      </StatGrid>

      <section aria-label="Department attendance" className="flex flex-col gap-4">
        <Toolbar
          leading={
            <MenuSelect
              label="Select Month"
              showValue
              icon={<CalendarDays />}
              value={month}
              options={months}
              onChange={setMonth}
              className="w-full sm:w-[195px]"
            />
          }
          search={{ value: list.query, onChange: list.setQuery, placeholder: "Search by name or status..." }}
          sort={{ value: list.sort, onChange: list.setSort, options: nameTimeSortOptions }}
          filter={{ value: list.filter, onChange: list.setFilter, options: attendanceFilterOptions }}
        />
        <DataTable
          caption="Department attendance"
          columns={columns}
          rows={list.pageItems}
          rowKey={(r) => r.id}
          stripe={(r) => ATTENDANCE_STRIPE[r.status]}
        />
        <Pagination page={list.page} pageCount={list.pageCount} shown={list.pageItems.length} total={list.total} noun="employees" onPageChange={list.setPage} />
      </section>

      <AttendanceDetailsModal record={selected} employee={selected?.employee ?? employees[0]} onClose={() => setSelected(null)} />
    </>
  );
}
