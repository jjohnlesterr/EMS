"use client";

import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { CURRENT_EMPLOYEE_ID } from "@/lib/mock-data";
import { useEms } from "@/lib/store";
import type { Role } from "@/lib/types";
import { ShellContext, type ShellState } from "./ShellContext";
import { Sidebar } from "./Sidebar";

/** Sidebar + content frame shared by the Employee and Manager areas. */
export function AppShell({ role, children }: { role: Role; children: ReactNode }) {
  const router = useRouter();
  const { employees, manager } = useEms();
  const [navOpen, setNavOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const user = role === "manager" ? manager : employees.find((e) => e.id === CURRENT_EMPLOYEE_ID)!;

  const shell = useMemo<ShellState>(() => ({ role, user, requestLogout: () => setLogoutOpen(true) }), [role, user]);

  return (
    <ShellContext.Provider value={shell}>
      <div className="flex min-h-screen bg-page">
        <Sidebar role={role} open={navOpen} onClose={() => setNavOpen(false)} onLogout={() => setLogoutOpen(true)} />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile top bar */}
          <div className="sticky top-0 z-30 flex h-12 items-center gap-3 bg-navy px-3 lg:hidden">
            <button
              type="button"
              onClick={() => setNavOpen(true)}
              aria-label="Open menu"
              className="rounded-md p-1 text-white hover:bg-white/10"
            >
              <Menu className="size-6" />
            </button>
            <ImageSlot asset="sidebarLogo" tone="dark" className="size-8 rounded" />
          </div>

          <main className="mx-auto flex w-full max-w-[1560px] flex-1 flex-col gap-3.5 px-3 pt-3 pb-5 sm:px-4 lg:px-5 2xl:gap-4 2xl:px-6">{children}</main>
        </div>
      </div>

      <ConfirmDialog
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => router.push("/login")}
        icon={<LogOut />}
        title="Log Out"
        message="Are you sure you want to log out of your account"
        confirmLabel="Log Out"
      />
    </ShellContext.Provider>
  );
}
