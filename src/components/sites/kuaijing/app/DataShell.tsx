"use client";

import { AppShell } from "./AppShell";
import { DATA_NEW_TAB_KEYS, SIDEBAR, dataSidebarHref, type DataPage } from "./data";

export function DataShell({
  page,
  children,
}: {
  page: DataPage;
  children: React.ReactNode;
}) {
  return (
    <AppShell
      activeTopKey="menu-home-30004"
      sidebar={SIDEBAR}
      sidebarTitle="数据中心"
      sidebarTitleIcon="org-menu-zonglan-xuanzhong"
      activeLeafKey={page.key}
      tabTitle={page.name}
      tabIcon={page.icon}
      leafHref={dataSidebarHref}
      newTabKeys={DATA_NEW_TAB_KEYS}
    >
      {children}
    </AppShell>
  );
}
