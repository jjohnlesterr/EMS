import { ImageSlot } from "@/components/ui/ImageSlot";
import { NotificationMenu } from "./NotificationMenu";
import { UserMenu } from "./UserMenu";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

/** Banner at the top of every screen: title, subtitle, bell, user chip. */
export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    // z-20 (not `isolate`): the header must stack above later page content so its
    // notification/profile dropdowns overlay the search bar instead of sliding under it.
    // Stays below the mobile top bar (z-30), drawers and modals (z-50).
    <header className="relative z-20 overflow-visible rounded-[10px] border border-[#c9d8f0]">
      {/* Banner art (Figma image/banner2). Light tint stands in until exported. */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-[10px] bg-[linear-gradient(100deg,#eef4fc_0%,#e3edfb_55%,#d5e4f9_100%)]">
        <ImageSlot asset="headerBanner" tone="none" className="size-full" />
      </div>
      <div className="flex min-h-[68px] items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
        <div className="min-w-0 flex-1">
          <h1 className="font-serif text-xl leading-tight text-black sm:text-[22px] 2xl:text-2xl">{title}</h1>
          <p className="mt-0.5 line-clamp-2 text-xs text-gray sm:text-[13px]">{subtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <NotificationMenu />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
