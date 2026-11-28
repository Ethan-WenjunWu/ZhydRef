"use client";

import type { ReactNode } from "react";

import { SkButton } from "../app/SettingsUI";
import { DataPage } from "./common";
import { FloorPlanPage } from "./floorplan";
import {
  AnalysisPage,
  DataOverviewPage,
  PropertyAnalysisPage,
} from "./overview";
import {
  FinancialReportPage,
  IncomeReportPage,
  PropertyReportPage,
  RetreatReportPage,
} from "./reports";
import "../operation/operation.css";
import "./data.css";

const DATAV_LABELS: Record<string, [string, string]> = {
  "datav-overview": ["综合数据大屏", "/datav/overview"],
  "datav-lease": ["租赁数据大屏", "/datav/lease"],
  "datav-merchant": ["招商数据大屏", "/datav/merchant"],
  "datav-property": ["物业数据大屏", "/datav/property"],
};

const DATA_COMPONENTS: Record<string, () => ReactNode> = {
  overview: DataOverviewPage,
  project: () => <AnalysisPage id="project" />,
  asset: () => <AnalysisPage id="asset" />,
  resource: () => <AnalysisPage id="resource" />,
  "lease-analysis": () => <AnalysisPage id="lease-analysis" />,
  "tenant-analysis": () => <AnalysisPage id="tenant-analysis" />,
  "property-analysis": PropertyAnalysisPage,
  "lease-drawing": () => <FloorPlanPage kind="lease-drawing" />,
  "property-drawing": () => <FloorPlanPage kind="property-drawing" />,
  "apartment-drawing": () => <FloorPlanPage kind="apartment-drawing" />,
  "parking-drawing": () => <FloorPlanPage kind="parking-drawing" />,
  "financial-report": FinancialReportPage,
  "income-report": IncomeReportPage,
  "retreat-report": RetreatReportPage,
  "property-report": PropertyReportPage,
};

export function DataPageRenderer({ slug }: { slug: string }) {
  const datav = DATAV_LABELS[slug];
  if (datav) {
    return (
      <DataPage>
        <div className="dt-card" style={{ padding: 40, textAlign: "center" }}>
          <h2>{datav[0]}</h2>
          <p>该页面在源站中会打开一个新的浏览器窗口。</p>
          <SkButton variant="primary" onClick={() => window.open(datav[1], "_blank", "noopener")}>
            在新窗口打开
          </SkButton>
        </div>
      </DataPage>
    );
  }
  const Component = DATA_COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
