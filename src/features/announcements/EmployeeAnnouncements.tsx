"use client";

import { CalendarDays, ChevronRight, Eye, Mail, MailOpen, Megaphone } from "lucide-react";
import { useState } from "react";
import { Pagination } from "@/components/ui/Pagination";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard, StatGrid } from "@/components/data/StatCard";
import { Toolbar } from "@/components/data/Toolbar";
import { cn } from "@/lib/cn";
import { formatMonth } from "@/lib/format";
import { TODAY } from "@/lib/mock-data";
import { useEms } from "@/lib/store";
import type { Announcement } from "@/lib/types";
import { useList } from "@/lib/use-list";
import { AnnouncementDetailModal } from "./AnnouncementDetailModal";
import { AnnouncementSummary } from "./AnnouncementItem";
import { announcementSortOptions, announcementSorts, readFilterOptions, readFilters } from "./announcement-list";

export function EmployeeAnnouncements() {
  const { announcements, markAnnouncementRead } = useEms();
  const [open, setOpen] = useState<{ item: Announcement; wasUnread: boolean } | null>(null);

  const published = announcements.filter((a) => a.status === "published");
  const list = useList({
    items: published,
    searchText: (a) => `${a.title} ${a.excerpt} ${a.author}`,
    sorts: announcementSorts,
    filters: readFilters,
    pageSize: 4,
  });

  const thisMonth = published.filter((a) => a.postedAt.startsWith(TODAY.slice(0, 7))).length;
  const unread = published.filter((a) => !a.read).length;

  function openItem(a: Announcement) {
    setOpen({ item: a, wasUnread: !a.read });
    if (!a.read) markAnnouncementRead(a.id);
  }

  return (
    <>
      <PageHeader title="Announcements" subtitle="Stay updated with the latest news and updates from the company" />

      <StatGrid>
        <StatCard tone="blue" title="Total Announcement" value={published.length} caption="All time" icon={<Megaphone />} />
        <StatCard tone="green" title="Viewed" value={published.length - unread} caption="Read" icon={<Eye />} />
        <StatCard tone="orange" title="Unread Announcement" value={unread} caption="Not yet read" icon={<Mail />} />
        <StatCard tone="cyan" title="This Month" value={thisMonth} caption={formatMonth(TODAY)} icon={<CalendarDays />} />
      </StatGrid>

      <section aria-label="Announcements" className="flex flex-col gap-4">
        <Toolbar
          boxed
          search={{ value: list.query, onChange: list.setQuery, placeholder: "Search announcements..." }}
          sort={{ value: list.sort, onChange: list.setSort, options: announcementSortOptions }}
          filter={{ value: list.filter, onChange: list.setFilter, options: readFilterOptions }}
        />

        <ul className="flex flex-col gap-2.5">
          {list.pageItems.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => openItem(a)}
                className="flex min-h-[72px] w-full items-center gap-3 rounded-[10px] border border-gray/50 bg-white px-4 py-3 text-left transition-colors hover:border-primary xl:px-5"
              >
                <div className="min-w-0 flex-1">
                  <AnnouncementSummary announcement={a} />
                </div>
                <span
                  className={cn(
                    "hidden h-7 shrink-0 items-center gap-1.5 rounded-md px-3 text-[13px] sm:inline-flex",
                    a.read ? "bg-page text-gray" : "bg-primary-soft text-primary",
                  )}
                >
                  {a.read ? <MailOpen aria-hidden className="size-4" /> : <span aria-hidden className="size-2 rounded-full bg-primary" />}
                  {a.read ? "Read" : "Unread"}
                </span>
                <ChevronRight aria-hidden className="size-6 shrink-0 text-black" />
              </button>
            </li>
          ))}
          {list.pageItems.length === 0 && (
            <li className="rounded-[10px] border border-line bg-white py-12 text-center text-sm text-gray">No announcements match your search or filter.</li>
          )}
        </ul>

        <Pagination
          page={list.page}
          pageCount={list.pageCount}
          shown={list.pageItems.length}
          total={list.total}
          noun="announcement"
          onPageChange={list.setPage}
        />
      </section>

      <AnnouncementDetailModal announcement={open?.item ?? null} isNew={open?.wasUnread} onClose={() => setOpen(null)} />
    </>
  );
}
