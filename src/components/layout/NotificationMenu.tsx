"use client";

import { Bell, CheckCheck, CircleCheck, ChevronRight, ClipboardList, Megaphone } from "lucide-react";
import { Popover } from "@/components/ui/Popover";
import { cn } from "@/lib/cn";
import { timeAgo } from "@/lib/format";
import { NOW } from "@/lib/mock-data";
import { useEms } from "@/lib/store";
import type { AppNotification } from "@/lib/types";
import { useShell } from "./ShellContext";

const KIND_ICON: Record<AppNotification["kind"], React.ReactNode> = {
  task: <ClipboardList className="size-5 text-primary" />,
  leave: <CircleCheck className="size-5 text-st-present" />,
  announcement: <Megaphone className="size-5 text-orange" />,
};

/** Bell button + notifications dropdown (Figma 360:3829). */
export function NotificationMenu() {
  const { role } = useShell();
  const { notifications, markNotificationsRead } = useEms();
  const items = notifications[role];
  const unread = items.filter((n) => !n.read).length;

  return (
    <Popover
      align="end"
      kind="dialog"
      panelClassName="w-[min(386px,calc(100vw-2rem))] p-0"
      trigger={({ triggerProps }) => (
        <button
          type="button"
          {...triggerProps}
          aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
          className="relative flex size-9 items-center justify-center rounded-full text-black hover:bg-white/70"
        >
          <Bell className="size-5" strokeWidth={1.75} />
          {unread > 0 && (
            <span aria-hidden className="absolute top-1.5 right-2 size-2 rounded-full border border-white bg-red" />
          )}
        </button>
      )}
    >
      {(close) => (
        <div>
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="font-serif text-base text-black">Notifications</h2>
            {unread > 0 && (
              <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] text-primary">{unread} New</span>
            )}
          </div>
          <ul className="max-h-[320px] overflow-y-auto">
            {items.map((n) => (
              <li key={n.id} className={cn("flex gap-3 border-b border-line px-4 py-3", !n.read && "bg-tint-blue")}>
                <span aria-hidden className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-card">
                  {KIND_ICON[n.kind]}
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-black">{n.title}</p>
                  <p className="text-xs text-gray">{n.message}</p>
                  <p className="mt-1 text-[11px] text-gray">{timeAgo(n.createdAt, NOW)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between px-4 py-3 text-xs">
            <button
              type="button"
              onClick={() => markNotificationsRead(role)}
              className="flex items-center gap-1.5 text-primary hover:underline"
            >
              <CheckCheck className="size-4" aria-hidden />
              Mark as all read
            </button>
            <button type="button" onClick={close} className="flex items-center gap-1 text-black hover:underline">
              View all notifications
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </Popover>
  );
}
