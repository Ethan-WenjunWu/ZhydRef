"use client";

import { useState } from "react";

import { SkButton, SkInput, SkSelect, SkTable, useSkMessage } from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { OpPage, OpStats } from "../operation/common";

export type AssetConfig = {
  title: string;
  columns: string[];
  buttons?: string[];
  filters?: string[];
  tabs?: string[];
  stats?: Array<[string, string]>;
  note?: string;
  rows?: React.ReactNode[][];
};

export function AssetGeneric({ config }: { config: AssetConfig }) {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <OpPage>
      {config.stats ? <OpStats items={config.stats} columns={config.stats.length >= 6 ? 6 : 4} /> : null}
      {config.filters ? (
        <div className="op-card is-plain">
          <div className="op-filter-grid is-five">
            {config.filters.map((label) => (
              <OfficeField key={label} label={label}>
                {/日期|时间/.test(label) ? <SkInput type="date" /> : /公司|分类|状态|类型|人员|部门/.test(label) ? <SkSelect placeholder="请选择" /> : <SkInput />}
              </OfficeField>
            ))}
            <div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
          </div>
        </div>
      ) : null}
      <div className="op-card">
        <div className="op-card-head"><strong>{config.title}</strong><div className="op-actions">{(config.buttons?.length ? config.buttons : ["刷新", "更多"]).map((button, index, list) => <SkButton key={button} variant={index === list.length - 1 ? "primary" : "default"} onClick={() => show(button)}>{button}</SkButton>)}</div></div>
        {config.tabs ? <div className="op-table-tabs">{config.tabs.map((item, index) => <button key={item} type="button" className={index === tab ? "is-active" : ""} onClick={() => setTab(index)}>{item}</button>)}</div> : null}
        {config.note ? <div className="op-note">{config.note}</div> : null}
        <SkTable className="op-wide-table is-huge" columns={config.columns.map((value, index) => ({ key: String(index), title: value }))} rows={config.rows ?? []} />
      </div>
      {node}
    </OpPage>
  );
}

export const ASSET_CONFIGS: Record<string, AssetConfig> = {
  list: {
    title: "资产清单列表",
    columns: ["资产编码", "标签链接", "资产分类", "资产名称", "资产状态", "品牌", "型号", "设备序列号", "管理员", "所属公司", "所在位置", "购置时间", "购置方式", "购置金额(含税)", "入库时间", "预计使用期限(月)", "备注", "资产照片", "使用人", "目标房源", "使用部门", "领用日期", "保养到期时间", "保养说明", "预计折旧期限(月)", "操作"],
    buttons: ["高级搜索", "导出资产", "导入资产", "新增资产"],
  },
  dispatch: { title: "派发/退库", filters: ["单据编号", "单据状态", "领用人"], columns: ["单据编号", "单据状态", "领用人", "使用部门", "派发时间", "派发处理人", "所属公司", "派发备注", "操作"], buttons: ["高级搜索", "导出数据", "新增单据"], tabs: ["派发", "退库"] },
  storage: { title: "资产入库", filters: ["单据编号", "单据状态"], columns: ["单据编号", "单据状态", "入库处理人", "入库处理时间", "入库备注", "所属公司", "来源", "操作"], buttons: ["导出数据", "新增单据"] },
  handout: { title: "借出/归还", filters: ["单据编号", "借用人"], columns: ["单据编号", "单据状态", "借用人", "借用部门", "借出时间", "预计归还时间", "借出处理人", "所属公司", "借出备注", "操作"], buttons: ["归还到期提醒", "高级搜索", "导出数据", "新增单据"], tabs: ["借出", "归还"] },
  "change-receiver": { title: "变更领用人", filters: ["单据编号", "单据状态"], columns: ["单据编号", "单据状态", "变更后使用人", "变更后使用部门", "变更后使用位置", "变更时间", "变更处理人", "所属公司", "变更说明", "操作"], buttons: ["高级搜索", "导出数据", "新增单据"] },
  transfer: { title: "资产调拨", filters: ["单据编号", "单据状态"], columns: ["单据编号", "单据状态", "调出管理员", "调入管理员", "调入位置", "所属公司", "调拨备注", "操作"], buttons: ["高级搜索", "导出数据", "新增单据"] },
  repair: { title: "资产维修", filters: ["单据编号", "报修人"], columns: ["单据编号", "单据状态", "报修人", "报修部门", "报修时间", "报修原因", "维修处理人", "预计维修金额", "所属公司", "维修内容", "操作"], buttons: ["高级搜索", "新增单据", "更多"] },
  handle: { title: "资产处置", filters: ["单据编号", "单据状态"], columns: ["单据编号", "单据状态", "处置发起人", "发起部门", "发起时间", "处置金额", "处置费用", "处置类型", "所属公司", "处置原因", "操作"], buttons: ["高级搜索", "导出数据", "新增单据"] },
  maintain: { title: "资产保养", filters: ["单据编号", "保养人"], columns: ["单据编号", "单据状态", "保养人", "保养部门", "保养时间", "下次保养时间", "保养项目", "保养备注", "保养金额", "操作"], buttons: ["资产保养提醒", "导出数据", "新增单据"] },
  "employee-apply": { title: "员工申请单据", filters: ["单据编号", "申请人"], columns: ["单据编号", "关联单据类型", "关联单据编号", "单据状态", "申请人", "申请部门", "申请原因", "操作"], buttons: ["高级搜索", "导出数据"], tabs: ["库存资产领用", "库存资产借用", "交接他人", "资产报修", "资产退还", "资产报失"] },
  "purchase-contract": { title: "采购合同列表", filters: ["资产名称", "资产编号", "合同编号", "所属公司", "经办人员", "合同状态"], columns: ["客户名称", "合同类型", "资产名称", "所属公司", "合同编号", "签订日期", "单据日期", "单据编号", "租赁起始日期", "租赁终止日期", "合同状态", "执行进度", "经办人员"], buttons: ["创建合同", "更多"] },
  "sale-contract": { title: "合同列表", filters: ["资产名称", "资产编号", "合同编号", "所属公司", "经办人员", "合同状态"], columns: ["合同类型", "所属公司", "客户名称", "资产名称", "合同编号", "签订日期", "单据日期", "单据编号", "租赁起始日期", "租赁终止日期", "合同状态", "执行进度", "经办人员"], buttons: ["创建合同", "更多"], tabs: ["租赁合同", "出售合同"] },
  "asset-bill": { title: "收款账单", tabs: ["收款账单", "付款账单"], columns: ["对方名称", "资产名称", "资产类别", "合同编号", "结清状态", "账单类型", "费用类型", "所属公司", "租赁数", "账单来源", "账单金额", "应收/付金额", "实收/付金额", "需收/退金额", "税率", "税额", "已开票金额", "未开票金额", "含税规则", "币种", "逾期状态", "缴费通知单", "开始日期", "结束时间", "应收/付日期", "调整金额", "转出金额", "转入金额"], buttons: ["隐藏", "放大", "刷新", "更多"] },
  "contract-stop": { title: "资产合同终止", filters: ["单据编号", "单据日期", "资产名称", "合同类别", "合同编号", "所属公司", "经办人员"], columns: ["单据编号", "单据日期", "所属公司", "合同编号", "合同类别", "单据状态", "资产名称", "经办人", "附加说明"], buttons: [] },
  "contract-print": { title: "合同打印模板", columns: ["模板名称", "绑定公司", "合同类型", "操作"], buttons: ["合同打印模板"] },
  "contract-retreat": { title: "合同退租协议模版", columns: ["模板名称", "绑定公司", "操作"], buttons: ["模板"] },
  "contract-expire": { title: "合同到期提醒规则", columns: ["名称", "关联公司", "操作"], buttons: ["提醒规则"] },
  "contract-clause": { title: "合同条款类型", filters: ["条款类型名称"], columns: ["条款类型名称", "条款属性", "保证金条款", "周期条款", "一次性条款", "递增条款", "优惠条款", "费用类型", "保证金类型", "操作"], buttons: ["条款类型"], tabs: ["租赁条款", "出售条款", "采购条款"] },
  "contract-template": { title: "合同配置模板", filters: ["模板名称", "应用公司", "资产类型", "状态"], columns: ["模板名称", "应用公司", "资产类型", "更新时间", "截止时间", "状态", "操作"], buttons: ["新增模板"], tabs: ["租赁模板", "出售模板", "采购模板"] },
  "purchase-request": { title: "采购单申请列表", filters: ["采购单申请编号", "所属公司", "项目名称", "供应商名称", "单据状态", "申请人员"], columns: ["采购单申请编号", "所属公司", "所属项目", "预估费用", "供应商名称", "要求到货日期", "到货地址", "单据状态", "经办人员", "申请时间", "操作"], buttons: ["刷新", "新增采购单申请", "更多"] },
  "purchase-order": { title: "采购订单列表", filters: ["采购订单编号", "所属公司", "项目名称", "供应商名称", "单据状态", "申请人员"], columns: ["采购订单编号", "采购单申请编号", "所属项目", "预估费用", "供应商报价", "供应商名称", "要求到货日期", "到货地址", "订单状态", "经办人员", "订单创建时间", "操作"], buttons: ["刷新", "更多"] },
  supplier: { title: "供应商", stats: [["供应商数量", "0"], ["企业供应商", "0"], ["个人供应商", "0"]], filters: ["供应商编码", "供应商名称", "联系电话", "证件号码"], columns: ["供应商编码", "客商名称", "标签", "财务客商编码", "注册地址", "营业期限", "纳税人识别号(开票信息)", "成立日期", "所属地区", "组织机构代码", "开户银行", "账户", "所属行业", "公司类型", "行业分类", "联系人", "证件号码", "联系电话", "客商类别", "默认发票类型", "推荐展示", "操作"], buttons: ["更多", "查看供应商入口", "供应商"] },
  tender: { title: "招标信息列表", stats: [["招标文件数", "0"], ["进行中的招标", "0"], ["未开始的招标", "0"], ["已结束的招标", "0"], ["投标供应商总数", "0"], ["授标总金额", "¥0"]], filters: ["标题", "招标类型", "招标编号", "状态", "经办人员"], columns: ["标题", "招标类型", "招标编号", "关联采购", "招标开始时间", "招标结束时间", "招标预算", "现场参观日期时间", "现场参观地址", "状态", "经办人员", "中标供应商", "创建时间", "操作"], buttons: ["刷新", "更多"] },
  "asset-category": { title: "资产分类设置", columns: ["分类编码", "分类名称", "上级分类", "状态", "备注", "操作"], buttons: ["导出全部", "批量导入分类", "新增分类"] },
  "asset-location": { title: "资产位置设置", columns: ["位置编码", "位置名称", "上级位置", "状态", "备注", "操作"], buttons: ["同步楼宇房间", "导出全部", "批量导入位置", "新增位置"] },
};
