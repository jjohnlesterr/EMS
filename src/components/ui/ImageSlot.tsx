import Image from "next/image";
import { ASSETS, type AssetKey, type AssetSpec } from "@/lib/assets";
import { cn } from "@/lib/cn";

interface ImageSlotProps {
  asset: AssetKey;
  className?: string;
  /** "cover" fills the box (backgrounds); "contain" keeps the whole image visible. */
  fit?: "cover" | "contain";
  /** Neutral fill used while the asset is missing. */
  tone?: "light" | "dark" | "none";
  priority?: boolean;
}

/**
 * Renders a registered Figma asset, or a neutral placeholder block of the
 * same box when the asset has not been exported yet. Size it with className.
 */
export function ImageSlot({ asset, className, fit = "cover", tone = "light", priority }: ImageSlotProps) {
  const spec: AssetSpec = ASSETS[asset];
  const src = spec.src;
  // Callers may position the slot themselves (absolute/fixed); otherwise it is the
  // positioning context for the fill image.
  const position = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className ?? "") ? "" : "relative";

  if (!src) {
    return (
      <div
        aria-hidden
        data-placeholder={asset}
        title={`Placeholder: ${asset}${spec.figmaNode ? ` (Figma ${spec.figmaNode})` : ""}`}
        className={cn(
          position, "overflow-hidden",
          tone === "light" && "bg-placeholder",
          tone === "dark" && "bg-white/10",
          className,
        )}
      />
    );
  }

  return (
    <div className={cn(position, "overflow-hidden", className)}>
      <Image
        src={src}
        alt={spec.alt}
        fill
        priority={priority}
        sizes={`${spec.width}px`}
        className={fit === "cover" ? "object-cover" : "object-contain"}
      />
    </div>
  );
}
