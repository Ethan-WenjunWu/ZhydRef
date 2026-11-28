"use client";

import { useState } from "react";

import { SpriteIcon } from "../app/icons";
import { SkButton, SkDrawer, SkInput, SkRadio, SkSelect, SkTable, useSkMessage } from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { OpPage } from "../operation/common";

export function IcCardsPage() {
  const { show, node } = useSkMessage();
  const [addOpen, setAddOpen] = useState(false);

  return (
    <OpPage>
      <div className="op-card cus-ic-page">
        <div className="cus-ic-head">
          <strong>IC卡列表</strong>
          <SkButton variant="outline" onClick={() => setAddOpen(true)}>+ 添加IC卡</SkButton>
        </div>
        <div className="cus-ic-filter">
          <OfficeField label="业户"><SkSelect placeholder="请选择业户" options={["A01"]} /></OfficeField>
          <OfficeField label="IC卡号"><SkInput placeholder="请输入IC卡号" /></OfficeField>
          <div className="cus-ic-actions">
            <SkButton variant="primary" onClick={() => show("查询成功")}>搜 索</SkButton>
            <SkButton onClick={() => show("重置成功")}>重 置</SkButton>
          </div>
        </div>
        <div className="cus-rfid">
          <span className="cus-rfid-dot" />
          <span>RFID读卡未启动</span>
          <button type="button" className="cus-rfid-icon" aria-label="refresh" onClick={() => show("读卡器未启动")}>⟳</button>
          <button type="button" className="cus-rfid-icon" aria-label="download" onClick={() => show("请先安装读卡驱动")}>⤓</button>
        </div>
        <SkTable
          className="op-wide-table"
          columns={["楼宇", "业户", "用户姓名", "用户手机号", "IC卡号", "状态", "操作"].map((title) => ({ key: title, title }))}
          rows={[]}
        />
      </div>
      <IcCardDrawer open={addOpen} onClose={() => setAddOpen(false)} onSave={() => { setAddOpen(false); show("保存成功"); }} />
      {node}
    </OpPage>
  );
}

export function IcCardDrawer({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const [enabled, setEnabled] = useState(true);
  return (
    <SkDrawer
      open={open}
      title="添加IC卡"
      width={600}
      onClose={onClose}
      footer={
        <>
          <SkButton onClick={onClose}>关 闭</SkButton>
          <SkButton variant="primary" onClick={onSave}>保 存</SkButton>
        </>
      }
    >
      <div className="cus-form-grid">
        <OfficeField label="业户" required>
          <div className="cus-input-with-icon">
            <SkInput placeholder="可直接录入名称搜索" />
            <span className="cus-input-icon"><SpriteIcon name="org-menu-zuke" /></span>
          </div>
        </OfficeField>
        <OfficeField label="用户" required><SkSelect placeholder="请选择用户" options={["A01"]} /></OfficeField>
        <OfficeField label="IC卡号" required><SkInput placeholder="请输入IC卡号" /></OfficeField>
        <OfficeField label="状态" required>
          <div className="cus-inline">
            <SkRadio label="正常" checked={enabled} onChange={() => setEnabled(true)} />
            <SkRadio label="禁止" checked={!enabled} onChange={() => setEnabled(false)} />
          </div>
        </OfficeField>
      </div>
    </SkDrawer>
  );
}
