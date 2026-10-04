"use client";

import { CalendarDays, CircleCheck, ClipboardClock, Megaphone, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PageHeader } from "@/components/layout/PageHeader";
import { useShell } from "@/components/layout/ShellContext";
import { ViewDetailsButton } from "@/components/data/cells";
import { DataTable, type Column } from "@/components/data/DataTable";
import { StatCard, StatGrid } from "@/components/data/StatCard";
import { Toolbar } from "@/components/data/Toolbar";
import { formatDate, formatMonth, formatTime } from "@/lib/format";
import { TODAY } from "@/lib/mock-data";
import { useEms } from "@/lib/store";
import type { Announcement } from "@/lib/types";
import { useList } from "@/lib/use-list";
import { AnnouncementDetailModal } from "./AnnouncementDetailModal";
import { CreateAnnouncementModal } from "./CreateAnnouncementModal";
import { announcementSortOptions, announcementSorts, statusFilterOptions, statusFilters } from "./announcement-list";

/** Announcement management (Figma 492:13117). */
export function ManagerAnnouncements() {
  const { user } = useShell();
  const { announcements } = useEms();
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState<Announcement | null>(null);

  const list = useList({
    items: announcements,
    searchText: (a) => `${a.title} ${a.audience} ${a.status}`,
    sorts: announcementSorts,
    filters: statusFilters,
    pageSize: 7,
  });
  const count = (s: Announcement["status"]) => announcements.filter((a) => a.status === s).length;

  const columns: Column<Announcement>[] = [
    {
      key: "title",
      wrap: true,
      header: "Title",
      cell: (a) => (
        <button type="button" onClick={() => setSelected(a)} className="text-primary hover:underline">
          {a.title}
          <span className="block text-[11px] text-gray">{a.audience}</span>
        </button>
      ),
    },
    {
      key: "date",
      header: "Posted Date",
      cell: (a) => (
        <span className="text-gray">
          {formatDate(a.postedAt)}
          <span className="block">{formatTime(a.postedAt)}</span>
        </span>
      ),
      hideBelow: "sm",
    },
    { key: "status", header: "Status", cell: (a) => <StatusBadge status={`announcement:${a.status}`} /> },
    { key: "action", header: "Action", cell: (a) => <ViewDetailsButton onClick={() => setSelected(a)} /> },
  ];

  return (
    <>
      <PageHeader title="Announcement" subtitle="Stay updated with the latest news and updates from the company" />

      <StatGrid>
        <StatCard coloredTitle tone="blue" title="Total Announcement" value={announcements.length} caption="All time" icon={<Megaphone />} />
        <StatCard tone="green" title="Published" value={count("published")} caption="Currently live" icon={<CircleCheck />} />
        <StatCard coloredTitle tone="orange" title="Drafts" value={count("draft")} caption={formatMonth(TODAY)} icon={<ClipboardClock />} />
        <StatCard tinted={false} tone="green" title="Calendar" value={count("scheduled")} caption="Scheduled for later" icon={<CalendarDays />} />
      </StatGrid>

      <section aria-label="Announcements" className="flex flex-col gap-4">
        <Toolbar
          boxed
          search={{ value: list.query, onChange: list.setQuery, placeholder: "Search announcements or status..." }}
          sort={{ value: list.sort, onChange: list.setSort, options: announcementSortOptions }}
          filter={{ value: list.filter, onChange: list.setFilter, options: statusFilterOptions }}
          actions={
            <Button leftIcon={<Plus className="size-4" />} onClick={() => setCreating(true)} className="w-full sm:w-[160px] xl:w-[236px]">
              Create Announcement
            </Button>
          }
        />
        <DataTable caption="Announcements" columns={columns} rows={list.pageItems} rowKey={(a) => a.id} />
        <Pagination page={list.page} pageCount={list.pageCount} shown={list.pageItems.length} total={list.total} noun="announcement" onPageChange={list.setPage} />
      </section>

      <CreateAnnouncementModal open={creating} author={`${user.department}`} onClose={() => setCreating(false)} />
      <AnnouncementDetailModal announcement={selected} onClose={() => setSelected(null)} />
    </>
  );
}
