"use client";

import { useState } from "react";

import { SkInput, SkSelect, SkSwitch, SkTabs } from "../app/SettingsUI";
import { OpPage } from "../operation/common";

type ChartKind = "hbar" | "vbar" | "pie" | "empty" | "gender";

type ChartCard = {
  title: string;
  kind: ChartKind;
  categories?: string[];
  legend?: Array<[string, string]>;
  paging?: boolean;
};

const BLOOD_LEGEND: Array<[string, string]> = [
  ["特殊血型", "#e64c66"],
  ["O型", "#9b59b6"],
  ["AB型", "#52c41a"],
  ["B型", "#69b1ff"],
  ["A型", "#1677ff"],
];

const CARE_LEGEND: Array<[string, string]> = [
  ["一级照护", "#fa8c16"],
  ["二级照护", "#5b6b8c"],
  ["三级照护", "#fadb14"],
  ["四级照护", "#52c41a"],
  ["五级照护", "#8c5a3c"],
];

const LIVE_LEGEND: Array<[string, string]> = [
  ["独居", "#fa8c16"],
  ["与亲戚合住", "#5b6b8c"],
  ["居无定所", "#fadb14"],
  ["与子女合住", "#52c41a"],
  ["与配偶居住", "#8c5a3c"],
];

const SERVICE_LEGEND: Array<[string, string]> = [
  ["有偿服务", "#fadb14"],
  ["政府购买", "#52c41a"],
  ["政府购买+有偿服务", "#8c5a3c"],
  ["残联购买", "#1677ff"],
];

const DISABILITY_LEGEND: Array<[string, string]> = [
  ["重度失能", "#fa541c"],
  ["中度失能", "#5b6b8c"],
  ["轻度失能", "#fadb14"],
  ["能力完好", "#52c41a"],
];

const RETIRE_LEGEND: Array<[string, string]> = [
  ["机关", "#3b82f6"],
  ["事业单位", "#3ec6c6"],
  ["国企", "#5b6b8c"],
  ["民企", "#fadb14"],
  ["其他", "#9254de"],
];

const KEY_LEGEND: Array<[string, string]> = [
  ["孕产妇", "#eb2f96"],
  ["3岁以下儿童", "#a0d911"],
  ["老年人", "#fa8c16"],
  ["残疾人", "#9254de"],
  ["慢性病人", "#8c5a3c"],
];

const CHILD_LEGEND: Array<[string, string]> = [
  ["留守", "#fa541c"],
  ["孤儿", "#5b6b8c"],
  ["困境", "#fadb14"],
  ["实事无人抚养", "#52c41a"],
];

const INSURANCE_LEGEND: Array<[string, string]> = [
  ["社保5类", "#3b5bdb"],
  ["商业保险", "#13c2c2"],
  ["未参保", "#5b6b8c"],
  ["临时救助", "#fadb14"],
  ["公费医疗参保", "#52c41a"],
];

const EDUCATION_LEGEND: Array<[string, string]> = [
  ["小学", "#4c9cf5"],
  ["初中", "#36cfc9"],
  ["高中", "#5b6b8c"],
  ["大专", "#fadb14"],
  ["本科", "#9254de"],
  ["硕士", "#69b1ff"],
  ["博士", "#8c5a3c"],
  ["文盲", "#fa8c16"],
];

const CHARTS: ChartCard[] = [
  { title: "血型", kind: "hbar", categories: ["A型", "B型", "AB型", "O型", "特殊血型"], legend: BLOOD_LEGEND },
  { title: "学历", kind: "empty", legend: EDUCATION_LEGEND },
  { title: "政治面貌", kind: "empty" },
  { title: "民族", kind: "empty" },
  { title: "照护等级", kind: "vbar", categories: ["一级照护", "二级照护", "三级照护", "四级照护", "五级照护", "六级照护", "七级照护", "八级照护", "九级照护", "正常"], legend: CARE_LEGEND, paging: true },
  { title: "婚姻状况", kind: "empty" },
  { title: "是否托管", kind: "empty" },
  { title: "居住情况", kind: "vbar", categories: ["独居", "与亲戚合住", "居无定所", "与子女合住", "与配偶居住", "其他", "租房"], legend: LIVE_LEGEND, paging: true },
  { title: "服务类型", kind: "hbar", categories: ["有偿服务", "政府购买", "政府购买+有偿服务", "残联购买"], legend: SERVICE_LEGEND },
  { title: "失能情况", kind: "hbar", categories: ["能力完好", "轻度失能", "中度失能", "重度失能"], legend: DISABILITY_LEGEND },
  { title: "残疾情况", kind: "empty" },
  { title: "离退休人员", kind: "pie", legend: RETIRE_LEGEND },
  { title: "社区重点人群", kind: "hbar", categories: ["慢性病人", "残疾人", "老年人", "3岁以下儿童", "孕产妇"], legend: KEY_LEGEND },
  { title: "是否重点儿童", kind: "hbar", categories: ["实事无人抚养", "困境", "孤儿", "留守"], legend: CHILD_LEGEND },
  { title: "是否低保户", kind: "empty" },
  { title: "参保类型", kind: "vbar", categories: ["社保5类", "商业保险", "未参保", "临时救助", "公费医疗参保"], legend: INSURANCE_LEGEND },
  { title: "性别分析", kind: "gender" },
];

const FIELD_ROWS: Array<[string, string]> = [
  ["专业", "文本"],
  ["血型", "下拉框"],
  ["学历", "下拉框"],
  ["政治面貌", "下拉框"],
  ["民族", "下拉框"],
  ["照护等级", "下拉框"],
  ["婚姻状况", "下拉框"],
  ["是否托管", "下拉框"],
  ["居住情况", "下拉框"],
  ["服务类型", "下拉框"],
  ["失能情况", "下拉框"],
  ["慢性病", "多选下拉框"],
  ["备注", "文本"],
  ["残疾情况", "下拉框"],
  ["职称", "文本"],
  ["联系人座机", "文本"],
  ["职务", "文本"],
  ["称呼", "文本"],
  ["公司传真", "文本"],
  ["QQ", "文本"],
  ["微信", "文本"],
  ["阿里旺旺", "文本"],
  ["其它联系方式", "文本"],
  ["入党时间", "日期"],
  ["家庭电话", "文本"],
  ["户籍", "文本"],
  ["国籍", "文本"],
  ["户口所在地", "文本"],
  ["紧急联系人", "文本"],
  ["工作单位", "文本"],
  ["工作年限", "数字"],
  ["单位性质", "文本"],
  ["工作单位地址", "文本"],
  ["住房性质", "下拉框"],
  ["月收入(元)", "数字"],
  ["家庭住址", "文本"],
  ["离退休人员", "下拉框"],
  ["用工性质", "下拉框"],
  ["社区重点人群", "下拉框"],
  ["是否重点儿童", "下拉框"],
  ["是否低保户", "下拉框"],
  ["参保类型", "下拉框"],
  ["信仰宗教", "下拉框"],
  ["技能证书", "自定义多字段项"],
  ["毕业院校", "文本"],
];

export function PeopleAnalysisPage() {
  const [tab, setTab] = useState(0);
  return (
    <OpPage className="cus-analysis-page">
      <div className="op-card cus-analysis-head">
        <SkTabs items={["信息汇总", "人员字段管理"]} active={tab} onChange={setTab} />
        <SkSelect defaultValue="智慧园区" options={["智慧园区"]} className="cus-analysis-select" />
      </div>

      {tab === 0 ? (
        <div className="cus-chart-grid">
          {CHARTS.map((chart) => (
            <section key={chart.title} className="cus-chart-card">
              <div className="cus-chart-head">
                <strong>{chart.title}</strong>
              </div>
              <div className="cus-chart-body">
                <ChartVisual chart={chart} />
              </div>
              {chart.legend ? <ChartLegend items={chart.legend} paging={chart.paging} /> : null}
            </section>
          ))}
        </div>
      ) : (
        <div className="op-card cus-field-manage">
          <div className="cus-table-wrap">
            <table className="sk-table cus-field-table">
              <thead>
                <tr>
                  {["原始名称", "自定义名称", "启用/禁用", "输入框类型", "是否必填", "排序号(升序)"].map((title) => (
                    <th key={title}>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FIELD_ROWS.map(([name, type]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td><SkInput defaultValue={name} className="cus-field-name" /></td>
                    <td><span className="cus-switch-cell"><SkSwitch defaultChecked /><span>启用</span></span></td>
                    <td>{type}</td>
                    <td><span className="cus-switch-cell"><SkSwitch /><span>非必填</span></span></td>
                    <td><SkInput defaultValue="0" className="cus-sort-input" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </OpPage>
  );
}

function ChartVisual({ chart }: { chart: ChartCard }) {
  if (chart.kind === "empty") {
    return <div className="cus-chart-empty" />;
  }
  if (chart.kind === "gender") {
    return (
      <div className="cus-pie-wrap">
        <div className="cus-pie" style={{ background: "conic-gradient(#52c41a 0 100%)" }} />
        <span className="cus-pie-callout is-male">男: 0%</span>
        <span className="cus-pie-callout is-female">女: 0%</span>
        <span className="cus-pie-callout is-unknown">未知: 100%</span>
      </div>
    );
  }
  if (chart.kind === "pie") {
    return <div className="cus-pie-wrap is-small"><div className="cus-pie is-tiny" style={{ background: "conic-gradient(#3b82f6 0 1%, #3ec6c6 1% 2%, #5b6b8c 2% 3%, #fadb14 3% 4%, #9254de 4% 5%, #f0f0f0 5% 100%)" }} /></div>;
  }
  const categories = chart.categories ?? [];
  if (chart.kind === "hbar") {
    return (
      <div className="cus-hbar">
        {categories.map((category) => (
          <div key={category} className="cus-hbar-row">
            <span className="cus-hbar-label">{category}</span>
            <span className="cus-hbar-value">0</span>
            <span className="cus-hbar-grid">
              {[0, 1, 2, 3].map((line) => <i key={line} />)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="cus-vbar">
      <span className="cus-vbar-zero">0</span>
      <div className="cus-vbar-plot">
        <div className="cus-vbar-axis" />
        <div className="cus-vbar-labels">
          {categories.map((category) => <span key={category}>{category}</span>)}
        </div>
      </div>
    </div>
  );
}

function ChartLegend({ items, paging }: { items: Array<[string, string]>; paging?: boolean }) {
  return (
    <div className="cus-legend">
      {items.map(([label, color]) => (
        <span key={label} className="cus-legend-item">
          <i style={{ background: color }} />
          {label}
        </span>
      ))}
      {paging ? <span className="cus-legend-pager">◀ 1/2 ▶</span> : null}
    </div>
  );
}
