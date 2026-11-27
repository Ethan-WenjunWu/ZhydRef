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

export function ExpressPage() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [company, setCompany] = useState("");
  const [receiver, setReceiver] = useState("");
  const [phone, setPhone] = useState("");
  const [room, setRoom] = useState("");
  const { show, node } = useSkMessage();

  return (
    <div className="pp-page pp-plain-page">
      <div className="pp-content-card is-plain">
        <div className="pp-search-top"><span>未选择筛选字段</span><span className="pp-search-top-actions"><span className="sk-link">清除选项</span><span>收起 ⌃</span></span></div>
        <div className="pp-filter-grid is-five">
          <OfficeField label="快递单号"><SkInput /></OfficeField>
          <OfficeField label="快递公司"><SkSelect placeholder="请选择快递公司" options={["顺丰", "中通", "圆通", "韵达"]} /></OfficeField>
          <OfficeField label="收货人"><SkInput /></OfficeField>
          <OfficeField label="手机号码"><SkInput /></OfficeField>
          <div className="pp-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
        </div>
      </div>
      <div className="pp-list-card">
        <div className="pp-list-head">
          <span />
          <div className="pp-toolbar-actions">
            <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
            <SkButton variant="primary" onClick={() => setOpen(true)}>添加快递</SkButton>
            <SkButton>更多 ⌄</SkButton>
          </div>
        </div>
        <SkTable
          className="pp-wide-table"
          columns={["快递单号", "快递公司", "收货人", "手机号码", "房间", "状态", "配送方式", "添加时间", "取货时间", "操作"].map((title, index) => ({ key: String(index), title }))}
          rows={[]}
        />
      </div>
      <SkModal
        open={open}
        title="添加快递"
        width={560}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!code.trim() || !receiver.trim()) {
                  show("请输入快递单号和收货人");
                  return;
                }
                setOpen(false);
                show("添加快递成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <div className="pp-modal-form">
          <OfficeField label="快递单号" required><SkInput value={code} onChange={setCode} /></OfficeField>
          <OfficeField label="快递公司"><SkSelect value={company} options={["顺丰", "中通", "圆通", "韵达"]} onChange={setCompany} placeholder="请选择" /></OfficeField>
          <OfficeField label="收货人" required><SkInput value={receiver} onChange={setReceiver} /></OfficeField>
          <OfficeField label="手机号码"><SkInput value={phone} onChange={setPhone} /></OfficeField>
          <OfficeField label="房间"><SkInput value={room} onChange={setRoom} /></OfficeField>
        </div>
      </SkModal>
      {node}
    </div>
  );
}
