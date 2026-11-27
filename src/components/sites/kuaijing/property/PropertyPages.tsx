"use client";

import type { ReactNode } from "react";

import { AirconManagementPage, AirconTimePage } from "./aircon";
import { EnergyPage } from "./energy";
import { ExpressPage } from "./express";
import {
  ApplyRecordsPage,
  ArchiveSettingPage,
  CategorySettingPage,
  CodeSettingPage,
  InventoryPlanPage,
  InventoryTaskPage,
  MaterialDocPage,
  MyMaterialPage,
  StockPage,
  WarehouseSettingPage,
} from "./material";
import {
  PatrolCleanPage,
  PatrolEquipmentPage,
  PatrolGreenPage,
  PatrolQualityPage,
  PatrolSecurityPage,
  ServicePlanPage,
} from "./patrol";
import {
  ItemReleasePage,
  PassPage,
  VisitorAppointmentPage,
} from "./visitor";
import {
  ComplaintPage,
  OnlineRepairPage,
  ServiceOrderPage,
} from "./workorder";
import "./property.css";

const PROPERTY_COMPONENTS: Record<string, () => ReactNode> = {
  repair: OnlineRepairPage,
  complaint: ComplaintPage,
  "service-order": ServiceOrderPage,
  energy: EnergyPage,
  "patrol-equipment": PatrolEquipmentPage,
  "patrol-security": PatrolSecurityPage,
  "patrol-quality": PatrolQualityPage,
  "patrol-green": PatrolGreenPage,
  "patrol-clean": PatrolCleanPage,
  "service-plan": ServicePlanPage,
  pass: PassPage,
  visitor: VisitorAppointmentPage,
  release: ItemReleasePage,
  stock: StockPage,
  "stock-in": () => <MaterialDocPage kind="inbound" />,
  "stock-handout": () => <MaterialDocPage kind="handout" />,
  "stock-transfer": () => <MaterialDocPage kind="transfer" />,
  "stock-handle": () => <MaterialDocPage kind="handle" />,
  "stock-adjust": () => <MaterialDocPage kind="adjust" />,
  "stock-receive": () => <MaterialDocPage kind="receive" />,
  "inventory-task": InventoryTaskPage,
  "inventory-plan": InventoryPlanPage,
  "category-setting": CategorySettingPage,
  "archive-setting": ArchiveSettingPage,
  "warehouse-setting": WarehouseSettingPage,
  "code-setting": CodeSettingPage,
  "my-material": MyMaterialPage,
  "apply-records": ApplyRecordsPage,
  "aircon-management": AirconManagementPage,
  "aircon-time": AirconTimePage,
  express: ExpressPage,
};

export function PropertyPageRenderer({ slug }: { slug: string }) {
  const Component = PROPERTY_COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
