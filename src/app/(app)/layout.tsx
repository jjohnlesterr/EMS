import { EmsProvider } from "@/lib/store";

/** Mock data store shared by the Employee and Manager areas. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <EmsProvider>{children}</EmsProvider>;
}
