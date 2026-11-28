"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { SkActionLink, SkButton, SkConfirm, SkTable, useSkMessage } from "../app/SettingsUI";
import { OpPage } from "../operation/common";
import {
  CusGear,
  CusMenu,
  CusSearchHeader,
  CusStats,
  CusTableCard,
  ExtendFieldsDrawer,
  ImportModal,
  OwnerFormDrawer,
  TagsDrawer,
} from "./common";

const COMPANY_COLUMNS = [
  "客商名称",
  "标签",
  "财务客商编码",
  "注册地址",
  "营业期限",
  "纳税人识别号(开票信息)",
  "成立日期",
  "所属地区",
  "组织机构代码",
  "开户银行",
  "账户",
  "所属行业",
  "公司类型",
  "行业分类",
  "联系人",
  "证件号码",
  "联系电话",
  "客商类别",
  "默认发票类型",
  "推荐展示",
  "操作",
];

const PERSON_COLUMNS = ["客商名称", "标签", "财务客商编码", "联系人", "证件号码", "联系电话", "客商类别", "操作"];

export function TenantsPage() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [importOpen, setImportOpen] = useState(false);
  const [extendOpen, setExtendOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState<"owner" | "industry" | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { show, node } = useSkMessage();

  const actions = (
    <span className="cus-op-links">
      <SkActionLink onClick={() => router.push("/orgs/customer/tenant-detail")}>查看</SkActionLink>
      <SkActionLink
        onClick={() => {
          setFormMode("edit");
          setFormOpen(true);
        }}
      >
        编辑
      </SkActionLink>
      <SkActionLink danger onClick={() => setDeleteOpen(true)}>
        删除
      </SkActionLink>
    </span>
  );

  const companyRows: ReactNode[][] = [];
  const personRows: ReactNode[][] = [
    ["A01", "", "", "A01", "", "13100000000", "客户", actions],
  ];

  return (
    <OpPage>
      <CusSearchHeader
        placeholder="请搜索业户名称"
        actionLabel="归档业户列表"
        onAction={() => router.push("/orgs/customer/tenant-archive")}
        onSearch={() => show("查询成功")}
      />

      <CusStats
        items={[
          ["业户总数", "1"],
          ["企业总数", "0"],
          ["个人总数", "1"],
          [
            <span key="contract" className="cus-stat-label">
              合同数量 <i className="cus-hint">?</i>
            </span>,
            "0",
          ],
        ]}
      />

      <CusTableCard
        tabs={["企业列表", "个人列表"]}
        activeTab={tab}
        onTabChange={setTab}
        columns={tab === 0 ? COMPANY_COLUMNS : PERSON_COLUMNS}
        rows={tab === 0 ? companyRows : personRows}
        total={tab === 0 ? 0 : 1}
        toolbar={
          <>
            <CusGear columns={tab === 0 ? COMPANY_COLUMNS.slice(0, -1) : PERSON_COLUMNS.slice(0, -1)} />
            <CusMenu
              items={[
                { key: "import", label: "导入数据", onClick: () => setImportOpen(true) },
                { key: "export", label: "导出数据", onClick: () => show("导出成功") },
                { key: "extend", label: "拓展字段", onClick: () => setExtendOpen(true) },
                { key: "owner-tag", label: "客商标签", onClick: () => setTagsOpen("owner") },
                { key: "industry-tag", label: "行业标签", onClick: () => setTagsOpen("industry") },
              ]}
            />
            <SkButton
              variant="primary"
              onClick={() => {
                setFormMode("add");
                setFormOpen(true);
              }}
            >
              + 业户
            </SkButton>
          </>
        }
      />

      <ImportModal
        open={importOpen}
        title="导入业户"
        onClose={() => setImportOpen(false)}
        onConfirm={() => {
          setImportOpen(false);
          show("导入成功");
        }}
      />
      <ExtendFieldsDrawer open={extendOpen} onClose={() => setExtendOpen(false)} message={show} />
      <TagsDrawer
        open={tagsOpen === "owner"}
        title="客商标签"
        addTitle="新建客商标签"
        onClose={() => setTagsOpen(null)}
        message={show}
      />
      <TagsDrawer
        open={tagsOpen === "industry"}
        title="行业标签"
        addTitle="新建行业标签"
        onClose={() => setTagsOpen(null)}
        message={show}
      />
      <OwnerFormDrawer
        open={formOpen}
        mode={formMode}
        onClose={() => setFormOpen(false)}
        onSave={() => {
          setFormOpen(false);
          show("保存成功");
        }}
        message={show}
      />
      <SkConfirm
        open={deleteOpen}
        content="确认删除该业户联系人吗？"
        okText="确 认"
        onCancel={() => setDeleteOpen(false)}
        onOk={() => {
          setDeleteOpen(false);
          show("删除成功");
        }}
        danger
      />
      {node}
    </OpPage>
  );
}

export function TenantArchivePage() {
  const { show, node } = useSkMessage();
  return (
    <OpPage>
      <div className="op-card cus-archive-head">
        <strong>归档业户列表</strong>
        <CusSearchHeader placeholder="请搜索业户名称" onSearch={() => show("查询成功")} />
      </div>
      <div className="op-card cus-table-card">
        <div className="cus-table-head">
          <div className="op-table-tabs">
            <button type="button" className="is-active">企业列表</button>
          </div>
          <div className="op-actions">
            <CusGear columns={COMPANY_COLUMNS.slice(0, -1)} />
          </div>
        </div>
        <SkTable
          className="op-wide-table"
          columns={COMPANY_COLUMNS.map((title, index) => ({ key: String(index), title }))}
          rows={[]}
        />
      </div>
      {node}
    </OpPage>
  );
}
