"use client";

import { useState } from "react";

import { SpriteIcon } from "../app/icons";
import {
  SkActionLink,
  SkButton,
  SkCard,
  SkDrawer,
  SkEmpty,
  SkInput,
  SkSelect,
  SkTable,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "./common";

type PlanRow = {
  id: number;
  position: string;
  status: string;
  count: string;
  resumes: string;
  deadline: string;
  sort: string;
  published: string;
  publisher: string;
  views: string;
};

const MENU = ["招聘计划", "职位管理", "简历管理", "人才档案"];

export function OfficeRecruitPage() {
  const [menu, setMenu] = useState("招聘计划");
  const [rows, setRows] = useState<PlanRow[]>([]);
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    position: "",
    company: "",
    deadline: "",
    count: "",
    education: "",
    experience: "",
    salary: "面议",
    desc: "",
    city: "",
    address: "",
    sort: "",
  });
  const { show, node } = useSkMessage();

  const filtered = rows.filter(
    (row) =>
      (!position || row.position.includes(position)) &&
      (!status || row.status === status),
  );

  return (
    <div className="of-page of-recruit-page">
      <aside className="of-side-panel of-recruit-side">
        <div className="of-recruit-brand">
          <span><SpriteIcon name="org-menu-rencaizhaopin" /></span>
          <strong>人才招聘</strong>
        </div>
        {MENU.map((item) => (
          <button
            key={item}
            type="button"
            className={`of-side-item${menu === item ? " is-active" : ""}`}
            onClick={() => setMenu(item)}
          >
            {item}
          </button>
        ))}
      </aside>

      <section className="of-recruit-main">
        <SkCard className="of-card">
          <div className="of-toolbar">
            <div className="of-title">{menu}</div>
            {menu === "招聘计划" ? (
              <SkButton variant="primary" onClick={() => setOpen(true)}>
                <span className="sk-plus">+</span>新建计划
              </SkButton>
            ) : null}
          </div>
          {menu === "招聘计划" ? (
            <>
              <div className="of-recruit-filters">
                <SkSelect
                  placeholder="请选择招聘职位"
                  value={position}
                  options={Array.from(new Set(rows.map((row) => row.position)))}
                  onChange={setPosition}
                  className="of-recruit-select"
                />
                <SkSelect
                  placeholder="全部"
                  value={status}
                  options={["招聘中", "已结束"]}
                  onChange={setStatus}
                  className="of-recruit-select"
                />
              </div>
              <SkTable
                className="of-wide-table"
                columns={[
                  { key: "position", title: "招聘职位" },
                  { key: "status", title: "招聘状态" },
                  { key: "count", title: "计划招聘数" },
                  { key: "resumes", title: "提交简历数" },
                  { key: "deadline", title: "截止时间" },
                  { key: "sort", title: "排序" },
                  { key: "published", title: "发布时间" },
                  { key: "publisher", title: "发布人员" },
                  { key: "views", title: "浏览量" },
                  { key: "op", title: "操作" },
                ]}
                rows={filtered.map((row) => [
                  row.position,
                  row.status,
                  row.count,
                  row.resumes,
                  row.deadline,
                  row.sort,
                  row.published,
                  row.publisher,
                  row.views,
                  <SkActionLink
                    key="op"
                    danger
                    onClick={() => {
                      setRows((current) => current.filter((item) => item.id !== row.id));
                      show("删除成功");
                    }}
                  >
                    删除
                  </SkActionLink>,
                ])}
              />
            </>
          ) : (
            <SkEmpty text={`暂无${menu}数据`} />
          )}
        </SkCard>
      </section>

      <SkDrawer
        open={open}
        title="新建计划"
        width={700}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!form.position.trim()) {
                  show("请输入招聘职位");
                  return;
                }
                setRows((current) => [
                  ...current,
                  {
                    id: Date.now(),
                    position: form.position,
                    status: "招聘中",
                    count: form.count || "0",
                    resumes: "0",
                    deadline: form.deadline || "2026-12-31",
                    sort: form.sort || "0",
                    published: "2026-11-27",
                    publisher: "王",
                    views: "0",
                  },
                ]);
                setOpen(false);
                show("新建成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="of-drawer-form">
          <div className="of-form-grid">
            <OfficeField label="招聘职位" required>
              <SkInput
                value={form.position}
                onChange={(value) => setForm((current) => ({ ...current, position: value }))}
                placeholder="请选择招聘职位"
              />
            </OfficeField>
            <OfficeField label="公司名称">
              <SkInput
                value={form.company}
                onChange={(value) => setForm((current) => ({ ...current, company: value }))}
                placeholder="请填写公司名称"
              />
            </OfficeField>
            <OfficeField label="计划完成招聘时间">
              <SkInput
                value={form.deadline}
                onChange={(value) => setForm((current) => ({ ...current, deadline: value }))}
                placeholder="开始日期"
              />
            </OfficeField>
            <OfficeField label="招聘人数">
              <SkInput
                value={form.count}
                onChange={(value) => setForm((current) => ({ ...current, count: value }))}
                placeholder="请填写招聘人数"
              />
            </OfficeField>
            <OfficeField label="要求学历">
              <SkSelect
                placeholder="请选择学历"
                value={form.education}
                options={["不限", "大专", "本科", "硕士"]}
                onChange={(value) => setForm((current) => ({ ...current, education: value }))}
              />
            </OfficeField>
            <OfficeField label="工作年限">
              <SkSelect
                placeholder="请选择工作年限"
                value={form.experience}
                options={["不限", "1年以内", "1-3年", "3-5年", "5年以上"]}
                onChange={(value) => setForm((current) => ({ ...current, experience: value }))}
              />
            </OfficeField>
            <OfficeField label="薪资待遇">
              <SkInput
                value={form.salary}
                onChange={(value) => setForm((current) => ({ ...current, salary: value }))}
              />
            </OfficeField>
            <OfficeField label="工作地点">
              <SkInput
                value={form.city}
                onChange={(value) => setForm((current) => ({ ...current, city: value }))}
                placeholder="请选择城市/区域"
              />
            </OfficeField>
            <OfficeField label="详细地址">
              <SkInput
                value={form.address}
                onChange={(value) => setForm((current) => ({ ...current, address: value }))}
                placeholder="请填写详情地址"
              />
            </OfficeField>
            <OfficeField label="排序">
              <SkInput
                value={form.sort}
                onChange={(value) => setForm((current) => ({ ...current, sort: value }))}
                placeholder="请输入排序"
              />
            </OfficeField>
            <OfficeField label="职位描述" className="is-full">
              <textarea
                className="sk-textarea"
                value={form.desc}
                onChange={(event) => setForm((current) => ({ ...current, desc: event.target.value }))}
              />
            </OfficeField>
          </div>
        </div>
      </SkDrawer>
      {node}
    </div>
  );
}
