import { Archive, FileText, UsersRound } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Task } from "@/lib/types";

const STYLES: Record<Task["icon"], { className: string; Icon: typeof FileText }> = {
  document: { className: "bg-primary-soft text-primary", Icon: FileText },
  archive: { className: "bg-green text-black", Icon: Archive },
  people: { className: "bg-primary-soft text-primary", Icon: UsersRound },
};

/** Rounded-square task glyph on the left of each task card. */
export function TaskIcon({ icon, className }: { icon: Task["icon"]; className?: string }) {
  const { className: tone, Icon } = STYLES[icon];
  return (
    <span aria-hidden className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", tone, className)}>
      <Icon className="size-[18px]" />
    </span>
  );
}
