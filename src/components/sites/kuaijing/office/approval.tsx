"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

import { ACCOUNT } from "../app/data";
import {
  SkActionLink,
  SkButton,
  SkCard,
  SkConfirm,
  SkDrawer,
  SkEmpty,
  SkInput,
  SkModal,
  SkPagination,
  SkSelect,
  SkSwitch,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../app/SettingsUI";
import { exportCsv, OfficeField, OfficeSearchButtonGroup, StatusTag } from "./common";

/* 发起审批 ---------------------------------------------------------------- */

const APPROVAL_CARDS = [
  { name: "请假申请", icon: "askleave.png", type: "leave" as const },
  { name: "补卡申请", icon: "fillcard.png", type: "fill" as const },
  { name: "补卡申请", icon: "fillcard.png", type: "fill" as const },
];

export function ApprovalNewPage() {
  const [form, setForm] = useState<"leave" | "fill" | null>(null);
  const [leaveType, setLeaveType] = useState("");
  const [leaveDept, setLeaveDept] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [remark, setRemark] = useState("");
  const [fillReason, setFillReason] = useState("");
  const [fillType, setFillType] = useState("");
  const [fillDate, setFillDate] = useState("");
  const [fillNote, setFillNote] = useState("");
  const { show, node } = useSkMessage();

  const leaveReady = leaveType && leaveDept && start && end && remark;
  const fillReady = fillReason && fillType && fillDate;

  if (form) {
    return (
      <div className="of-page of-form-page">
        <div className="of-form-card">
          <h1>{form === "leave" ? "请假申请" : "补卡申请"}</h1>
          {form === "leave" ? (
            <>
              <div className="of-form-grid">
                <OfficeField label="请假类别" required>
                  <SkSelect
                    value={leaveType}
                    options={["事假", "病假", "年假", "调休假"]}
                    onChange={setLeaveType}
                  />
                </OfficeField>
                <OfficeField label="所属部门" required>
                  <SkSelect
                    value={leaveDept}
                    options={[ACCOUNT.company, "后勤部", "保洁组", "安保组", "维修组"]}
                    onChange={setLeaveDept}
                  />
                </OfficeField>
                <OfficeField label="开始时间" required>
                  <SkInput type="date" value={start} onChange={setStart} />
                </OfficeField>
                <OfficeField label="结束时间" required>
                  <SkInput type="date" value={end} onChange={setEnd} />
                </OfficeField>
                <OfficeField label="请假备注" required className="is-full">
                  <textarea
                    className="sk-textarea"
                    value={remark}
                    onChange={(event) => setRemark(event.target.value)}
                  />
                </OfficeField>
              </div>
              <div className="of-duration">
                <span>请假时长（天）</span>
                <strong>—</strong>
                <p>按起止时间的自然时长及假期类型的小时折算配置计算，保留小数。</p>
              </div>
              <div className="of-form-actions">
                <SkButton
                  variant="primary"
                  disabled={!leaveReady}
                  onClick={() => {
                    show("提交成功");
                    setForm(null);
                    setLeaveType("");
                    setLeaveDept("");
                    setStart("");
                    setEnd("");
                    setRemark("");
                  }}
                >
                  提交审批
                </SkButton>
                <SkButton onClick={() => setForm(null)}>取 消</SkButton>
              </div>
            </>
          ) : (
            <>
              <div className="of-form-grid">
                <OfficeField label="补卡事由" required>
                  <SkInput
                    value={fillReason}
                    onChange={setFillReason}
                    placeholder="发起补卡申请申请"
                  />
                </OfficeField>
                <OfficeField label="补卡原因" required>
                  <SkSelect
                    value={fillType}
                    options={["忘记打卡", "设备故障", "外出办公", "其他"]}
                    onChange={setFillType}
                  />
                </OfficeField>
                <OfficeField label="补卡日期" required>
                  <SkInput type="date" value={fillDate} onChange={setFillDate} />
                </OfficeField>
                <OfficeField label="说明附件">
                  <label className="of-upload">
                    <span>+</span>上传文件
                    <input type="file" hidden onChange={() => show("附件已选择")} />
                  </label>
                </OfficeField>
                <OfficeField label="审批流程" className="is-full">
                  <div className="of-flow-placeholder">
                    {fillNote || "填写信息后将展示审批流程"}
                  </div>
                </OfficeField>
              </div>
              <div className="of-form-actions">
                <SkButton
                  variant="primary"
                  disabled={!fillReady}
                  onClick={() => {
                    show("提交成功");
                    setForm(null);
                    setFillReason("");
                    setFillType("");
                    setFillDate("");
                    setFillNote("");
                  }}
                >
                  提 交
                </SkButton>
                <SkButton onClick={() => setForm(null)}>取 消</SkButton>
              </div>
            </>
          )}
        </div>
        {node}
      </div>
    );
  }

  return (
    <div className="of-page of-approval-new">
      <div className="of-approval-section-title">
        <span />
        考勤
      </div>
      <div className="of-approval-cards">
        {APPROVAL_CARDS.map((card, index) => (
          <button
            key={`${card.name}-${index}`}
            type="button"
            className="of-approval-card"
            onClick={() => setForm(card.type)}
          >
            <span className="of-approval-icon">
              <img src={`/sites/kuaijing/office/approval/${card.icon}`} alt="" />
            </span>
            <span>{card.name}</span>
          </button>
        ))}
      </div>
      {node}
    </div>
  );
}

/* 审批中心 ---------------------------------------------------------------- */

export function ApprovalCenterPage() {
  const [tab, setTab] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [approvalType, setApprovalType] = useState("");
  const [range, setRange] = useState("");

  return (
    <div className="of-page of-approval-center">
      <section className="of-panel of-approval-list">
        <div className="of-approval-tabs">
          <SkTabs
            items={["待审批", "已审批", "抄送我", "已发起"]}
            active={tab}
            onChange={setTab}
          />
          <button
            type="button"
            className="of-filter-btn"
            aria-label="filter"
            onClick={() => setFilterOpen((open) => !open)}
          >
            ▽
          </button>
        </div>
        {filterOpen ? (
          <div className="of-filter-pop">
            <SkSelect
              placeholder="审批类型"
              value={approvalType}
              options={["请假申请", "补卡申请", "合同审批"]}
              onChange={setApprovalType}
            />
            <SkSelect
              placeholder="审批状态"
              value={range}
              options={["审批中", "已通过", "已拒绝"]}
              onChange={setRange}
            />
            <SkButton size="sm" variant="primary" onClick={() => setFilterOpen(false)}>
              确定
            </SkButton>
          </div>
        ) : null}
        <div className="of-approval-empty">
          <SkEmpty text="暂无记录" />
        </div>
        <div className="of-list-footer">
          <span>共 0 条</span>
          <span className="of-page-size-static">10条/页</span>
          <button type="button" className="sk-page-btn" disabled>
            ‹
          </button>
          <span className="of-page-current">0 / 0</span>
          <button type="button" className="sk-page-btn" disabled>
            ›
          </button>
        </div>
      </section>
      <section className="of-panel of-approval-detail">
        <SkEmpty text="无内容" />
      </section>
    </div>
  );
}

/* 审批分类 ---------------------------------------------------------------- */

type CatRow = {
  id: number;
  name: string;
  icon: string;
  desc: string;
  source: string;
  enabled: boolean;
};

const CONTRACT_ACTIONS = [
  ["新增合同", "contract_add"],
  ["续租合同", "contract_continue"],
  ["变更合同", "contract_change"],
  ["退租合同", "contract_retreat"],
  ["作废合同", "contract_void"],
  ["新增意向合同", "contract_add"],
  ["作废意向合同", "contract_void"],
  ["变更意向合同", "contract_change"],
];

const CATEGORY_GROUPS = [
  { id: "contract", name: "合同", children: ["场地租赁", "床位租赁", "房屋租赁"] },
  { id: "patrol", name: "巡检管理", children: [] },
  { id: "clock", name: "考勤", children: [] },
  { id: "order", name: "工单", children: [] },
  { id: "asset", name: "资产", children: [] },
  { id: "finance", name: "财务", children: [] },
  { id: "operation", name: "运营", children: [] },
];

const INITIAL_SECTIONS: Record<string, CatRow[]> = {
  场地租赁: CONTRACT_ACTIONS.map(([name, icon], index) => ({
    id: index + 1,
    name: `场地租赁${name}`,
    icon: `${icon}.png`,
    desc: `场地租赁${name}由租赁管理提供`,
    source: "租赁管理",
    enabled: true,
  })),
  床位租赁: CONTRACT_ACTIONS.map(([name, icon], index) => ({
    id: 100 + index,
    name: `床位租赁${name}`,
    icon: `${icon}.png`,
    desc: `床位租赁${name}由租赁管理提供`,
    source: "租赁管理",
    enabled: true,
  })),
  房屋租赁: CONTRACT_ACTIONS.map(([name, icon], index) => ({
    id: 200 + index,
    name: `房屋租赁${name}`,
    icon: `${icon}.png`,
    desc: `房屋租赁${name}由租赁管理提供`,
    source: "租赁管理",
    enabled: true,
  })),
  巡检管理: [
    { id: 301, name: "资产巡检", icon: "equipment_check_patrol.png", desc: "资产巡检由巡检管理提供", source: "巡检管理", enabled: true },
    { id: 302, name: "资产巡检验收", icon: "equipment_check_patrol.png", desc: "所有人不能发起", source: "巡检管理", enabled: false },
  ],
  考勤: [
    { id: 401, name: "请假申请", icon: "askleave.png", desc: "请假申请由考勤管理提供", source: "考勤管理", enabled: true },
    { id: 402, name: "补卡申请", icon: "fillcard.png", desc: "补卡申请由考勤管理提供", source: "考勤管理", enabled: true },
    { id: 403, name: "补卡申请", icon: "fillcard.png", desc: "补卡申请由考勤管理提供", source: "考勤管理", enabled: true },
  ],
  工单: [
    { id: 501, name: "投诉建议", icon: "add_order.png", desc: "创建工单由工单提供", source: "工单", enabled: true },
    { id: 502, name: "验收内部工单", icon: "order_check_external.png", desc: "验收内部工单由工单提供", source: "工单", enabled: true },
    { id: 503, name: "验收外部工单", icon: "order_check_external.png", desc: "验收外部工单由工单提供", source: "工单", enabled: true },
    { id: 504, name: "工单最终定价审核", icon: "order_pricing_review.png", desc: "工单最终定价审核由工单提供", source: "工单", enabled: true },
    { id: 505, name: "在线报修", icon: "add_order.png", desc: "创建工单由工单提供", source: "工单", enabled: true },
  ],
  资产: [
    { id: 601, name: "固定资产入库单", icon: "material.png", desc: "资产入库单由资产管理提供", source: "资产管理", enabled: true },
    { id: 602, name: "资产派发单", icon: "transfer.png", desc: "资产派发单由资产管理提供", source: "资产管理", enabled: true },
    { id: 603, name: "资产退库单", icon: "property_return.png", desc: "资产退库单由资产管理提供", source: "资产管理", enabled: true },
    { id: 604, name: "资产借出单", icon: "property_lend.png", desc: "资产借出单由资产管理提供", source: "资产管理", enabled: true },
    { id: 605, name: "资产归还单", icon: "property_revert.png", desc: "资产归还单由资产管理提供", source: "资产管理", enabled: true },
    { id: 606, name: "资产维修", icon: "property_repair.png", desc: "资产维修由资产管理提供", source: "资产管理", enabled: true },
  ],
  财务: [
    { id: 701, name: "收据提前开据", icon: "bill_invoice.png", desc: "提前开据由财务提供", source: "财务", enabled: true },
    { id: 702, name: "收据实收开据", icon: "invoice_receive.png", desc: "实收开据由财务提供", source: "财务", enabled: true },
    { id: 703, name: "调整账单金额审批", icon: "bill_adjust.png", desc: "调整账单金额审批由财务提供", source: "财务", enabled: true },
    { id: 704, name: "修改应收/付日期", icon: "bill_date_modify.png", desc: "修改应收/付日期由财务提供", source: "财务", enabled: true },
    { id: 705, name: "账单拆分", icon: "bill_split.png", desc: "账单拆分由财务提供", source: "财务", enabled: true },
  ],
  运营: [
    { id: 801, name: "业户进场审批", icon: "ownerCheckIn.png", desc: "业户进场审批由运营提供", source: "运营", enabled: true },
    { id: 802, name: "业户退场审批", icon: "ownerCheckOut.png", desc: "业户退场审批由运营提供", source: "运营", enabled: true },
  ],
};

export function ApprovalCategoryPage() {
  const [tab, setTab] = useState(0);
  const [expanded, setExpanded] = useState("contract");
  const [selected, setSelected] = useState("场地租赁");
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [groupOpen, setGroupOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupParent, setGroupParent] = useState("");
  const [createName, setCreateName] = useState("");
  const [createGroup, setCreateGroup] = useState("合同");
  const [removeRow, setRemoveRow] = useState<{ section: string; id: number } | null>(null);
  const { show, node } = useSkMessage();

  const rows = sections[selected] ?? [];
  const groupNameOfSelected = CATEGORY_GROUPS.find((group) => group.children.includes(selected));
  const isContract = ["场地租赁", "床位租赁", "房屋租赁"].includes(selected);

  return (
    <div className="of-page of-category-page">
      <div className="of-category-head">
        <SkTabs items={["内部发起", "业户发起"]} active={tab} onChange={setTab} />
        <div className="of-toolbar-actions">
          <SkButton onClick={() => setGroupOpen(true)}>新建分组</SkButton>
          <SkButton onClick={() => setSortOpen(true)}>分组排序</SkButton>
          <SkButton variant="primary" onClick={() => setCreateOpen(true)}>
            <span className="sk-plus">+</span>创建审批
          </SkButton>
        </div>
      </div>

      {tab === 1 ? (
        <div className="of-panel of-owner-empty">
          <SkEmpty text="暂无业户发起审批" />
        </div>
      ) : (
        <div className="of-category-layout">
          <aside className="of-category-tree">
            {CATEGORY_GROUPS.map((group) => (
              <div key={group.id} className="of-cat-group">
                <button
                  type="button"
                  className={`of-cat-group-title${expanded === group.id ? " is-open" : ""}`}
                  onClick={() => {
                    if (group.children.length) {
                      setExpanded(expanded === group.id ? "" : group.id);
                    } else {
                      setSelected(group.name);
                      setExpanded("");
                    }
                  }}
                >
                  <span>{group.name}</span>
                  <span className="of-cat-caret">{group.children.length ? "⌄" : "›"}</span>
                </button>
                {expanded === group.id
                  ? group.children.map((child) => (
                      <button
                        key={child}
                        type="button"
                        className={`of-cat-child${selected === child ? " is-active" : ""}`}
                        onClick={() => setSelected(child)}
                      >
                        {child}
                      </button>
                    ))
                  : null}
              </div>
            ))}
          </aside>

          <section className="of-category-main">
            <div className="of-category-main-title">
              <h2>{groupNameOfSelected?.name ?? selected}</h2>
              <span className="of-cat-edit">✎</span>
              <span className="of-cat-trash">🗑</span>
            </div>
            <div className="of-category-scroll">
              <div className="of-cat-section">
                <div className="of-cat-section-title">
                  <span className="of-blue-bar" />
                  {selected}
                  <span className="of-cat-edit">✎</span>
                  <span className="of-cat-trash">🗑</span>
                </div>
                {rows.map((row) => (
                  <div key={row.id} className="of-cat-row">
                    <span className="of-cat-row-icon">
                      <img src={`/sites/kuaijing/office/approval/${row.icon}`} alt="" />
                    </span>
                    <span className="of-cat-row-main">
                      <span className="of-cat-row-name">{row.name}</span>
                      <span className="of-cat-row-source">由{row.source}提供</span>
                    </span>
                    <span className="of-cat-row-desc">{row.desc}</span>
                    <span className="of-cat-row-actions">
                      <span className="of-pill">NP</span>
                      <button type="button" title="流程">⚭</button>
                      <button type="button" title="编辑">✎</button>
                      <button
                        type="button"
                        title={row.enabled ? "停用" : "启用"}
                        onClick={() =>
                          setSections((current) => ({
                            ...current,
                            [selected]: current[selected].map((item) =>
                              item.id === row.id ? { ...item, enabled: !item.enabled } : item,
                            ),
                          }))
                        }
                      >
                        ⊘
                      </button>
                      <button type="button" title="删除" onClick={() => setRemoveRow({ section: selected, id: row.id })}>
                        🗑
                      </button>
                      <button type="button" title="拖拽">≡</button>
                    </span>
                  </div>
                ))}
                {isContract && selected !== "房屋租赁" ? (
                  <>
                    <div className="of-cat-section-title is-sub">
                      <span className="of-blue-bar" />
                      {selected === "场地租赁" ? "床位租赁" : "房屋租赁"}
                      <span className="of-cat-edit">✎</span>
                      <span className="of-cat-trash">🗑</span>
                    </div>
                    {(sections[selected === "场地租赁" ? "床位租赁" : "房屋租赁"] ?? []).map((row) => (
                      <div key={row.id} className="of-cat-row">
                        <span className="of-cat-row-icon">
                          <img src={`/sites/kuaijing/office/approval/${row.icon}`} alt="" />
                        </span>
                        <span className="of-cat-row-main">
                          <span className="of-cat-row-name">{row.name}</span>
                          <span className="of-cat-row-source">由租赁管理提供</span>
                        </span>
                        <span className="of-cat-row-desc">{row.desc}</span>
                        <span className="of-cat-row-actions">
                          <span className="of-pill">NP</span>
                          <button type="button">⚭</button>
                          <button type="button">✎</button>
                          <button type="button">⊘</button>
                          <button type="button">🗑</button>
                          <button type="button">≡</button>
                        </span>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
            <div className="of-category-footer">
              <SkButton variant="primary" onClick={() => show("保存成功")}>保 存</SkButton>
              <SkButton onClick={() => show("已取消编辑")}>取 消</SkButton>
            </div>
          </section>
        </div>
      )}

      <SkModal
        open={groupOpen}
        title="添加分组"
        width={520}
        onClose={() => setGroupOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setGroupOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!groupName.trim()) {
                  show("请输入分组名称");
                  return;
                }
                setGroupOpen(false);
                show("分组添加成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="of-modal-form">
          <OfficeField label="所属上级">
            <SkSelect
              placeholder="请选择"
              value={groupParent}
              options={["无", ...CATEGORY_GROUPS.map((group) => group.name)]}
              onChange={setGroupParent}
            />
          </OfficeField>
          <OfficeField label="分组名称" required>
            <SkInput value={groupName} onChange={setGroupName} placeholder="请输入" />
          </OfficeField>
        </div>
      </SkModal>

      <SkModal
        open={sortOpen}
        title="分组排序"
        width={480}
        onClose={() => setSortOpen(false)}
        footer={<SkButton variant="primary" onClick={() => setSortOpen(false)}>完 成</SkButton>}
      >
        <div className="of-sort-list">
          {CATEGORY_GROUPS.map((group, index) => (
            <div key={group.id} className="of-sort-row">
              <span>{index + 1}</span>
              <strong>{group.name}</strong>
              <button type="button" onClick={() => show("已上移")}>↑</button>
              <button type="button" onClick={() => show("已下移")}>↓</button>
            </div>
          ))}
        </div>
      </SkModal>

      <SkModal
        open={createOpen}
        title="创建审批"
        width={560}
        onClose={() => setCreateOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setCreateOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!createName.trim()) {
                  show("请输入审批名称");
                  return;
                }
                setCreateOpen(false);
                show("审批创建成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="of-modal-form">
          <OfficeField label="审批名称" required>
            <SkInput value={createName} onChange={setCreateName} placeholder="请输入" />
          </OfficeField>
          <OfficeField label="所属分组">
            <SkSelect
              value={createGroup}
              options={CATEGORY_GROUPS.map((group) => group.name)}
              onChange={setCreateGroup}
            />
          </OfficeField>
          <OfficeField label="审批图标">
            <label className="of-upload">
              <span>+</span>上传图标
              <input type="file" hidden onChange={() => show("图标已选择")} />
            </label>
          </OfficeField>
        </div>
      </SkModal>

      <SkConfirm
        open={removeRow !== null}
        content="确定删除该审批吗？"
        danger
        onCancel={() => setRemoveRow(null)}
        onOk={() => {
          if (removeRow) {
            setSections((current) => ({
              ...current,
              [removeRow.section]: (current[removeRow.section] ?? []).filter(
                (row) => row.id !== removeRow.id,
              ),
            }));
            show("删除成功");
          }
          setRemoveRow(null);
        }}
      />
      {node}
    </div>
  );
}

/* 数据管理 ---------------------------------------------------------------- */

type ApprovalRow = {
  id: string;
  company: string;
  project: string;
  name: string;
  number: string;
  submitter: string;
  submitTime: string;
  finishTime: string;
  handler: string;
  status: "已通过" | "审批中";
};

const APPROVAL_ROWS: ApprovalRow[] = [
  { id: "1", company: ACCOUNT.company, project: "/", name: "请假申请", number: "2026112700000001", submitter: "王", submitTime: "2026/11/27 17:59", finishTime: "2026/11/27 17:59", handler: "", status: "已通过" },
  { id: "2", company: ACCOUNT.company, project: "/", name: "补卡申请", number: "2026112700000003", submitter: "王", submitTime: "2026/11/27 17:39", finishTime: "2026/11/27 17:39", handler: "", status: "已通过" },
  { id: "3", company: ACCOUNT.company, project: "/", name: "补卡申请", number: "2026112700000002", submitter: "王", submitTime: "2026/11/27 17:38", finishTime: "", handler: "郑维修长", status: "审批中" },
  { id: "4", company: ACCOUNT.company, project: "/", name: "补卡申请", number: "2026112700000001", submitter: "王", submitTime: "2026/11/27 17:35", finishTime: "2026/11/27 17:35", handler: "", status: "已通过" },
  { id: "5", company: ACCOUNT.company, project: "智慧园区", name: "床位租赁退租合同", number: "2026112600000001", submitter: "王", submitTime: "2026/11/26 16:03", finishTime: "2026/11/26 16:03", handler: "", status: "已通过" },
  { id: "6", company: ACCOUNT.company, project: "智慧园区", name: "床位租赁新增合同", number: "2026112600000001", submitter: "王", submitTime: "2026/11/26 14:16", finishTime: "2026/11/26 14:16", handler: "", status: "已通过" },
];

export function ApprovalDataPage() {
  const [tab, setTab] = useState(0);
  const [draft, setDraft] = useState({ company: "", project: "", name: "", status: "", number: "", submitter: "", handler: "" });
  const [filters, setFilters] = useState(draft);
  const [detail, setDetail] = useState<ApprovalRow | null>(null);
  const { show, node } = useSkMessage();

  const rows = APPROVAL_ROWS.filter((row) => {
    if (filters.name && !row.name.includes(filters.name)) return false;
    if (filters.status && row.status !== filters.status) return false;
    if (filters.number && !row.number.includes(filters.number)) return false;
    if (filters.submitter && row.submitter !== filters.submitter) return false;
    if (filters.handler && row.handler !== filters.handler) return false;
    return true;
  });

  return (
    <div className="of-page">
      <SkCard className="of-card">
        <SkTabs items={["数据管理", "导出记录"]} active={tab} onChange={setTab} />
        {tab === 0 ? (
          <>
            <div className="of-filter-grid">
              <OfficeField label="公司名称">
                <SkSelect placeholder="请选择" value={draft.company} options={[ACCOUNT.company]} onChange={(value) => setDraft((current) => ({ ...current, company: value }))} />
              </OfficeField>
              <OfficeField label="项目名称">
                <SkSelect placeholder="请选择" value={draft.project} options={["/", "智慧园区"]} onChange={(value) => setDraft((current) => ({ ...current, project: value }))} />
              </OfficeField>
              <OfficeField label="审批名称">
                <SkSelect placeholder="选择分类" value={draft.name} options={["请假申请", "补卡申请", "床位租赁退租合同", "床位租赁新增合同"]} onChange={(value) => setDraft((current) => ({ ...current, name: value }))} />
              </OfficeField>
              <OfficeField label="状态">
                <SkSelect placeholder="请选择" value={draft.status} options={["已通过", "审批中"]} onChange={(value) => setDraft((current) => ({ ...current, status: value }))} />
              </OfficeField>
              <OfficeField label="提交时间">
                <SkInput type="date" />
              </OfficeField>
              <OfficeField label="完成时间">
                <SkInput type="date" />
              </OfficeField>
              <OfficeField label="申请编号">
                <SkInput placeholder="请输入" value={draft.number} onChange={(value) => setDraft((current) => ({ ...current, number: value }))} />
              </OfficeField>
              <OfficeField label="提交人">
                <SkSelect placeholder="请选择" value={draft.submitter} options={["王", "郑维修长"]} onChange={(value) => setDraft((current) => ({ ...current, submitter: value }))} />
              </OfficeField>
              <OfficeField label="当前审批人">
                <SkSelect placeholder="请选择" value={draft.handler} options={["郑维修长"]} onChange={(value) => setDraft((current) => ({ ...current, handler: value }))} />
              </OfficeField>
              <OfficeSearchButtonGroup
                onSearch={() => setFilters(draft)}
                onReset={() => {
                  const empty = { company: "", project: "", name: "", status: "", number: "", submitter: "", handler: "" };
                  setDraft(empty);
                  setFilters(empty);
                }}
              />
            </div>
            <div className="of-list-toolbar">
              <span>共找到{rows.length}条记录</span>
              <SkButton
                onClick={() => {
                  exportCsv(
                    "审批数据.csv",
                    ["公司名称", "项目名称", "审批名称", "申请编号", "提交人", "提交时间", "完成时间", "当前处理人", "状态"],
                    rows.map((row) => [row.company, row.project, row.name, row.number, row.submitter, row.submitTime, row.finishTime, row.handler, row.status]),
                  );
                  show("导出成功");
                }}
              >
                导出
              </SkButton>
            </div>
            <SkTable
              columns={[
                { key: "company", title: "公司名称" },
                { key: "project", title: "项目名称" },
                { key: "name", title: "审批名称" },
                { key: "number", title: "申请编号" },
                { key: "submitter", title: "提交人" },
                { key: "submitTime", title: "提交时间" },
                { key: "finishTime", title: "完成时间" },
                { key: "handler", title: "当前处理人" },
                { key: "status", title: "状态" },
                { key: "op", title: "操作" },
              ]}
              rows={rows.map((row) => [
                row.company,
                row.project,
                row.name,
                row.number,
                row.submitter,
                row.submitTime,
                row.finishTime,
                row.handler,
                <StatusTag key="s" color={row.status === "已通过" ? "green" : "blue"}>{row.status}</StatusTag>,
                <SkActionLink key="op" onClick={() => setDetail(row)}>详情</SkActionLink>,
              ])}
            />
            <SkPagination total={rows.length} pageSize={10} showTotal />
          </>
        ) : (
          <SkEmpty text="暂无导出记录" />
        )}
      </SkCard>

      <SkDrawer
        open={detail !== null}
        title="审批详情"
        width={520}
        onClose={() => setDetail(null)}
        footer={<SkButton onClick={() => setDetail(null)}>关 闭</SkButton>}
      >
        {detail ? (
          <div className="of-detail-list">
            {[
              ["公司名称", detail.company],
              ["项目名称", detail.project],
              ["审批名称", detail.name],
              ["申请编号", detail.number],
              ["提交人", detail.submitter],
              ["提交时间", detail.submitTime],
              ["完成时间", detail.finishTime],
              ["当前处理人", detail.handler || "--"],
              ["状态", detail.status],
            ].map(([label, value]) => (
              <div key={label}><span>{label}</span><strong>{value}</strong></div>
            ))}
          </div>
        ) : null}
      </SkDrawer>
      {node}
    </div>
  );
}

/* 审批代办 ---------------------------------------------------------------- */

type ProxyRow = {
  id: number;
  principal: string;
  agent: string;
  time: string;
  status: boolean;
};

export function ApprovalProxyPage() {
  const [rows, setRows] = useState<ProxyRow[]>([]);
  const [principal, setPrincipal] = useState("");
  const [agent, setAgent] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [formPrincipal, setFormPrincipal] = useState("");
  const [formAgent, setFormAgent] = useState("");
  const [formStart, setFormStart] = useState("");
  const [formEnd, setFormEnd] = useState("");
  const [formStatus, setFormStatus] = useState(true);
  const { show, node } = useSkMessage();

  const filtered = rows.filter((row) => {
    if (principal && row.principal !== principal) return false;
    if (agent && row.agent !== agent) return false;
    if (status && row.status !== (status === "开启")) return false;
    return true;
  });

  return (
    <div className="of-page">
      <div className="of-info-alert">
        如果员工（委托人）因其他原因无法处理审批，可以安排一名审批代办人员（代理人）来代替他处理，处理效果与员工（委托人）自己处理一样。
      </div>
      <SkCard className="of-card">
        <div className="of-search-top">
          <span>未选择筛选字段</span>
          <span className="of-search-actions">
            <span className="sk-link" onClick={() => { setPrincipal(""); setAgent(""); setStatus(""); }}>清除选项</span>
            <span>收起 ⌃</span>
          </span>
        </div>
        <div className="of-search-inline">
          <OfficeField label="委托人">
            <SkSelect placeholder="请选择" value={principal} options={["王", "郑维修长", "常安保长"]} onChange={setPrincipal} />
          </OfficeField>
          <OfficeField label="代理人">
            <SkSelect placeholder="请选择" value={agent} options={["AAA", "李保洁", "张保洁"]} onChange={setAgent} />
          </OfficeField>
          <OfficeField label="状态">
            <SkSelect placeholder="请选择状态" value={status} options={["开启", "关闭"]} onChange={setStatus} />
          </OfficeField>
          <OfficeSearchButtonGroup onSearch={() => show("查询成功")} onReset={() => { setPrincipal(""); setAgent(""); setStatus(""); }} />
        </div>
      </SkCard>
      <SkCard className="of-card">
        <div className="of-toolbar">
          <div className="of-title">审批代办列表</div>
          <div className="of-toolbar-actions">
            <SkButton onClick={() => show("刷新成功")}>↻ 刷新</SkButton>
            <SkButton variant="primary" onClick={() => setOpen(true)}><span className="sk-plus">+</span>新增</SkButton>
          </div>
        </div>
        <SkTable
          columns={[
            { key: "principal", title: "委托人" },
            { key: "agent", title: "代理人" },
            { key: "time", title: "代理时间" },
            { key: "status", title: "状态" },
            { key: "creator", title: "创建人员" },
            { key: "created", title: "创建时间" },
            { key: "op", title: "操作" },
          ]}
          rows={filtered.map((row) => [
            row.principal,
            row.agent,
            row.time,
            <StatusTag key="s" color={row.status ? "green" : "gray"}>{row.status ? "开启" : "关闭"}</StatusTag>,
            "王",
            "2026/11/27 17:00",
            <SkActionLink key="op" danger onClick={() => { setRows((current) => current.filter((item) => item.id !== row.id)); show("删除成功"); }}>删除</SkActionLink>,
          ])}
        />
      </SkCard>

      <SkModal
        open={open}
        title="新增审批代办"
        width={560}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!formPrincipal || !formAgent) {
                  show("请选择委托人和代理人");
                  return;
                }
                setRows((current) => [
                  ...current,
                  {
                    id: Date.now(),
                    principal: formPrincipal,
                    agent: formAgent,
                    time: `${formStart || "2026-11-27"} ~ ${formEnd || "2026-12-27"}`,
                    status: formStatus,
                  },
                ]);
                setOpen(false);
                show("新增成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="of-modal-form">
          <OfficeField label="委托人" required>
            <SkSelect value={formPrincipal} options={["王", "郑维修长", "常安保长"]} onChange={setFormPrincipal} placeholder="请选择" />
          </OfficeField>
          <OfficeField label="代理人" required>
            <SkSelect value={formAgent} options={["AAA", "李保洁", "张保洁"]} onChange={setFormAgent} placeholder="请选择" />
          </OfficeField>
          <OfficeField label="代理时间">
            <div className="of-date-pair">
              <SkInput type="date" value={formStart} onChange={setFormStart} />
              <span>→</span>
              <SkInput type="date" value={formEnd} onChange={setFormEnd} />
            </div>
          </OfficeField>
          <OfficeField label="状态">
            <SkSwitch checked={formStatus} onChange={setFormStatus} />
          </OfficeField>
        </div>
      </SkModal>
      {node}
    </div>
  );
}
