"use client";

import { useState, type ReactNode } from "react";

import {
  SkActionLink,
  SkButton,
  SkDrawer,
  SkInput,
  SkRadio,
  SkSelect,
  SkSwitch,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import {
  FinChips,
  FinEmpty,
  FinFilterGrid,
  FinMore,
  FinPage,
  FinPageHeader,
  FinSearchTop,
  FinSplit,
  FinStats,
  FinTableCard,
  FinToggle,
} from "./common";

const link = (items: string[], onClick?: (label: string) => void) => (
  <span className="fin-links">
    {items.map((label, index) => (
      <SkActionLink key={label} danger={index === items.length - 1 && (label === "删除" || label === "作废")} onClick={() => onClick?.(label)}>{label}</SkActionLink>
    ))}
  </span>
);

const status = (text: string, tone: "success" | "muted" | "warn" = "success") => (
  <span className={`fin-status-dot is-${tone}`}><i />{text}</span>
);

/* ---------------------------------------------------------------- 应收 / 应付 */

export function ReceivablePage({ payable = false }: { payable?: boolean }) {
  const { show, node } = useSkMessage();
  const word = payable ? "应付" : "应收";
  const stats: Array<[string, string, string]> = [
    [`${word}金额`, payable ? "0.00" : "316.67", `${word}笔数 ${payable ? 0 : 2}`],
    [`实${payable ? "付" : "收"}金额`, payable ? "0.00" : "316.67", `实${payable ? "付" : "收"}笔数 ${payable ? 0 : 2}`],
    [payable ? "付缴率" : "收缴率", payable ? "0.00%" : "100.00 %", `未${payable ? "付" : "收"}总额 0`],
    ["违约金", "0.00", "产生违约金笔数 0"],
    ["调整金额", "0.00", "调整笔数 0"],
    [payable ? "需付" : "需退", "0.00", `${payable ? "需付金额" : "需退笔数"} 0`],
    ["已开票金额", "0.00", "待开票金额 383.33"],
    ["逾期金额", "0.00", "逾期笔数 0"],
  ];
  const rows: ReactNode[][] = payable
    ? []
    : [
        ["A01", "智慧园区/宿舍楼01/5/01", "大连华安物业管理有限公司", "2026112600015", status("已结清"), "维修费", "2026-04-001-202611-0002", "房屋账单", "¥300", "¥0", "¥300", "¥300", "收¥0", "--", "--", "0%", "--", "单价含税", "2026/11/26", "20", "自建全部账单", "人民币", "正常", "未发送", "2026/11/26", "2026/11/26"],
        ["A01", "智慧园区/宿舍楼01/5/01", "大连华安物业管理有限公司", "2026112600002", status("已结清"), "租金", "2026-04-001-202611-0002", "床位账单", "¥83.33", "¥0", "¥16.67", "¥16.67", "收¥0", "--", "--", "0%", "¥0", "单价含税", "2026/11/26", "20", "合同账单", "人民币", "正常", "未发送", "2026/11/26", "2026/11/26"],
      ];
  const columns = ["对方名称", "房号", "所属公司", "账单编号", "结清状态", "费用类型", "合同编号", "账单类型", "账单金额", "调整金额", "应收/付金额", "实收/付金额", "需收/退金额", "转入金额", "转出金额", "税率", "税额", "含税规则", "应收/付日期", "租赁数", "账单来源", "币种", "逾期状态", "缴费通知单", "开始时间", "结束时间"];
  return (
    <FinPage>
      <FinSearchTop placeholder="搜索对方名称、房号、合同编号、账单编号" action="+ 账单" />
      <div className="op-card is-plain fin-chips-card">
        <FinChips chips={[`账单状态：开启`, `${word}开始时间：2026-11-01`, `${word}结束时间：2026-11-30`]} />
      </div>
      <FinStats items={stats.map(([label, value, sub]) => ({ label, value, sub }))} cols={8} />
      <div className="op-card fin-table-card">
        <div className="fin-table-head">
          <div className="fin-table-head-left">
            <strong>{payable ? "付款账单列表" : "收款账单列表"}</strong>
            <span className="fin-tip">🌱 提示：Shift+滚轮 可以控制表格横向滚动</span>
            <FinToggle on={false} label={`已隐藏未到${word}期账单`} />
          </div>
          <div className="op-actions">
            <SkButton onClick={() => show("放大")}>放大</SkButton>
            <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
            <FinMore items={["导出表格", "打印账单", "批量设置"]} />
          </div>
        </div>
        <SkTable className="op-wide-table" columns={columns.map((title) => ({ key: title, title }))} rows={rows} />
        {rows.length ? <div className="fin-pagination"><span>共 {rows.length} 条</span><span className="fin-page-box">1</span><span>20 条/页</span></div> : null}
      </div>
      {node}
    </FinPage>
  );
}

/* ---------------------------------------------------------------- 账单优惠 / 坏账 */

export function DiscountPage({ badDebt = false }: { badDebt?: boolean }) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const { show, node } = useSkMessage();
  const title = badDebt ? "坏账账单列表" : "账单优惠列表";
  const rows: ReactNode[][] = badDebt
    ? []
    : [["A01", <span key="r" className="fin-link">智慧园区/宿舍楼01/5/01</span>, "大连华安物业管理有限公司", "2026112600002", "床位账单", "¥83.33", "¥16.67", "2026/11/26", "调减", "按金额调整", "¥66.66", "正常", "--", "已结清", "2026-04-001-202611-0002", "租金", <SkActionLink key="d" onClick={() => setDetailOpen(true)}>详情</SkActionLink>]];
  const stats = badDebt
    ? [["坏账金额", "0.00"], ["坏账笔数", "0笔"], ["业户数量", "0位"], ["作废数量", "0笔"]]
    : [["调整金额", "66.66"], ["调整笔数", "1笔"], ["业户数量", "0位"], ["作废数量", "0笔"]];
  const filters = badDebt
    ? ["调整时间区间", "调整方式", "账单编号", "费用类型", "业户", "资源", "账单类型"]
    : ["调整类型", "调整时间区间", "调整方式", "账单编号", "费用类型", "业户", "资源", "账单类型"];
  return (
    <FinPage>
      <FinSplit statuses={["全部账单", "审批中", "已审批", "已作废"]} activeStatus={statusIndex} onStatusChange={setStatusIndex}>
        <FinFilterGrid fields={filters} />
        <FinStats items={stats.map(([label, value]) => ({ label, value }))} />
        <FinTableCard
          title={title}
          buttons={<SkButton variant="primary" onClick={() => show("导出成功")}>导出表格</SkButton>}
          columns={["对方名称", "资源", "所属公司", "账单编号", "账单类型", "账单金额", "应收金额", "调整日期", "调整类型", "调整方式", "调整金额", "调整状态", "作废调整日期", "账单状态", "合同编号", "费用类型", "操作"]}
          rows={rows}
          total={rows.length}
        />
      </FinSplit>
      <DiscountDetailDrawer open={detailOpen} onClose={() => setDetailOpen(false)} message={show} />
      {node}
    </FinPage>
  );
}

/* ---------------------------------------------------------------- 流水 */

export function StreamPage({ payment = false }: { payment?: boolean }) {
  const { show, node } = useSkMessage();
  const rows: ReactNode[][] = payment
    ? []
    : [
        ["智慧园区/宿舍楼01/5/01", "大连华安物业管理有限公司", "2026112600002", "--", "2026/11/26", "A01", "A01", "贷（收入）", "300.00", "0.00", "人民币", "支付宝", "300.00", "0.00", "0.00", "300.00", "王", status("开启"), "2026/11/26 16:12"],
        ["智慧园区/宿舍楼01/5/01", "大连华安物业管理有限公司", "2026112600001", "--", "2026/11/26", "A01", "A01", "贷（收入）", "316.67", "0.00", "人民币", "支付宝", "16.67", "300.00", "0.00", "316.67", "王", status("开启"), "2026/11/26 16:12"],
      ];
  const total = payment ? 0 : 2;
  return (
    <FinPage>
      <div className="op-card is-plain fin-filter-card">
        <div className="fin-filter-grid is-six">
          {["流水编号", "汇款方式", "流水账户", "匹配状态", "单位/房号", "创建人员", "入账时间", "创建时间", "发生额", "状态", "所属公司", "所属项目", "所属楼宇", "对方名称", "业户标签", "第三方订单号"].map((label) => (
            <OfficeField key={label} label={label}><SkInput placeholder={`请输入${label}`} /></OfficeField>
          ))}
        </div>
        <div className="fin-filter-actions">
          <SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton>
          <SkButton onClick={() => show("重置成功")}>重置</SkButton>
          <span className="fin-inline-check"><SkSwitch defaultChecked />是否显示退款流水</span>
        </div>
      </div>
      <FinStats items={[
        { label: `总发生额（${total}笔）`, value: payment ? "0" : "616.67" },
        { label: "完全匹配（1笔）", value: payment ? "0" : "300" },
        { label: "部分匹配（1笔）", value: payment ? "0" : "16.67" },
        { label: "未匹配（1笔）", value: payment ? "0" : "300" },
      ]} />
      <FinTableCard
        title={payment ? "付款流水列表" : "收款流水列表"}
        buttons={
          <>
            <SkButton onClick={() => show("放大")}>放大</SkButton>
            <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
            <SkButton variant="primary" onClick={() => show("一键匹配完成")}>一键匹配</SkButton>
            <SkButton>客户预存</SkButton>
            <SkButton>收支流水</SkButton>
            <FinMore items={["导出数据", "删除流水"]} />
          </>
        }
        columns={["房号", "所属公司", "流水编号", "对方账号", "入账日期", "对方名称", "付款公司", "借贷标", "发生额", "退款金额", "币种（单位）", "汇款方式", "已匹配金额", "未匹配金额", "手续费", "实际到账金额", "创建人", "状态", "创建日期"]}
        rows={rows}
        total={total}
      />
      {node}
    </FinPage>
  );
}

/* ---------------------------------------------------------------- 逾期账单 */

export function OverduePage({ payment = false }: { payment?: boolean }) {
  const { show, node } = useSkMessage();
  const word = payment ? "付款" : "收款";
  return (
    <FinPage>
      <FinStats items={[
        { label: `总逾期${word}单数`, value: "0" },
        { label: `总逾期${word}金额`, value: "¥0" },
        { label: `逾期${payment ? "付款方" : "业户"}数`, value: "0" },
        { label: "违约金金额", value: "¥0" },
      ]} />
      <FinFilterGrid fields={["账单来源", "费用类型", "违约金状态", "起始时间", "结束时间", "创建时间", "结清状态", payment ? "应付时间" : "应收时间", "项目名称", "楼宇名称", "业户名称", "所属公司"]} />
      <FinTableCard
        buttons={
          <>
            <SkButton onClick={() => show("导出成功")}>导出报表</SkButton>
            {payment ? null : <SkButton variant="primary" onClick={() => show("催缴成功")}>一键批量催缴</SkButton>}
          </>
        }
        columns={["对方名称", "楼宇名称", "合同编号", "结清状态", "逾期天数", "费用类型", "租赁数", "账单来源", "账单金额", payment ? "应付金额" : "应收金额", payment ? "实付金额" : "实收金额", payment ? "需付金额" : "需收金额", "税率", "税额", payment ? "应付日期" : "应收日期", "开始日期", "结束时间", "缴费通知单", "调整金额", "转出金额", "转入金额", "币种"]}
        rows={[]}
      />
      {node}
    </FinPage>
  );
}

/* ---------------------------------------------------------------- 权责 / 收入确认 */

export function AccrualPage() {
  const { show, node } = useSkMessage();
  return (
    <FinPage>
      <FinFilterGrid fields={["权责期间", "费用类型", "账单状态", "确认状态", "开票状态", "业户", "合同编号", "所属公司", "所属项目"]} />
      <FinStats items={[
        { label: "应收金额", value: "¥0.00" },
        { label: "权责收缴率", value: "0.00%" },
        { label: "已收总额", value: "0" },
        { label: "未收总额", value: "0" },
        { label: "已确认应收金额", value: "¥0.00" },
        { label: "未确认金额", value: "¥0" },
        { label: "确认完成率", value: "0.00%" },
      ]} cols={7} />
      <FinTableCard
        title="权责应收列表"
        buttons={
          <>
            <SkButton onClick={() => show("导出成功")}>导 出</SkButton>
            <SkButton onClick={() => show("数据核对")}>数据核对</SkButton>
            <SkButton onClick={() => show("权责冲减")}>权责冲减</SkButton>
            <FinMore items={["批量确认", "导出明细"]} />
          </>
        }
        columns={["对方名称", "账单编号", "合同编号", "所属公司", "资源", "费用类型", "权责期间", "权责起始日期", "权责结束日期", "权责应收金额", "权责应收不含税金额", "权责实收金额", "权责实收不含税金额", "权责已确认金额", "权责状态", "税率", "计费周期", "开票状态", "操作"]}
        rows={[
          ["A01", "2026112600015", "2026-04-001-202611-0002", "大连华安物业管理有限公司", "智慧园区/宿舍楼01/5/01", "维修费", "--", "--", "--", "--", "--", "--", "--", "--", "--", "0", "2026/11/26 ~ 2026/11/26", "未开票", <SkActionLink key="d" onClick={() => show("详情")}>详情</SkActionLink>],
          ["A01", "2026112600002", "2026-04-001-202611-0002", "大连华安物业管理有限公司", "智慧园区/宿舍楼01/5/01", "租金", "--", "--", "--", "--", "--", "--", "--", "--", "--", "0", "2026/11/26 ~ 2026/11/26", "未开票", <SkActionLink key="d" onClick={() => show("详情")}>详情</SkActionLink>],
        ]}
        total={2}
      />
      {node}
    </FinPage>
  );
}

export function IncomeConfirmPage() {
  const { show, node } = useSkMessage();
  const months = ["11/2025", "12/2025", "01/2026", "02/2026", "03/2026", "04/2026", "05/2026", "06/2026", "07/2026", "08/2026", "09/2026", "10/2026", "11/2026", "12/2026", "01/2027", "02/2027", "03/2027", "04/2027", "05/2027", "06/2027", "07/2027", "08/2027", "09/2027", "10/2027", "11/2027"];
  const columns = ["业户", "房号", "所属公司", "所属项目", "合同编号", "客商编号", "费用类型", "收入类型", ...months];
  return (
    <FinPage>
      <FinFilterGrid fields={["合同状态", "是否确认", "所属公司", "项目"]} actions={["搜索", "重置"]} />
      <div className="fin-inline-links">
        <button type="button" className="fin-link" onClick={() => show("收入类型设置")}>收入类型设置</button>
        <button type="button" className="fin-link" onClick={() => show("收入确认规则")}>收入确认规则</button>
      </div>
      <FinStats items={[
        { label: "当月应收（含税）", value: "0" },
        { label: "当月应收（不含税）", value: "0" },
        { label: "当月实收（含税）", value: "0" },
        { label: "当月实收（不含税）", value: "0" },
        { label: "当月已确定收入", value: "0" },
        { label: "当月待确定收入", value: "0" },
      ]} cols={6} />
      <FinTableCard
        title="收入列表"
        buttons={
          <>
            <SkButton variant="primary" onClick={() => show("同步成功")}>同步账单数据</SkButton>
            <SkButton onClick={() => show("全部收入列表")}>查看全部收入列表</SkButton>
            <SkButton onClick={() => show("导出成功")}>收入统计报表导出</SkButton>
          </>
        }
        columns={columns}
        rows={[]}
      />
      {node}
    </FinPage>
  );
}

/* ---------------------------------------------------------------- 发票 / 通知 / 收据 */

export function InvoiceRecordsPage() {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <FinPage>
      <div className="op-card is-plain fin-card-tabs">
        <SkTabs items={["资源账单发票", "资产账单发票"]} active={tab} onChange={setTab} />
      </div>
      <div className="op-card is-plain fin-chips-card">
        <FinChips chips={["未选择筛选字段"]} />
      </div>
      <FinFilterGrid fields={["购方名称", "售方名称", "项目名称", "创建日期区间", "开票日期", "经办人", "发票类型", "发票状态", "发票代码", "发票号码", "商品或服务名称"]} actions={["搜索", "重置"]} cols={4} />
      <FinStats items={[
        { label: "申请开票金额", value: "¥0" },
        { label: "已开票（0张）", value: "¥0" },
        { label: "待开票（0张）", value: "¥0" },
      ]} cols={3} />
      <FinTableCard
        title="开票记录"
        buttons={
          <>
            <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
            <SkButton onClick={() => show("批量导入")}>批量导入</SkButton>
            <FinMore items={["导出表格", "批量开票"]} />
          </>
        }
        columns={["购方名称", "开票日期", "发票类型", "开票类型", "商品或服务名称", "申请开票金额", "税额合计", "价税合计", "发票状态", "经办人", "备注", "申请开票日期", "售方名称", "项目", "楼宇", "房源", "发票代码", "发票号码"]}
        rows={[]}
      />
      {node}
    </FinPage>
  );
}

export function InvoiceApplyPage() {
  const { show, node } = useSkMessage();
  return (
    <FinPage>
      <FinFilterGrid fields={["发票类型", "申请日期", "发票状态", "购方纳税人识别号", "购方账户", "经办人", "发票代码"]} actions={["搜索", "重置"]} />
      <FinStats items={[
        { label: "申请开票金额", value: "¥0" },
        { label: "本月开票金额", value: "¥0" },
        { label: "已开票", value: "0" },
        { label: "已开票笔数", value: "0" },
        { label: "待开票", value: "¥0" },
        { label: "待开票笔数", value: "0" },
        { label: "申请业户数", value: "0" },
        { label: "本月申请开票业户数", value: "0" },
      ]} cols={8} />
      <FinTableCard
        title="业户申请开票列表"
        buttons={
          <>
            <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
            <FinMore items={["导出表格", "批量开票"]} />
          </>
        }
        columns={["购方名称", "发票号码", "购方纳税人识别号", "购方开户行", "购方账户", "购方电话", "申请开票日期", "发票类型", "申请开票金额", "税额合计", "价税合计", "发票状态", "经办人", "备注", "资源", "售方名称", "售方纳税人识别号", "售方开户行", "售方账户", "发票代码"]}
        rows={[]}
      />
      {node}
    </FinPage>
  );
}

export function NoticePage() {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <FinPage>
      <div className="op-card is-plain fin-card-tabs">
        <SkTabs items={["资源账单通知单", "资产账单通知单"]} active={tab} onChange={setTab} />
      </div>
      <FinFilterGrid fields={["通知单发送时间", "业户名称", "楼宇", "短信发送状态", "邮箱发送状态", "公众号发送状态"]} actions={["搜索", "重置"]} />
      <FinStats items={[
        { label: "已生成", value: "0" },
        { label: "短信发送成功", value: "0" },
        { label: "邮箱发送成功", value: "0" },
        { label: "一催", value: "0" },
        { label: "二催", value: "0" },
        { label: "三催及以上", value: "0" },
      ]} cols={6} />
      <FinTableCard
        title="收款通知"
        buttons={
          <>
            <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
            <SkButton onClick={() => show("打印")}>打印</SkButton>
            <FinMore items={["批量发送", "导出表格"]} />
          </>
        }
        columns={["业户名称", "账单编号", "楼宇", "楼号/房号", "催缴级别", "短信发送状态", "邮箱发送状态", "公众号发送状态", "生成日期", "操作"]}
        rows={[]}
      />
      {node}
    </FinPage>
  );
}

export function ReceiptsPage() {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <FinPage>
      <div className="op-card is-plain fin-card-tabs">
        <SkTabs items={["资源账单收据", "资产账单收据"]} active={tab} onChange={setTab} />
      </div>
      <div className="op-card is-plain fin-chips-card">
        <FinChips chips={["未选择筛选字段"]} />
      </div>
      <FinFilterGrid fields={["项目名称", "创建日期区间", "交款单位", "开据日期", "收据编号", "开据类型", "收款单位", "收据状态", "费用名称", "开据人"]} actions={["搜索", "重置"]} />
      <FinStats items={[
        { label: "开据金额", value: "¥0" },
        { label: "未发出收据数", value: "0" },
        { label: "开据数", value: "0" },
      ]} cols={3} />
      <FinTableCard
        title="收据记录"
        buttons={
          <>
            <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
            <SkButton onClick={() => show("批量导入")}>批量导入</SkButton>
            <SkButton onClick={() => show("回收成功")}>回 收</SkButton>
            <SkButton onClick={() => show("发出成功")}>发 出</SkButton>
            <SkButton onClick={() => show("生成成功")}>生 成</SkButton>
            <SkButton onClick={() => show("打印")}>打 印</SkButton>
            <FinMore items={["导出表格", "删除收据"]} />
          </>
        }
        columns={["交款单位", "开据日期", "收据编号", "开据金额", "开据类型", "交款人", "收款单位", "支付方式", "项目", "楼宇名称", "房源", "收据状态", "费用名称", "费用类型", "开据人"]}
        rows={[]}
      />
      {node}
    </FinPage>
  );
}

/* ---------------------------------------------------------------- 收费状态表 */

export function CollectionStatusPage() {
  const [tab, setTab] = useState(0);
  const { node } = useSkMessage();
  const [project, setProject] = useState(false);
  const [mode, setMode] = useState(0);
  const floors = Array.from({ length: 5 }, (_, floor) => ({ floor: floor + 1, rooms: Array.from({ length: 50 }, (_, index) => `${floor + 1}${String(index + 1).padStart(2, "0")}`) }));

  return (
    <FinPage className="fin-collection-page">
      <div className="op-card is-plain fin-card-tabs">
        <SkTabs items={["状态表", "月度表", "月度汇总"]} active={tab} onChange={setTab} />
      </div>
      {tab === 0 ? (
        <div className="fin-collection">
          <aside className="fin-collection-side">
            <SkSelect defaultValue="大连华安物业管理有限公司" options={["大连华安物业管理有限公司"]} />
            <div className="fin-org-tree">
              <div className="fin-org-row is-root">▾ 大连华安物业管理有限公司</div>
              <button type="button" className={`fin-org-row is-child${project ? " is-active" : ""}`} onClick={() => setProject(true)}>🏢 智慧园区</button>
              <div className="fin-org-row is-child">🏢 测试项目</div>
            </div>
          </aside>
          <section className="fin-collection-main">
            {!project ? <FinEmpty text="请选择项目" /> : (
              <>
                <div className="fin-collection-stats">
                  {[["应收/已收金额", "¥316.67 / ¥316.67"], ["未收金额", "¥0"], ["收缴率", "100"], ["未缴数量", "0"], ["应缴/结清户数", "0 / 0"], ["部分结清户数", "0"], ["无费用户数", "250"], ["户数", "250"]].map(([label, value]) => (
                    <div key={label} className="fin-collection-stat"><span>{label}</span><strong>{value}</strong></div>
                  ))}
                </div>
                <div className="fin-collection-controls">
                  <OfficeField label="统计年份"><SkSelect defaultValue="2026" options={["2026", "2025"]} /></OfficeField>
                  <OfficeField label="费用类型"><SkSelect placeholder="请选择" /></OfficeField>
                  <div className="fin-view-toggle">
                    {["应收", "实收", "需收"].map((item, index) => (
                      <button key={item} type="button" className={index === mode ? "is-active" : ""} onClick={() => setMode(index)}>{item}</button>
                    ))}
                  </div>
                  <div className="fin-legend">
                    <span>颜色标识：</span>
                    {[["无费用", "#f5f5f5"], ["已结清", "#d9f7be"], ["部分结清", "#fff1b8"], ["未收款", "#ffccc7"]].map(([label, color]) => <span key={label}><i style={{ background: color }} />{label}</span>)}
                  </div>
                </div>
                <div className="fin-room-summary"><span>应收：¥316.67</span><span>实收：¥316.67</span><span>需收：¥0</span></div>
                <div className="fin-rooms">
                  {floors.map(({ floor, rooms }) => (
                    <div key={floor} className="fin-floor">
                      <span className="fin-floor-label">{floor}</span>
                      <div className="fin-floor-rooms">
                        {rooms.map((room) => (
                          <div key={room} className="fin-room">
                            <strong>{room}</strong>
                            <span>应收：¥0</span>
                            <span>实收：¥0</span>
                            <span>需收：¥0</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      ) : tab === 1 ? (
        <div className="op-card fin-collection-empty"><FinEmpty text="请选择项目" /></div>
      ) : (
        <>
          <FinFilterGrid fields={["统计年份", "费用类型", "所属公司"]} actions={["查询"]} />
          <FinTableCard columns={["公司", "应收日期", "优惠前金额", "应收金额", "实收金额", "需收金额", "优惠金额"]} rows={[]} buttons={<SkButton variant="primary">导出</SkButton>} />
        </>
      )}
      {node}
    </FinPage>
  );
}

/* ---------------------------------------------------------------- 财务设置 */

export function RemitTypesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { show, node } = useSkMessage();
  const rows: ReactNode[][] = ["现金", "网银转账", "POS机", "支付宝", "微信", "转账支票", "其他方式"].map((name) => [
    name,
    "0.00%",
    status("启用"),
    name === "网银转账" ? "是" : "否",
    <span key="op" className="fin-links">
      <SkActionLink onClick={() => setDrawerOpen(true)}>编辑</SkActionLink>
      {name === "现金" ? null : <SkActionLink onClick={() => show("按收支账户设置")}>按收支账户设置</SkActionLink>}
    </span>,
  ]);
  return (
    <FinPage>
      <FinFilterGrid fields={["名称", "状态"]} actions={["搜索", "重置"]} />
      <FinTableCard
        title="支付方式"
        buttons={
          <>
            <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
            <SkButton variant="primary" onClick={() => setDrawerOpen(true)}>新增</SkButton>
          </>
        }
        columns={["名称", "手续费", "状态", "需要录入对方银行账号", "操作"]}
        rows={rows}
        total={7}
      />
      <PaymentMethodDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSave={() => { setDrawerOpen(false); show("保存成功"); }} />
      {node}
    </FinPage>
  );
}

export function NoticeSettingPage() {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <FinPage>
      <FinPageHeader
        title="缴费通知单设置"
        description="用于系统根据账单内容自动生成可下载打印的通知单模板，支持显示付款二维码。目前系统支持短信、邮件自动发送缴费通知单，用户可通过链接进行线上缴纳。"
      />
      <div className="op-card fin-setting-card">
        <SkTabs items={["打印模板", "发送模板", "自动催缴"]} active={tab} onChange={setTab} />
        <FinEmpty text={tab === 0 ? "暂无打印模板" : tab === 1 ? "暂无发送模板" : "暂无自动催缴规则"} action={<SkButton variant="primary" onClick={() => show("立即创建")}>立即创建</SkButton>} />
      </div>
      {node}
    </FinPage>
  );
}

export function InvoiceSettingPage() {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <FinPage>
      <FinPageHeader
        title="发票设置"
        description="此处生成供开发票的模板。对账单进行开票时，发票模板需要支持对应的费用类型才能进行开票，请在税率规则中进行费用类型的配置并应用于发票模板。"
        right={<SkButton onClick={() => show("电子发票参数")}>电子发票参数</SkButton>}
      />
      <div className="op-card fin-setting-card">
        <SkTabs items={["相关设置", "发票模板"]} active={tab} onChange={setTab} />
        <div className="fin-two-cards">
          <div className="fin-sub-card">
            <div className="fin-sub-head"><strong>售方信息</strong><SkButton variant="primary" onClick={() => show("新建售方信息")}>+ 新建售方信息</SkButton></div>
            <SkTable columns={["公司名称", "开户行", "电话", "操作"].map((title) => ({ key: title, title }))} rows={[]} />
          </div>
          <div className="fin-sub-card">
            <div className="fin-sub-head"><strong>税收分类编码</strong><SkButton variant="primary" onClick={() => show("新建税收分类编码")}>+ 新建税收分类编码</SkButton></div>
            <SkTable columns={["商品或服务名称", "税收分类编码", "税率", "操作"].map((title) => ({ key: title, title }))} rows={[]} />
          </div>
        </div>
        <div className="fin-sub-card">
          <div className="fin-sub-head"><strong>税率规则</strong><SkButton variant="primary" onClick={() => show("新建税率规则")}>+ 新建税率规则</SkButton></div>
          <SkTable columns={["费用类型", "税收分类编码", "税率", "备注", "状态", "操作"].map((title) => ({ key: title, title }))} rows={[]} />
        </div>
      </div>
      {node}
    </FinPage>
  );
}

export function ReceiptSettingPage() {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <FinPage>
      <FinPageHeader title="收据设置" description="用于将系统中的账单的关键字如账单金额，收款时间等，以模版的形式记录并生成规范化的收据，并能够直接下载打印收据发给业户。" />
      <div className="op-card fin-setting-card">
        <SkTabs items={["收据编号", "收款方信息", "收据模板"]} active={tab} onChange={setTab} />
        <div className="fin-company-row">
          <SkSelect defaultValue="大连华安物业管理有限公司" options={["大连华安物业管理有限公司"]} />
          <SkSelect defaultValue="大连华安物业管理有限公司" options={["大连华安物业管理有限公司"]} />
          <SkSelect defaultValue="智慧园区" options={["智慧园区", "测试项目"]} />
        </div>
        <FinFilterGrid fields={["收据编号规则名称", "收据编号前缀", "使用状态"]} actions={["搜索", "重置"]} cols={3} />
        <FinTableCard
          title="收据编号规则"
          columns={["收据编号规则名称", "收据编号前缀", "开始编号", "结束编号", "可用张数", "使用状态", "操作"]}
          rows={[]}
          buttons={<SkButton onClick={() => show("刷新成功")}>刷新</SkButton>}
        />
      </div>
      {node}
    </FinPage>
  );
}

export function NumberSettingPage({ stream = false }: { stream?: boolean }) {
  const [tab, setTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { show, node } = useSkMessage();
  return (
    <FinPage>
      <div className="op-card is-plain fin-card-tabs">
        <SkTabs items={stream ? ["收款流水编号", "付款流水编号"] : ["收款账单编号", "付款账单编号"]} active={tab} onChange={setTab} />
      </div>
      <div className="op-card is-plain fin-chips-card"><FinChips chips={["未选择筛选字段"]} /></div>
      <FinFilterGrid fields={["编号规则标题", "绑定项目"]} actions={["搜索", "重置"]} cols={2} />
      <FinTableCard
        title="编号规则列表"
        buttons={
          <>
            <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
            <SkButton variant="primary" onClick={() => setDrawerOpen(true)}>新增编号规则</SkButton>
          </>
        }
        columns={["编号规则标题", "编号规则", "规则结果预览", "绑定公司", "绑定项目", "操作"]}
        rows={[["默认规则", "创建日期+流水号", stream ? "2026112800003" : "2026112800016", "全部公司", "全部项目", <SkActionLink key="e" onClick={() => setDrawerOpen(true)}>编辑</SkActionLink>]]}
        total={1}
      />
      <NumberRuleDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSave={() => { setDrawerOpen(false); show("保存成功"); }} />
      {node}
    </FinPage>
  );
}

export function FeeTypesPage() {
  const [category, setCategory] = useState("所有");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { show, node } = useSkMessage();
  const categories = ["所有", "物业类", "租金类", "杂费类", "水电费", "保证金", "出售类", "其他"];
  const fees: Array<[string, string, boolean]> = [
    ["采购成本费", "租金类", false], ["换房费", "其他", false], ["供暖费", "杂费类", false], ["煤气费", "杂费类", false],
    ["电话费", "杂费类", false], ["中介费", "杂费类", false], ["杂费", "杂费类", false], ["保洁费", "杂费类", false],
    ["会议室费用", "杂费类", false], ["打印费", "杂费类", false], ["附加服务租金", "租金类", false], ["物业费", "物业类", false],
    ["租金其他杂项", "租金类", false], ["租金退租结算", "租金类", false], ["成本租金", "租金类", false], ["租金", "租金类", true],
    ["车位管理费", "物业类", false], ["停车费", "物业类", false], ["物业退租结算", "物业类", false], ["成本物业费", "物业类", false],
  ];
  const visible = category === "所有" ? fees : fees.filter((item) => item[1] === category);
  const rows = visible.map(([name, cat, important]) => [
    name, cat, <span key="i" className="fin-important">{important ? "特别重要" : "否"}</span>, "0", <SkSwitch key="s" defaultChecked />, link(["编辑", "删除"], show),
  ]);
  return (
    <FinPage>
      <FinPageHeader title="费用类型设置" description="用户可以根据自身业务需求自定义不同的费用类型，还可以将同类型的费用放至同一指定分类下，以便更好地进行费用管理。" />
      <div className="fin-fee-layout">
        <aside className="op-card fin-fee-side">
          <strong>费用分类</strong>
          <div className="fin-search-input"><SkInput placeholder="请输入分类" /><button type="button" className="fin-search-btn">⌕</button></div>
          <div className="fin-category-list">
            {categories.map((item) => (
              <button key={item} type="button" className={`fin-category${category === item ? " is-active" : ""}`} onClick={() => setCategory(item)}>
                <span>{item}</span><i>≡</i>
              </button>
            ))}
          </div>
          <SkButton variant="outline" className="fin-wide-btn" onClick={() => setCategory("所有")}>+ 新建分类</SkButton>
        </aside>
        <section className="op-card fin-fee-main">
          <div className="fin-fee-toolbar">
            <div className="fin-search-input"><SkInput placeholder="请输入费用名称" /><button type="button" className="fin-search-btn">⌕</button></div>
            <div className="op-actions">
              <SkButton onClick={() => show("拓展字段")}>拓展字段</SkButton>
              <SkButton variant="primary" onClick={() => setDrawerOpen(true)}>+ 新建费用类型</SkButton>
            </div>
          </div>
          <SkTable
            className="op-wide-table"
            columns={["费用名称", "所属分类", "特别重要", "排序", "状态", "操作"].map((title) => ({ key: title, title }))}
            rows={rows}
          />
          <div className="fin-pagination"><span>共 {visible.length} 条</span><span className="fin-page-box">1</span><span>20 条/页</span></div>
        </section>
      </div>
      <FeeTypeDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSave={() => { setDrawerOpen(false); show("保存成功"); }} />
      {node}
    </FinPage>
  );
}

export function SimpleCollectionPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { show, node } = useSkMessage();
  return (
    <FinPage>
      <div className="op-card is-plain fin-chips-card"><FinChips chips={["未选择筛选字段"]} /></div>
      <FinFilterGrid fields={["所属项目", "收费名称"]} actions={["搜索", "重置"]} cols={2} />
      <FinTableCard
        title="简易收款列表"
        buttons={
          <>
            <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
            <SkButton variant="primary" onClick={() => setDrawerOpen(true)}>新增</SkButton>
            <FinMore items={["批量停用", "导出表格"]} />
          </>
        }
        columns={["收费名称", "所属项目", "收款公司", "绑定费用类型", "二维码", "操作"]}
        rows={[]}
      />
      <SimpleCollectionDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSave={() => { setDrawerOpen(false); show("保存成功"); }} />
      {node}
    </FinPage>
  );
}

export function CouponsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { show, node } = useSkMessage();
  return (
    <FinPage>
      <div className="fin-title-line"><strong>优惠券管理</strong></div>
      <FinFilterGrid fields={["优惠券名称", "费用类型", "优惠券状态"]} actions={["搜索", "重置"]} cols={3} />
      <FinTableCard
        title="优惠券列表"
        buttons={
          <>
            <SkButton variant="primary" onClick={() => setDrawerOpen(true)}>添加优惠券</SkButton>
            <SkButton onClick={() => show("发放优惠券")}>发放优惠券</SkButton>
          </>
        }
        columns={["优惠券名称", "所属公司", "所属项目", "优惠券金额", "优惠条件", "可用的费用类型", "优惠券数量", "券有效期", "每用户领取上限", "活动有效期", "操作"]}
        rows={[]}
      />
      <CouponDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSave={() => { setDrawerOpen(false); show("保存成功"); }} />
      {node}
    </FinPage>
  );
}

export function PricingPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { show, node } = useSkMessage();
  return (
    <FinPage>
      <FinFilterGrid fields={["标准名称", "计费模式", "状态"]} actions={["搜索", "重置"]} cols={3} />
      <FinTableCard
        title="收费标准列表"
        buttons={<SkButton variant="primary" onClick={() => setDrawerOpen(true)}>新建收费标准</SkButton>}
        columns={["标准名称", "收费模式", "计费模式", "单价", "生效时间", "失效时间", "状态", "所属项目", "创建时间", "绑定对象", "绑定列表", "操作"]}
        rows={[]}
      />
      <PricingDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSave={() => { setDrawerOpen(false); show("保存成功"); }} />
      {node}
    </FinPage>
  );
}

/* ---------------------------------------------------------------- 凭证设置 */

export function VoucherPage({ variant }: { variant: "subjects" | "assist" | "templates" | "config" | "records" }) {
  const { show, node } = useSkMessage();
  const titleMap = {
    subjects: "科目列表",
    assist: "辅助核算列表",
    templates: "凭证模板列表",
    config: "配置列表",
    records: "凭证记录列表",
  };
  const columnsMap: Record<string, string[]> = {
    subjects: ["科目名称", "科目编码", "现金流代码", "费用类型", "辅助核算类别", "是否税金科目", "绑定税金科目", "状态", "操作"],
    assist: ["业务对象名称", "业务对象编码", "辅助核算名称", "辅助核算编码", "最后修改时间", "最后修改人", "操作"],
    templates: ["模板名称", "凭证类型", "记账模式", "已配置科目", "最后修改时间", "最后修改人", "操作"],
    config: ["公司名称", "项目名称", "财务软件", "状态", "在线支付合并提交", "新增流水凭证延迟到次月合并推送", "结转收入提交方式", "每月自动确认", "客商编码统一", "最后修改时间", "最后修改人", "操作"],
    records: ["公司名称", "业务类型", "推送状态", "凭证模板", "财务凭证编号", "流水编号", "创建时间", "操作"],
  };
  return (
    <FinPage>
      <div className="fin-voucher-layout">
        <aside className="op-card fin-voucher-side">
          <strong>{variant === "assist" ? "核算类别" : "公司列表"}</strong>
          <div className="fin-org-tree">
            <div className="fin-org-row is-root">▾ 大连华安物业管理有限公司</div>
            <div className="fin-org-row is-child">🏢 智慧园区</div>
            <div className="fin-org-row is-child">🏢 测试项目</div>
          </div>
        </aside>
        <section className="op-card fin-voucher-main">
          {variant !== "subjects" && variant !== "assist" && variant !== "templates" ? (
            <div className="fin-company-row">
              <SkSelect defaultValue="大连华安物业管理有限公司" options={["大连华安物业管理有限公司"]} />
              <SkSelect defaultValue="大连华安物业管理有限公司" options={["大连华安物业管理有限公司"]} />
              <SkSelect defaultValue="智慧园区" options={["智慧园区", "测试项目"]} />
            </div>
          ) : null}
          {variant === "records" ? (
            <div className="op-card is-plain fin-chips-card"><FinChips chips={["未选择筛选字段"]} /></div>
          ) : null}
          {variant === "records" ? <FinFilterGrid fields={["业务类型", "仅看含退款凭证", "创建时间范围", "流水编号", "财务凭证编号", "账单编号"]} actions={["搜索", "重置"]} cols={3} /> : null}
          <FinTableCard
            title={titleMap[variant]}
            buttons={
              <>
                <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
                <SkButton variant="primary" onClick={() => show("新增")}>新增</SkButton>
                {variant === "records" ? <SkButton onClick={() => show("手动合并推送")}>手动合并推送</SkButton> : null}
              </>
            }
            columns={columnsMap[variant]}
            rows={[]}
          />
        </section>
      </div>
      {node}
    </FinPage>
  );
}

/* ---------------------------------------------------------------- 收银台 */

export function CashierPage() {
  const [tab, setTab] = useState(0);
  const tabs = [
    ["房源", "房源管理编号"],
    ["业户", "手机号"],
    ["停车费", "车牌号"],
    ["车位", "车位管理编号"],
  ];
  return (
    <FinPage className="fin-cashier-page">
      <div className="fin-cashier">
        <h1>收银台</h1>
        <div className="fin-cashier-tabs">
          {tabs.map(([label], index) => (
            <button key={label} type="button" className={index === tab ? "is-active" : ""} onClick={() => setTab(index)}>{label}</button>
          ))}
        </div>
        <div className="fin-cashier-search">
          <SkSelect defaultValue={tabs[tab][1]} options={[tabs[tab][1]]} />
          <SkInput placeholder={`请输入${tabs[tab][1]}搜索`} />
          <button type="button" className="fin-cashier-search-btn">⌕</button>
        </div>
      </div>
    </FinPage>
  );
}

/* ---------------------------------------------------------------- 新建账单 */

export function BillFormPage({ payable = false }: { payable?: boolean }) {
  const [mode, setMode] = useState(0);
  return (
    <FinPage className="fin-form-page">
      <div className="fin-form-title"><strong>{payable ? "新建付款账单" : "新建收款账单"}</strong></div>
      <div className="fin-form-layout">
        <section className="op-card fin-form-card">
          <div className="fin-form-head">
            <strong>账单信息</strong>
            <div className="fin-form-toggle">
              {["周期费用", "一次性费用"].map((item, index) => (
                <button key={item} type="button" className={index === mode ? "is-active" : ""} onClick={() => setMode(index)}>{item}</button>
              ))}
            </div>
          </div>
          <div className="fin-form-grid">
            <OfficeField label="关联合同"><SkSelect placeholder="输入业户名称搜索" /></OfficeField>
            <OfficeField label={payable ? "收款方" : "付款方"} required><SkSelect placeholder={payable ? "输入业户名称搜索" : "可直接录入名称搜索"} /></OfficeField>
            <OfficeField label="费用类型" required><SkSelect placeholder="请选择" /></OfficeField>
            <OfficeField label="币种" required><SkSelect defaultValue="人民币(CNY)" options={["人民币(CNY)"]} /></OfficeField>
            <OfficeField label="计费周期" required><SkInput type="date" /></OfficeField>
            <OfficeField label="单价"><SkInput placeholder="请输入" /></OfficeField>
            <OfficeField label={`${payable ? "应付" : "应收"}`} required>
              <div className="fin-amount-row">
                <SkInput placeholder="请输入单价" />
                <SkRadio label="含税" checked={mode === 0} onChange={() => setMode(0)} />
                <SkRadio label="不含税" checked={mode === 1} onChange={() => setMode(1)} />
              </div>
            </OfficeField>
            <OfficeField label="税率"><SkInput placeholder="0.00" /></OfficeField>
            <OfficeField label={`${payable ? "应付" : "应收"}日期`} required><SkInput type="date" /></OfficeField>
            <OfficeField label="特殊账单类型"><SkSelect defaultValue="正常" options={["正常", "预收", "押金"]} /></OfficeField>
            <OfficeField label="违约金起算天数"><SkInput placeholder="请输入" /></OfficeField>
            <OfficeField label="违约金比例"><SkInput placeholder="请输入" /></OfficeField>
            <OfficeField label="违约金上限"><SkInput placeholder="请输入" /></OfficeField>
            <OfficeField label="所属公司" required><SkSelect defaultValue="大连华安物业管理有限公司" options={["大连华安物业管理有限公司"]} /></OfficeField>
            <OfficeField label="账单备注"><textarea className="sk-input fin-textarea" /></OfficeField>
          </div>
          <div className="fin-attach-section">
            <div className="fin-form-head"><strong>账单附件信息</strong><SkButton onClick={() => undefined}>添加附件</SkButton></div>
            <SkTable columns={["文件名", "操作人", "操作时间", "操作"].map((title) => ({ key: title, title }))} rows={[]} />
          </div>
        </section>
        <section className="op-card fin-form-side">
          <div className="fin-form-head">
            <strong>请勾选房源</strong>
            <SkSelect defaultValue="租赁" options={["租赁"]} className="fin-small-select" />
          </div>
          <div className="fin-alert">不能跨项目选择房源</div>
          <SkSelect defaultValue="大连华安物业管理有限公司" options={["大连华安物业管理有限公司"]} />
          <div className="fin-search-input"><SkInput placeholder="请输入房源名称搜索" /><button type="button" className="fin-search-btn">⌕</button></div>
          <div className="fin-org-tree">
            <div className="fin-org-row is-root">▾ 大连华安物业管理有限公司</div>
            <div className="fin-org-row is-child">🏢 智慧园区</div>
            <div className="fin-org-row is-child">🏢 宿舍楼01</div>
            <div className="fin-org-row is-child">🏢 测试项目</div>
            <div className="fin-org-row is-child">🏢 测试楼宇</div>
          </div>
        </section>
      </div>
      <div className="fin-form-footer">
        <SkButton onClick={() => undefined}>添加收支流水</SkButton>
        <SkButton variant="primary">保 存</SkButton>
        <SkButton variant="primary">保存&新建下一个</SkButton>
      </div>
    </FinPage>
  );
}

/* ---------------------------------------------------------------- 抽屉 */

function DrawerFooter({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return (
    <>
      <SkButton onClick={onClose}>取 消</SkButton>
      <SkButton variant="primary" onClick={onSave}>确 定</SkButton>
    </>
  );
}

export function PaymentMethodDrawer({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: () => void }) {
  const [bankAccount, setBankAccount] = useState(false);
  return (
    <SkDrawer open={open} title="添加支付方式" width={520} onClose={onClose} footer={<DrawerFooter onClose={onClose} onSave={onSave} />}>
      <div className="fin-drawer-form">
        <OfficeField label="名称" required><SkInput /></OfficeField>
        <OfficeField label="手续费"><SkInput /></OfficeField>
        <OfficeField label="需要录入对方银行账号">
          <div className="fin-inline"><SkSwitch checked={bankAccount} onChange={setBankAccount} /><span>{bankAccount ? "是" : "否"}</span></div>
        </OfficeField>
      </div>
    </SkDrawer>
  );
}

export function NumberRuleDrawer({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: () => void }) {
  return (
    <SkDrawer open={open} title="新增编号规则" width={560} onClose={onClose} footer={<DrawerFooter onClose={onClose} onSave={onSave} />}>
      <div className="fin-drawer-form">
        <OfficeField label="规则名称" required><SkInput /></OfficeField>
        <OfficeField label="规则内容" required><div className="fin-inline"><SkInput /><SkButton>+ 新增</SkButton></div></OfficeField>
        <OfficeField label="綁定公司（不传默认所有公司）"><SkSelect placeholder="请选择" /></OfficeField>
        <OfficeField label="绑定项目" required><SkSelect placeholder="请选择" /></OfficeField>
      </div>
    </SkDrawer>
  );
}

export function FeeTypeDrawer({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: () => void }) {
  return (
    <SkDrawer open={open} title="新建费用类型" width={560} onClose={onClose} footer={<><SkButton onClick={onClose}>取 消</SkButton><SkButton variant="primary" onClick={onSave}>保 存</SkButton></>}>
      <div className="fin-drawer-section">基本信息</div>
      <div className="fin-drawer-form">
        <OfficeField label="费用类型名称" required><SkInput /></OfficeField>
        <OfficeField label="费用分类" required><SkSelect placeholder="请选择" /></OfficeField>
        <OfficeField label="特别重要"><SkSwitch /></OfficeField>
        <OfficeField label="可否合并开票"><SkSwitch defaultChecked /></OfficeField>
        <OfficeField label="可否合并开具收据"><SkSwitch defaultChecked /></OfficeField>
        <OfficeField label="用户端在线支付"><SkSwitch defaultChecked /></OfficeField>
        <OfficeField label="排序"><SkInput defaultValue="0" /></OfficeField>
        <OfficeField label="状态"><SkSwitch defaultChecked /></OfficeField>
      </div>
    </SkDrawer>
  );
}

export function PricingDrawer({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: () => void }) {
  return (
    <SkDrawer open={open} title="新增收费标准" width={760} onClose={onClose} footer={<DrawerFooter onClose={onClose} onSave={onSave} />}>
      <div className="fin-drawer-section">收费设置</div>
      <div className="fin-drawer-grid is-three">
        <OfficeField label="绑定对象"><div className="fin-inline"><SkRadio label="房间" checked /><SkRadio label="车位" checked={false} /></div></OfficeField>
        <OfficeField label="项目名称"><SkSelect placeholder="请选择项目名称" /></OfficeField>
        <OfficeField label="收费公司"><SkSelect placeholder="请选择" /></OfficeField>
        <OfficeField label="收费模式"><SkSelect defaultValue="周期性费用" options={["周期性费用", "一次性费用"]} /></OfficeField>
        <OfficeField label="费用类型"><SkSelect placeholder="请选择费用类型" /></OfficeField>
        <OfficeField label="房源标签"><SkSelect placeholder="请选择标签" /></OfficeField>
      </div>
      <div className="fin-drawer-section">基本信息</div>
      <div className="fin-drawer-grid is-three">
        <OfficeField label="标准名称"><SkInput /></OfficeField>
        <OfficeField label="计费模式"><SkSelect placeholder="请选择" /></OfficeField>
        <OfficeField label="单价"><div className="fin-inline"><SkInput /><span>元/天</span></div></OfficeField>
        <OfficeField label="标准生效时间"><SkInput type="date" /></OfficeField>
        <OfficeField label="标准失效日期"><SkInput type="date" /></OfficeField>
        <OfficeField label="永久生效"><SkSwitch /></OfficeField>
        <OfficeField label="付款时间"><SkSelect placeholder="请选择" /></OfficeField>
        <OfficeField label="日期计算方式"><SkSelect defaultValue="按开始延后" options={["按开始延后", "按结束提前"]} /></OfficeField>
        <OfficeField label="计费（和拆分）规则"><SkSelect defaultValue="按30天计费" options={["按30天计费", "按实际天数计费"]} /></OfficeField>
        <OfficeField label="账单拆分周期（1月一笔）"><SkSelect defaultValue="30天/月" options={["30天/月"]} /></OfficeField>
      </div>
      <div className="fin-drawer-section">违约金设置</div>
      <div className="fin-drawer-grid is-three">
        <OfficeField label="起算天数"><SkInput /></OfficeField>
        <OfficeField label="违约金收取比例（每天）"><SkInput /></OfficeField>
        <OfficeField label="违约金收取上限"><SkInput /></OfficeField>
      </div>
    </SkDrawer>
  );
}

export function CouponDrawer({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: () => void }) {
  return (
    <SkDrawer open={open} title="添加优惠券" width={720} onClose={onClose} footer={<><SkButton onClick={onClose}>取 消</SkButton><SkButton variant="primary" onClick={onSave}>保 存</SkButton></>}>
      <div className="fin-drawer-form is-two">
        <OfficeField label="优惠券名称" required><SkInput /></OfficeField>
        <OfficeField label="优惠券使用条件"><SkSelect placeholder="满足金额" /></OfficeField>
        <OfficeField label="优惠券金额"><div className="fin-inline"><SkInput /><span>元</span></div></OfficeField>
        <OfficeField label="绑定公司"><SkSelect placeholder="请绑定公司" /></OfficeField>
        <OfficeField label="绑定项目"><SkSelect placeholder="请绑定项目" /></OfficeField>
        <OfficeField label="费用类型"><SkSelect placeholder="选择费用类型" /></OfficeField>
        <OfficeField label="活动有效期"><SkInput type="date" /></OfficeField>
        <OfficeField label="优惠券数量"><SkInput /></OfficeField>
        <OfficeField label="优惠券有效期"><SkSelect defaultValue="领取后当天有效" options={["领取后当天有效", "指定日期"]} /></OfficeField>
        <OfficeField label="每业户可领取数量"><SkInput /></OfficeField>
        <OfficeField label="是否允许提前领券"><SkSwitch defaultChecked /></OfficeField>
        <OfficeField label="用户自主领取优惠劵"><SkSwitch defaultChecked /></OfficeField>
        <OfficeField label="优惠券使用说明"><textarea className="sk-input fin-textarea" /></OfficeField>
      </div>
    </SkDrawer>
  );
}

export function SimpleCollectionDrawer({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: () => void }) {
  return (
    <SkDrawer open={open} title="新增" width={560} onClose={onClose} footer={<><SkButton onClick={onClose}>关 闭</SkButton><SkButton variant="primary" onClick={onSave}>保 存</SkButton></>}>
      <div className="fin-drawer-form">
        <OfficeField label="收款公司"><SkSelect placeholder="请选择收款公司" /></OfficeField>
        <OfficeField label="所属项目"><SkSelect placeholder="请选择所属项目" /></OfficeField>
        <OfficeField label="收费名称"><SkInput /></OfficeField>
        <OfficeField label="绑定费用类型"><SkSelect placeholder="请选择" /></OfficeField>
        <OfficeField label="默认房间"><SkSelect placeholder="请选择" /></OfficeField>
        <OfficeField label="默认业户"><SkSelect placeholder="可直接录入名称搜索" /></OfficeField>
        <OfficeField label="收款类型"><SkSelect placeholder="请选择收款类型" /></OfficeField>
      </div>
    </SkDrawer>
  );
}

export function DiscountDetailDrawer({ open, onClose, message }: { open: boolean; onClose: () => void; message: (text: string) => void }) {
  return (
    <SkDrawer open={open} title="优惠详情" width={860} onClose={onClose} footer={<><SkButton onClick={() => message("作废成功")}>作 废</SkButton><SkButton onClick={onClose}>取 消</SkButton></>}>
      <div className="fin-drawer-section">账单信息</div>
      <div className="fin-detail-grid">
        {[["账单编号", "2026112600002"], ["费用类型", "租金"], ["计费周期", "2026/11/26 ~ 2026/11/26"], ["所属公司", "大连华安物业管理有限公司"], ["付款方", "A01"], ["合同编号", "2026-04-001-202611-0002"], ["账单状态", "已结清"], ["应收金额", "¥16.67"], ["资源", "智慧园区/宿舍楼01/5/01"], ["需收金额", "¥0"], ["实收金额", "¥16.67"], ["应收日期", "2026/11/26"]].map(([label, value]) => (
          <div key={label} className="fin-detail-field"><span>{label}</span><strong>{value}</strong></div>
        ))}
      </div>
      <div className="fin-drawer-section">调整信息</div>
      <div className="fin-detail-grid">
        {[["调整日期", "2026/11/26"], ["调整类型", "调减"], ["调整方式", "按金额调整"], ["调整金额", "¥66.66"], ["调整状态", "正常"], ["备注内容", "退租协议"], ["作废调整日期", "--"]].map(([label, value]) => (
          <div key={label} className="fin-detail-field"><span>{label}</span><strong>{value}</strong></div>
        ))}
      </div>
      <div className="fin-drawer-section">附件列表</div>
      <SkTable columns={["名称", "网址", "操作"].map((title) => ({ key: title, title }))} rows={[]} />
    </SkDrawer>
  );
}
