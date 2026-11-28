"use client";

import { AppShell } from "./AppShell";
import { FINANCE_SIDEBAR, financeHref, type FinancePage } from "./data";

export function FinanceShell({ page, children }: { page: FinancePage; children: React.ReactNode }) {
  return (
    <AppShell
      activeTopKey="menu-bill-30007"
      sidebar={FINANCE_SIDEBAR}
      sidebarTitle="业务财务"
      sidebarTitleIcon="org-menu-shoufukuan"
      activeLeafKey={page.sidebarKey}
      activeTabKey={page.key}
      tabTitle={page.name}
      tabIcon={page.icon}
      leafHref={financeHref}
    >
      {children}
    </AppShell>
  );
}
