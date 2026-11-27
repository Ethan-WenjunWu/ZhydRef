"use client";

import { useState } from "react";

import {
  SkButton,
  SkInput,
  SkModal,
  SkPagination,
  SkSelect,
  SkTable,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "../office/common";

export function AirconManagementPage() {
  const { show, node } = useSkMessage();
  return (
    <div className="pp-page pp-plain-page">
      <div className="pp-content-card is-plain">
        <div className="pp-search-top"><span>未选择筛选字段</span><span className="pp-search-top-actions"><span className="sk-link">清除选项</span><span>收起 ⌃</span></span></div>
        <div className="pp-filter-grid is-five">
          <OfficeField label="区间类型"><SkSelect placeholder="请选择" options={["小时", "天"]} /></OfficeField>
          <OfficeField label="申请区域"><SkSelect placeholder="请选择" options={["宿舍楼01", "智慧园区"]} /></OfficeField>
          <OfficeField label="单据编号"><SkInput /></OfficeField>
          <OfficeField label="单据状态"><SkSelect placeholder="请选择单据状态" options={["待审批", "已通过"]} /></OfficeField>
          <OfficeField label="申请人员"><SkInput /></OfficeField>
          <OfficeField label="电话"><SkInput /></OfficeField>
          <OfficeField label="申请类型"><SkSelect placeholder="请选择申请类型" options={["制冷", "制热"]} /></OfficeField>
          <OfficeField label="使用日期"><SkInput type="date" /></OfficeField>
          <OfficeField label="申请时间"><SkInput type="date" /></OfficeField>
          <div className="pp-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton><SkButton>重置</SkButton></div>
        </div>
      </div>
      <div className="pp-list-card">
        <div className="pp-list-head"><strong>空调申请列表</strong><div className="pp-toolbar-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton>更多 ⌄</SkButton></div></div>
        <SkTable
          className="pp-wide-table"
          columns={["单据编号", "单据状态", "业户名称", "申请人员", "项目/楼宇/房号", "申请区域", "电话", "申请类型", "使用日期", "使用时长", "总金额", "区间类型", "申请时间", "操作"].map((title, index) => ({ key: String(index), title }))}
          rows={[]}
        />
      </div>
      {node}
    </div>
  );
}

export function AirconTimePage() {
  const [rows, setRows] = useState([["默认规则", "默认规则", "18:00 ~ 21:00", "全部", ""]]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const { show, node } = useSkMessage();
  return (
    <div className="pp-page pp-plain-page">
      <div className="pp-content-card is-plain">
        <div className="pp-search-top"><span>未选择筛选字段</span><span className="pp-search-top-actions"><span className="sk-link">清除选项</span><span>收起 ⌃</span></span></div>
        <div className="pp-search-row">
          <OfficeField label="规则名称"><SkInput /></OfficeField>
          <div className="pp-filter-actions"><SkButton variant="primary">搜索</SkButton><SkButton>重置</SkButton></div>
        </div>
      </div>
      <div className="pp-list-card">
        <div className="pp-list-head"><strong>空调时间设置列表</strong><div className="pp-toolbar-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => setOpen(true)}>添加</SkButton></div></div>
        <SkTable
          columns={[
            { key: "name", title: "规则名称" },
            { key: "type", title: "规则类型" },
            { key: "detail", title: "规则详情" },
            { key: "project", title: "所属项目" },
            { key: "status", title: "状态" },
            { key: "op", title: "操作" },
          ]}
          rows={rows.map((row) => [
            row[0],
            row[1],
            <div key="detail" className="pp-rule-detail">{row[2]}</div>,
            row[3],
            <span key="status" className="pp-status-switch" />,
            <span key="op" className="sk-action-link" onClick={() => show("编辑规则")}>编辑</span>,
          ])}
        />
        <SkPagination total={rows.length} pageSize={20} showTotal />
      </div>
      <SkModal
        open={open}
        title="添加规则"
        width={560}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim() || !start || !end) {
                  show("请填写规则名称和时间");
                  return;
                }
                setRows((current) => [...current, [name, "自定义", `${start} ~ ${end}`, "全部", ""]]);
                setOpen(false);
                show("添加成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="pp-modal-form">
          <OfficeField label="规则名称" required><SkInput value={name} onChange={setName} /></OfficeField>
          <OfficeField label="开放时间" required>
            <div className="pp-date-pair"><SkInput type="time" value={start} onChange={setStart} /><span>~</span><SkInput type="time" value={end} onChange={setEnd} /></div>
          </OfficeField>
          <OfficeField label="所属项目"><SkSelect placeholder="请选择" options={["全部", "智慧园区", "宿舍楼01"]} /></OfficeField>
        </div>
      </SkModal>
      {node}
    </div>
  );
}
