"use client";

import { createContext, useContext } from "react";
import type { Employee, Role } from "@/lib/types";

export interface ShellState {
  role: Role;
  user: Employee;
  requestLogout: () => void;
}

export const ShellContext = createContext<ShellState | null>(null);

/** Role + signed-in user for anything rendered inside <AppShell>. */
export function useShell(): ShellState {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used inside <AppShell>");
  return ctx;
}
