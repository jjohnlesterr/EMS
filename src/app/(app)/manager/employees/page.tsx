import type { Metadata } from "next";
import { EmployeeManagement } from "@/features/employees/EmployeeManagement";

export const metadata: Metadata = { title: "Employee Management" };

export default async function Page({ searchParams }: PageProps<"/manager/employees">) {
  const { tab } = await searchParams;
  return <EmployeeManagement initialTab={tab === "attendance" ? "attendance" : "employees"} />;
}
