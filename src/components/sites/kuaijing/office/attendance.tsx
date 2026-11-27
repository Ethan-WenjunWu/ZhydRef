"use client";

import { useState } from "react";

import {
  SkActionLink,
  SkButton,
  SkCheckbox,
  SkConfirm,
  SkDrawer,
  SkEmpty,
  SkInput,
  SkPagination,
  SkRadio,
  SkSwitch,
  SkTable,
  useSkMessage,
} from "../app/SettingsUI";
import { SpriteIcon } from "../app/icons";
import { OfficeField } from "./common";

type Shift = string[];

type AttendanceGroup = {
  id: number;
  name: string;
  type: string;
  shifts: Shift;
  leader: string;
};

const INITIAL_GROUPS: AttendanceGroup[] = [
  {
    id: 1,
    name: "维修班组",
    type: "排班制",
    shifts: ["夜班：00:00 ~ 08:00", "晚班：16:00 ~ 次日00:00", "早班：08:00 ~ 16:00"],
    leader: "郑维修长",
  },
  { id: 2, name: "安保班组", type: "排班制", shifts: [], leader: "常安保长" },
  {
    id: 3,
    name: "保洁班组",
    type: "排班制",
    shifts: ["早班：08:00 ~ 16:00", "晚班：16:00 ~ 次日00:00", "夜班：00:00 ~ 08:00"],
    leader: "王保洁长",
  },
];

const MENU = [
  {
    title: "考勤管理",
    icon: "org-menu-kaoqinguanli",
    open: true,
    children: ["考勤组设置", "班次设置", "节假日"],
  },
  {
    title: "考勤统计",
    icon: "org-menu-shujukanban",
    open: true,
    children: ["每日统计", "月度统计", "打卡记录"],
  },
  { title: "假期类型", icon: "org-menu-riqishiqu", open: false, children: [] },
];

export function OfficeAttendancePage() {
  const [groups, setGroups] = useState<AttendanceGroup[]>(INITIAL_GROUPS);
  const [activeMenu, setActiveMenu] = useState("考勤组设置");
  const [expanded, setExpanded] = useState<string[]>(["考勤管理", "考勤统计"]);
  const [keyword, setKeyword] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [leader, setLeader] = useState("");
  const [type, setType] = useState<"固定班制" | "排班制">("排班制");
  const [shiftText, setShiftText] = useState("");
  const [gps, setGps] = useState(true);
  const [face, setFace] = useState(false);
  const [outside, setOutside] = useState(false);
  const [makeup, setMakeup] = useState(true);
  const [removeId, setRemoveId] = useState<number | null>(null);
  const { show, node } = useSkMessage();

  const filtered = groups.filter((group) => !keyword || group.name.includes(keyword));

  const openCreate = () => {
    setEditingId(null);
    setName("");
    setLeader("");
    setType("排班制");
    setShiftText("");
    setGps(true);
    setFace(false);
    setOutside(false);
    setMakeup(true);
    setDrawerOpen(true);
  };

  const openEdit = (group: AttendanceGroup) => {
    setEditingId(group.id);
    setName(group.name);
    setLeader(group.leader);
    setType(group.type === "固定班制" ? "固定班制" : "排班制");
    setShiftText(group.shifts.join("\n"));
    setDrawerOpen(true);
  };

  return (
    <div className="of-page of-attendance-page">
      <aside className="of-attendance-side">
        <div className="of-att-brand">
          <span className="of-att-logo">▤</span>
          <strong>考勤管理</strong>
        </div>
        <div className="of-att-menu">
          {MENU.map((group) => (
            <div key={group.title} className="of-att-group">
              <button
                type="button"
                className={`of-att-group-title${expanded.includes(group.title) ? " is-open" : ""}`}
                onClick={() => {
                  if (group.children.length) {
                    setExpanded((current) =>
                      current.includes(group.title)
                        ? current.filter((item) => item !== group.title)
                        : [...current, group.title],
                    );
                  } else {
                    setActiveMenu(group.title);
                  }
                }}
              >
                <SpriteIcon name={group.icon} className="of-att-menu-icon" />
                <span>{group.title}</span>
                {group.children.length ? <span className="of-att-caret">⌃</span> : null}
              </button>
              {expanded.includes(group.title)
                ? group.children.map((child) => (
                    <button
                      key={child}
                      type="button"
                      className={`of-att-child${activeMenu === child ? " is-active" : ""}`}
                      onClick={() => setActiveMenu(child)}
                    >
                      {child}
                    </button>
                  ))
                : null}
            </div>
          ))}
        </div>
      </aside>

      <section className="of-attendance-main">
        {activeMenu === "考勤组设置" ? (
          <>
            <div className="of-att-toolbar">
              <div className="of-att-search">
                <SkInput placeholder="搜索排班组名称" value={keyword} onChange={setKeyword} />
                <span>⌕</span>
              </div>
              <div className="of-toolbar-actions">
                <SkButton variant="primary" onClick={openCreate}>
                  <span className="sk-plus">+</span>新建排班组
                </SkButton>
                <SkButton onClick={() => show("暂无更多操作")}>更多 ⌄</SkButton>
              </div>
            </div>
            <SkTable
              columns={[
                { key: "name", title: "排班组名称" },
                { key: "type", title: "类型" },
                { key: "time", title: "考勤时间" },
                { key: "leader", title: "主负责人" },
                { key: "op", title: "操作" },
              ]}
              rows={filtered.map((group) => [
                group.name,
                group.type,
                <div key="shifts" className="of-shift-lines">
                  {group.shifts.length ? group.shifts.map((shift) => <span key={shift}>{shift}</span>) : null}
                </div>,
                <span key="leader" className="of-leader-tag">{group.leader}</span>,
                <span key="op" className="of-row-actions">
                  <SkActionLink onClick={() => show(`已同步 ${group.name} 人员`)}>同步人员</SkActionLink>
                  <SkActionLink onClick={() => openEdit(group)}>编辑</SkActionLink>
                  <SkActionLink onClick={() => show("排班设置已打开")}>排班</SkActionLink>
                  <SkActionLink danger onClick={() => setRemoveId(group.id)}>删除</SkActionLink>
                </span>,
              ])}
            />
            <SkPagination total={filtered.length} pageSize={20} showTotal />
          </>
        ) : (
          <div className="of-att-subpage">
            <div className="of-toolbar">
              <div className="of-title">{activeMenu}</div>
              <SkButton variant="primary" onClick={() => show("新建成功")}>新建</SkButton>
            </div>
            <SkEmpty text={`暂无${activeMenu}数据`} />
          </div>
        )}
      </section>

      <SkDrawer
        open={drawerOpen}
        title={editingId === null ? "新建考勤组" : "编辑考勤组"}
        width={900}
        onClose={() => setDrawerOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setDrawerOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim()) {
                  show("请输入排班组名称");
                  return;
                }
                const shifts = shiftText
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean);
                if (editingId === null) {
                  setGroups((current) => [
                    ...current,
                    { id: Date.now(), name, type, shifts, leader: leader || "王" },
                  ]);
                  show("保存成功");
                } else {
                  setGroups((current) =>
                    current.map((group) =>
                      group.id === editingId
                        ? { ...group, name, leader: leader || group.leader, type, shifts }
                        : group,
                    ),
                  );
                  show("保存成功");
                }
                setDrawerOpen(false);
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="of-drawer-form">
          <div className="of-section-title">基本信息</div>
          <div className="of-form-grid">
            <OfficeField label="排班组名称" required>
              <SkInput placeholder="请输入排班组名称" value={name} onChange={setName} />
            </OfficeField>
            <OfficeField label="考勤组主要负责人">
              <SkInput placeholder="请选择" value={leader} onChange={setLeader} />
            </OfficeField>
            <OfficeField label="参加考勤的部门和人员" className="is-full">
              <SkButton onClick={() => show("已打开人员选择")}>+ 添 加</SkButton>
            </OfficeField>
          </div>
          <div className="of-section-title">考勤班次</div>
          <div className="of-radio-stack">
            <SkRadio
              label="固定班制（排班组内每位人员的上下班时间一致）"
              checked={type === "固定班制"}
              onChange={() => setType("固定班制")}
            />
            <SkRadio
              label="排班制（自定义设置每人的班次，请在保存排班组设置后再进行排班）"
              checked={type === "排班制"}
              onChange={() => setType("排班制")}
            />
          </div>
          <OfficeField label="班次设置">
            <textarea
              className="sk-textarea"
              value={shiftText}
              onChange={(event) => setShiftText(event.target.value)}
              placeholder={"快捷班次设置：未设置\n每行一个班次，例如：早班：08:00 ~ 16:00"}
            />
            <div className="of-link-line"><span className="sk-link">设置</span></div>
          </OfficeField>
          <div className="of-section-title">考勤方式</div>
          <div className="of-check-row">
            <SkCheckbox label="手机GPS打卡" checked={gps} onChange={setGps} />
            <SkCheckbox label="人脸识别打卡" checked={face} onChange={setFace} />
            <SkButton size="sm" onClick={() => show("新增考勤地点")}>新增考勤地点</SkButton>
          </div>
          <div className="of-section-title">考勤设置</div>
          <div className="of-switch-line">
            <span>允许外勤打卡</span>
            <SkSwitch checked={outside} onChange={setOutside} />
          </div>
          <div className="of-switch-line">
            <span>允许补卡</span>
            <SkSwitch checked={makeup} onChange={setMakeup} />
          </div>
          <div className="of-hint">
            可申请过去 7 天内的补卡，填写0天则只能发起当天的补卡
          </div>
        </div>
      </SkDrawer>

      <SkConfirm
        open={removeId !== null}
        content="确定删除该排班组吗？"
        danger
        onCancel={() => setRemoveId(null)}
        onOk={() => {
          setGroups((current) => current.filter((group) => group.id !== removeId));
          setRemoveId(null);
          show("删除成功");
        }}
      />
      {node}
    </div>
  );
}
