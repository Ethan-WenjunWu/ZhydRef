"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { EMPTY_SVG } from "./empty-svg";
import { CloseIcon, DownIcon } from "./icons";
import "./kuaijing-settings.css";

export function SkButton({
  children,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
  onClick,
  title,
}: {
  children: ReactNode;
  variant?: "default" | "primary" | "outline" | "text" | "danger";
  size?: "md" | "sm";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button
      type="button"
      className={`sk-btn sk-btn-${variant} sk-btn-${size}${className ? ` ${className}` : ""}`}
      disabled={disabled}
      title={title}
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
  onEnter,
  className = "",
  type = "text",
  disabled = false,
  min,
}: {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  className?: string;
  type?: string;
  disabled?: boolean;
  min?: number;
}) {
  return (
    <input
      className={`sk-input${className ? ` ${className}` : ""}`}
      placeholder={placeholder}
      defaultValue={value === undefined ? defaultValue : undefined}
      value={value}
      type={type}
      min={min}
      disabled={disabled}
      onChange={(event) => onChange?.(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") onEnter?.();
      }}
    />
  );
}

export type SkSelectOption = string | { label: string; value: string };

function optionLabel(option: SkSelectOption) {
  return typeof option === "string" ? option : option.label;
}

function optionValue(option: SkSelectOption) {
  return typeof option === "string" ? option : option.value;
}

export function SkSelect({
  placeholder,
  value: controlledValue,
  defaultValue = "",
  options = [],
  onChange,
  className = "",
  disabled = false,
}: {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  options?: SkSelectOption[];
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}) {
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const value = controlledValue === undefined ? internal : controlledValue;

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const choose = (option: SkSelectOption) => {
    if (disabled) return;
    const next = optionValue(option);
    if (controlledValue === undefined) setInternal(next);
    onChange?.(next);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`sk-select${open ? " is-open" : ""}${disabled ? " is-disabled" : ""}${
        className ? ` ${className}` : ""
      }`}
      role="combobox"
      aria-expanded={open}
      aria-controls={listId}
      aria-haspopup="listbox"
      tabIndex={disabled ? -1 : 0}
      onClick={() => {
        if (!disabled) setOpen((current) => !current);
      }}
      onKeyDown={(event) => {
        if (disabled) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setOpen((current) => !current);
        }
      }}
    >
      <span className={value ? "sk-select-value" : "sk-placeholder"}>
        {value || placeholder}
      </span>
      <DownIcon />
      {open ? (
        <div className="sk-select-dropdown" role="listbox" id={listId}>
          {options.length ? (
            options.map((option) => {
              const optionVal = optionValue(option);
              return (
                <button
                  key={optionVal}
                  type="button"
                  role="option"
                  aria-selected={optionVal === value}
                  className={`sk-select-option${optionVal === value ? " is-selected" : ""}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    choose(option);
                  }}
                >
                  {optionLabel(option)}
                </button>
              );
            })
          ) : (
            <div className="sk-select-empty">暂无数据</div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function SkRadio({
  label,
  checked,
  onChange,
  disabled = false,
}: {
  label: ReactNode;
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      className={`sk-radio${checked ? " is-checked" : ""}`}
      disabled={disabled}
      onClick={onChange}
    >
      <span className="sk-radio-dot" />
      <span>{label}</span>
    </button>
  );
}

export function SkSwitch({
  defaultChecked = false,
  checked: controlled,
  onChange,
  disabled = false,
}: {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const checked = controlled === undefined ? internal : controlled;
  const toggle = () => {
    if (disabled) return;
    if (controlled === undefined) setInternal((value) => !value);
    onChange?.(!checked);
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={`sk-switch${checked ? " is-checked" : ""}`}
      onClick={toggle}
    >
      <span className="sk-switch-inner">{checked ? "开启" : ""}</span>
      <span className="sk-switch-handle" />
    </button>
  );
}

export function SkCheckbox({
  label,
  defaultChecked = false,
  checked: controlled,
  onChange,
  disabled = false,
  className = "",
}: {
  label?: ReactNode;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const checked = controlled === undefined ? internal : controlled;
  const toggle = () => {
    if (disabled) return;
    if (controlled === undefined) setInternal((value) => !value);
    onChange?.(!checked);
  };
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      className={`sk-checkbox${checked ? " is-checked" : ""}${
        className ? ` ${className}` : ""
      }`}
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
  rowClassName,
}: {
  columns: SkColumn[];
  rows: ReactNode[][];
  emptyText?: string;
  className?: string;
  rowClassName?: (index: number) => string;
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
              <tr key={rowIndex} className={rowClassName?.(rowIndex)}>
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
  pageSize: controlledPageSize,
  showTotal = true,
  page: controlledPage,
  onPageChange,
  onPageSizeChange,
}: {
  total: number;
  pageSize?: number;
  showTotal?: boolean;
  page?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}) {
  const [innerPage, setInnerPage] = useState(1);
  const [innerSize, setInnerSize] = useState(controlledPageSize ?? 10);
  const [sizeOpen, setSizeOpen] = useState(false);
  const sizeRef = useRef<HTMLDivElement>(null);
  const page = controlledPage === undefined ? innerPage : controlledPage;
  const pageSize = controlledPageSize ?? innerSize;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (!sizeOpen) return;
    const close = (event: MouseEvent) => {
      if (!sizeRef.current?.contains(event.target as Node)) setSizeOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [sizeOpen]);

  const go = (next: number) => {
    const target = Math.min(Math.max(1, next), pageCount);
    if (controlledPage === undefined) setInnerPage(target);
    onPageChange?.(target, pageSize);
  };

  const numbers: number[] = [];
  for (let current = 1; current <= pageCount; current += 1) {
    if (
      pageCount <= 7 ||
      current === 1 ||
      current === pageCount ||
      Math.abs(current - page) <= 1
    ) {
      numbers.push(current);
    }
  }

  return (
    <div className="sk-pagination">
      {showTotal ? <span className="sk-pagination-total">共{total}条</span> : null}
      <button
        type="button"
        className="sk-page-btn"
        aria-label="left"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
      >
        ‹
      </button>
      {numbers.map((number, index) => (
        <span key={number} className="sk-page-number-wrap">
          {index > 0 && number - numbers[index - 1] > 1 ? (
            <span className="sk-page-ellipsis">…</span>
          ) : null}
          <button
            type="button"
            className={`sk-page-btn${number === page ? " is-active" : ""}`}
            onClick={() => go(number)}
          >
            {number}
          </button>
        </span>
      ))}
      <button
        type="button"
        className="sk-page-btn"
        aria-label="right"
        disabled={page >= pageCount}
        onClick={() => go(page + 1)}
      >
        ›
      </button>
      <div className="sk-page-size" ref={sizeRef}>
        <button
          type="button"
          className="sk-page-size-trigger"
          onClick={() => setSizeOpen((open) => !open)}
        >
          <span>{pageSize} 条/页</span>
          <DownIcon />
        </button>
        {sizeOpen ? (
          <div className="sk-page-size-dropdown">
            {[10, 20, 50, 100].map((size) => (
              <button
                key={size}
                type="button"
                className={`sk-select-option${size === pageSize ? " is-selected" : ""}`}
                onClick={() => {
                  if (controlledPage === undefined) {
                    setInnerSize(size);
                    setInnerPage(1);
                  }
                  onPageSizeChange?.(size);
                  onPageChange?.(1, size);
                  setSizeOpen(false);
                }}
              >
                {size} 条/页
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function SkSearchTop({
  disabled = false,
  onClear,
  collapsed = false,
  onToggle,
}: {
  disabled?: boolean;
  onClear?: () => void;
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="sk-search-top">
      <span className={disabled ? "sk-muted" : ""}>
        {disabled ? "未选择筛选字段" : "未选择筛选字段"}
      </span>
      <span className="sk-search-actions">
        <span className="sk-link" onClick={onClear}>
          清除选项
        </span>
        <span className="sk-collapse" onClick={onToggle}>
          <span>{collapsed ? "展开" : "收起"}</span>
          <span className={`sk-up-arrow${collapsed ? " is-down" : ""}`} />
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
  style?: CSSProperties;
}) {
  return (
    <div className={`sk-card${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </div>
  );
}

export function SkSearchButtonGroup({
  onSearch,
  onReset,
}: {
  onSearch?: () => void;
  onReset?: () => void;
}) {
  return (
    <div className="sk-search-buttons">
      <SkButton variant="primary" onClick={onSearch}>
        <span className="sk-search-icon" />
        搜索
      </SkButton>
      <SkButton onClick={onReset}>重置</SkButton>
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

export function SkUpload({
  square = false,
  label = "上传",
  value,
  onChange,
}: {
  square?: boolean;
  label?: string;
  value?: string;
  onChange?: (dataUrl: string) => void;
}) {
  return (
    <label className={`sk-upload${square ? " is-square" : ""}${value ? " has-image" : ""}`}>
      {value ? (
        <img src={value} alt="" className="sk-upload-preview" />
      ) : (
        <>
          <span className="sk-upload-plus">+</span>
          <span>{label}</span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="sk-upload-input"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => onChange?.(String(reader.result ?? ""));
          reader.readAsDataURL(file);
          event.target.value = "";
        }}
      />
    </label>
  );
}

export function SkModal({
  open,
  title,
  width = 520,
  onClose,
  children,
  footer,
  className = "",
  bodyStyle,
}: {
  open: boolean;
  title?: ReactNode;
  width?: number | string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyStyle?: CSSProperties;
}) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="sk-modal-root">
      <div className="sk-modal-mask" onClick={onClose} />
      <div
        className={`sk-modal-panel${className ? ` ${className}` : ""}`}
        style={{ width }}
        role="dialog"
        aria-modal="true"
      >
        <div className="sk-modal-header">
          <div className="sk-modal-title">{title}</div>
          <button type="button" className="sk-modal-close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="sk-modal-body" style={bodyStyle}>
          {children}
        </div>
        {footer ? <div className="sk-modal-footer">{footer}</div> : null}
      </div>
    </div>
  );
}

export function SkDrawer({
  open,
  title,
  width = 450,
  onClose,
  children,
  footer,
  className = "",
}: {
  open: boolean;
  title?: ReactNode;
  width?: number;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="sk-drawer-root">
      <div className="sk-drawer-mask" onClick={onClose} />
      <div
        className={`sk-drawer-panel${className ? ` ${className}` : ""}`}
        style={{ width }}
        role="dialog"
        aria-modal="true"
      >
        <div className="sk-drawer-header">
          <div className="sk-drawer-title">{title}</div>
          <button type="button" className="sk-drawer-close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="sk-drawer-body">{children}</div>
        {footer ? <div className="sk-drawer-footer">{footer}</div> : null}
      </div>
    </div>
  );
}

export function SkConfirm({
  open,
  title = "提示",
  content,
  okText = "确 定",
  cancelText = "取 消",
  danger = false,
  onCancel,
  onOk,
}: {
  open: boolean;
  title?: string;
  content: ReactNode;
  okText?: string;
  cancelText?: string;
  danger?: boolean;
  onCancel: () => void;
  onOk: () => void;
}) {
  return (
    <SkModal
      open={open}
      title={title}
      width={416}
      onClose={onCancel}
      className="sk-confirm"
      footer={
        <>
          <SkButton onClick={onCancel}>{cancelText}</SkButton>
          <SkButton variant={danger ? "danger" : "primary"} onClick={onOk}>
            {okText}
          </SkButton>
        </>
      }
    >
      <div className="sk-confirm-content">
        <span className="sk-confirm-icon">!</span>
        <span>{content}</span>
      </div>
    </SkModal>
  );
}

export function useSkMessage() {
  const [message, setMessage] = useState("");
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const show = (text: string) => {
    setMessage(text);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setMessage(""), 2000);
  };

  const node = message ? (
    <div className="sk-message" role="status">
      <span className="sk-message-icon">✓</span>
      <span>{message}</span>
    </div>
  ) : null;

  return { show, node };
}
