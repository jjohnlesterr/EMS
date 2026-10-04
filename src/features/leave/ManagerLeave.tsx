"use client";

import { CircleCheck, CircleX, Ellipsis, Plane } from "lucide-react";
import { useState } from "react";
import { Pagination } from "@/components/ui/Pagination";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PageHeader } from "@/components/layout/PageHeader";
import { PersonCell, ViewDetailsButton } from "@/components/data/cells";
import { DataTable, type Column } from "@/components/data/DataTable";
import { StatCard, StatGrid } from "@/components/data/StatCard";
import { Toolbar } from "@/components/data/Toolbar";
import { TODAY } from "@/lib/mock-data";
import { useEms } from "@/lib/store";
import type { LeaveRequest } from "@/lib/types";
import { useList } from "@/lib/use-list";
import { LeaveDetailsModal } from "./LeaveDetailsModal";
import { leaveFilterOptions, leaveFilters, leaveSortOptions, leaveSorts } from "./leave-list";

/** Leave Requests review (Figma 492:11175). */
export function ManagerLeave() {
  const { leaves, employees } = useEms();
  const [selected, setSelected] = useState<LeaveRequest | null>(null);
  const employee = (id: string) => employees.find((e) => e.id === id);

  const list = useList({
    items: leaves,
    searchText: (l) => `${employee(l.employeeId)?.name} ${employee(l.employeeId)?.employeeId} ${l.leaveType} ${l.status}`,
    sorts: leaveSorts,
    filters: leaveFilters,
    pageSize: 7,
  });

  const total = leaves.length || 1;
  const count = (s: LeaveRequest["status"]) => leaves.filter((l) => l.status === s).length;
  const pct = (n: number) => `${Math.round((n / total) * 100)}% of total`;
  const onLeaveToday = leaves.filter((l) => l.status === "approved" && l.startDate <= TODAY && l.endDate >= TODAY).length;

  const columns: Column<LeaveRequest>[] = [
    { key: "name", header: "Employee", cell: (l) => <PersonCell name={employee(l.employeeId)?.name ?? ""} /> },
    { key: "id", header: "Employee ID", cell: (l) => employee(l.employeeId)?.employeeId, hideBelow: "md" },
    { key: "type", header: <>Leave<br className="hidden xl:inline" /> Type</>, cell: (l) => l.leaveType, hideBelow: "sm" },
    { key: "days", header: "Days", cell: (l) => l.days, hideBelow: "lg" },
    { key: "status", header: "Status", cell: (l) => <StatusBadge status={`leave:${l.status}`} /> },
    { key: "action", header: "Action", cell: (l) => <ViewDetailsButton onClick={() => setSelected(l)} /> },
  ];

  return (
    <>
      <PageHeader title="Leave Requests" subtitle="Review and manage leave requests within your department" />

      <StatGrid>
        <StatCard tone="orange" title="Pending Requests" value={count("pending")} caption={pct(count("pending"))} icon={<Ellipsis />} />
        <StatCard tone="green" title="Approved" value={count("approved")} caption={pct(count("approved"))} icon={<CircleCheck />} />
        <StatCard tone="red" title="Rejected" value={count("rejected")} caption={pct(count("rejected"))} icon={<CircleX />} />
        <StatCard tone="cyan" title="On Leave Today" value={onLeaveToday} caption={pct(onLeaveToday)} icon={<Plane />} />
      </StatGrid>

      <section aria-label="Leave requests" className="flex flex-col gap-4">
        <Toolbar
          boxed
          search={{ value: list.query, onChange: list.setQuery, placeholder: "Search leave request..." }}
          sort={{ value: list.sort, onChange: list.setSort, options: leaveSortOptions }}
          filter={{ value: list.filter, onChange: list.setFilter, options: leaveFilterOptions }}
        />
        <DataTable caption="Department leave requests" columns={columns} rows={list.pageItems} rowKey={(l) => l.id} />
        <Pagination page={list.page} pageCount={list.pageCount} shown={list.pageItems.length} total={list.total} noun="requests" onPageChange={list.setPage} />
      </section>

      <LeaveDetailsModal leave={selected} role="manager" onClose={() => setSelected(null)} />
    </>
  );
}
