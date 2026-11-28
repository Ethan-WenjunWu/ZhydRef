"use client";

import { AppShell } from "./AppShell";
import { SIDEBAR, dataHref, type DataPage } from "./data";

const NEW_TAB_KEYS = [
  "menu-dataDashboardVisualization-40252",
  "menu-leaseManagement-39252",
  "menu-merchantManagement-37252",
  "menu-propertyDataDashboard-38252",
];

const DATAV_URLS: Record<string, string> = {
  "menu-dataDashboardVisualization-40252": "/datav/overview",
  "menu-leaseManagement-39252": "/datav/lease",
  "menu-merchantManagement-37252": "/datav/merchant",
  "menu-propertyDataDashboard-38252": "/datav/property",
};

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
      leafHref={(key) =>
        key === "menu-workbench-999999999"
          ? "/orgs/index"
          : DATAV_URLS[key] ?? dataHref(key)
      }
      newTabKeys={NEW_TAB_KEYS}
    >
      {children}
    </AppShell>
  );
}
