"use client";

import { useState } from "react";

import {
  SkButton,
  SkDrawer,
  SkEmpty,
  SkInput,
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
  { name: "数据看板" },
  { name: "工单调度" },
  { name: "工单列表" },
  { name: "参数设置", children: PARAM_ITEMS },
  { name: "工单台账" },
];

const SERVICE_ITEMS: SubMenuItem[] = [
  { name: "数据看板" },
  { name: "工单调度" },
  { name: "工单列表" },
  { name: "参数设置", children: PARAM_ITEMS },
  { name: "订单记录" },
  { name: "付款单记录" },
  { name: "工单台账" },
  { name: "工单费用报表" },
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

function GenericPage({ title }: { title: string }) {
  return (
    <div className="pp-content-card">
      <div className="pp-card-head">
        <strong>{title}</strong>
        <SkButton>刷新</SkButton>
      </div>
      <SkEmpty text="暂无数据" />
    </div>
  );
}

export function WorkOrderPage({ variant }: { variant: keyof typeof CONFIG }) {
  const config = CONFIG[variant];
  const [active, setActive] = useState("工单调度");
  const [draft, setDraft] = useState({ code: "", type: "", customer: "", category: "", source: "", person: "", phone: "", timeout: "", status: "", project: "", pay: "" });
  const [filters, setFilters] = useState(draft);
  const [createOpen, setCreateOpen] = useState(false);
  const [project, setProject] = useState("");
  const [workType, setWorkType] = useState("");
  const [urgency, setUrgency] = useState<"普通" | "紧急">("普通");
  const [desc, setDesc] = useState("");
  const { show, node } = useSkMessage();

  const isList = ["工单调度", "工单列表", "工单归档"].includes(active);

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
        {isList ? (
          <>
            <div className="pp-search-area">
              <div className="pp-search-top">
                <span>未选择筛选字段</span>
                <span className="pp-search-top-actions">
                  <span className="sk-link" onClick={() => { const empty = { code: "", type: "", customer: "", category: "", source: "", person: "", phone: "", timeout: "", status: "", project: "", pay: "" }; setDraft(empty); setFilters(empty); }}>清除选项</span>
                  <span>收起 ⌃</span>
                </span>
              </div>
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
                <OfficeField label="是否匿名上报"><SkSelect placeholder="请选择是否匿名上报" options={["是", "否"]} /></OfficeField>
                <div className="pp-filter-actions">
                  <OfficeSearchButtonGroup
                    onSearch={() => { setFilters(draft); show("查询成功"); }}
                    onReset={() => { const empty = { code: "", type: "", customer: "", category: "", source: "", person: "", phone: "", timeout: "", status: "", project: "", pay: "" }; setDraft(empty); setFilters(empty); }}
                  />
                </div>
              </div>
            </div>
            <div className="pp-list-card">
              <div className="pp-list-head">
                <strong>{active}</strong>
                <div className="pp-toolbar-actions">
                  <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
                  {active === "工单调度" ? <SkButton variant="primary" onClick={() => setCreateOpen(true)}>+ 新增</SkButton> : null}
                  <SkButton>更多 ⌄</SkButton>
                </div>
              </div>
              <SkTable
                className="pp-wide-table"
                columns={config.columns.map((title, index) => ({ key: String(index), title }))}
                emptyText={Object.values(filters).some(Boolean) ? "未找到匹配的工单" : "暂无数据"}
                rows={[]}
              />
            </div>
          </>
        ) : active === "数据看板" ? (
          <div className="pp-dashboard">
            <div className="pp-stat-grid is-four">
              {[["待处理工单", "0"], ["处理中工单", "0"], ["已完成工单", "0"], ["超时工单", "0"]].map(([label, value]) => (
                <div key={label} className="pp-stat-card"><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
            <div className="pp-content-card"><div className="pp-card-head"><strong>工单趋势</strong></div><SkEmpty text="暂无数据" /></div>
          </div>
        ) : active === "参数设置" || ["工单分类", "编号设置", "工单设置", "工时设置"].includes(active) ? (
          <div className="pp-content-card">
            <div className="pp-card-head"><strong>{active}</strong><SkButton variant="primary" onClick={() => show("新增成功")}>+ 新增</SkButton></div>
            <SkEmpty text="暂无数据" />
          </div>
        ) : (
          <GenericPage title={active} />
        )}
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
          <OfficeField label="选择项目" required>
            <SkSelect value={project} options={["智慧园区", "宿舍楼01"]} onChange={setProject} placeholder="请选择项目" />
          </OfficeField>
          <OfficeField label="工单类型" required>
            <SkSelect value={workType} options={["报修工单", "投诉工单", "服务工单"]} onChange={setWorkType} placeholder="请选择工单类型" />
          </OfficeField>
          <OfficeField label="紧急工单">
            <SkTabs items={["普通", "紧急"]} active={urgency === "普通" ? 0 : 1} onChange={(index) => setUrgency(index === 0 ? "普通" : "紧急")} />
          </OfficeField>
          <OfficeField label="问题描述">
            <textarea className="sk-textarea" value={desc} onChange={(event) => setDesc(event.target.value)} placeholder="请输入" />
          </OfficeField>
          <OfficeField label="附件信息">
            <label className="pp-upload"><span>+</span>添加附件<input type="file" hidden onChange={() => show("附件已选择")} /></label>
          </OfficeField>
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
