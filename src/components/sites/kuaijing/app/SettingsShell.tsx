"use client";

import { AppShell } from "./AppShell";
import {
  SETTINGS_SIDEBAR,
  settingsHref,
  type SettingsPage,
} from "./data";

export function SettingsShell({
  page,
  children,
}: {
  page: SettingsPage;
  children: React.ReactNode;
}) {
  return (
    <AppShell
      activeTopKey="menu-setting-30002"
      sidebar={SETTINGS_SIDEBAR}
      sidebarTitle="系统设置"
      sidebarTitleIcon="org-menu-system-setting"
      activeLeafKey={page.key}
      tabTitle={page.name}
      tabIcon={page.icon}
      leafHref={settingsHref}
    >
      {children}
    </AppShell>
  );
}
