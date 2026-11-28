"use client";

import { useState } from "react";

import { SpriteIcon } from "../app/icons";
import { SkButton, SkCheckbox, SkEmpty, SkInput, SkSelect, SkTable, SkTabs, useSkMessage } from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { OpPage, OpStats } from "../operation/common";

const PENDING = ["派发待审批", "退库待审批", "借出待审批", "归还待审批", "维修待审批", "处置待审批", "报失待审批", "调拨待审批", "变更领用人", "领用待审批", "借用待审批", "交接待审批", "报修待审批", "资产退还待审批"];

export function AssetOverviewPage() {
  const [tab, setTab] = useState(2);
  const [mode, setMode] = useState(0);
  const pendingIcons = ["zichanpaifa", "zichanruku", "zichanjiechu", "zichanjiechu", "zichanweixiu", "zichanchuzhi", "zichanchuzhi", "zichantiaobo", "biangenglingyongren", "zichanpaifa", "zichanjiechu", "zichanjiechu", "zichanweixiu", "zichanjiechu"];
  const pendingColors = ["#3ec6c6", "#4a9cf5", "#53c4f4", "#2f80ed", "#52c41a", "#27ae60", "#eb5757", "#409eff", "#f2994a", "#2d9cdb", "#56ccf2", "#2f80ed", "#52c41a", "#56ccf2"];
  const { node } = useSkMessage();
  return (
    <OpPage>
      <div className="op-card asset-pending-panel">
        <div className="asset-pending-head"><span>待审批单据 <strong>0</strong></span><span className="asset-pending-gear">⚙</span></div>
        <div className="asset-pending-row">
          {PENDING.map((item, index) => (
            <div key={item} className="asset-pending-card">
              <span className="asset-pending-icon" style={{ background: pendingColors[index] }}>
                <SpriteIcon name={`org-menu-${pendingIcons[index]}`} />
              </span>
              <strong>0</strong>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="asset-overview-panels">
        <div className="op-card asset-overview-left">
          <div className="op-card-head"><strong>资产概况</strong><span className="asset-total">总数量: 0</span></div>
          <div className="asset-overview-toggle"><SkButton variant={mode === 0 ? "primary" : "default"} onClick={() => setMode(0)}>数量</SkButton><SkButton variant={mode === 1 ? "primary" : "default"} onClick={() => setMode(1)}>金额</SkButton></div>
          <div className="asset-overview-donut"><div className="asset-donut-ring"><span>总计</span><strong>0</strong></div><div className="asset-donut-legend">{[["空闲", "0%", "#409eff"], ["在用", "0%", "#52c41a"], ["借用", "0%", "#5b6b8c"], ["审批中", "0%", "#faad14"]].map(([label, value, color]) => <span key={label}><i style={{ background: color }} />{label} <em>{value}</em></span>)}</div></div>
        </div>
        <div className="op-card asset-overview-right">
          <div className="asset-overview-tabs">
            <SkTabs items={["资产分类统计", "资产位置统计", "使用部门统计"]} active={tab} onChange={setTab} />
            <div className="asset-overview-toggle"><SkButton variant={mode === 0 ? "primary" : "default"} onClick={() => setMode(0)}>数量</SkButton><SkButton variant={mode === 1 ? "primary" : "default"} onClick={() => setMode(1)}>金额</SkButton></div>
          </div>
          <div className="asset-chart-placeholder"><SkEmpty text="暂无数据" /></div>
        </div>
      </div>
      {node}
    </OpPage>
  );
}

export function AssetCodePage() {
  const { show, node } = useSkMessage();
  return (
    <OpPage><div className="op-card"><div className="op-card-head"><strong>编号规则列表</strong><div className="op-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新增规则")}>+ 新增规则</SkButton></div></div><SkTable columns={["编号规则标题", "编号规则", "规则结果预览", "绑定公司", "绑定分类", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[["默认编码规则", "上报日期+流水号", "2026112800000", "全部公司", "全部分类", <span key="op" className="sk-action-link">编辑</span>]]} /><div className="asset-pagination">共1条　1　20 条/页</div></div>{node}</OpPage>
  );
}

export function AssetLabelPage() {
  const [template, setTemplate] = useState(0);
  const fields = ["资产名称", "资产分类", "资产编码", "品牌", "型号", "设备序列号", "管理员", "保养到期时间", "保养说明", "使用部门", "资产位置"];
  const [checked, setChecked] = useState<string[]>(["资产名称", "资产分类", "资产编码"]);
  const { show, node } = useSkMessage();
  return (
    <OpPage><div className="op-card asset-label-page">
      <div className="asset-label-head"><strong>选择模板</strong></div>
      <div className="asset-template-row">{["模板1", "模板2", "模板3", "模板4", "模板5"].map((item, index) => <button key={item} type="button" className={index === template ? "is-active" : ""} onClick={() => setTemplate(index)}>{item}</button>)}</div>
      <div className="asset-label-grid">
        <div className="asset-label-preview"><span>字段名称1:XXXXXXXXXX</span><small>预览效果：{`模板${template + 1}`}</small></div>
        <div className="asset-label-fields"><strong>编辑标签</strong>{fields.map((field) => <SkCheckbox key={field} label={field} checked={checked.includes(field)} onChange={(value) => setChecked((current) => value ? [...current, field] : current.filter((item) => item !== field))} />)}</div>
      </div>
      <div className="asset-label-print">
        <strong>打印设置</strong>
        <OfficeField label="纸张类型"><SkSelect defaultValue="标签专用纸" options={["标签专用纸", "A4（2列标签）", "A4（3列标签）"]} /></OfficeField>
        <div className="asset-label-size"><OfficeField label="标签宽度(mm)"><SkInput /></OfficeField><OfficeField label="标签高度(mm)"><SkInput /></OfficeField></div>
        <SkButton variant="primary" onClick={() => show("保存成功")}>保 存</SkButton>
      </div>
    </div>{node}</OpPage>
  );
}

export function AssetMaintainSettingPage() {
  const { show, node } = useSkMessage();
  return <OpPage><div className="op-card"><div className="op-card-head"><strong>资产保养设置</strong><SkButton variant="primary" onClick={() => show("新增保养项目")}>新增保养项目</SkButton></div><SkTable columns={["保养项目名称", "创建人", "创建时间", "状态", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>{node}</OpPage>;
}

export function InventoryPlanPage() {
  const { show, node } = useSkMessage();
  return (
    <OpPage><div className="op-card is-plain"><div className="op-filter-grid is-five"><OfficeField label="资产类别"><SkSelect placeholder="请选择" /></OfficeField><OfficeField label="资产集合"><SkSelect placeholder="请选择" /></OfficeField><OfficeField label="盘点计划名称"><SkInput /></OfficeField><OfficeField label="盘点计划状态"><SkSelect placeholder="请选择" /></OfficeField><OfficeField label="盘点计划区间"><SkInput type="date" /></OfficeField><div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>查询</SkButton><SkButton>重置</SkButton><SkButton onClick={() => show("新增盘点")}>新增盘点</SkButton></div></div></div><div className="op-card"><div className="op-card-head"><strong>盘点计划列表</strong></div><SkTable className="op-wide-table" columns={["盘点计划名称", "盘点计划状态", "盘点计划进展", "员工盘点进展", "盘点员", "盘点范围（使用部门）", "盘点范围（资产分类）", "盘点范围（资产位置）", "创建人", "创建时间", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>{node}</OpPage>
  );
}

export function InventoryTaskPage() {
  return (
    <OpPage><OpStats items={[["盘点计划数", "0"], ["盘点任务数", "0"], ["未盘点数", "0"], ["已盘点数", "0"], ["异常数", "0"], ["盘盈数", "0"], ["盘亏数", "0"]]} columns={7} /><div className="op-card"><div className="asset-task-filter"><SkSelect defaultValue="全部盘点计划" options={["全部盘点计划"]} /><span>／0</span></div><div className="op-status-tabs">{["全部", "未盘(0)", "已盘(0)", "异常(0)", "盘盈(0)", "盘亏(0)"].map((item, index) => <button key={item} type="button" className={index === 0 ? "is-active" : ""}>{item}</button>)}</div><SkEmpty text="暂无数据" /></div></OpPage>
  );
}

export function PurchaseDashboardPage() {
  const { show, node } = useSkMessage();
  return (
    <OpPage>
      <div className="op-card is-plain"><div className="asset-section-title">数据汇总</div><div className="op-stat-grid" style={{ "--cols": 8 } as React.CSSProperties}>{[["采购申请单总数", "0"], ["通过的采购申请单", "0"], ["否决的采购申请单", "0"], ["供应商数", "0"], ["采购订单总数", "0"], ["通过的采购订单", "0"], ["否决的采购订单", "0"], ["招标数量", "0"]].map(([label, value]) => <div key={label} className="op-stat"><span>{label}</span><strong>{value}</strong><button type="button" className="sk-action-link" onClick={() => show("点击查看")}>点击查看</button></div>)}</div></div>
      <div className="op-card"><div className="asset-section-title">待办审批汇总</div>{[["采购单申请待审批", "0"], ["采购单生成待审批", "0"], ["采购询价单待发送", "0"], ["采购订单待下单", "0"]].map(([label, value]) => <div key={label} className="asset-todo-row"><span>{label}{value}</span><span className="sk-link" onClick={() => show("去查看")}>去查看</span></div>)}</div>
      <div className="op-card"><div className="asset-section-title">采购单金额占比</div><SkEmpty text="暂无数据" /></div>
      <div className="op-card"><div className="asset-section-title">采购供应商排行榜</div><SkEmpty text="暂无数据" /></div>
      {node}
    </OpPage>
  );
}

export function MyDashboardPage() {
  const { node } = useSkMessage();
  return (
    <OpPage><div className="asset-my-head"><div className="asset-avatar">王</div><span>我的资产0</span><span>我发起的0</span></div><div className="asset-action-grid">{["库存资产领用", "库存资产借用", "资产退还", "资产报失", "交接他人", "资产报修"].map((item) => <button key={item} type="button" className="asset-action-tile">{item}</button>)}</div><div className="op-card"><div className="op-card-head"><strong>近30日需归还资产</strong></div><SkTable columns={["资产编码", "资产名称", "资产分类", "所在位置", "预计归还日期"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>{node}</OpPage>
  );
}

export function MyAssetListPage() {
  return <OpPage><div className="op-card"><div className="op-card-head"><strong>资产仪表盘</strong></div><SkEmpty text="暂无数据" /></div></OpPage>;
}

export function MyApplicationsPage() {
  const [status, setStatus] = useState("不限");
  const { show, node } = useSkMessage();
  return <OpPage><div className="op-card is-plain"><div className="pp-apply-head"><div className="pp-apply-status"><span>状态：</span>{["不限", "进行中", "已完结", "已驳回", "已撤销"].map((item) => <button key={item} type="button" className={status === item ? "is-active" : ""} onClick={() => setStatus(item)}>{item}</button>)}</div><SkButton variant="primary" onClick={() => show("填写申请单")}>填写申请单</SkButton></div><div className="pp-apply-time"><span>时间：</span><SkInput type="date" /></div><SkEmpty text="暂无数据" /></div>{node}</OpPage>;
}

export function MyApprovalsPage() {
  const [tab, setTab] = useState(0);
  return <OpPage><div className="op-card is-plain"><SkTabs items={["待处理", "已处理"]} active={tab} onChange={setTab} /><div className="pp-apply-time"><span>时间：</span><SkInput type="date" /></div><SkEmpty text="暂无数据" /></div></OpPage>;
}
