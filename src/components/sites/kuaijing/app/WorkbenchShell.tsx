"use client";

import { AppShell } from "./AppShell";
import {
  DATA_NEW_TAB_KEYS,
  SIDEBAR,
  dataSidebarHref,
} from "./data";

export function WorkbenchShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      activeTopKey="menu-home-30004"
      sidebar={SIDEBAR}
      sidebarTitle="数据中心"
      sidebarTitleIcon="org-menu-zonglan-xuanzhong"
      activeLeafKey="menu-workbench-999999999"
      tabTitle="工作台"
      tabIcon="org-menu-gongzuotai"
      leafHref={dataSidebarHref}
      newTabKeys={DATA_NEW_TAB_KEYS}
    >
      {children}
    </AppShell>
  );
}
