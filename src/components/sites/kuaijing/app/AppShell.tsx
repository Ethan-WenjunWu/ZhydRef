"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";

import {
  ACCOUNT,
  NOTICES,
  SIDEBAR,
  TOP_MODULES,
  type SidebarPage,
} from "./data";
import { EMPTY_SVG } from "./empty-svg";
import {
  CaretRightIcon,
  CloseCircleIcon,
  CloseIcon,
  DownIcon,
  ExpandIcon,
  FolderIcon,
  FullscreenIcon,
  MenuFoldIcon,
  MinusCircleIcon,
  ReloadIcon,
  SelectIcon,
  SpriteIcon,
  SyncIcon,
} from "./icons";
import "./kuaijing-app.css";

const TOP_ITEM_WIDTH = 105;

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(TOP_MODULES.length);
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [tabMenuOpen, setTabMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [noticeTab, setNoticeTab] = useState(0);
  const [selectedNotice, setSelectedNotice] = useState(0);

  const topMenuRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);
  const tabMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = topMenuRef.current;
    if (!el) return;
    const update = () => {
      const fit = Math.floor(el.clientWidth / TOP_ITEM_WIDTH);
      const next = Math.max(
        1,
        Math.min(TOP_MODULES.length, fit - 2),
      );
      setVisibleCount(next);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [collapsed]);

  useEffect(() => {
    if (!overflowOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!overflowRef.current?.contains(event.target as Node)) {
        setOverflowOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [overflowOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen]);

  useEffect(() => {
    if (!tabMenuOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!tabMenuRef.current?.contains(event.target as Node)) {
        setTabMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTabMenuOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [tabMenuOpen]);

  const toggleGroup = (key: string) => {
    setOpenGroups((current) => ({ ...current, [key]: !current[key] }));
  };

  const hiddenModules = TOP_MODULES.slice(visibleCount);
  const showMore = hiddenModules.length > 0;

  const filteredNotices = NOTICES.filter((item) => {
    if (noticeTab === 1) return item.count > 0;
    if (noticeTab === 2) return item.count === 0;
    return true;
  });

  return (
    <div className="kuaijing-app">
      <div className="ka-watermark" aria-hidden />

      <header className="ka-header">
        <section className="ka-logo-box">
          <div className="ka-logo-square">
            <img
              src="/sites/kuaijing/images/org-logo.png"
              alt=""
              width={16}
              height={16}
            />
          </div>
          <div className="ka-title-ctn">
            <div className="ka-title-org">{ACCOUNT.company}</div>
            <div className="ka-title-building">
              <span>
                选择<span className="ka-building-num">{ACCOUNT.building}</span>
                楼宇
              </span>
              <CaretRightIcon className="ka-title-caret" />
            </div>
          </div>
        </section>

        <div className="ka-top-menu" ref={topMenuRef}>
          {TOP_MODULES.slice(0, visibleCount).map((module, index) => (
            <button
              key={module.key}
              type="button"
              className={`ka-top-item${index === 0 ? " is-selected" : ""}`}
            >
              <SpriteIcon name={module.icon} className="ka-top-icon" />
              <span className="ka-top-text">{module.name}</span>
            </button>
          ))}
          {showMore ? (
            <div className="ka-top-more" ref={overflowRef}>
              <button
                type="button"
                className="ka-top-item ka-top-more-btn"
                onClick={() => setOverflowOpen((open) => !open)}
                aria-expanded={overflowOpen}
              >
                <SpriteIcon name="org-menu-shezhi" className="ka-top-icon" />
                <span className="ka-top-text">更多</span>
              </button>
              {overflowOpen ? (
                <div className="ka-more-dropdown" role="menu">
                  {hiddenModules.map((module) => (
                    <button
                      key={module.key}
                      type="button"
                      className="ka-more-item"
                      role="menuitem"
                      onClick={() => setOverflowOpen(false)}
                    >
                      <SpriteIcon name={module.icon} />
                      <span>{module.name}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="ka-extra">
          <span className="ka-notice-badge-wrap">
            <button
              type="button"
              className="ka-message-btn"
              onClick={() => setDrawerOpen(true)}
            >
              <SpriteIcon name="org-menu-xiaoxi" className="ka-message-icon" />
              <span>消息</span>
            </button>
            <sup className="ka-badge">2</sup>
          </span>
          <div className="ka-header-divider" />
          <div className="ka-user">
            <img
              className="ka-user-avatar"
              src="/sites/kuaijing/images/user-avatar.png"
              alt=""
              width={18}
              height={18}
            />
            <span className="ka-user-name">{ACCOUNT.userName}</span>
            <DownIcon className="ka-user-down" />
          </div>
        </div>
      </header>

      <div className="ka-body">
        <aside className={`ka-sider${collapsed ? " is-collapsed" : ""}`}>
          <div className="ka-sider-title">
            <SpriteIcon name="org-menu-zonglan-xuanzhong" />
            {collapsed ? null : (
              <span className="ka-sider-title-text">数据中心</span>
            )}
          </div>

          <div className="ka-sider-menu">
            {SIDEBAR.map((node) =>
              node.type === "page" ? (
                <SideItem
                  key={node.key}
                  page={node}
                  collapsed={collapsed}
                  selected={node.key === "menu-workbench-999999999"}
                />
              ) : (
                <div
                  key={node.key}
                  className={`ka-side-group${
                    openGroups[node.key] ? " is-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="ka-side-group-title"
                    onClick={() => toggleGroup(node.key)}
                    title={collapsed ? node.name : undefined}
                  >
                    <SpriteIcon name={node.icon} className="ka-side-icon" />
                    {collapsed ? null : (
                      <>
                        <span className="ka-side-text">{node.name}</span>
                        <span className="ka-side-arrow" />
                      </>
                    )}
                  </button>
                  {!collapsed && openGroups[node.key]
                    ? node.children.map((page) => (
                        <SideItem
                          key={page.key}
                          page={page}
                          collapsed={false}
                          selected={false}
                          child
                        />
                      ))
                    : null}
                </div>
              ),
            )}
          </div>

          <div className="ka-sider-footer">
            <button
              type="button"
              className="ka-fold-btn"
              aria-label={collapsed ? "展开菜单" : "折叠菜单"}
              onClick={() => setCollapsed((value) => !value)}
            >
              <MenuFoldIcon
                style={{ transform: collapsed ? "rotate(180deg)" : undefined }}
              />
            </button>
          </div>
        </aside>

        <main className="ka-content">
          <div className="ka-tabbar">
            <div className="ka-tab is-active">
              <SpriteIcon
                name="org-menu-gongzuotai"
                className="ka-tab-icon"
              />
              <span className="ka-tab-text">工作台</span>
              <button
                type="button"
                className="ka-tab-reload"
                aria-label="reload"
                onClick={() => window.location.reload()}
              >
                <ReloadIcon />
              </button>
            </div>
            <div className="ka-tab-ink" />
            <div className="ka-tab-more-wrap" ref={tabMenuRef}>
              <button
                type="button"
                className="ka-tab-more"
                aria-expanded={tabMenuOpen}
                onClick={() => setTabMenuOpen((open) => !open)}
              >
                <span>更多</span>
                <DownIcon />
              </button>
              {tabMenuOpen ? (
                <div className="ka-tab-dropdown" role="menu">
                  <button
                    type="button"
                    className="ka-tab-dropdown-item"
                    onClick={() => window.location.reload()}
                  >
                    <SyncIcon />
                    <span>刷新</span>
                  </button>
                  <button
                    type="button"
                    className="ka-tab-dropdown-item"
                    onClick={() => setTabMenuOpen(false)}
                  >
                    <FullscreenIcon />
                    <span>最大化</span>
                  </button>
                  <button
                    type="button"
                    className="ka-tab-dropdown-item"
                    onClick={() => {
                      setTabMenuOpen(false);
                      void document.documentElement.requestFullscreen?.();
                    }}
                  >
                    <ExpandIcon />
                    <span>全屏</span>
                  </button>
                  <button
                    type="button"
                    className="ka-tab-dropdown-item"
                    onClick={() => {
                      setTabMenuOpen(false);
                      window.open(window.location.href, "_blank", "noopener");
                    }}
                  >
                    <SelectIcon />
                    <span>新窗口打开</span>
                  </button>
                  <div className="ka-tab-dropdown-divider" />
                  <button
                    type="button"
                    className="ka-tab-dropdown-item"
                    disabled
                  >
                    <MinusCircleIcon />
                    <span>关闭当前</span>
                  </button>
                  <button
                    type="button"
                    className="ka-tab-dropdown-item"
                    disabled
                  >
                    <CloseCircleIcon />
                    <span>关闭其他</span>
                  </button>
                  <button
                    type="button"
                    className="ka-tab-dropdown-item"
                    onClick={() => setTabMenuOpen(false)}
                  >
                    <FolderIcon />
                    <span>关闭所有</span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <section className="ka-route">{children}</section>
        </main>
      </div>

      {drawerOpen ? (
        <div className="ka-drawer-root">
          <div
            className="ka-drawer-mask"
            onClick={() => setDrawerOpen(false)}
          />
          <div
            className="ka-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="通知列表"
          >
            <div className="ka-drawer-watermark" aria-hidden />
            <div className="ka-drawer-header">
              <button
                type="button"
                className="ka-drawer-close"
                aria-label="Close"
                onClick={() => setDrawerOpen(false)}
              >
                <CloseIcon />
              </button>
              <div className="ka-drawer-title">通知列表</div>
            </div>
            <div className="ka-drawer-body">
              <div className="ka-notice-left">
                <div className="ka-notice-tabs" role="tablist">
                  {["全部", "未处理", "已完成"].map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      role="tab"
                      aria-selected={noticeTab === index}
                      className={`ka-notice-tab${
                        noticeTab === index ? " is-active" : ""
                      }`}
                      onClick={() => {
                        setNoticeTab(index);
                        setSelectedNotice(0);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <ul className="ka-notice-list">
                  {filteredNotices.map((item, index) => (
                    <li
                      key={item.name}
                      className={`ka-notice-item${
                        selectedNotice === index ? " is-selected" : ""
                      }`}
                      onClick={() => setSelectedNotice(index)}
                    >
                      <div className="ka-notice-avatar">
                        <img src={item.avatar} alt="" />
                      </div>
                      <div className="ka-notice-info">
                        <div className="ka-notice-name">
                          <span>{item.name}</span>
                          <span className="ka-notice-time">{item.time}</span>
                        </div>
                        <div className="ka-notice-last">
                          <span>{item.message}</span>
                          {item.count > 0 ? (
                            <sup className="ka-notice-count">{item.count}</sup>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ka-notice-detail">
                <div className="ka-drawer-empty">
                  <div
                    className="ka-drawer-empty-image"
                    dangerouslySetInnerHTML={{ __html: EMPTY_SVG }}
                  />
                  <p>请点击左侧通知分类查看</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SideItem({
  page,
  collapsed,
  selected,
  child = false,
}: {
  page: SidebarPage;
  collapsed: boolean;
  selected: boolean;
  child?: boolean;
}) {
  return (
    <button
      type="button"
      className={`ka-side-item${selected ? " is-selected" : ""}${
        child ? " is-child" : ""
      }`}
      title={collapsed ? page.name : undefined}
    >
      <SpriteIcon name={page.icon} className="ka-side-icon" />
      {collapsed ? null : <span className="ka-side-text">{page.name}</span>}
    </button>
  );
}
