"use client";

import { useState, type ReactNode } from "react";

import { SpriteIcon } from "../app/icons";
import { SkButton } from "../app/SettingsUI";

export type SubMenuItem = {
  name: string;
  icon?: string;
  children?: SubMenuItem[];
};

export function SubSidebar({
  brand,
  icon,
  items,
  active,
  onChange,
  defaultOpen = [],
  iconColor,
}: {
  brand: string;
  icon?: string;
  items: SubMenuItem[];
  active: string;
  onChange: (name: string) => void;
  defaultOpen?: string[];
  iconColor?: string;
}) {
  const [open, setOpen] = useState<string[]>(defaultOpen);

  const render = (list: SubMenuItem[], depth = 0) =>
    list.map((item) =>
      item.children?.length ? (
        <div key={item.name}>
          <button
            type="button"
            className={`pp-sub-group${open.includes(item.name) ? " is-open" : ""}`}
            style={{ paddingLeft: 14 + depth * 14 }}
            onClick={() =>
              setOpen((current) =>
                current.includes(item.name)
                  ? current.filter((name) => name !== item.name)
                  : [...current, item.name],
              )
            }
          >
            <span>{item.name}</span>
            <span className="pp-sub-caret">⌃</span>
          </button>
          {open.includes(item.name) ? render(item.children, depth + 1) : null}
        </div>
      ) : (
        <button
          key={item.name}
          type="button"
          className={`pp-sub-item${active === item.name ? " is-active" : ""}`}
          style={{ paddingLeft: 14 + depth * 18 }}
          onClick={() => onChange(item.name)}
        >
          {item.icon ? <SpriteIcon name={item.icon} className="pp-sub-item-icon" /> : null}
          <span>{item.name}</span>
        </button>
      ),
    );

  return (
    <aside className="pp-sub-side">
      <div className="pp-sub-brand">
        {icon ? <SpriteIcon name={icon} className="pp-sub-brand-icon" style={{ color: iconColor }} /> : null}
        <strong>{brand}</strong>
      </div>
      <div className="pp-sub-menu">{render(items)}</div>
    </aside>
  );
}

export function PropertyToolbar({
  title,
  children,
}: {
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="pp-toolbar">
      <div className="pp-toolbar-title">{title}</div>
      <div className="pp-toolbar-actions">{children}</div>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <SkButton variant="primary" onClick={onClick}>
      {children}
    </SkButton>
  );
}
