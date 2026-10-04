import { CalendarDays, ShieldCheck, UsersRound, Wrench } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Announcement } from "@/lib/types";

const ICONS: Record<Announcement["icon"], typeof CalendarDays> = {
  calendar: CalendarDays,
  people: UsersRound,
  shield: ShieldCheck,
  wrench: Wrench,
};

/** Rose-tinted circle with the announcement glyph (Figma Latest Announcement list). */
export function AnnouncementIcon({ icon, size = "md", className }: { icon: Announcement["icon"]; size?: "md" | "lg"; className?: string }) {
  const Icon = ICONS[icon];
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-tint-rose",
        size === "md" ? "size-9 [&_svg]:size-[18px]" : "size-12 [&_svg]:size-6",
        icon === "people" ? "text-primary-dark" : "text-black/80",
        className,
      )}
    >
      <Icon strokeWidth={1.75} />
    </span>
  );
}
