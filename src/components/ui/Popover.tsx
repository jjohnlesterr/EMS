"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PopoverProps {
  /** Renders the trigger; spread `triggerProps` onto the button. */
  trigger: (state: {
    open: boolean;
    triggerProps: { onClick: () => void; "aria-expanded": boolean; "aria-haspopup": "menu" | "dialog" };
  }) => ReactNode;
  children: (close: () => void) => ReactNode;
  align?: "start" | "end";
  panelClassName?: string;
  className?: string;
  kind?: "menu" | "dialog";
}

/** Anchored panel that closes on outside click and Escape. */
export function Popover({ trigger, children, align = "start", panelClassName, className, kind = "menu" }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Keep the panel inside the viewport: if anchoring to the trigger would push it
  // past either edge (e.g. a wide panel on a narrow phone), nudge it horizontally.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;
    const place = () => {
      panel.style.translate = "";
      const gutter = 8;
      const r = panel.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const shift = r.left < gutter ? gutter - r.left : r.right > vw - gutter ? vw - gutter - r.right : 0;
      if (shift) panel.style.translate = `${Math.round(shift)}px 0`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {trigger({ open, triggerProps: { onClick: () => setOpen((v) => !v), "aria-expanded": open, "aria-haspopup": kind } })}
      {open && (
        <div
          ref={panelRef}
          role={kind}
          className={cn(
            "absolute top-full z-40 mt-1.5 rounded-[10px] border border-line bg-white shadow-pop",
            align === "end" ? "right-0" : "left-0",
            panelClassName,
          )}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}
