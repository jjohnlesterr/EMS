"use client";

import { FileText } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, FileUpload, Select, Textarea, TextInput } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { NOW } from "@/lib/mock-data";
import { useEms } from "@/lib/store";

const AUDIENCES = ["All Department", "Information Technology"].map((v) => ({ value: v, label: v }));

/** Create Announcement form (Figma 492:14225). */
export function CreateAnnouncementModal({ open, author, onClose }: { open: boolean; author: string; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Announcement"
      titleIcon={<FileText aria-hidden className="size-5 text-primary" />}
      width={560}
    >
      {open && <AnnouncementForm author={author} onClose={onClose} />}
    </Modal>
  );
}

function AnnouncementForm({ author, onClose }: { author: string; onClose: () => void }) {
  const { addAnnouncement } = useEms();
  const [title, setTitle] = useState("");
  const [audience, setAudience] = useState(AUDIENCES[0].value);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<string>();
  const [errors, setErrors] = useState<{ title?: string; message?: string }>({});

  function save() {
    const next: typeof errors = {};
    if (!title.trim()) next.title = "Enter an announcement title.";
    if (!message.trim()) next.message = "Add a message before publishing.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const body = message.trim();
    addAnnouncement({
      title: title.trim(),
      body,
      excerpt: body.length > 90 ? `${body.slice(0, 90)}...` : body,
      author,
      audience: `${audience} Employee`,
      postedAt: NOW,
      status: "published",
      read: false,
      icon: "calendar",
      attachment: file ? { name: file, size: "—" } : undefined,
    });
    onClose();
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    save();
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <Field label="Announcement Title" required error={errors.title}>
        {({ id, describedBy, invalid }) => (
          <TextInput id={id} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Team Meeting Reminder" aria-describedby={describedBy} invalid={invalid} />
        )}
      </Field>
      <Field label="Audience / Send to" required>
        {({ id }) => <Select id={id} value={audience} onChange={(e) => setAudience(e.target.value)} options={AUDIENCES} />}
      </Field>
      <Field label="Message/ Description" error={errors.message}>
        {({ id, describedBy, invalid }) => (
          <Textarea id={id} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Add additional notes..." className="min-h-[120px]" aria-describedby={describedBy} invalid={invalid} />
        )}
      </Field>
      <Field label="Attachment" optional>
        {({ id }) => <FileUpload id={id} value={file} onChange={setFile} />}
      </Field>
      <div className="flex flex-wrap justify-end gap-3 pt-1">
        <Button variant="secondary" onClick={onClose} className="w-[110px]">
          Cancel
        </Button>
        <Button type="submit" className="w-[130px]">
          Save changes
        </Button>
      </div>
    </form>
  );
}
