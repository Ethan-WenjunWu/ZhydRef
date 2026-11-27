import { AppShell } from "@/components/sites/kuaijing/app/AppShell";
import { WorkbenchPage } from "@/components/sites/kuaijing/app/WorkbenchPage";

// Mirrors the post-login source route: /orgs/#/index
export default function WorkbenchRoute() {
  return (
    <AppShell>
      <WorkbenchPage />
    </AppShell>
  );
}
