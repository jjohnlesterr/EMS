"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Open dialogs, topmost last — only the top one reacts to Escape. */
const openStack: symbol[] = [];

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  /** Small icon rendered before the title (e.g. document icon on Create Task). */
  titleIcon?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  /** Max width in px — matches the Figma card widths (451, 558, 583, 733…). */
  width?: number;
  className?: string;
  /** Hide the default header (for dialogs that draw their own). */
  bare?: boolean;
}

/**
 * Centered dialog over a frosted backdrop, as drawn in Figma.
 * Handles Escape, scroll lock and initial focus.
 */
export function Modal({ open, onClose, title, titleIcon, description, children, footer, width = 560, className, bare }: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const focusable = panelRef.current?.querySelector<HTMLElement>(
      "input:not([type=hidden]):not(.sr-only), select, textarea, button:not([data-close])",
    );
    (focusable ?? panelRef.current)?.focus();

    const token = Symbol("modal");
    openStack.push(token);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openStack[openStack.length - 1] === token) onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      openStack.splice(openStack.indexOf(token), 1);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center">
      <div aria-hidden className="fixed inset-0 bg-white/60 backdrop-blur-[1px]" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        style={{ maxWidth: width }}
        className={cn(
          "relative my-auto w-full rounded-[10px] border border-gray/60 bg-white shadow-pop outline-none",
          className,
        )}
      >
        {!bare && (
          <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6">
            <div className="min-w-0">
              {title && (
                <h2 id={titleId} className="flex items-center gap-2 font-serif text-lg text-black">
                  {titleIcon}
                  {title}
                </h2>
              )}
              {description && <p className="mt-2 text-sm text-gray">{description}</p>}
            </div>
            <CloseButton onClick={onClose} />
          </div>
        )}
        <div className={cn(!bare && "px-5 pt-4 pb-5 sm:px-6 sm:pb-6")}>{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-3 px-5 pb-5 sm:px-6 sm:pb-6">{footer}</div>}
      </div>
    </div>
  );
}

export function CloseButton({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      data-close
      onClick={onClick}
      aria-label="Close"
      className={cn("flex size-8 shrink-0 items-center justify-center rounded-md border border-black text-black hover:bg-page", className)}
    >
      <X className="size-5" />
    </button>
  );
}
