import { Search } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Rounded search field from the toolbars. */
export function SearchInput({ className, ...props }: Omit<ComponentProps<"input">, "type">) {
  return (
    <label className={cn("relative block", className)}>
      <span className="sr-only">{props["aria-label"] ?? props.placeholder ?? "Search"}</span>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-black" />
      <input
        type="search"
        className="h-9 w-full rounded-full border border-black/80 bg-white pr-4 pl-9 font-serif text-xs text-black outline-none placeholder:text-gray focus:border-primary focus:ring-2 focus:ring-primary/15"
        {...props}
      />
    </label>
  );
}
