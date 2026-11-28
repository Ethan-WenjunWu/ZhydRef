"use client";

import type { ReactNode } from "react";

import { PeopleAnalysisPage } from "./analysis";
import { IcCardsPage } from "./ic-cards";
import { PeoplePage } from "./people";
import { SuppliersPage } from "./suppliers";
import { TenantDetailPage } from "./tenant-detail";
import { TenantsPage, TenantArchivePage } from "./tenants";
import "../operation/operation.css";
import "./customer.css";

const CUSTOMER_COMPONENTS: Record<string, () => ReactNode> = {
  tenants: TenantsPage,
  "tenant-archive": TenantArchivePage,
  "tenant-detail": TenantDetailPage,
  people: PeoplePage,
  "ic-cards": IcCardsPage,
  analysis: PeopleAnalysisPage,
  suppliers: SuppliersPage,
};

export function CustomerPageRenderer({ slug }: { slug: string }) {
  const Component = CUSTOMER_COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
