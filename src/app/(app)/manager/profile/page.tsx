import type { Metadata } from "next";
import { ProfileView, type ProfileTab } from "@/features/profile/ProfileView";

export const metadata: Metadata = { title: "My Profile" };

const TABS: ProfileTab[] = ["personal", "employment", "security"];

export default async function Page({ searchParams }: PageProps<"/manager/profile">) {
  const { tab } = await searchParams;
  const initialTab = TABS.find((t) => t === tab) ?? "personal";
  return <ProfileView initialTab={initialTab} />;
}
