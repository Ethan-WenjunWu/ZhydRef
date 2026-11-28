"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { DownIcon, SpriteIcon } from "../app/icons";
import {
  SkButton,
  SkCheckbox,
  SkDrawer,
  SkInput,
  SkModal,
  SkRadio,
  SkSelect,
  SkSwitch,
  SkTable,
  SkPagination,
  SkTabs,
} from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import "./customer.css";

export type CusMenuItem = { key: string; label: string; onClick: () => void };

function MenuGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function GearGlyph() {
  return (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 730l-40.8 18.8a354.6 354.6 0 01-49.8 28.7l-37.2 17.6-11.7 63.4a369.3 369.3 0 01-109.4 0l-11.7-63.4-37.2-17.6a354.6 354.6 0 01-49.8-28.7L333.6 730l-86.9-18.8a370.03 370.03 0 01-42.6-73.6l74.7-63.9-6.6-40.1c-2.5-15.1-3.8-30.6-3.8-46.1s1.3-31 3.8-46.1l6.6-40.1-74.7-63.9a370.03 370.03 0 0142.6-73.6L322.9 294l40.8-18.8a354.6 354.6 0 0149.8-28.7l37.2-17.6 11.7-63.4a369.3 369.3 0 01109.4 0l11.7 63.4 37.2 17.6a354.6 354.6 0 0149.8 28.7l40.8 18.8 86.9 18.8a370.03 370.03 0 0142.6 73.6l-74.7 63.9 6.6 40.1z" />
      <path d="M512 312c-110.5 0-200 89.5-200 200s89.5 200 200 200 200-89.5 200-200-89.5-200-200-200zm0 336c-75.1 0-136-60.9-136-136s60.9-136 136-136 136 60.9 136 136-60.9 136-136 136z" />
    </svg>
  );
}

export function CusMenu({
  items,
  label = "更多",
  icon = true,
}: {
  items: CusMenuItem[];
  label?: string;
  icon?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="cus-menu" ref={ref}>
      <SkButton onClick={() => setOpen((value) => !value)}>
        {icon ? <span className="cus-menu-icon"><MenuGlyph /></span> : null}
        <span>{label}</span>
        <DownIcon className="cus-menu-caret" />
      </SkButton>
      {open ? (
        <div className="cus-menu-list" role="menu">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              role="menuitem"
              className="cus-menu-item"
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CusGear({ columns }: { columns: string[] }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="cus-menu" ref={ref}>
      <button
        type="button"
        className="cus-gear"
        aria-label="列设置"
        onClick={() => setOpen((value) => !value)}
      >
        <GearGlyph />
      </button>
      {open ? (
        <div className="cus-gear-panel">
          <div className="cus-gear-head">
            <SkCheckbox
              label="全部"
              checked={hidden.length === 0}
              onChange={() => setHidden(hidden.length ? [] : columns)}
            />
            <button type="button" className="sk-link" onClick={() => setHidden([])}>
              恢复默认
            </button>
          </div>
          <div className="cus-gear-list">
            {columns.map((column) => (
              <SkCheckbox
                key={column}
                label={column}
                checked={!hidden.includes(column)}
                onChange={(checked) =>
                  setHidden((current) =>
                    checked ? current.filter((item) => item !== column) : [...current, column],
                  )
                }
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function CusSearchHeader({
  placeholder,
  actionLabel,
  onAction,
  onSearch,
}: {
  placeholder: string;
  actionLabel?: string;
  onAction?: () => void;
  onSearch?: () => void;
}) {
  return (
    <div className="cus-search-head">
      <div className="cus-search-input">
        <SkInput placeholder={placeholder} onEnter={onSearch} />
        <button type="button" className="cus-search-btn" aria-label="search" onClick={onSearch}>
          <SpriteIcon name="org-sousuo" />
        </button>
      </div>
      {actionLabel ? (
        <SkButton onClick={onAction}>{actionLabel}</SkButton>
      ) : null}
    </div>
  );
}

export function CusStats({ items }: { items: Array<[ReactNode, ReactNode]> }) {
  return (
    <div className="cus-stats">
      {items.map(([label, value], index) => (
        <div key={index} className="cus-stat">
          <span className="cus-stat-label">{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

export function CusTableCard({
  tabs,
  activeTab,
  onTabChange,
  columns,
  rows,
  total,
  pageSize = 10,
  toolbar,
}: {
  tabs?: string[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  columns: string[];
  rows: ReactNode[][];
  total: number;
  pageSize?: number;
  toolbar?: ReactNode;
}) {
  return (
    <div className="op-card cus-table-card">
      <div className="cus-table-head">
        {tabs ? (
          <div className="op-table-tabs">
            {tabs.map((item, index) => (
              <button
                key={item}
                type="button"
                className={index === (activeTab ?? 0) ? "is-active" : ""}
                onClick={() => onTabChange?.(index)}
              >
                {item}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        <div className="op-actions">{toolbar}</div>
      </div>
      <SkTable
        className="op-wide-table"
        columns={columns.map((title, index) => ({ key: String(index), title }))}
        rows={rows}
      />
      {total ? <SkPagination total={total} pageSize={pageSize} /> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function UploadGlyph() {
  return (
    <svg viewBox="0 0 64 64" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M40 18H14.7C9.9 18 6 21.9 6 26.7v18.6C6 50.1 9.9 54 14.7 54h34.6C54.1 54 58 50.1 58 45.3V30.7C58 23.9 51.2 18 40 18zm8 24v3.3c0 1.8-1.2 3.4-2.7 3.4H18.7c-1.5 0-2.7-1.6-2.7-3.4v-4h2.7c1.5 0 2.7 1.2 2.7 2.7v1.3h8V35c0-1.5 1.2-2.7 2.7-2.7h3.8c1.5 0 2.7 1.2 2.7 2.7v10.3h8v-1.3c0-1.5 1.2-2.7 2.7-2.7H48zM40 6c-5.5 0-10 4.5-10 10v10.7h4V21h12v5.7h4V16c0-5.5-4.5-10-10-10z" />
    </svg>
  );
}

export function ImportModal({
  open,
  title,
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [bindProject, setBindProject] = useState(false);
  return (
    <SkModal
      open={open}
      title={title}
      width={520}
      onClose={onClose}
      footer={
        <>
          <SkButton onClick={onClose}>取 消</SkButton>
          <SkButton variant="primary" onClick={onConfirm}>
            确 认
          </SkButton>
        </>
      }
    >
      <div className="cus-upload-area">
        <span className="cus-upload-icon"><UploadGlyph /></span>
        <strong>点击或将文件拖拽到这里上传</strong>
        <small>支持扩展名: .xlsx,.xls</small>
      </div>
      <div className="cus-import-row">
        <span>是否绑定项目：</span>
        <SkRadio label="绑定" checked={bindProject} onChange={() => setBindProject(true)} />
        <SkRadio label="不绑定" checked={!bindProject} onChange={() => setBindProject(false)} />
        <span className="cus-hint">?</span>
      </div>
      <div>
        <SkButton>
          <DownIcon className="cus-download-icon" /> 模板下载
        </SkButton>
      </div>
    </SkModal>
  );
}

export function ExtendFieldsDrawer({
  open,
  onClose,
  message,
}: {
  open: boolean;
  onClose: () => void;
  message: (text: string) => void;
}) {
  const [addOpen, setAddOpen] = useState(false);
  const rows: ReactNode[][] = [
    [
      "成交选址目的",
      <SkSelect key="type" defaultValue="下拉多选" options={["单行文本", "下拉框", "下拉多选"]} />,
      <SkSwitch key="required" disabled />,
      <SkInput key="sort" defaultValue="0" className="cus-sort-input" />,
      <span key="ops" className="cus-op-links">
        <button type="button" className="sk-action-link" onClick={() => setAddOpen(true)}>编辑</button>
        <button type="button" className="sk-action-link is-danger" onClick={() => message("删除成功")}>删除</button>
      </span>,
    ],
  ];
  return (
    <>
      <SkDrawer
        open={open}
        title="拓展字段"
        width={1000}
        onClose={onClose}
        footer={
          <>
            <SkButton onClick={onClose}>取 消</SkButton>
            <SkButton variant="primary" onClick={() => message("保存成功")}>保 存</SkButton>
          </>
        }
      >
        <div className="cus-alert">统一配置字段名称、类型及填写规则。</div>
        <div className="cus-field-card">
          <div className="cus-field-head">
            <strong>已配置字段</strong>
            <span className="cus-field-count">1</span>
            <SkInput placeholder="请输入字段名称" className="cus-field-search" />
            <SkButton variant="primary" onClick={() => setAddOpen(true)}>+新增</SkButton>
          </div>
          <SkTable
            columns={["字段名称", "字段类型", "是否必填", "排序", "操作"].map((title) => ({
              key: title,
              title,
            }))}
            rows={rows}
          />
          <SkPagination total={1} pageSize={20} />
        </div>
      </SkDrawer>
      <FieldAddModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={() => {
          setAddOpen(false);
          message("保存成功");
        }}
      />
    </>
  );
}

function FieldAddModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const [required, setRequired] = useState(false);
  return (
    <SkModal
      open={open}
      title="添加字段"
      width={800}
      onClose={onClose}
      footer={
        <>
          <SkButton onClick={onClose}>取 消</SkButton>
          <SkButton variant="primary" onClick={onSave}>提 交</SkButton>
        </>
      }
    >
      <div className="cus-modal-section">基础设置</div>
      <div className="cus-form-grid is-three">
        <OfficeField label="字段名称" required>
          <SkInput placeholder="请输入字段名称" />
        </OfficeField>
        <OfficeField label="字段类型">
          <SkSelect defaultValue="单行文本" options={["单行文本", "多行文本", "数字", "日期", "下拉框", "下拉多选"]} />
        </OfficeField>
        <OfficeField label="字段排序">
          <SkInput defaultValue="0" />
        </OfficeField>
        <OfficeField label="是否必填">
          <SkSwitch checked={required} onChange={setRequired} />
          <small className="cus-field-note">必填项需完整填写后才能保存</small>
        </OfficeField>
      </div>
      <div className="cus-modal-section">输入设置</div>
      <div className="cus-form-grid is-three">
        <OfficeField label="默认值"><SkInput /></OfficeField>
        <OfficeField label="长度限制">
          <div className="cus-range">
            <SkInput /> <span>至</span> <SkInput />
          </div>
        </OfficeField>
        <OfficeField label="提示文字"><SkInput /></OfficeField>
      </div>
      <div className="cus-modal-section">填写效果预览</div>
      <div className="cus-preview-card">
        <strong>拓展信息</strong>
        <SkInput placeholder="未命名字段" />
        <small>预览会随左侧设置实时更新，可直接体验填写方式。</small>
        <small>此字段为选填项，可以留空。</small>
      </div>
    </SkModal>
  );
}

export function TagsDrawer({
  open,
  title,
  addTitle,
  onClose,
  message,
}: {
  open: boolean;
  title: string;
  addTitle: string;
  onClose: () => void;
  message: (text: string) => void;
}) {
  const [createOpen, setCreateOpen] = useState(false);
  return (
    <>
      <SkDrawer
        open={open}
        title={title}
        width={1000}
        onClose={onClose}
        footer={
          <>
            <SkButton onClick={onClose}>取 消</SkButton>
            <SkButton variant="primary" onClick={() => message("保存成功")}>保 存</SkButton>
          </>
        }
      >
        <div className="cus-tag-head">
          <SkSelect placeholder="请选择状态" options={["启用", "禁用"]} className="cus-tag-filter" />
          <div className="op-actions">
            <SkButton variant="primary" onClick={() => message("查询成功")}>搜 索</SkButton>
            <SkButton onClick={() => message("重置成功")}>重 置</SkButton>
            <SkButton variant="primary" onClick={() => setCreateOpen(true)}>+添加标签</SkButton>
          </div>
        </div>
        <SkTable
          columns={["项目名称", "标签描述", "状态", "操作"].map((item) => ({ key: item, title: item }))}
          rows={[]}
        />
      </SkDrawer>
      <TagCreateDrawer
        open={createOpen}
        title={addTitle}
        onClose={() => setCreateOpen(false)}
        onSave={() => {
          setCreateOpen(false);
          message("保存成功");
        }}
      />
    </>
  );
}

function TagCreateDrawer({
  open,
  title,
  onClose,
  onSave,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  onSave: () => void;
}) {
  const [enabled, setEnabled] = useState(true);
  return (
    <SkDrawer
      open={open}
      title={title}
      width={560}
      onClose={onClose}
      footer={
        <>
          <SkButton onClick={onClose}>取 消</SkButton>
          <SkButton variant="primary" onClick={onSave}>保 存</SkButton>
        </>
      }
    >
      <div className="cus-form-grid">
        <OfficeField label="名称"><SkInput /></OfficeField>
        <OfficeField label="描述"><SkInput /></OfficeField>
        <OfficeField label="样式"><SkSelect placeholder="请选择" options={["默认", "成功", "警告", "危险"]} /></OfficeField>
        <OfficeField label="状态">
          <div className="cus-inline"><SkSwitch checked={enabled} onChange={setEnabled} /><span>{enabled ? "开启" : "关闭"}</span></div>
        </OfficeField>
      </div>
    </SkDrawer>
  );
}

/* ------------------------------------------------------------------ */

const OWNER_FORM_SECTIONS = [
  ["统一社会信用代码", "纳税人识别号", "注册号"],
  ["组织机构代码", "法定代表人", "邮箱"],
  ["国籍", "注册资本（万）", "经营状态"],
  ["登记机关", "公司类型", "人员规模"],
] as const;

export type OwnerFormMode = "add" | "edit" | "supplier";

export function OwnerFormDrawer({
  open,
  mode,
  onClose,
  onSave,
  message,
}: {
  open: boolean;
  mode: OwnerFormMode;
  onClose: () => void;
  onSave: () => void;
  message: (text: string) => void;
}) {
  const isEdit = mode === "edit";
  const isSupplier = mode === "supplier";
  const title = isEdit ? "编辑业户" : isSupplier ? "添加供应商" : "添加业户";

  return (
    <SkDrawer
      open={open}
      title={title}
      width={1000}
      onClose={onClose}
      footer={
        <>
          <SkButton onClick={onClose}>取 消</SkButton>
          <SkButton variant="primary" onClick={onSave}>保 存</SkButton>
        </>
      }
    >
      <OwnerFormBody mode={mode} message={message} />
    </SkDrawer>
  );
}

function OwnerFormBody({ mode, message }: { mode: OwnerFormMode; message: (text: string) => void }) {
  const [tab, setTab] = useState(0);
  const [personal, setPersonal] = useState(false);
  const [invoiceTitle, setInvoiceTitle] = useState(false);
  const [permanent, setPermanent] = useState(false);
  const [recommend, setRecommend] = useState(false);
  const [archived, setArchived] = useState("否");
  const isEdit = mode === "edit";
  const isSupplier = mode === "supplier";
  const nameLabel = isSupplier ? "供应商名称" : "业户名称";

  return (
    <>
      <SkTabs items={isEdit ? ["基本信息"] : ["基本信息", "其他信息"]} active={tab} onChange={setTab} />

      {tab === 0 && isEdit ? (
        <>
          <FormCard title="基本信息">
            <div className="cus-form-grid is-three">
              <OfficeField label="绑定项目"><SkSelect placeholder="请选择" /></OfficeField>
              <OfficeField label="业户名称" required>
                <div className="cus-inline">
                  <SkInput defaultValue="A01" />
                  <SkCheckbox label="个人" checked={personal} onChange={setPersonal} />
                </div>
              </OfficeField>
              <OfficeField label="默认联系人" required><SkSelect defaultValue="A01" options={["A01"]} /></OfficeField>
              <OfficeField label={<span>账单联系人 <i className="cus-hint">?</i></span>}><SkSelect defaultValue="A01" options={["A01"]} /></OfficeField>
              <OfficeField label={<span>审批联系人 <i className="cus-hint">?</i></span>}><SkSelect placeholder="全名或手机号搜索" options={["A01"]} /></OfficeField>
              <OfficeField label="合同签署人"><SkSelect placeholder="请选择，搜索请输入全名或手机号" options={["A01"]} /></OfficeField>
              <OfficeField label="行业分类"><SkSelect placeholder="请选择" /></OfficeField>
              <OfficeField label="标签"><SkSelect placeholder="请选择" /></OfficeField>
              <OfficeField label="财务客商编码"><SkInput placeholder="请填写..." /></OfficeField>
              <OfficeField label="客商类型"><SkSelect defaultValue="客户" options={["客户", "供应商"]} /></OfficeField>
              <OfficeField label={<span>招商跟进人 <i className="cus-hint">?</i></span>}><SkSelect placeholder="选择招商跟进人" /></OfficeField>
              <OfficeField label={<span>父级业户 <i className="cus-hint">?</i></span>}><SkSelect placeholder="可直接录入名称搜索" /></OfficeField>
            </div>
            <OfficeField label="备注">
              <textarea className="sk-input cus-textarea" defaultValue="" />
              <small className="cus-counter">0 / 5000</small>
            </OfficeField>
          </FormCard>
          <FormCard title="拓展信息">
            <div className="cus-form-grid is-three">
              <OfficeField label="成交选址目的"><SkInput /></OfficeField>
              <OfficeField label="是否归档">
                <div className="cus-inline">
                  <SkRadio label="否" checked={archived === "否"} onChange={() => setArchived("否")} />
                  <SkRadio label="是" checked={archived === "是"} onChange={() => setArchived("是")} />
                </div>
              </OfficeField>
            </div>
          </FormCard>
        </>
      ) : tab === 0 ? (
        <>
          <FormCard title="基本信息" extra={<button type="button" className="sk-link" onClick={() => message("同步工商信息成功")}>同步工商信息</button>}>
            <div className="cus-form-grid is-three">
              <OfficeField label={<span>绑定项目 <i className="cus-hint">?</i></span>}><SkSelect placeholder="请选择" /></OfficeField>
              <OfficeField label={nameLabel} required>
                <div className="cus-name-row">
                  <SkCheckbox label="个人" checked={personal} onChange={setPersonal} />
                  <SkInput placeholder="请填写..." />
                  <SkButton onClick={() => message("引入成功")}>引入</SkButton>
                </div>
              </OfficeField>
              <OfficeField label="行业分类"><SkSelect placeholder="请选择" /></OfficeField>
              <OfficeField label="标签"><SkSelect placeholder="请选择" /></OfficeField>
              <OfficeField label="财务客商编码"><SkInput placeholder="请填写..." /></OfficeField>
              <OfficeField label="客商类型"><SkSelect defaultValue={isSupplier ? "供应商" : "客户"} options={["客户", "供应商"]} /></OfficeField>
              <OfficeField label="招商跟进人"><SkSelect placeholder="选择招商跟进人" /></OfficeField>
              <OfficeField label="父级业户"><SkSelect placeholder="可直接录入名称搜索" /></OfficeField>
            </div>
            <OfficeField label="备注">
              <textarea className="sk-input cus-textarea" />
              <small className="cus-counter">0 / 5000</small>
            </OfficeField>
          </FormCard>

          <FormCard title="默认联系人">
            <div className="cus-form-grid is-three">
              <OfficeField label="姓名：" required><SkInput /></OfficeField>
              <OfficeField label="手机号码：" required>
                <div className="cus-phone-row">
                  <span>+86</span>
                  <SkInput />
                </div>
              </OfficeField>
              <OfficeField label="身份：" required><SkSelect defaultValue="老板/超级管理员" options={["老板/超级管理员", "员工/普通人员"]} /></OfficeField>
              <OfficeField label="证件类型："><SkSelect defaultValue="身份证" options={["身份证", "护照", "港澳通行证", "台胞证"]} /></OfficeField>
              <OfficeField label="证件号码：">
                <div className="cus-inline">
                  <SkInput />
                  <button type="button" className="sk-link" onClick={() => message("读取证件成功")}>读取证件</button>
                </div>
              </OfficeField>
              <OfficeField label="邮箱："><SkInput /></OfficeField>
              <OfficeField label="通讯地址："><SkInput /></OfficeField>
            </div>
            <OfficeField label={<span>证件照片 <i className="cus-hint">?</i></span>}>
              <div className="cus-photo-row">
                {["上传身份证人像面", "上传身份证国徽面", "上传手持身份证照"].map((text) => (
                  <button key={text} type="button" className="cus-photo" onClick={() => message("上传成功")}>
                    <span className="cus-photo-icon" />
                    <small>{text}</small>
                  </button>
                ))}
              </div>
            </OfficeField>
          </FormCard>

          <FormCard title="账户信息">
            <div className="cus-form-grid is-three">
              <OfficeField label="开户银行："><SkInput /></OfficeField>
              <OfficeField label="账号："><SkInput /></OfficeField>
              <OfficeField label="电话："><SkInput /></OfficeField>
              <OfficeField label="纳税人识别号："><SkInput /></OfficeField>
              <OfficeField label="默认发票类型："><SkSelect placeholder="请选择" options={["增值税专用发票", "增值税普通发票", "电子发票"]} /></OfficeField>
              <OfficeField label="开票地址："><SkInput /></OfficeField>
              <OfficeField label={<span>默认发票模板 <i className="cus-hint">?</i></span>}><SkSelect placeholder="请选择" /></OfficeField>
              <OfficeField label="业户修改发票抬头">
                <SkSwitch checked={invoiceTitle} onChange={setInvoiceTitle} />
              </OfficeField>
            </div>
          </FormCard>

          <FormCard title="拓展信息">
            <div className="cus-form-grid is-three">
              <OfficeField label="成交选址目的"><SkInput /></OfficeField>
            </div>
          </FormCard>

          <FormCard title="工商信息">
            <div className="cus-form-grid is-three">
              {OWNER_FORM_SECTIONS.flat().map((label) => (
                <OfficeField key={label} label={label}><SkInput placeholder="请填写..." /></OfficeField>
              ))}
              <OfficeField label="英文名："><SkInput /></OfficeField>
              <OfficeField label="成立日期："><SkInput type="date" /></OfficeField>
              <OfficeField label="核准日期："><SkInput type="date" /></OfficeField>
              <OfficeField label="营业期限：">
                <div className="cus-inline">
                  <SkInput placeholder="请填写..." />
                  <SkCheckbox label="永久" checked={permanent} onChange={setPermanent} />
                </div>
              </OfficeField>
              <OfficeField label="所属地区："><SkInput /></OfficeField>
              <OfficeField label="注册地址："><SkInput /></OfficeField>
              <OfficeField label="实缴资本："><SkInput /></OfficeField>
              <OfficeField label="国税编号："><SkInput /></OfficeField>
              <OfficeField label="地税编号："><SkInput /></OfficeField>
              <OfficeField label="所属行业："><SkInput /></OfficeField>
            </div>
            <OfficeField label="经营范围：">
              <textarea className="sk-input cus-textarea" />
            </OfficeField>
          </FormCard>
        </>
      ) : (
        <FormCard title="企业信息">
          <OfficeField label="企业Logo">
            <button type="button" className="cus-logo-upload" onClick={() => message("上传成功")}>上传</button>
          </OfficeField>
          <OfficeField label="推荐展示">
            <div className="cus-inline">
              <SkSwitch checked={recommend} onChange={setRecommend} />
              <span>{recommend ? "推荐" : "不推荐"}</span>
            </div>
          </OfficeField>
          <OfficeField label="官网地址"><SkInput /></OfficeField>
          <OfficeField label="企业简介">
            <div className="cus-editor">
              <div className="cus-editor-toolbar">
                {["文件", "编辑", "插入", "视图", "格式", "表格", "12pt", "p"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
                <span className="cus-editor-count">0 字</span>
              </div>
              <textarea className="sk-input cus-editor-body" />
            </div>
          </OfficeField>
        </FormCard>
      )}
    </>
  );
}

export function FormCard({
  title,
  extra,
  children,
}: {
  title: string;
  extra?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="cus-form-card">
      <div className="cus-form-card-head">
        <strong>{title}</strong>
        {extra}
      </div>
      <div className="cus-form-card-body">{children}</div>
    </section>
  );
}
