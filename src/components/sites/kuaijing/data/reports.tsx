"use client";

import { useState, type ReactNode } from "react";

import { SkButton, SkInput, SkSelect, SkTable, SkTabs, useSkMessage } from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { DataPage, DtStats } from "./common";

const FIN_TABS = ["应收报表", "应支报表", "调整单据", "结转报表", "收入单据", "租赁收益", "支付方式", "费用类型", "开票统计"];

const FIN_TABLES: Record<string, { columns: string[]; rows: ReactNode[][] }> = {
  应收报表: {
    columns: ["业户", "账单编号", "默认联系人", "联系电话", "楼宇名称", "房号", "有效期", "费用类型", "应收金额", "应收时间", "逾期状态", "违约金", "实收款", "实收时间", "收款方式", "缴费通知单"],
    rows: [
      ["A01", "2026112600015", "A01", "13100000000", "宿舍楼01", "智慧园区/宿舍楼01/5/01", "2026/11/26 ~ 2026/11/26", "维修费", "¥300", "2026/11/26", "正常", "¥0", "¥300", "2026/11/26", "支付宝", "生成缴费通知单"],
      ["A01", "2026112600002", "A01", "13100000000", "宿舍楼01", "智慧园区/宿舍楼01/5/01", "2026/11/26 ~ 2026/11/26", "租金", "¥16.67", "2026/11/26", "正常", "¥0", "¥16.67", "2026/11/26", "支付宝", "生成缴费通知单"],
    ],
  },
  应支报表: {
    columns: ["收款方姓名", "默认联系人", "联系电话", "楼宇名称", "有效期", "费用类型", "应支金额", "实付时间", "币种", "应付时间", "逾期状态"],
    rows: [],
  },
  调整单据: {
    columns: ["业户名称", "楼宇名称", "合同编号", "财务编号", "账单状态", "逾期状态"],
    rows: [["A01", "宿舍楼01", "2026-04-001-202611-0002", "2026112600002", "开启", "正常"]],
  },
  结转报表: {
    columns: ["结转日期", "业务类型", "结转金额", "转出对方名称", "转出项目楼宇", "转出楼层房号", "转出费用类型", "转出账单编号", "转入对方名称", "转入项目楼宇", "转入楼层房号", "转入费用类型", "转入账单编号", "财务凭证编号"],
    rows: [],
  },
  收入单据: {
    columns: ["业户", "项目名称", "楼宇名称", "楼层-房号", "费用类型", "合同编号", "收入月份", "应收（不含税）金额", "实收（不含税）金额", "确认收入金额", "所属公司", "单据创建日期"],
    rows: [],
  },
  租赁收益: {
    columns: ["项目名称", "楼宇名称", "项目业态", "可供出租面积", "出租率", "出租面积", "新签约面积", "佣金总额", "租金收入", "租金回款", "物业收入"],
    rows: [
      ["智慧园区", "宿舍楼01", "宿舍", "20㎡", "0%", "0㎡", "0㎡", "¥0", "¥16.67", "¥16.67", "¥0"],
      ["测试项目", "测试楼宇", "产业园区", "21225㎡", "0%", "0㎡", "0㎡", "¥0", "¥0", "¥0", "¥0"],
    ],
  },
  支付方式: {
    columns: ["费用类型", "应收", "实际交易额", "手续费", "实收(含税)", "主营业务收入(不含税)", "税率", "税额", "支付方式"],
    rows: [
      ["租金", "¥16.67", "¥16.67（合计：¥16.67）", "¥0（合计：¥0）", "¥16.67（合计：¥16.67）", "¥16.67", "0%", "¥0", "支付宝"],
      ["维修费", "¥300", "¥300（合计：¥300）", "¥0（合计：¥0）", "¥300（合计：¥300）", "¥300", "0%", "¥0", "支付宝"],
      ["合计", "¥316.67", "¥316.67", "¥0.00", "¥316.67", "¥316.67", "--", "¥0.00", "支付宝"],
    ],
  },
  费用类型: {
    columns: ["费用类型", "支付宝收款", "支付宝银行到账金额", "支付宝手续费", "合计", "银行实际到账金额"],
    rows: [["租金", "¥16.67", "¥16.67", "¥0", "¥16.67", "¥16.67"], ["维修费", "¥300", "¥300", "¥0", "¥300.00", "¥300.00"], ["合计", "¥316.67", "¥316.67", "¥0.00", "¥316.67", "¥316.67"]],
  },
  开票统计: {
    columns: ["费用类型", "应收", "实际交易额", "手续费", "实际到账(含税)", "主营业务收入(不含税)", "税率", "税额", "已开票总额(含税)", "已开票总额(不含税)", "已开票税额", "未开票税额"],
    rows: [["租金", "¥16.67", "¥16.67", "¥0", "¥16.67", "¥16.67", "0%", "¥0", "¥0", "¥0", "¥0", "¥16.67"], ["维修费", "¥300", "¥300", "¥0", "¥300", "¥300", "0%", "¥0", "¥0", "¥0", "¥0", "¥300"], ["合计", "¥316.67", "¥316.67", "¥0.00", "¥316.67", "¥316.67", "--", "¥0.00", "¥0.00", "¥0.00", "¥0.00", "¥316.67"]],
  },
};

export function FinancialReportPage() {
  const [tab, setTab] = useState(0);
  const [view, setView] = useState(0);
  const { show, node } = useSkMessage();
  const name = FIN_TABS[tab];
  const table = FIN_TABLES[name];
  return (
    <DataPage>
      <div className="dt-report-tabs"><SkTabs items={FIN_TABS} active={tab} onChange={setTab} /></div>
      <div className="dt-report-view"><SkButton onClick={() => setView(0)} variant={view === 0 ? "primary" : "default"}>表格</SkButton><SkButton onClick={() => setView(1)} variant={view === 1 ? "primary" : "default"}>图表</SkButton></div>
      <div className="dt-card is-plain">
        <div className="op-filter-grid is-five">
          <OfficeField label="统计方式"><SkSelect defaultValue={name === "应支报表" ? "按应支时间" : "按应收时间"} options={["按应收时间", "按应支时间"]} /></OfficeField>
          <OfficeField label="统计月份"><SkInput type="month" /></OfficeField>
          <OfficeField label="业户"><SkInput /></OfficeField>
          <OfficeField label="联系电话"><SkInput /></OfficeField>
          <OfficeField label="费用类型"><SkSelect placeholder="请选择" /></OfficeField>
          <OfficeField label="逾期状态"><SkSelect placeholder="请选择" /></OfficeField>
          <OfficeField label="楼宇名称"><SkSelect placeholder="请选择" /></OfficeField>
          <OfficeField label="房号"><SkInput /></OfficeField>
          <OfficeField label="收款方式"><SkSelect placeholder="请选择" /></OfficeField>
          <OfficeField label="结清状态"><SkSelect placeholder="请选择" /></OfficeField>
          <div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton><SkButton onClick={() => show("导出报表")}>导出报表</SkButton></div>
        </div>
        {name === "调整单据" ? <DtStats items={[["调整总合同数", "1"], ["调整总金额", "¥66.66"], ["调整总账单数", "1"], ["比例调整数/占比", "0/0%"], ["金额调整数/占比", "1/100%"]]} columns={5} /> : null}
        {view === 0 ? <SkTable className="dt-wide-table is-huge" columns={table.columns.map((title, index) => ({ key: String(index), title }))} rows={table.rows} /> : <div className="dt-empty-chart" style={{ minHeight: 320 }}>暂无数据</div>}
      </div>
      {node}
    </DataPage>
  );
}

export function IncomeReportPage() {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <DataPage>
      <div className="dt-card is-plain">
        <div className="op-filter-grid is-five">
          <OfficeField label="业户名称"><SkInput placeholder="可直接录入名称搜索" /></OfficeField>
          <OfficeField label="客商编号"><SkInput /></OfficeField>
          <OfficeField label="项目名称"><SkSelect placeholder="请选择" /></OfficeField>
          <OfficeField label="所属公司"><SkSelect placeholder="请选择" /></OfficeField>
          <OfficeField label="房号"><SkInput /></OfficeField>
          <div className="op-filter-actions"><SkButton>重置</SkButton><SkButton variant="primary">搜索</SkButton></div>
        </div>
        <SkTabs items={["收款", "付款"]} active={tab} onChange={setTab} />
        <DtStats items={[["收入总金额", "¥0"], ["当月收入金额", "¥0"], ["业户数量", "0位"], ["收款公司", "0家"]]} columns={4} />
        <div className="dt-card-head"><strong>{tab === 0 ? "收款" : "付款"}</strong><SkButton onClick={() => show("收入汇总导出")}>收入汇总导出</SkButton></div>
        <SkTable className="dt-wide-table" columns={["应收(含税)", "业户", "客商编号", "项目名称", "所属公司", "房号", "月份"].map((title, index) => ({ key: String(index), title }))} rows={[]} />
      </div>
      {node}
    </DataPage>
  );
}

export function RetreatReportPage() {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <DataPage>
      <div className="dt-card is-plain">
        <SkTabs items={["业户合同到期", "业户已退房", "业主合同到期", "业主已退房"]} active={tab} onChange={setTab} />
        <div className="op-filter-grid is-five">
          <OfficeField label="统计月份"><SkInput type="month" /></OfficeField>
          <OfficeField label="业户"><SkInput /></OfficeField>
          <OfficeField label="电话"><SkInput /></OfficeField>
          <OfficeField label="建筑名称"><SkSelect placeholder="请选择" /></OfficeField>
          <OfficeField label="房号"><SkInput /></OfficeField>
          <div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton><SkButton onClick={() => show("导出报表")}>导出报表</SkButton></div>
        </div>
        <SkTable className="dt-wide-table" columns={["业户姓名", "默认联系人", "联系电话", "建筑名称", "房号", "合同编号", "租赁有效期", "租金", "押金", "欠款金额"].map((title, index) => ({ key: String(index), title }))} rows={[]} />
      </div>
      {node}
    </DataPage>
  );
}

export function PropertyReportPage() {
  const { show, node } = useSkMessage();
  return (
    <DataPage>
      <div className="dt-card is-plain">
        <div className="op-filter-grid is-five">
          <OfficeField label="项目名称"><SkSelect placeholder="请选择" /></OfficeField>
          <OfficeField label="查询月份"><SkInput type="month" /></OfficeField>
          <div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
        </div>
        <div className="dt-card-head"><strong>当前查询时间：2026-10 ~ 2026-11</strong><div className="dt-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton>费用类型范围</SkButton><SkButton>更多 ⌄</SkButton></div></div>
        <SkTable
          className="dt-wide-table"
          columns={["项目名称", "收费面积", "单价", "产生总费用", "陈欠费用", "优惠减免", "应收总额", "实收费用(不含预收)", "收费率", "预收费用", "入驻企业", "欠费企业", "备注", "操作"].map((title, index) => ({ key: String(index), title }))}
          rows={[["测试项目", "0.00㎡", "0", "¥0", "¥0", "¥0", "¥0", "¥0", "0.00%", "¥0", "0", "0", "--", "查看明细"], ["智慧园区", "0.00㎡", "0", "¥0", "¥0", "¥0", "¥0", "¥0", "0.00%", "¥0", "0", "0", "--", "查看明细"]]}
        />
      </div>
      {node}
    </DataPage>
  );
}
