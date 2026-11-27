"use client";

import { useState } from "react";

import {
  SkButton,
  SkDrawer,
  SkEmpty,
  SkInput,
  SkSelect,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { SubSidebar, type SubMenuItem } from "./common";

const ENERGY_ITEMS: SubMenuItem[] = [
  { name: "表管理" },
  { name: "能耗统计" },
  {
    name: "智能表",
    children: [
      { name: "智能电表" },
      { name: "智能水表" },
      { name: "网关管理" },
      { name: "充值记录" },
      { name: "阈值提醒" },
    ],
  },
  {
    name: "系统设置",
    children: [
      { name: "表种类管理" },
      { name: "抄表计划" },
      { name: "价格标准" },
    ],
  },
];

export function EnergyPage() {
  const [active, setActive] = useState("表管理");
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [usage, setUsage] = useState("");
  const [location, setLocation] = useState("");
  const [payType, setPayType] = useState("");
  const [owner, setOwner] = useState("");
  const [reading, setReading] = useState("");
  const { show, node } = useSkMessage();

  return (
    <div className="pp-page pp-workorder-page">
      <SubSidebar
        brand="水电抄表"
        icon="org-menu-shuidianchaobiao"
        items={ENERGY_ITEMS}
        active={active}
        onChange={setActive}
        
      />
      <section className="pp-main">
        {active === "表管理" ? (
          <>
            <div className="pp-search-area">
              <div className="pp-filter-grid is-five">
                <OfficeField label="项目"><SkSelect defaultValue="智慧园区" options={["智慧园区", "宿舍楼01"]} /></OfficeField>
                <OfficeField label="楼宇"><SkSelect defaultValue="宿舍楼01" options={["宿舍楼01", "宿舍楼02"]} /></OfficeField>
                <OfficeField label="表用途"><SkInput placeholder="请输入表用途" value={usage} onChange={setUsage} /></OfficeField>
                <OfficeField label="表名称"><SkInput placeholder="请输入表名称" value={name} onChange={setName} /></OfficeField>
                <OfficeField label="表编号"><SkInput placeholder="请输入表编号" value={code} onChange={setCode} /></OfficeField>
                <div className="pp-filter-actions">
                  <SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton>
                  <SkButton onClick={() => { setUsage(""); setName(""); setCode(""); }}>重置</SkButton>
                </div>
              </div>
            </div>
            <div className="pp-list-card">
              <div className="pp-meter-tabs">
                <SkTabs items={["电表(0)", "水表(0)"]} active={tab} onChange={setTab} />
                <div className="pp-toolbar-actions">
                  <SkButton onClick={() => show("账单生成成功")}>一键生成账单</SkButton>
                  <SkButton variant="primary" onClick={() => setOpen(true)}>新建表 ⌄</SkButton>
                  <SkButton onClick={() => show("刷新成功")}>刷新</SkButton>
                  <SkButton>更多 ⌄</SkButton>
                </div>
              </div>
              <SkTable
                className="pp-wide-table"
                columns={[
                  { key: "name", title: "表名称" },
                  { key: "code", title: "表具编号" },
                  { key: "usage", title: "用途" },
                  { key: "location", title: "绑定位置" },
                  { key: "pay", title: "付费类型" },
                  { key: "rest", title: tab === 0 ? "剩余电量" : "剩余水量" },
                  { key: "date", title: "本期抄表日期" },
                  { key: "reading", title: "本期读数" },
                  { key: "lastDate", title: "上期抄表日期" },
                  { key: "lastReading", title: "上期读数" },
                  { key: "amount", title: "本期用量" },
                  { key: "owner", title: "本期负责人" },
                  { key: "device", title: "智能设备" },
                  { key: "status", title: "状态" },
                ]}
                rows={[]}
              />
            </div>
          </>
        ) : active === "能耗统计" ? (
          <div className="pp-content-card">
            <div className="pp-card-head"><strong>能耗统计</strong></div>
            <SkEmpty text="暂无数据" />
          </div>
        ) : (
          <div className="pp-content-card">
            <div className="pp-card-head"><strong>{active}</strong><SkButton variant="primary" onClick={() => show("新增成功")}>+ 新增</SkButton></div>
            <SkTable
              columns={[
                { key: "name", title: "名称" },
                { key: "code", title: "编号" },
                { key: "status", title: "状态" },
                { key: "time", title: "更新时间" },
                { key: "op", title: "操作" },
              ]}
              rows={[]}
            />
          </div>
        )}
      </section>

      <SkDrawer
        open={open}
        title={tab === 0 ? "新建电表" : "新建水表"}
        width={620}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim() || !code.trim()) {
                  show("请输入表名称和表编号");
                  return;
                }
                setOpen(false);
                show("新建成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="pp-drawer-form">
          <OfficeField label="表名称" required><SkInput value={name} onChange={setName} /></OfficeField>
          <OfficeField label="表编号" required><SkInput value={code} onChange={setCode} /></OfficeField>
          <OfficeField label="用途"><SkInput value={usage} onChange={setUsage} /></OfficeField>
          <OfficeField label="绑定位置"><SkInput value={location} onChange={setLocation} placeholder="请选择绑定位置" /></OfficeField>
          <OfficeField label="付费类型">
            <SkSelect value={payType} options={["预付费", "后付费"]} onChange={setPayType} placeholder="请选择" />
          </OfficeField>
          <OfficeField label="本期负责人"><SkSelect value={owner} options={["王", "郑维修长", "常安保长"]} onChange={setOwner} placeholder="请选择" /></OfficeField>
          <OfficeField label="初始读数"><SkInput value={reading} onChange={setReading} placeholder="请输入初始读数" /></OfficeField>
        </div>
      </SkDrawer>
      {node}
    </div>
  );
}
