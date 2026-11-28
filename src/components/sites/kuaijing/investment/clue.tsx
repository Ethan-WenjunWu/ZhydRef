"use client";

import { useState } from "react";

import { SkButton, SkDrawer, SkInput, SkSelect, SkTable, SkTabs, useSkMessage } from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { OpPage, OpStats } from "../operation/common";

const COLUMNS = ["客户名称", "客户电话", "公司", "线索状态", "线索来源", "所属渠道公司", "更新时间", "意向项目", "需求面积段", "备注", "操作"];
const COLUMNS_ALL = [...COLUMNS.slice(0, 10), "跟进人员", "操作"];

export function CluePage() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");
  const [source, setSource] = useState("");
  const { show, node } = useSkMessage();

  return (
    <OpPage>
      <div className="inv-clue-card">
        <div className="inv-clue-tabs">
          <SkTabs items={["我的线索", "全部线索", "线索公海", "线索审核", "跟进状态"]} active={tab} onChange={setTab} />
          <div className="op-actions"><SkButton onClick={() => show("大数据获客")}>大数据获客</SkButton><SkButton onClick={() => show("提交线索字段配置")}>提交线索字段配置</SkButton>{tab === 1 ? null : <SkButton onClick={() => show("线索配置")}>线索配置</SkButton>}</div>
        </div>

        {tab === 4 ? (
          <div className="inv-follow-status">
            <div className="pp-card-head"><span /><SkButton variant="primary" onClick={() => show("新增状态")}>+ 新增状态</SkButton></div>
            <SkTable
              columns={[{ key: "sort", title: "排序" }, { key: "status", title: "跟进状态" }, { key: "desc", title: "阶段描述" }, { key: "op", title: "操作" }]}
              rows={[
                ["1", "未联系", "内置线索状态", <span key="op" className="sk-action-link">编辑</span>],
                ["1", "初步沟通", "内置线索状态", <span key="op" className="sk-action-link">编辑</span>],
                ["-", "无效线索", "内置线索状态", <span key="op" className="sk-action-link">编辑</span>],
                ["-", "转意向客户", "内置线索状态", <span key="op" className="sk-action-link">编辑</span>],
              ]}
            />
          </div>
        ) : (
          <>
            {tab !== 2 ? <OpStats items={[["总线索数量", "0"], ["本日新增数量", "0"], ["本月新增数量", "0"], ["无效线索数量", "0"], ["本月线索转化率", "0%"]]} columns={5} /> : null}
            <div className="inv-filter-row">
              <OfficeField label="客户名称"><SkInput /></OfficeField>
              <OfficeField label="客户电话"><SkInput /></OfficeField>
              <OfficeField label="公司"><SkInput /></OfficeField>
              <OfficeField label="意向项目"><SkSelect placeholder="请选择意向项目" /></OfficeField>
              <OfficeField label="线索来源"><SkSelect placeholder="请选择线索来源" /></OfficeField>
              <OfficeField label={tab === 3 ? "审批状态" : "创建时间"}>{tab === 3 ? <SkSelect placeholder="请选择审批状态" /> : <SkInput type="date" />}</OfficeField>
              <div className="op-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
            </div>
            <div className="pp-card-head"><strong>{["我的线索", "全部线索", "线索公海", "线索审核"][tab]}</strong><div className="op-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton>{tab === 0 ? <SkButton onClick={() => show("导入线索")}>导入线索</SkButton> : null}<SkButton onClick={() => show("导出线索")}>导出线索</SkButton>{tab <= 1 ? <SkButton variant="primary" onClick={() => setOpen(true)}>+新增线索</SkButton> : null}{tab === 2 ? <SkButton onClick={() => show("批量指定分配")}>批量指定分配</SkButton> : null}<SkButton>更多 ⌄</SkButton></div></div>
            <SkTable className="op-wide-table" columns={(tab === 1 ? COLUMNS_ALL : COLUMNS).map((title, index) => ({ key: String(index), title }))} rows={[]} />
          </>
        )}
      </div>

      <SkDrawer
        open={open}
        title="自建线索"
        width={560}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim() || !phone.trim()) {
                  show("请输入客户名称和手机号");
                  return;
                }
                setOpen(false);
                show("提交成功");
              }}
            >
              提 交
            </SkButton>
          </>
        }
      >
        <div className="pp-drawer-form">
          <OfficeField label="意向项目" required><SkSelect value={project} options={["智慧园区", "测试项目"]} onChange={setProject} placeholder="请选择" /></OfficeField>
          <OfficeField label="客户名称" required><SkInput value={name} onChange={setName} placeholder="请输入客户名称" /></OfficeField>
          <OfficeField label="客户手机号" required><SkInput value={phone} onChange={setPhone} placeholder="请输入客户手机号" /></OfficeField>
          <OfficeField label="公司"><SkInput value={company} onChange={setCompany} placeholder="请输入所属公司" /></OfficeField>
          <OfficeField label="需求面积段"><div className="pp-date-pair"><SkInput placeholder="最小值" /><span>~</span><SkInput placeholder="最大值" /></div></OfficeField>
          <OfficeField label="备注"><textarea className="sk-textarea" value={note} onChange={(event) => setNote(event.target.value)} placeholder="请输入备注" /></OfficeField>
          <OfficeField label="来源"><SkSelect value={source} options={["线上推广", "渠道推荐", "到访"]} onChange={setSource} placeholder="请选择来源" /></OfficeField>
          <OfficeField label="关联渠道人员"><SkSelect placeholder="请选择" /></OfficeField>
        </div>
      </SkDrawer>
      {node}
    </OpPage>
  );
}
