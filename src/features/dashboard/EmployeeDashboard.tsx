"use client";

import { ClipboardPen, Megaphone, NotebookPen, Plane } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PageHeader } from "@/components/layout/PageHeader";
import { useShell } from "@/components/layout/ShellContext";
import { SectionCard } from "@/components/data/SectionCard";
import { StatCard, StatGrid } from "@/components/data/StatCard";
import { AnnouncementSummary } from "@/features/announcements/AnnouncementItem";
import { formatDate } from "@/lib/format";
import { MY_ATTENDANCE, TODAY } from "@/lib/mock-data";
import { useEms } from "@/lib/store";

export function EmployeeDashboard() {
  const { user } = useShell();
  const { tasks, leaves, announcements } = useEms();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const myTasks = tasks.filter((t) => t.assigneeId === user.id);
  const pendingTasks = myTasks.filter((t) => t.status !== "completed");
  const pendingLeaves = leaves.filter((l) => l.employeeId === user.id && l.status === "pending");
  const published = announcements.filter((a) => a.status === "published");
  const unread = published.filter((a) => !a.read);
  const today = MY_ATTENDANCE.find((r) => r.date === TODAY);
  const [time, meridiem] = (today?.timeIn ?? "--:-- ").split(" ");

  const taskList = myTasks.filter((t) => !q || t.title.toLowerCase().includes(q)).slice(0, 4);
  const annList = published
    .filter((a) => !q || `${a.title} ${a.excerpt}`.toLowerCase().includes(q))
    .slice(0, 3);

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Have a Good Day!" />

      <section aria-labelledby="welcome" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 id="welcome" className="font-serif text-base text-black 2xl:text-lg">
              Welcome Back, {user.firstName}!
            </h2>
            <p className="text-xs text-gray">Here’s what’s happening today.</p>
          </div>
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything..."
            className="w-full sm:w-[280px] 2xl:w-[340px]"
          />
        </div>

        <StatGrid>
          <StatCard
            coloredTitle
            tone="blue"
            title="Attendance Today"
            value={
              <>
                {time}
                <span className="text-[13px]">{meridiem}</span>
              </>
            }
            caption="Time in"
            icon={<NotebookPen />}
          />
          <StatCard coloredTitle tone="green" title="Pending Task" value={pendingTasks.length} caption="Open tasks" icon={<ClipboardPen />} />
          <StatCard coloredTitle tone="orange" title="Leave Status" value={pendingLeaves.length} caption="pending request" icon={<Plane />} />
          <StatCard coloredTitle tone="cyan" title="Announcements" value={unread.length} caption="Unread" icon={<Megaphone />} />
        </StatGrid>
      </section>

      <div className="grid gap-3 lg:grid-cols-[5fr_7fr] 2xl:gap-4">
        <SectionCard
          title="My Tasks"
          action={
            <ButtonLink href="/employee/tasks" size="sm" className="px-3">
              View all
            </ButtonLink>
          }
        >
          <ul className="px-1 xl:px-3">
            {taskList.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-4 border-b border-line py-2.5 last:border-b-0">
                <div className="min-w-0">
                  <p className="text-sm leading-snug text-black">{t.title}</p>
                  <p className="mt-0.5 text-xs text-gray">Due: {formatDate(t.dueDate)}</p>
                </div>
                <StatusBadge status={`task:${t.status}`} size="sm" />
              </li>
            ))}
            {taskList.length === 0 && <li className="py-10 text-center text-sm text-gray">No tasks match your search.</li>}
          </ul>
        </SectionCard>

        <SectionCard
          title="Latest Announcement"
          action={
            <ButtonLink href="/employee/announcements" size="sm" className="px-3">
              View all
            </ButtonLink>
          }
        >
          <ul className="px-1 xl:px-0">
            {annList.map((a) => (
              <li key={a.id} className="border-b border-line py-3 last:border-b-0">
                <AnnouncementSummary announcement={a} />
              </li>
            ))}
            {annList.length === 0 && <li className="py-10 text-center text-sm text-gray">No announcements match your search.</li>}
          </ul>
        </SectionCard>
      </div>
    </>
  );
}
