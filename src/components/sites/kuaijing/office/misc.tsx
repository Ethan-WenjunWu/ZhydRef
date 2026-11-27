"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

import {
  SkButton,
  SkCheckbox,
  SkConfirm,
  SkDrawer,
  SkEmpty,
  SkInput,
  SkModal,
  SkSelect,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField, OfficeSearchButtonGroup } from "./common";

/* 企业公告 ---------------------------------------------------------------- */

type Announcement = {
  id: number;
  title: string;
  category: string;
  time: string;
};

export function OfficeNoticePage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState("全部");
  const [list, setList] = useState<Announcement[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categorySort, setCategorySort] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const [admins, setAdmins] = useState<string[]>(["王"]);
  const [editorOpen, setEditorOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishCategory, setPublishCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState("");
  const { show, node } = useSkMessage();

  const filtered = list.filter((item) => {
    if (selected !== "全部" && item.category !== selected) return false;
    if (keyword && !item.title.includes(keyword)) return false;
    if (date && item.time.slice(0, 10) !== date) return false;
    return true;
  });

  return (
    <div className="of-page of-notice-page">
      <aside className="of-side-panel">
        <h2>公告分类</h2>
        <button
          type="button"
          className={`of-side-item${selected === "全部" ? " is-active" : ""}`}
          onClick={() => setSelected("全部")}
        >
          全部
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`of-side-item${selected === category ? " is-active" : ""}`}
            onClick={() => setSelected(category)}
          >
            {category}
          </button>
        ))}
        <div className="of-side-bottom">
          <SkButton variant="outline" className="of-full-btn" onClick={() => setCategoryOpen(true)}>
            + 新增分类
          </SkButton>
        </div>
      </aside>

      <section className="of-main-panel">
        <div className="of-toolbar">
          <div className="of-title">公告</div>
          <div className="of-toolbar-actions">
            <SkButton variant="outline" onClick={() => setAdminOpen(true)}>公告管理员设置</SkButton>
            <SkButton variant="primary" onClick={() => setEditorOpen(true)}>新公告</SkButton>
          </div>
        </div>
        <div className="of-search-row of-notice-search">
          <OfficeField label="公告标题">
            <SkInput placeholder="请输入" value={keyword} onChange={setKeyword} />
          </OfficeField>
          <OfficeField label="发布时间">
            <SkInput type="date" value={date} onChange={setDate} />
          </OfficeField>
          <OfficeSearchButtonGroup
            onSearch={() => show("查询成功")}
            onReset={() => {
              setKeyword("");
              setDate("");
            }}
          />
        </div>
        {filtered.length ? (
          <div className="of-announcement-list">
            {filtered.map((item) => (
              <div key={item.id} className="of-announcement-row">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.category} · {item.time}</p>
                </div>
                <SkButton
                  size="sm"
                  onClick={() => {
                    setList((current) => current.filter((row) => row.id !== item.id));
                    show("删除成功");
                  }}
                >
                  删除
                </SkButton>
              </div>
            ))}
          </div>
        ) : (
          <div className="of-empty-fill">
            <SkEmpty text="暂无数据" />
          </div>
        )}
      </section>

      <SkModal
        open={categoryOpen}
        title="新增分类"
        width={480}
        onClose={() => setCategoryOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setCategoryOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!categoryName.trim()) {
                  show("请输入分类名称");
                  return;
                }
                setCategories((current) => [...current, categoryName]);
                setCategoryOpen(false);
                setCategoryName("");
                setCategorySort("");
                show("新增成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <div className="of-modal-form">
          <OfficeField label="分类名称" required>
            <SkInput value={categoryName} onChange={setCategoryName} />
          </OfficeField>
          <OfficeField label="排序">
            <SkInput value={categorySort} onChange={setCategorySort} placeholder="数字越大越靠前" />
          </OfficeField>
        </div>
      </SkModal>

      <SkModal
        open={adminOpen}
        title="公告管理员设置"
        width={520}
        onClose={() => setAdminOpen(false)}
        footer={<SkButton variant="primary" onClick={() => { setAdminOpen(false); show("保存成功"); }}>保 存</SkButton>}
      >
        <div className="of-check-list">
          {["王", "AAA", "李保洁", "张保洁", "郑维修长", "常安保长"].map((person) => (
            <SkCheckbox
              key={person}
              label={person}
              checked={admins.includes(person)}
              onChange={(checked) =>
                setAdmins((current) =>
                  checked ? [...current, person] : current.filter((item) => item !== person),
                )
              }
            />
          ))}
        </div>
      </SkModal>

      <SkModal
        open={editorOpen}
        title="新公告"
        width={720}
        onClose={() => setEditorOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setEditorOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!title.trim()) {
                  show("请输入公告标题");
                  return;
                }
                setList((current) => [
                  ...current,
                  {
                    id: Date.now(),
                    title,
                    category: publishCategory || "全部",
                    time: "2026-11-27 21:55:00",
                  },
                ]);
                setEditorOpen(false);
                setTitle("");
                setContent("");
                setPublishCategory("");
                show("发布成功");
              }}
            >
              发 布
            </SkButton>
          </>
        }
      >
        <div className="of-modal-form">
          <OfficeField label="公告标题" required>
            <SkInput value={title} onChange={setTitle} placeholder="请输入公告标题" />
          </OfficeField>
          <OfficeField label="公告分类">
            <SkSelect
              placeholder="请选择分类"
              value={publishCategory}
              options={categories}
              onChange={setPublishCategory}
            />
          </OfficeField>
          <OfficeField label="公告内容">
            <textarea
              className="sk-textarea of-notice-content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="请输入公告内容"
            />
          </OfficeField>
        </div>
      </SkModal>
      {node}
    </div>
  );
}

/* 知识库 ------------------------------------------------------------------ */

type WikiCard = {
  id: number;
  name: string;
  category: string;
  intro: string;
  reads: number;
  updated: string;
};

export function OfficeWikiPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState("所有");
  const [cards, setCards] = useState<WikiCard[]>([
    {
      id: 1,
      name: "我的文档库",
      category: "所有",
      intro: "暂无描述信息",
      reads: 0,
      updated: "2026/11/27 21:32",
    },
  ]);
  const [keyword, setKeyword] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [category, setCategory] = useState("");
  const [project, setProject] = useState("");
  const [removeId, setRemoveId] = useState<number | null>(null);
  const { show, node } = useSkMessage();

  const filtered = cards.filter((card) => {
    if (selected === "我收藏的") return card.category === "我收藏的";
    if (selected !== "所有" && card.category !== selected) return false;
    if (keyword && !card.name.includes(keyword)) return false;
    return true;
  });

  return (
    <div className="of-page of-wiki-page">
      <aside className="of-side-panel">
        <h2>知识库</h2>
        <div className="of-side-label">知识库分类</div>
        <button
          type="button"
          className={`of-side-item${selected === "所有" ? " is-active" : ""}`}
          onClick={() => setSelected("所有")}
        >
          所有
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={`of-side-item${selected === item ? " is-active" : ""}`}
            onClick={() => setSelected(item)}
          >
            {item}
          </button>
        ))}
        <div className="of-side-label">收藏</div>
        <button
          type="button"
          className={`of-side-item${selected === "我收藏的" ? " is-active" : ""}`}
          onClick={() => setSelected("我收藏的")}
        >
          我收藏的
        </button>
        <div className="of-side-bottom">
          <SkButton variant="outline" className="of-full-btn" onClick={() => setCategoryOpen(true)}>
            新建分类
          </SkButton>
        </div>
      </aside>

      <section className="of-wiki-main">
        <div className="of-wiki-toolbar">
          <div className="of-wiki-search">
            <SkInput placeholder="在知识库中搜索" value={keyword} onChange={setKeyword} />
            <span>⌕</span>
          </div>
          <SkButton variant="primary" onClick={() => setCreateOpen(true)}>新建知识库</SkButton>
        </div>
        {filtered.length ? (
          <div className="of-wiki-grid">
            {filtered.map((card) => (
              <article key={card.id} className="of-wiki-card">
                <div className="of-wiki-card-head">
                  <span className="of-wiki-book">
                    <img src="/sites/kuaijing/office/wiki/icon0.png" alt="" />
                  </span>
                  <strong>{card.name}</strong>
                  <span className="of-wiki-more">···</span>
                </div>
                <p>{card.intro}</p>
                <div className="of-wiki-meta">
                  <span>阅读量：{card.reads}</span>
                  <span>更新时间：{card.updated}</span>
                </div>
                <button type="button" className="of-wiki-delete" onClick={() => setRemoveId(card.id)}>
                  删除
                </button>
              </article>
            ))}
          </div>
        ) : (
          <SkEmpty text="暂无知识库" />
        )}
      </section>

      <SkModal
        open={categoryOpen}
        title="新建知识库分类"
        width={480}
        onClose={() => setCategoryOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setCategoryOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!categoryName.trim()) {
                  show("请输入分类名称");
                  return;
                }
                setCategories((current) => [...current, categoryName]);
                setCategoryOpen(false);
                setCategoryName("");
                show("新建成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <OfficeField label="分类名称" required>
          <SkInput value={categoryName} onChange={setCategoryName} placeholder="请输入分类名称" />
        </OfficeField>
      </SkModal>

      <SkDrawer
        open={createOpen}
        title="新建知识库"
        width={500}
        onClose={() => setCreateOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setCreateOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim()) {
                  show("请输入知识库名称");
                  return;
                }
                setCards((current) => [
                  ...current,
                  {
                    id: Date.now(),
                    name,
                    category: category || "所有",
                    intro: intro || "暂无描述信息",
                    reads: 0,
                    updated: "2026/11/27 21:55",
                  },
                ]);
                setCreateOpen(false);
                setName("");
                setIntro("");
                setCategory("");
                setProject("");
                show("创建成功");
              }}
            >
              确 认
            </SkButton>
          </>
        }
      >
        <div className="of-modal-form">
          <OfficeField label="知识库名称" required>
            <SkInput value={name} onChange={setName} placeholder="请输入知识库名称" />
          </OfficeField>
          <OfficeField label="图标">
            <label className="of-upload">
              <span>+</span>上传图标
              <input type="file" hidden onChange={() => show("图标已选择")} />
            </label>
          </OfficeField>
          <OfficeField label="所属分类">
            <SkSelect
              placeholder="请选择所属分类"
              value={category}
              options={categories}
              onChange={setCategory}
            />
          </OfficeField>
          <OfficeField label="所属项目">
            <SkSelect
              placeholder="请选择所属项目"
              value={project}
              options={["智慧园区", "默认项目"]}
              onChange={setProject}
            />
          </OfficeField>
          <OfficeField label="简介">
            <textarea
              className="sk-textarea"
              value={intro}
              onChange={(event) => setIntro(event.target.value)}
              placeholder="请输入简介"
            />
          </OfficeField>
        </div>
      </SkDrawer>

      <SkConfirm
        open={removeId !== null}
        content="确定删除该知识库吗？"
        danger
        onCancel={() => setRemoveId(null)}
        onOk={() => {
          setCards((current) => current.filter((card) => card.id !== removeId));
          setRemoveId(null);
          show("删除成功");
        }}
      />
      {node}
    </div>
  );
}

/* 智能表格 ---------------------------------------------------------------- */

export function OfficeSmartTablePage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [recycleOpen, setRecycleOpen] = useState(false);
  const { show, node } = useSkMessage();

  return (
    <div className="of-page of-smart-page">
      <div className="of-smart-hero">
        <img
          src="/sites/kuaijing/office/smart-empty-guide.png"
          alt=""
          className="of-smart-image"
        />
        <h1>从创建分类开始</h1>
        <p>分类用来收纳数据表、仪表盘和页面。先新建一个分类，再按下面的步骤开始使用。</p>
        <SkButton variant="primary" onClick={() => setOpen(true)}>
          <span className="of-folder-icon">▣</span>
          新增分类
        </SkButton>
      </div>
      <div className="of-guide-divider"><span>使用指南</span></div>
      <div className="of-guide-steps">
        {[
          ["1", "创建分类", "按业务主题分组"],
          ["2", "添加内容", "数据表、仪表盘或页面"],
          ["3", "配置使用", "录入数据、搭建看板或发布页面"],
        ].map(([index, title, desc], position) => (
          <div key={index} className={`of-guide-step${position === 0 ? " is-active" : ""}`}>
            <span className="of-guide-num">{index}</span>
            <strong>{title}</strong>
            <p>{desc}</p>
          </div>
        ))}
      </div>
      <button type="button" className="of-recycle" onClick={() => setRecycleOpen(true)}>
        🗑 回收站
      </button>

      <SkModal
        open={open}
        title="新增"
        width={480}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim()) {
                  show("请输入分类名称");
                  return;
                }
                setOpen(false);
                setName("");
                show("分类创建成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <OfficeField label="分类名称" required>
          <SkInput value={name} onChange={setName} placeholder="请输入" />
        </OfficeField>
      </SkModal>

      <SkModal
        open={recycleOpen}
        title="回收站"
        width={560}
        onClose={() => setRecycleOpen(false)}
        footer={<SkButton onClick={() => setRecycleOpen(false)}>关 闭</SkButton>}
      >
        <SkEmpty text="回收站为空" />
      </SkModal>
      {node}
    </div>
  );
}
