"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem<V extends string> {
  value: V;
  label: ReactNode;
  icon?: ReactNode;
}

interface TabsProps<V extends string> {
  items: TabItem<V>[];
  value: V;
  onChange: (value: V) => void;
  /** "underline": Employee Management tabs. "boxed": My Profile tabs. */
  variant?: "underline" | "boxed";
  className?: string;
  label: string;
}

export function Tabs<V extends string>({ items, value, onChange, variant = "underline", className, label }: TabsProps<V>) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "flex overflow-x-auto scrollbar-thin",
        variant === "underline" && "gap-6 border-b border-line",
        variant === "boxed" && "gap-2 rounded-[10px] border border-gray/60 bg-white p-1.5",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(
              "flex shrink-0 items-center gap-2 transition-colors [&_svg]:shrink-0",
              variant === "underline" &&
                cn(
                  "-mb-px border-b-2 px-1 pb-1.5 text-sm whitespace-nowrap [&_svg]:size-4",
                  active ? "border-primary text-primary" : "border-transparent text-gray hover:text-black",
                ),
              variant === "boxed" &&
                cn(
                  "flex-1 justify-center border-b-2 px-2.5 py-1.5 text-xs whitespace-nowrap [&_svg]:size-4",
                  active ? "border-primary text-primary" : "border-transparent text-gray hover:text-black",
                ),
            )}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
