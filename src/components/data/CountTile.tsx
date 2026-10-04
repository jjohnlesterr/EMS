import { cn } from "@/lib/cn";

/** Small bordered count box (Manager Dashboard "Attendance Overview" / "Task Overview"). */
export function CountTile({ label, value, labelClassName }: { label: string; value: number; labelClassName: string }) {
  return (
    <div className="flex min-h-[60px] flex-col items-center justify-center gap-0.5 rounded-md border border-line bg-white px-2 py-2 2xl:min-h-[68px]">
      <span className={cn("text-[11px] 2xl:text-xs", labelClassName)}>{label}</span>
      <span className="text-lg text-black 2xl:text-xl">{value}</span>
    </div>
  );
}
