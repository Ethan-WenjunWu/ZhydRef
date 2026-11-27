"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

import { SpriteIcon } from "../app/icons";
import {
  SkButton,
  SkInput,
  SkModal,
  SkSwitch,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "./common";

const FOLDERS = [
  { name: "收件箱", icon: "user-mail-shoujianxiang" },
  { name: "星标邮件", icon: "user-mail-xingbiao" },
  { name: "草稿箱", icon: "user-mail-caogaoxiang" },
  { name: "已发送", icon: "user-mail-yifasong" },
  { name: "已删除", icon: "user-mail-yishanchu" },
  { name: "已归档", icon: "user-mail-yiguidang" },
  { name: "垃圾邮件", icon: "user-mail-lajiyoujian" },
];

type Mail = {
  id: number;
  folder: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  time: string;
};

export function OfficeMailPage() {
  const [folder, setFolder] = useState("收件箱");
  const [keyword, setKeyword] = useState("");
  const [mails, setMails] = useState<Mail[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [signature, setSignature] = useState(true);
  const { show, node } = useSkMessage();

  const list = mails.filter(
    (mail) => mail.folder === folder && (!keyword || mail.subject.includes(keyword)),
  );
  const selected = mails.find((mail) => mail.id === selectedId) ?? null;

  const send = () => {
    if (!to.trim()) {
      show("请输入收件人");
      return;
    }
    if (!subject.trim()) {
      show("请输入邮件主题");
      return;
    }
    setMails((current) => [
      ...current,
      {
        id: Date.now(),
        folder: "已发送",
        from: "王",
        to,
        subject,
        content,
        time: "2026-11-27 21:55",
      },
    ]);
    setComposeOpen(false);
    setTo("");
    setCc("");
    setSubject("");
    setContent("");
    setFolder("已发送");
    show("发送成功");
  };

  return (
    <div className="of-mail-page">
      <aside className="of-mail-side">
        <div className="of-mail-brand">
          <strong>内部邮箱</strong>
          <span className="of-mail-switch" title="切换账号">⇄</span>
          <button type="button" className="of-mail-gear" onClick={() => setSettingsOpen(true)}>
            <SpriteIcon name="user-shezhi-xianxing" />
          </button>
        </div>
        <div className="of-mail-search">
          <SkInput placeholder="搜索邮件" value={keyword} onChange={setKeyword} />
          <span>⌕</span>
        </div>
        <SkButton variant="primary" className="of-mail-write" onClick={() => setComposeOpen(true)}>
          + 写邮件
        </SkButton>
        <div className="of-mail-folders">
          {FOLDERS.map((item) => (
            <button
              key={item.name}
              type="button"
              className={`of-mail-folder${folder === item.name ? " is-active" : ""}`}
              onClick={() => {
                setFolder(item.name);
                setSelectedId(null);
              }}
            >
              <SpriteIcon name={item.icon} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="of-mail-list-panel">
        <div className="of-mail-list-head">
          <span className="of-mail-checkbox" />
          <strong>{folder}</strong>
          <button type="button" className="of-mail-refresh" onClick={() => show("刷新成功")}>
            <SpriteIcon name="user-mail-shuaxin" />
          </button>
          <button type="button" className="of-mail-filter" onClick={() => show("筛选")}>
            <SpriteIcon name="user-mail-fliter" />
          </button>
        </div>
        {list.length ? (
          <div className="of-mail-rows">
            {list.map((mail) => (
              <button
                key={mail.id}
                type="button"
                className={`of-mail-row${selectedId === mail.id ? " is-active" : ""}`}
                onClick={() => setSelectedId(mail.id)}
              >
                <strong>{mail.subject}</strong>
                <span>{mail.to}</span>
                <time>{mail.time}</time>
              </button>
            ))}
          </div>
        ) : (
          <div className="of-mail-empty">
            <img src="/sites/kuaijing/office/mail-empty.png" alt="" />
            <p>{folder}中没有邮件</p>
          </div>
        )}
      </section>

      <section className="of-mail-detail">
        {selected ? (
          <div className="of-mail-detail-inner">
            <div className="of-mail-detail-head">
              <h2>{selected.subject}</h2>
              <div>发件人：{selected.from} · 收件人：{selected.to}</div>
              <div>{selected.time}</div>
            </div>
            <div className="of-mail-detail-body">{selected.content || "（无正文）"}</div>
          </div>
        ) : (
          <div className="of-mail-welcome">
            <img src="/sites/kuaijing/office/mail.png" alt="" />
            <p>欢迎使用</p>
          </div>
        )}
      </section>

      <SkModal
        open={composeOpen}
        title={subject || "(无主题)"}
        width={880}
        onClose={() => setComposeOpen(false)}
        className="of-compose-modal"
        footer={
          <>
            <SkButton onClick={() => show("已设置定时发送")}>定时发送</SkButton>
            <SkButton variant="primary" onClick={send}>发 送</SkButton>
          </>
        }
      >
        <div className="of-compose">
          <div className="of-compose-row"><span>发件人：</span><strong>王</strong></div>
          <div className="of-compose-row">
            <span>收件人：</span>
            <SkInput value={to} onChange={setTo} placeholder="请输入收件人" />
            <button type="button" onClick={() => show("选择联系人")}>⊕</button>
          </div>
          <div className="of-compose-row">
            <span>抄送：</span>
            <SkInput value={cc} onChange={setCc} placeholder="请输入抄送人" />
            <button type="button" onClick={() => show("选择联系人")}>⊕</button>
          </div>
          <div className="of-compose-row">
            <span>主题：</span>
            <SkInput value={subject} onChange={setSubject} placeholder="请输入邮件主题" />
          </div>
          <div className="of-editor-toolbar">
            {["文件", "编辑", "插入", "视图", "格式", "表格"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="of-editor-toolbar is-icons">
            {["↶", "↷", "12pt", "B", "I", "A", "≡", "☰", "☷", "X₂", "X²", "⇤"].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
          <textarea
            className="of-mail-editor"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
      </SkModal>

      <SkModal
        open={settingsOpen}
        title="邮箱设置"
        width={480}
        onClose={() => setSettingsOpen(false)}
        footer={<SkButton variant="primary" onClick={() => { setSettingsOpen(false); show("保存成功"); }}>保 存</SkButton>}
      >
        <OfficeField label="自动添加签名">
          <SkSwitch checked={signature} onChange={setSignature} />
        </OfficeField>
        <OfficeField label="签名内容">
          <textarea className="sk-textarea" defaultValue={"王\n大连华安物业管理有限公司"} />
        </OfficeField>
      </SkModal>
      {node}
    </div>
  );
}
