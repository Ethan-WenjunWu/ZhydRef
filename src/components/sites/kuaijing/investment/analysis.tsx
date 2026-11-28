"use client";

import { useState } from "react";

import { SkEmpty, SkTabs } from "../app/SettingsUI";
import { OpPage } from "../operation/common";

export function InvestAnalysisPage() {
  const [tab, setTab] = useState(0);
  const tabs = ["招商排行榜", "意向客户渠道来源分析", "意向客户转化漏斗分析", "招商需求面积分析", "招商行业分析"];
  return (
    <OpPage>
      <div className="op-card">
        <div className="op-card-head"><strong>招商分析</strong></div>
        <SkTabs items={tabs} active={tab} onChange={setTab} />
        <div className="inv-analysis-body"><SkEmpty text="暂无数据" /></div>
      </div>
    </OpPage>
  );
}
