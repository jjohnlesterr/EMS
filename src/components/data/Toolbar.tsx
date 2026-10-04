"use client";

import { ArrowDownUp, Funnel } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { MenuSelect, type MenuOption } from "@/components/ui/MenuSelect";
import { SearchInput } from "@/components/ui/SearchInput";

interface ToolbarProps {
  search?: { value: string; onChange: (v: string) => void; placeholder: string };
  sort?: { value: string; onChange: (v: string) => void; options: MenuOption[] };
  filter?: { value: string; onChange: (v: string) => void; options: MenuOption[] };
  /** Extra controls placed before the search box (e.g. Month dropdown). */
  leading?: ReactNode;
  /** Right-aligned actions (Create Task, Export…). */
  actions?: ReactNode;
  /** White rounded container used on the Tasks / Leave screens. */
  boxed?: boolean;
  className?: string;
}

/** Search + Sort By + Filter row that sits above every list. */
export function Toolbar({ search, sort, filter, leading, actions, boxed, className }: ToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2.5",
        boxed && "rounded-[10px] bg-white p-2",
        className,
      )}
    >
      {leading}
      {search && (
        <SearchInput
          value={search.value}
          onChange={(e) => search.onChange(e.target.value)}
          placeholder={search.placeholder}
          className="w-full sm:w-[240px] 2xl:w-[280px]"
        />
      )}
      {sort && (
        <MenuSelect
          label="Sort By"
          icon={<ArrowDownUp />}
          value={sort.value}
          options={sort.options}
          onChange={sort.onChange}
          className="w-[calc(50%-5px)] sm:w-[140px]"
        />
      )}
      {filter && (
        <MenuSelect
          label="Filter"
          icon={<Funnel />}
          value={filter.value}
          options={filter.options}
          onChange={filter.onChange}
          className="w-[calc(50%-5px)] sm:w-[140px]"
        />
      )}
      {actions && <div className="flex w-full flex-wrap items-center gap-3 sm:ml-auto sm:w-auto">{actions}</div>}
    </div>
  );
}
