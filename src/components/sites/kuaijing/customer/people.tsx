"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { SpriteIcon } from "../app/icons";
import {
  SkActionLink,
  SkButton,
  SkCheckbox,
  SkConfirm,
  SkDrawer,
  SkInput,
  SkModal,
  SkPagination,
  SkSelect,
  SkSwitch,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { OpPage } from "../operation/common";
import { CusMenu, ExtendFieldsDrawer, ImportModal, TagsDrawer } from "./common";
import { IcCardDrawer } from "./ic-cards";

const PERSON_COLUMNS = ["所属业户", "人员姓名", "手机号", "邮箱", "身份", "状态", "照片状态", "操作"];

export function PeoplePage() {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [icOpen, setIcOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [fullOpen, setFullOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [extendOpen, setExtendOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState<"owner" | "industry" | null>(null);
  const { show, node } = useSkMessage();

  const row = [
    "A01",
    "A01",
    <span key="phone" className="cus-phone-cell">+86 131****0000 <i className="cus-eye" /></span>,
    "--",
    "员工/普通人员",
    <span key="status" className="cus-status"><i />已审核</span>,
    <span key="photo" className="cus-link">待检测</span>,
    <span key="ops" className="cus-op-links">
      <SkActionLink onClick={() => setIcOpen(true)}>IC卡</SkActionLink>
      <SkActionLink onClick={() => { setFormMode("edit"); setFormOpen(true); }}>编辑</SkActionLink>
      <SkActionLink danger onClick={() => setDeleteOpen(true)}>删除</SkActionLink>
    </span>,
  ];

  return (
    <OpPage>
      <div className="op-card is-plain">
        <div className="cus-filter-grid">
          <OfficeField label="关键字"><SkInput placeholder="请输入人员姓名、手机号或邮箱" /></OfficeField>
          <OfficeField label="所属业户">
            <div className="cus-input-with-icon">
              <SkInput placeholder="可直接录入名称搜索" />
              <span className="cus-input-icon"><SpriteIcon name="org-menu-zuke" /></span>
            </div>
          </OfficeField>
          <OfficeField label="所属楼宇"><SkSelect placeholder="请选择项目/楼宇" /></OfficeField>
          <OfficeField label="用户身份"><SkSelect placeholder="请选择用户身份" /></OfficeField>
          <OfficeField label="审核状态"><SkSelect placeholder="请选择审核状态" /></OfficeField>
          <OfficeField label="照片状态"><SkSelect placeholder="请选择照片状态" /></OfficeField>
          <OfficeField label="绑定房间"><SkSelect placeholder="请选择" /></OfficeField>
          <div className="cus-filter-actions">
            <SkButton onClick={() => show("重置成功")}>重 置</SkButton>
            <SkButton variant="primary" onClick={() => show("查询成功")}>搜 索</SkButton>
          </div>
        </div>
      </div>

      <div className="op-card cus-table-card">
        <div className="cus-table-head">
          <strong className="cus-card-title">业户人员列表</strong>
          <div className="op-actions">
            <SkButton onClick={() => setFullOpen(true)}>⛶ 放大</SkButton>
            <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
            <SkButton onClick={() => router.push("/orgs/customer/ic-cards")}>IC卡管理</SkButton>
            <SkButton variant="primary" onClick={() => { setFormMode("add"); setFormOpen(true); }}>+ 新增</SkButton>
            <CusMenu
              items={[
                { key: "import", label: "导入数据", onClick: () => setImportOpen(true) },
                { key: "export", label: "导出数据", onClick: () => show("导出成功") },
                { key: "extend", label: "拓展字段", onClick: () => setExtendOpen(true) },
                { key: "owner-tag", label: "客商标签", onClick: () => setTagsOpen("owner") },
                { key: "industry-tag", label: "行业标签", onClick: () => setTagsOpen("industry") },
              ]}
            />
          </div>
        </div>
        <SkTable
          className="op-wide-table"
          columns={PERSON_COLUMNS.map((title) => ({ key: title, title }))}
          rows={[row]}
        />
        <SkPagination total={1} pageSize={20} />
      </div>

      <PersonFormDrawer
        open={formOpen}
        mode={formMode}
        onClose={() => setFormOpen(false)}
        onSave={() => { setFormOpen(false); show("保存成功"); }}
        message={show}
      />
      <IcCardDrawer open={icOpen} onClose={() => setIcOpen(false)} onSave={() => { setIcOpen(false); show("保存成功"); }} />
      <SkConfirm
        open={deleteOpen}
        content="确认删除该业户人员吗？"
        okText="确 认"
        onCancel={() => setDeleteOpen(false)}
        onOk={() => { setDeleteOpen(false); show("删除成功"); }}
        danger
      />
      <SkModal
        open={fullOpen}
        title="业户人员列表"
        width="90vw"
        onClose={() => setFullOpen(false)}
      >
        <SkTable className="op-wide-table" columns={PERSON_COLUMNS.map((title) => ({ key: title, title }))} rows={[row]} />
      </SkModal>
      <ImportModal open={importOpen} title="导入人员" onClose={() => setImportOpen(false)} onConfirm={() => { setImportOpen(false); show("导入成功"); }} />
      <ExtendFieldsDrawer open={extendOpen} onClose={() => setExtendOpen(false)} message={show} />
      <TagsDrawer open={tagsOpen === "owner"} title="客商标签" addTitle="新建客商标签" onClose={() => setTagsOpen(null)} message={show} />
      <TagsDrawer open={tagsOpen === "industry"} title="行业标签" addTitle="新建行业标签" onClose={() => setTagsOpen(null)} message={show} />
      {node}
    </OpPage>
  );
}

export function PersonFormDrawer({
  open,
  mode,
  onClose,
  onSave,
  message,
}: {
  open: boolean;
  mode: "add" | "edit";
  onClose: () => void;
  onSave: () => void;
  message: (text: string) => void;
}) {
  const [tab, setTab] = useState(0);
  const [noPhone, setNoPhone] = useState(false);
  const [status, setStatus] = useState("已审核");
  const isEdit = mode === "edit";

  return (
    <SkDrawer
      open={open}
      title={isEdit ? "编辑业户人员" : "新增业户人员"}
      width={1000}
      onClose={onClose}
      footer={
        <>
          <SkButton onClick={onClose}>取 消</SkButton>
          <SkButton variant="primary" onClick={onSave}>保 存</SkButton>
        </>
      }
    >
      <SkTabs items={["基本信息", "用户详细信息"]} active={tab} onChange={setTab} />
      {tab === 0 ? (
        <div className="cus-form-grid is-two">
          <OfficeField label="姓名" required><SkInput placeholder="请输入姓名" defaultValue={isEdit ? "A01" : undefined} /></OfficeField>
          <OfficeField label="手机号" required>
            <div className="cus-phone-row">
              <span>+86</span>
              <SkInput placeholder="请输入手机号" defaultValue={isEdit ? "13100000000" : undefined} />
              <SkCheckbox label="无手机号" checked={noPhone} onChange={setNoPhone} />
            </div>
          </OfficeField>
          <OfficeField label="所属业户" required>
            <div className="cus-inline">
              <SkSelect placeholder="可直接录入名称搜索" defaultValue={isEdit ? "A01" : ""} options={["A01"]} />
              <span className="cus-input-icon"><SpriteIcon name="org-menu-zuke" /></span>
            </div>
          </OfficeField>
          <OfficeField label="身份" required><SkSelect defaultValue="老板/超级管理员" options={["老板/超级管理员", "员工/普通人员"]} /></OfficeField>
          <OfficeField label="邮箱"><SkInput placeholder="请输入邮箱" defaultValue={isEdit ? "--" : undefined} /></OfficeField>
          <OfficeField label="证件类型"><SkSelect defaultValue="身份证" options={["身份证", "护照", "港澳通行证", "台胞证"]} /></OfficeField>
          <OfficeField label="证件号码：">
            <div className="cus-inline">
              <SkInput placeholder="请输入证件号码" />
              <button type="button" className="sk-link" onClick={() => message("读取证件成功")}>读取证件</button>
            </div>
          </OfficeField>
          <OfficeField label="出生日期">
            <div className="cus-date-row">
              <span>年</span><SkInput /><span>月</span><SkInput /><span>日</span><SkInput />
            </div>
          </OfficeField>
          <OfficeField label="性别"><SkSelect defaultValue="男" options={["男", "女"]} /></OfficeField>
          <OfficeField label="状态">
            <SkSelect value={status} onChange={setStatus} options={["已审核", "待审核", "已拒绝"]} />
          </OfficeField>
          <OfficeField label="房间权限"><SkSelect placeholder="请选择" /></OfficeField>
          <OfficeField label="通讯地址"><SkInput placeholder="请输入" /></OfficeField>
          <OfficeField label="人脸照片">
            <div className="cus-face-actions">
              <SkButton onClick={() => message("选择图片")}>选择图片</SkButton>
              <SkButton onClick={() => message("拍照上传")}>拍照上传</SkButton>
              <SkButton onClick={() => message("手机拍照")}>手机拍照</SkButton>
            </div>
          </OfficeField>
          <OfficeField label="证件照片">
            <div className="cus-photo-row">
              {["上传身份证人像面", "上传身份证国徽面", "上传手持身份证照"].map((text) => (
                <button key={text} type="button" className="cus-photo" onClick={() => message("上传成功")}>
                  <span className="cus-photo-icon" />
                  <small>{text}</small>
                </button>
              ))}
            </div>
          </OfficeField>
          <OfficeField label="备注">
            <textarea className="sk-input cus-textarea" />
          </OfficeField>
        </div>
      ) : (
        <div className="op-card is-plain">
          <div className="cus-alert">用户详细信息为保存用户后自动生成的登录账号信息。</div>
          <div className="cus-form-grid is-two">
            <OfficeField label="登录账号"><SkInput defaultValue={isEdit ? "13100000000" : ""} disabled /></OfficeField>
            <OfficeField label="账号状态"><SkSwitch defaultChecked disabled /></OfficeField>
          </div>
        </div>
      )}
    </SkDrawer>
  );
}
