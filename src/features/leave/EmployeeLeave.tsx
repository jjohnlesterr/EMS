"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PageHeader } from "@/components/layout/PageHeader";
import { useShell } from "@/components/layout/ShellContext";
import { ViewDetailsButton } from "@/components/data/cells";
import { DataTable, type Column } from "@/components/data/DataTable";
import { Toolbar } from "@/components/data/Toolbar";
import { formatDate, formatShortDate, formatWeekday } from "@/lib/format";
import { useEms } from "@/lib/store";
import type { LeaveRequest } from "@/lib/types";
import { useList } from "@/lib/use-list";
import { CreateLeaveModal } from "./CreateLeaveModal";
import { LeaveDetailsModal } from "./LeaveDetailsModal";
import { leaveFilterOptions, leaveFilters, leaveSortOptions, leaveSorts } from "./leave-list";

const weekdaySpan = (l: LeaveRequest) =>
  l.startDate === l.endDate ? formatWeekday(l.startDate).slice(0, 3) : `${formatWeekday(l.startDate).slice(0, 3)}-${formatWeekday(l.endDate).slice(0, 3)}`;

export function EmployeeLeave() {
  const { user } = useShell();
  const { leaves } = useEms();
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState<LeaveRequest | null>(null);

  const mine = leaves.filter((l) => l.employeeId === user.id);
  const list = useList({
    items: mine,
    searchText: (l) => `${l.leaveType} ${l.reason} ${l.status} ${formatDate(l.startDate)}`,
    sorts: leaveSorts,
    filters: leaveFilters,
    pageSize: 7,
  });

  const columns: Column<LeaveRequest>[] = [
    {
      key: "range",
      header: "Date Range",
      cell: (l) => (
        <>
          <p>{l.startDate === l.endDate ? formatShortDate(l.startDate) : `${formatShortDate(l.startDate)} - ${formatShortDate(l.endDate)}`}</p>
          <p className="text-xs text-gray">{weekdaySpan(l)}</p>
        </>
      ),
    },
    { key: "days", header: "Duration", cell: (l) => `${l.days} ${l.days === 1 ? "Day" : "Days"}` },
    { key: "reason", header: "Reason", cell: (l) => l.reason, hideBelow: "md", wrap: true },
    { key: "filed", header: "Date Filed", cell: (l) => formatDate(l.submittedAt), hideBelow: "lg" },
    { key: "status", header: "Status", cell: (l) => <StatusBadge status={`leave:${l.status}`} /> },
    { key: "action", header: "Action", cell: (l) => <ViewDetailsButton onClick={() => setSelected(l)} /> },
  ];

  return (
    <>
      <PageHeader title="Leave Requests" subtitle="Submit leave requests and track their status." />

      <section aria-label="Leave requests" className="flex flex-col gap-4">
        <div className="grid gap-4 lg:grid-cols-2 lg:items-end">
          <div className="order-2 flex flex-col gap-2.5 lg:order-1 lg:pb-0">
            <SearchInput
              value={list.query}
              onChange={(e) => list.setQuery(e.target.value)}
              placeholder="Search leave request..."
              className="w-full 2xl:w-[340px]"
            />
            <Toolbar
              sort={{ value: list.sort, onChange: list.setSort, options: leaveSortOptions }}
              filter={{ value: list.filter, onChange: list.setFilter, options: leaveFilterOptions }}
            />
          </div>

          <div className="order-1 flex items-center justify-between gap-4 rounded-[10px] border border-line bg-white px-4 py-3 lg:order-2">
            <div>
              <h2 className="font-serif text-base text-black 2xl:text-lg">Create Leave Request</h2>
              <p className="mt-0.5 text-xs text-gray">Need time off? Submit a leave requests</p>
              <Button leftIcon={<Plus className="size-4" />} onClick={() => setCreating(true)} className="mt-3 w-[180px]">
                Create Leave Request
              </Button>
            </div>
            <ImageSlot asset="leaveIllustration" fit="contain" className="hidden h-[76px] w-[74px] shrink-0 rounded-lg sm:block" />
          </div>
        </div>

        <DataTable caption="My leave requests" columns={columns} rows={list.pageItems} rowKey={(l) => l.id} />

        <Pagination
          page={list.page}
          pageCount={list.pageCount}
          shown={list.pageItems.length}
          total={list.total}
          noun="requests"
          onPageChange={list.setPage}
        />
      </section>

      <CreateLeaveModal open={creating} employeeId={user.id} onClose={() => setCreating(false)} />
      <LeaveDetailsModal leave={selected} role="employee" onClose={() => setSelected(null)} />
    </>
  );
}
