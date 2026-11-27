"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

import { ACCOUNT } from "../data";
import {
  SkActionLink,
  SkButton,
  SkCard,
  SkConfirm,
  SkDrawer,
  SkEmpty,
  SkInput,
  SkModal,
  SkSelect,
  SkTable,
  useSkMessage,
} from "../SettingsUI";
import { Field, NOW, UploadTile } from "./common";

/* 14 微信服务号 ----------------------------------------------------------- */

type WechatServiceRow = {
  id: number;
  appId: string;
  name: string;
  business: string;
  project: string;
};

const SERVICE_TABS = ["服务号绑定", "模板消息", "关键词回复", "自定义菜单", "渠道二维码"];

export function WechatServicePage() {
  const [active, setActive] = useState(0);
  const [rows, setRows] = useState<WechatServiceRow[]>([]);
  const [bindOpen, setBindOpen] = useState(false);
  const [removeId, setRemoveId] = useState<number | null>(null);
  const { show, node } = useSkMessage();

  return (
    <div className="sk-page sk-integration-page">
      <div className="sk-integration-layout">
        <SkCard className="sk-integration-menu">
          <div className="sk-integration-brand">
            <span className="sk-brand-icon is-green">✆</span>
            <span>微信服务号</span>
          </div>
          <div className="sk-inner-menu sk-integration-inner">
            {SERVICE_TABS.map((item, index) => (
              <button
                key={item}
                type="button"
                className={`sk-inner-item${active === index ? " is-active" : ""}`}
                onClick={() => setActive(index)}
              >
                {item}
              </button>
            ))}
          </div>
        </SkCard>
        <SkCard className="sk-integration-main">
          {active === 0 ? (
            <>
              <div className="sk-toolbar">
                <div className="sk-title">服务号绑定</div>
                <SkButton variant="primary" onClick={() => setBindOpen(true)}>
                  绑定服务号
                </SkButton>
              </div>
              <SkTable
                columns={[
                  { key: "appid", title: "App id" },
                  { key: "name", title: "服务号名称" },
                  { key: "biz", title: "应用业务" },
                  { key: "project", title: "应用项目" },
                  { key: "op", title: "操作" },
                ]}
                rows={rows.map((row) => [
                  row.appId,
                  row.name,
                  row.business,
                  row.project,
                  <SkActionLink key="op" danger onClick={() => setRemoveId(row.id)}>
                    解绑
                  </SkActionLink>,
                ])}
              />
            </>
          ) : null}

          {active === 1 ? (
            <>
              <div className="sk-toolbar">
                <div className="sk-title">模板消息</div>
              </div>
              {rows.length === 0 ? (
                <SkEmpty text="请至少绑定一个服务号" />
              ) : (
                <SkTable
                  columns={[
                    { key: "name", title: "模板名称" },
                    { key: "templateId", title: "模板ID" },
                    { key: "status", title: "状态" },
                    { key: "op", title: "操作" },
                  ]}
                  rows={[]}
                />
              )}
            </>
          ) : null}

          {active === 2 ? (
            <>
              <div className="sk-toolbar">
                <div className="sk-title">关键词回复</div>
              </div>
              <div className="sk-empty-inline">暂无数据</div>
            </>
          ) : null}

          {active === 3 ? (
            <>
              <div className="sk-toolbar">
                <div className="sk-title">自定义菜单</div>
              </div>
              {rows.length === 0 ? (
                <SkEmpty text="请至少绑定一个服务号" />
              ) : (
                <div className="sk-empty-inline">暂无数据</div>
              )}
            </>
          ) : null}

          {active === 4 ? (
            <>
              <div className="sk-toolbar">
                <div className="sk-title">渠道二维码</div>
              </div>
              <div className="sk-empty-inline">暂无数据</div>
            </>
          ) : null}
        </SkCard>
      </div>

      <SkModal
        open={bindOpen}
        title="帐号授权"
        width={560}
        onClose={() => setBindOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setBindOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                setRows((current) => [
                  ...current,
                  {
                    id: Date.now(),
                    appId: "wx0000000000000000",
                    name: "快鲸服务号",
                    business: "物业管理",
                    project: "默认项目",
                  },
                ]);
                setBindOpen(false);
                show("绑定成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <div className="sk-auth-qr">
          <img src="/sites/kuaijing/images/wechat-qr.jpg" alt="" />
          <p>请使用微信扫一扫授权服务号</p>
        </div>
      </SkModal>

      <SkConfirm
        open={removeId !== null}
        content="确定解绑该服务号吗？"
        danger
        onCancel={() => setRemoveId(null)}
        onOk={() => {
          setRows((current) => current.filter((row) => row.id !== removeId));
          setRemoveId(null);
          show("解绑成功");
        }}
      />
      {node}
    </div>
  );
}

/* 15 微信小程序 ----------------------------------------------------------- */

type MiniRow = {
  id: number;
  appId: string;
  name: string;
  type: string;
  project: string;
  version: string;
};

export function WechatMiniPage() {
  const [active, setActive] = useState(0);
  const [rows, setRows] = useState<MiniRow[]>([]);
  const [bindOpen, setBindOpen] = useState(false);
  const [removeId, setRemoveId] = useState<number | null>(null);
  const [clientApp, setClientApp] = useState("");
  const { show, node } = useSkMessage();

  return (
    <div className="sk-page sk-integration-page">
      <div className="sk-integration-layout">
        <SkCard className="sk-integration-menu">
          <div className="sk-integration-brand">
            <span className="sk-brand-icon is-green">◉</span>
            <span>微信小程序</span>
          </div>
          <div className="sk-inner-menu sk-integration-inner">
            {["小程序绑定", "订阅消息"].map((item, index) => (
              <button
                key={item}
                type="button"
                className={`sk-inner-item${active === index ? " is-active" : ""}`}
                onClick={() => setActive(index)}
              >
                {item}
              </button>
            ))}
          </div>
        </SkCard>
        <SkCard className="sk-integration-main">
          {active === 0 ? (
            <>
              <div className="sk-toolbar">
                <div className="sk-title">小程序绑定</div>
                <SkButton variant="primary" onClick={() => setBindOpen(true)}>
                  绑定小程序
                </SkButton>
              </div>
              <SkTable
                columns={[
                  { key: "appid", title: "App id" },
                  { key: "name", title: "小程序名称" },
                  { key: "type", title: "小程序类型" },
                  { key: "project", title: "应用项目" },
                  { key: "version", title: "版本管理" },
                  { key: "op", title: "操作" },
                ]}
                rows={rows.map((row) => [
                  row.appId,
                  row.name,
                  row.type,
                  row.project,
                  row.version,
                  <SkActionLink key="op" danger onClick={() => setRemoveId(row.id)}>
                    解绑
                  </SkActionLink>,
                ])}
              />
            </>
          ) : (
            <>
              <div className="sk-toolbar">
                <div className="sk-title">订阅消息</div>
              </div>
              <div className="sk-subscribe-row">
                <SkSelect
                  placeholder="请选择用户端小程序"
                  value={clientApp}
                  options={rows.map((row) => row.name)}
                  onChange={setClientApp}
                  className="sk-subscribe-select"
                />
                <SkButton onClick={() => show("刷新成功")}>刷 新</SkButton>
              </div>
              {rows.length === 0 || !clientApp ? (
                <SkEmpty text={rows.length === 0 ? "请先绑定用户端小程序" : "请选择用户端小程序"} />
              ) : null}
            </>
          )}
        </SkCard>
      </div>

      <SkModal
        open={bindOpen}
        title="帐号授权"
        width={560}
        onClose={() => setBindOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setBindOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                setRows((current) => [
                  ...current,
                  {
                    id: Date.now(),
                    appId: "wx0000000000000000",
                    name: "快鲸小程序",
                    type: "用户端",
                    project: "默认项目",
                    version: "v1.0.0",
                  },
                ]);
                setBindOpen(false);
                show("绑定成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <div className="sk-auth-qr">
          <img src="/sites/kuaijing/images/wechat-qr.jpg" alt="" />
          <p>请使用微信扫一扫授权小程序</p>
        </div>
      </SkModal>

      <SkConfirm
        open={removeId !== null}
        content="确定解绑该小程序吗？"
        danger
        onCancel={() => setRemoveId(null)}
        onOk={() => {
          setRows((current) => current.filter((row) => row.id !== removeId));
          setRemoveId(null);
          show("解绑成功");
        }}
      />
      {node}
    </div>
  );
}

/* 16 企业微信 ------------------------------------------------------------- */

export function WecomPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const { show, node } = useSkMessage();

  return (
    <div className="sk-page">
      <SkCard className="sk-wecom-card">
        <div className="sk-page-title sk-wecom-title">企业授权</div>
        <div className="sk-wecom-body">
          {authorized ? (
            <div className="sk-wecom-authorized">
              <span className="sk-wecom-status">已授权</span>
              <SkButton onClick={() => setModalOpen(true)}>重新授权</SkButton>
            </div>
          ) : (
            <SkButton variant="primary" onClick={() => setModalOpen(true)}>
              授权企业微信
            </SkButton>
          )}
        </div>
      </SkCard>

      <SkModal
        open={modalOpen}
        title="扫码授权企业微信"
        width={560}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setModalOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                setAuthorized(true);
                setModalOpen(false);
                show("授权成功");
              }}
            >
              完 成
            </SkButton>
          </>
        }
      >
        <div className="sk-auth-qr">
          <img src="/sites/kuaijing/images/wechat-qr.jpg" alt="" />
          <p>请使用企业微信扫一扫完成授权</p>
        </div>
      </SkModal>
      {node}
    </div>
  );
}

/* 17 钉钉 ---------------------------------------------------------------- */

type DingRow = {
  id: number;
  companyId: string;
  name: string;
  industry: string;
  time: string;
};

export function DingtalkPage() {
  const [rows, setRows] = useState<DingRow[]>([]);
  const [open, setOpen] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [appId, setAppId] = useState("");
  const [agentId, setAgentId] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [removeId, setRemoveId] = useState<number | null>(null);
  const { show, node } = useSkMessage();

  return (
    <div className="sk-page">
      <SkCard className="sk-integration-main sk-plain-card">
        <div className="sk-toolbar">
          <div className="sk-title">钉钉绑定</div>
          <SkButton variant="primary" onClick={() => setOpen(true)}>
            绑定钉钉
          </SkButton>
        </div>
        <SkTable
          columns={[
            { key: "id", title: "企业ID" },
            { key: "name", title: "企业名称" },
            { key: "industry", title: "行业" },
            { key: "time", title: "授权时间" },
            { key: "qr", title: "扫码加入钉钉" },
            { key: "op", title: "操作" },
          ]}
          rows={rows.map((row) => [
            row.companyId,
            row.name,
            row.industry,
            row.time,
            <img
              key="qr"
              src="/sites/kuaijing/images/wechat-qr.jpg"
              alt=""
              className="sk-qr-thumb"
            />,
            <SkActionLink key="op" danger onClick={() => setRemoveId(row.id)}>
              解绑
            </SkActionLink>,
          ])}
        />
      </SkCard>

      <SkDrawer
        open={open}
        title="绑定钉钉"
        width={700}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!companyId.trim() || !name.trim()) {
                  show("请输入企业ID和企业名称");
                  return;
                }
                setRows((current) => [
                  ...current,
                  {
                    id: Date.now(),
                    companyId,
                    name,
                    industry: "--",
                    time: NOW,
                  },
                ]);
                setOpen(false);
                show("绑定成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="sk-drawer-form">
          <div className="sk-modal-section-title">基本信息</div>
          <Field label="企业ID" required>
            <SkInput
              placeholder="请输入企业ID"
              value={companyId}
              onChange={setCompanyId}
            />
            <div className="sk-form-inline-hint">钉钉后台-&gt;宜搭-&gt;平台管理-&gt;企业ID</div>
          </Field>
          <Field label="企业名称" required>
            <SkInput placeholder="请输入企业名称" value={name} onChange={setName} />
            <div className="sk-form-inline-hint">钉钉后台-&gt;宜搭-&gt;平台管理-&gt;企业名称</div>
          </Field>
          <Field label="企业Logo">
            <UploadTile label="上传图片" value={logo} onChange={setLogo} />
            <div className="sk-form-inline-hint">钉钉后台-&gt;宜搭-&gt;平台管理-&gt;企业Logo</div>
          </Field>
          <div className="sk-modal-section-title">自建应用</div>
          <Field label="Appid" required>
            <SkInput placeholder="请输入Appid" value={appId} onChange={setAppId} />
            <div className="sk-form-inline-hint">
              钉钉开放平台-&gt;自建企业应用-&gt;应用凭证-&gt;App ID
            </div>
          </Field>
          <Field label="AgentId" required>
            <SkInput placeholder="请输入AgentId" value={agentId} onChange={setAgentId} />
            <div className="sk-form-inline-hint">
              钉钉开放平台-&gt;自建企业应用-&gt;应用凭证-&gt;原企业内部应用AgentId
            </div>
          </Field>
          <Field label="ClientId" required>
            <SkInput placeholder="请输入ClientId" value={clientId} onChange={setClientId} />
            <div className="sk-form-inline-hint">
              钉钉开放平台-&gt;自建企业应用-&gt;应用凭证-&gt;Client ID
            </div>
          </Field>
          <Field label="ClientSecret" required>
            <SkInput
              placeholder="请输入ClientSecret"
              value={clientSecret}
              onChange={setClientSecret}
            />
            <div className="sk-form-inline-hint">
              钉钉开放平台-&gt;自建企业应用-&gt;应用凭证-&gt;Client Secret
            </div>
          </Field>
        </div>
      </SkDrawer>

      <SkConfirm
        open={removeId !== null}
        content="确定解绑该钉钉企业吗？"
        danger
        onCancel={() => setRemoveId(null)}
        onOk={() => {
          setRows((current) => current.filter((row) => row.id !== removeId));
          setRemoveId(null);
          show("解绑成功");
        }}
      />
      {node}
    </div>
  );
}

/* 18 飞书 ---------------------------------------------------------------- */

type FeishuRow = {
  id: number;
  name: string;
  companyId: string;
  time: string;
};

export function FeishuPage() {
  const [rows, setRows] = useState<FeishuRow[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [secret, setSecret] = useState("");
  const [dept, setDept] = useState("");
  const [removeId, setRemoveId] = useState<number | null>(null);
  const { show, node } = useSkMessage();

  return (
    <div className="sk-page">
      <SkCard className="sk-plain-card">
        <div className="sk-toolbar">
          <div className="sk-title">应用列表</div>
          <SkButton variant="primary" onClick={() => setOpen(true)}>
            新增应用
          </SkButton>
        </div>
        <SkTable
          columns={[
            { key: "company", title: "企业名称" },
            { key: "id", title: "企业ID" },
            { key: "time", title: "添加时间" },
            { key: "op", title: "操作" },
          ]}
          rows={rows.map((row) => [
            row.name,
            row.companyId,
            row.time,
            <SkActionLink key="op" danger onClick={() => setRemoveId(row.id)}>
              删除
            </SkActionLink>,
          ])}
        />
      </SkCard>

      <SkDrawer
        open={open}
        title="新增应用"
        width={700}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim() || !companyId.trim()) {
                  show("请输入企业名称和企业ID");
                  return;
                }
                setRows((current) => [
                  ...current,
                  { id: Date.now(), name, companyId, time: NOW },
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
        <div className="sk-drawer-form">
          <div className="sk-modal-section-title">基本信息</div>
          <Field label="企业名称" required>
            <SkInput placeholder="请输入企业名称" value={name} onChange={setName} />
          </Field>
          <Field label="企业ID" required>
            <SkInput placeholder="请输入应用ID" value={companyId} onChange={setCompanyId} />
            <div className="sk-form-inline-hint">
              飞书开放平台-&gt;自建应用详情-&gt;凭证与基础信息
            </div>
          </Field>
          <Field label="应用密钥" required>
            <SkInput placeholder="请输入应用密钥" value={secret} onChange={setSecret} />
            <div className="sk-form-inline-hint">
              飞书开放平台-&gt;自建应用详情-&gt;凭证与基础信息
            </div>
          </Field>
          <Field label="部门">
            <SkSelect
              placeholder="请选择部门"
              value={dept}
              options={[ACCOUNT.company, "后勤部", "保洁组", "安保组"]}
              onChange={setDept}
            />
          </Field>
        </div>
      </SkDrawer>

      <SkConfirm
        open={removeId !== null}
        content="确定删除该应用吗？"
        danger
        onCancel={() => setRemoveId(null)}
        onOk={() => {
          setRows((current) => current.filter((row) => row.id !== removeId));
          setRemoveId(null);
          show("删除成功");
        }}
      />
      {node}
    </div>
  );
}

/* 19 APP ----------------------------------------------------------------- */

type AppRow = {
  id: number;
  name: string;
  versionName: string;
  version: string;
  android: string;
  ios: string;
  qr: string;
};

const EMPTY_APP: Omit<AppRow, "id"> = {
  name: "",
  versionName: "",
  version: "",
  android: "",
  ios: "",
  qr: "",
};

export function AppPage() {
  const [rows, setRows] = useState<AppRow[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<AppRow, "id">>(EMPTY_APP);
  const [removeId, setRemoveId] = useState<number | null>(null);
  const { show, node } = useSkMessage();

  const openAdd = () => {
    setForm({ ...EMPTY_APP });
    setEditingId(null);
    setOpen(true);
  };

  const openEdit = (row: AppRow) => {
    const { id, ...rest } = row;
    setForm({ ...rest });
    setEditingId(id);
    setOpen(true);
  };

  return (
    <div className="sk-page">
      <SkCard className="sk-plain-card">
        <div className="sk-toolbar">
          <div className="sk-title">APP列表</div>
          <SkButton variant="primary" onClick={openAdd}>
            添加APP
          </SkButton>
        </div>
        <SkTable
          columns={[
            { key: "name", title: "App名称" },
            { key: "versionName", title: "版本名称" },
            { key: "version", title: "版本号" },
            { key: "android", title: "安卓下载链接" },
            { key: "ios", title: "IOS下载链接" },
            { key: "qr", title: "应用二维码" },
            { key: "op", title: "操作" },
          ]}
          rows={rows.map((row) => [
            row.name,
            row.versionName,
            row.version,
            row.android,
            row.ios,
            row.qr ? <img key="qr" src={row.qr} alt="" className="sk-qr-thumb" /> : "--",
            <span key="op">
              <SkActionLink onClick={() => openEdit(row)}>编辑</SkActionLink>
              <SkActionLink danger onClick={() => setRemoveId(row.id)}>
                删除
              </SkActionLink>
            </span>,
          ])}
        />
      </SkCard>

      <SkDrawer
        open={open}
        title={editingId === null ? "添加APP" : "编辑APP"}
        width={700}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!form.name.trim()) {
                  show("请输入App名称");
                  return;
                }
                if (editingId === null) {
                  setRows((current) => [...current, { ...form, id: Date.now() }]);
                  show("添加成功");
                } else {
                  setRows((current) =>
                    current.map((row) =>
                      row.id === editingId ? { ...form, id: row.id } : row,
                    ),
                  );
                  show("保存成功");
                }
                setOpen(false);
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="sk-drawer-form">
          <Field label="App名称" required>
            <SkInput
              placeholder="请输入App名称"
              value={form.name}
              onChange={(value) => setForm((current) => ({ ...current, name: value }))}
            />
          </Field>
          <Field label="版本名称">
            <SkInput
              placeholder="请输入版本名称"
              value={form.versionName}
              onChange={(value) => setForm((current) => ({ ...current, versionName: value }))}
            />
          </Field>
          <Field label="版本号">
            <SkInput
              placeholder="请输入版本号"
              value={form.version}
              onChange={(value) => setForm((current) => ({ ...current, version: value }))}
            />
          </Field>
          <Field label="安卓下载链接">
            <SkInput
              placeholder="请输入安卓下载链接"
              value={form.android}
              onChange={(value) => setForm((current) => ({ ...current, android: value }))}
            />
          </Field>
          <Field label="IOS下载链接">
            <SkInput
              placeholder="请输入IOS下载链接"
              value={form.ios}
              onChange={(value) => setForm((current) => ({ ...current, ios: value }))}
            />
          </Field>
          <Field label="应用二维码">
            <UploadTile
              square
              label="上传"
              value={form.qr}
              onChange={(value) => setForm((current) => ({ ...current, qr: value }))}
            />
          </Field>
        </div>
      </SkDrawer>

      <SkConfirm
        open={removeId !== null}
        content="确定删除该APP吗？"
        danger
        onCancel={() => setRemoveId(null)}
        onOk={() => {
          setRows((current) => current.filter((row) => row.id !== removeId));
          setRemoveId(null);
          show("删除成功");
        }}
      />
      {node}
    </div>
  );
}
