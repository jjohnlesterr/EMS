import type { Metadata } from "next";
import { AuthFrame } from "@/components/layout/AuthFrame";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ActivateForm } from "@/features/auth/ActivateForm";

export const metadata: Metadata = { title: "Activate Account" };

/** Figma "Activate Account" frame. */
export default function ActivatePage() {
  return (
    <AuthFrame background="activateBackground" hero="activateHero" heroFill="bg-[#183770]">
      <ImageSlot
        asset="authIconActivate"
        fit="contain"
        tone="none"
        className="aspect-[137/160] h-28 sm:h-32 frame:h-[min(160px,calc(var(--s)*160))]"
      />
      <h1 className="mt-2 text-center font-serif text-2xl leading-tight text-black sm:text-[32px] sm:leading-[1.25] frame:mt-1">
        Activate Your Account
      </h1>
      <p className="mt-1 text-center text-[13px] text-[#7c8195] sm:mt-0.5 sm:text-sm">
        Enter your details to activate your account.
      </p>
      <div className="mt-7 w-full max-w-[446px] sm:mt-8">
        <ActivateForm />
      </div>
    </AuthFrame>
  );
}
