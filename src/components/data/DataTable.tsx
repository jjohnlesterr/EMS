import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface Column<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  /** Extra classes for both th and td (width, alignment). */
  className?: string;
  /** Hide on small screens to keep tables readable. */
  hideBelow?: "sm" | "md" | "lg" | "xl";
  /**
   * Cells stay on one line by default (dates, times, IDs, badges) and the table
   * scrolls inside its frame when space runs out. Set for free-text columns.
   */
  wrap?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** Tailwind bg-* class for the colored left stripe; enables the stripe column. */
  stripe?: (row: T) => string;
  caption: string;
  empty?: ReactNode;
  className?: string;
  /** "compact": smaller header + rows for dashboard summaries. */
  density?: "default" | "compact";
}

const HIDE: Record<NonNullable<Column<unknown>["hideBelow"]>, string> = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
  xl: "hidden xl:table-cell",
};

/** Bordered table with serif headers, used by every list screen. */
export function DataTable<T>({ columns, rows, rowKey, stripe, caption, empty, className, density = "default" }: DataTableProps<T>) {
  const compact = density === "compact";
  return (
    <div className={cn("overflow-x-auto rounded-[4px] border border-line bg-white scrollbar-thin", className)}>
      <table className="w-full border-collapse text-center">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-table-head">
            {stripe && <th aria-hidden className="w-2.5 bg-black p-0" />}
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={cn(
                  "border border-line px-2 font-serif font-normal whitespace-nowrap text-black sm:px-3",
                  compact ? "h-8 text-xs" : "h-10 text-[13px] 2xl:text-sm",
                  c.hideBelow && HIDE[c.hideBelow],
                  c.className,
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + (stripe ? 1 : 0)} className="px-4 py-10 text-sm text-gray">
                {empty ?? "No records match your search."}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr key={rowKey(row)} className="hover:bg-page/70">
              {stripe && <td aria-hidden className={cn("w-2.5 p-0", stripe(row))} />}
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={cn(
                    "border border-line px-2 text-black sm:px-3",
                    c.wrap ? "min-w-[160px]" : "whitespace-nowrap",
                    compact ? "h-9 py-1 text-xs" : "h-11 py-1 text-[13px]",
                    c.hideBelow && HIDE[c.hideBelow],
                    c.className,
                  )}
                >
                  {c.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
