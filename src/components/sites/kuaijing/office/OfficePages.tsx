"use client";

import type { ReactNode } from "react";

import {
  ApprovalCategoryPage,
  ApprovalCenterPage,
  ApprovalDataPage,
  ApprovalNewPage,
  ApprovalProxyPage,
} from "./approval";
import { OfficeAttendancePage } from "./attendance";
import { OfficeDocumentPage } from "./document";
import { OfficeMailPage } from "./mail";
import {
  OfficeNoticePage,
  OfficeSmartTablePage,
  OfficeWikiPage,
} from "./misc";
import { OfficeOverviewPage } from "./overview";
import { OfficeRecruitPage } from "./recruit";
import {
  ReportListPage,
  ReportStatementsPage,
  ReportTemplatePage,
} from "./reports";
import "./office.css";

const OFFICE_COMPONENTS: Record<string, () => ReactNode> = {
  overview: OfficeOverviewPage,
  "approval-new": ApprovalNewPage,
  "approval-center": ApprovalCenterPage,
  "approval-category": ApprovalCategoryPage,
  "approval-data": ApprovalDataPage,
  "approval-proxy": ApprovalProxyPage,
  "report-list": ReportListPage,
  "report-template": ReportTemplatePage,
  "report-statements": ReportStatementsPage,
  notice: OfficeNoticePage,
  attendance: OfficeAttendancePage,
  wiki: OfficeWikiPage,
  "smart-table": OfficeSmartTablePage,
  document: OfficeDocumentPage,
  recruit: OfficeRecruitPage,
  mail: OfficeMailPage,
};

export function OfficePageRenderer({ slug }: { slug: string }) {
  const Component = OFFICE_COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
