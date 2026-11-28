"use client";

import { useState } from "react";

import { SkButton, SkInput, SkSelect, SkTable, useSkMessage } from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { OpPage, OpStats } from "./common";

export function TurnoverDailyPage() {
  const { show, node } = useSkMessage();
  return (
    <OpPage>
      <div className="op-org-inline">大连华安物业管理有限公司　大连华安物业管理有限公司　智慧园区　测试项目</div>
      <div className="op-card is-plain">
        <div className="op-filter-grid is-five">
          <OfficeField label="日期"><SkInput type="date" /></OfficeField>
          <OfficeField label="报表日期"><SkInput type="date" /></OfficeField>
          <OfficeField label="业户名称"><SkInput placeholder="可直接录入名称搜索" /></OfficeField>
          <OfficeField label="审核状态"><SkSelect placeholder="请选择" options={["待审核", "已审核"]} /></OfficeField>
          <div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
        </div>
        <OpStats items={[["营业额总额", "¥0"], ["消费笔数", "0"], ["客单价", "¥0"], ["线下收入", "¥0"], ["消费笔数", "0"], ["客单价", "¥0"], ["线上收入", "¥0"], ["消费笔数", "0"], ["客单价", "¥0"], ["现金总收入", "¥0"], ["消费笔数", "0"], ["客单价", "¥0"]]} columns={6} />
      </div>
      <div className="op-card"><div className="op-card-head"><strong>营业额日报列表</strong><div className="op-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新增成功")}>新增</SkButton><SkButton>更多 ⌄</SkButton></div></div><SkTable className="op-wide-table is-huge" columns={["房源名称", "业户名称", "状态", "使用进度", "日报日期", "合同编号", "线上收入", "线上补贴", "线上优惠券", "线上积分", "线上支付人数", "线下收入", "线下补贴", "线下代金券", "线下总人数", "现金", "外卖", "微信", "支付宝", "现金支付总人数", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>
      {node}
    </OpPage>
  );
}

export function TurnoverEntryPage() {
  const { show, node } = useSkMessage();
  return (
    <OpPage>
      <div className="op-org-inline">大连华安物业管理有限公司　大连华安物业管理有限公司　智慧园区　测试项目</div>
      <div className="op-card is-plain">
        <div className="op-filter-grid is-five">
          <OfficeField label="单据编号"><SkInput /></OfficeField>
          <OfficeField label="单据日期"><SkInput type="date" /></OfficeField>
          <OfficeField label="单据状态"><SkSelect placeholder="请选择单据状态" options={["待提交", "已提交"]} /></OfficeField>
          <div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
        </div>
      </div>
      <div className="op-card"><div className="op-card-head"><strong>营业额录入列表</strong><div className="op-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新增成功")}>新增</SkButton><SkButton onClick={() => show("由日报新增")}>由日报新增</SkButton><SkButton>更多 ⌄</SkButton></div></div><SkTable className="op-wide-table" columns={["ID", "状态", "单据编号", "录入类型", "单据日期", "起始日期", "终止日期", "创建人", "附加说明", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>
      {node}
    </OpPage>
  );
}

export function TurnoverBoardPage() {
  const [mode, setMode] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <OpPage className="op-turnover-board">
      <div className="op-org-inline">大连华安物业管理有限公司　大连华安物业管理有限公司　智慧园区　测试项目</div>
      <div className="op-board-toolbar">
        <div className="op-table-tabs">{["状态表", "月度表", "月度汇总"].map((item, index) => <button key={item} type="button" className={index === mode ? "is-active" : ""} onClick={() => setMode(index)}>{item}</button>)}</div>
        <div className="op-actions"><SkInput type="month" /><SkButton variant="primary">总营业额：¥0</SkButton></div>
      </div>
      <div className="op-board-legend">
        {["状态标识", "固定分成", "租金+分成", "租金/分成取高", "多种计租方式", "未结算"].map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="op-board">
        <div className="op-board-title">智慧园区　宿舍楼01</div>
        {[1, 2, 3, 4].map((floor) => (
          <div key={floor} className="op-floor">
            <span className="op-floor-num">{floor}</span>
            <div className="op-rooms">
              {Array.from({ length: 50 }, (_, index) => `${floor}${String(index + 1).padStart(2, "0")}`).map((room) => (
                <button key={room} type="button" className="op-room" onClick={() => show(`${room} 营业额 ¥0`)}>
                  <span>{room}</span>
                  <small>营业额</small>
                  <strong>¥0</strong>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {node}
    </OpPage>
  );
}

export function TurnoverSettlePage() {
  const { show, node } = useSkMessage();
  return (
    <OpPage>
      <div className="op-org-inline">大连华安物业管理有限公司　大连华安物业管理有限公司　智慧园区　测试项目</div>
      <div className="op-card is-plain">
        <div className="op-filter-grid is-five">
          <OfficeField label="单据编号"><SkInput /></OfficeField>
          <OfficeField label="单据日期"><SkInput type="date" /></OfficeField>
          <OfficeField label="单据状态"><SkSelect placeholder="请选择单据状态" options={["待结算", "已结算"]} /></OfficeField>
          <div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
        </div>
      </div>
      <div className="op-card"><div className="op-card-head"><strong>联销结算列表</strong><div className="op-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新增成功")}>新增</SkButton><SkButton>更多 ⌄</SkButton></div></div><SkTable columns={["单据编号", "单据日期", "所属公司", "创建人", "附加说明", "状态", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>
      {node}
    </OpPage>
  );
}
