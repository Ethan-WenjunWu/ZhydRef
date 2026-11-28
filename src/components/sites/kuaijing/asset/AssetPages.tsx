"use client";

import type { ReactNode } from "react";

import { PatrolPage } from "../property/patrol";
import { AssetGeneric, ASSET_CONFIGS } from "./common";
import {
  AssetCodePage,
  AssetLabelPage,
  AssetMaintainSettingPage,
  AssetOverviewPage,
  InventoryPlanPage,
  InventoryTaskPage,
  MyApplicationsPage,
  MyApprovalsPage,
  MyAssetListPage,
  MyDashboardPage,
  PurchaseDashboardPage,
} from "./pages";
import "../operation/operation.css";
import "./asset.css";

const generic = (id: string) => {
  const Component = () => <AssetGeneric config={ASSET_CONFIGS[id]} />;
  Component.displayName = `AssetGeneric-${id}`;
  return Component;
};

const ASSET_COMPONENTS: Record<string, () => ReactNode> = {
  overview: AssetOverviewPage,
  list: generic("list"),
  dispatch: generic("dispatch"),
  storage: generic("storage"),
  handout: generic("handout"),
  "change-receiver": generic("change-receiver"),
  transfer: generic("transfer"),
  repair: generic("repair"),
  handle: generic("handle"),
  maintain: generic("maintain"),
  "employee-apply": generic("employee-apply"),
  "asset-category": generic("asset-category"),
  "asset-code": AssetCodePage,
  "asset-location": generic("asset-location"),
  "asset-label": AssetLabelPage,
  "asset-maintain-setting": AssetMaintainSettingPage,
  "my-dashboard": MyDashboardPage,
  "my-list": MyAssetListPage,
  "my-applications": MyApplicationsPage,
  "my-approvals": MyApprovalsPage,
  patrol: () => <PatrolPage variant="asset" />,
  "inventory-plan": InventoryPlanPage,
  "inventory-task": InventoryTaskPage,
  "purchase-contract": generic("purchase-contract"),
  "sale-contract": generic("sale-contract"),
  "asset-bill": generic("asset-bill"),
  "contract-stop": generic("contract-stop"),
  "contract-print": generic("contract-print"),
  "contract-retreat": generic("contract-retreat"),
  "contract-expire": generic("contract-expire"),
  "contract-clause": generic("contract-clause"),
  "contract-template": generic("contract-template"),
  "purchase-dashboard": PurchaseDashboardPage,
  "purchase-request": generic("purchase-request"),
  "purchase-order": generic("purchase-order"),
  supplier: generic("supplier"),
  tender: generic("tender"),
};

export function AssetPageRenderer({ slug }: { slug: string }) {
  const Component = ASSET_COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
