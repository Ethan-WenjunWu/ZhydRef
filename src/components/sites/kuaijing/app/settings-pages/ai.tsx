"use client";

import { useState } from "react";

import { ACCOUNT } from "../data";
import {
  SkActionLink,
  SkButton,
  SkCard,
  SkCheckbox,
  SkConfirm,
  SkInput,
  SkModal,
  SkPagination,
  SkSearchButtonGroup,
  SkSelect,
  SkSwitch,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../SettingsUI";
import {
  Field,
  FormRow,
  InnerMenu,
  SearchActions,
  UploadTile,
} from "./common";

/* 10 AI 基础设置 ---------------------------------------------------------- */

const SKILLS = ["天气", "打卡", "补卡", "请假", "日程", "任务", "审批", "汇报", "工单"];
const AGENT_OPTIONS = ["财务数据助手", "合同数据助手", "招商数据助手", "IOT数据助手"];

export function AiBasicPage() {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [voice, setVoice] = useState("甜美小源");
  const [enabled, setEnabled] = useState(true);
  const [tools, setTools] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [agents, setAgents] = useState<string[]>([]);
  const { show, node } = useSkMessage();

  const toggle = (
    value: string,
    list: string[],
    setList: (next: string[]) => void,
  ) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  return (
    <div className="sk-page sk-ai-page">
      <form
        className="sk-ai-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!name.trim()) {
            show("请输入AI名称");
            return;
          }
          show("保存成功");
        }}
      >
        <Field label={<span><span className="sk-required-mark">*</span>AI名称</span>}>
          <SkInput placeholder="请输入" value={name} onChange={setName} />
        </Field>
        <Field label={<span><span className="sk-required-mark">*</span>AI Logo</span>}>
          <UploadTile square label="" value={logo} onChange={setLogo} />
        </Field>
        <Field label="对话音色">
          <SkSelect
            value={voice}
            options={["甜美小源", "亲切小源", "沉稳男声"]}
            onChange={setVoice}
          />
        </Field>
        <Field label="是否启用">
          <SkSwitch checked={enabled} onChange={setEnabled} />
        </Field>
        <Field label="工具">
          <div className="sk-check-grid">
            {["智能体", "知识问答"].map((tool) => (
              <SkCheckbox
                key={tool}
                label={tool}
                checked={tools.includes(tool)}
                onChange={() => toggle(tool, tools, setTools)}
              />
            ))}
          </div>
        </Field>
        <Field label="技能池 ⓘ">
          <div className="sk-check-grid is-five">
            {SKILLS.map((skill) => (
              <SkCheckbox
                key={skill}
                label={skill}
                checked={skills.includes(skill)}
                onChange={() => toggle(skill, skills, setSkills)}
              />
            ))}
          </div>
        </Field>
        <Field label="智能体">
          <div className="sk-check-grid">
            {AGENT_OPTIONS.map((agent) => (
              <SkCheckbox
                key={agent}
                label={agent}
                checked={agents.includes(agent)}
                onChange={() => toggle(agent, agents, setAgents)}
              />
            ))}
          </div>
        </Field>
        <div className="sk-ai-save">
          <SkButton
            variant="primary"
            onClick={() => {
              if (!name.trim()) {
                show("请输入AI名称");
                return;
              }
              show("保存成功");
            }}
          >
            保 存
          </SkButton>
        </div>
      </form>
      {node}
    </div>
  );
}

/* 11 AI 模型参数 ---------------------------------------------------------- */

export function AiModelPage() {
  const [active, setActive] = useState(0);
  const [platform, setPlatform] = useState("");
  const [model, setModel] = useState("");
  const [baseUrl, setBaseUrl] = useState("https://ark.cn-beijing.volces.com");
  const [appId, setAppId] = useState("");
  const [token, setToken] = useState("");
  const [kbAddress, setKbAddress] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [vectorPlatform, setVectorPlatform] = useState("");
  const [vectorModel, setVectorModel] = useState("");
  const [rerankPlatform, setRerankPlatform] = useState("");
  const [rerankModel, setRerankModel] = useState("");
  const { show, node } = useSkMessage();

  const saveModel = () => {
    if (active === 0) {
      if (!platform || !model) {
        show("请选择平台和模型");
        return;
      }
    } else if (!kbAddress.trim() || !apiKey.trim()) {
      show("请填写地址和apiKey");
      return;
    }
    show("保存成功");
  };

  return (
    <div className="sk-page sk-page-inner">
      <div className="sk-inner-layout">
        <InnerMenu items={["基础配置", "知识库"]} active={active} onChange={setActive} />
        <div className="sk-inner-content">
          {active === 0 ? (
            <form
              className="sk-form sk-form-centered"
              onSubmit={(event) => {
                event.preventDefault();
                if (!platform || !model) {
                  show("请选择平台和模型");
                  return;
                }
                show("保存成功");
              }}
            >
              <FormRow label="平台" required>
                <SkSelect
                  placeholder="请选择"
                  value={platform}
                  options={["火山引擎", "阿里云百炼", "百度千帆"]}
                  onChange={setPlatform}
                />
              </FormRow>
              <FormRow label="模型" required>
                <SkSelect
                  placeholder="请选择"
                  value={model}
                  options={["豆包大模型", "DeepSeek", "通义千问"]}
                  onChange={setModel}
                />
              </FormRow>
              <FormRow label="豆包大模型Base URL" required>
                <SkInput value={baseUrl} onChange={setBaseUrl} />
                <div className="sk-form-hint">一般不用修改</div>
              </FormRow>
              <FormRow label="豆包语音Appid" required>
                <SkInput placeholder="请输入" value={appId} onChange={setAppId} />
                <div className="sk-form-hint">
                  火山引擎-&gt;豆包语音-&gt;语音合成-&gt;APP ID
                </div>
              </FormRow>
              <FormRow label="豆包语音Access Token" required>
                <SkInput placeholder="请输入" value={token} onChange={setToken} />
                <div className="sk-form-hint">
                  火山引擎-&gt;豆包语音-&gt;语音合成-&gt;Access Token
                </div>
              </FormRow>
              <div className="sk-form-actions">
                <SkButton
                  variant="primary"
                  onClick={saveModel}
                >
                  保 存
                </SkButton>
              </div>
            </form>
          ) : (
            <form
              className="sk-form sk-form-centered"
              onSubmit={(event) => {
                event.preventDefault();
                if (!kbAddress.trim() || !apiKey.trim()) {
                  show("请填写地址和apiKey");
                  return;
                }
                show("保存成功");
              }}
            >
              <FormRow label="地址" required>
                <SkInput placeholder="请输入" value={kbAddress} onChange={setKbAddress} />
              </FormRow>
              <FormRow label="apiKey" required>
                <SkInput placeholder="请输入" value={apiKey} onChange={setApiKey} />
              </FormRow>
              <FormRow label="向量模型平台">
                <SkSelect
                  placeholder="请选择平台"
                  value={vectorPlatform}
                  options={["火山引擎", "阿里云百炼", "百度千帆"]}
                  onChange={setVectorPlatform}
                />
              </FormRow>
              <FormRow label="向量模型">
                <SkSelect
                  placeholder="请选择模型"
                  value={vectorModel}
                  options={["doubao-embedding", "text-embedding-v3"]}
                  onChange={setVectorModel}
                />
              </FormRow>
              <FormRow label="Rerank模型平台">
                <SkSelect
                  placeholder="请选择平台"
                  value={rerankPlatform}
                  options={["火山引擎", "阿里云百炼", "百度千帆"]}
                  onChange={setRerankPlatform}
                />
              </FormRow>
              <FormRow label="Rerank模型">
                <SkSelect
                  placeholder="请选择模型"
                  value={rerankModel}
                  options={["doubao-rerank", "gte-rerank"]}
                  onChange={setRerankModel}
                />
              </FormRow>
              <div className="sk-form-actions">
                <SkButton
                  variant="primary"
                  onClick={saveModel}
                >
                  保 存
                </SkButton>
              </div>
            </form>
          )}
        </div>
      </div>
      {node}
    </div>
  );
}

/* 12 AI 问题库 ------------------------------------------------------------ */

const QUESTION_SOURCE = [
  ["{城市名称}老字号美食店", "生活", "2026/11/27 13:50"],
  ["{城市名称}必游景点", "生活", "2026/11/27 13:50"],
  ["办公室咋做健身", "生活", "2026/11/27 13:50"],
  ["{城市名称}未来一周天气", "生活", "2026/11/27 13:50"],
  ["户外运动注意事项", "生活", "2026/11/27 13:50"],
  ["养生小技巧", "生活", "2026/11/27 13:50"],
  ["{城市名称}好玩的公园", "生活", "2026/11/27 13:50"],
  ["{城市名称}今日天气", "生活", "2026/11/27 13:50"],
  ["不同班次考勤设置", "办公", "2026/11/27 13:50"],
  ["角色权限细分", "办公", "2026/11/27 13:50"],
];

type Question = {
  id: number;
  question: string;
  category: string;
  enabled: boolean;
  creator: string;
  time: string;
};

type CategoryForm = {
  name: string;
  tagline: string;
  enabled: boolean;
  sort: string;
};

function CategoryModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: CategoryForm) => void;
}) {
  const [form, setForm] = useState<CategoryForm>({
    name: "",
    tagline: "",
    enabled: true,
    sort: "",
  });
  const { show, node } = useSkMessage();

  return (
    <>
      <SkModal
        open={open}
        title="新增分类"
        width={520}
        onClose={onClose}
        footer={
          <>
            <SkButton onClick={onClose}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!form.name.trim()) {
                  show("请输入分类名称");
                  return;
                }
                onSubmit(form);
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <div className="sk-modal-form">
          <Field label="分类名称" required>
            <SkInput
              placeholder="请输入"
              value={form.name}
              onChange={(value) => setForm((current) => ({ ...current, name: value }))}
            />
          </Field>
          <Field label="分类标语">
            <SkInput
              placeholder="请输入"
              value={form.tagline}
              onChange={(value) => setForm((current) => ({ ...current, tagline: value }))}
            />
          </Field>
          <Field label="状态">
            <SkSwitch
              checked={form.enabled}
              onChange={(checked) => setForm((current) => ({ ...current, enabled: checked }))}
            />
          </Field>
          <Field label="排序">
            <SkInput
              placeholder="请输入"
              value={form.sort}
              onChange={(value) => setForm((current) => ({ ...current, sort: value }))}
            />
          </Field>
        </div>
      </SkModal>
      {node}
    </>
  );
}

export function AiQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>(
    QUESTION_SOURCE.map(([question, category, time], index) => ({
      id: index + 1,
      question,
      category,
      enabled: true,
      creator: ACCOUNT.userName,
      time,
    })),
  );
  const [categories, setCategories] = useState<string[]>(["办公", "生活"]);
  const [active, setActive] = useState(0);
  const [draft, setDraft] = useState({ question: "", status: "" });
  const [filters, setFilters] = useState({ question: "", status: "" });
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [editing, setEditing] = useState<Question | null>(null);
  const [removeId, setRemoveId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { show, node } = useSkMessage();

  const tabs = ["全部", ...categories];
  const category = tabs[active] ?? "全部";
  const filtered = questions.filter((item) => {
    if (category !== "全部" && item.category !== category) return false;
    if (filters.question && !item.question.includes(filters.question)) return false;
    if (filters.status && item.enabled !== (filters.status === "开启")) return false;
    return true;
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const rows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="sk-page">
      <SkCard className="sk-fill">
        <div className="sk-card-tabs-row">
          <SkTabs
            items={tabs}
            active={active}
            onChange={(index) => {
              setActive(index);
              setPage(1);
            }}
          />
          <SkButton variant="outline" onClick={() => setCategoryOpen(true)}>
            <span className="sk-plus">+</span>新增分类
          </SkButton>
        </div>
        <div className="sk-search-card sk-search-inset">
          <div className="sk-search-top">
            <span>未选择筛选字段</span>
            <SearchActions
              onClear={() => {
                setDraft({ question: "", status: "" });
                setFilters({ question: "", status: "" });
              }}
            />
          </div>
          <div className="sk-search-row sk-search-row-two">
            <Field label="问题">
              <SkInput
                placeholder="请输入问题"
                value={draft.question}
                onChange={(value) => setDraft((current) => ({ ...current, question: value }))}
                onEnter={() => setFilters(draft)}
              />
            </Field>
            <Field label="状态">
              <SkSelect
                placeholder="请选择状态"
                value={draft.status}
                options={["开启", "关闭"]}
                onChange={(value) => setDraft((current) => ({ ...current, status: value }))}
              />
            </Field>
            <SkSearchButtonGroup
              onSearch={() => {
                setFilters(draft);
                setPage(1);
              }}
              onReset={() => {
                setDraft({ question: "", status: "" });
                setFilters({ question: "", status: "" });
                setPage(1);
              }}
            />
          </div>
        </div>
        <div className="sk-toolbar sk-list-toolbar">
          <div className="sk-title">问题列表</div>
          <SkButton onClick={() => show("刷新成功")}>↻ 刷新</SkButton>
        </div>
        <SkTable
          columns={[
            { key: "question", title: "问题", width: "32%" },
            { key: "category", title: "所属分类" },
            { key: "status", title: "状态" },
            { key: "hot", title: "突出显示" },
            { key: "creator", title: "创建人员" },
            { key: "time", title: "创建时间" },
            { key: "op", title: "操作" },
          ]}
          rows={rows.map((item) => [
            item.question,
            item.category,
            <SkSwitch
              key="s"
              checked={item.enabled}
              onChange={(checked) =>
                setQuestions((current) =>
                  current.map((question) =>
                    question.id === item.id ? { ...question, enabled: checked } : question,
                  ),
                )
              }
            />,
            "否",
            item.creator,
            item.time,
            <span key="op">
              <SkActionLink onClick={() => setEditing({ ...item })}>编辑</SkActionLink>
              <SkActionLink danger onClick={() => setRemoveId(item.id)}>
                删除
              </SkActionLink>
            </span>,
          ])}
        />
        <SkPagination
          total={filtered.length}
          page={currentPage}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      </SkCard>

      <CategoryModal
        key={categoryOpen ? "open" : "closed"}
        open={categoryOpen}
        onClose={() => setCategoryOpen(false)}
        onSubmit={(form) => {
          setCategories((current) => [...current, form.name]);
          setCategoryOpen(false);
          setActive(categories.length + 1);
          show("新增成功");
        }}
      />

      <SkModal
        open={editing !== null}
        title="编辑问题"
        width={560}
        onClose={() => setEditing(null)}
        footer={
          <>
            <SkButton onClick={() => setEditing(null)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!editing || !editing.question.trim()) {
                  show("请输入问题");
                  return;
                }
                setQuestions((current) =>
                  current.map((item) => (item.id === editing.id ? editing : item)),
                );
                setEditing(null);
                show("保存成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        {editing ? (
          <div className="sk-modal-form">
            <Field label="问题" required>
              <SkInput
                value={editing.question}
                onChange={(value) =>
                  setEditing((current) => (current ? { ...current, question: value } : current))
                }
              />
            </Field>
            <Field label="所属分类">
              <SkSelect
                value={editing.category}
                options={categories}
                onChange={(value) =>
                  setEditing((current) => (current ? { ...current, category: value } : current))
                }
              />
            </Field>
            <Field label="状态">
              <SkSwitch
                checked={editing.enabled}
                onChange={(checked) =>
                  setEditing((current) => (current ? { ...current, enabled: checked } : current))
                }
              />
            </Field>
          </div>
        ) : null}
      </SkModal>

      <SkConfirm
        open={removeId !== null}
        content="确定删除该问题吗？"
        danger
        onCancel={() => setRemoveId(null)}
        onOk={() => {
          setQuestions((current) => current.filter((item) => item.id !== removeId));
          setRemoveId(null);
          show("删除成功");
        }}
      />
      {node}
    </div>
  );
}

/* 13 AI 智能体 ------------------------------------------------------------ */

export function AiAgentsPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [draft, setDraft] = useState({ name: "", isPublic: "", status: "", creator: "" });
  const [filters, setFilters] = useState({ name: "", isPublic: "", status: "", creator: "" });
  const [categoryOpen, setCategoryOpen] = useState(false);
  const { show, node } = useSkMessage();
  const tabs = ["全部", ...categories];

  return (
    <div className="sk-page">
      <SkCard className="sk-fill">
        <div className="sk-card-tabs-row">
          <SkTabs
            items={tabs}
            active={active}
            onChange={(index) => setActive(index)}
          />
          <SkButton variant="outline" onClick={() => setCategoryOpen(true)}>
            <span className="sk-plus">+</span>新增分类
          </SkButton>
        </div>
        <div className="sk-search-card sk-search-inset">
          <div className="sk-search-top">
            <span>未选择筛选字段</span>
            <SearchActions
              onClear={() => {
                setDraft({ name: "", isPublic: "", status: "", creator: "" });
                setFilters({ name: "", isPublic: "", status: "", creator: "" });
              }}
            />
          </div>
          <div className="sk-search-row">
            <Field label="智能体名称">
              <SkInput
                placeholder="请输入智能体名称"
                value={draft.name}
                onChange={(value) => setDraft((current) => ({ ...current, name: value }))}
                onEnter={() => setFilters(draft)}
              />
            </Field>
            <Field label="是否公开">
              <SkSelect
                placeholder="请选择是否公开"
                value={draft.isPublic}
                options={["是", "否"]}
                onChange={(value) => setDraft((current) => ({ ...current, isPublic: value }))}
              />
            </Field>
            <Field label="状态">
              <SkSelect
                placeholder="请选择状态"
                value={draft.status}
                options={["开启", "关闭"]}
                onChange={(value) => setDraft((current) => ({ ...current, status: value }))}
              />
            </Field>
            <Field label="创建人员">
              <SkSelect
                placeholder="请选择"
                value={draft.creator}
                options={[ACCOUNT.userName, "AAA"]}
                onChange={(value) => setDraft((current) => ({ ...current, creator: value }))}
              />
            </Field>
            <SkSearchButtonGroup
              onSearch={() => setFilters(draft)}
              onReset={() => {
                setDraft({ name: "", isPublic: "", status: "", creator: "" });
                setFilters({ name: "", isPublic: "", status: "", creator: "" });
              }}
            />
          </div>
        </div>
        <div className="sk-toolbar sk-list-toolbar">
          <div className="sk-title">智能体列表</div>
          <SkButton onClick={() => show("刷新成功")}>↻ 刷新</SkButton>
        </div>
        <SkTable
          columns={[
            { key: "name", title: "智能体名称" },
            { key: "image", title: "智能体图片" },
            { key: "category", title: "所属分类" },
            { key: "voice", title: "对话音色" },
            { key: "public", title: "是否公开" },
            { key: "status", title: "状态" },
            { key: "creator", title: "创建人员" },
            { key: "time", title: "创建时间" },
            { key: "op", title: "操作" },
          ]}
          emptyText={
            filters.name || filters.isPublic || filters.status || filters.creator
              ? "未找到匹配的智能体"
              : "暂无数据"
          }
          rows={[]}
        />
      </SkCard>

      <CategoryModal
        key={categoryOpen ? "open" : "closed"}
        open={categoryOpen}
        onClose={() => setCategoryOpen(false)}
        onSubmit={(form) => {
          setCategories((current) => [...current, form.name]);
          setCategoryOpen(false);
          setActive(categories.length + 1);
          show("新增成功");
        }}
      />
      {node}
    </div>
  );
}
