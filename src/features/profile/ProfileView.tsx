"use client";

import { BriefcaseBusiness, Calendar, Camera, IdCard, Mail, MapPin, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs } from "@/components/ui/Tabs";
import { PageHeader } from "@/components/layout/PageHeader";
import { useShell } from "@/components/layout/ShellContext";
import { formatDate } from "@/lib/format";
import { ChangePasswordCard } from "./ChangePasswordCard";
import { EmploymentInfoCard } from "./EmploymentInfoCard";
import { PersonalInfoCard } from "./PersonalInfoCard";

export type ProfileTab = "personal" | "employment" | "security";

const SECTION_ID: Record<ProfileTab, string> = {
  personal: "personal-information",
  employment: "employment-information",
  security: "change-password",
};

/** My Profile (Figma 213:3908). Tabs jump to the stacked sections below. */
export function ProfileView({ initialTab = "personal" }: { initialTab?: ProfileTab }) {
  const { user } = useShell();
  const [tab, setTab] = useState<ProfileTab>(initialTab);
  const didJump = useRef(false);

  useEffect(() => {
    if (didJump.current || initialTab === "personal") return;
    didJump.current = true;
    document.getElementById(SECTION_ID[initialTab])?.scrollIntoView({ behavior: "smooth" });
  }, [initialTab]);

  function select(next: ProfileTab) {
    setTab(next);
    document.getElementById(SECTION_ID[next])?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <PageHeader title="My Profile" subtitle="View and Manage your personal and employment information." />

      <div className="grid items-start gap-3.5 md:grid-cols-[210px_minmax(0,1fr)] lg:grid-cols-[230px_minmax(0,1fr)] 2xl:grid-cols-[250px_minmax(0,1fr)] 2xl:gap-4">
        <aside className="rounded-[10px] border border-gray/50 bg-white px-4 pt-5 pb-1">
          <div className="flex flex-col items-center text-center">
            <Avatar name={user.name} src={user.avatar} size={96} />
            <button
              type="button"
              className="mt-3 flex h-7 items-center gap-1.5 rounded-md border border-primary/60 px-3 text-[11px] text-primary hover:bg-primary-soft"
            >
              <Camera aria-hidden className="size-3.5" />
              Change Photo
            </button>
            <p className="mt-2.5 font-serif text-base text-black">{user.name}</p>
            <p className="mt-1 text-xs text-gray">{user.position}</p>
            <p className="text-xs text-primary">{user.department}</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#c9f5d6] px-2 py-0.5 text-[10px] text-black">
              <span aria-hidden className="size-1.5 rounded-full bg-st-present" />
              Online
            </span>
          </div>
          <ul className="mt-4">
            <Detail icon={<IdCard />} label="Employee ID" value={user.employeeId} />
            <Detail icon={<Calendar />} label="Date Hired" value={formatDate(user.dateHired)} />
            <Detail icon={<MapPin />} label="Work Located" value={user.workLocation} />
            <Detail icon={<UsersRound />} label="Immediate Supervisor" value={user.supervisor} />
            <Detail icon={<Mail />} label="Company Email" value={user.email} last />
          </ul>
        </aside>

        <div className="flex min-w-0 flex-col gap-3.5 2xl:gap-4">
          <Tabs<ProfileTab>
            label="Profile sections"
            variant="boxed"
            value={tab}
            onChange={select}
            items={[
              { value: "personal", label: "Personal Information", icon: <UserRound /> },
              { value: "employment", label: "Employment Information", icon: <BriefcaseBusiness /> },
              { value: "security", label: "Security", icon: <ShieldCheck /> },
            ]}
          />
          <PersonalInfoCard id={SECTION_ID.personal} employee={user} />
          <EmploymentInfoCard id={SECTION_ID.employment} employee={user} />
        </div>
      </div>

      <ChangePasswordCard id={SECTION_ID.security} />
    </>
  );
}

function Detail({ icon, label, value, last }: { icon: ReactNode; label: string; value: string; last?: boolean }) {
  return (
    <li className={last ? "flex gap-3 py-2.5" : "flex gap-3 border-b border-line py-2.5"}>
      <span aria-hidden className="mt-2.5 text-black [&_svg]:size-4">{icon}</span>
      <span className="min-w-0">
        <span className="block text-xs text-gray">{label}</span>
        <span className="block truncate text-[13px] text-black">{value}</span>
      </span>
    </li>
  );
}
