"use client";

import type { ReactNode } from "react";

import { PatrolPage } from "../property/patrol";
import {
  BillManagementPage,
  CashierPage,
  DepositPage,
  DiscountPage,
  InvoicePage,
  MerchantBillPage,
  MerchantReceivablePage,
  OperationCostPage,
} from "./billing";
import {
  ActivitiesPage,
  ApartmentCheckInPage,
  ApartmentDevicePage,
  ApartmentStatusPage,
  EntranceFeePage,
  IcCardPage,
  MeetingRoomPage,
  MerchantInfoPage,
  OperationCatalogPage,
  PageDesignPage,
  TodoPage,
  VenuePage,
} from "./catalog";
import { CheckInPage, CheckOutPage, DecorationPage } from "./checkin";
import {
  TurnoverBoardPage,
  TurnoverDailyPage,
  TurnoverEntryPage,
  TurnoverSettlePage,
} from "./turnover";
import "./operation.css";

const OPERATION_COMPONENTS: Record<string, () => ReactNode> = {
  checkin: CheckInPage,
  decoration: DecorationPage,
  checkout: CheckOutPage,
  "merchant-receivable": MerchantReceivablePage,
  "operation-cost": OperationCostPage,
  deposit: DepositPage,
  "merchant-bill": MerchantBillPage,
  "bill-management": BillManagementPage,
  discount: DiscountPage,
  invoice: InvoicePage,
  cashier: CashierPage,
  "turnover-daily": TurnoverDailyPage,
  "turnover-entry": TurnoverEntryPage,
  "turnover-board": TurnoverBoardPage,
  "turnover-settle": TurnoverSettlePage,
  "patrol-merchant": () => <PatrolPage variant="merchant" />,
  "patrol-vacancy": () => <PatrolPage variant="vacancy" />,
  "merchant-info": MerchantInfoPage,
  "merchant-reward": () => <OperationCatalogPage id="merchant-reward" />,
  "merchant-violation": () => <OperationCatalogPage id="merchant-violation" />,
  store: () => <OperationCatalogPage id="store" />,
  "apartment-status": ApartmentStatusPage,
  "short-rental": () => <OperationCatalogPage id="short-rental" />,
  todo: TodoPage,
  "apartment-checkin": ApartmentCheckInPage,
  "apartment-checkout": CheckOutPage,
  "apartment-device": ApartmentDevicePage,
  "meeting-room": MeetingRoomPage,
  venue: VenuePage,
  survey: () => <OperationCatalogPage id="survey" />,
  waiting: () => <OperationCatalogPage id="waiting" />,
  "qualification-personal": () => <OperationCatalogPage id="qualification-personal" />,
  "qualification-unit": () => <OperationCatalogPage id="qualification-unit" />,
  showings: () => <OperationCatalogPage id="showings" />,
  "page-design": PageDesignPage,
  news: () => <OperationCatalogPage id="news" />,
  forum: () => <OperationCatalogPage id="forum" />,
  activities: ActivitiesPage,
  "goods-info": () => <OperationCatalogPage id="goods-info" />,
  "cargo-owner": () => <OperationCatalogPage id="cargo-owner" />,
  "business-owner": () => <OperationCatalogPage id="business-owner" />,
  "ic-card": IcCardPage,
  traceability: () => <OperationCatalogPage id="traceability" />,
  "entrance-fee": EntranceFeePage,
};

export function OperationPageRenderer({ slug }: { slug: string }) {
  const Component = OPERATION_COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
