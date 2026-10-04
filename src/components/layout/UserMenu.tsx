"use client";

import Link from "next/link";
import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Popover } from "@/components/ui/Popover";
import { cn } from "@/lib/cn";
import { ROLE_LABEL, profileHref } from "@/lib/nav";
import { useShell } from "./ShellContext";

/** Avatar chip in the page header + profile dropdown (Figma 359:3465). */
export function UserMenu() {
  const { role, user, requestLogout } = useShell();

  return (
    <Popover
      align="end"
      panelClassName="w-[min(260px,calc(100vw-1.5rem))] p-1.5"
      trigger={({ open, triggerProps }) => (
        <button
          type="button"
          {...triggerProps}
          className="flex h-10 items-center gap-2 rounded-lg border border-gray/50 bg-white py-1 pr-2 pl-1 text-left shadow-card hover:border-primary sm:h-12 sm:w-[184px] sm:pl-1.5"
        >
          <Avatar name={user.name} src={user.avatar} size={30} className="sm:size-9!" />
          <span className="hidden min-w-0 flex-1 sm:block">
            <span className="block truncate font-serif text-[13px] text-black">{user.name}</span>
            <span className="block truncate font-serif text-[10px] text-primary-dark">{ROLE_LABEL[role]}</span>
          </span>
          <ChevronDown aria-hidden className={cn("size-4 shrink-0 text-black transition-transform", open && "rotate-180")} />
        </button>
      )}
    >
      {(close) => (
        <div>
          <div className="flex items-center gap-3 border-b border-line px-2 pt-1 pb-3">
            <Avatar name={user.name} src={user.avatar} size={44} />
            <div className="min-w-0">
              <p className="truncate font-serif text-base text-black">{user.name}</p>
              <p className="text-xs text-primary-dark">{ROLE_LABEL[role]}</p>
            </div>
          </div>
          <ul className="pt-1.5">
            <MenuLink href={profileHref(role)} icon={<UserRound />} title="My Profile" text="View and update your profile" onClick={close} />
            <MenuLink href={`${profileHref(role)}?tab=security`} icon={<Settings />} title="Settings" text="Manage your account settings" onClick={close} />
            <li>
              <button
                type="button"
                onClick={() => {
                  close();
                  requestLogout();
                }}
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-page"
              >
                <span aria-hidden className="text-red [&_svg]:size-5"><LogOut /></span>
                <span>
                  <span className="block text-sm text-red">Logout</span>
                  <span className="block text-[11px] text-gray">Sign out from your account</span>
                </span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </Popover>
  );
}

function MenuLink({ href, icon, title, text, onClick }: { href: string; icon: ReactNode; title: string; text: string; onClick: () => void }) {
  return (
    <li>
      <Link href={href} onClick={onClick} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-page">
        <span aria-hidden className="text-black [&_svg]:size-5">{icon}</span>
        <span>
          <span className="block text-sm text-black">{title}</span>
          <span className="block text-[11px] text-gray">{text}</span>
        </span>
      </Link>
    </li>
  );
}
