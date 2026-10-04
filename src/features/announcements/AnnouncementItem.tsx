import { timeAgo } from "@/lib/format";
import { NOW } from "@/lib/mock-data";
import type { Announcement } from "@/lib/types";
import { AnnouncementIcon } from "./AnnouncementIcon";

/** Icon + title + excerpt + "author • time" block shared by dashboard and list. */
export function AnnouncementSummary({ announcement }: { announcement: Announcement }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <AnnouncementIcon icon={announcement.icon} />
      <div className="min-w-0">
        <h3 className="font-serif text-sm text-black 2xl:text-[15px]">{announcement.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-gray">{announcement.excerpt}</p>
        <p className="mt-1 text-[11px] text-black">
          {announcement.author} • {timeAgo(announcement.postedAt, NOW)}
        </p>
      </div>
    </div>
  );
}
