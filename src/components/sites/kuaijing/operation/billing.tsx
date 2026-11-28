"use client";

import { useState } from "react";

import {
  SkButton,
  SkInput,
  SkSelect,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { OpPage, OpStats } from "./common";

type BillingKind = "receivable" | "operation" | "deposit" | "bill";

const BILLING_STATS: Record<BillingKind, Array<[string, string]>> = {
  receivable: [["应收金额", "0.00"], ["应收笔数", "0"], ["实收金额", "0.00"], ["实收笔数", "0"], ["收缴率", "0.00%"], ["未收总额", "0"], ["违约金", "0.00"], ["产生违约金笔数", "0"], ["调整金额", "0.00"], ["调整笔数", "0"], ["需退", "0.00"], ["需退笔数", "0"], ["已开票金额", "0.00"], ["待开票金额", "0"]],
  operation: [["应收金额", "300.00"], ["应收笔数", "1"], ["实收金额", "300.00"], ["实收笔数", "1"], ["收缴率", "100.00%"], ["未收总额", "0"], ["违约金", "0.00"], ["产生违约金笔数", "0"], ["调整金额", "0.00"], ["调整笔数", "0"], ["需退", "0.00"], ["需退笔数", "0"], ["已开票金额", "0.00"], ["待开票金额", "300"]],
  deposit: [["应收金额", "0.00"], ["应收笔数", "0"], ["实收金额", "0.00"], ["实收笔数", "0"], ["收缴率", "0.00%"], ["未收总额", "0"], ["违约金", "0.00"], ["产生违约金笔数", "0"], ["调整金额", "0.00"], ["调整笔数", "0"], ["需退", "0.00"], ["需退笔数", "0"], ["已开票金额", "0.00"], ["待开票金额", "0"]],
  bill: [["应收金额", "316.67"], ["应收笔数", "2"], ["实收金额", "316.67"], ["实收笔数", "2"], ["收缴率", "100.00%"], ["未收总额", "0"], ["违约金", "0.00"], ["产生违约金笔数", "0"], ["调整金额", "0.00"], ["调整笔数", "0"], ["需退", "0.00"], ["需退笔数", "0"], ["已开票金额", "0.00"], ["待开票金额", "383.33"]],
};

const BILL_COLUMNS = ["对方名称", "房号", "所属公司", "账单编号", "结清状态", "费用类型", "合同编号", "账单类型", "账单金额", "调整金额", "应收/付金额", "实收/付金额", "需收/退金额", "转入金额", "转出金额", "税率", "税额", "含税规则", "应收/付日期", "租赁数", "账单来源", "币种", "逾期状态", "缴费通知单", "开始时间", "结束时间"];

export function BillingPage({ kind }: { kind: BillingKind }) {
  const { show, node } = useSkMessage();
  const rows = kind === "operation"
    ? [["", "A01", "智慧园区/宿舍楼01/5/01", "大连华安物业管理有限公司", "2026112600015", "已结清", "维修费", "2026-04-001-202611-0002", "房屋账单", "¥300", "¥0", "¥300", "¥300", "收¥0", "--", "--", "0%", "--", "单价含税", "2026/11/26", "20", "自建全部账单", "人民币", "正常", "未发送", "2026/11/26", "2026/11/26"]]
    : kind === "bill"
      ? [
          ["", "A01", "智慧园区/宿舍楼01/5/01", "大连华安物业管理有限公司", "2026112600015", "已结清", "维修费", "2026-04-001-202611-0002", "房屋账单", "¥300", "¥0", "¥300", "¥300", "收¥0", "--", "--", "0%", "--", "单价含税", "2026/11/26", "20", "自建全部账单", "人民币", "正常", "未发送", "2026/11/26", "2026/11/26"],
          ["", "A01", "智慧园区/宿舍楼01/5/01", "大连华安物业管理有限公司", "2026112600002", "已结清", "租金", "2026-04-001-202611-0002", "床位账单", "¥83.33", "¥0", "¥16.67", "¥16.67", "收¥0", "--", "--", "0%", "¥0", "单价含税", "2026/11/26", "20", "合同账单", "人民币", "正常", "未发送", "2026/11/26", "2026/11/26"],
        ]
      : [];
  return (
    <OpPage className="op-billing-page">
      <div className="op-card is-plain">
        <div className="op-page-tabs"><SkTabs items={["账单"]} active={0} onChange={() => undefined} /></div>
        <div className="op-filter-summary">
          <span>账单状态：开启应收</span>
          <span>开始时间：2026-11-01</span>
          <span>应收结束时间：2026-11-30</span>
          {kind === "operation" ? <span>账单来源：自建全部账单</span> : null}
        </div>
        <div className="op-filter-grid is-five">
          <OfficeField label="对方名称"><SkInput /></OfficeField>
          <OfficeField label="房号"><SkInput /></OfficeField>
          <OfficeField label="账单编号"><SkInput /></OfficeField>
          <OfficeField label="结清状态"><SkSelect placeholder="请选择" options={["已结清", "部分结清", "待收款"]} /></OfficeField>
          <OfficeField label="应收/付日期"><SkInput type="date" /></OfficeField>
          <div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton><SkButton>快捷筛选管理</SkButton></div>
        </div>
        <OpStats items={BILLING_STATS[kind]} columns={7} />
        <div className="op-card">
          <div className="op-card-head"><strong>收款账单列表</strong><div className="op-actions"><SkButton onClick={() => show("隐藏")}>隐藏</SkButton><SkButton onClick={() => show("放大")}>放大</SkButton><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton>更多 ⌄</SkButton></div></div>
          <div className="op-note">🌱 提示：Shift+滚轮 可以控制表格横向滚动　<span className="sk-link">已隐藏未到应收期账单</span></div>
          <SkTable className="op-wide-table is-huge" columns={BILL_COLUMNS.map((title, index) => ({ key: String(index), title }))} rows={rows} />
        </div>
      </div>
      {node}
    </OpPage>
  );
}

export function MerchantReceivablePage() { return <BillingPage kind="receivable" />; }
export function OperationCostPage() { return <BillingPage kind="operation" />; }
export function DepositPage() { return <BillingPage kind="deposit" />; }
export function BillManagementPage() { return <BillingPage kind="bill" />; }

export function MerchantBillPage() {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <OpPage>
      <div className="op-card is-plain">
        <div className="op-filter-grid is-five">
          <OfficeField label="业户名称"><SkInput placeholder="可直接录入名称搜索" /></OfficeField>
          <OfficeField label="收款状态"><SkSelect placeholder="请选择" options={["已收", "未收"]} /></OfficeField>
          <OfficeField label="应收月份"><SkInput type="month" /></OfficeField>
          <div className="op-filter-actions"><SkButton>重置</SkButton><SkButton variant="primary">搜索</SkButton></div>
        </div>
      </div>
      <div className="op-card">
        <div className="op-card-head"><strong>账单列表</strong><div className="op-actions"><SkButton onClick={() => show("隐藏已收账单")}>隐藏</SkButton><SkButton onClick={() => show("隐藏未到应收期账单")}>隐藏</SkButton><SkButton onClick={() => show("退款")}>退 款</SkButton><SkButton onClick={() => show("收支流水")}>收支流水</SkButton><SkButton variant="primary" onClick={() => show("添加账单")}>添加账单</SkButton></div></div>
        <div className="op-table-tabs"><button type="button" className={tab === 0 ? "is-active" : ""} onClick={() => setTab(0)}>应收</button><button type="button" className={tab === 1 ? "is-active" : ""} onClick={() => setTab(1)}>已收</button></div>
        <SkTable className="op-wide-table" columns={["应收月份", "业户名称", "有效期", "特殊账单类型", "应收金额", "违约金", "收款状态", "实收金额", "催收通知"].map((title, index) => ({ key: String(index), title }))} rows={[]} />
      </div>
      {node}
    </OpPage>
  );
}

export function DiscountPage() {
  const { show, node } = useSkMessage();
  return (
    <OpPage>
      <div className="op-status-tabs">{["全部账单", "审批中", "已审批", "已作废"].map((item, index) => <button key={item} type="button" className={index === 0 ? "is-active" : ""}>{item}</button>)}</div>
      <div className="op-org-inline">大连华安物业管理有限公司　大连华安物业管理有限公司　智慧园区　测试项目</div>
      <div className="op-card is-plain">
        <div className="op-filter-grid is-five">
          {["调整类型", "调整时间区间", "调整方式", "账单编号", "费用类型", "业户", "资源", "账单类型"].map((label) => <OfficeField key={label} label={label}>{/类型|方式|区间/.test(label) ? <SkSelect placeholder="请选择" /> : <SkInput />}</OfficeField>)}
          <div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
        </div>
      </div>
      <OpStats items={[["调整金额", "66.66"], ["调整笔数", "1笔"], ["业户数量", "0位"], ["作废数量", "0笔"]]} />
      <div className="op-card"><div className="op-card-head"><strong>账单优惠列表</strong><SkButton onClick={() => show("导出成功")}>导出表格</SkButton></div><SkTable className="op-wide-table is-huge" columns={["对方名称", "资源", "所属公司", "账单编号", "账单类型", "账单金额", "应收金额", "调整日期", "调整类型", "调整方式", "调整金额", "调整状态", "作废调整日期", "账单状态", "合同编号", "费用类型", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[["A01", "智慧园区/宿舍楼01/5/01", "大连华安物业管理有限公司", "2026112600002", "床位账单", "¥83.33", "¥16.67", "2026/11/26", "调减", "按金额调整", "¥66.66", "正常", "--", "已结清", "2026-04-001-202611-0002", "租金", <span key="op" className="sk-action-link">详情</span>]]} /></div>
      {node}
    </OpPage>
  );
}

export function InvoicePage() {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <OpPage>
      <div className="op-card is-plain">
        <SkTabs items={["资源账单发票", "资产账单发票"]} active={tab} onChange={setTab} />
        <div className="op-filter-grid is-five">
          {["购方名称", "售方名称", "项目名称", "创建日期区间", "开票日期", "经办人", "发票类型", "发票状态", "发票代码", "发票号码", "商品或服务名称"].map((label) => <OfficeField key={label} label={label}>{/名称|代码|号码|商品/.test(label) ? <SkInput /> : /日期/.test(label) ? <SkInput type="date" /> : <SkSelect placeholder="请选择" />}</OfficeField>)}
          <div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
        </div>
        <OpStats items={[["申请开票金额", "¥0"], ["已开票（0张）", "¥0"], ["待开票（0张）", "¥0"]]} columns={3} />
      </div>
      <div className="op-card"><div className="op-card-head"><strong>开票记录</strong><div className="op-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton onClick={() => show("批量导入")}>批量导入</SkButton><SkButton>更多 ⌄</SkButton></div></div><SkTable className="op-wide-table is-huge" columns={["购方名称", "开票日期", "发票类型", "开票类型", "商品或服务名称", "申请开票金额", "税额合计", "价税合计", "发票状态", "经办人", "备注", "申请开票日期", "售方名称", "项目", "楼宇", "房源", "发票代码", "发票号码"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>
      {node}
    </OpPage>
  );
}

export function CashierPage() {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <OpPage>
      <div className="op-card">
        <div className="op-cashier-head"><strong>收银台</strong><div className="op-table-tabs">{["房源", "业户", "停车费", "车位"].map((item, index) => <button key={item} type="button" className={index === tab ? "is-active" : ""} onClick={() => setTab(index)}>{item}</button>)}</div></div>
        <div className="op-filter-grid is-five"><OfficeField label="房源管理编号"><SkInput /></OfficeField><div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton></div></div>
        <div className="op-empty-box">暂无数据</div>
      </div>
      {node}
    </OpPage>
  );
}
