"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Modal } from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  message: ReactNode;
  confirmLabel: string;
  icon: ReactNode;
  tone?: "danger" | "success";
}

/** Small centered confirmation (Log Out, Approve / Reject Request). */
export function ConfirmDialog({ open, onCancel, onConfirm, title, message, confirmLabel, icon, tone = "danger" }: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} width={420} bare>
      <div className="flex flex-col items-center px-6 pt-6 pb-6 text-center">
        <span
          aria-hidden
          className={cn(
            "mb-3 flex size-14 items-center justify-center rounded-full border [&_svg]:size-7",
            tone === "danger" ? "border-red/40 bg-[#ffecec] text-red" : "border-green/40 bg-[#e9f9ee] text-st-present",
          )}
        >
          {icon}
        </span>
        <h2 className="text-lg font-semibold text-black">{title}</h2>
        <p className="mt-2 max-w-[300px] text-sm text-gray">{message}</p>
        <div className="mt-6 grid w-full grid-cols-2 gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant={tone === "danger" ? "danger" : "primary"} className={cn(tone === "success" && "bg-st-present border-st-present hover:bg-[#0e8a5c] hover:border-[#0e8a5c]")} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
