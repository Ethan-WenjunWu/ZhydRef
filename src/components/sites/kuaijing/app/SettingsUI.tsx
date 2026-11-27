"use client";

import { useState, type ReactNode } from "react";

import { EMPTY_SVG } from "./empty-svg";
import { DownIcon } from "./icons";
import "./kuaijing-settings.css";

export function SkButton({
  children,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
  onClick,
}: {
  children: ReactNode;
  variant?: "default" | "primary" | "outline" | "text" | "danger";
  size?: "md" | "sm";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`sk-btn sk-btn-${variant} sk-btn-${size}${className ? ` ${className}` : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SkInput({
  placeholder,
  defaultValue,
  value,
  onChange,
  className = "",
  type = "text",
}: {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  type?: string;
}) {
  return (
    <input
      className={`sk-input${className ? ` ${className}` : ""}`}
      placeholder={placeholder}
      defaultValue={value === undefined ? defaultValue : undefined}
      value={value}
      type={type}
      onChange={(event) => onChange?.(event.target.value)}
    />
  );
}

export function SkSelect({
  placeholder,
  value,
  className = "",
}: {
  placeholder?: string;
  value?: string;
  className?: string;
}) {
  return (
    <div className={`sk-select${className ? ` ${className}` : ""}`}>
      <span className={value ? "" : "sk-placeholder"}>{value || placeholder}</span>
      <DownIcon />
    </div>
  );
}

export function SkSwitch({
  defaultChecked = false,
  checked: controlled,
  onChange,
}: {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const checked = controlled === undefined ? internal : controlled;
  const toggle = () => {
    if (controlled === undefined) setInternal((value) => !value);
    onChange?.(!checked);
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`sk-switch${checked ? " is-checked" : ""}`}
      onClick={toggle}
    >
      <span className="sk-switch-handle" />
    </button>
  );
}

export function SkCheckbox({
  label,
  defaultChecked = false,
  checked: controlled,
  onChange,
}: {
  label?: ReactNode;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const checked = controlled === undefined ? internal : controlled;
  const toggle = () => {
    if (controlled === undefined) setInternal((value) => !value);
    onChange?.(!checked);
  };
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className={`sk-checkbox${checked ? " is-checked" : ""}`}
      onClick={toggle}
    >
      <span className="sk-checkbox-box" />
      {label ? <span className="sk-checkbox-label">{label}</span> : null}
    </button>
  );
}

export function SkTabs({
  items,
  active,
  onChange,
}: {
  items: string[];
  active: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="sk-page-tabs" role="tablist">
      {items.map((item, index) => (
        <button
          key={item}
          type="button"
          role="tab"
          aria-selected={index === active}
          className={`sk-page-tab${index === active ? " is-active" : ""}`}
          onClick={() => onChange(index)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function SkEmpty({ text = "暂无数据" }: { text?: string }) {
  return (
    <div className="sk-empty">
      <div className="sk-empty-image" dangerouslySetInnerHTML={{ __html: EMPTY_SVG }} />
      <p>{text}</p>
    </div>
  );
}

export type SkColumn = {
  title: ReactNode;
  key: string;
  width?: number | string;
};

export function SkTable({
  columns,
  rows,
  emptyText = "暂无数据",
  className = "",
}: {
  columns: SkColumn[];
  rows: ReactNode[][];
  emptyText?: string;
  className?: string;
}) {
  return (
    <div className="sk-table-wrap">
      <table className={`sk-table${className ? ` ${className}` : ""}`}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={column.width ? { width: column.width } : undefined}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="sk-empty-cell">
                <SkEmpty text={emptyText} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function SkPagination({
  total,
  pageSize = 10,
  showTotal = true,
}: {
  total: number;
  pageSize?: number;
  showTotal?: boolean;
}) {
  return (
    <div className="sk-pagination">
      {showTotal ? <span className="sk-pagination-total">共{total}条</span> : null}
      <button type="button" className="sk-page-btn" aria-label="left" disabled>
        ‹
      </button>
      <button type="button" className="sk-page-btn is-active">
        1
      </button>
      <button type="button" className="sk-page-btn" aria-label="right" disabled>
        ›
      </button>
      <div className="sk-page-size">
        <span>{pageSize} 条/页</span>
        <DownIcon />
      </div>
    </div>
  );
}

export function SkSearchTop({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  return (
    <div className="sk-search-top">
      <span className={disabled ? "sk-muted" : ""}>
        {disabled ? "未选择筛选字段" : "未选择筛选字段"}
      </span>
      <span className="sk-search-actions">
        <span className="sk-link">清除选项</span>
        <span className="sk-collapse">
          <span>收起</span>
          <span className="sk-up-arrow" />
        </span>
      </span>
    </div>
  );
}

export function SkCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`sk-card${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </div>
  );
}

export function SkSearchButtonGroup() {
  return (
    <div className="sk-search-buttons">
      <SkButton variant="primary">
        <span className="sk-search-icon" />
        搜索
      </SkButton>
      <SkButton>重置</SkButton>
    </div>
  );
}

export function SkActionLink({
  children,
  danger = false,
  disabled = false,
  onClick,
}: {
  children: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`sk-action-link${danger ? " is-danger" : ""}${
        disabled ? " is-disabled" : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SkRequired({ children }: { children: ReactNode }) {
  return (
    <span className="sk-required">
      <span className="sk-required-mark">*</span>
      {children}
    </span>
  );
}
