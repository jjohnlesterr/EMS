import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/cn";

/** Avatar + name (+ optional subtitle) cell. */
export function PersonCell({ name, subtitle, avatar, className }: { name: string; subtitle?: string; avatar?: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 text-left", className)}>
      <Avatar name={name} src={avatar} size={24} />
      <div className="min-w-0">
        <p className="truncate text-[13px] text-black">{name}</p>
        {subtitle && <p className="truncate text-[11px] text-gray">{subtitle}</p>}
      </div>
    </div>
  );
}

/** "View Details ›" outlined button used in table action columns. */
export function ViewDetailsButton({ onClick, label = "View Details" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-7 items-center gap-1 rounded-md border border-gray/70 bg-white px-2 text-xs whitespace-nowrap text-primary hover:border-primary hover:bg-primary-soft"
    >
      {label}
      <ChevronRight aria-hidden className="size-3.5 text-black" />
    </button>
  );
}

/** Icon · label · value row used in the details modals. */
export function InfoRow({ icon, label, value, className }: { icon?: ReactNode; label: ReactNode; value: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-start justify-between gap-4 border-b border-line py-2.5 text-[13px]", className)}>
      <span className="flex items-center gap-2.5 text-black">
        {icon && <span aria-hidden className="text-primary [&_svg]:size-4">{icon}</span>}
        <span className="font-serif">{label}</span>
      </span>
      <span className="text-right text-black">{value}</span>
    </div>
  );
}

/** Labeled read-only value (Employment Information grid). */
export function ReadOnlyValue({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-gray">{label}</p>
      <div className="mt-1 border-b border-line pb-1.5 text-sm text-black">{value}</div>
    </div>
  );
}

/** Attachment chip: file name + size. */
export function AttachmentChip({ name, size }: { name: string; size: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-page px-3 py-2 text-sm">
      <span className="truncate text-primary">{name}</span>
      <span className="shrink-0 text-xs text-gray">{size}</span>
    </div>
  );
}
