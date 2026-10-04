"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { cn } from "@/lib/cn";
import { NAV_ITEMS } from "@/lib/nav";
import type { Role } from "@/lib/types";
import { NavIcon } from "./NavIcon";

interface SidebarProps {
  role: Role;
  onLogout: () => void;
  /** Mobile drawer state; ignored on lg+ where the sidebar is always visible. */
  open: boolean;
  onClose: () => void;
}

/** Navy sidebar from the finalized Employee UI, shared by every role. */
export function Sidebar({ role, onLogout, open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && <div aria-hidden className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} />}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col bg-navy text-white transition-transform duration-200 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-[200px] lg:translate-x-0 2xl:w-[220px]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Sidebar"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute top-4 right-4 rounded-md p-1 text-white/80 hover:text-white lg:hidden"
        >
          <X className="size-6" />
        </button>

        <Link href={NAV_ITEMS[role][0].href} className="mx-auto mt-5 block 2xl:mt-6" aria-label="EMS home">
          <ImageSlot asset="sidebarLogo" tone="dark" className="size-[76px] rounded-lg 2xl:size-[88px]" />
        </Link>

        <nav className="mt-6 flex-1 overflow-y-auto px-3 2xl:px-4" aria-label="Main">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS[role].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-9 items-center gap-3 rounded-md px-3 py-1.5 text-[13px] leading-tight transition-colors 2xl:min-h-10 2xl:text-sm",
                      active ? "bg-primary-active text-white" : "text-white hover:bg-white/10",
                    )}
                  >
                    <NavIcon name={item.icon} className="size-[18px] shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mx-3 mb-4 border-t border-white/25 pt-2.5 2xl:mx-4">
          <button
            type="button"
            onClick={onLogout}
            className="flex min-h-9 w-full items-center gap-3 rounded-md px-3 py-1.5 text-[13px] text-white hover:bg-white/10 2xl:text-sm"
          >
            <LogOut aria-hidden className="size-[18px]" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
