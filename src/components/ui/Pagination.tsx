import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface PaginationProps {
  page: number;
  pageCount: number;
  shown: number;
  total: number;
  /** Noun after the count: "Showing 7 of 31 attendance". */
  noun: string;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, pageCount, shown, total, noun, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex w-full max-w-[420px] flex-wrap items-center justify-between gap-x-6 gap-y-1.5 rounded-md border border-line bg-white px-3 py-1.5",
        className,
      )}
    >
      <p className="text-xs text-gray">
        Showing {shown} of {total} {noun}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex size-7 items-center justify-center text-black disabled:opacity-30"
        >
          <ChevronLeft className="size-5" />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            aria-current={p === page ? "page" : undefined}
            onClick={() => onPageChange(p)}
            className={cn(
              "flex h-[26px] min-w-[21px] items-center justify-center rounded-[3px] px-1 text-xs",
              p === page ? "bg-primary-active text-white" : "text-black hover:bg-white",
            )}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="flex size-7 items-center justify-center text-black disabled:opacity-30"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </nav>
  );
}
