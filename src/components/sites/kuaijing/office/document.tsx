"use client";

import { useState } from "react";

import { SpriteIcon } from "../app/icons";
import {
  SkButton,
  SkCard,
  SkEmpty,
  SkInput,
  SkModal,
  SkSelect,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "./common";

type DocRow = {
  id: number;
  title: string;
  type: string;
  from: string;
  time: string;
  node: string;
};

const DOC_MENU = [
  "公文总览",
  "收文库",
  "发文库",
  "归档库",
];

export function OfficeDocumentPage() {
  const [menu, setMenu] = useState("公文总览");
  const [templateOpen, setTemplateOpen] = useState(true);
  const [tab, setTab] = useState(0);
  const [rows, setRows] = useState<DocRow[]>([]);
  const [receiveOpen, setReceiveOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState("");
  const [from, setFrom] = useState("");
  const [date, setDate] = useState("");
  const { show, node } = useSkMessage();

  const addDoc = (kind: "收文" | "发文") => {
    if (!title.trim()) {
      show("请输入公文标题");
      return;
    }
    setRows((current) => [
      ...current,
      {
        id: Date.now(),
        title,
        type: docType || kind,
        from: from || (kind === "收文" ? "大连华安物业管理有限公司" : "王"),
        time: date || "2026-11-27",
        node: kind === "收文" ? "办公室" : "待审批",
      },
    ]);
    setReceiveOpen(false);
    setSendOpen(false);
    setTitle("");
    setDocType("");
    setFrom("");
    setDate("");
    show(kind === "收文" ? "收文登记成功" : "发文拟稿成功");
  };

  return (
    <div className="of-page of-doc-page">
      <aside className="of-doc-side">
        <div className="of-doc-brand">
          <span className="of-doc-logo"><SpriteIcon name="org-menu-gongwenguanli" /></span>
          <strong>公文管理</strong>
        </div>
        <div className="of-doc-menu">
          {DOC_MENU.map((item) => (
            <button
              key={item}
              type="button"
              className={`of-doc-menu-item${menu === item ? " is-active" : ""}`}
              onClick={() => setMenu(item)}
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            className={`of-doc-menu-item of-doc-menu-group${templateOpen ? " is-open" : ""}`}
            onClick={() => setTemplateOpen((open) => !open)}
          >
            模板管理
            <span className="of-doc-caret">⌃</span>
          </button>
          {templateOpen
            ? ["收文模板", "发文模板", "公章管理", "其他设置"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`of-doc-menu-item is-child${menu === item ? " is-active" : ""}`}
                  onClick={() => setMenu(item)}
                >
                  {item}
                </button>
              ))
            : null}
        </div>
      </aside>

      <section className="of-doc-main">
        {menu === "公文总览" ? (
          <>
            <div className="of-doc-top">
              <SkCard className="of-doc-actions-card">
                <div className="of-title">收文发文</div>
                <div className="of-doc-action-tiles">
                  <button type="button" className="of-doc-tile is-blue" onClick={() => setReceiveOpen(true)}>
                    <SpriteIcon name="icon-shouwen" />
                    <span>收文登记</span>
                  </button>
                  <span className="of-doc-divider" />
                  <button type="button" className="of-doc-tile is-pink" onClick={() => setSendOpen(true)}>
                    <SpriteIcon name="icon-fawen" />
                    <span>发文拟稿</span>
                  </button>
                </div>
              </SkCard>
              <SkCard className="of-doc-stats-card">
                <div className="of-title">我的公文</div>
                <div className="of-doc-stats">
                  {["待办", "已办", "待阅", "已阅"].map((item) => (
                    <div key={item}>
                      <strong>0</strong>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </SkCard>
            </div>
            <SkCard className="of-doc-list-card">
              <SkTabs
                items={["待办公文", "已办公文", "待阅公文", "已阅公文"]}
                active={tab}
                onChange={setTab}
              />
              <SkTable
                columns={[
                  { key: "title", title: "公文标题" },
                  { key: "type", title: "公文类型" },
                  { key: "from", title: "来自人员" },
                  { key: "time", title: "接收时间" },
                  { key: "node", title: "当前节点" },
                ]}
                rows={rows.map((row) => [row.title, row.type, row.from, row.time, row.node])}
              />
            </SkCard>
          </>
        ) : (
          <SkCard className="of-doc-sub">
            <div className="of-toolbar">
              <div className="of-title">{menu}</div>
              <SkButton variant="primary" onClick={() => setReceiveOpen(true)}>
                {menu === "发文库" || menu === "发文模板" ? "新增发文" : "新增"}
              </SkButton>
            </div>
            <SkEmpty text={`暂无${menu}数据`} />
          </SkCard>
        )}
      </section>

      <SkModal
        open={receiveOpen}
        title="收文登记"
        width={640}
        onClose={() => setReceiveOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setReceiveOpen(false)}>取 消</SkButton>
            <SkButton variant="primary" onClick={() => addDoc("收文")}>保 存</SkButton>
          </>
        }
      >
        <div className="of-modal-form">
          <OfficeField label="公文标题" required>
            <SkInput value={title} onChange={setTitle} placeholder="请输入公文标题" />
          </OfficeField>
          <OfficeField label="公文类型">
            <SkSelect value={docType} onChange={setDocType} placeholder="请选择" options={["通知", "请示", "报告", "函"]} />
          </OfficeField>
          <OfficeField label="来文单位">
            <SkInput value={from} onChange={setFrom} placeholder="请输入来文单位" />
          </OfficeField>
          <OfficeField label="接收时间">
            <SkInput type="date" value={date} onChange={setDate} />
          </OfficeField>
        </div>
      </SkModal>

      <SkModal
        open={sendOpen}
        title="发文拟稿"
        width={640}
        onClose={() => setSendOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setSendOpen(false)}>取 消</SkButton>
            <SkButton variant="primary" onClick={() => addDoc("发文")}>保 存</SkButton>
          </>
        }
      >
        <div className="of-modal-form">
          <OfficeField label="公文标题" required>
            <SkInput value={title} onChange={setTitle} placeholder="请输入公文标题" />
          </OfficeField>
          <OfficeField label="公文类型">
            <SkSelect value={docType} onChange={setDocType} placeholder="请选择" options={["通知", "请示", "报告", "函"]} />
          </OfficeField>
          <OfficeField label="主送人员">
            <SkInput value={from} onChange={setFrom} placeholder="请选择主送人员" />
          </OfficeField>
          <OfficeField label="拟稿日期">
            <SkInput type="date" value={date} onChange={setDate} />
          </OfficeField>
        </div>
      </SkModal>
      {node}
    </div>
  );
}
