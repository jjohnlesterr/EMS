import type { Metadata } from "next";
import { AuthFrame } from "@/components/layout/AuthFrame";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SetupForm } from "@/features/auth/SetupForm";

export const metadata: Metadata = { title: "First Time Setup" };

/**
 * Figma "First Time Setup" frame. There is no separate background export for
 * it; the Activate frame has the same card position, which AuthFrame covers.
 */
export default function SetupPage() {
  return (
    <AuthFrame background="activateBackground" hero="setupHero" heroFill="bg-[#183770]">
      <ImageSlot
        asset="authIconSetup"
        fit="contain"
        tone="none"
        className="aspect-[163/135] h-24 sm:h-28 frame:h-[min(135px,calc(var(--s)*135))]"
      />
      <h1 className="mt-2 text-center font-serif text-2xl leading-tight text-black sm:text-[32px] sm:leading-[1.25] frame:mt-1">
        First Time Setup
      </h1>
      <p className="mt-1 text-center text-[13px] text-[#7c8195] sm:mt-0.5 sm:text-sm">
        Create a new username and password to secure your account
      </p>
      <div className="mt-6 w-full max-w-[446px] sm:mt-7">
        <SetupForm />
      </div>
    </AuthFrame>
  );
}
