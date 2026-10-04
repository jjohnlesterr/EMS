import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionCardProps {
  title: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  /** "lg": Employee Dashboard serif header with divider. "sm": Manager Dashboard icon header. */
  size?: "sm" | "lg";
}

/** Bordered white panel with a header row (dashboard widgets). */
export function SectionCard({ title, icon, action, children, className, size = "lg" }: SectionCardProps) {
  return (
    <section
      className={cn(
        "flex flex-col border border-line bg-white",
        size === "lg" ? "rounded-xl px-4 pt-3 pb-3" : "rounded-[10px] px-3.5 pt-3 pb-3.5",
        className,
      )}
    >
      <header
        className={cn(
          "flex items-center justify-between gap-3",
          size === "lg" && "border-b border-line pb-2",
        )}
      >
        <h2
          className={cn(
            "flex items-center gap-2.5",
            size === "lg" ? "font-serif text-base text-black 2xl:text-lg" : "text-sm text-black",
          )}
        >
          {icon && <span aria-hidden className="[&_svg]:size-[18px]">{icon}</span>}
          {title}
        </h2>
        {action}
      </header>
      <div className={cn("flex-1", size === "lg" ? "pt-0.5" : "pt-2.5")}>{children}</div>
    </section>
  );
}
