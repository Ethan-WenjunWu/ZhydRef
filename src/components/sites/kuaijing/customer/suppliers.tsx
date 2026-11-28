"use client";

import { useState } from "react";

import { SkButton, useSkMessage } from "../app/SettingsUI";
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

const SUPPLIER_COLUMNS = [
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

export function SuppliersPage() {
  const [importOpen, setImportOpen] = useState(false);
  const [extendOpen, setExtendOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState<"owner" | "industry" | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const { show, node } = useSkMessage();

  return (
    <OpPage>
      <CusSearchHeader placeholder="请搜索供应商名称" onSearch={() => show("查询成功")} />

      <CusStats
        items={[
          ["供应商数量", "0"],
          ["企业供应商", "0"],
          ["个人供应商", "0"],
        ]}
      />

      <CusTableCard
        tabs={["企业供应商"]}
        activeTab={0}
        columns={SUPPLIER_COLUMNS}
        rows={[]}
        total={0}
        toolbar={
          <>
            <CusGear columns={SUPPLIER_COLUMNS.slice(0, -1)} />
            <CusMenu
              items={[
                { key: "import", label: "导入数据", onClick: () => setImportOpen(true) },
                { key: "export", label: "导出数据", onClick: () => show("导出成功") },
                { key: "extend", label: "拓展字段", onClick: () => setExtendOpen(true) },
                { key: "owner-tag", label: "客商标签", onClick: () => setTagsOpen("owner") },
                { key: "industry-tag", label: "行业标签", onClick: () => setTagsOpen("industry") },
              ]}
            />
            <SkButton variant="primary" onClick={() => setFormOpen(true)}>+ 供应商</SkButton>
          </>
        }
      />

      <ImportModal
        open={importOpen}
        title="导入供应商"
        onClose={() => setImportOpen(false)}
        onConfirm={() => { setImportOpen(false); show("导入成功"); }}
      />
      <ExtendFieldsDrawer open={extendOpen} onClose={() => setExtendOpen(false)} message={show} />
      <TagsDrawer open={tagsOpen === "owner"} title="客商标签" addTitle="新建客商标签" onClose={() => setTagsOpen(null)} message={show} />
      <TagsDrawer open={tagsOpen === "industry"} title="行业标签" addTitle="新建行业标签" onClose={() => setTagsOpen(null)} message={show} />
      <OwnerFormDrawer
        open={formOpen}
        mode="supplier"
        onClose={() => setFormOpen(false)}
        onSave={() => { setFormOpen(false); show("保存成功"); }}
        message={show}
      />
      {node}
    </OpPage>
  );
}
