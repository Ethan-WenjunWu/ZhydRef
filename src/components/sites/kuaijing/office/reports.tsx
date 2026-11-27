"use client";

import { useState } from "react";

import {
  SkButton,
  SkCard,
  SkEmpty,
  SkInput,
  SkModal,
  SkSelect,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../app/SettingsUI";
import { exportCsv, OfficeField, OfficeSearchButtonGroup } from "./common";

/* 汇报列表 ---------------------------------------------------------------- */

export function ReportListPage() {
  const [tab, setTab] = useState(0);
  const [draft, setDraft] = useState({ staff: "", template: "", status: "", date: "" });
  const [filters, setFilters] = useState(draft);
  const { show, node } = useSkMessage();

  return (
    <div className="of-page">
      <SkCard className="of-card">
        <SkTabs items={["我收到的", "我提交的"]} active={tab} onChange={setTab} />
      </SkCard>
      <SkCard className="of-card">
        <div className="of-search-top">
          <span>未选择筛选字段</span>
          <span className="of-search-actions">
            <span className="sk-link" onClick={() => { const empty = { staff: "", template: "", status: "", date: "" }; setDraft(empty); setFilters(empty); }}>清除选项</span>
            <span>收起 ⌃</span>
          </span>
        </div>
        <div className="of-search-row">
          <OfficeField label="汇报人员">
            <SkSelect placeholder="请选择" value={draft.staff} options={["王", "AAA", "李保洁"]} onChange={(value) => setDraft((current) => ({ ...current, staff: value }))} />
          </OfficeField>
          <OfficeField label="汇报模板">
            <SkSelect placeholder="请选择汇报模板" value={draft.template} options={["日报", "周报", "月报"]} onChange={(value) => setDraft((current) => ({ ...current, template: value }))} />
          </OfficeField>
          <OfficeField label="状态">
            <SkSelect placeholder="请选择状态" value={draft.status} options={["已提交", "未提交", "已阅"]} onChange={(value) => setDraft((current) => ({ ...current, status: value }))} />
          </OfficeField>
          <OfficeField label="汇报时间">
            <SkInput type="date" value={draft.date} onChange={(value) => setDraft((current) => ({ ...current, date: value }))} />
          </OfficeField>
          <OfficeSearchButtonGroup onSearch={() => setFilters(draft)} onReset={() => { const empty = { staff: "", template: "", status: "", date: "" }; setDraft(empty); setFilters(empty); }} />
        </div>
        <div className="of-list-toolbar">
          <div className="of-title">汇报列表</div>
          <div className="of-toolbar-actions">
            <SkButton onClick={() => show("刷新成功")}>↻ 刷新</SkButton>
            <SkButton
              variant="outline"
              onClick={() => {
                exportCsv("汇报列表.csv", ["汇报人员", "手机号码", "汇报模板", "状态", "汇报时间"], []);
                show("导出成功");
              }}
            >
              导出数据
            </SkButton>
          </div>
        </div>
        <SkTable
          columns={[
            { key: "staff", title: "汇报人员" },
            { key: "phone", title: "手机号码" },
            { key: "template", title: "汇报模板" },
            { key: "status", title: "状态" },
            { key: "time", title: "汇报时间" },
            { key: "modified", title: "最近一次修改时间" },
            { key: "op", title: "操作" },
          ]}
          emptyText={
            filters.staff || filters.template || filters.status || filters.date
              ? "未找到匹配的汇报"
              : "暂无数据"
          }
          rows={[]}
        />
      </SkCard>
      {node}
    </div>
  );
}

/* 汇报模板 ---------------------------------------------------------------- */

type TemplateGroup = { id: number; name: string; templates: string[] };

export function ReportTemplatePage() {
  const [groups, setGroups] = useState<TemplateGroup[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [groupOpen, setGroupOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [templateName, setTemplateName] = useState("");
  const { show, node } = useSkMessage();
  const current = groups.find((group) => group.id === selected);

  return (
    <div className="of-page of-template-page">
      <aside className="of-template-side">
        <h2>汇报模板</h2>
        {groups.length === 0 ? (
          <SkEmpty text="暂无数据" />
        ) : (
          <div className="of-template-groups">
            {groups.map((group) => (
              <button
                key={group.id}
                type="button"
                className={`of-template-group${selected === group.id ? " is-active" : ""}`}
                onClick={() => setSelected(group.id)}
              >
                {group.name}
                <span>{group.templates.length}</span>
              </button>
            ))}
          </div>
        )}
      </aside>
      <section className="of-template-main">
        <div className="of-toolbar">
          {current ? <div className="of-title">{current.name}</div> : <span />}
          <div className="of-toolbar-actions">
            <SkButton onClick={() => setGroupOpen(true)}>新建分组</SkButton>
            <SkButton onClick={() => setSortOpen(true)}>分组排序</SkButton>
            <SkButton variant="primary" onClick={() => setTemplateOpen(true)}>
              + 创建模板
            </SkButton>
          </div>
        </div>
        {current && current.templates.length ? (
          <div className="of-template-list">
            {current.templates.map((template) => (
              <div key={template} className="of-template-card">
                <span className="of-template-icon">▤</span>
                <strong>{template}</strong>
              </div>
            ))}
          </div>
        ) : (
          <SkEmpty text="暂无数据" />
        )}
      </section>

      <SkModal
        open={groupOpen}
        title="新建分组"
        width={480}
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
                const next = { id: Date.now(), name: groupName, templates: [] };
                setGroups((currentGroups) => [...currentGroups, next]);
                setSelected(next.id);
                setGroupOpen(false);
                show("新建成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <OfficeField label="分组名称" required>
          <SkInput value={groupName} onChange={setGroupName} placeholder="请输入分组名称" />
        </OfficeField>
      </SkModal>

      <SkModal
        open={sortOpen}
        title="分组排序"
        width={480}
        onClose={() => setSortOpen(false)}
        footer={<SkButton variant="primary" onClick={() => setSortOpen(false)}>完 成</SkButton>}
      >
        {groups.length ? (
          <div className="of-sort-list">
            {groups.map((group, index) => (
              <div key={group.id} className="of-sort-row">
                <span>{index + 1}</span>
                <strong>{group.name}</strong>
                <button type="button" onClick={() => show("已上移")}>↑</button>
                <button type="button" onClick={() => show("已下移")}>↓</button>
              </div>
            ))}
          </div>
        ) : (
          <SkEmpty text="暂无分组" />
        )}
      </SkModal>

      <SkModal
        open={templateOpen}
        title="创建模板"
        width={520}
        onClose={() => setTemplateOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setTemplateOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!templateName.trim()) {
                  show("请输入模板名称");
                  return;
                }
                const targetId = selected ?? groups[0]?.id;
                if (!targetId) {
                  show("请先新建分组");
                  return;
                }
                setGroups((currentGroups) =>
                  currentGroups.map((group) =>
                    group.id === targetId
                      ? { ...group, templates: [...group.templates, templateName] }
                      : group,
                  ),
                );
                setSelected(targetId);
                setTemplateOpen(false);
                setTemplateName("");
                show("创建成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <OfficeField label="模板名称" required>
          <SkInput value={templateName} onChange={setTemplateName} placeholder="请输入模板名称" />
        </OfficeField>
      </SkModal>
      {node}
    </div>
  );
}

/* 汇报报表 ---------------------------------------------------------------- */

export function ReportStatementsPage() {
  const [template, setTemplate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const { show, node } = useSkMessage();

  return (
    <div className="of-page">
      <SkCard className="of-card">
        <div className="of-search-row">
          <OfficeField label="汇报模板">
            <SkSelect placeholder="请选择" value={template} options={["日报", "周报", "月报"]} onChange={setTemplate} />
          </OfficeField>
          <OfficeField label="汇报时间">
            <div className="of-date-pair">
              <SkInput type="date" value={start} onChange={setStart} />
              <span>→</span>
              <SkInput type="date" value={end} onChange={setEnd} />
            </div>
          </OfficeField>
          <OfficeSearchButtonGroup
            onSearch={() => show("查询成功")}
            onReset={() => {
              setTemplate("");
              setStart("");
              setEnd("");
            }}
          />
        </div>
      </SkCard>
      <SkCard className="of-card">
        <div className="of-toolbar">
          <div className="of-title">汇报列表</div>
          <SkButton
            variant="outline"
            onClick={() => {
              exportCsv("汇报报表.csv", ["汇报模板", "提交总人数", "汇报提交总数", "已阅数量", "待阅数量", "修改汇报数量"], []);
              show("导出成功");
            }}
          >
            导出汇报
          </SkButton>
        </div>
        <SkTable
          columns={[
            { key: "template", title: "汇报模板" },
            { key: "people", title: "提交总人数" },
            { key: "total", title: "汇报提交总数" },
            { key: "read", title: "已阅数量" },
            { key: "unread", title: "待阅数量" },
            { key: "modified", title: "修改汇报数量" },
            { key: "op", title: "操作" },
          ]}
          emptyText={template || start || end ? "未找到匹配的汇报" : "暂无数据"}
          rows={[]}
        />
      </SkCard>
      {node}
    </div>
  );
}
