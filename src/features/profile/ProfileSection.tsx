import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Bordered white card with a serif title used across the profile screens. */
export function ProfileSection({
  id,
  title,
  action,
  children,
  className,
}: {
  id?: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-4 rounded-[10px] border border-gray/50 bg-white px-4 py-3.5", className)}>
      <header className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-[15px] text-black 2xl:text-base">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}
