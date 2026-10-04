import Image from "next/image";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/cn";

interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
  className?: string;
}

/** Circular profile photo. Falls back to a neutral placeholder until photos exist. */
export function Avatar({ src, name, size = 40, className }: AvatarProps) {
  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-placeholder", className)}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={name} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <>
          <UserRound aria-hidden className="text-placeholder-ink" style={{ width: size * 0.55, height: size * 0.55 }} strokeWidth={1.5} />
          <span className="sr-only">{name}</span>
        </>
      )}
    </span>
  );
}
