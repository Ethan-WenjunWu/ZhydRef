"use client";

import { AppShell } from "./AppShell";
import { RESOURCE_SIDEBAR, resourceHref, type ResourcePage } from "./data";

export function ResourceShell({ page, children }: { page: ResourcePage; children: React.ReactNode }) {
  return (
    <AppShell
      activeTopKey="menu-orgLouyu-30005"
      sidebar={RESOURCE_SIDEBAR}
      sidebarTitle="资源管理"
      sidebarTitleIcon="org-menu-louyu"
      activeLeafKey={page.key}
      tabTitle={page.name}
      tabIcon={page.icon}
      leafHref={resourceHref}
    >
      {children}
    </AppShell>
  );
}
