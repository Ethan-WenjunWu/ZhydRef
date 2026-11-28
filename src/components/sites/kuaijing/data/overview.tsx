"use client";

import { useState } from "react";

import { EXPIRY_MESSAGE } from "../app/data";
import { SkButton, SkTabs, useSkMessage } from "../app/SettingsUI";
import { WorkOrderDashboard } from "../property/workorder";
import { DataPage, DtEmptyChart, DtPanel, DtStats } from "./common";

const TOP_STATS: Array<[string, string, string]> = [
  ["目前已到期应收", "¥0", "详情 >"],
  ["目前已到期应支", "¥0", "详情 >"],
  ["未来30天应收", "¥0", "详情 >"],
  ["未来30天应支", "¥0", "详情 >"],
  ["已逾期业户欠款", "¥0", "详情 >"],
  ["目前业户已到期（个）", "0", "详情 >"],
  ["今日其他应收", "¥0", "详情 >"],
  ["今日其他应支", "¥0", "详情 >"],
];

export function DataOverviewPage() {
  const { show, node } = useSkMessage();
  return (
    <DataPage>
      <div className="dt-alert">
        <span className="dt-alert-tag">到期提醒</span>
        <span>{EXPIRY_MESSAGE}</span>
        <SkButton className="dt-alert-action" onClick={() => show("切换视图")}>切换视图</SkButton>
      </div>

      <DtStats items={TOP_STATS} columns={8} className="is-top" />

      <div className="dt-overview-grid">
        <DtPanel title="🏠 空置预警" className="is-chart">
          <div className="dt-bars">
            {[["0-30天", 345], ["31-60天", 0], ["61-90天", 0], ["91-150天", 0], ["151-210天", 0], ["210天以上", 0]].map(([label, value]) => (
              <div key={String(label)} className="dt-bar-item"><span style={{ height: Number(value) ? "86%" : "4%" }} /><small>{label}</small></div>
            ))}
          </div>
          <div className="dt-legend"><span><i />空置房间</span></div>
        </DtPanel>

        <DtPanel title="🏢 房源概况">
          <div className="dt-donut-wrap"><div className="dt-donut"><div><span>总房间数</span><strong>346</strong><small>100%</small></div></div></div>
          <div className="dt-donut-legend">
            {[["空置", "346"], ["已锁定", "0"], ["已入住", "0"], ["已到期", "0"], ["已逾期", "0"]].map(([label, value]) => <span key={label}><i />{label} <strong>{value}</strong></span>)}
          </div>
        </DtPanel>

        <DtPanel title="📈 比率/均价">
          <div className="dt-price">¥0<small>/㎡·天</small></div>
          <span className="dt-price-tag">在租实时均价</span>
          {[["出租率", "0%", "0%"], ["空置率", "100%", "100%"], ["计租率", "0%", "0%"]].map(([label, value, width]) => (
            <div key={label} className="dt-rate-row"><span>{label} ⓘ</span><div className="dt-rate-bar"><i style={{ width }} /></div><strong>{value}</strong></div>
          ))}
        </DtPanel>

        <div className="dt-side-stack">
          <DtPanel title="📋 合同执行">
            <div className="dt-counts">{[["0", "待处理"], ["0", "执行中"], ["1", "已退租"], ["0", "已到期"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
          </DtPanel>
          <DtPanel title="☁ 智能设备" actions={<span className="sk-link">更多 &gt;</span>}>
            <div className="dt-device"><span>0%</span><div className="dt-rate-bar"><i style={{ width: "0%" }} /></div><div className="dt-device-counts"><span><strong>0</strong>数量</span><span><strong>0</strong>在线</span><span><strong>0</strong>离线</span></div></div>
          </DtPanel>
        </div>
      </div>

      <div className="dt-bottom-grid">
        <DtPanel title="近6个月出租率走势" className="is-small">
          <DtEmptyChart height={180} />
          <div className="dt-legend"><span><i />续租房</span><span><i className="is-green" />新租房</span></div>
        </DtPanel>
        <DtPanel title="📋 进行中的审批" actions={<span className="sk-link">更多 &gt;</span>}><DtEmptyChart height={170} /></DtPanel>
        <DtPanel title="📢 待发通知单业户" actions={<span className="sk-link">更多 &gt;</span>}><DtEmptyChart height={170} /></DtPanel>
        <DtPanel title="🧭 招商提醒" actions={<span className="sk-link">更多 &gt;</span>}><DtEmptyChart height={170} /></DtPanel>
      </div>
      {node}
    </DataPage>
  );
}

const ANALYSIS: Record<string, {
  stats: Array<[string, string, string?]>;
  panels: string[];
  table?: { title: string; columns: string[] };
}> = {
  project: {
    stats: [["管理面积", "21,245 ㎡", "总房源数量:346间"], ["全年退租合同", "1 份", "全年退租合同面积: 20 ㎡"], ["保证金余额", "¥0", "待退款: ¥0"], ["合同到期提醒", "0 ㎡", "到期提醒合同: 0份"]],
    panels: ["租金收益", "月租金收益走势", "出租率", "在租实时均价", "可招商面积", "计租率", "月出租率走势", "现金流", "计租均价", "租金平效", "分摊收缴率", "成交走势", "付款逾期排名", "合同到期分布", "收益统计", "空置资源空置天数排名", "租金流失排名", "全部资源户型分布", "退租面积行业占比", "行业分析", "退租原因分析", "空置天数占比", "标签分析"],
  },
  asset: {
    stats: [["全年实际现金流", "¥616.67", "收入: ¥616.67 支出: ¥0"], ["全年现金流预测", "¥316.67", "(收入)"], ["收缴率", "100 %", "逾期未结清业户数: 0"], ["已收纳保证金", "¥0", "保证金退还率: 0.00%"]],
    panels: ["现金流", "现金流预测", "收缴率", "分摊收缴率", "收益统计", "收入分布", "收入贡献排名", "未来6个月押金到期返回情况"],
  },
  resource: {
    stats: [],
    panels: ["房源标签分析", "房源户型分布", "空置天数占比", "房源累计空置天数排名", "流转效率排名", "空置房源空置天数排名", "效益流失率", "租金流失排名", "房源面积-空置天数分析", "房源装修分布分析"],
  },
  "lease-analysis": {
    stats: [["当前在租合同", "0份", "金额：¥0 面积：0㎡"], ["全年新签/续签合同", "0/0份", "金额：¥0/¥0"], ["到期提醒合同面积", "0㎡", "到期提醒合同: 0份"], ["全年退租合同", "0份", "面积: 0㎡"]],
    panels: ["月出租率走势", "合同签约成交走势", "租金实时单价分布", "合同跟进分布", "合同到期分布", "租期结构分析", "合同面积分布", "退租业户行业占比", "退租原因分析", "退租走势", "提前退租率", "合同到期续租走势", "续租率", "增长率"],
  },
  "tenant-analysis": {
    stats: [],
    panels: ["业户增长趋势图", "业户人员增长趋势图", "标签分析", "行业分析", "签约企业注册资金分布", "签约企业注册年限分布", "付款逾期排名", "在租面积排名", "合同签约成交走势", "成交选址目的分布占比分析", "行业面积占比分析"],
  },
};

export function AnalysisPage({ id }: { id: string }) {
  const config = ANALYSIS[id];
  return (
    <DataPage>
      {config.stats.length ? <DtStats items={config.stats} columns={4} /> : null}
      <div className="dt-analysis-grid">
        {config.panels.map((title) => (
          <DtPanel key={title} title={title}>{title.includes("走势") || title.includes("分布") || title.includes("排名") || title.includes("分析") ? <DtEmptyChart height={180} /> : <div className="dt-metric-placeholder">¥0</div>}</DtPanel>
        ))}
      </div>
    </DataPage>
  );
}

export function PropertyAnalysisPage() {
  const [tab, setTab] = useState(0);
  return (
    <DataPage className="dt-property-analysis">
      <div className="dt-analysis-tabs">
        <SkTabs items={["工单看板", "巡检看板", "能源看板", "在线报修"]} active={tab} onChange={setTab} />
      </div>
      {tab === 0 ? <WorkOrderDashboard /> : (
        <div className="dt-card">
          <DtEmptyChart height={420} />
        </div>
      )}
    </DataPage>
  );
}
