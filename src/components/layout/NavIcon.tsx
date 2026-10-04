import { ClipboardCheck, LayoutDashboard, Megaphone, NotebookPen, Plane, UserCog } from "lucide-react";
import type { NavIcon as NavIconName } from "@/lib/nav";

const ICONS = {
  dashboard: LayoutDashboard,
  attendance: NotebookPen,
  employees: UserCog,
  tasks: ClipboardCheck,
  announcements: Megaphone,
  leave: Plane,
} satisfies Record<NavIconName, unknown>;

export function NavIcon({ name, className }: { name: NavIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon aria-hidden className={className} />;
}
