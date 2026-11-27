"use client";

import type { ReactNode } from "react";

import { SkButton } from "../app/SettingsUI";

export function OfficeSearchButtonGroup({
  onSearch,
  onReset,
}: {
  onSearch?: () => void;
  onReset?: () => void;
}) {
  return (
    <div className="of-search-buttons">
      <SkButton variant="primary" onClick={onSearch}>
        <span className="sk-search-icon" />
        搜索
      </SkButton>
      <SkButton onClick={onReset}>
        <span className="of-reset-icon">↻</span>
        重置
      </SkButton>
    </div>
  );
}

export function OfficeField({
  label,
  required = false,
  children,
  className = "",
}: {
  label?: ReactNode;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`of-field${className ? ` ${className}` : ""}`}>
      {label ? (
        <label className="of-field-label">
          {required ? <span className="sk-required-mark">*</span> : null}
          {label}
        </label>
      ) : null}
      {children}
    </div>
  );
}

export function StatusTag({
  children,
  color = "green",
}: {
  children: ReactNode;
  color?: "green" | "blue" | "orange" | "red" | "gray";
}) {
  return <span className={`of-tag is-${color}`}>{children}</span>;
}

export function OfficeEmpty({ text = "暂无数据" }: { text?: string }) {
  return <div className="of-empty">{text}</div>;
}

export function exportCsv(filename: string, header: string[], rows: string[][]) {
  const csv = [header.join(","), ...rows.map((row) => row.join(","))].join("\n");
  const blob = new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
