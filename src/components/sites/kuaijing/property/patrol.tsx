"use client";

import { useState } from "react";

import { SpriteIcon } from "../app/icons";
import {
  SkButton,
  SkEmpty,
  SkInput,
  SkPagination,
  SkSelect,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { SubSidebar, type SubMenuItem } from "./common";

function StatRow({ items }: { items: Array<[string, string]> }) {
  return (
    <div className="wo-mini-stat-row">
      {items.map(([label, value]) => (
        <div key={label} className="wo-mini-stat"><span>{label}</span><strong>{value}</strong></div>
      ))}
    </div>
  );
}

const PATROL_PARAMS: SubMenuItem[] = [
  { name: "巡检点设置" },
  { name: "巡检点标签" },
  { name: "位置设置" },
  { name: "表单设置" },
  { name: "编号设置" },
];

const PATROL_ITEMS: SubMenuItem[] = [
  { name: "数据看板" },
  { name: "巡检台账" },
  { name: "巡检计划" },
  { name: "巡检任务" },
  { name: "参数设置", children: PATROL_PARAMS },
];

const SERVICE_PLAN_ITEMS: SubMenuItem[] = [
  { name: "数据看板" },
  { name: "巡检台账" },
  { name: "服务计划" },
  { name: "计划任务" },
  { name: "参数设置", children: PATROL_PARAMS },
];

const CONFIG: Record<string, { brand: string; items: SubMenuItem[]; noun: string; point: string }> = {
  equipment: { brand: "设备巡检", items: PATROL_ITEMS, noun: "巡检", point: "巡检点" },
  security: { brand: "安防巡更", items: PATROL_ITEMS, noun: "巡检", point: "巡检点" },
  quality: { brand: "品质核查", items: PATROL_ITEMS, noun: "巡检", point: "巡检点" },
  green: { brand: "绿化检查", items: PATROL_ITEMS, noun: "巡检", point: "巡检点" },
  clean: { brand: "保洁检查", items: PATROL_ITEMS, noun: "巡检", point: "巡检点" },
  plan: { brand: "服务计划", items: SERVICE_PLAN_ITEMS, noun: "服务", point: "事项" },
};

const STATS = [
  ["任务完成数", "0", "完成率 0 %", "org-menu-shebeixunjian"],
  ["累计发现异常", "0", "异常率 0 %", "org-menu-anfangxungeng"],
  ["超时任务数", "0", "超时率 0 %", "org-menu-riqishiqu"],
  ["整改完成率", "0 %", "跳过率 0 %", "org-menu-pinzhihecha"],
];

export function PatrolPage({ variant }: { variant: keyof typeof CONFIG }) {
  const config = CONFIG[variant];
  const [active, setActive] = useState("数据看板");
  const { show, node } = useSkMessage();

  return (
    <div className="pp-page pp-workorder-page">
      <SubSidebar
        brand={config.brand}
        icon="org-menu-shebeixunjian"
        items={config.items}
        active={active}
        onChange={setActive}
        defaultOpen={["参数设置"]}
      />
      <section className="pp-main">
        {active === "数据看板" ? (
          <div className="pp-dashboard pp-patrol-dashboard">
            <div className="pp-stat-grid is-four">
              {STATS.map(([label, value, sub, icon]) => (
                <div key={label} className="pp-stat-card is-filled">
                  <div><span>{label}</span><strong>{value}</strong><small>{sub}</small></div>
                  <span className="pp-stat-icon"><SpriteIcon name={icon} /></span>
                </div>
              ))}
            </div>

            <div className="pp-panel">
              <div className="pp-panel-head">
                <strong>任务统计</strong>
                <div className="pp-panel-filters">
                  <span>日期</span>
                  <SkInput type="date" />
                  <SkInput type="date" />
                  <SkButton onClick={() => show("任务统计详情")}>详 情</SkButton>
                </div>
              </div>
              <SkEmpty text="暂无数据" />
            </div>

            <div className="pp-panel">
              <div className="pp-panel-head">
                <strong>{config.point}统计</strong>
                <div className="pp-panel-filters">
                  <span>日期</span>
                  <SkInput type="date" />
                  <SkInput type="date" />
                  <SkSelect placeholder={`请选择${config.point}`} />
                  <SkButton>详 情</SkButton>
                </div>
              </div>
              <div className="pp-ring-row">
                <div className="pp-ring-kpis">
                  <span>应巡检次数</span>
                  <strong>0</strong>
                  <span>完成率</span>
                  <strong>0%</strong>
                </div>
                {[["正常", "0%"], ["异常", "0%"], ["跳过", "0%"]].map(([label, value]) => (
                  <div key={label} className="pp-ring">
                    <div className="pp-ring-inner"><span>{label}</span><strong>{value}</strong></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pp-panel">
              <div className="pp-panel-head">
                <strong>异常统计</strong>
                <div className="pp-panel-filters">
                  <span>日期</span>
                  <SkInput type="date" />
                  <SkInput type="date" />
                  <SkSelect placeholder="请选择计划" />
                  <SkSelect placeholder="全部" />
                  <SkButton onClick={() => show("导出成功")}>导 出</SkButton>
                </div>
              </div>
              <SkTable
                columns={[
                  { key: "point", title: `${config.point}名称` },
                  { key: "plan", title: "计划名称" },
                  { key: "time", title: "巡检时间" },
                  { key: "person", title: "巡检人" },
                  { key: "improver", title: "整体改进人" },
                  { key: "status", title: "状态" },
                ]}
                rows={[]}
              />
            </div>

            <div className="pp-panel">
              <div className="pp-panel-head">
                <strong>岗位统计</strong>
                <div className="pp-panel-filters">
                  <span>日期</span>
                  <SkInput type="date" />
                  <SkButton onClick={() => show("导出成功")}>导 出</SkButton>
                </div>
              </div>
              <SkTable
                columns={[
                  { key: "post", title: "责任岗位" },
                  { key: "should", title: "应巡检次数" },
                  { key: "actual", title: "实际巡检次数" },
                  { key: "normal", title: "正常" },
                  { key: "abnormal", title: "异常" },
                  { key: "skip", title: "跳过" },
                ]}
                rows={[]}
              />
            </div>
          </div>
        ) : active === "巡检台账" ? (
          <div className="pp-content-card is-plain">
            <div className="pp-filter-grid is-five">
              <OfficeField label="日期"><SkInput type="date" /></OfficeField>
              <OfficeField label="所属项目"><SkSelect placeholder="请选择" options={["智慧园区", "宿舍楼01"]} /></OfficeField>
              <OfficeField label="巡检计划"><SkSelect placeholder="请选择" /></OfficeField>
              <OfficeField label="供应商"><SkSelect placeholder="请选择" /></OfficeField>
              <div className="pp-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>确 定</SkButton><SkButton>重 置</SkButton></div>
            </div>
            <div className="wo-ledger-note">当前所统计的各项指标，均以每个日期当日的实际操作为统计基准。以巡检点数量和巡检资产数量为例，二者均依据实际完成巡检点的数量进行统计的。不过，若在当日同一巡检点存在多次巡检任务，系统会对巡检点数和巡检资产数进行去重处理。</div>
            <div className="wo-tabs-row"><SkTabs items={["列表", "图表"]} active={0} onChange={() => show("图表视图")} /><SkButton onClick={() => show("导出成功")}>导 出</SkButton></div>
            <SkTable
              columns={[{ key: "date", title: "日期" }, { key: "point", title: "巡检点数量" }, { key: "asset", title: "巡检资产数量" }, { key: "normal", title: "正常数量" }, { key: "open", title: "异常未整改数量" }, { key: "fixed", title: "异常已整改数量" }, { key: "skip", title: "跳过数量" }]}
              rows={Array.from({ length: 20 }, (_, index) => {
                const date = new Date(2026, 10, 30 - index);
                return [`${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`, "0", "0", "0", "0", "0", "0"];
              })}
            />
            <SkPagination total={20} pageSize={20} showTotal={false} />
          </div>
        ) : active === "巡检计划" || active === "服务计划" ? (
          <>
            <div className="wo-page-pad"><StatRow items={[["生效计划", "0个计划"], ["失效计划", "0个计划"], ["本周完成任务数", "0个任务"]]} /></div>
            <div className="pp-search-area">
              <div className="pp-search-top"><span>未选择筛选字段</span><span className="pp-search-top-actions"><span className="sk-link">清除选项</span><span>收起 ⌃</span></span></div>
              <div className="pp-filter-grid is-five">
                <OfficeField label="有效时间"><SkInput type="date" /></OfficeField>
                <OfficeField label="计划名称"><SkInput /></OfficeField>
                <OfficeField label="创建人"><SkInput /></OfficeField>
                <OfficeField label="最近一次任务执行时间"><SkInput type="date" /></OfficeField>
                <OfficeField label="执行结果"><SkSelect placeholder="请选择执行结果" options={["正常", "异常", "跳过"]} /></OfficeField>
                <div className="pp-filter-actions"><SkButton variant="primary">搜索</SkButton><SkButton>重置</SkButton></div>
              </div>
            </div>
            <div className="pp-list-card">
              <div className="pp-list-head"><strong>{active}</strong><div className="pp-toolbar-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新建成功")}>新建</SkButton><SkButton>更多 ⌄</SkButton></div></div>
              <SkTable className="pp-wide-table" columns={["计划名称", "计划编号", "负责岗位-负责部门", "所属项目", "开始时间", "截止时间", "创建人", "周期", "最近一次任务执行时间", "执行结果", "下次任务执行时间", "状态", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} />
            </div>
          </>
        ) : active === "巡检任务" || active === "计划任务" ? (
          <>
            <div className="wo-page-pad"><StatRow items={[["待开始", "0个任务"], ["已完成", "0个任务"], ["巡检中", "0个任务"], ["超期未执勤", "0个任务"]]} /></div>
            <div className="pp-search-area">
              <div className="pp-filter-grid is-five">
                <OfficeField label="应开始时间"><SkInput type="date" /></OfficeField>
                <div className="pp-filter-actions"><SkButton variant="primary" onClick={() => show("查询成功")}>搜 索</SkButton><SkButton>重 置</SkButton><SkButton onClick={() => show("导出成功")}>导 出</SkButton></div>
              </div>
            </div>
            <div className="pp-content-card is-plain"><SkEmpty text="暂无数据" /></div>
          </>
        ) : active === "参数设置" || PATROL_PARAMS.some((item) => item.name === active) ? (
          <div className="pp-content-card">
            <div className="pp-card-head"><strong>{active}</strong><SkButton variant="primary" onClick={() => show("新增成功")}>+ 新增</SkButton></div>
            <SkTable columns={[{ key: "name", title: "名称" }, { key: "status", title: "状态" }, { key: "op", title: "操作" }]} rows={[]} />
          </div>
        ) : (
          <div className="pp-content-card">
            <div className="pp-card-head"><strong>{active}</strong></div>
            <SkEmpty text="暂无数据" />
          </div>
        )}
      </section>
      {node}
    </div>
  );
}

export function PatrolEquipmentPage() {
  return <PatrolPage variant="equipment" />;
}

export function PatrolSecurityPage() {
  return <PatrolPage variant="security" />;
}

export function PatrolQualityPage() {
  return <PatrolPage variant="quality" />;
}

export function PatrolGreenPage() {
  return <PatrolPage variant="green" />;
}

export function PatrolCleanPage() {
  return <PatrolPage variant="clean" />;
}

export function ServicePlanPage() {
  return <PatrolPage variant="plan" />;
}
