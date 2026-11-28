"use client";

import { useState } from "react";

import { SkButton, useSkMessage } from "../app/SettingsUI";
import { DataPage, DtStats } from "./common";

const TITLES: Record<string, string> = {
  "lease-drawing": "资管房态图",
  "property-drawing": "物管房态图",
  "apartment-drawing": "公寓房态图",
  "parking-drawing": "车位房态图",
};

export function FloorPlanPage({ kind }: { kind: string }) {
  const { show, node } = useSkMessage();
  const [building, setBuilding] = useState("宿舍楼01");
  const [floor, setFloor] = useState("1");
  return (
    <DataPage className="dt-floorplan-page">
      <aside className="dt-floor-tree">
        <div className="dt-floor-company">大连华安物业管理有限公司</div>
        <div className="dt-floor-project">智慧园区</div>
        {["宿舍楼01", "测试项目"].map((name) => (
          <button key={name} type="button" className={`dt-floor-building${building === name ? " is-active" : ""}`} onClick={() => setBuilding(name)}>▾ {name}</button>
        ))}
        <div className="dt-floor-floors">
          {["B1", "1", "2", "3", "4", "5"].map((item) => (
            <button key={item} type="button" className={floor === item ? "is-active" : ""} onClick={() => setFloor(item)}>{item}</button>
          ))}
        </div>
      </aside>
      <section className="dt-floor-main">
        <div className="dt-floor-head">
          <h2>{TITLES[kind]} · {building}</h2>
          <div className="dt-actions">
            <SkButton onClick={() => show("展示2D平面图")}>展示2D平面图</SkButton>
            <SkButton>更多 ⌄</SkButton>
          </div>
        </div>
        <DtStats
          items={[
            ["管理面积", "20㎡", "总资源250"],
            ["空置招商面积", "0㎡", "资源250(100%)"],
            ["在租面积", "0㎡", "资源0(0%)"],
            ["在租实时均价", "¥0/㎡·天", "月环比 0%"],
            ["年租金收益", "¥16.67", "累计 ¥16.67"],
            ["出租率", "0%", "月环比 0%"],
            ["计租率", "0%", "预计全年0%"],
          ]}
          columns={7}
        />
        <div className="dt-floor-legend">
          {["空置中", "招商中", "已锁定", "已出租", "拖欠经营", "90日内到期", "30日内到期", "已到期"].map((item, index) => <span key={item}><i className={`is-${index}`} />{item}</span>)}
        </div>
        <div className="dt-floor-grid">
          {["1", "2", "3", "4"].map((fl) => (
            <div key={fl} className="dt-floor-row">
              <span className="dt-floor-num">{fl}</span>
              <div className="dt-floor-rooms">
                {Array.from({ length: 50 }, (_, index) => `${fl}${String(index + 1).padStart(2, "0")}`).map((room) => (
                  <button key={room} type="button" className="dt-room" onClick={() => show(`${room}：0㎡ 空置331日`)}>
                    <strong>{room} (0㎡)</strong>
                    <span>空置331日</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {node}
    </DataPage>
  );
}
