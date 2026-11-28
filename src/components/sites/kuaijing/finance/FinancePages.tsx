"use client";

import type { ReactNode } from "react";

import {
  AccrualPage,
  BillFormPage,
  CashierPage,
  CollectionStatusPage,
  CouponsPage,
  DiscountPage,
  FeeTypesPage,
  IncomeConfirmPage,
  InvoiceApplyPage,
  InvoiceRecordsPage,
  InvoiceSettingPage,
  NoticePage,
  NoticeSettingPage,
  NumberSettingPage,
  OverduePage,
  PricingPage,
  ReceiptSettingPage,
  ReceiptsPage,
  ReceivablePage,
  RemitTypesPage,
  SimpleCollectionPage,
  StreamPage,
  VoucherPage,
} from "./pages";
import "../operation/operation.css";
import "./finance.css";

const FIN_COMPONENTS: Record<string, () => ReactNode> = {
  receivable: () => <ReceivablePage />,
  "bill-discount": () => <DiscountPage />,
  "bad-debt": () => <DiscountPage badDebt />,
  "receipt-stream": () => <StreamPage />,
  "overdue-receivable": () => <OverduePage />,
  "collection-status": CollectionStatusPage,
  accrual: AccrualPage,
  "income-confirm": IncomeConfirmPage,
  payable: () => <ReceivablePage payable />,
  "payment-stream": () => <StreamPage payment />,
  "overdue-payable": () => <OverduePage payment />,
  "invoice-records": InvoiceRecordsPage,
  "invoice-apply": InvoiceApplyPage,
  notice: NoticePage,
  receipts: ReceiptsPage,
  "remit-types": RemitTypesPage,
  "notice-setting": NoticeSettingPage,
  "invoice-setting": InvoiceSettingPage,
  "bill-number": () => <NumberSettingPage />,
  "stream-number": () => <NumberSettingPage stream />,
  "receipt-setting": ReceiptSettingPage,
  "fee-types": FeeTypesPage,
  "voucher-subjects": () => <VoucherPage variant="subjects" />,
  "voucher-assist": () => <VoucherPage variant="assist" />,
  "voucher-templates": () => <VoucherPage variant="templates" />,
  "voucher-config": () => <VoucherPage variant="config" />,
  "voucher-records": () => <VoucherPage variant="records" />,
  "simple-collection": SimpleCollectionPage,
  coupons: CouponsPage,
  pricing: PricingPage,
  cashier: CashierPage,
  "bill-new": () => <BillFormPage />,
  "payable-new": () => <BillFormPage payable />,
};

export function FinancePageRenderer({ slug }: { slug: string }) {
  const Component = FIN_COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
