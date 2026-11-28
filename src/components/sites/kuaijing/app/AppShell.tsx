"use client";

/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import {
  ACCOUNT,
  ASSET_PAGE_BY_KEY,
  DATA_PAGE_BY_KEY,
  INVEST_PAGE_BY_KEY,
  NOTICES,
  OFFICE_PAGE_BY_KEY,
  OPERATION_PAGE_BY_KEY,
  PROPERTY_PAGE_BY_KEY,
  RESOURCE_PAGE_BY_KEY,
  SETTINGS_PAGE_BY_KEY,
  SIDEBAR,
  TOP_MODULES,
  assetHref,
  dataHref,
  investHref,
  officeHref,
  operationHref,
  propertyHref,
  resourceHref,
  settingsHref,
  type SidebarNode,
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
const WORKBENCH_TAB = "menu-workbench-999999999";
const SERVER_TABS = [WORKBENCH_TAB];

const tabStore: {
  tabs: string[];
  listeners: Set<() => void>;
} = {
  tabs: [WORKBENCH_TAB],
  listeners: new Set(),
};

function notifyTabs() {
  for (const listener of tabStore.listeners) listener();
}

function subscribeTabs(listener: () => void) {
  tabStore.listeners.add(listener);
  return () => tabStore.listeners.delete(listener);
}

function getTabs() {
  return tabStore.tabs;
}

function openSiteTab(key: string) {
  if (!key || key === WORKBENCH_TAB || tabStore.tabs.includes(key)) return;
  tabStore.tabs = [...tabStore.tabs, key];
  notifyTabs();
}

function closeSiteTab(key: string) {
  if (!tabStore.tabs.includes(key)) return;
  tabStore.tabs = tabStore.tabs.filter((item) => item !== key);
  notifyTabs();
}

function closeOtherSiteTabs(keep: string | undefined) {
  const next = keep && keep !== WORKBENCH_TAB ? [WORKBENCH_TAB, keep] : [WORKBENCH_TAB];
  tabStore.tabs = next;
  notifyTabs();
}

function closeAllSiteTabs() {
  tabStore.tabs = [WORKBENCH_TAB];
  notifyTabs();
}

type AppShellProps = {
  children: React.ReactNode;
  activeTopKey?: string;
  sidebar?: SidebarNode[];
  sidebarTitle?: string;
  sidebarTitleIcon?: string;
  activeLeafKey?: string;
  tabTitle?: string;
  tabIcon?: string;
  leafHref?: (key: string) => string | undefined;
  newTabKeys?: string[];
};

function collectGroupKeys(
  nodes: SidebarNode[],
  targetKey: string | undefined,
  ancestors: string[] = [],
): string[] | null {
  if (!targetKey) return null;
  for (const node of nodes) {
    if (node.type === "page") {
      if (node.key === targetKey) return ancestors;
    } else {
      const found = collectGroupKeys(node.children, targetKey, [
        ...ancestors,
        node.key,
      ]);
      if (found) return found;
    }
  }
  return null;
}

export function AppShell({
  children,
  activeTopKey = "menu-home-30004",
  sidebar = SIDEBAR,
  sidebarTitle = "数据中心",
  sidebarTitleIcon = "org-menu-zonglan-xuanzhong",
  activeLeafKey = "menu-workbench-999999999",
  tabTitle = "工作台",
  tabIcon = "org-menu-gongzuotai",
  leafHref,
  newTabKeys = [],
}: AppShellProps) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const keys = collectGroupKeys(sidebar, activeLeafKey) ?? [];
    return Object.fromEntries(keys.map((key) => [key, true]));
  });
  const [visibleCount, setVisibleCount] = useState(TOP_MODULES.length);
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [tabMenuOpen, setTabMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [noticeTab, setNoticeTab] = useState(0);
  const [selectedNotice, setSelectedNotice] = useState(0);

  const openTabs = useSyncExternalStore(
    subscribeTabs,
    getTabs,
    () => SERVER_TABS,
  );

  const topMenuRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);
  const tabMenuRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      activeTopKey === "menu-setting-30002" ||
      activeTopKey === "menu-office-30010" ||
      activeTopKey === "menu-property-30009" ||
      activeTopKey === "menu-operationManage-30006" ||
      activeTopKey === "menu-workProperty-220001" ||
      activeTopKey === "menu-orgLouyu-30005" ||
      activeTopKey === "menu-attractInvestment-30001" ||
      (activeTopKey === "menu-home-30004" && DATA_PAGE_BY_KEY[activeLeafKey])
    ) {
      openSiteTab(activeLeafKey);
    }
  }, [activeTopKey, activeLeafKey]);

  useEffect(() => {
    activeTabRef.current?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [activeLeafKey, openTabs]);

  useEffect(() => {
    const el = topMenuRef.current;
    if (!el) return;
    const update = () => {
      const fit = Math.floor(el.clientWidth / TOP_ITEM_WIDTH);
      const next = Math.max(1, Math.min(TOP_MODULES.length, fit - 1));
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

  const navigateLeaf = (key: string) => {
    const href = leafHref?.(key);
    if (!href) return;
    if (newTabKeys.includes(key)) window.open(href, "_blank", "noopener");
    else router.push(href);
  };

  const openTopModule = (key: string) => {
    if (key === "menu-home-30004") {
      router.push("/orgs/index");
    } else if (key === "menu-setting-30002") {
      router.push("/orgs/settings/company-info");
    } else if (key === "menu-office-30010") {
      router.push("/orgs/office/overview");
    } else if (key === "menu-property-30009") {
      router.push("/orgs/property/repair");
    } else if (key === "menu-operationManage-30006") {
      router.push("/orgs/operation/checkin");
    } else if (key === "menu-workProperty-220001") {
      router.push("/orgs/asset/overview");
    } else if (key === "menu-orgLouyu-30005") {
      router.push("/orgs/resource/rent-control");
    } else if (key === "menu-attractInvestment-30001") {
      router.push("/orgs/investment/investment-projects");
    }
    setOverflowOpen(false);
  };

  const hiddenModules = TOP_MODULES.slice(visibleCount);
  const showMore = hiddenModules.length > 0;
  const isDataPage =
    activeTopKey === "menu-home-30004" && Boolean(DATA_PAGE_BY_KEY[activeLeafKey]);
  const isWorkbench = activeTopKey === "menu-home-30004" && !isDataPage;
  const showWorkbenchTab = activeTopKey === "menu-home-30004";
  const isModulePage =
    activeTopKey === "menu-setting-30002" ||
    activeTopKey === "menu-office-30010" ||
    activeTopKey === "menu-property-30009" ||
    activeTopKey === "menu-operationManage-30006" ||
    activeTopKey === "menu-workProperty-220001" ||
    activeTopKey === "menu-orgLouyu-30005" ||
    activeTopKey === "menu-attractInvestment-30001" ||
    isDataPage;
  const moduleTabKeys = openTabs.filter((key) => key !== WORKBENCH_TAB);
  if (
    isModulePage &&
    activeLeafKey !== WORKBENCH_TAB &&
    !moduleTabKeys.includes(activeLeafKey)
  ) {
    moduleTabKeys.push(activeLeafKey);
  }

  const filteredNotices = NOTICES.filter((item) => {
    if (noticeTab === 1) return item.count > 0;
    if (noticeTab === 2) return item.count === 0;
    return true;
  });

  const renderNodes = (nodes: SidebarNode[], depth = 0) =>
    nodes.map((node) =>
      node.type === "page" ? (
        <SideItem
          key={node.key}
          node={node}
          depth={depth}
          collapsed={collapsed}
          selected={node.key === activeLeafKey}
          onNavigate={navigateLeaf}
        />
      ) : (
        <div
          key={node.key}
          className={`ka-side-group${openGroups[node.key] ? " is-open" : ""}`}
        >
          <button
            type="button"
            className="ka-side-group-title"
            style={
              collapsed
                ? undefined
                : { paddingLeft: 19 + depth * 19, paddingRight: 34 }
            }
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
            ? renderNodes(node.children, depth + 1)
            : null}
        </div>
      ),
    );

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
          {TOP_MODULES.slice(0, visibleCount).map((module) => (
            <button
              key={module.key}
              type="button"
              className={`ka-top-item${
                module.key === activeTopKey ? " is-selected" : ""
              }`}
              onClick={() => openTopModule(module.key)}
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
                      className={`ka-more-item${
                        module.key === activeTopKey ? " is-selected" : ""
                      }`}
                      role="menuitem"
                      onClick={() => openTopModule(module.key)}
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
            <SpriteIcon name={sidebarTitleIcon} />
            {collapsed ? null : (
              <span className="ka-sider-title-text">{sidebarTitle}</span>
            )}
          </div>

          <div className="ka-sider-menu">{renderNodes(sidebar)}</div>

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
            <div className="ka-tab-list">
              {showWorkbenchTab ? (
                <div
                  ref={isWorkbench ? activeTabRef : undefined}
                  className={`ka-tab${isWorkbench ? " is-active" : ""}`}
                  onClick={() => router.push("/orgs/index")}
                >
                  <SpriteIcon name="org-menu-gongzuotai" className="ka-tab-icon" />
                  <span className="ka-tab-text">工作台</span>
                  {isWorkbench ? (
                    <button
                      type="button"
                      className="ka-tab-reload"
                      aria-label="reload"
                      onClick={(event) => {
                        event.stopPropagation();
                        window.location.reload();
                      }}
                    >
                      <ReloadIcon />
                    </button>
                  ) : null}
                </div>
              ) : null}

              {moduleTabKeys.map((key) => {
                const page = SETTINGS_PAGE_BY_KEY[key] ?? OFFICE_PAGE_BY_KEY[key] ?? PROPERTY_PAGE_BY_KEY[key] ?? OPERATION_PAGE_BY_KEY[key] ?? DATA_PAGE_BY_KEY[key] ?? ASSET_PAGE_BY_KEY[key] ?? RESOURCE_PAGE_BY_KEY[key] ?? INVEST_PAGE_BY_KEY[key];
                const active = !isWorkbench && key === activeLeafKey;
                const name = page?.name ?? (active ? tabTitle : key);
                const icon = page?.icon ?? tabIcon;
                return (
                  <div
                    key={key}
                    ref={active ? activeTabRef : undefined}
                    className={`ka-tab${active ? " is-active" : ""}`}
                    onClick={() => {
                      const href = settingsHref(key) ?? officeHref(key) ?? propertyHref(key) ?? operationHref(key) ?? dataHref(key) ?? assetHref(key) ?? resourceHref(key) ?? investHref(key);
                      if (href) router.push(href);
                    }}
                  >
                    <SpriteIcon name={icon} className="ka-tab-icon" />
                    <span className="ka-tab-text">{name}</span>
                    {active ? (
                      <button
                        type="button"
                        className="ka-tab-reload"
                        aria-label="reload"
                        onClick={(event) => {
                          event.stopPropagation();
                          window.location.reload();
                        }}
                      >
                        <ReloadIcon />
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="ka-tab-close"
                      aria-label="remove"
                      onClick={(event) => {
                        event.stopPropagation();
                        closeSiteTab(key);
                        if (active) router.push("/orgs/index");
                      }}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                );
              })}
            </div>

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
                    disabled={isWorkbench}
                    onClick={() => {
                      setTabMenuOpen(false);
                      closeSiteTab(activeLeafKey);
                      router.push("/orgs/index");
                    }}
                  >
                    <MinusCircleIcon />
                    <span>关闭当前</span>
                  </button>
                  <button
                    type="button"
                    className="ka-tab-dropdown-item"
                    disabled={isWorkbench || moduleTabKeys.length <= 1}
                    onClick={() => {
                      setTabMenuOpen(false);
                      closeOtherSiteTabs(activeLeafKey);
                    }}
                  >
                    <CloseCircleIcon />
                    <span>关闭其他</span>
                  </button>
                  <button
                    type="button"
                    className="ka-tab-dropdown-item"
                    disabled={moduleTabKeys.length === 0}
                    onClick={() => {
                      setTabMenuOpen(false);
                      closeAllSiteTabs();
                      router.push("/orgs/index");
                    }}
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
  node,
  depth,
  collapsed,
  selected,
  onNavigate,
}: {
  node: Extract<SidebarNode, { type: "page" }>;
  depth: number;
  collapsed: boolean;
  selected: boolean;
  onNavigate?: (key: string) => void;
}) {
  return (
    <button
      type="button"
      className={`ka-side-item${selected ? " is-selected" : ""}`}
      style={collapsed ? undefined : { paddingLeft: 19 + depth * 19 }}
      title={collapsed ? node.name : undefined}
      onClick={() => onNavigate?.(node.key)}
    >
      <SpriteIcon name={node.icon} className="ka-side-icon" />
      {collapsed ? null : <span className="ka-side-text">{node.name}</span>}
    </button>
  );
}
