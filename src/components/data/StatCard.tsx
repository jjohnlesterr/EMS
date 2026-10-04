import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Tone = "blue" | "green" | "orange" | "cyan" | "red" | "neutral";

const TONES: Record<Tone, { tint: string; solid: string; soft: string; title: string }> = {
  blue: { tint: "bg-tint-blue", solid: "bg-primary text-white", soft: "bg-primary-soft text-primary", title: "text-primary-dark" },
  green: { tint: "bg-tint-green", solid: "bg-green text-white", soft: "bg-[#e6f7eb] text-green", title: "text-green" },
  orange: { tint: "bg-tint-orange", solid: "bg-orange text-white", soft: "bg-[#fff1e3] text-orange", title: "text-orange" },
  cyan: { tint: "bg-tint-cyan", solid: "bg-cyan text-white", soft: "bg-[#e0f8fd] text-cyan", title: "text-cyan" },
  red: { tint: "bg-tint-red", solid: "bg-st-absent text-white", soft: "bg-[#ffe9e9] text-st-absent", title: "text-red" },
  neutral: { tint: "bg-white", solid: "bg-gray text-white", soft: "bg-page text-gray", title: "text-black" },
};

interface StatCardProps {
  title: string;
  value: ReactNode;
  caption: string;
  icon: ReactNode;
  tone: Tone;
  /** Colored title text (Employee Dashboard). */
  coloredTitle?: boolean;
  /** "soft" = tinted circle with colored glyph; "solid" = colored circle, white glyph. */
  iconStyle?: "solid" | "soft";
  /** Bold value with larger caption (Tasks screen). */
  emphasis?: boolean;
  /** Tint the whole card background. */
  tinted?: boolean;
}

/** One of the four summary cards at the top of every screen. */
export function StatCard({
  title,
  value,
  caption,
  icon,
  tone,
  coloredTitle,
  iconStyle = "solid",
  emphasis,
  tinted = true,
}: StatCardProps) {
  const t = TONES[tone];
  return (
    <div
      className={cn(
        "flex min-h-[84px] flex-col justify-between rounded-[10px] border border-line px-3.5 pt-2.5 pb-3 2xl:min-h-[96px] 2xl:px-4",
        tinted ? t.tint : "bg-white",
      )}
    >
      <h3 className={cn("text-[13px] leading-tight 2xl:text-sm", coloredTitle ? t.title : "text-black")}>{title}</h3>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className={cn("leading-none text-black", emphasis ? "text-lg font-bold 2xl:text-xl" : "text-lg 2xl:text-xl")}>{value}</p>
          <p className={cn("mt-1 leading-tight", emphasis ? "text-xs text-gray" : "text-[11px] text-black")}>{caption}</p>
        </div>
        <span
          aria-hidden
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full 2xl:size-9 [&_svg]:size-4 2xl:[&_svg]:size-[18px]",
            iconStyle === "solid" ? t.solid : t.soft,
          )}
        >
          {icon}
        </span>
      </div>
    </div>
  );
}

/** Responsive 4-up row of StatCards (Figma: 4 × 274px with 25px gaps). */
export function StatGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3 2xl:gap-4", className)}>{children}</div>;
}
