"use client";

import { useMemo, useState } from "react";

export interface SortDef<T> {
  value: string;
  label: string;
  description?: string;
  compare: (a: T, b: T) => number;
}

export interface FilterDef<T> {
  value: string;
  label: string;
  description?: string;
  predicate: (item: T) => boolean;
}

interface Options<T> {
  items: T[];
  /** Text that the search box matches against. */
  searchText: (item: T) => string;
  sorts: SortDef<T>[];
  filters: FilterDef<T>[];
  pageSize: number;
}

/** Search + sort + filter + pagination state shared by every list screen. */
export function useList<T>({ items, searchText, sorts, filters, pageSize }: Options<T>) {
  const [query, setQueryRaw] = useState("");
  const [sort, setSortRaw] = useState(sorts[0]?.value ?? "");
  const [filter, setFilterRaw] = useState(filters[0]?.value ?? "");
  const [page, setPage] = useState(1);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const f = filters.find((x) => x.value === filter);
    const s = sorts.find((x) => x.value === sort);
    const out = items.filter((item) => (!q || searchText(item).toLowerCase().includes(q)) && (!f || f.predicate(item)));
    return s ? [...out].sort(s.compare) : out;
  }, [items, query, filter, sort, filters, sorts, searchText]);

  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const current = Math.min(page, pageCount);
  const pageItems = visible.slice((current - 1) * pageSize, current * pageSize);

  // Any change to the criteria returns to the first page.
  const reset = <A,>(fn: (a: A) => void) => (a: A) => {
    fn(a);
    setPage(1);
  };

  return {
    query,
    setQuery: reset(setQueryRaw),
    sort,
    setSort: reset(setSortRaw),
    filter,
    setFilter: reset(setFilterRaw),
    page: current,
    setPage,
    pageCount,
    pageItems,
    visible,
    total: visible.length,
  };
}
