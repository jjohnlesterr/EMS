import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { cn } from "@/lib/cn";
import { ASSETS, type AssetKey, type AssetSpec } from "@/lib/assets";

interface AuthFrameProps {
  /** Full Figma frame export (1512×982) that already contains the card. */
  background: AssetKey;
  /** Left panel art (606×700). */
  hero: AssetKey;
  /** Vertical offset of the baked-in card's center from the frame center, in Figma px. */
  offsetY?: number;
  /** Fill behind the hero's transparent rounded corners. */
  heroFill?: string;
  /** Right panel content (icon, title, form). */
  children: ReactNode;
}

/**
 * Figma Login / Activate Account frames: a 1212×700 card split 606/606.
 *
 * The background exports already contain the card. On landscape screens
 * (`frame:`) the card is sized with the same cover scale as the background
 * (--s, one Figma px) so it sits exactly over the baked-in copy. Elsewhere the
 * background is blurred and the card falls back to a regular max-width.
 */
export function AuthFrame({ background, hero, offsetY = 0, heroFill, children }: AuthFrameProps) {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center px-4 py-6 sm:px-8 frame:p-0 frame:[--s:max(100vw/1512,100vh/982)]">
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#1d3f78]">
        <Image
          src={(ASSETS[background] as AssetSpec).src ?? ""}
          alt=""
          fill
          preload
          sizes="100vw"
          className="scale-110 object-cover object-left blur-xl frame:scale-100 frame:object-center frame:blur-none"
        />
      </div>

      <div
        style={{ "--dy": offsetY } as CSSProperties}
        className="grid w-full max-w-[440px] overflow-hidden rounded-2xl bg-white shadow-card md:max-w-[880px] md:min-h-[540px] md:grid-cols-2 md:rounded-[20px] frame:max-w-none frame:w-[calc(var(--s)*1212+4px)] frame:min-h-[calc(var(--s)*700+4px)] frame:translate-y-[calc(var(--s)*var(--dy))] frame:rounded-[calc(var(--s)*24+2px)] frame:shadow-none"
      >
        <div className={cn("relative hidden md:block", heroFill)}>
          <ImageSlot asset={hero} className="absolute inset-0" tone="none" priority />
        </div>

        <div className="flex flex-col items-center justify-center px-5 py-8 sm:px-10">{children}</div>
      </div>
    </main>
  );
}
