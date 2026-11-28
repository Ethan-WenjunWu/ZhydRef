"use client";

import { AppShell } from "./AppShell";
import { ASSET_SIDEBAR, assetHref, type AssetPage } from "./data";

export function AssetShell({
  page,
  children,
}: {
  page: AssetPage;
  children: React.ReactNode;
}) {
  return (
    <AppShell
      activeTopKey="menu-workProperty-220001"
      sidebar={ASSET_SIDEBAR}
      sidebarTitle="资产管理"
      sidebarTitleIcon="org-menu-kongjian"
      activeLeafKey={page.key}
      tabTitle={page.name}
      tabIcon={page.icon}
      leafHref={assetHref}
    >
      {children}
    </AppShell>
  );
}
