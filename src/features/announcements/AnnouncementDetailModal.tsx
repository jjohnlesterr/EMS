"use client";

import { ArrowLeft } from "lucide-react";
import { AttachmentChip } from "@/components/data/cells";
import { CloseButton, Modal } from "@/components/ui/Modal";
import { timeAgo } from "@/lib/format";
import { NOW } from "@/lib/mock-data";
import type { Announcement } from "@/lib/types";
import { AnnouncementIcon } from "./AnnouncementIcon";

/** Announcement Card (Figma 244:2894): full message with "Back to Announcements". */
export function AnnouncementDetailModal({ announcement, isNew, onClose }: { announcement: Announcement | null; isNew?: boolean; onClose: () => void }) {
  return (
    <Modal open={announcement !== null} onClose={onClose} width={583} bare>
      {announcement && (
        <article className="flex min-h-[420px] flex-col p-5" aria-labelledby="announcement-title">
          <header className="flex items-start gap-4 border-b border-line pb-5">
            <AnnouncementIcon icon={announcement.icon} size="lg" className="mt-1" />
            <div className="min-w-0 flex-1 pt-3">
              <h2 id="announcement-title" className="font-serif text-xl text-black">
                {announcement.title}
              </h2>
              <p className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray xl:text-base">
                {isNew && <span className="rounded-md bg-primary-soft px-2.5 py-1 text-sm text-primary">New</span>}
                {announcement.author} • {timeAgo(announcement.postedAt, NOW)}
              </p>
            </div>
            <CloseButton onClick={onClose} />
          </header>
          <div className="flex-1 py-4 text-sm leading-relaxed whitespace-pre-line text-black">{announcement.body}</div>
          {announcement.attachment && <AttachmentChip {...announcement.attachment} />}
          <button
            type="button"
            onClick={onClose}
            className="mt-5 flex h-11 w-full max-w-[260px] items-center gap-3 rounded-[10px] border border-gray/60 px-4 text-sm text-black hover:bg-page"
          >
            <ArrowLeft aria-hidden className="size-5" />
            Back to Announcements
          </button>
        </article>
      )}
    </Modal>
  );
}
