"use client";

import { useRef, useState } from "react";

import { ACCOUNT } from "../data";
import {
  SkActionLink,
  SkButton,
  SkCard,
  SkCheckbox,
  SkConfirm,
  SkDrawer,
  SkInput,
  SkModal,
  SkPagination,
  SkRadio,
  SkSearchButtonGroup,
  SkSelect,
  SkSwitch,
  SkTable,
  useSkMessage,
} from "../SettingsUI";
import {
  CheckCell,
  Field,
  FormRow,
  InnerMenu,
  MoreMenu,
  SearchActions,
  UploadTile,
} from "./common";

/* 01 企业信息 ------------------------------------------------------------- */

export function CompanyInfoPage() {
  const [active, setActive] = useState(0);
  const [invite, setInvite] = useState("ZHJA1W1A");
  const [logo, setLogo] = useState("");
  const [squareLogo, setSquareLogo] = useState("");
  const [portalEnabled, setPortalEnabled] = useState(false);
  const [watermark, setWatermark] = useState(false);
  const [realName, setRealName] = useState(false);
  const [emailNotice, setEmailNotice] = useState(false);
  const [smsNotice, setSmsNotice] = useState(false);
  const { show, node } = useSkMessage();

  const copyInvite = async () => {
    try {
      await navigator.clipboard?.writeText(invite);
      show("复制成功");
    } catch {
      show(`邀请码：${invite}`);
    }
  };

  const refreshInvite = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let next = "";
    for (let index = 0; index < 8; index += 1) {
      next += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    setInvite(next);
    show("邀请码已刷新");
  };

  const save = () => show("保存成功");

  return (
    <div className="sk-page sk-page-inner">
      <div className="sk-inner-layout">
        <InnerMenu
          items={["基本设置", "门户设置", "安全设置", "通知设置"]}
          active={active}
          onChange={setActive}
        />
        <div className="sk-inner-content">
          {active === 0 ? (
            <form
              className="sk-form"
              onSubmit={(event) => {
                event.preventDefault();
                save();
              }}
            >
              <FormRow label="企业名称" required>
                <SkInput placeholder="请输入企业名称" defaultValue={ACCOUNT.company} />
              </FormRow>
              <FormRow label="企业简称">
                <SkInput placeholder="请输入企业简称" />
              </FormRow>
              <FormRow label="企业邀请码">
                <div className="sk-invite-code">
                  <span>{invite}</span>
                  <span className="sk-invite-sync" onClick={refreshInvite} title="刷新">
                    ↻
                  </span>
                  <SkButton onClick={copyInvite}>
                    <span className="sk-copy-icon" />
                    复制
                  </SkButton>
                </div>
              </FormRow>
              <FormRow label="企业介绍">
                <textarea className="sk-textarea" placeholder="请输入企业介绍" />
              </FormRow>
              <FormRow label="Logo">
                <UploadTile value={logo} onChange={setLogo} />
              </FormRow>
              <FormRow label="正方形Logo">
                <UploadTile square value={squareLogo} onChange={setSquareLogo} />
              </FormRow>
              <FormRow label="所属地" required>
                <SkSelect
                  value="辽宁 / 大连"
                  options={["辽宁 / 大连", "辽宁 / 沈阳", "北京 / 北京市", "上海 / 上海市"]}
                />
              </FormRow>
              <FormRow label="联系方式">
                <SkInput placeholder="请输入企业联系方式" />
              </FormRow>
              <FormRow label="联系地址">
                <SkInput placeholder="请输入企业联系地址" />
              </FormRow>
              <FormRow label="招商热线">
                <SkInput defaultValue="--" />
              </FormRow>
              <FormRow label="招商时间">
                <SkInput placeholder="请输入招商时间，例：早9:00 — 晚8：30" />
              </FormRow>
              <FormRow label="域名前缀">
                <SkInput placeholder="请输入企业域名前缀" />
                <div className="sk-form-hint">企业的域名前缀提交后将不可更改</div>
              </FormRow>
              <FormRow label="工号前缀">
                <SkInput />
              </FormRow>
              <div className="sk-form-actions">
                <SkButton variant="primary" size="md" className="sk-save-btn" onClick={save}>
                  保 存
                </SkButton>
              </div>
            </form>
          ) : null}

          {active === 1 ? (
            <form
              className="sk-form"
              onSubmit={(event) => {
                event.preventDefault();
                save();
              }}
            >
              <FormRow label="是否启用门户">
                <div className="sk-inner-switch-row">
                  <SkSwitch checked={portalEnabled} onChange={setPortalEnabled} />
                  <span className="sk-inner-switch-label">
                    {portalEnabled ? "启用" : "不启用"}
                  </span>
                </div>
              </FormRow>
              <div className="sk-form-actions">
                <SkButton variant="primary" onClick={save}>
                  保 存
                </SkButton>
              </div>
            </form>
          ) : null}

          {active === 2 ? (
            <form
              className="sk-form"
              onSubmit={(event) => {
                event.preventDefault();
                save();
              }}
            >
              <FormRow label="企业水印">
                <div className="sk-inner-switch-row">
                  <SkSwitch checked={watermark} onChange={setWatermark} />
                  <span className="sk-inner-switch-label">{watermark ? "开启" : "关闭"}</span>
                </div>
              </FormRow>
              <FormRow label="是否可修改真实姓名">
                <div className="sk-inner-switch-row">
                  <SkSwitch checked={realName} onChange={setRealName} />
                  <span className="sk-inner-switch-label">{realName ? "开启" : "关闭"}</span>
                </div>
              </FormRow>
              <div className="sk-form-actions">
                <SkButton variant="primary" onClick={save}>
                  保 存
                </SkButton>
              </div>
            </form>
          ) : null}

          {active === 3 ? (
            <form
              className="sk-form"
              onSubmit={(event) => {
                event.preventDefault();
                save();
              }}
            >
              <FormRow label="站内信邮件通知">
                <div className="sk-inner-switch-row">
                  <SkSwitch checked={emailNotice} onChange={setEmailNotice} />
                  <span className="sk-inner-switch-label">
                    {emailNotice ? "开启" : "关闭"}
                  </span>
                </div>
              </FormRow>
              <FormRow label="站内信短信通知">
                <div className="sk-inner-switch-row">
                  <SkSwitch checked={smsNotice} onChange={setSmsNotice} />
                  <span className="sk-inner-switch-label">{smsNotice ? "开启" : "关闭"}</span>
                </div>
              </FormRow>
              <div className="sk-form-actions">
                <SkButton variant="primary" onClick={save}>
                  保 存
                </SkButton>
              </div>
            </form>
          ) : null}
        </div>
      </div>
      {node}
    </div>
  );
}

/* 02 公司列表 ------------------------------------------------------------- */

type CompanyRow = {
  name: string;
  short: string;
  tax: string;
  owner: string;
  phone: string;
  legal: string;
  region: string;
  address: string;
  accounts: string;
  status: boolean;
};

const EMPTY_COMPANY: CompanyRow = {
  name: "",
  short: "",
  tax: "",
  owner: "--",
  phone: "",
  legal: "",
  region: "",
  address: "",
  accounts: "0",
  status: true,
};

const COMPANY_FILTERS = { name: "", owner: "", phone: "", status: "" };

export function CompanyListPage() {
  const [companies, setCompanies] = useState<CompanyRow[]>([
    {
      name: ACCOUNT.company,
      short: "--",
      tax: "--",
      owner: "--",
      phone: "--",
      legal: "--",
      region: "辽宁 / 大连",
      address: "--",
      accounts: "1",
      status: true,
    },
  ]);
  const [draft, setDraft] = useState(COMPANY_FILTERS);
  const [filters, setFilters] = useState(COMPANY_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selected, setSelected] = useState<string[]>([]);
  const [modal, setModal] = useState<{ mode: "add" | "edit"; name?: string } | null>(null);
  const [form, setForm] = useState<CompanyRow>(EMPTY_COMPANY);
  const [mapOpen, setMapOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<string[] | null>(null);
  const { show, node } = useSkMessage();

  const filtered = companies.filter((company) => {
    if (filters.name) {
      const key = filters.name.toLowerCase();
      if (
        !company.name.toLowerCase().includes(key) &&
        !company.short.toLowerCase().includes(key)
      ) {
        return false;
      }
    }
    if (filters.owner && !company.owner.includes(filters.owner)) return false;
    if (filters.phone && !company.phone.includes(filters.phone)) return false;
    if (filters.status && company.status !== (filters.status === "开启")) return false;
    return true;
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const allSelected = pageRows.length > 0 && pageRows.every((row) => selected.includes(row.name));

  const openAdd = () => {
    setForm(EMPTY_COMPANY);
    setMapOpen(false);
    setModal({ mode: "add" });
  };

  const openEdit = (company: CompanyRow) => {
    setForm({ ...company });
    setMapOpen(false);
    setModal({ mode: "edit", name: company.name });
  };

  const submitCompany = () => {
    const required: Array<[keyof CompanyRow, string]> = [
      ["name", "公司名称"],
      ["short", "公司简称"],
      ["tax", "纳税人识别号"],
      ["region", "所属地区"],
      ["address", "详细地址"],
    ];
    const missing = required.find(([key]) => !String(form[key]).trim());
    if (missing) {
      show(`请填写${missing[1]}`);
      return;
    }
    if (modal?.mode === "edit" && modal.name) {
      setCompanies((rows) =>
        rows.map((row) => (row.name === modal.name ? { ...form } : row)),
      );
      show("编辑成功");
    } else {
      setCompanies((rows) => [...rows, { ...form, accounts: "0" }]);
      show("添加成功");
    }
    setModal(null);
  };

  const removeCompanies = (targets: string[]) => {
    const removable = targets.filter((name) => name !== ACCOUNT.company);
    setCompanies((rows) => rows.filter((row) => !removable.includes(row.name)));
    setSelected((current) => current.filter((name) => !removable.includes(name)));
    setRemoveTarget(null);
    show("删除成功");
  };

  return (
    <div className="sk-page">
      <SkCard className="sk-search-card">
        <div className="sk-search-top">
          <span>未选择筛选字段</span>
          <SearchActions
            onClear={() => {
              setDraft(COMPANY_FILTERS);
              setFilters(COMPANY_FILTERS);
            }}
          />
        </div>
        <div className="sk-search-row">
          <Field label="公司名称">
            <SkInput
              placeholder="请输入公司名称或简称"
              value={draft.name}
              onChange={(value) => setDraft((current) => ({ ...current, name: value }))}
              onEnter={() => setFilters(draft)}
            />
          </Field>
          <Field label="负责人">
            <SkInput
              placeholder="请输入负责人"
              value={draft.owner}
              onChange={(value) => setDraft((current) => ({ ...current, owner: value }))}
              onEnter={() => setFilters(draft)}
            />
          </Field>
          <Field label="联系方式">
            <SkInput
              placeholder="请输入联系方式"
              value={draft.phone}
              onChange={(value) => setDraft((current) => ({ ...current, phone: value }))}
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
              setDraft(COMPANY_FILTERS);
              setFilters(COMPANY_FILTERS);
              setPage(1);
            }}
          />
        </div>
      </SkCard>

      <SkCard>
        <div className="sk-toolbar">
          <div className="sk-title">公司列表</div>
          <div className="sk-toolbar-actions">
            <SkButton variant="primary" onClick={openAdd}>
              <span className="sk-plus">+</span>新增
            </SkButton>
            <MoreMenu
              items={[
                {
                  label: "导出",
                  onClick: () => show(`已导出 ${filtered.length} 条公司数据`),
                },
                {
                  label: "批量删除",
                  disabled: selected.length === 0,
                  onClick: () => setRemoveTarget(selected),
                },
              ]}
            />
          </div>
        </div>
        <SkTable
          columns={[
            {
              key: "check",
              title: (
                <CheckCell
                  checked={allSelected}
                  onChange={() => {
                    if (allSelected) {
                      setSelected((current) =>
                        current.filter((name) => !pageRows.some((row) => row.name === name)),
                      );
                    } else {
                      setSelected((current) =>
                        Array.from(new Set([...current, ...pageRows.map((row) => row.name)])),
                      );
                    }
                  }}
                />
              ),
              width: 40,
            },
            { key: "name", title: "公司名称" },
            { key: "short", title: "公司简称" },
            { key: "tax", title: "纳税识别号" },
            { key: "dept", title: "绑定部门" },
            { key: "owner", title: "负责人" },
            { key: "phone", title: "联系方式" },
            { key: "address", title: "公司地址" },
            { key: "accounts", title: "收支账户数量" },
            { key: "status", title: "状态" },
            { key: "op", title: "操作" },
          ]}
          className="sk-table-wide"
          rowClassName={(index) =>
            pageRows[index] && selected.includes(pageRows[index].name) ? "sk-row-selected" : ""
          }
          rows={pageRows.map((company) => [
            <CheckCell
              key="c"
              checked={selected.includes(company.name)}
              onChange={() =>
                setSelected((current) =>
                  current.includes(company.name)
                    ? current.filter((name) => name !== company.name)
                    : [...current, company.name],
                )
              }
            />,
            company.name,
            company.short,
            company.tax,
            "--",
            company.owner,
            company.phone,
            company.address,
            company.accounts,
            <SkSwitch
              key="s"
              checked={company.status}
              onChange={(checked) =>
                setCompanies((rows) =>
                  rows.map((row) =>
                    row.name === company.name ? { ...row, status: checked } : row,
                  ),
                )
              }
            />,
            <span key="op">
              <SkActionLink onClick={() => openEdit(company)}>编辑</SkActionLink>
              <SkActionLink
                danger
                disabled={company.name === ACCOUNT.company}
                onClick={() => setRemoveTarget([company.name])}
              >
                删除
              </SkActionLink>
            </span>,
          ])}
        />
        <SkPagination
          total={filtered.length}
          page={currentPage}
          pageSize={pageSize}
          onPageChange={(next) => setPage(next)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      </SkCard>

      <SkModal
        open={modal !== null}
        title={modal?.mode === "edit" ? "编辑公司" : "添加公司"}
        width={900}
        onClose={() => setModal(null)}
        footer={
          <>
            <SkButton onClick={() => setModal(null)}>取 消</SkButton>
            <SkButton variant="primary" onClick={submitCompany}>
              提 交
            </SkButton>
          </>
        }
      >
        <div className="sk-modal-form">
          <div className="sk-modal-section-title">基础信息</div>
          <div className="sk-form-grid">
            <Field label="公司名称" required>
              <SkInput
                placeholder="请填写公司名称"
                value={form.name}
                onChange={(value) => setForm((current) => ({ ...current, name: value }))}
              />
            </Field>
            <Field label="公司简称" required>
              <SkInput
                placeholder="请填写公司简称"
                value={form.short}
                onChange={(value) => setForm((current) => ({ ...current, short: value }))}
              />
            </Field>
            <Field label="纳税人识别号" required>
              <SkInput
                placeholder="请输入纳税人识别号"
                value={form.tax}
                onChange={(value) => setForm((current) => ({ ...current, tax: value }))}
              />
            </Field>
            <Field label="公司联系电话">
              <SkInput
                placeholder="请输入公司联系电话"
                value={form.phone}
                onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
              />
            </Field>
            <Field label="法人姓名">
              <SkInput
                placeholder="请输入法人姓名"
                value={form.legal}
                onChange={(value) => setForm((current) => ({ ...current, legal: value }))}
              />
            </Field>
            <Field label="所属地区" required>
              <SkSelect
                placeholder="请选择位置"
                value={form.region}
                options={["辽宁 / 大连", "辽宁 / 沈阳", "北京 / 北京市", "上海 / 上海市"]}
                onChange={(value) => setForm((current) => ({ ...current, region: value }))}
              />
            </Field>
            <Field label="详细地址" required className="is-full">
              {mapOpen ? (
                <SkInput
                  placeholder="请输入详细地址"
                  value={form.address}
                  onChange={(value) => setForm((current) => ({ ...current, address: value }))}
                />
              ) : (
                <div
                  className="sk-map-picker"
                  onClick={() => {
                    setMapOpen(true);
                    setForm((current) => ({
                      ...current,
                      address: current.address === "--" ? "" : current.address,
                    }));
                  }}
                >
                  点击打开地图选取详细地址
                </div>
              )}
            </Field>
            <Field label="状态">
              <SkSwitch
                checked={form.status}
                onChange={(checked) => setForm((current) => ({ ...current, status: checked }))}
              />
            </Field>
          </div>
        </div>
      </SkModal>

      <SkConfirm
        open={removeTarget !== null}
        content={`确定删除选中的 ${removeTarget?.length ?? 0} 家公司吗？`}
        danger
        onCancel={() => setRemoveTarget(null)}
        onOk={() => removeCompanies(removeTarget ?? [])}
      />
      {node}
    </div>
  );
}

/* 03 收支账户 ------------------------------------------------------------- */

type AccountRow = {
  id: number;
  name: string;
  company: string;
  type: "公司" | "个人";
  accountName: string;
  bank: string;
  number: string;
  subject: string;
  status: boolean;
};

const EMPTY_ACCOUNT: Omit<AccountRow, "id"> = {
  name: "",
  company: ACCOUNT.company,
  type: "公司",
  accountName: "",
  bank: "",
  number: "",
  subject: "",
  status: true,
};

const ACCOUNT_FILTERS = { name: "", bank: "", company: "", status: "" };

export function AccountsPage() {
  const [rows, setRows] = useState<AccountRow[]>([
    {
      id: 1,
      name: "住宿费",
      company: ACCOUNT.company,
      type: "公司",
      accountName: "",
      bank: "中国工商银行",
      number: "622600000000000000",
      subject: "",
      status: true,
    },
  ]);
  const [draft, setDraft] = useState(ACCOUNT_FILTERS);
  const [filters, setFilters] = useState(ACCOUNT_FILTERS);
  const [drawer, setDrawer] = useState<{ mode: "add" | "edit"; id?: number } | null>(null);
  const [form, setForm] = useState<Omit<AccountRow, "id">>(EMPTY_ACCOUNT);
  const [removeId, setRemoveId] = useState<number | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const importRef = useRef<HTMLInputElement>(null);
  const { show, node } = useSkMessage();

  const filtered = rows.filter((row) => {
    if (filters.name && !row.name.includes(filters.name)) return false;
    if (filters.bank && !row.bank.includes(filters.bank) && !row.number.includes(filters.bank)) {
      return false;
    }
    if (filters.company && row.company !== filters.company) return false;
    if (filters.status && row.status !== (filters.status === "开启")) return false;
    return true;
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openAdd = () => {
    setForm({ ...EMPTY_ACCOUNT });
    setDrawer({ mode: "add" });
  };

  const openEdit = (row: AccountRow) => {
    const { id, ...rest } = row;
    setForm({ ...rest });
    setDrawer({ mode: "edit", id });
  };

  const submit = () => {
    if (!form.name.trim()) {
      show("请输入条目名称");
      return;
    }
    if (!form.company) {
      show("请选择收款公司");
      return;
    }
    if (drawer?.mode === "edit" && drawer.id) {
      setRows((current) =>
        current.map((row) => (row.id === drawer.id ? { ...form, id: row.id } : row)),
      );
      show("保存成功");
    } else {
      setRows((current) => [...current, { ...form, id: Date.now() }]);
      show("新增成功");
    }
    setDrawer(null);
  };

  const exportCsv = () => {
    const csv = [
      ["条目名称", "收款公司", "账户类型", "开户银行", "银行账号", "状态"].join(","),
      ...filtered.map((row) =>
        [row.name, row.company, row.type, row.bank, row.number, row.status ? "开启" : "关闭"].join(
          ",",
        ),
      ),
    ].join("\n");
    const blob = new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "收支账户.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    show("导出成功");
  };

  return (
    <div className="sk-page">
      <SkCard className="sk-fill">
        <div className="sk-title sk-title-lg">收支账户配置</div>
        <div className="sk-search-inline">
          <SkInput
            placeholder="请输入条目名称"
            value={draft.name}
            onChange={(value) => setDraft((current) => ({ ...current, name: value }))}
            onEnter={() => setFilters(draft)}
          />
          <SkInput
            placeholder="请输入银行账户"
            value={draft.bank}
            onChange={(value) => setDraft((current) => ({ ...current, bank: value }))}
            onEnter={() => setFilters(draft)}
          />
          <SkSelect
            placeholder="请选择收款公司"
            value={draft.company}
            options={[ACCOUNT.company]}
            onChange={(value) => setDraft((current) => ({ ...current, company: value }))}
          />
          <SkSelect
            placeholder="请选择状态"
            value={draft.status}
            options={["开启", "关闭"]}
            onChange={(value) => setDraft((current) => ({ ...current, status: value }))}
          />
          <SkButton
            onClick={() => {
              setDraft(ACCOUNT_FILTERS);
              setFilters(ACCOUNT_FILTERS);
            }}
          >
            重置
          </SkButton>
          <SkButton
            variant="primary"
            onClick={() => {
              setFilters(draft);
              setPage(1);
            }}
          >
            搜索
          </SkButton>
          <span className="sk-inline-spacer" />
          <SkButton onClick={() => importRef.current?.click()}>导入</SkButton>
          <SkButton onClick={exportCsv}>导出</SkButton>
          <SkButton variant="primary" onClick={openAdd}>
            <span className="sk-plus">+</span>新增收支账户
          </SkButton>
          <input
            ref={importRef}
            type="file"
            accept=".csv,.xls,.xlsx"
            hidden
            onChange={(event) => {
              if (event.target.files?.length) show("导入成功");
              event.target.value = "";
            }}
          />
        </div>
        <SkTable
          columns={[
            {
              key: "check",
              title: (
                <CheckCell
                  checked={pageRows.length > 0 && pageRows.every((row) => selected.includes(row.id))}
                  onChange={() => {
                    const ids = pageRows.map((row) => row.id);
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
            { key: "name", title: "条目名称" },
            { key: "company", title: "收款公司" },
            { key: "type", title: "账户类型" },
            { key: "bank", title: "开户银行" },
            { key: "account", title: "银行账号" },
            { key: "status", title: "状态" },
            { key: "op", title: "操作" },
          ]}
          rowClassName={(index) =>
            pageRows[index] && selected.includes(pageRows[index].id) ? "sk-row-selected" : ""
          }
          rows={pageRows.map((row) => [
            <CheckCell
              key="c"
              checked={selected.includes(row.id)}
              onChange={() =>
                setSelected((current) =>
                  current.includes(row.id)
                    ? current.filter((id) => id !== row.id)
                    : [...current, row.id],
                )
              }
            />,
            row.name,
            row.company,
            row.type,
            row.bank,
            row.number,
            <SkSwitch
              key="s"
              checked={row.status}
              onChange={(checked) =>
                setRows((current) =>
                  current.map((item) =>
                    item.id === row.id ? { ...item, status: checked } : item,
                  ),
                )
              }
            />,
            <span key="op">
              <SkActionLink onClick={() => openEdit(row)}>编辑</SkActionLink>
              <SkActionLink danger onClick={() => setRemoveId(row.id)}>
                删除
              </SkActionLink>
            </span>,
          ])}
        />
        <SkPagination
          total={filtered.length}
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

      <SkDrawer
        open={drawer !== null}
        title={drawer?.mode === "edit" ? "编辑收支账户" : "新增收支账户"}
        width={450}
        onClose={() => setDrawer(null)}
        footer={
          <>
            <SkButton onClick={() => setDrawer(null)}>取 消</SkButton>
            <SkButton variant="primary" onClick={submit}>
              保 存
            </SkButton>
          </>
        }
      >
        <div className="sk-drawer-form">
          <Field label="条目名称" required>
            <SkInput
              placeholder="请输入条目名称"
              value={form.name}
              onChange={(value) => setForm((current) => ({ ...current, name: value }))}
            />
          </Field>
          <Field label="收款公司" required>
            <SkSelect
              value={form.company}
              options={[ACCOUNT.company]}
              onChange={(value) => setForm((current) => ({ ...current, company: value }))}
            />
          </Field>
          <Field label="账户类型">
            <div className="sk-radio-row">
              <SkRadio
                label="公司"
                checked={form.type === "公司"}
                onChange={() => setForm((current) => ({ ...current, type: "公司" }))}
              />
              <SkRadio
                label="个人"
                checked={form.type === "个人"}
                onChange={() => setForm((current) => ({ ...current, type: "个人" }))}
              />
            </div>
          </Field>
          <Field label="账户名称">
            <SkInput
              placeholder="请输入账户名称"
              value={form.accountName}
              onChange={(value) => setForm((current) => ({ ...current, accountName: value }))}
            />
          </Field>
          <Field label="开户银行">
            <SkInput
              placeholder="请输入开户银行"
              value={form.bank}
              onChange={(value) => setForm((current) => ({ ...current, bank: value }))}
            />
          </Field>
          <Field label="银行账号">
            <SkInput
              placeholder="请输入银行账号"
              value={form.number}
              onChange={(value) => setForm((current) => ({ ...current, number: value }))}
            />
          </Field>
          <Field label="总分类账科目">
            <SkInput
              placeholder="请输入总分类账科目"
              value={form.subject}
              onChange={(value) => setForm((current) => ({ ...current, subject: value }))}
            />
          </Field>
          <Field label="状态">
            <SkSwitch
              checked={form.status}
              onChange={(checked) => setForm((current) => ({ ...current, status: checked }))}
            />
          </Field>
        </div>
      </SkDrawer>

      <SkConfirm
        open={removeId !== null}
        content="确定删除该收支账户吗？"
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

/* 04 支付配置 ------------------------------------------------------------- */

type PaymentRow = {
  id: number;
  name: string;
  account: string;
  method: string;
  channel: string;
  fee: string;
  env: string;
  status: boolean;
};

const EMPTY_PAYMENT: Omit<PaymentRow, "id"> = {
  name: "",
  account: `${ACCOUNT.company} / 住宿费`,
  method: "微信支付",
  channel: "聚合支付（乐刷）",
  fee: "0.00",
  env: "",
  status: true,
};

export function PaymentConfigPage() {
  const [rows, setRows] = useState<PaymentRow[]>([]);
  const [modal, setModal] = useState<{ mode: "add" | "edit"; id?: number } | null>(null);
  const [form, setForm] = useState<Omit<PaymentRow, "id">>(EMPTY_PAYMENT);
  const [envs, setEnvs] = useState<string[]>([]);
  const [merchant, setMerchant] = useState("");
  const [secret, setSecret] = useState("");
  const [store, setStore] = useState("");
  const [minAmount, setMinAmount] = useState("0");
  const [cycle, setCycle] = useState("D+1");
  const [delay, setDelay] = useState("0");
  const [splitOpen, setSplitOpen] = useState(false);
  const [splitEnabled, setSplitEnabled] = useState(false);
  const [removeId, setRemoveId] = useState<number | null>(null);
  const { show, node } = useSkMessage();

  const openAdd = () => {
    setForm({ ...EMPTY_PAYMENT });
    setEnvs([]);
    setMerchant("");
    setSecret("");
    setStore("");
    setMinAmount("0");
    setCycle("D+1");
    setDelay("0");
    setModal({ mode: "add" });
  };

  const openEdit = (row: PaymentRow) => {
    const { id, ...rest } = row;
    setForm({ ...rest });
    setEnvs(row.env ? row.env.split("、") : []);
    setModal({ mode: "edit", id });
  };

  const submit = () => {
    if (!form.name.trim()) {
      show("请输入配置名称");
      return;
    }
    const payload: Omit<PaymentRow, "id"> = {
      ...form,
      env: envs.join("、"),
    };
    if (modal?.mode === "edit" && modal.id) {
      setRows((current) =>
        current.map((row) => (row.id === modal.id ? { ...payload, id: row.id } : row)),
      );
      show("保存成功");
    } else {
      setRows((current) => [...current, { ...payload, id: Date.now() }]);
      show("新增成功");
    }
    setModal(null);
  };

  return (
    <div className="sk-page">
      <SkCard className="sk-fill">
        <div className="sk-toolbar">
          <div className="sk-title">支付配置</div>
          <div className="sk-toolbar-actions">
            <SkButton onClick={() => setSplitOpen(true)}>
              <span className="sk-gear-icon">⚙</span>分账配置
            </SkButton>
            <SkButton variant="primary" onClick={openAdd}>
              <span className="sk-plus">+</span>新增配置
            </SkButton>
          </div>
        </div>
        <SkTable
          columns={[
            { key: "name", title: "配置名称" },
            { key: "account", title: "所属公司账户" },
            { key: "method", title: "支付方式" },
            { key: "channel", title: "支付通道" },
            { key: "fee", title: "手续费" },
            { key: "env", title: "使用环境" },
            { key: "status", title: "状态" },
            { key: "op", title: "操作" },
          ]}
          rows={rows.map((row) => [
            row.name,
            row.account,
            row.method,
            row.channel,
            row.fee ? `${row.fee}%` : "--",
            row.env || "--",
            <SkSwitch
              key="s"
              checked={row.status}
              onChange={(checked) =>
                setRows((current) =>
                  current.map((item) =>
                    item.id === row.id ? { ...item, status: checked } : item,
                  ),
                )
              }
            />,
            <span key="op">
              <SkActionLink onClick={() => openEdit(row)}>编辑</SkActionLink>
              <SkActionLink danger onClick={() => setRemoveId(row.id)}>
                删除
              </SkActionLink>
            </span>,
          ])}
        />
      </SkCard>

      <SkModal
        open={modal !== null}
        title={modal?.mode === "edit" ? "编辑支付配置" : "新增支付配置"}
        width={760}
        onClose={() => setModal(null)}
        footer={
          <>
            <SkButton onClick={() => setModal(null)}>取 消</SkButton>
            <SkButton variant="primary" onClick={submit}>
              保 存
            </SkButton>
          </>
        }
      >
        <div className="sk-modal-form">
          <div className="sk-form-grid">
            <Field label="配置名称" required>
              <SkInput
                placeholder="请输入配置名称"
                value={form.name}
                onChange={(value) => setForm((current) => ({ ...current, name: value }))}
              />
            </Field>
            <Field label="所属公司收支账户">
              <SkSelect
                value={form.account}
                options={[`${ACCOUNT.company} / 住宿费`]}
                onChange={(value) => setForm((current) => ({ ...current, account: value }))}
              />
            </Field>
            <Field label="支付方式">
              <SkSelect
                value={form.method}
                options={["微信支付", "支付宝", "银联"]}
                onChange={(value) => setForm((current) => ({ ...current, method: value }))}
              />
            </Field>
            <Field label="支付通道">
              <SkSelect
                value={form.channel}
                options={["聚合支付（乐刷）", "微信支付直连", "支付宝直连"]}
                onChange={(value) => setForm((current) => ({ ...current, channel: value }))}
              />
            </Field>
            <Field label="手续费">
              <div className="sk-input-suffix">
                <SkInput
                  value={form.fee}
                  onChange={(value) => setForm((current) => ({ ...current, fee: value }))}
                />
                <span>%</span>
              </div>
            </Field>
            <Field label="最低支付金额（元）">
              <SkInput value={minAmount} onChange={setMinAmount} />
            </Field>
            <Field label="结算周期">
              <SkSelect
                value={cycle}
                options={["D+0", "D+1", "T+0", "T+1"]}
                onChange={setCycle}
              />
            </Field>
            <Field label="延迟结算日期">
              <SkInput value={delay} onChange={setDelay} />
            </Field>
            <Field label="支付配置 / 使用环境" className="is-full">
              <div className="sk-check-row">
                {["微信网页", "微信小程序", "APP", "微信付款码"].map((env) => (
                  <SkCheckbox
                    key={env}
                    label={env}
                    checked={envs.includes(env)}
                    onChange={(checked) =>
                      setEnvs((current) =>
                        checked ? [...current, env] : current.filter((item) => item !== env),
                      )
                    }
                  />
                ))}
              </div>
            </Field>
            <Field label="商户号">
              <SkInput placeholder="请填写商户号" value={merchant} onChange={setMerchant} />
            </Field>
            <Field label="密钥">
              <SkInput placeholder="请填写对应密钥" value={secret} onChange={setSecret} />
            </Field>
            <Field label="门店编号">
              <SkInput placeholder="可不填写" value={store} onChange={setStore} />
            </Field>
          </div>
        </div>
      </SkModal>

      <SkModal
        open={splitOpen}
        title="分账配置"
        width={480}
        onClose={() => setSplitOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setSplitOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                setSplitOpen(false);
                show("分账配置已保存");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <Field label="是否启用分账">
          <div className="sk-inner-switch-row">
            <SkSwitch checked={splitEnabled} onChange={setSplitEnabled} />
            <span className="sk-inner-switch-label">{splitEnabled ? "启用" : "不启用"}</span>
          </div>
        </Field>
      </SkModal>

      <SkConfirm
        open={removeId !== null}
        content="确定删除该支付配置吗？"
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
