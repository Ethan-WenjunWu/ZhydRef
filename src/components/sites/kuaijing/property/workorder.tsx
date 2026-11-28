"use client";

import { useState } from "react";

import { SpriteIcon } from "../app/icons";
import {
  SkButton,
  SkDrawer,
  SkEmpty,
  SkInput,
  SkPagination,
  SkSelect,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField, OfficeSearchButtonGroup } from "../office/common";
import { SubSidebar, type SubMenuItem } from "./common";

const PARAM_ITEMS: SubMenuItem[] = [
  { name: "工单分类" },
  { name: "编号设置" },
  { name: "工单设置" },
  { name: "工时设置" },
];

const FULL_ITEMS: SubMenuItem[] = [
  { name: "数据看板", icon: "workOrder-shujukanban" },
  { name: "工单调度", icon: "workOrder-tiaoduguanli" },
  { name: "工单列表", icon: "workOrder-gongdan" },
  { name: "工单归档", icon: "workOrder-gongdan" },
  { name: "参数设置", children: PARAM_ITEMS },
  { name: "订单记录", icon: "workOrder-dingdandaifukuan" },
  { name: "付款单记录", icon: "workOrder-fukuanjilu" },
  { name: "工单费用报表", icon: "workOrder-dingdandaifukuan" },
  { name: "工单台账", icon: "org-workOrder-gongdantaizhang" },
  { name: "二维码报修", icon: "org-workOrder-erweimabaoxiu" },
];

const COMPLAINT_ITEMS: SubMenuItem[] = [
  { name: "数据看板", icon: "workOrder-shujukanban" },
  { name: "工单调度", icon: "workOrder-tiaoduguanli" },
  { name: "工单列表", icon: "workOrder-gongdan" },
  { name: "参数设置", children: PARAM_ITEMS },
  { name: "工单台账", icon: "org-workOrder-gongdantaizhang" },
];

const SERVICE_ITEMS: SubMenuItem[] = [
  { name: "数据看板", icon: "workOrder-shujukanban" },
  { name: "工单调度", icon: "workOrder-tiaoduguanli" },
  { name: "工单列表", icon: "workOrder-gongdan" },
  { name: "参数设置", children: PARAM_ITEMS },
  { name: "订单记录", icon: "workOrder-dingdandaifukuan" },
  { name: "付款单记录", icon: "workOrder-fukuanjilu" },
  { name: "工单台账", icon: "org-workOrder-gongdantaizhang" },
  { name: "工单费用报表", icon: "workOrder-dingdandaifukuan" },
];

const CONFIG = {
  repair: {
    brand: "在线报修",
    items: FULL_ITEMS,
    columns: ["工单编号", "工单类型", "支付情况", "工单分类", "报修类型", "上报时间", "上报人", "上报人手机", "对应位置", "是否超时", "状态"],
  },
  complaint: {
    brand: "投诉建议",
    items: COMPLAINT_ITEMS,
    columns: ["工单编号", "工单类型", "工单分类", "报修类型", "上报时间", "上报人", "上报人手机", "对应位置", "是否超时", "状态"],
  },
  service: {
    brand: "服务工单",
    items: SERVICE_ITEMS,
    columns: ["工单编号", "工单类型", "支付情况", "工单分类", "上报时间", "上报人", "上报人手机", "对应位置", "是否超时", "状态"],
  },
};

const EMPTY_FILTERS = {
  code: "",
  type: "",
  customer: "",
  category: "",
  source: "",
  person: "",
  phone: "",
  timeout: "",
  status: "",
  project: "",
  pay: "",
};

function StatRow({ items }: { items: Array<[string, string]> }) {
  return (
    <div className="wo-mini-stat-row">
      {items.map(([label, value]) => (
        <div key={label} className="wo-mini-stat">
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function WoLineChart({
  labels,
  legends,
}: {
  labels: string[];
  legends?: string[];
}) {
  return (
    <div className="wo-line-chart">
      <div className="wo-line-axis">
        <div className="wo-line-grid"><span>0</span></div>
      </div>
      <div className="wo-line-labels">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      {legends ? (
        <div className="wo-line-legend">
          {legends.map((legend, index) => (
            <span key={legend}><i className={index === 1 ? "is-green" : index === 2 ? "is-dark" : ""} />{legend}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function WorkOrderDashboard() {
  const [dept, setDept] = useState("");
  return (
    <div className="wo-dashboard">
      <div className="wo-dash-head">
        <h2>工单看板</h2>
        <SkSelect
          placeholder="选择部门"
          value={dept}
          options={["全部部门", "后勤部", "维修组", "保洁组", "安保组"]}
          onChange={setDept}
          className="wo-dept-select"
        />
      </div>
      <div className="wo-stat-row">
        {[
          ["工单总数", "0", "点击前往工单中心", "workOrder-gongdan"],
          ["处理中工单数", "0", "点击前往工单中心", "workOrder-tiaoduguanli"],
          ["未办结超时工单", "0", "处理中工单数 0", "org-menu-riqishiqu"],
          ["当月工单超时率", "0%", "超时工单数 0", "org-menu-baobiaotongi"],
          ["当月满意度", "0%", "月环比  0 %", "org-menu-pinzhihecha"],
        ].map(([label, value, sub, icon], index) => (
          <div key={label} className="wo-stat-card">
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
              <small className={index < 2 ? "is-link" : ""}>{sub}</small>
            </div>
            <span className="wo-stat-icon"><SpriteIcon name={icon} /></span>
          </div>
        ))}
      </div>

      <div className="wo-chart-row">
        <section className="wo-chart-card is-main">
          <h3>工单计数</h3>
          <div className="wo-chart-subhead">
            <span>近一周工单数</span>
            <span>累计处理工单数：0</span>
          </div>
          <WoLineChart labels={["11-22(周日)", "11-23(周一)", "11-24(周二)", "11-25(周三)", "11-26(周四)", "11-27(周五)", "11-28(周六)"]} />
        </section>
        <section className="wo-chart-card">
          <h3>满意度指数</h3>
          <div className="wo-radar-wrap">
            <div className="wo-radar-labels">
              <span>1星</span><span>2星</span><span>3星</span><span>4星</span><span>5星</span>
            </div>
            <svg className="wo-radar" viewBox="0 0 240 200">
              <polygon points="120,20 206,82 173,184 67,184 34,82" fill="none" stroke="#e8e8e8" />
              <polygon points="120,48 181,92 157,166 83,166 59,92" fill="none" stroke="#e8e8e8" />
              <polygon points="120,76 156,102 142,148 98,148 84,102" fill="none" stroke="#e8e8e8" />
              <line x1="120" y1="20" x2="120" y2="184" stroke="#e8e8e8" />
              <line x1="120" y1="105" x2="34" y2="82" stroke="#e8e8e8" />
              <line x1="120" y1="105" x2="206" y2="82" stroke="#e8e8e8" />
              <line x1="120" y1="105" x2="173" y2="184" stroke="#e8e8e8" />
              <line x1="120" y1="105" x2="67" y2="184" stroke="#e8e8e8" />
              <circle cx="120" cy="105" r="2" fill="#8c8c8c" />
            </svg>
          </div>
          <div className="wo-satisfaction-legend">
            <span><i className="is-blue" />客服 <strong>0</strong></span>
            <span><i className="is-green" />物业 <strong>0</strong></span>
          </div>
        </section>
      </div>

      <div className="wo-chart-row">
        <section className="wo-chart-card is-main">
          <h3>近半年工单数</h3>
          <WoLineChart labels={["2026/06", "2026/07", "2026/08", "2026/09", "2026/10", "2026/11"]} legends={["pc", "员工端", "用户端"]} />
        </section>
        <section className="wo-chart-card">
          <h3>工单类型分类占比</h3>
          <div className="wo-empty-donut"><div><span>总工单数量</span><strong>0</strong></div></div>
          <div className="wo-line-legend is-centered"><span><i />pc</span><span><i className="is-green" />员工端</span><span><i className="is-dark" />用户端</span></div>
        </section>
      </div>

      <section className="wo-chart-card wo-chart-full">
        <h3>工单大类占比</h3>
        <div className="wo-empty-donut is-large"><div><span>总工单数量</span><strong>0</strong></div></div>
      </section>
    </div>
  );
}

function DispatchFilters({
  variant,
  draft,
  setDraft,
  onSearch,
  onReset,
}: {
  variant: keyof typeof CONFIG;
  draft: typeof EMPTY_FILTERS;
  setDraft: React.Dispatch<React.SetStateAction<typeof EMPTY_FILTERS>>;
  onSearch: () => void;
  onReset: () => void;
}) {
  return (
    <div className="pp-filter-grid">
      <OfficeField label="工单编号"><SkInput placeholder="请输入工单编号" value={draft.code} onChange={(value) => setDraft((current) => ({ ...current, code: value }))} /></OfficeField>
      <OfficeField label="工单类型"><SkSelect placeholder="请选择工单类型" value={draft.type} options={["报修工单", "投诉工单", "服务工单"]} onChange={(value) => setDraft((current) => ({ ...current, type: value }))} /></OfficeField>
      <OfficeField label="业户名称"><SkInput placeholder="可直接录入名称搜索" value={draft.customer} onChange={(value) => setDraft((current) => ({ ...current, customer: value }))} /></OfficeField>
      <OfficeField label="工单分类"><SkSelect placeholder="请选择工单分类" value={draft.category} options={["水电维修", "公共设施", "环境卫生"]} onChange={(value) => setDraft((current) => ({ ...current, category: value }))} /></OfficeField>
      <OfficeField label="报修类型"><SkSelect placeholder="请选择报修类型" options={["水电维修", "设施维修", "其他"]} /></OfficeField>
      <OfficeField label="上报来源"><SkSelect placeholder="请选择上报来源" value={draft.source} options={["业户上报", "员工上报", "扫码报修"]} onChange={(value) => setDraft((current) => ({ ...current, source: value }))} /></OfficeField>
      <OfficeField label="上报人"><SkInput placeholder="请输入上报人" value={draft.person} onChange={(value) => setDraft((current) => ({ ...current, person: value }))} /></OfficeField>
      <OfficeField label="上报人手机"><SkInput placeholder="请输入上报人手机" value={draft.phone} onChange={(value) => setDraft((current) => ({ ...current, phone: value }))} /></OfficeField>
      <OfficeField label="是否超时"><SkSelect placeholder="请选择是否超时" value={draft.timeout} options={["是", "否"]} onChange={(value) => setDraft((current) => ({ ...current, timeout: value }))} /></OfficeField>
      <OfficeField label="状态"><SkSelect placeholder="请选择状态" value={draft.status} options={["待处理", "处理中", "已完成"]} onChange={(value) => setDraft((current) => ({ ...current, status: value }))} /></OfficeField>
      <OfficeField label="项目"><SkSelect placeholder="请选择项目" value={draft.project} options={["智慧园区", "宿舍楼01"]} onChange={(value) => setDraft((current) => ({ ...current, project: value }))} /></OfficeField>
      <OfficeField label="费用支付方"><SkSelect placeholder="请选择费用支付方" value={draft.pay} options={["业户", "物业", "第三方"]} onChange={(value) => setDraft((current) => ({ ...current, pay: value }))} /></OfficeField>
      <OfficeField label="上报时间"><SkInput type="date" /></OfficeField>
      <OfficeField label="部门"><SkSelect placeholder="请选择部门" options={["后勤部", "保洁组", "安保组", "维修组"]} /></OfficeField>
      {variant !== "complaint" ? <OfficeField label="是否匿名上报"><SkSelect placeholder="请选择是否匿名上报" options={["是", "否"]} /></OfficeField> : null}
      {variant === "service" ? <OfficeField label="支付情况"><SkSelect placeholder="请选择支付情况" options={["已支付", "未支付", "无需支付"]} /></OfficeField> : null}
      <div className="pp-filter-actions">
        <OfficeSearchButtonGroup onSearch={onSearch} onReset={onReset} />
      </div>
    </div>
  );
}

export function WorkOrderPage({ variant }: { variant: keyof typeof CONFIG }) {
  const config = CONFIG[variant];
  const [active, setActive] = useState("工单调度");
  const [draft, setDraft] = useState(EMPTY_FILTERS);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [createOpen, setCreateOpen] = useState(false);
  const [project, setProject] = useState("");
  const [workType, setWorkType] = useState("");
  const [urgency, setUrgency] = useState<"普通" | "紧急">("普通");
  const [desc, setDesc] = useState("");
  const [ledgerTab, setLedgerTab] = useState(0);
  const [recordTab, setRecordTab] = useState(0);
  const codeRows = [["默认工单编号规则", "上报日期+流水号", "2026112800000", "全部分类", "全部项目", ""]];
  const { show, node } = useSkMessage();

  const searchArea = () => (
    <div className="pp-search-area">
      <div className="pp-search-top">
        <span>未选择筛选字段</span>
        <span className="pp-search-top-actions">
          <span className="sk-link" onClick={() => { setDraft(EMPTY_FILTERS); setFilters(EMPTY_FILTERS); }}>清除选项</span>
          <span>收起 ⌃</span>
        </span>
      </div>
      <DispatchFilters
        variant={variant}
        draft={draft}
        setDraft={setDraft}
        onSearch={() => { setFilters(draft); show("查询成功"); }}
        onReset={() => { setDraft(EMPTY_FILTERS); setFilters(EMPTY_FILTERS); }}
      />
    </div>
  );

  const listCard = (title: string, columns: string[], withAdd = false) => (
    <div className="pp-list-card">
      <div className="pp-list-head">
        <strong>{title}</strong>
        <div className="pp-toolbar-actions">
          <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
          {withAdd ? <SkButton variant="primary" onClick={() => setCreateOpen(true)}>+ 新增</SkButton> : null}
          <SkButton>更多 ⌄</SkButton>
        </div>
      </div>
      <SkTable
        className="pp-wide-table"
        columns={columns.map((value, index) => ({ key: String(index), title: value }))}
        emptyText={Object.values(filters).some(Boolean) ? "未找到匹配的工单" : "暂无数据"}
        rows={[]}
      />
    </div>
  );

  return (
    <div className="pp-page pp-workorder-page">
      <SubSidebar
        brand={config.brand}
        icon="org-menu-repairs"
        items={config.items}
        active={active}
        iconColor="#0c0d0e"
        onChange={setActive}
      />
      <section className="pp-main">
        {active === "数据看板" ? <WorkOrderDashboard /> : null}
        {active === "工单调度" ? <>{searchArea()}{listCard("工单调度", config.columns, true)}</> : null}
        {active === "工单列表" ? (
          <>
            <div className="wo-page-pad"><StatRow items={[["工单总数", "0"], ["处理中工单数", "0"], ["普通工单数", "0"], ["付费工单数", "0"]]} /></div>
            {searchArea()}
            {listCard("工单列表", config.columns, true)}
          </>
        ) : null}
        {active === "工单归档" ? <>{searchArea()}{listCard("工单归档列表", ["工单编号", "工单类型", "业户名称", "支付情况", "工单分类", "报修类型", "上报时间", "上报人", "上报人手机", "对应位置", "是否超时", "状态"])}</> : null}
        {active === "工单分类" ? (
          <div className="pp-content-card is-plain wo-category-settings">
            <div className="wo-org-cards">
              {["大连华安物业管理有限公司", "智慧园区", "测试项目"].map((name, index) => (
                <div key={name} className={`wo-org-card${index === 0 ? " is-active" : ""}`}>{name}</div>
              ))}
            </div>
            <div className="pp-card-head"><strong>工单大类</strong><div className="pp-toolbar-actions"><SkButton>复 制</SkButton><SkButton variant="primary">工单类型</SkButton></div></div>
            <SkTable columns={[{ key: "name", title: "大类名称" }, { key: "children", title: "子类数量" }, { key: "sort", title: "排序值" }, { key: "count", title: "累计工单数量" }, { key: "op", title: "操作" }]} rows={[]} />
          </div>
        ) : null}
        {active === "编号设置" ? (
          <div className="pp-content-card is-plain">
            <div className="pp-card-head"><strong>编号规则</strong><div className="pp-toolbar-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新增成功")}>+ 新增编号规则</SkButton></div></div>
            <SkTable
              columns={[{ key: "title", title: "编号规则标题" }, { key: "rule", title: "编号规则" }, { key: "preview", title: "规则结果预览" }, { key: "category", title: "绑定分类" }, { key: "project", title: "绑定项目" }, { key: "op", title: "操作" }]}
              rows={codeRows.map((row) => [row[0], row[1], <div key="p" className="pp-rule-detail">{row[2]}</div>, row[3], row[4], <span key="op" className="sk-action-link" onClick={() => show("编辑规则")}>编辑</span>])}
            />
            <SkPagination total={1} pageSize={20} showTotal />
          </div>
        ) : null}
        {active === "工单设置" ? (
          <div className="pp-content-card is-plain">
            <div className="pp-card-head"><strong>规则列表</strong><SkButton variant="primary" onClick={() => show("新增成功")}>新增</SkButton></div>
            <SkTable columns={[{ key: "name", title: "规则名称" }, { key: "building", title: "绑定楼宇" }, { key: "op", title: "操作" }]} rows={[["通用规则", "全部楼宇", <span key="op"><span className="sk-action-link" onClick={() => show("编辑规则")}>编辑</span><span className="sk-action-link is-danger" onClick={() => show("删除成功")}>删除</span></span>]]} />
            <SkPagination total={1} pageSize={20} showTotal={false} />
          </div>
        ) : null}
        {active === "工时设置" ? (
          <div className="pp-content-card is-plain">
            <div className="pp-card-head"><strong>工时列表</strong><SkButton variant="primary" onClick={() => show("新增工时")}>新增工时</SkButton></div>
            <SkTable
              columns={[{ key: "name", title: "工时名称" }, { key: "fee", title: "工时费用" }, { key: "post", title: "对应岗位" }, { key: "dept", title: "对应部门" }, { key: "status", title: "状态" }, { key: "op", title: "操作" }]}
              rows={[["默认设置", "¥100.00", "全部岗位", "全部部门", <span key="s" className="pp-status-switch" />, <span key="op"><span className="sk-action-link" onClick={() => show("编辑")}>编辑</span><span className="sk-action-link is-danger">删除</span></span>]]}
            />
            <SkPagination total={1} pageSize={20} showTotal={false} />
          </div>
        ) : null}
        {active === "订单记录" ? (
          <>
            <div className="pp-search-area">
              <div className="pp-filter-grid is-five">
                <OfficeField label="所属项目"><SkSelect placeholder="请选择所属项目" options={["智慧园区", "宿舍楼01"]} /></OfficeField>
                <OfficeField label="所属楼宇"><SkSelect placeholder="请选择所属楼宇" options={["宿舍楼01", "宿舍楼02"]} /></OfficeField>
                <OfficeField label="业户名称"><SkInput /></OfficeField>
                <OfficeField label="工单编号"><SkInput /></OfficeField>
                <OfficeField label="工单分类"><SkSelect placeholder="请选择工单分类" options={["水电维修", "公共设施"]} /></OfficeField>
                <OfficeField label="支付时间"><SkInput type="date" /></OfficeField>
                <OfficeField label="负责部门"><SkSelect placeholder="选择部门" options={["后勤部", "维修组"]} /></OfficeField>
                <OfficeField label="生成付款单"><SkSelect placeholder="请选择" options={["是", "否"]} /></OfficeField>
                <div className="pp-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
              </div>
            </div>
            <div className="wo-page-pad"><StatRow items={[["工单费用", "¥0"], ["工单退款费用", "¥0"], ["工单订单数", "0"], ["工单退款订单数", "0"]]} /></div>
            <div className="pp-content-card is-plain">
              <div className="wo-tabs-row"><SkTabs items={["全部订单", "已退款订单"]} active={recordTab} onChange={setRecordTab} /><SkButton variant="primary" onClick={() => show("生成付款单")}>生成付款单</SkButton></div>
              <SkTable className="pp-wide-table" columns={["工单编号", "项目名称", "楼宇名称", "业户名称", "房号", "订单状态", "生成付款单", "工单分类", "支付金额", "支付时间", "退款金额", "退款时间", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} />
            </div>
          </>
        ) : null}
        {active === "付款单记录" ? (
          <>
            <div className="pp-search-area">
              <div className="pp-filter-grid is-five">
                <OfficeField label="选择部门"><SkSelect placeholder="请选择部门" options={["后勤部", "维修组"]} /></OfficeField>
                <OfficeField label="付款单状态"><SkSelect placeholder="请选择付款单状态" options={["待审批", "已付款", "待付款"]} /></OfficeField>
                <div className="pp-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
              </div>
            </div>
            <div className="wo-page-pad"><StatRow items={[["付款单数量", "0"], ["待审批付款单数", "0"], ["已付款单数", "0"], ["待付款单数", "0"], ["已付款金额", "¥0"], ["待付款金额", "¥0"]]} /></div>
            <div className="pp-content-card is-plain">
              <div className="pp-card-head"><strong>付款单记录</strong><SkButton>更多 ⌄</SkButton></div>
              <SkTable className="pp-wide-table" columns={["账单编号", "收款方", "金额", "工单数量", "生成时间", "审核时间", "付款时间", "状态", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} />
            </div>
          </>
        ) : null}
        {active === "工单费用报表" ? (
          <>
            {searchArea()}
            <div className="pp-content-card is-plain">
              <div className="pp-card-head"><span /><div className="pp-toolbar-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton>更多 ⌄</SkButton></div></div>
              <SkTable className="pp-wide-table" columns={["工单编号", "项目名称", "楼宇名称", "房号", "业户名称", "工单分类", "总金额", "服务费用", "物料费用", "工时数量", "工时费用", "附加服务费用", "实缴金额", "工单耗时", "是否超时", "状态", "上报时间", "费用支付方"].map((title, index) => ({ key: String(index), title }))} rows={[]} />
            </div>
          </>
        ) : null}
        {active === "工单台账" ? (
          <div className="pp-content-card is-plain">
            <div className="pp-filter-grid is-five">
              <OfficeField label="日期"><SkInput type="date" /></OfficeField>
              <OfficeField label="处理部门/岗位"><SkSelect placeholder="请选择人员" options={["维修组", "保洁组", "安保组"]} /></OfficeField>
              <OfficeField label="工单分类"><SkSelect placeholder="请选择" options={["水电维修", "公共设施"]} /></OfficeField>
              <OfficeField label="报修类型"><SkSelect placeholder="请选择" options={["水电维修", "设施维修"]} /></OfficeField>
              <OfficeField label="费用支付方"><SkSelect placeholder="请选择" options={["业户", "物业"]} /></OfficeField>
              <OfficeField label="所属项目"><SkSelect placeholder="请选择" options={["智慧园区", "宿舍楼01"]} /></OfficeField>
              <OfficeField label="工单类型"><SkSelect placeholder="请选择" options={["报修工单", "投诉工单"]} /></OfficeField>
              <OfficeField label="供应商"><SkSelect placeholder="请选择" /></OfficeField>
              <div className="pp-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>确 定</SkButton><SkButton>重 置</SkButton></div>
            </div>
            <div className="wo-ledger-note">当前所统计的各项指标，均以每个日期当日的实际操作为基准。例如：工单数量这一指标，统计的是对应每个日期当天新增的工单数目，并非所选时间区间内的工单累计总数。</div>
            <div className="wo-tabs-row"><SkTabs items={["列表", "图表"]} active={ledgerTab} onChange={setLedgerTab} /><SkButton onClick={() => show("导出成功")}>导 出</SkButton></div>
            {ledgerTab === 0 ? (
              <SkTable
                columns={[{ key: "date", title: "日期" }, { key: "total", title: "工单总数" }, { key: "done", title: "完结工单数" }, { key: "timeout", title: "超时工单数" }, { key: "reopen", title: "重新打开数" }, { key: "accept", title: "验收工单数" }, { key: "visit", title: "回访工单数" }, { key: "rate", title: "评价数" }]}
                rows={Array.from({ length: 20 }, (_, index) => {
                  const date = new Date(2026, 10, 30 - index);
                  return [`${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`, "0", "0", "0", "0", "0", "0", "0"];
                })}
              />
            ) : <SkEmpty text="暂无图表数据" />}
            <SkPagination total={20} pageSize={20} showTotal={false} />
          </div>
        ) : null}
        {active === "二维码报修" ? (
          <div className="pp-content-card is-plain">
            <div className="pp-filter-grid is-five">
              <OfficeField label="报修点位名称"><SkInput /></OfficeField>
              <OfficeField label="工单类别"><SkSelect placeholder="请选择" options={["水电维修", "公共设施"]} /></OfficeField>
              <OfficeField label="状态"><SkSelect placeholder="请选择状态" options={["启用", "停用"]} /></OfficeField>
              <div className="pp-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>确 定</SkButton><SkButton>重 置</SkButton></div>
            </div>
            <div className="wo-qr-note">公共区域常出现水龙头漏水、灯具故障等需维修情况。以往提交工单流程繁琐，现在只需用二维码报修功能，提前为易损公共区域创建点位、生成并张贴二维码，发现问题时手机扫码，系统自动定位报修点，无需多余操作就能快速提交申请。</div>
            <div className="pp-card-head"><strong>二维码报修点位列表</strong><div className="pp-toolbar-actions"><SkButton variant="primary" onClick={() => show("添加点位")}>添加点位</SkButton><SkButton>更多 ⌄</SkButton></div></div>
            <SkTable className="pp-wide-table" columns={["报修点位名称", "对应位置", "工单类别", "提交间隔", "备注", "状态", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} />
          </div>
        ) : null}
      </section>

      <SkDrawer
        open={createOpen}
        title="创建工单"
        width={680}
        onClose={() => setCreateOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setCreateOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!project || !workType) {
                  show("请选择项目和工单类型");
                  return;
                }
                setCreateOpen(false);
                show("工单创建成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="pp-drawer-form">
          <OfficeField label="选择项目" required><SkSelect value={project} options={["智慧园区", "宿舍楼01"]} onChange={setProject} placeholder="请选择项目" /></OfficeField>
          <OfficeField label="工单类型" required><SkSelect value={workType} options={["报修工单", "投诉工单", "服务工单"]} onChange={setWorkType} placeholder="请选择工单类型" /></OfficeField>
          <OfficeField label="紧急工单"><SkTabs items={["普通", "紧急"]} active={urgency === "普通" ? 0 : 1} onChange={(index) => setUrgency(index === 0 ? "普通" : "紧急")} /></OfficeField>
          <OfficeField label="问题描述"><textarea className="sk-textarea" value={desc} onChange={(event) => setDesc(event.target.value)} placeholder="请输入" /></OfficeField>
          <OfficeField label="附件信息"><label className="pp-upload"><span>+</span>添加附件<input type="file" hidden onChange={() => show("附件已选择")} /></label></OfficeField>
        </div>
      </SkDrawer>
      {node}
    </div>
  );
}

export function OnlineRepairPage() {
  return <WorkOrderPage variant="repair" />;
}

export function ComplaintPage() {
  return <WorkOrderPage variant="complaint" />;
}

export function ServiceOrderPage() {
  return <WorkOrderPage variant="service" />;
}
