import type { Metadata } from "next";
import { AuthFrame } from "@/components/layout/AuthFrame";
import { ButtonLink } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";

export const metadata: Metadata = { title: "Login Successful" };

/** Auth-only demo branch: stands in for the dashboard after a successful login. */
export default function AuthSuccessPage() {
  return (
    <AuthFrame background="loginBackground" hero="loginHero" offsetY={9} heroFill="bg-[#c4d2e6]">
      <ImageSlot
        asset="authIconLogin"
        fit="contain"
        tone="none"
        className="aspect-[163/160] h-24 sm:h-32 frame:h-[min(160px,calc(var(--s)*160))]"
      />
      <h1 className="mt-1 text-center font-serif text-[22px] leading-[1.25] text-black">Login Successful</h1>
      <p className="text-center text-xs text-[#7c8195]">Authentication demo completed.</p>
      <ButtonLink href="/login" className="mt-8 h-11! w-full sm:h-10! sm:w-[202px]">
        Back to Login
      </ButtonLink>
    </AuthFrame>
  );
}
