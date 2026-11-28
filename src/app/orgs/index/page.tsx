import { WorkbenchPage } from "@/components/sites/kuaijing/app/WorkbenchPage";
import { WorkbenchShell } from "@/components/sites/kuaijing/app/WorkbenchShell";

// Mirrors the post-login source route: /orgs/#/index
export default function WorkbenchRoute() {
  return (
    <WorkbenchShell>
      <WorkbenchPage />
    </WorkbenchShell>
  );
}
