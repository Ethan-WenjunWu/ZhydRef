"use client";

import { useState, type ReactNode } from "react";

import { SpriteIcon } from "../app/icons";
import { SkButton, SkInput, SkSelect, SkTable } from "../app/SettingsUI";
import { OfficeField } from "../office/common";

export type OpConfig = {
  title: string;
  stats?: Array<[string, string]>;
  filters?: string[];
  columns: string[];
  buttons?: string[];
  note?: string;
  tabs?: string[];
  tableTitle?: string;
};

export function OpPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`op-page${className ? ` ${className}` : ""}`}>{children}</div>;
}

export function OpStats({ items, columns = 4 }: { items: Array<[string, string]>; columns?: number }) {
  return (
    <div className="op-stat-grid" style={{ "--cols": columns } as React.CSSProperties}>
      {items.map(([label, value]) => (
        <div key={label} className="op-stat">
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

export function OpFilters({ labels }: { labels: string[] }) {
  return (
    <div className="op-filter-grid">
      {labels.map((label) => (
        <OfficeField key={label} label={label}>
          {/时间|日期/.test(label) ? <SkInput type="date" /> : /状态|类型|方式|分类|项目|公司|楼宇|房源|职|性别/.test(label) ? <SkSelect placeholder={`请选择${label}`} /> : <SkInput placeholder={`请输入${label}`} />}
        </OfficeField>
      ))}
      <div className="op-filter-actions">
        <SkButton variant="primary" onClick={() => undefined}>搜索</SkButton>
        <SkButton>重置</SkButton>
      </div>
    </div>
  );
}

export function OpGenericPage({ config }: { config: OpConfig }) {
  const [tab, setTab] = useState(0);
  const { show, node } = useOpMessageProxy();
  return (
    <OpPage>
      {config.stats ? <OpStats items={config.stats} columns={config.stats.length >= 6 ? 6 : 4} /> : null}
      {config.filters ? <div className="op-card is-plain"><OpFilters labels={config.filters} /></div> : null}
      <div className="op-card">
        <div className="op-card-head">
          <strong>{config.tableTitle ?? config.title}</strong>
          <div className="op-actions">
            {(config.buttons ?? []).map((button, index) => (
              <SkButton key={button} variant={index === (config.buttons?.length ?? 0) - 1 ? "primary" : "default"} onClick={() => show(`${button}`)}>{button}</SkButton>
            ))}
          </div>
        </div>
        {config.note ? <div className="op-note">{config.note}</div> : null}
        <div className="op-table-toolbar">
          {config.tabs ? (
            <div className="op-table-tabs">
              {config.tabs.map((item, index) => (
                <button key={item} type="button" className={index === tab ? "is-active" : ""} onClick={() => setTab(index)}>{item}</button>
              ))}
            </div>
          ) : <span />}
          <div className="op-actions">
            <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
            <SkButton>更多 ⌄</SkButton>
          </div>
        </div>
        <SkTable className="op-wide-table" columns={config.columns.map((title, index) => ({ key: String(index), title }))} emptyText="暂无数据" rows={[]} />
      </div>
      {node}
    </OpPage>
  );
}

import { useSkMessage } from "../app/SettingsUI";
function useOpMessageProxy() {
  return useSkMessage();
}

export function OpSubSidebar({
  brand,
  items,
  active,
  onChange,
}: {
  brand: string;
  items: string[];
  active: string;
  onChange: (name: string) => void;
}) {
  return (
    <aside className="op-sub-side">
      <div className="op-sub-brand">{brand}</div>
      {items.map((item) => (
        <button key={item} type="button" className={`op-sub-item${active === item ? " is-active" : ""}`} onClick={() => onChange(item)}>{item}</button>
      ))}
    </aside>
  );
}

export function OpStatusLayout({
  statuses,
  active,
  onChange,
  stats,
  children,
}: {
  statuses: string[];
  active: string;
  onChange: (name: string) => void;
  stats?: Array<[string, string]>;
  children: ReactNode;
}) {
  return (
    <div className="op-split-page">
      <aside className="op-status-side">
        <div className="op-status-list">
          {statuses.map((status) => (
            <button key={status} type="button" className={`op-status-item${active === status ? " is-active" : ""}`} onClick={() => onChange(status)}>{status}</button>
          ))}
        </div>
        <div className="op-org-select"><SkSelect defaultValue="大连华安物业管理有限公司" options={["大连华安物业管理有限公司"]} /></div>
        <div className="op-org-tree">
          <div className="op-org-row is-parent"><span>⌄</span>大连华安物业管理有限公司</div>
          <div className="op-org-row"><span>▸</span>智慧园区</div>
          <div className="op-org-row"><span>▸</span>测试项目</div>
        </div>
      </aside>
      <section className="op-split-main">
        {stats ? <OpStats items={stats} columns={stats.length} /> : null}
        {children}
      </section>
    </div>
  );
}

export function OpTitleBar({ title, badge }: { title: string; badge?: number }) {
  return (
    <div className="op-title-bar">
      <strong>{title}</strong>
      {badge ? <span className="op-title-badge">{badge}</span> : null}
    </div>
  );
}

export function OpTableCard({
  title,
  columns,
  buttons,
  tabs,
  children,
}: {
  title: string;
  columns: string[];
  buttons?: string[];
  tabs?: string[];
  children?: ReactNode;
}) {
  const [tab, setTab] = useState(0);
  const { show, node } = useSkMessage();
  return (
    <div className="op-card">
      <div className="op-card-head"><strong>{title}</strong><div className="op-actions">{(buttons ?? []).map((button, index) => <SkButton key={button} variant={index === 0 ? "primary" : "default"} onClick={() => show(button)}>{button}</SkButton>)}</div></div>
      {tabs ? <div className="op-table-tabs">{tabs.map((item, index) => <button key={item} type="button" className={index === tab ? "is-active" : ""} onClick={() => setTab(index)}>{item}</button>)}</div> : null}
      <SkTable className="op-wide-table" columns={columns.map((value, index) => ({ key: String(index), title: value }))} rows={[]} />
      {children}
      {node}
    </div>
  );
}

export function OpIcon({ name }: { name: string }) {
  return <SpriteIcon name={name} />;
}
