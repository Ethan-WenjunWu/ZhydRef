"use client";

import { AppShell } from "./AppShell";
import { INVEST_SIDEBAR, investHref, type InvestPage } from "./data";

export function InvestShell({ page, children }: { page: InvestPage; children: React.ReactNode }) {
  return (
    <AppShell
      activeTopKey="menu-attractInvestment-30001"
      sidebar={INVEST_SIDEBAR}
      sidebarTitle="招商管理"
      sidebarTitleIcon="org-menu-zhaoshang"
      activeLeafKey={page.key}
      tabTitle={page.name}
      tabIcon={page.icon}
      leafHref={(key) => key === "menu-inv-platform" ? "/platform" : investHref(key)}
      newTabKeys={["menu-inv-platform"]}
    >
      {children}
    </AppShell>
  );
}
