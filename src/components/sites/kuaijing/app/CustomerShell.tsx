"use client";

import { AppShell } from "./AppShell";
import { CUSTOMER_SIDEBAR, customerHref, type CustomerPage } from "./data";

export function CustomerShell({ page, children }: { page: CustomerPage; children: React.ReactNode }) {
  return (
    <AppShell
      activeTopKey="menu-owner-39999"
      sidebar={CUSTOMER_SIDEBAR}
      sidebarTitle="客商管理"
      sidebarTitleIcon="org-menu-zuke"
      activeLeafKey={page.sidebarKey}
      activeTabKey={page.key}
      tabTitle={page.name}
      tabIcon={page.icon}
      leafHref={customerHref}
    >
      {children}
    </AppShell>
  );
}
