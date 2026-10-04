import { AlarmClock, Check, CircleX, Clock, Plane, UserX } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { STATUS_STYLES, type BadgeIcon, type StatusKey } from "@/lib/status";

const ICONS: Record<Exclude<BadgeIcon, "none">, ReactNode> = {
  check: <Check className="size-3.5" strokeWidth={3} />,
  "user-x": <UserX className="size-3.5" strokeWidth={2.5} />,
  alarm: <AlarmClock className="size-3.5 text-[#c45f00]" strokeWidth={2.5} />,
  plane: <Plane className="size-3.5" strokeWidth={2.5} />,
  clock: <Clock className="size-3.5" strokeWidth={2.5} />,
  "x-circle": <CircleX className="size-3.5" strokeWidth={2.5} />,
};

interface StatusBadgeProps {
  status: StatusKey;
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({ status, size = "md", className }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];
  const sizing =
    style.variant === "outlined"
      ? size === "sm"
        ? "h-6 min-w-[80px] px-2 text-[11px]"
        : "h-7 min-w-[92px] px-2.5 text-xs"
      : size === "sm"
        ? "h-5 min-w-[64px] px-2 text-[10px]"
        : "h-6 min-w-[84px] px-2 text-[11px]";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
        style.variant === "outlined" ? "rounded-md border" : "rounded-md",
        sizing,
        style.className,
        className,
      )}
    >
      {style.variant === "dot" && <span aria-hidden className={cn("size-2.5 rounded-full", style.dotClassName)} />}
      {style.icon && style.icon !== "none" && <span aria-hidden>{ICONS[style.icon]}</span>}
      {style.label}
    </span>
  );
}
