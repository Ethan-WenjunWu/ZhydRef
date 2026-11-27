"use client";

import { AppShell } from "./AppShell";
import {
  PROPERTY_SIDEBAR,
  propertyHref,
  type PropertyPage,
} from "./data";

export function PropertyShell({
  page,
  children,
}: {
  page: PropertyPage;
  children: React.ReactNode;
}) {
  return (
    <AppShell
      activeTopKey="menu-property-30009"
      sidebar={PROPERTY_SIDEBAR}
      sidebarTitle="物业管理"
      sidebarTitleIcon="org-menu-wuyeguanli"
      activeLeafKey={page.key}
      tabTitle={page.name}
      tabIcon={page.icon}
      leafHref={propertyHref}
    >
      {children}
    </AppShell>
  );
}
