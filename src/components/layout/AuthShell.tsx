import type { ReactNode } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { AssetKey } from "@/lib/assets";

interface AuthShellProps {
  /** Left panel art: the logo photo (login/activate) or the setup illustration. */
  panel: "logo" | "setup";
  /** 3D icon above the form title. */
  icon: AssetKey;
  title: string;
  subtitle: string;
  children: ReactNode;
}

/** Two-panel auth card over the office background (Figma Login / Activate / Setup). */
export function AuthShell({ panel, icon, title, subtitle, children }: AuthShellProps) {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center px-4 py-6 sm:px-8">
      <ImageSlot asset="authBackground" className="absolute inset-0 -z-10" priority />

      <div className="grid w-full max-w-[860px] overflow-hidden rounded-2xl bg-white shadow-pop md:min-h-[460px] md:grid-cols-2 2xl:max-w-[920px] 2xl:min-h-[500px]">
        <div className="relative hidden md:block">
          <ImageSlot
            asset={panel === "logo" ? "authPanelLogin" : "authPanelSetup"}
            className="absolute inset-0 bg-[#d9e1eb]"
            tone="none"
          />
          {panel === "logo" && (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <ImageSlot asset="authLogo" fit="contain" className="aspect-[420/380] w-full max-w-[210px] rounded-lg bg-white/50" tone="none" />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-7 sm:px-10 2xl:px-12">
          <ImageSlot asset={icon} fit="contain" className="size-16 rounded-full" />
          <h1 className="mt-2.5 text-center font-serif text-xl text-black">{title}</h1>
          <p className="mt-0.5 text-center text-xs text-gray">{subtitle}</p>
          <div className="mt-5 w-full max-w-[340px]">{children}</div>
        </div>
      </div>
    </main>
  );
}
