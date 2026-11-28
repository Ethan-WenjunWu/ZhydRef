"use client";

import { AppShell } from "./AppShell";
import {
  OPERATION_SIDEBAR,
  operationHref,
  type OperationPage,
} from "./data";

export function OperationShell({
  page,
  children,
}: {
  page: OperationPage;
  children: React.ReactNode;
}) {
  return (
    <AppShell
      activeTopKey="menu-operationManage-30006"
      sidebar={OPERATION_SIDEBAR}
      sidebarTitle="运营管理"
      sidebarTitleIcon="org-menu-yunyingguanli"
      activeLeafKey={page.key}
      tabTitle={page.name}
      tabIcon={page.icon}
      leafHref={operationHref}
    >
      {children}
    </AppShell>
  );
}
