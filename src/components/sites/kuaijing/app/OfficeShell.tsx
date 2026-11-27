"use client";

import { AppShell } from "./AppShell";
import {
  OFFICE_SIDEBAR,
  officeHref,
  type OfficePage,
} from "./data";

export function OfficeShell({
  page,
  children,
}: {
  page: OfficePage;
  children: React.ReactNode;
}) {
  return (
    <AppShell
      activeTopKey="menu-office-30010"
      sidebar={OFFICE_SIDEBAR}
      sidebarTitle="行政办公"
      sidebarTitleIcon="org-menu-xingzhengbangong"
      activeLeafKey={page.key}
      tabTitle={page.name}
      tabIcon={page.icon}
      leafHref={officeHref}
    >
      {children}
    </AppShell>
  );
}
