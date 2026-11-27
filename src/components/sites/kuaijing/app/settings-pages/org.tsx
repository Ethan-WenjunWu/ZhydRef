"use client";

import { useState } from "react";

import { ACCOUNT } from "../data";
import {
  SkActionLink,
  SkButton,
  SkCard,
  SkCheckbox,
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
} from "../SettingsUI";
import {
  ALL_USERS,
  CheckCell,
  Field,
  MODULES,
  MoreMenu,
  PickerModal,
} from "./common";

/* 05 成员/部门 ------------------------------------------------------------ */

type Member = {
  id: number;
  name: string;
  status: "正常" | "未激活";
  email: string;
  phone: string;
  dept: string;
  gender: string;
  no: string;
};

const INITIAL_MEMBERS: Member[] = [
  { id: 1, name: "王", status: "正常", email: "", phone: "+86 155****6033", dept: "大连华安物业管理有限公司、维修组", gender: "未知", no: "1" },
  { id: 2, name: "AAA", status: "正常", email: "", phone: "+86 138****5678", dept: "大连华安物业管理有限公司", gender: "男", no: "13" },
  { id: 3, name: "李保洁", status: "正常", email: "", phone: "+86 139****0001", dept: "保洁组", gender: "男", no: "2" },
  { id: 4, name: "张保洁", status: "正常", email: "", phone: "+86 139****0002", dept: "保洁组", gender: "男", no: "3" },
  { id: 5, name: "宋保洁", status: "正常", email: "", phone: "+86 139****0003", dept: "保洁组", gender: "男", no: "4" },
  { id: 6, name: "王保洁长", status: "正常", email: "", phone: "+86 139****0005", dept: "保洁组", gender: "男", no: "5" },
  { id: 7, name: "李安保", status: "正常", email: "", phone: "+86 139****0006", dept: "安保组", gender: "男", no: "6" },
  { id: 8, name: "张安保", status: "正常", email: "", phone: "+86 139****0007", dept: "安保组", gender: "男", no: "7" },
  { id: 9, name: "刘安保", status: "正常", email: "", phone: "+86 139****0008", dept: "安保组", gender: "男", no: "8" },
  { id: 10, name: "常安保长", status: "正常", email: "", phone: "+86 139****0009", dept: "安保组", gender: "男", no: "9" },
  { id: 11, name: "周维修", status: "正常", email: "", phone: "+86 139****0010", dept: "维修组", gender: "男", no: "10" },
  { id: 12, name: "吴维修", status: "正常", email: "", phone: "+86 139****0011", dept: "维修组", gender: "男", no: "11" },
  { id: 13, name: "郑维修长", status: "正常", email: "", phone: "+86 139****0012", dept: "维修组", gender: "男", no: "12" },
  { id: 14, name: "ttt", status: "正常", email: "", phone: "+86 132****5678", dept: "物资组", gender: "男", no: "14" },
];

const DEPT_GROUPS = ["保洁组", "安保组", "维修组", "接待组", "物资组"];

type DeptRow = {
  id: number;
  name: string;
  level: string;
  count: string;
  leader: string;
};

type JobGroup = {
  id: number;
  name: string;
  positions: string[];
};

type JobMember = {
  id: number;
  name: string;
  phone: string;
  position: string;
  gender: string;
  no: string;
};

const INITIAL_JOB_GROUPS: JobGroup[] = [
  { id: 1, name: "保洁岗", positions: ["客房保洁2", "客房保洁", "大厅保洁"] },
  { id: 2, name: "安保岗", positions: ["大厅安保", "园区安保"] },
  { id: 3, name: "维修岗", positions: ["电器维修", "下水维修"] },
  { id: 4, name: "接待岗", positions: [] },
  { id: 5, name: "物资岗", positions: [] },
];

export function MembersPage() {
  const [tab, setTab] = useState(0);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("全部");
  const [selectedDept, setSelectedDept] = useState(ACCOUNT.company);
  const [directOnly, setDirectOnly] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSelected, setPickerSelected] = useState<string[]>([]);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [removeIds, setRemoveIds] = useState<number[] | null>(null);
  const [applicantOpen, setApplicantOpen] = useState(false);
  const { show, node } = useSkMessage();

  const [departments, setDepartments] = useState<DeptRow[]>([
    { id: 1, name: "后勤部", level: "专业部门", count: "13", leader: "王" },
  ]);
  const [deptSelected, setDeptSelected] = useState<number[]>([]);
  const [deptModal, setDeptModal] = useState<{
    mode: "add" | "edit" | "child";
    id?: number;
  } | null>(null);
  const [deptName, setDeptName] = useState("");
  const [deptLeader, setDeptLeader] = useState("王");
  const [deptRemove, setDeptRemove] = useState<number[] | null>(null);

  const [jobGroups, setJobGroups] = useState<JobGroup[]>(INITIAL_JOB_GROUPS);
  const [jobGroupId, setJobGroupId] = useState(1);
  const [jobPosition, setJobPosition] = useState("客房保洁2");
  const [jobMembers, setJobMembers] = useState<JobMember[]>([
    { id: 1, name: "李保洁", phone: "+86 13900010001", position: "客房保洁", gender: "男", no: "2" },
    { id: 2, name: "张保洁", phone: "+86 13900010002", position: "客房保洁", gender: "男", no: "3" },
  ]);
  const [jobSelected, setJobSelected] = useState<number[]>([]);
  const [jobPickerOpen, setJobPickerOpen] = useState(false);
  const [jobPickerSelected, setJobPickerSelected] = useState<string[]>([]);
  const [jobGroupModal, setJobGroupModal] = useState(false);
  const [jobPositionModal, setJobPositionModal] = useState(false);
  const [jobGroupName, setJobGroupName] = useState("");
  const [jobPositionName, setJobPositionName] = useState("");
  const [jobPage, setJobPage] = useState(1);

  const filteredMembers = members.filter((member) => {
    if (keyword && !member.name.includes(keyword) && !member.dept.includes(keyword)) return false;
    if (status !== "全部" && member.status !== status) return false;
    if (selectedDept !== ACCOUNT.company) {
      if (selectedDept === "后勤部") {
        if (!DEPT_GROUPS.includes(member.dept) && member.dept !== "后勤部") return false;
      } else if (!member.dept.includes(selectedDept)) {
        return false;
      }
    } else if (directOnly && !member.dept.includes(ACCOUNT.company)) {
      return false;
    }
    return true;
  });
  const memberPageCount = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
  const memberPage = Math.min(page, memberPageCount);
  const memberRows = filteredMembers.slice(
    (memberPage - 1) * pageSize,
    memberPage * pageSize,
  );
  const detail = members.find((member) => member.id === detailId);

  const treeMatches = (name: string) =>
    !keyword ||
    name.includes(keyword) ||
    members.some((member) => member.name.includes(keyword) && member.dept.includes(name));

  const addPickedMembers = () => {
    const dept =
      selectedDept === ACCOUNT.company || selectedDept === "后勤部"
        ? ""
        : selectedDept;
    const next = ALL_USERS.filter(
      (person) =>
        pickerSelected.includes(person.name) &&
        !members.some(
          (member) =>
            member.name === person.name &&
            (dept ? member.dept === dept : member.dept === person.dept),
        ),
    ).map((person, index) => ({
      id: Date.now() + index,
      name: person.name,
      status: "正常" as const,
      email: "--",
      phone: person.phone,
      dept: dept || person.dept,
      gender: "男",
      no: person.no,
    }));
    setMembers((current) => [...current, ...next]);
    setPickerSelected([]);
    setPickerOpen(false);
    show("添加成功");
  };

  const saveMember = () => {
    if (!editMember) return;
    if (!editMember.name.trim()) {
      show("请输入成员姓名");
      return;
    }
    setMembers((current) =>
      current.map((member) => (member.id === editMember.id ? editMember : member)),
    );
    setEditMember(null);
    show("保存成功");
  };

  const filteredDepts = departments.filter((dept) => dept.name.includes(keyword));

  return (
    <div className="sk-page">
      <SkCard className="sk-members-card">
        <SkTabs items={["成员", "部门", "岗位"]} active={tab} onChange={setTab} />

        {tab === 0 ? (
          <div className="sk-members-layout">
            <aside className="sk-members-tree">
              <div className="sk-tree-search">
                <SkInput placeholder="搜索成员或部门" value={keyword} onChange={setKeyword} />
                <button type="button" className="sk-tree-search-btn" aria-label="search">
                  ⌕
                </button>
              </div>
              <div className="sk-tree">
                <div
                  className={`sk-tree-row${selectedDept === ACCOUNT.company ? " is-selected" : ""}`}
                  onClick={() => setSelectedDept(ACCOUNT.company)}
                >
                  <span className="sk-tree-caret">⌄</span>
                  <span>{ACCOUNT.company}</span>
                  <span className="sk-tree-more">⋯</span>
                </div>
                <div className="sk-tree-group">
                  {treeMatches("后勤部") ? (
                    <>
                      <div
                        className={`sk-tree-row${selectedDept === "后勤部" ? " is-selected" : ""}`}
                        onClick={() => setSelectedDept("后勤部")}
                      >
                        <span className="sk-tree-caret">⌄</span>
                        <span>后勤部</span>
                        <span className="sk-tree-more">⋯</span>
                      </div>
                      {DEPT_GROUPS.filter(treeMatches).map((name) => (
                        <div
                          key={name}
                          className={`sk-tree-row is-leaf${
                            selectedDept === name ? " is-selected" : ""
                          }`}
                          onClick={() => setSelectedDept(name)}
                        >
                          <span className="sk-tree-person">♙</span>
                          <span>{name}</span>
                          <span className="sk-tree-more">⋯</span>
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              </div>
            </aside>
            <section className="sk-members-main">
              <div className="sk-toolbar sk-members-toolbar">
                <div className="sk-members-title">
                  <strong>{selectedDept}</strong>
                  <span className="sk-edit-icon">✎</span>
                  <span className="sk-member-count">♙{filteredMembers.length}</span>
                  <span className="sk-help-icon">ⓘ</span>
                </div>
                <div className="sk-toolbar-actions">
                  <SkButton variant="primary" onClick={() => setPickerOpen(true)}>
                    添加成员
                  </SkButton>
                  <SkButton onClick={() => setApplicantOpen(true)}>申请人列表</SkButton>
                  <MoreMenu
                    items={[
                      { label: "批量导入成员", onClick: () => show("请选择要导入的成员文件") },
                      {
                        label: "批量删除成员",
                        disabled: selected.length === 0,
                        onClick: () => setRemoveIds(selected),
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="sk-member-status">
                <span>状态：</span>
                {["全部", "正常", "未激活"].map((item) => (
                  <span
                    key={item}
                    className={`sk-status-pill${status === item ? " is-active" : ""}`}
                    onClick={() => {
                      setStatus(item);
                      setPage(1);
                    }}
                  >
                    {item}
                  </span>
                ))}
                <span className="sk-grid-icon">▦</span>
              </div>
              <SkTable
                columns={[
                  {
                    key: "check",
                    title: (
                      <CheckCell
                        checked={
                          memberRows.length > 0 &&
                          memberRows.every((member) => selected.includes(member.id))
                        }
                        onChange={() => {
                          const ids = memberRows.map((member) => member.id);
                          const all = ids.every((id) => selected.includes(id));
                          setSelected((current) =>
                            all
                              ? current.filter((id) => !ids.includes(id))
                              : Array.from(new Set([...current, ...ids])),
                          );
                        }}
                      />
                    ),
                    width: 40,
                  },
                  { key: "name", title: "姓名" },
                  { key: "status", title: "账号状态" },
                  { key: "email", title: "邮箱" },
                  { key: "phone", title: "手机" },
                  { key: "dept", title: "部门" },
                  { key: "gender", title: "性别" },
                  { key: "no", title: "工号" },
                  { key: "op", title: "操作" },
                ]}
                className="sk-member-table"
                rowClassName={(index) =>
                  memberRows[index] && selected.includes(memberRows[index].id)
                    ? "sk-row-selected"
                    : ""
                }
                rows={memberRows.map((member) => [
                  <CheckCell
                    key="c"
                    checked={selected.includes(member.id)}
                    onChange={() =>
                      setSelected((current) =>
                        current.includes(member.id)
                          ? current.filter((id) => id !== member.id)
                          : [...current, member.id],
                      )
                    }
                  />,
                  member.name,
                  <span key="s" className="sk-status-dot">
                    {member.status}
                  </span>,
                  member.email,
                  member.phone,
                  member.dept,
                  member.gender,
                  member.no,
                  <span key="op">
                    <SkActionLink onClick={() => setDetailId(member.id)}>详情</SkActionLink>
                    <MoreMenu
                      label="···"
                      buttonVariant="text"
                      showCaret={false}
                      items={[
                        { label: "编辑", onClick: () => setEditMember({ ...member }) },
                        {
                          label: "重置密码",
                          onClick: () => show(`已重置 ${member.name} 的密码`),
                        },
                        {
                          label: "删除",
                          onClick: () => setRemoveIds([member.id]),
                        },
                      ]}
                    />
                  </span>,
                ])}
              />
              <div className="sk-members-footer">
                <SkSwitch checked={directOnly} onChange={setDirectOnly} />
                <span>仅展示部门的直属成员</span>
              </div>
              <SkPagination
                total={filteredMembers.length}
                page={memberPage}
                pageSize={pageSize}
                showTotal={false}
                onPageChange={(next) => setPage(next)}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setPage(1);
                }}
              />
            </section>
          </div>
        ) : null}

        {tab === 1 ? (
          <div className="sk-members-layout">
            <aside className="sk-members-tree">
              <div className="sk-tree-search">
                <SkInput placeholder="搜索部门" value={keyword} onChange={setKeyword} />
                <button type="button" className="sk-tree-search-btn" aria-label="search">
                  ⌕
                </button>
              </div>
              <div className="sk-tree">
                <div className="sk-tree-row is-selected">
                  <span className="sk-tree-caret">⌄</span>
                  <span>{ACCOUNT.company}</span>
                </div>
                <div className="sk-tree-group">
                  {filteredDepts.map((dept) => (
                    <div key={dept.id} className="sk-tree-row is-leaf" onClick={() => setSelectedDept(dept.name)}>
                      <span className="sk-tree-caret">⌄</span>
                      <span>{dept.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
            <section className="sk-members-main">
              <div className="sk-toolbar sk-members-toolbar">
                <div className="sk-members-title">
                  <strong>部门列表</strong>
                </div>
                <div className="sk-toolbar-actions">
                  <SkButton
                    variant="primary"
                    onClick={() => {
                      setDeptName("");
                      setDeptLeader("王");
                      setDeptModal({ mode: "add" });
                    }}
                  >
                    新建部门
                  </SkButton>
                  <SkButton
                    disabled={deptSelected.length === 0}
                    onClick={() => setDeptRemove(deptSelected)}
                  >
                    批量删除部门
                  </SkButton>
                </div>
              </div>
              <SkTable
                columns={[
                  {
                    key: "check",
                    title: (
                      <CheckCell
                        checked={
                          departments.length > 0 &&
                          departments.every((dept) => deptSelected.includes(dept.id))
                        }
                        onChange={() => {
                          setDeptSelected(
                            deptSelected.length === departments.length
                              ? []
                              : departments.map((dept) => dept.id),
                          );
                        }}
                      />
                    ),
                    width: 40,
                  },
                  { key: "name", title: "部门名称" },
                  { key: "level", title: "部门层级" },
                  { key: "count", title: "部门人数" },
                  { key: "leader", title: "部门负责人" },
                  { key: "op", title: "操作" },
                ]}
                rowClassName={(index) =>
                  departments[index] && deptSelected.includes(departments[index].id)
                    ? "sk-row-selected"
                    : ""
                }
                rows={departments.map((dept) => [
                  <CheckCell
                    key="c"
                    checked={deptSelected.includes(dept.id)}
                    onChange={() =>
                      setDeptSelected((current) =>
                        current.includes(dept.id)
                          ? current.filter((id) => id !== dept.id)
                          : [...current, dept.id],
                      )
                    }
                  />,
                  dept.name,
                  dept.level,
                  dept.count,
                  dept.leader,
                  <span key="op">
                    <SkActionLink
                      onClick={() => {
                        setDeptName(dept.name);
                        setDeptLeader(dept.leader);
                        setDeptModal({ mode: "edit", id: dept.id });
                      }}
                    >
                      编辑
                    </SkActionLink>
                    <SkActionLink
                      onClick={() => {
                        setDeptName("");
                        setDeptLeader("王");
                        setDeptModal({ mode: "child", id: dept.id });
                      }}
                    >
                      添加子部门
                    </SkActionLink>
                    <SkActionLink danger onClick={() => setDeptRemove([dept.id])}>
                      删除
                    </SkActionLink>
                  </span>,
                ])}
              />
            </section>
          </div>
        ) : null}

        {tab === 2 ? (
          <div className="sk-job-layout">
            <aside className="sk-job-side">
              {jobGroups.map((group) => (
                <div key={group.id}>
                  <div className="sk-job-group-title">
                    <span>{group.name}</span>
                  </div>
                  {group.positions.map((position) => (
                    <div
                      key={position}
                      className={`sk-job-row${jobPosition === position ? " is-selected" : ""}`}
                      onClick={() => {
                        setJobGroupId(group.id);
                        setJobPosition(position);
                      }}
                    >
                      <span>{position}</span>
                    </div>
                  ))}
                </div>
              ))}
            </aside>
            <section className="sk-job-main">
              <div className="sk-toolbar sk-members-toolbar">
                <div className="sk-members-title">
                  <strong>{jobPosition}</strong>
                  <span className="sk-member-count">{jobMembers.length}</span>
                </div>
                <div className="sk-toolbar-actions">
                  <SkButton
                    onClick={() => {
                      setJobGroupName("");
                      setJobGroupModal(true);
                    }}
                  >
                    新建岗位组
                  </SkButton>
                  <SkButton
                    onClick={() => {
                      setJobPositionName("");
                      setJobPositionModal(true);
                    }}
                  >
                    新建岗位
                  </SkButton>
                </div>
              </div>
              <div className="sk-job-actions">
                <SkButton onClick={() => show("请选择要导入的岗位文件")}>批量导入岗位</SkButton>
                <SkButton onClick={() => setJobPickerOpen(true)}>添加成员</SkButton>
                <SkButton
                  disabled={jobSelected.length === 0}
                  onClick={() => {
                    setJobMembers((current) =>
                      current.filter((member) => !jobSelected.includes(member.id)),
                    );
                    setJobSelected([]);
                    show("移除成功");
                  }}
                >
                  移除成员
                </SkButton>
              </div>
              <SkTable
                columns={[
                  {
                    key: "check",
                    title: (
                      <CheckCell
                        checked={
                          jobMembers.length > 0 &&
                          jobMembers.every((member) => jobSelected.includes(member.id))
                        }
                        onChange={() =>
                          setJobSelected(
                            jobSelected.length === jobMembers.length
                              ? []
                              : jobMembers.map((member) => member.id),
                          )
                        }
                      />
                    ),
                    width: 40,
                  },
                  { key: "name", title: "姓名" },
                  { key: "phone", title: "电话" },
                  { key: "position", title: "岗位" },
                  { key: "gender", title: "性别" },
                  { key: "no", title: "工号" },
                  { key: "op", title: "操作" },
                ]}
                rowClassName={(index) =>
                  jobMembers[index] && jobSelected.includes(jobMembers[index].id)
                    ? "sk-row-selected"
                    : ""
                }
                rows={jobMembers.map((member) => [
                  <CheckCell
                    key="c"
                    checked={jobSelected.includes(member.id)}
                    onChange={() =>
                      setJobSelected((current) =>
                        current.includes(member.id)
                          ? current.filter((id) => id !== member.id)
                          : [...current, member.id],
                      )
                    }
                  />,
                  member.name,
                  member.phone,
                  member.position,
                  member.gender,
                  member.no,
                  <SkActionLink
                    key="op"
                    danger
                    onClick={() => {
                      setJobMembers((current) =>
                        current.filter((item) => item.id !== member.id),
                      );
                      show("移除成功");
                    }}
                  >
                    移除
                  </SkActionLink>,
                ])}
              />
              <SkPagination
                total={jobMembers.length}
                page={jobPage}
                pageSize={10}
                showTotal={false}
                onPageChange={setJobPage}
              />
            </section>
          </div>
        ) : null}
      </SkCard>

      <PickerModal
        open={pickerOpen}
        title="请选择成员"
        selected={pickerSelected}
        onChange={setPickerSelected}
        onClose={() => setPickerOpen(false)}
        onOk={addPickedMembers}
      />

      <SkDrawer
        open={detailId !== null}
        title="成员详情"
        width={520}
        onClose={() => setDetailId(null)}
        footer={
          <>
            <SkButton onClick={() => setDetailId(null)}>关 闭</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (detail) setEditMember({ ...detail });
                setDetailId(null);
              }}
            >
              编 辑
            </SkButton>
          </>
        }
      >
        {detail ? (
          <div className="sk-drawer-form">
            <Field label="姓名">
              <div className="sk-field-value">{detail.name}</div>
            </Field>
            <Field label="账号状态">
              <div className="sk-field-value">{detail.status}</div>
            </Field>
            <Field label="手机">
              <div className="sk-field-value">{detail.phone}</div>
            </Field>
            <Field label="邮箱">
              <div className="sk-field-value">{detail.email}</div>
            </Field>
            <Field label="部门">
              <div className="sk-field-value">{detail.dept}</div>
            </Field>
            <Field label="性别">
              <div className="sk-field-value">{detail.gender}</div>
            </Field>
            <Field label="工号">
              <div className="sk-field-value">{detail.no}</div>
            </Field>
            <Field label="所属角色">
              <div className="sk-field-value">普通成员</div>
            </Field>
          </div>
        ) : null}
      </SkDrawer>

      <SkModal
        open={editMember !== null}
        title="编辑成员"
        width={520}
        onClose={() => setEditMember(null)}
        footer={
          <>
            <SkButton onClick={() => setEditMember(null)}>取 消</SkButton>
            <SkButton variant="primary" onClick={saveMember}>
              保 存
            </SkButton>
          </>
        }
      >
        {editMember ? (
          <div className="sk-modal-form">
            <Field label="姓名" required>
              <SkInput
                value={editMember.name}
                onChange={(value) =>
                  setEditMember((current) => (current ? { ...current, name: value } : current))
                }
              />
            </Field>
            <Field label="手机">
              <SkInput
                value={editMember.phone}
                onChange={(value) =>
                  setEditMember((current) => (current ? { ...current, phone: value } : current))
                }
              />
            </Field>
            <Field label="邮箱">
              <SkInput
                value={editMember.email}
                onChange={(value) =>
                  setEditMember((current) => (current ? { ...current, email: value } : current))
                }
              />
            </Field>
            <Field label="部门">
              <SkSelect
                value={editMember.dept}
                options={[ACCOUNT.company, "后勤部", ...DEPT_GROUPS]}
                onChange={(value) =>
                  setEditMember((current) => (current ? { ...current, dept: value } : current))
                }
              />
            </Field>
            <Field label="性别">
              <SkSelect
                value={editMember.gender}
                options={["男", "女", "未知"]}
                onChange={(value) =>
                  setEditMember((current) => (current ? { ...current, gender: value } : current))
                }
              />
            </Field>
            <Field label="工号">
              <SkInput
                value={editMember.no}
                onChange={(value) =>
                  setEditMember((current) => (current ? { ...current, no: value } : current))
                }
              />
            </Field>
          </div>
        ) : null}
      </SkModal>

      <SkConfirm
        open={removeIds !== null}
        content={`确定删除选中的 ${removeIds?.length ?? 0} 位成员吗？`}
        danger
        onCancel={() => setRemoveIds(null)}
        onOk={() => {
          setMembers((current) => current.filter((member) => !removeIds?.includes(member.id)));
          setSelected((current) => current.filter((id) => !removeIds?.includes(id)));
          setRemoveIds(null);
          show("删除成功");
        }}
      />

      <SkModal
        open={applicantOpen}
        title="申请人列表"
        width={640}
        onClose={() => setApplicantOpen(false)}
        footer={<SkButton onClick={() => setApplicantOpen(false)}>关 闭</SkButton>}
      >
        <div className="sk-empty-inline">暂无申请</div>
      </SkModal>

      <SkModal
        open={deptModal !== null}
        title={
          deptModal?.mode === "edit"
            ? "编辑部门"
            : deptModal?.mode === "child"
              ? "添加子部门"
              : "新建部门"
        }
        width={480}
        onClose={() => setDeptModal(null)}
        footer={
          <>
            <SkButton onClick={() => setDeptModal(null)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!deptName.trim()) {
                  show("请输入部门名称");
                  return;
                }
                if (deptModal?.mode === "edit" && deptModal.id) {
                  setDepartments((current) =>
                    current.map((dept) =>
                      dept.id === deptModal.id
                        ? { ...dept, name: deptName, leader: deptLeader }
                        : dept,
                    ),
                  );
                } else {
                  setDepartments((current) => [
                    ...current,
                    {
                      id: Date.now(),
                      name: deptName,
                      level: deptModal?.mode === "child" ? "部门子级" : "专业部门",
                      count: "0",
                      leader: deptLeader,
                    },
                  ]);
                }
                setDeptModal(null);
                show("保存成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <div className="sk-modal-form">
          <Field label="部门名称" required>
            <SkInput
              placeholder="请输入部门名称"
              value={deptName}
              onChange={setDeptName}
            />
          </Field>
          <Field label="部门负责人">
            <SkSelect
              value={deptLeader}
              options={["王", "AAA", "李保洁", "张保洁"]}
              onChange={setDeptLeader}
            />
          </Field>
        </div>
      </SkModal>

      <SkConfirm
        open={deptRemove !== null}
        content={`确定删除选中的 ${deptRemove?.length ?? 0} 个部门吗？`}
        danger
        onCancel={() => setDeptRemove(null)}
        onOk={() => {
          setDepartments((current) => current.filter((dept) => !deptRemove?.includes(dept.id)));
          setDeptSelected((current) => current.filter((id) => !deptRemove?.includes(id)));
          setDeptRemove(null);
          show("删除成功");
        }}
      />

      <PickerModal
        open={jobPickerOpen}
        title="请选择成员"
        exclude={jobMembers.map((member) => member.name)}
        selected={jobPickerSelected}
        onChange={setJobPickerSelected}
        onClose={() => setJobPickerOpen(false)}
        onOk={() => {
          const next = ALL_USERS.filter(
            (person) =>
              jobPickerSelected.includes(person.name) &&
              !jobMembers.some((member) => member.name === person.name),
          ).map((person, index) => ({
            id: Date.now() + index,
            name: person.name,
            phone: person.phone.replace("****", "0001"),
            position: jobPosition,
            gender: "男",
            no: person.no,
          }));
          setJobMembers((current) => [...current, ...next]);
          setJobPickerSelected([]);
          setJobPickerOpen(false);
          show("添加成功");
        }}
      />

      <SkModal
        open={jobGroupModal}
        title="新建岗位组"
        width={480}
        onClose={() => setJobGroupModal(false)}
        footer={
          <>
            <SkButton onClick={() => setJobGroupModal(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!jobGroupName.trim()) {
                  show("请输入岗位组名称");
                  return;
                }
                setJobGroups((current) => [
                  ...current,
                  { id: Date.now(), name: jobGroupName, positions: [] },
                ]);
                setJobGroupModal(false);
                show("新建成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <Field label="岗位组名称" required>
          <SkInput
            placeholder="请输入岗位组名称"
            value={jobGroupName}
            onChange={setJobGroupName}
          />
        </Field>
      </SkModal>

      <SkModal
        open={jobPositionModal}
        title="新建岗位"
        width={480}
        onClose={() => setJobPositionModal(false)}
        footer={
          <>
            <SkButton onClick={() => setJobPositionModal(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!jobPositionName.trim()) {
                  show("请输入岗位名称");
                  return;
                }
                setJobGroups((current) =>
                  current.map((group) =>
                    group.id === jobGroupId
                      ? { ...group, positions: [...group.positions, jobPositionName] }
                      : group,
                  ),
                );
                setJobPosition(jobPositionName);
                setJobPositionModal(false);
                show("新建成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <Field label="岗位名称" required>
          <SkInput
            placeholder="请输入岗位名称"
            value={jobPositionName}
            onChange={setJobPositionName}
          />
        </Field>
        <Field label="所属岗位组">
          <SkSelect
            value={jobGroups.find((group) => group.id === jobGroupId)?.name ?? ""}
            options={jobGroups.map((group) => group.name)}
            onChange={(value) => {
              const found = jobGroups.find((group) => group.name === value);
              if (found) setJobGroupId(found.id);
            }}
          />
        </Field>
      </SkModal>
      {node}
    </div>
  );
}

/* 06 角色管理 ------------------------------------------------------------- */

type RoleMember = {
  id: number;
  name: string;
  phone: string;
  no: string;
  dept: string;
  creator?: boolean;
};

type Role = {
  id: number;
  name: string;
  system: boolean;
  members: RoleMember[];
};

const INITIAL_ROLES: Role[] = [
  {
    id: 1,
    name: "超级管理员",
    system: true,
    members: [
      {
        id: 1,
        name: "王",
        phone: "+86 155****6033",
        no: "1",
        dept: "大连华安物业管理有限公司、维修组",
        creator: true,
      },
    ],
  },
  { id: 2, name: "使用人员", system: false, members: [] },
];

export function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [selectedRoleId, setSelectedRoleId] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleDesc, setRoleDesc] = useState("");
  const [roleDefault, setRoleDefault] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSelected, setPickerSelected] = useState<string[]>([]);
  const [transferOpen, setTransferOpen] = useState(false);
  const [transferTarget, setTransferTarget] = useState("");
  const [removeRole, setRemoveRole] = useState<Role | null>(null);
  const { show, node } = useSkMessage();

  const role = roles.find((item) => item.id === selectedRoleId) ?? roles[0];
  const filteredMembers = role.members.filter(
    (member) => !keyword || member.name.includes(keyword),
  );
  const pageCount = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRows = filteredMembers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const addRole = () => {
    if (!roleName.trim()) {
      show("请输入角色名称");
      return;
    }
    const next: Role = {
      id: Date.now(),
      name: roleName,
      system: false,
      members: [],
    };
    setRoles((current) => [...current, next]);
    setSelectedRoleId(next.id);
    setDrawerOpen(false);
    setRoleName("");
    setRoleDesc("");
    setRoleDefault(false);
    setReadonly(false);
    setPermissions([]);
    show("新增成功");
  };

  const addMembers = () => {
    const next = ALL_USERS.filter(
      (person) =>
        pickerSelected.includes(person.name) &&
        !role.members.some((member) => member.name === person.name),
    ).map((person, index) => ({
      id: Date.now() + index,
      name: person.name,
      phone: person.phone,
      no: person.no,
      dept: person.dept,
    }));
    setRoles((current) =>
      current.map((item) =>
        item.id === role.id ? { ...item, members: [...item.members, ...next] } : item,
      ),
    );
    setPickerSelected([]);
    setPickerOpen(false);
    show("添加成功");
  };

  const removeMembers = () => {
    setRoles((current) =>
      current.map((item) =>
        item.id === role.id
          ? { ...item, members: item.members.filter((member) => !selected.includes(member.id)) }
          : item,
      ),
    );
    setSelected([]);
    show("移除成功");
  };

  const transferMembers = () => {
    if (!transferTarget) {
      show("请选择转移角色");
      return;
    }
    const target = roles.find((item) => item.name === transferTarget);
    if (!target) return;
    const moving = role.members.filter((member) => selected.includes(member.id));
    setRoles((current) =>
      current.map((item) => {
        if (item.id === role.id) {
          return {
            ...item,
            members: item.members.filter((member) => !selected.includes(member.id)),
          };
        }
        if (item.id === target.id) {
          const additions = moving.filter(
            (member) => !item.members.some((existing) => existing.name === member.name),
          );
          return { ...item, members: [...item.members, ...additions] };
        }
        return item;
      }),
    );
    setSelected([]);
    setTransferOpen(false);
    setTransferTarget("");
    show("转移成功");
  };

  return (
    <div className="sk-page">
      <div className="sk-roles-layout">
        <SkCard className="sk-roles-side">
          {roles.map((item) => (
            <div
              key={item.id}
              className={`sk-role-item${item.id === role.id ? " is-active" : ""}`}
              onClick={() => {
                setSelectedRoleId(item.id);
                setSelected([]);
                setPage(1);
              }}
            >
              <span className="sk-role-icon">♙</span>
              <span>{item.name}</span>
              {item.system ? (
                <span className="sk-role-tag">系统角色</span>
              ) : (
                <MoreMenu
                  label="⋯"
                  buttonVariant="text"
                  className="sk-role-more"
                  showCaret={false}
                  items={[
                    { label: "删除角色", onClick: () => setRemoveRole(item) },
                  ]}
                />
              )}
            </div>
          ))}
          <div className="sk-roles-add">
            <SkButton
              variant="outline"
              className="sk-roles-add-btn"
              onClick={() => setDrawerOpen(true)}
            >
              新增角色
            </SkButton>
          </div>
        </SkCard>
        <SkCard className="sk-roles-main">
          <div className="sk-toolbar">
            <div className="sk-members-title">
              <strong>{role.name}</strong>
              <span className="sk-edit-icon">✎</span>
              <span className="sk-member-count">♙ {role.members.length}</span>
            </div>
            <div className="sk-toolbar-actions">
              <SkButton variant="primary" onClick={() => setPickerOpen(true)}>
                添加成员
              </SkButton>
              <SkButton disabled={selected.length === 0} onClick={removeMembers}>
                移除成员
              </SkButton>
            </div>
          </div>
          <div className="sk-role-search">
            <SkInput placeholder="搜索成员姓名" value={keyword} onChange={setKeyword} />
            <SkButton variant="primary">⌕</SkButton>
          </div>
          <SkTable
            columns={[
              {
                key: "check",
                title: (
                  <CheckCell
                    checked={
                      pageRows.length > 0 &&
                      pageRows.every((member) => selected.includes(member.id))
                    }
                    onChange={() => {
                      const ids = pageRows.map((member) => member.id);
                      const all = ids.every((id) => selected.includes(id));
                      setSelected((current) =>
                        all
                          ? current.filter((id) => !ids.includes(id))
                          : Array.from(new Set([...current, ...ids])),
                      );
                    }}
                  />
                ),
                width: 40,
              },
              { key: "name", title: "姓名" },
              { key: "phone", title: "电话" },
              { key: "no", title: "工号" },
              { key: "dept", title: "所属部门" },
              { key: "op", title: "操作" },
            ]}
            rowClassName={(index) =>
              pageRows[index] && selected.includes(pageRows[index].id) ? "sk-row-selected" : ""
            }
            rows={pageRows.map((member) => [
              <CheckCell
                key="c"
                checked={selected.includes(member.id)}
                onChange={() =>
                  setSelected((current) =>
                    current.includes(member.id)
                      ? current.filter((id) => id !== member.id)
                      : [...current, member.id],
                  )
                }
              />,
              <span key="n">
                {member.name}
                {member.creator ? <span className="sk-role-tag is-green">创建人</span> : null}
              </span>,
              member.phone,
              member.no,
              member.dept,
              <SkActionLink
                key="op"
                onClick={() => {
                  setSelected([member.id]);
                  setTransferOpen(true);
                }}
              >
                转移
              </SkActionLink>,
            ])}
          />
          <SkPagination
            total={filteredMembers.length}
            page={currentPage}
            pageSize={pageSize}
            showTotal={false}
            onPageChange={(next) => setPage(next)}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </SkCard>
      </div>

      <SkDrawer
        open={drawerOpen}
        title="添加角色"
        width={1000}
        onClose={() => setDrawerOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setDrawerOpen(false)}>取 消</SkButton>
            <SkButton variant="primary" onClick={addRole}>
              保 存
            </SkButton>
          </>
        }
      >
        <div className="sk-drawer-form">
          <div className="sk-form-grid">
            <Field label="角色名称" required>
              <SkInput placeholder="请输入角色名称" value={roleName} onChange={setRoleName} />
            </Field>
            <Field label="角色描述">
              <SkInput placeholder="请输入角色描述" value={roleDesc} onChange={setRoleDesc} />
            </Field>
          </div>
          <Field label="默认角色">
            <SkSwitch checked={roleDefault} onChange={setRoleDefault} />
          </Field>
          <Field label="角色权限">
            <div className="sk-role-perm-title">
              <SkCheckbox
                label="只读"
                checked={readonly}
                onChange={setReadonly}
              />
              <SkCheckbox
                label="全选"
                checked={permissions.length === MODULES.length}
                onChange={(checked) =>
                  setPermissions(checked ? [...MODULES] : [])
                }
              />
            </div>
            <div className="sk-role-perm-grid">
              {MODULES.map((module) => (
                <SkCheckbox
                  key={module}
                  label={module}
                  checked={permissions.includes(module)}
                  onChange={(checked) =>
                    setPermissions((current) =>
                      checked
                        ? [...current, module]
                        : current.filter((item) => item !== module),
                    )
                  }
                />
              ))}
            </div>
          </Field>
        </div>
      </SkDrawer>

      <PickerModal
        open={pickerOpen}
        title="请选择成员"
        exclude={role.members.map((member) => member.name)}
        selected={pickerSelected}
        onChange={setPickerSelected}
        onClose={() => setPickerOpen(false)}
        onOk={addMembers}
      />

      <SkModal
        open={transferOpen}
        title="转移成员"
        width={440}
        onClose={() => setTransferOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setTransferOpen(false)}>取 消</SkButton>
            <SkButton variant="primary" onClick={transferMembers}>
              确 定
            </SkButton>
          </>
        }
      >
        <Field label="转移至角色" required>
          <SkSelect
            placeholder="请选择角色"
            value={transferTarget}
            options={roles.filter((item) => item.id !== role.id).map((item) => item.name)}
            onChange={setTransferTarget}
          />
        </Field>
      </SkModal>

      <SkConfirm
        open={removeRole !== null}
        content={`确定删除角色“${removeRole?.name ?? ""}”吗？`}
        danger
        onCancel={() => setRemoveRole(null)}
        onOk={() => {
          if (removeRole) {
            setRoles((current) => current.filter((item) => item.id !== removeRole.id));
            if (selectedRoleId === removeRole.id) setSelectedRoleId(roles[0].id);
            show("删除成功");
          }
          setRemoveRole(null);
        }}
      />
      {node}
    </div>
  );
}

/* 07 菜单管理 ------------------------------------------------------------- */

const DEFAULT_MENUS = [
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
];

export function MenusPage() {
  const [alertVisible, setAlertVisible] = useState(true);
  const [customTop, setCustomTop] = useState<string[]>([]);
  const [customLeft, setCustomLeft] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState<"top" | "left" | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuIcon, setMenuIcon] = useState("");
  const [menuUrl, setMenuUrl] = useState("");
  const [menuSort, setMenuSort] = useState("");
  const [menuParent, setMenuParent] = useState("");
  const { show, node } = useSkMessage();

  const addMenu = (name: string, zone: "top" | "left" = "left") => {
    if (!name.trim()) return;
    if (zone === "top") {
      setCustomTop((current) => (current.includes(name) ? current : [...current, name]));
    } else {
      setCustomLeft((current) => (current.includes(name) ? current : [...current, name]));
    }
  };

  const removeChip = (zone: "top" | "left", name: string) => {
    if (zone === "top") setCustomTop((current) => current.filter((item) => item !== name));
    else setCustomLeft((current) => current.filter((item) => item !== name));
  };

  return (
    <div className="sk-page">
      {alertVisible ? (
        <div className="sk-info-alert">
          <span>
            在菜单管理中，企业可依据自身实际业务需求，灵活自定义菜单的名称以及其在界面中的显示位置。完成菜单的自定义设置后，在后续角色管理工作中，系统会以已自定义好的菜单架构为基础，为不同角色分配相应的菜单权限。
            三级菜单的布局受到限制，不可脱离其原本关联的二级菜单所在位置而进行单独拖动调整。
          </span>
          <button
            type="button"
            className="sk-alert-close"
            aria-label="close"
            onClick={() => setAlertVisible(false)}
          >
            ×
          </button>
        </div>
      ) : null}
      <div className="sk-menus-layout">
        <SkCard className="sk-menus-side">
          <div className="sk-menu-side-title">默认菜单</div>
          <div className="sk-menu-list">
            {DEFAULT_MENUS.map((name) => (
              <div
                key={name}
                className="sk-menu-row"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData("text/plain", name);
                  event.dataTransfer.effectAllowed = "copy";
                }}
              >
                <span className="sk-menu-caret">▸</span>
                <span>{name}</span>
                <span
                  className="sk-menu-plus"
                  title="添加到左侧菜单"
                  onClick={() => addMenu(name, "left")}
                >
                  +
                </span>
              </div>
            ))}
          </div>
          <div className="sk-menus-add">
            <SkButton
              variant="outline"
              className="sk-menus-add-btn"
              onClick={() => setAddOpen(true)}
            >
              + 添加自定义菜单
            </SkButton>
          </div>
        </SkCard>
        <SkCard className="sk-menus-main">
          <div className="sk-toolbar">
            <div className="sk-title">自定义菜单</div>
            <div className="sk-toolbar-actions">
              <SkButton
                disabled={customTop.length === 0 && customLeft.length === 0}
                onClick={() => {
                  setCustomTop([]);
                  setCustomLeft([]);
                  show("已恢复默认菜单");
                }}
              >
                恢复默认
              </SkButton>
              <SkButton
                onClick={() => {
                  setCustomTop([]);
                  setCustomLeft([]);
                }}
              >
                重置
              </SkButton>
              <SkButton onClick={() => show("草稿保存成功")}>保存草稿</SkButton>
              <SkButton
                variant="primary"
                onClick={() => {
                  if (customTop.length === 0 && customLeft.length === 0) {
                    show("请先添加自定义菜单");
                    return;
                  }
                  show("发布成功");
                }}
              >
                发布
              </SkButton>
            </div>
          </div>
          <div className="sk-menu-editor">
            <div className="sk-menu-editor-row">
              <div className="sk-menu-editor-label">顶部菜单</div>
              <div
                className={`sk-menu-drop sk-menu-drop-top${
                  dragOver === "top" ? " is-over" : ""
                }`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragOver("top");
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(event) => {
                  event.preventDefault();
                  addMenu(event.dataTransfer.getData("text/plain"), "top");
                  setDragOver(null);
                }}
              >
                {customTop.length ? (
                  customTop.map((name) => (
                    <span key={name} className="sk-menu-editor-chip">
                      {name}
                      <button type="button" onClick={() => removeChip("top", name)}>
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <span>暂无数据，请从左侧默认菜单拖拽，搭建你的自定义菜单</span>
                )}
              </div>
            </div>
            <div className="sk-menu-editor-row">
              <div className="sk-menu-editor-label">左侧菜单</div>
              <div
                className={`sk-menu-drop sk-menu-drop-left${
                  dragOver === "left" ? " is-over" : ""
                }`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragOver("left");
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(event) => {
                  event.preventDefault();
                  addMenu(event.dataTransfer.getData("text/plain"), "left");
                  setDragOver(null);
                }}
              >
                {customLeft.length ? (
                  customLeft.map((name) => (
                    <span key={name} className="sk-menu-editor-chip">
                      {name}
                      <button type="button" onClick={() => removeChip("left", name)}>
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <SkEmpty text="暂无数据，请从左侧默认菜单拖拽，搭建你的自定义菜单" />
                )}
              </div>
            </div>
          </div>
        </SkCard>
      </div>

      <SkModal
        open={addOpen}
        title="添加自定义菜单"
        width={560}
        onClose={() => setAddOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setAddOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!menuName.trim()) {
                  show("请输入菜单名称");
                  return;
                }
                addMenu(menuName, menuParent === "顶部菜单" ? "top" : "left");
                setAddOpen(false);
                setMenuName("");
                setMenuIcon("");
                setMenuUrl("");
                setMenuSort("");
                setMenuParent("");
                show("添加成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <div className="sk-modal-form">
          <Field label="菜单名称" required>
            <SkInput placeholder="请输入" value={menuName} onChange={setMenuName} />
          </Field>
          <Field label="菜单图标">
            <SkInput placeholder="请输入" value={menuIcon} onChange={setMenuIcon} />
          </Field>
          <Field label="跳转地址">
            <SkInput placeholder="请输入" value={menuUrl} onChange={setMenuUrl} />
          </Field>
          <Field label="排序">
            <SkInput placeholder="请输入" value={menuSort} onChange={setMenuSort} />
          </Field>
          <Field label="上级菜单">
            <SkSelect
              placeholder="请选择"
              value={menuParent}
              options={["顶部菜单", "左侧菜单"]}
              onChange={setMenuParent}
            />
          </Field>
        </div>
      </SkModal>
      {node}
    </div>
  );
}

/* 08 查看权限 ------------------------------------------------------------- */

const AUTH_SECTIONS = ["隐藏的部门/成员", "限制查看外部门", "限制查看所有人"];

type AuthRow = {
  id: number;
  target: string;
  info: string;
  forbidden: boolean;
};

const EMPTY_AUTH: Record<string, AuthRow[]> = {
  [AUTH_SECTIONS[0]]: [],
  [AUTH_SECTIONS[1]]: [],
  [AUTH_SECTIONS[2]]: [],
};

export function ContactAuthPage() {
  const [rows, setRows] = useState<Record<string, AuthRow[]>>(EMPTY_AUTH);
  const [section, setSection] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [info, setInfo] = useState("的通讯录信息");
  const [forbidden, setForbidden] = useState(false);
  const [authKeyword, setAuthKeyword] = useState("");
  const [alertVisible, setAlertVisible] = useState(true);
  const [removeTarget, setRemoveTarget] = useState<{ section: string; id: number } | null>(null);
  const { show, node } = useSkMessage();

  const targetOptions = [
    ACCOUNT.company,
    "后勤部",
    ...DEPT_GROUPS,
    ...ALL_USERS.map((user) => user.name),
  ].filter((target) => !authKeyword || target.includes(authKeyword));

  return (
    <div className="sk-page">
      <SkCard className="sk-fill">
        <div className="sk-page-title">通讯录查看权限</div>
        {alertVisible ? (
          <div className="sk-info-alert">
            <span>
              1.当成员同时处于多个权限模块中，其权限优先级（权重）规则如下：限制查看所有人 &gt; 隐藏部门/成员权限 &gt; 限制查看外部门权限。
              <br />
              2.当成员归属于某一部门，且成员与所在部门均单独设置了权限时，其权限优先级（权重）规则如下：成员&gt;部门。
            </span>
            <button
              type="button"
              className="sk-alert-close"
              aria-label="close"
              onClick={() => setAlertVisible(false)}
            >
              ×
            </button>
          </div>
        ) : null}
        {AUTH_SECTIONS.map((title) => (
          <div key={title} className="sk-auth-section">
            <div className="sk-section-head">
              <div className="sk-section-title">
                <span className="sk-section-bar" />
                {title} <span className="sk-help-icon">ⓘ</span>
              </div>
              <div className="sk-toolbar-actions">
                <SkButton onClick={() => show("刷新成功")}>↻ 刷新</SkButton>
                <SkButton
                  variant="outline"
                  onClick={() => {
                    setSection(title);
                    setPicked([]);
                    setInfo("的通讯录信息");
                    setForbidden(false);
                    setAuthKeyword("");
                  }}
                >
                  <span className="sk-plus">+</span>新增
                </SkButton>
              </div>
            </div>
            <SkTable
              columns={[
                { key: "target", title: "部门/成员", width: "45%" },
                { key: "info", title: "通讯录信息", width: "45%" },
                { key: "op", title: "操作" },
              ]}
              rows={(rows[title] ?? []).map((row) => [
                row.target,
                `${row.info}${row.forbidden ? "（禁止全企业人员查看）" : ""}`,
                <SkActionLink
                  key="op"
                  danger
                  onClick={() => setRemoveTarget({ section: title, id: row.id })}
                >
                  删除
                </SkActionLink>,
              ])}
            />
          </div>
        ))}
      </SkCard>

      <SkModal
        open={section !== null}
        title={`添加${section ?? ""}`}
        width={560}
        onClose={() => setSection(null)}
        footer={
          <>
            <SkButton onClick={() => setSection(null)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!section || picked.length === 0) {
                  show("请选择部门或成员");
                  return;
                }
                setRows((current) => ({
                  ...current,
                  [section]: [
                    ...(current[section] ?? []),
                    ...picked.map((target, index) => ({
                      id: Date.now() + index,
                      target,
                      info,
                      forbidden,
                    })),
                  ],
                }));
                setSection(null);
                show("添加成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <div className="sk-modal-form">
          <Field label="添加成员、部门" required>
            <div className="sk-auth-picker">
              <SkInput
                placeholder="搜索"
                value={authKeyword}
                onChange={setAuthKeyword}
                className="sk-auth-search"
              />
              <div className="sk-auth-options">
                {targetOptions.map((target) => (
                  <SkCheckbox
                    key={target}
                    label={target}
                    checked={picked.includes(target)}
                    onChange={(checked) =>
                      setPicked((current) =>
                        checked
                          ? [...current, target]
                          : current.filter((item) => item !== target),
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </Field>
          <Field label="通讯录信息">
            <SkSelect
              value={info}
              options={["的通讯录信息", "的手机号码", "的邮箱地址"]}
              onChange={setInfo}
            />
          </Field>
          <SkCheckbox
            label="禁止全企业人员查看"
            checked={forbidden}
            onChange={setForbidden}
          />
        </div>
      </SkModal>

      <SkConfirm
        open={removeTarget !== null}
        content="确定删除该权限规则吗？"
        danger
        onCancel={() => setRemoveTarget(null)}
        onOk={() => {
          if (removeTarget) {
            setRows((current) => ({
              ...current,
              [removeTarget.section]: (current[removeTarget.section] ?? []).filter(
                (row) => row.id !== removeTarget.id,
              ),
            }));
            show("删除成功");
          }
          setRemoveTarget(null);
        }}
      />
      {node}
    </div>
  );
}

/* 09 资料显示 ------------------------------------------------------------- */

const DISPLAY_FIELDS = [
  "姓名",
  "部门",
  "职位",
  "职称",
  "工号",
  "手机号码",
  "邮箱地址",
  "直属上级",
  "所属角色",
  "性别",
  "出生年月",
  "政治面貌",
];

export function ContactDisplayPage() {
  const [fields, setFields] = useState([
    "姓名",
    "部门",
    "职位",
    "手机号码",
    "邮箱地址",
    "性别",
  ]);
  const [draft, setDraft] = useState<string[]>(fields);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const { show, node } = useSkMessage();

  return (
    <div className="sk-page">
      <SkCard className="sk-fill">
        <div className="sk-page-title">成员资料显示</div>
        <div className="sk-section-head sk-display-head">
          <div className="sk-section-title">
            <span className="sk-section-bar" />
            企业内资料展示 <span className="sk-help-icon">ⓘ</span>
          </div>
        </div>
        <div className="sk-display-table">
          <div className="sk-display-row">
            <div className="sk-display-label">个人信息显示</div>
            <div className="sk-display-value">{fields.join("、")}</div>
            <button
              type="button"
              className="sk-action-link"
              onClick={() => {
                setDraft(fields);
                setEditOpen(true);
              }}
            >
              ✎ 修改
            </button>
          </div>
          <div className="sk-display-row">
            <div className="sk-display-label">敏感成员信息显示</div>
            <div className="sk-display-value">0条规则，0位成员，0个部门</div>
            <button
              type="button"
              className="sk-action-link"
              onClick={() => setViewOpen(true)}
            >
              ◉ 查看
            </button>
          </div>
        </div>
      </SkCard>

      <SkModal
        open={editOpen}
        title="个人信息显示"
        width={640}
        onClose={() => setEditOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setEditOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (draft.length === 0) {
                  show("请至少选择一个字段");
                  return;
                }
                setFields(draft);
                setEditOpen(false);
                show("保存成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <div className="sk-modal-form">
          <div className="sk-modal-section-title">基本信息</div>
          <div className="sk-check-row sk-display-check-row">
            {DISPLAY_FIELDS.map((fieldName) => (
              <SkCheckbox
                key={fieldName}
                label={fieldName}
                checked={draft.includes(fieldName)}
                onChange={(checked) =>
                  setDraft((current) =>
                    checked
                      ? [...current, fieldName]
                      : current.filter((item) => item !== fieldName),
                  )
                }
              />
            ))}
          </div>
          <div className="sk-modal-section-title sk-display-section">拓展字段</div>
          <div className="sk-empty-inline">暂无数据</div>
        </div>
      </SkModal>

      <SkModal
        open={viewOpen}
        title="敏感成员信息"
        width={640}
        onClose={() => setViewOpen(false)}
        footer={<SkButton onClick={() => setViewOpen(false)}>关 闭</SkButton>}
      >
        <SkTable
          columns={[
            { key: "target", title: "部门/成员", width: "45%" },
            { key: "display", title: "显示", width: "45%" },
            { key: "op", title: "操作" },
          ]}
          rows={[]}
        />
      </SkModal>
      {node}
    </div>
  );
}
