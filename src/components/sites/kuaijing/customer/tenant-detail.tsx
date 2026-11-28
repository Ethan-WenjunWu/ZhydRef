"use client";

import { useState } from "react";

import {
  SkActionLink,
  SkButton,
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
import { OwnerFormDrawer, UploadGlyph } from "./common";

const DETAIL_TABS = ["详情", "合同", "账单", "附件", "开票信息", "人员列表"];

const DETAIL_FIELDS: Array<[string, string]> = [
  ["联系人", "A01"],
  ["行业分类", "--"],
  ["客商标签", "--"],
  ["邮箱", "--"],
  ["财务客商编码", "--"],
  ["所属房源", "--"],
];

export function TenantDetailPage() {
  const [tab, setTab] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const { show, node } = useSkMessage();

  const actions = (labels: Array<{ label: string; danger?: boolean }>) => (
    <span className="cus-op-links">
      {labels.map(({ label, danger }) => (
        <SkActionLink key={label} danger={danger} onClick={() => show(label)}>
          {label}
        </SkActionLink>
      ))}
    </span>
  );

  return (
    <OpPage className="cus-detail-page">
      <div className="cus-detail-head">
        <div className="cus-detail-title">
          <span className="cus-detail-avatar">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
              <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3.3 0-8 1.7-8 5v1h16v-1c0-3.3-4.7-5-8-5z" />
            </svg>
          </span>
          <strong>A01</strong>
        </div>
        <div className="op-actions">
          <SkButton onClick={() => setDeleteOpen(true)}>删 除</SkButton>
          <SkButton variant="primary" onClick={() => setEditOpen(true)}>编 辑</SkButton>
        </div>
      </div>

      <div className="cus-detail-tabs">
        <SkTabs items={DETAIL_TABS} active={tab} onChange={setTab} />
      </div>

      {tab === 0 ? (
        <div className="op-card cus-detail-card">
          <div className="cus-detail-card-head"><strong>基本信息</strong></div>
          <div className="cus-detail-grid">
            {DETAIL_FIELDS.map(([label, value]) => (
              <div key={label} className="cus-detail-field">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
            <div className="cus-detail-field is-full">
              <span>备注</span>
              <strong>--</strong>
            </div>
          </div>
        </div>
      ) : null}

      {tab === 1 ? (
        <div className="op-card cus-detail-card">
          <div className="cus-detail-card-head"><strong>合同列表</strong></div>
          <SkTable
            className="op-wide-table"
            columns={["合同编号", "所属公司", "合同类型", "合同标签", "单价", "楼宇名称", "资源名称", "租赁面积", "签订日", "开始日", "结束日", "合同状态"].map((title) => ({ key: title, title }))}
            rows={[
              ["2026-04-001-202611-0002", "大连华安物业管理有限公司", "床位合同", "", "500", "宿舍楼01", "5/01", "20㎡", "2026/11/26 14:16", "2026/11/26", "2026/11/26", "已退租"],
            ]}
          />
          <SkPagination total={1} pageSize={10} />
        </div>
      ) : null}

      {tab === 2 ? (
        <BillTab />
      ) : null}

      {tab === 3 ? (
        <div className="op-card cus-detail-card">
          <div className="cus-detail-card-head">
            <strong>附件信息</strong>
            <SkButton onClick={() => setAttachOpen(true)}>添加附件</SkButton>
          </div>
          <SkTable
            columns={["文件名", "上传人", "上传时间", "操作"].map((title) => ({ key: title, title }))}
            rows={[]}
          />
        </div>
      ) : null}

      {tab === 4 ? (
        <div className="op-card cus-detail-card">
          <div className="cus-detail-card-head">
            <strong>开票信息</strong>
            <SkButton onClick={() => setInvoiceOpen(true)}>添加</SkButton>
          </div>
          <SkTable
            columns={["发票抬头", "抬头类型", "银行账户数量", "纳税人识别号", "企业注册地址", "企业注册电话", "纳税人资质", "添加时间", "操作"].map((title) => ({ key: title, title }))}
            rows={[
              ["A01", "个人", "--", "--", "--", "--", "非一般纳税人", "2026/11/26 13:32", actions([{ label: "银行账号" }, { label: "编辑" }, { label: "删除", danger: true }])],
            ]}
          />
          <SkPagination total={1} pageSize={20} />
        </div>
      ) : null}

      {tab === 5 ? (
        <div className="op-card cus-detail-card">
          <div className="cus-detail-card-head"><strong>业户人员列表</strong></div>
          <SkTable
            columns={["业户人员", "姓名", "电话号码", "邮箱", "身份", "状态", "证件类型", "证件号码", "照片状态", "操作"].map((title) => ({ key: title, title }))}
            rows={[
              ["A01", "A01", "13100000000", "--", "员工/普通人员", "已审核", "身份证", "--", "待检测", actions([{ label: "IC卡" }, { label: "编辑" }, { label: "删除", danger: true }])],
            ]}
          />
          <SkPagination total={1} pageSize={20} />
        </div>
      ) : null}

      <OwnerFormDrawer
        open={editOpen}
        mode="edit"
        onClose={() => setEditOpen(false)}
        onSave={() => {
          setEditOpen(false);
          show("保存成功");
        }}
        message={show}
      />
      <SkConfirm
        open={deleteOpen}
        content="确认删除该业户联系人吗？"
        okText="确 认"
        onCancel={() => setDeleteOpen(false)}
        onOk={() => {
          setDeleteOpen(false);
          show("删除成功");
        }}
        danger
      />
      <AttachModal open={attachOpen} onClose={() => setAttachOpen(false)} onSave={() => { setAttachOpen(false); show("上传成功"); }} />
      <InvoiceDrawer open={invoiceOpen} onClose={() => setInvoiceOpen(false)} onSave={() => { setInvoiceOpen(false); show("保存成功"); }} />
      {node}
    </OpPage>
  );
}

function BillTab() {
  const [tab, setTab] = useState(0);
  return (
    <div className="op-card cus-detail-card">
      <div className="cus-table-head">
        <div className="op-table-tabs">
          {["收款账单", "付款账单"].map((item, index) => (
            <button key={item} type="button" className={index === tab ? "is-active" : ""} onClick={() => setTab(index)}>{item}</button>
          ))}
        </div>
      </div>
      <SkTable
        className="op-wide-table"
        columns={["费用类型", "账单类型", "账单金额", "应收金额", "实收金额", "需收金额", "楼宇名称", "资源名称", "应收日期", "税率", "税额", "逾期状态", "结清状态"].map((title) => ({ key: title, title }))}
        rows={[]}
      />
    </div>
  );
}

function AttachModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: () => void }) {
  return (
    <SkModal
      open={open}
      title="添加附件"
      width={520}
      onClose={onClose}
      footer={
        <>
          <SkButton onClick={onClose}>取 消</SkButton>
          <SkButton variant="primary" onClick={onSave}>确 认</SkButton>
        </>
      }
    >
      <div className="cus-upload-area">
        <span className="cus-upload-icon"><UploadGlyph /></span>
        <strong>点击或将文件拖拽到这里上传</strong>
        <small>支持上传常见附件格式</small>
      </div>
    </SkModal>
  );
}

function InvoiceDrawer({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: () => void }) {
  const [general, setGeneral] = useState(false);
  return (
    <SkDrawer
      open={open}
      title="添加开票信息"
      width={720}
      onClose={onClose}
      footer={
        <>
          <SkButton onClick={onClose}>取 消</SkButton>
          <SkButton variant="primary" onClick={onSave}>保 存</SkButton>
        </>
      }
    >
      <div className="cus-form-grid">
        <OfficeField label="发票抬头" required><SkInput /></OfficeField>
        <OfficeField label="抬头类型"><SkSelect defaultValue="个人" options={["个人", "企业"]} /></OfficeField>
        <OfficeField label="纳税人识别号"><SkInput /></OfficeField>
        <OfficeField label="企业注册地址"><SkInput /></OfficeField>
        <OfficeField label="企业注册电话"><SkInput /></OfficeField>
        <OfficeField label="纳税人资质"><SkSelect defaultValue="非一般纳税人" options={["非一般纳税人", "一般纳税人"]} /></OfficeField>
        <OfficeField label="银行账号"><SkInput /></OfficeField>
        <OfficeField label="默认发票"><SkSwitch checked={general} onChange={setGeneral} /></OfficeField>
      </div>
    </SkDrawer>
  );
}
