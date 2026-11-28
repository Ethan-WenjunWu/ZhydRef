"use client";

import { useState } from "react";

import { SkButton, SkEmpty, SkInput, SkSelect, SkTable, SkTabs, useSkMessage } from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { OpGenericPage, OpPage, OpStats, OpStatusLayout, OpSubSidebar, type OpConfig } from "./common";

const merchantInfoColumns = ["客商名称", "标签", "财务客商编码", "注册地址", "营业期限", "纳税人识别号(开票信息)", "成立日期", "所属地区", "组织机构代码", "开户银行", "账户", "所属行业", "公司类型", "行业分类", "联系人", "证件号码", "联系电话", "客商类别", "默认发票类型", "推荐展示", "操作"];

export function MerchantInfoPage() {
  const [tab, setTab] = useState(0);
  return (
    <OpPage>
      <div className="op-card is-plain"><div className="op-card-head"><strong>归档业户列表</strong></div><OpStats items={[["业户总数", "1"], ["企业总数", "0"], ["个人总数", "1"], ["合同数量", "0"]]} /><SkTabs items={["企业列表", "个人列表"]} active={tab} onChange={setTab} /><SkTable className="op-wide-table is-huge" columns={merchantInfoColumns.map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>
    </OpPage>
  );
}

const CONFIGS: Record<string, OpConfig> = {
  "merchant-reward": { title: "商户奖励", tabs: ["全部"], filters: ["状态"], columns: ["单据编号", "业户名称", "所属分类", "奖励积分", "状态", "创建时间", "创建人员", "审核时间", "操作"], buttons: ["重置", "搜索", "+添加商户奖励", "更多"] },
  "merchant-violation": { title: "商户违规", tabs: ["全部"], filters: ["状态"], columns: ["单据编号", "业户名称", "所属分类", "处罚积分", "状态", "整改情况", "整改时间", "创建时间", "创建人员", "审核时间", "操作"], buttons: ["重置", "搜索", "+添加违规处罚", "更多"] },
  store: { title: "店铺列表", filters: ["房号", "业户名称", "联系人", "联系电话", "关联合同编号", "店铺名称", "签约日期"], columns: ["房源号", "业户名称", "联系人", "联系电话", "关联合同编号", "租赁起止时间", "关联品牌", "店铺名称", "店铺状态", "签约日期", "操作"], buttons: ["刷新", "更多"] },
  "short-rental": { title: "短租列表", columns: ["业户名称", "房号", "项目名称", "签署日期", "租赁起始日期", "租赁终止日期", "租赁状态", "租赁单价", "租赁押金", "总金额", "执行进度", "经办人员", "操作"], buttons: ["刷新", "更多"], filters: ["业户名称", "房号", "项目名称"] },
  survey: { title: "我的问卷", filters: ["全部项目", "全部状态"], columns: ["问卷名称", "问卷状态", "提交总数", "创建人员", "有效期限", "创建时间", "操作"], buttons: ["新建问卷"] },
  waiting: { title: "轮候管理列表", stats: [["分居", "0 人"], ["丧偶", "0 人"], ["离婚", "0 人"], ["已婚", "0 人"], ["未婚", "0 人"], ["合计", "0 人"]], filters: ["申请时间", "姓名", "身份证号码", "手机号码", "轮候编号", "轮候状态", "婚姻状况", "资格单号"], columns: ["姓名", "身份证号码", "手机号码", "轮候编号", "轮候状态", "申请类型", "婚姻状况", "资格单号", "意向户型", "意向房源", "预约看房时间", "备注", "操作"], buttons: ["刷新", "业户申请地址", "导出"] },
  "qualification-personal": { title: "个人资格审批列表", tabs: ["全部", "待提交", "初审中", "复审中", "市局审批中", "初审驳回", "复审驳回", "初审不通过", "复审不通过", "市局不通过", "网上公示", "发放资格确认书", "到期作废", "因故作废"], filters: ["性别", "申请时间", "姓名", "身份证号码", "手机号码", "申请单号"], columns: ["姓名", "身份证号码", "手机号码", "性别", "申请单号", "业务类型", "申请状态", "提交时间", "提交次数", "操作"], buttons: ["刷新", "申请材料设置", "导出"] },
  "qualification-unit": { title: "单位资格审批列表", tabs: ["全部", "待提交", "初审中", "复审中", "市局审批中", "初审驳回", "复审驳回", "初审不通过", "复审不通过", "市局不通过", "网上公示", "发放资格确认书", "到期作废", "因故作废"], filters: ["申请时间", "企业名称", "统一信用代码", "企业法人", "单位联系人", "联系人号码", "申请单号"], columns: ["企业名称", "统一信用代码", "企业法人", "单位联系人", "联系人号码", "申请单号", "申请状态", "提交时间", "提交次数", "操作"], buttons: ["刷新", "申请材料设置", "导出"] },
  showings: { title: "看房管理列表", tabs: ["全部", "待处理", "处理中", "已确认", "已签约", "已取消", "不考虑"], filters: ["申请时间", "单据编号", "申请人员", "联系方式", "带看人"], columns: ["单据编号", "单据状态", "申请人员", "联系方式", "申请时间", "看房地址", "预约时间", "可看房期限", "带看人", "操作"], buttons: ["刷新", "导出"] },
  news: { title: "资讯列表", filters: ["新闻标题", "发布人", "发布时间", "发布状态"], columns: ["新闻标题", "发布人", "发布时间", "发布状态"], buttons: ["发布资讯", "分类设置", "设置"] },
  forum: { title: "帖子管理", filters: ["所属话题", "标题", "发布人", "创建时间"], columns: ["标题", "发布人", "创建时间", "排序方式", "项目"], buttons: [] },
  "goods-info": { title: "商品列表", filters: ["商品状态", "商品名称", "商品编号", "助记码"], columns: ["大类名称", "大类编号", "小类名称", "小类编号", "状态", "商品名称", "商品编号", "助记码", "单位", "单价", "管理费", "备注", "操作"], buttons: ["刷新", "新增", "更多"] },
  "cargo-owner": { title: "货主信息列表", stats: [["货主总数", "0人"], ["本月新增", "0人"]], filters: ["货主姓名", "手机号码", "货主分类"], columns: ["货主姓名", "货主编号", "货主状态", "手机号码", "货主分类", "绑定客户", "绑定房间", "当前积分", "创建日期", "附加说明", "操作"], buttons: ["刷新", "货主申请地址", "新增", "更多"] },
  "business-owner": { title: "经营户列表", filters: ["经营户名称", "经营户编号", "手机号码", "证件号码", "发证机关"], columns: ["经营户名称", "经营户编号", "手机号码", "证件号码", "联系电话", "余额", "证件类型", "发证机关", "联系地址", "附加说明", "经营行业", "充值余额", "创建时间", "操作"], buttons: ["刷新", "新增", "车辆设置", "更多"] },
  traceability: { title: "溯源管理列表", filters: ["出场时间", "结算时间", "收款方式", "单据编号"], columns: ["货主姓名", "单据编号", "货主手机号", "经营户姓名", "经营类型", "状态", "产地区", "销售方姓名", "销售方电话", "进货日期", "收款方式", "车牌号", "车型", "结算时间", "出场时间", "货源地址"], buttons: ["刷新", "更多"] },
};

export function OperationCatalogPage({ id }: { id: string }) {
  return <OpGenericPage config={CONFIGS[id]} />;
}

export function ApartmentStatusPage() {
  const { show, node } = useSkMessage();
  return (
    <OpPage><div className="op-empty-hero"><SkEmpty text="暂无楼宇" /><p>可以添加公寓项目，或选择已有楼宇后再查看房态。</p><div className="op-actions"><SkButton variant="primary" onClick={() => show("添加项目")}>添加项目</SkButton><SkButton onClick={() => show("选择楼宇")}>选择楼宇</SkButton></div></div>{node}</OpPage>
  );
}

export function ApartmentDevicePage() {
  return <OpPage><div className="op-empty-hero"><SkEmpty text="暂无楼宇" /></div></OpPage>;
}

export function TodoPage() {
  const [status, setStatus] = useState(0);
  return (
    <OpPage><div className="op-card is-plain"><div className="op-filter-grid is-five"><OfficeField label="状态"><SkSelect options={["所有状态"]} defaultValue="所有状态" /></OfficeField><OfficeField label="发起日期"><SkInput type="date" /></OfficeField><div className="op-filter-actions"><SkButton variant="primary">搜 索</SkButton><SkButton>重 置</SkButton></div></div><div className="op-status-tabs">{["全部(0)", "租赁(0)", "续租(0)", "换房(0)", "退租(0)", "作废(0)"].map((item, index) => <button key={item} type="button" className={index === status ? "is-active" : ""} onClick={() => setStatus(index)}>{item}</button>)}</div><div className="op-empty-box">暂无数据</div></div></OpPage>
  );
}

export function ApartmentCheckInPage() {
  const [status, setStatus] = useState("全部合同");
  return (
    <OpPage>
      <OpStatusLayout statuses={["全部合同", "未入住", "已入住", "已退租", "已作废"]} active={status} onChange={setStatus}>
        <div className="op-card"><div className="op-card-head"><strong>合同</strong><SkButton>更多 ⌄</SkButton></div><div className="op-filter-grid is-five"><OfficeField label="业户名称"><SkInput /></OfficeField><OfficeField label="房屋名称"><SkInput /></OfficeField><OfficeField label="项目名称"><SkSelect placeholder="请选择" /></OfficeField><OfficeField label="合同编号"><SkInput /></OfficeField><div className="op-filter-actions"><SkButton variant="primary">搜索</SkButton></div></div><SkTable className="op-wide-table is-huge" columns={["业户名称", "房屋名称", "项目名称", "合同编号", "签订日期", "单据日期", "单据编号", "租赁起始日期", "租赁终止日期", "合同状态", "合同面积", "租赁单价", "租赁押金", "欠费金额", "执行进度", "经办人员", "合同来源", "物业面积", "物业单价", "合同标签"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>
      </OpStatusLayout>
    </OpPage>
  );
}

const BOOKING_ITEMS = ["会议室管理", "会议室列表", "会议室看板", "实时状态图", "会议室设施", "订单管理", "预存管理", "优惠管理", "设置"];

export function MeetingRoomPage() {
  const [active, setActive] = useState("会议室管理");
  const { show, node } = useSkMessage();
  return (
    <OpPage className="op-booking-page">
      <OpSubSidebar brand="会议室" items={BOOKING_ITEMS} active={active} onChange={setActive} />
      <section className="op-booking-main">
        <div className="op-card-head"><strong>{active}</strong><div className="op-actions"><SkButton>当前：智慧园区</SkButton><SkButton variant="primary" onClick={() => show("添加会议室区域")}>添加会议室区域</SkButton></div></div>
        <SkEmpty text="暂无会议室区域" />
      </section>
      {node}
    </OpPage>
  );
}

export function VenuePage() {
  const [active, setActive] = useState("场地管理");
  const { show, node } = useSkMessage();
  const items = ["场地管理", "场地列表", "场地看板", "实时状态图", "场地设施", "订单管理", "预存管理", "优惠管理", "设置"];
  return (
    <OpPage className="op-booking-page">
      <OpSubSidebar brand="场地预约" items={items} active={active} onChange={setActive} />
      <section className="op-booking-main"><div className="op-card-head"><strong>{active}</strong><div className="op-actions"><SkButton>当前：智慧园区</SkButton><SkButton variant="primary" onClick={() => show("添加场地预约区域")}>添加场地预约区域</SkButton></div></div><SkEmpty text="暂无场地预约区域" /></section>
      {node}
    </OpPage>
  );
}

export function PageDesignPage() {
  const { show, node } = useSkMessage();
  return (
    <OpPage><div className="op-card is-plain"><div className="op-card-head"><strong>用户端装修</strong></div><div className="op-design-grid">{["自定义装修", "首页弹窗广告", "个人中心设置", "底部导航设置"].map((item) => <button key={item} type="button" className="op-design-card" onClick={() => show(item)}>{item}</button>)}</div></div><div className="op-card"><div className="op-card-head"><strong>页面列表</strong><SkButton variant="primary" onClick={() => show("新建页面")}>新建页面</SkButton></div><div className="op-page-cards">{[1, 2].map((item) => <div key={item} className="op-page-card"><strong>默认模板页面</strong><span>最近修改时间：无</span><span>最近操作人：无</span><span>应用项目：无</span><div className="op-actions"><SkButton size="sm" onClick={() => show("进入")}>进入</SkButton><SkButton size="sm" onClick={() => show("复制")}>复制</SkButton><SkButton size="sm" onClick={() => show("预览")}>预览</SkButton><SkButton size="sm" onClick={() => show("设为首页")}>设为首页</SkButton></div></div>)}</div></div>{node}</OpPage>
  );
}

export function ActivitiesPage() {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <OpPage><div className="op-card is-plain"><div className="op-card-head"><strong>物业活动</strong><SkButton variant="primary" onClick={() => show("添加活动")}>添加</SkButton></div><OpStats items={[["待开始", "0个活动"], ["报名中", "0个活动"], ["累计报名人次", "0次"]]} columns={3} /><div className="op-status-tabs">{["全部", "待开始", "报名中", "已结束"].map((item, index) => <button key={item} type="button" className={index === tab ? "is-active" : ""} onClick={() => setTab(index)}>{item}</button>)}</div><SkEmpty text="暂无活动" /></div>{node}</OpPage>
  );
}

export function IcCardPage() {
  const { show, node } = useSkMessage();
  return (
    <OpPage><div className="op-card is-plain"><OpStats items={[["使用中", "0"], ["未使用", "0"], ["挂失", "0"], ["停用", "0"], ["总余额", "1,590.00"]]} columns={5} /><div className="op-filter-grid is-five"><OfficeField label="IC卡状态"><SkSelect placeholder="请选择IC卡状态" /></OfficeField><OfficeField label="卡类别"><SkSelect placeholder="请选择卡类别" /></OfficeField><OfficeField label="卡号"><SkInput /></OfficeField><OfficeField label="卡面编号"><SkInput /></OfficeField><div className="op-filter-actions"><SkButton variant="primary">搜索</SkButton><SkButton>重置</SkButton></div></div></div><div className="op-card"><div className="op-card-head"><strong>IC卡列表</strong><div className="op-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新增成功")}>新增</SkButton><SkButton>更多 ⌄</SkButton></div></div><SkTable className="op-wide-table" columns={["状态", "卡类别", "卡号", "卡面编号", "持卡人", "发卡日期", "余额", "充值金额", "赠送金额", "备注", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>{node}</OpPage>
  );
}

export function EntranceFeePage() {
  const { show, node } = useSkMessage();
  return (
    <OpPage><div className="op-card is-plain"><OpStats items={[["今日进场", "0"], ["本周进场", "0"], ["本月进场", "0"], ["昨日进场", "0"], ["上周进场", "0"], ["上月进场", "0"]]} columns={6} /><div className="op-filter-grid is-five"><OfficeField label="创建时间"><SkInput type="date" /></OfficeField><OfficeField label="收款方式"><SkSelect placeholder="请选择收款方式" /></OfficeField><OfficeField label="状态"><SkSelect placeholder="请选择状态" /></OfficeField><OfficeField label="单据编号"><SkInput /></OfficeField><div className="op-filter-actions"><SkButton variant="primary">搜索</SkButton><SkButton>重置</SkButton></div></div></div><div className="op-card"><div className="op-card-head"><strong>进场列表</strong><div className="op-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新增成功")}>新增</SkButton><SkButton>更多 ⌄</SkButton></div></div><SkTable className="op-wide-table is-huge" columns={["状态", "单据编号", "货源地", "车牌号", "经营户名称", "车型", "结算方式", "收款方式", "实收金额", "结算时间", "应收金额", "出场时间", "进场时间", "销售方姓名", "销售方电话", "货源地址", "经营类型", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>{node}</OpPage>
  );
}
