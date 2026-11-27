"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { DownIcon } from "../icons";
import {
  SkButton,
  SkCheckbox,
  SkInput,
  SkModal,
  SkSelect,
  SkUpload,
} from "../SettingsUI";

export const NOW = "2026-11-27 16:45:00";

export const MODULES = [
  "数据中心",
  "资产管理",
  "资源管理",
  "招商管理",
  "客商管理",
  "租赁管理",
  "业务财务",
  "运营管理",
  "成本管理",
  "物业管理",
  "行政办公",
  "智慧物联",
  "系统设置",
  "个人设置",
];

export type DirectoryUser = {
  name: string;
  phone: string;
  dept: string;
  no: string;
};

export const ALL_USERS: DirectoryUser[] = [
  { name: "王", phone: "+86 155****6033", dept: "大连华安物业管理有限公司、维修组", no: "1" },
  { name: "AAA", phone: "+86 138****5678", dept: "大连华安物业管理有限公司", no: "13" },
  { name: "李保洁", phone: "+86 139****0001", dept: "保洁组", no: "2" },
  { name: "张保洁", phone: "+86 139****0002", dept: "保洁组", no: "3" },
  { name: "宋保洁", phone: "+86 139****0003", dept: "保洁组", no: "4" },
  { name: "王保洁长", phone: "+86 139****0005", dept: "保洁组", no: "5" },
  { name: "李安保", phone: "+86 139****0006", dept: "安保组", no: "6" },
  { name: "张安保", phone: "+86 139****0007", dept: "安保组", no: "7" },
  { name: "刘安保", phone: "+86 139****0008", dept: "安保组", no: "8" },
  { name: "常安保长", phone: "+86 139****0009", dept: "安保组", no: "9" },
  { name: "周维修", phone: "+86 139****0010", dept: "维修组", no: "10" },
  { name: "吴维修", phone: "+86 139****0011", dept: "维修组", no: "11" },
  { name: "郑维修长", phone: "+86 139****0012", dept: "维修组", no: "12" },
  { name: "ttt", phone: "+86 132****5678", dept: "物资组", no: "14" },
];

export function Field({
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
    <div className={`sk-field${className ? ` ${className}` : ""}`}>
      {label ? (
        <label className="sk-field-label">
          {required ? <span className="sk-required-mark">*</span> : null}
          {label}
        </label>
      ) : null}
      {children}
    </div>
  );
}

export function SearchActions({
  onClear,
  collapsed = false,
  onToggle,
}: {
  onClear?: () => void;
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  return (
    <span className="sk-search-actions">
      <span className="sk-link" onClick={onClear}>
        清除选项
      </span>
      <span className="sk-collapse" onClick={onToggle}>
        <span>{collapsed ? "展开" : "收起"}</span>
        <span className={`sk-up-arrow${collapsed ? " is-down" : ""}`} />
      </span>
    </span>
  );
}

export function InnerMenu({
  items,
  active = 0,
  onChange,
  className = "",
}: {
  items: ReactNode[];
  active?: number;
  onChange?: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={`sk-inner-menu${className ? ` ${className}` : ""}`}>
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          className={`sk-inner-item${index === active ? " is-active" : ""}`}
          onClick={() => onChange?.(index)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function FormRow({
  label,
  required = false,
  children,
  hint,
}: {
  label: ReactNode;
  required?: boolean;
  children: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="sk-form-row">
      <div className="sk-form-label">
        {required ? <span className="sk-required-mark">*</span> : null}
        {label}
      </div>
      <div className="sk-form-control">
        {children}
        {hint ? <div className="sk-form-hint">{hint}</div> : null}
      </div>
    </div>
  );
}

export function UploadTile({
  square = false,
  label = "上传",
  value,
  onChange,
}: {
  square?: boolean;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <SkUpload square={square} label={label} value={value} onChange={onChange} />
  );
}

export function CheckCell({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      className={`sk-checkbox-box${checked ? " is-checked" : ""}`}
      onClick={onChange}
    />
  );
}

export type MoreItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export function MoreMenu({
  items,
  label = "更多",
  className = "",
  buttonVariant = "default",
  showCaret = true,
}: {
  items: MoreItem[];
  label?: ReactNode;
  className?: string;
  buttonVariant?: "default" | "text";
  showCaret?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (!open) {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setMenuPos({
          top: rect.bottom + 4,
          left: Math.max(8, Math.min(rect.right - 120, window.innerWidth - 136)),
        });
      }
    }
    setOpen((value) => !value);
  };

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className={`sk-more-wrap${className ? ` ${className}` : ""}`} ref={ref}>
      <SkButton variant={buttonVariant} onClick={toggleMenu}>
        {label}
        {showCaret ? <DownIcon /> : null}
      </SkButton>
      {open ? (
        <div
          className="sk-more-menu"
          role="menu"
          style={menuPos ? { top: menuPos.top, left: menuPos.left } : undefined}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className="sk-more-item"
              disabled={item.disabled}
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

export function PickerModal({
  open,
  title,
  people = ALL_USERS,
  exclude = [],
  selected,
  onChange,
  onClose,
  onOk,
  okText = "确 定",
  showDeptPicker = true,
}: {
  open: boolean;
  title: string;
  people?: DirectoryUser[];
  exclude?: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  onClose: () => void;
  onOk: () => void;
  okText?: string;
  showDeptPicker?: boolean;
}) {
  const [keyword, setKeyword] = useState("");
  const available = people.filter(
    (person) => !exclude.includes(person.name) && person.name.includes(keyword),
  );
  const groups = Array.from(new Set(available.map((person) => person.dept)));
  const allSelected =
    available.length > 0 && available.every((person) => selected.includes(person.name));

  const toggle = (name: string) => {
    onChange(
      selected.includes(name)
        ? selected.filter((item) => item !== name)
        : [...selected, name],
    );
  };

  return (
    <SkModal
      open={open}
      title={title}
      width={640}
      onClose={onClose}
      footer={
        <>
          <SkButton onClick={onClose}>取 消</SkButton>
          <SkButton variant="primary" onClick={onOk}>
            {okText}
          </SkButton>
        </>
      }
    >
      <div className="sk-member-picker">
        {showDeptPicker ? (
          <div className="sk-member-picker-tree">
            <div className="sk-picker-dept">成员</div>
            <div className="sk-tree-row is-selected">
              <span className="sk-tree-caret">⌄</span>
              <span>全部</span>
            </div>
            <div className="sk-tree-row">
              <span className="sk-tree-caret">⌄</span>
              <span>后勤部</span>
            </div>
            <div className="sk-tree-row is-leaf">
              <span className="sk-tree-person">♙</span>
              <span>维修组</span>
            </div>
            <div className="sk-tree-row is-leaf">
              <span className="sk-tree-person">♙</span>
              <span>保洁组</span>
            </div>
            <div className="sk-tree-row is-leaf">
              <span className="sk-tree-person">♙</span>
              <span>安保组</span>
            </div>
          </div>
        ) : null}
        <div className="sk-member-picker-list">
          <div className="sk-picker-toolbar">
            <SkInput
              placeholder="请输入姓名"
              value={keyword}
              onChange={setKeyword}
              className="sk-picker-search"
            />
            <SkCheckbox
              label="全选"
              checked={allSelected}
              onChange={(checked) => {
                if (checked) {
                  onChange(
                    Array.from(
                      new Set([...selected, ...available.map((person) => person.name)]),
                    ),
                  );
                } else {
                  onChange(
                    selected.filter(
                      (name) => !available.some((person) => person.name === name),
                    ),
                  );
                }
              }}
            />
          </div>
          {groups.length ? (
            groups.map((group) => (
              <div key={group}>
                <div className="sk-picker-dept">{group}</div>
                {available
                  .filter((person) => person.dept === group)
                  .map((person) => (
                    <label key={person.name} className="sk-picker-row">
                      <span>
                        {person.name}
                        <span className="sk-toolbar-muted"> {person.phone}</span>
                      </span>
                      <SkCheckbox
                        checked={selected.includes(person.name)}
                        onChange={() => toggle(person.name)}
                      />
                    </label>
                  ))}
              </div>
            ))
          ) : (
            <div className="sk-empty-inline">暂无成员</div>
          )}
          <div className="sk-picker-selected">
            已选择：
            {selected.length ? (
              selected.map((name) => (
                <span key={name} className="sk-picker-tag">
                  {name}
                  <button type="button" onClick={() => toggle(name)}>
                    ×
                  </button>
                </span>
              ))
            ) : (
              <span className="sk-toolbar-muted">未选择</span>
            )}
          </div>
        </div>
      </div>
    </SkModal>
  );
}

export function StatusSelect({
  value,
  onChange,
  placeholder = "请选择状态",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <SkSelect
      placeholder={placeholder}
      value={value}
      options={["开启", "关闭"]}
      onChange={onChange}
    />
  );
}
