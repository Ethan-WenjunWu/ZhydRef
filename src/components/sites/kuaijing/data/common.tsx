"use client";

import type { ReactNode } from "react";

import { SkButton, SkTable, SkTabs } from "../app/SettingsUI";
import { useSkMessage } from "../app/SettingsUI";

export function DataPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`dt-page${className ? ` ${className}` : ""}`}>{children}</div>;
}

export function DtPanel({
  title,
  actions,
  children,
  className = "",
}: {
  title?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`dt-panel${className ? ` ${className}` : ""}`}>
      {title ? (
        <div className="dt-panel-head">
          <strong>{title}</strong>
          <div className="dt-panel-actions">{actions}</div>
        </div>
      ) : null}
      <div className="dt-panel-body">{children}</div>
    </section>
  );
}

export function DtStats({
  items,
  columns = 8,
  className = "",
}: {
  items: Array<[ReactNode, ReactNode, ReactNode?]>;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={`dt-stat-grid${className ? ` ${className}` : ""}`} style={{ "--cols": columns } as React.CSSProperties}>
      {items.map((item, index) => (
        <div key={index} className="dt-stat">
          <span>{item[0]}</span>
          <strong>{item[1]}</strong>
          {item[2] ? <small>{item[2]}</small> : null}
        </div>
      ))}
    </div>
  );
}

export function DtEmptyChart({ height = 220, children }: { height?: number; children?: ReactNode }) {
  return <div className="dt-empty-chart" style={{ minHeight: height }}>{children ?? <span>暂无数据</span>}</div>;
}

export function DtTablePanel({
  title,
  tabs,
  columns,
  rows = [],
  buttons = ["刷新", "导出"],
}: {
  title: string;
  tabs?: string[];
  columns: string[];
  rows?: ReactNode[][];
  buttons?: string[];
}) {
  const { show, node } = useSkMessage();
  return (
    <div className="dt-card">
      <div className="dt-card-head"><strong>{title}</strong><div className="dt-actions">{buttons.map((button, index) => <SkButton key={button} variant={index === 0 ? "primary" : "default"} onClick={() => show(button)}>{button}</SkButton>)}</div></div>
      {tabs ? <DtTabs items={tabs} /> : null}
      <SkTable className="dt-wide-table" columns={columns.map((value, index) => ({ key: String(index), title: value }))} rows={rows} />
      {node}
    </div>
  );
}

export function DtTabs({ items }: { items: string[] }) {
  const [active, setActive] = useStateLocal(0);
  return <SkTabs items={items} active={active} onChange={setActive} />;
}

import { useState as useStateLocal } from "react";

export function DtFilterBar({ labels }: { labels: string[] }) {
  const { show, node } = useSkMessage();
  return (
    <div className="dt-filter-bar">
      {labels.map((label) => (
        <label key={label} className="dt-filter-field"><span>{label}</span><input className="sk-input" placeholder="请选择" /></label>
      ))}
      <SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton>
      <SkButton>重置</SkButton>
      {node}
    </div>
  );
}

export function DtChartPanel({ title, children }: { title: string; children?: ReactNode }) {
  return <DtPanel title={title}>{children ?? <DtEmptyChart />}</DtPanel>;
}
