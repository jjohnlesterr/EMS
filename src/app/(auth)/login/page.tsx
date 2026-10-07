import type { Metadata } from "next";
import { AuthFrame } from "@/components/layout/AuthFrame";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { LoginForm } from "@/features/auth/LoginForm";

export const metadata: Metadata = { title: "Login" };

/** Figma "Login Account" frame. */
export default function LoginPage() {
  return (
    <AuthFrame background="loginBackground" hero="loginHero" offsetY={9} heroFill="bg-[#c4d2e6]">
      <ImageSlot
        asset="authIconLogin"
        fit="contain"
        tone="none"
        className="aspect-[163/160] h-24 sm:h-32 frame:h-[min(160px,calc(var(--s)*160))]"
      />
      <h1 className="mt-1 text-center font-serif text-[22px] leading-[1.25] text-black">Welcome Back!</h1>
      <p className="text-center text-xs text-[#7c8195]">Login to access your account</p>
      <div className="mt-7 w-full max-w-[446px] sm:mt-8">
        <LoginForm />
      </div>
    </AuthFrame>
  );
}
