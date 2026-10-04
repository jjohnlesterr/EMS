"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  ANNOUNCEMENTS,
  COMMENT_MANAGER,
  EMPLOYEES,
  EMPLOYEE_NOTIFICATIONS,
  LEAVE_REQUESTS,
  MANAGER,
  MANAGER_NOTIFICATIONS,
  TASKS,
} from "./mock-data";
import type { Announcement, AppNotification, Employee, LeaveRequest, Role, Task, TaskComment } from "./types";

/**
 * In-memory client store standing in for the backend. State lives for the
 * browser session so interactions (status updates, new requests…) persist
 * while navigating. Replace the action bodies with API calls later.
 */
interface EmsStore {
  employees: Employee[];
  manager: Employee;
  tasks: Task[];
  leaves: LeaveRequest[];
  announcements: Announcement[];
  notifications: Record<Role, AppNotification[]>;

  person: (id: string) => { name: string; role: Role; avatar?: string };
  updateEmployee: (id: string, patch: Partial<Employee>) => void;
  addTask: (task: Omit<Task, "id" | "comments">) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  addTaskComment: (taskId: string, comment: Omit<TaskComment, "id">) => void;
  markTaskCommentsRead: (taskId: string) => void;
  addLeave: (leave: Omit<LeaveRequest, "id">) => void;
  updateLeave: (id: string, patch: Partial<LeaveRequest>) => void;
  addAnnouncement: (a: Omit<Announcement, "id">) => void;
  markAnnouncementRead: (id: string) => void;
  markNotificationsRead: (role: Role) => void;
}

const StoreContext = createContext<EmsStore | null>(null);

let seq = 1000;
const nextId = (prefix: string) => `${prefix}${++seq}`;

export function EmsProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [manager, setManager] = useState(MANAGER);
  const [tasks, setTasks] = useState(TASKS);
  const [leaves, setLeaves] = useState(LEAVE_REQUESTS);
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS);
  const [notifications, setNotifications] = useState<Record<Role, AppNotification[]>>({
    employee: EMPLOYEE_NOTIFICATIONS,
    manager: MANAGER_NOTIFICATIONS,
  });

  const person = useCallback(
    (id: string) => {
      if (id === manager.id) return { name: manager.name, role: "manager" as const, avatar: manager.avatar };
      if (id === COMMENT_MANAGER.id) return { name: COMMENT_MANAGER.name, role: "manager" as const };
      const e = employees.find((x) => x.id === id);
      return { name: e?.name ?? "Unknown", role: "employee" as const, avatar: e?.avatar };
    },
    [employees, manager],
  );

  const value = useMemo<EmsStore>(
    () => ({
      employees,
      manager,
      tasks,
      leaves,
      announcements,
      notifications,
      person,
      updateEmployee: (id, patch) => {
        if (id === manager.id) setManager((m) => ({ ...m, ...patch }));
        else setEmployees((list) => list.map((e) => (e.id === id ? { ...e, ...patch } : e)));
      },
      addTask: (task) => setTasks((list) => [{ ...task, id: nextId("t"), comments: [] }, ...list]),
      updateTask: (id, patch) => setTasks((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t))),
      addTaskComment: (taskId, comment) =>
        setTasks((list) =>
          list.map((t) => (t.id === taskId ? { ...t, comments: [...t.comments, { ...comment, id: nextId("c") }] } : t)),
        ),
      markTaskCommentsRead: (taskId) =>
        setTasks((list) =>
          list.map((t) => (t.id === taskId ? { ...t, comments: t.comments.map((c) => ({ ...c, read: true })) } : t)),
        ),
      addLeave: (leave) => setLeaves((list) => [{ ...leave, id: nextId("l") }, ...list]),
      updateLeave: (id, patch) => setLeaves((list) => list.map((l) => (l.id === id ? { ...l, ...patch } : l))),
      addAnnouncement: (a) => setAnnouncements((list) => [{ ...a, id: nextId("a") }, ...list]),
      markAnnouncementRead: (id) =>
        setAnnouncements((list) => list.map((a) => (a.id === id ? { ...a, read: true } : a))),
      markNotificationsRead: (role) =>
        setNotifications((n) => ({ ...n, [role]: n[role].map((x) => ({ ...x, read: true })) })),
    }),
    [employees, manager, tasks, leaves, announcements, notifications, person],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useEms(): EmsStore {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useEms must be used inside <EmsProvider>");
  return ctx;
}
