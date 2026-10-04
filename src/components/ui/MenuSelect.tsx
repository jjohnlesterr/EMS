"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Popover } from "./Popover";

export interface MenuOption<V extends string = string> {
  value: V;
  label: string;
  description?: string;
  /** Leading icon or colored dot. */
  icon?: ReactNode;
}

interface MenuSelectProps<V extends string> {
  /** Text on the trigger. Sort/Filter keep a fixed label like in Figma. */
  label: string;
  icon?: ReactNode;
  value: V;
  options: MenuOption<V>[];
  onChange: (value: V) => void;
  className?: string;
  /** Show the selected option's label on the trigger instead of `label`. */
  showValue?: boolean;
  align?: "start" | "end";
}

/** The Sort By / Filter / Month dropdown buttons from Figma. */
export function MenuSelect<V extends string>({
  label,
  icon,
  value,
  options,
  onChange,
  className,
  showValue,
  align,
}: MenuSelectProps<V>) {
  const current = options.find((o) => o.value === value);
  return (
    <Popover
      align={align}
      className={className}
      panelClassName="min-w-full w-max max-w-[260px] p-1.5"
      trigger={({ open, triggerProps }) => (
        <button
          type="button"
          {...triggerProps}
          className={cn(
            "flex h-9 w-full items-center gap-2 rounded-md border border-gray bg-white px-3 text-[13px] text-black hover:bg-page",
            open && "border-primary",
          )}
        >
          {icon && <span aria-hidden className="text-black/70 [&_svg]:size-4">{icon}</span>}
          <span className="flex-1 truncate text-left">{showValue && current ? current.label : label}</span>
          <ChevronDown aria-hidden className={cn("size-4 transition-transform", open && "rotate-180")} />
        </button>
      )}
    >
      {(close) => (
        <ul className="flex flex-col gap-0.5">
          {options.map((o) => {
            const selected = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => {
                    onChange(o.value);
                    close();
                  }}
                  className={cn(
                    "flex w-full items-start gap-2.5 rounded-md px-2.5 py-1.5 text-left hover:bg-page",
                    selected && "bg-primary-soft hover:bg-primary-soft",
                  )}
                >
                  {o.icon && <span aria-hidden className="mt-0.5 shrink-0 text-gray [&_svg]:size-4">{o.icon}</span>}
                  <span className="flex flex-col">
                    <span className="text-[13px] text-black">{o.label}</span>
                    {o.description && <span className="text-[11px] text-gray">{o.description}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Popover>
  );
}

/** Colored dot used as a filter option icon. */
export function Dot({ className }: { className: string }) {
  return <span className={cn("mt-1 block size-2.5 rounded-full", className)} />;
}
