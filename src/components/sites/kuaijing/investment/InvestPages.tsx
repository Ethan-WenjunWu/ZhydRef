"use client";

import type { ReactNode } from "react";

import { SkButton } from "../app/SettingsUI";
import { OpPage } from "../operation/common";
import { InvestAnalysisPage } from "./analysis";
import { InvestGenericPage } from "./common";
import { CluePage } from "./clue";
import { PageConfigPage } from "./page-config";
import "../operation/operation.css";
import "./investment.css";

const generic = (id: string) => {
  const Component = () => <InvestGenericPage id={id} />;
  Component.displayName = `InvestGeneric-${id}`;
  return Component;
};

function PlatformEntryPage() {
  return (
    <OpPage>
      <div className="op-card" style={{ padding: 40, textAlign: "center" }}>
        <h2>招商平台</h2>
        <p>源站会打开独立的招商门户页面。</p>
        <SkButton variant="primary" onClick={() => window.open("/platform", "_blank", "noopener")}>在新窗口打开</SkButton>
      </div>
    </OpPage>
  );
}

const INVEST_COMPONENTS: Record<string, () => ReactNode> = {
  "investment-projects": generic("investment-projects"),
  "investment-apartments": generic("investment-apartments"),
  "investment-rooms": generic("investment-rooms"),
  "investment-parking": generic("investment-parking"),
  "investment-sites": generic("investment-sites"),
  "investment-contracts": generic("investment-contracts"),
  clues: CluePage,
  customers: generic("customers"),
  "sales-plans": generic("sales-plans"),
  channels: generic("channels"),
  analysis: InvestAnalysisPage,
  brands: generic("brands"),
  "follow-ups": generic("follow-ups"),
  viewings: generic("viewings"),
  commissions: generic("commissions"),
  staff: generic("staff"),
  tags: generic("tags"),
  "page-config": PageConfigPage,
  platform: PlatformEntryPage,
};

export function InvestPageRenderer({ slug }: { slug: string }) {
  const Component = INVEST_COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
