import type { Role } from "@/lib/types";
import { ROLE_LABEL } from "@/lib/nav";
import { cn } from "@/lib/cn";

/** Small pill next to names in comment threads. */
export function RoleTag({ role, className }: { role: Role; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-full border px-2 text-[10px]",
        role === "manager" ? "border-primary bg-primary-soft text-primary" : "border-green bg-[#eaf7ee] text-st-present",
        className,
      )}
    >
      {ROLE_LABEL[role]}
    </span>
  );
}
