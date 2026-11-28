"use client";

import { useState, type ReactNode } from "react";

import { DownIcon } from "../app/icons";
import {
  SkButton,
  SkCheckbox,
  SkInput,
  SkPagination,
  SkSelect,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { OpPage } from "../operation/common";
import "./finance.css";

export type FinStat = { label: string; value: ReactNode; sub?: ReactNode };

export function FinPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <OpPage className={`fin-page${className ? ` ${className}` : ""}`}>{children}</OpPage>;
}

export function FinSearchTop({ placeholder, action, onAction }: { placeholder: string; action?: string; onAction?: () => void }) {
  return (
    <div className="fin-search-top">
      <div className="fin-search-input">
        <SkInput placeholder={placeholder} />
        <button type="button" className="fin-search-btn" aria-label="search">⌕</button>
      </div>
      {action ? <SkButton variant="primary" onClick={onAction}>{action}</SkButton> : null}
    </div>
  );
}

export function FinChips({ chips, onClear, extra }: { chips: string[]; onClear?: () => void; extra?: ReactNode }) {
  return (
    <div className="fin-chips">
      <div className="fin-chip-list">
        {chips.map((chip) => (
          <span key={chip} className="fin-chip">
            {chip}
            <i>×</i>
          </span>
        ))}
      </div>
      <div className="fin-chip-actions">
        <button type="button" className="fin-clear" onClick={onClear}>清除选项</button>
        <button type="button" className="fin-link">快捷筛选管理</button>
        {extra}
        <button type="button" className="fin-collapse">收起 <DownIcon /></button>
      </div>
    </div>
  );
}

export function FinFilterGrid({
  fields,
  actions = ["搜索", "重置"],
  cols = 4,
  children,
}: {
  fields: string[];
  actions?: string[];
  cols?: number;
  children?: ReactNode;
}) {
  return (
    <div className="op-card is-plain fin-filter-card">
      <div className="fin-filter-grid" style={{ "--cols": cols } as React.CSSProperties}>
        {fields.map((label) => (
          <OfficeField key={label} label={label}>
            {/时间|日期|区间/.test(label) ? <SkInput type="date" /> : /状态|类型|方式|公司|项目|楼宇|标签|模式|分类/.test(label) ? <SkSelect placeholder={label.includes("请选择") ? undefined : "请选择"} /> : <SkInput placeholder={`请输入${label.replace(/[：:]/g, "")}`} />}
          </OfficeField>
        ))}
      </div>
      {children}
      {actions.length ? (
        <div className="fin-filter-actions">
          {actions.map((action, index) => (
            <SkButton key={action} variant={index === 0 ? "primary" : "default"}>{action}</SkButton>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function FinStats({ items, cols }: { items: FinStat[]; cols?: number }) {
  const columns = cols ?? (items.length >= 8 ? 8 : items.length >= 6 ? 6 : 4);
  return (
    <div className="fin-stats" style={{ "--cols": columns } as React.CSSProperties}>
      {items.map((item, index) => (
        <div key={index} className="fin-stat">
          <span className="fin-stat-label">{item.label}</span>
          <strong>{item.value}</strong>
          {item.sub ? <span className="fin-stat-sub">{item.sub}</span> : null}
        </div>
      ))}
    </div>
  );
}

export function FinTableCard({
  title,
  buttons,
  tabs,
  activeTab,
  onTabChange,
  columns,
  rows,
  total,
  pageSize = 20,
  tip,
  extraHead,
  children,
}: {
  title?: ReactNode;
  buttons?: ReactNode;
  tabs?: string[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  columns: Array<string | ReactNode>;
  rows?: ReactNode[][];
  total?: number;
  pageSize?: number;
  tip?: string;
  extraHead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="op-card fin-table-card">
      <div className="fin-table-head">
        <div className="fin-table-head-left">
          {title ? <strong>{title}</strong> : null}
          {tip ? <span className="fin-tip">🌱 提示：{tip}</span> : null}
          {extraHead}
        </div>
        <div className="op-actions">{buttons}</div>
      </div>
      {tabs ? (
        <div className="fin-tabs">
          {tabs.map((item, index) => (
            <button key={item} type="button" className={index === (activeTab ?? 0) ? "is-active" : ""} onClick={() => onTabChange?.(index)}>{item}</button>
          ))}
        </div>
      ) : null}
      <SkTable
        className="op-wide-table"
        columns={columns.map((titleValue, index) => ({ key: String(index), title: titleValue }))}
        rows={rows ?? []}
      />
      {total ? <SkPagination total={total} pageSize={pageSize} /> : null}
      {children}
    </div>
  );
}

export function FinSplit({
  statuses,
  activeStatus,
  onStatusChange,
  children,
}: {
  statuses: string[];
  activeStatus: number;
  onStatusChange: (index: number) => void;
  children: ReactNode;
}) {
  return (
    <div className="fin-split">
      <aside className="fin-split-side">
        <div className="fin-status-list">
          {statuses.map((status, index) => (
            <button key={status} type="button" className={`fin-status-item${index === activeStatus ? " is-active" : ""}`} onClick={() => onStatusChange(index)}>{status}</button>
          ))}
        </div>
        <SkSelect defaultValue="大连华安物业管理有限公司" options={["大连华安物业管理有限公司"]} className="fin-org-select" />
        <div className="fin-org-tree">
          <div className="fin-org-row is-root">▾ 大连华安物业管理有限公司</div>
          <div className="fin-org-row is-child">🏢 智慧园区</div>
          <div className="fin-org-row is-child">🏢 测试项目</div>
        </div>
      </aside>
      <section className="fin-split-main">{children}</section>
    </div>
  );
}

export function FinTabs({ tabs }: { tabs: string[] }) {
  const [active, setActive] = useState(0);
  return <SkTabs items={tabs} active={active} onChange={setActive} />;
}

export function FinPageHeader({ title, description, right }: { title: string; description?: string; right?: ReactNode }) {
  return (
    <div className="op-card fin-page-hero">
      <div className="fin-hero-head">
        <strong>{title}</strong>
        {right}
      </div>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function FinEmpty({ text, action }: { text: string; action?: ReactNode }) {
  return (
    <div className="fin-empty">
      <div className="fin-empty-icon">🗂</div>
      <span>{text}</span>
      {action}
    </div>
  );
}

export function FinToggle({ on, label }: { on: boolean; label: string }) {
  const [checked, setChecked] = useState(on);
  return (
    <button type="button" className={`fin-toggle${checked ? " is-on" : ""}`} onClick={() => setChecked((value) => !value)}>
      <span className="fin-toggle-track"><i /></span>
      {label}
    </button>
  );
}

export function FinMore({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fin-more">
      <SkButton onClick={() => setOpen((value) => !value)}>更多 <DownIcon className="fin-caret" /></SkButton>
      {open ? <div className="fin-more-list">{items.map((item) => <button key={item} type="button">{item}</button>)}</div> : null}
    </div>
  );
}

export function FinMessageHost() {
  const { node } = useSkMessage();
  return node;
}

export function FinCheckColumn() {
  return <SkCheckbox />;
}
