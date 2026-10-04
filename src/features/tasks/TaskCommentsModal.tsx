"use client";

import { MessageSquareText, Paperclip, SendHorizontal } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { RoleTag } from "@/components/ui/RoleTag";
import { cn } from "@/lib/cn";
import { formatShortDate, formatTime } from "@/lib/format";
import { NOW } from "@/lib/mock-data";
import { useEms } from "@/lib/store";
import type { Task } from "@/lib/types";

interface Props {
  task: Task | null;
  /** Id of the person replying (current user). */
  authorId: string;
  onClose: () => void;
}

/** Task Comments thread (Figma 255:4052 / 483:10512). */
export function TaskCommentsModal({ task, authorId, onClose }: Props) {
  const { tasks, person, addTaskComment, markTaskCommentsRead } = useEms();
  const live = task ? tasks.find((t) => t.id === task.id) ?? task : null;
  const [tab, setTab] = useState<"all" | "unread">("all");
  const [reply, setReply] = useState("");

  const close = () => {
    if (live) markTaskCommentsRead(live.id);
    setTab("all");
    setReply("");
    onClose();
  };

  if (!live) return null;
  const unread = live.comments.filter((c) => !c.read);
  const shown = tab === "all" ? live.comments : unread;

  function send(e: FormEvent) {
    e.preventDefault();
    if (!reply.trim() || !live) return;
    addTaskComment(live.id, { authorId, message: reply.trim(), createdAt: NOW, read: true });
    setReply("");
    setTab("all");
  }

  return (
    <Modal
      open
      onClose={close}
      title="Task Comments"
      titleIcon={<MessageSquareText aria-hidden className="size-5 text-st-present" />}
      description={live.title}
      width={600}
    >
      <div role="tablist" aria-label="Comment filter" className="flex gap-2 border-b border-line pb-3">
        {(["all", "unread"] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "h-8 rounded-md border px-3 text-sm",
              tab === t ? "border-primary bg-primary-soft text-primary" : "border-gray/60 text-gray",
            )}
          >
            {t === "all" ? `All (${live.comments.length})` : `Unread(${unread.length})`}
          </button>
        ))}
      </div>

      <ul className="flex max-h-[340px] flex-col gap-5 overflow-y-auto py-4">
        {shown.length === 0 && <li className="py-6 text-center text-sm text-gray">No comments yet. Start the conversation below.</li>}
        {shown.map((c) => {
          const who = person(c.authorId);
          return (
            <li key={c.id} className="flex gap-3">
              <Avatar name={who.name} src={who.avatar} size={44} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="flex flex-wrap items-center gap-2 text-sm text-black">
                    {who.name}
                    <RoleTag role={who.role} />
                  </span>
                  <span className="text-right text-[11px] leading-tight text-gray">
                    {formatShortDate(c.createdAt)}
                    <br />
                    {formatTime(c.createdAt)}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-2 rounded-lg px-3 py-2 text-[13px] text-black",
                    who.role === "manager" ? "bg-[#c8f3fb]" : "bg-[#dcf5e4]",
                  )}
                >
                  {c.message}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <form onSubmit={send} className="rounded-lg border border-gray/60 p-2.5">
        <label htmlFor="task-reply" className="sr-only">
          Add a reply
        </label>
        <textarea
          id="task-reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Add a reply..."
          rows={2}
          className="w-full resize-none text-sm outline-none placeholder:text-gray"
        />
        <div className="flex items-center justify-between">
          <button type="button" aria-label="Attach file" className="rounded p-1 text-black hover:bg-page">
            <Paperclip className="size-4" />
          </button>
          <Button type="submit" size="sm" leftIcon={<SendHorizontal className="size-4" />} disabled={!reply.trim()} className="px-4">
            Send
          </Button>
        </div>
      </form>
    </Modal>
  );
}
