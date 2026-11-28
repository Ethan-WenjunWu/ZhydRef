"use client";

import { useState } from "react";

import {
  SkButton,
  SkInput,
  SkModal,
  SkSelect,
  SkTable,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { OpPage, OpStatusLayout } from "./common";

type CheckKind = "checkin" | "checkout" | "decoration";

const CONFIG: Record<CheckKind, {
  title: string;
  statuses: string[];
  columns: string[];
  buttons: string[];
  stats?: Array<[string, string]>;
  filters?: string[];
}> = {
  checkin: {
    title: "进场列表",
    statuses: ["所有状态", "待提交", "审批中", "已进场", "已退场", "已作废"],
    columns: ["状态", "单据日期", "单据编号", "进场日期", "承租人名称", "房屋描述", "经办人", "进场说明"],
    buttons: ["刷新", "新增", "更多"],
  },
  checkout: {
    title: "退场列表",
    statuses: ["所有状态", "待提交", "审批中", "已退场", "已作废"],
    columns: ["状态", "单据日期", "单据编号", "退场日期", "承租人名称", "房屋描述", "经办人", "退场说明"],
    buttons: ["刷新", "更多"],
  },
  decoration: {
    title: "申请记录",
    statuses: ["所有状态", "未提交", "审批中", "进行中", "已完成", "验收中", "验收完成", "审批不通过"],
    columns: ["状态", "单据编号", "通行证", "单据日期", "房间信息", "申请人", "联系电话", "装修面积", "施工单位", "备注", "操作"],
    buttons: ["刷新", "新增", "更多"],
    stats: [["审批中", "0"], ["进行中", "0"], ["已完成", "0"], ["验收中", "0"], ["验收通过", "0"], ["验收不通过", "0"]],
    filters: ["单据编号", "单据日期", "申请人"],
  },
};

function CheckModal({
  open,
  kind,
  onClose,
}: {
  open: boolean;
  kind: CheckKind;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [company, setCompany] = useState("");
  const [tenant, setTenant] = useState("");
  const [brand, setBrand] = useState("");
  const [handler, setHandler] = useState("王");
  const [note, setNote] = useState("");
  const { show, node } = useSkMessage();
  const title = kind === "checkout" ? "退场" : kind === "decoration" ? "装修" : "进场";

  return (
    <>
      <SkModal
        open={open}
        title="新增"
        width={1200}
        onClose={onClose}
        footer={
          <>
            <SkButton onClick={onClose}>取 消</SkButton>
            {step > 0 ? <SkButton onClick={() => setStep(step - 1)}>上一步</SkButton> : null}
            {step < 2 ? <SkButton onClick={() => {
              if (step === 0 && (!company || !tenant)) {
                show("请选择所属公司和房屋承租人");
                return;
              }
              setStep(step + 1);
            }}>下一步</SkButton> : null}
            <SkButton onClick={() => show("草稿保存成功")}>保存草稿</SkButton>
            <SkButton variant="primary" onClick={() => { show("提交成功"); onClose(); }}>提 交</SkButton>
          </>
        }
      >
        <div className="op-stepper">
          {`1基础信息,2抄表及物品,3入住协议、材料与事项`.split(",").map((label, index) => (
            <button key={label} type="button" className={index === step ? "is-active" : ""} onClick={() => setStep(index)}>{label}</button>
          ))}
        </div>
        {step === 0 ? (
          <>
            <div className="op-form-section"><span />基本信息</div>
            <div className="op-form-grid is-three">
              <OfficeField label="所属公司" required><SkSelect placeholder="请选择所属公司" value={company} options={["大连华安物业管理有限公司"]} onChange={setCompany} /></OfficeField>
              <OfficeField label="单据编号"><SkInput placeholder="系统自动编号" disabled /></OfficeField>
              <OfficeField label="单据日期" required><SkInput type="date" defaultValue="2026-11-28" /></OfficeField>
              <OfficeField label="签约日期" required><SkInput type="date" defaultValue="2026-11-28" /></OfficeField>
              <OfficeField label="租赁起始日期" required><SkInput type="date" defaultValue="2026-11-28" /></OfficeField>
              <OfficeField label="租赁结束日期" required><SkInput type="date" defaultValue="2027-11-27" /></OfficeField>
              <OfficeField label="交房日期" required><SkInput type="date" defaultValue="2026-11-28" /></OfficeField>
              <OfficeField label="装修起始日期"><SkInput type="date" /></OfficeField>
              <OfficeField label="装修终止日期"><SkInput type="date" /></OfficeField>
              <OfficeField label="进场日期" required><SkInput type="date" defaultValue="2026-11-28" /></OfficeField>
              <OfficeField label="经办人" required><SkInput value={handler} onChange={setHandler} /></OfficeField>
              <OfficeField label="品牌名称"><SkSelect placeholder="请选择品牌名称" value={brand} options={["快鲸", "测试品牌"]} onChange={setBrand} /></OfficeField>
              <OfficeField label="房屋承租人" required><SkInput placeholder="可直接录入名称搜索" value={tenant} onChange={setTenant} /></OfficeField>
              <OfficeField label="进场说明" className="is-full"><textarea className="sk-textarea" value={note} onChange={(event) => setNote(event.target.value)} placeholder={`请输入${title}说明`} /></OfficeField>
            </div>
            <div className="op-form-section"><span />房屋信息<SkButton variant="primary" onClick={() => show("添加房屋")}>+ 添加</SkButton></div>
            <SkTable columns={[{ key: "name", title: "房屋名称" }, { key: "code", title: "房屋编号" }, { key: "area", title: "建筑面积" }, { key: "status", title: "经营状态" }, { key: "op", title: "操作" }]} rows={[]} emptyText="暂无数据" />
            <div className="op-form-section"><span />附件列表</div>
            <SkTable columns={[{ key: "name", title: "文件名" }, { key: "person", title: "操作人" }, { key: "time", title: "操作时间" }, { key: "op", title: "操作" }]} rows={[]} emptyText="暂无数据" />
          </>
        ) : step === 1 ? (
          <>
            <div className="op-form-section"><span />抄表及物品</div>
            <div className="op-form-grid is-three">
              <OfficeField label="水表读数"><SkInput placeholder="请输入水表读数" /></OfficeField>
              <OfficeField label="电表读数"><SkInput placeholder="请输入电表读数" /></OfficeField>
              <OfficeField label="燃气表读数"><SkInput placeholder="请输入燃气表读数" /></OfficeField>
            </div>
            <SkTable columns={[{ key: "name", title: "物品名称" }, { key: "count", title: "数量" }, { key: "status", title: "状态" }, { key: "op", title: "操作" }]} rows={[]} emptyText="暂无物品" />
          </>
        ) : (
          <>
            <div className="op-form-section"><span />入住协议、材料与事项</div>
            <div className="op-form-grid is-three">
              <OfficeField label="入住协议"><label className="op-upload">点击上传</label></OfficeField>
              <OfficeField label="材料清单"><label className="op-upload">点击上传</label></OfficeField>
              <OfficeField label="事项"><SkInput placeholder="请输入事项" /></OfficeField>
            </div>
            <div className="op-actions"><SkButton onClick={() => show("打印模板")}>打印模板</SkButton></div>
          </>
        )}
      </SkModal>
      {node}
    </>
  );
}

export function CheckInOutPage({ kind }: { kind: CheckKind }) {
  const config = CONFIG[kind];
  const [status, setStatus] = useState("所有状态");
  const [open, setOpen] = useState(false);
  const { show, node } = useSkMessage();
  const rows = kind === "checkin"
    ? [["已作废", "2026-11-26", "JC-20261126141641848", "2026-11-26", "A01", "智慧园区/宿舍楼01/5/01", "王", "租赁合同自动生成"]]
    : kind === "checkout"
      ? [["待提交", "2026-11-26", "TC-20261126160311922", "2026-11-26", "A01", "智慧园区/宿舍楼01/5/01", "王", "退租合同自动生成，退租原因：个人原因"]]
      : [];
  return (
    <OpPage className="op-check-page">
      <OpStatusLayout statuses={config.statuses} active={status} onChange={setStatus} stats={config.stats}>
        {config.filters ? <div className="op-card is-plain"><div className="op-filter-grid">
          {config.filters.map((label) => <OfficeField key={label} label={label}>{label === "单据日期" ? <SkInput type="date" /> : <SkInput />}</OfficeField>)}
          <div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
        </div></div> : null}
        <div className="op-card">
          <div className="op-card-head"><strong>{config.title}</strong><div className="op-actions">{config.buttons.map((button) => <SkButton key={button} variant={button === "新增" ? "primary" : "default"} onClick={() => button === "新增" ? setOpen(true) : show(button)}>{button}</SkButton>)}</div></div>
          <SkTable
            className="op-wide-table"
            columns={config.columns.map((title, index) => ({ key: String(index), title }))}
            rows={rows.map((row) => row.map((cell, index) => index === 0 ? <span key="s" className={`op-tag ${cell === "已作废" ? "is-gray" : "is-orange"}`}>{cell}</span> : cell))}
            emptyText="暂无数据"
          />
        </div>
      </OpStatusLayout>
      {(kind === "checkin" || kind === "decoration") ? <CheckModal open={open} kind={kind} onClose={() => setOpen(false)} /> : null}
      {node}
    </OpPage>
  );
}

export function CheckInPage() { return <CheckInOutPage kind="checkin" />; }
export function CheckOutPage() { return <CheckInOutPage kind="checkout" />; }
export function DecorationPage() { return <CheckInOutPage kind="decoration" />; }
