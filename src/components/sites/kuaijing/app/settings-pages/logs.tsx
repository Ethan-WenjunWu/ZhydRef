"use client";

import { useState } from "react";

import {
  SkButton,
  SkCard,
  SkInput,
  SkSelect,
  SkTable,
} from "../SettingsUI";

const LOG_ROWS = [
  ["王", "15566876033", "org", "org", "[POST] /user/department/user/field/list", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:42:19"],
  ["王", "15566876033", "org", "org", "[POST] /org/menu/diy/detail", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:42:18"],
  ["王", "15566876033", "org", "org", "[POST] /org/menu/diy/custom/list", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:42:18"],
  ["王", "15566876033", "org", "org", "[POST] /org/menu/diy/menu/list", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_energy", "org", "[POST] /energy/getEnergyStatistics", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_visitor", "org", "[POST] /passRecord/getFreeItemView", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_visitor", "org", "[POST] /passRecord/getRecord", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_energy", "org", "[POST] /energy/getEnergyOfflineRate", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_visitor", "org", "[POST] /passCard/getWorkVisitorView", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_property", "org", "[POST] /property/getMaterialData", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_visitor", "org", "[POST] /passCard/getPassRecordView", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_energy", "org", "[POST] /energy/getEnergyOfflineRate", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_energy", "org", "[POST] /energy/getSevenDaysTrend", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_patrol", "org", "[POST] /patrol/getPatrolOverview", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_workorder", "org", "[POST] /dataApi/getOrderTrend", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_workorder", "org", "[POST] /dataApi/getOrderStatistics", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_notice", "org", "[POST] /dataApi/booking/getRoomRate", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "15566876033", "work_energy", "org", "[POST] /energy/getEnergyOfflineRate", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:35"],
  ["王", "15566876033", "work_visitor", "org", "[POST] /passCard/getPassRecordView", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:35"],
  ["王", "15566876033", "work_visitor", "org", "[POST] /passCard/getWorkVisitorView", "114.255.24.32", "北京-北京市:联通", "200", "2026-11-27 16:40:35"],
];

type LogFilters = {
  user: string;
  ip: string;
  service: string;
  port: string;
  start: string;
  end: string;
};

const EMPTY_FILTERS: LogFilters = {
  user: "",
  ip: "",
  service: "",
  port: "",
  start: "",
  end: "",
};

const PORT_OPTIONS = Array.from(new Set(LOG_ROWS.map((row) => row[3])));

export function OperationLogPage() {
  const [draft, setDraft] = useState<LogFilters>(EMPTY_FILTERS);
  const [filters, setFilters] = useState<LogFilters>(EMPTY_FILTERS);
  const [dateOpen, setDateOpen] = useState(false);

  const filtered = LOG_ROWS.filter((row) => {
    if (filters.user && !row[0].includes(filters.user) && !row[1].includes(filters.user)) {
      return false;
    }
    if (filters.ip && !row[5].includes(filters.ip)) return false;
    if (filters.service && !row[2].includes(filters.service)) return false;
    if (filters.port && row[3] !== filters.port) return false;
    if (filters.start && row[8].slice(0, 10) < filters.start) return false;
    if (filters.end && row[8].slice(0, 10) > filters.end) return false;
    return true;
  });

  const apply = () => {
    setFilters(draft);
  };

  return (
    <div className="sk-page">
      <SkCard className="sk-fill sk-log-card">
        <div className="sk-log-filters">
          <label className="sk-log-label">
            登录用户：
            <span className="sk-log-input-wrap">
              <SkInput
                placeholder="请输入用户手机号"
                value={draft.user}
                onChange={(value) => setDraft((current) => ({ ...current, user: value }))}
                onEnter={apply}
              />
              <span className="sk-log-search" onClick={apply}>
                ⌕
              </span>
            </span>
          </label>
          <label className="sk-log-label">
            用户IP：
            <span className="sk-log-input-wrap">
              <SkInput
                placeholder="请输入用户IP"
                value={draft.ip}
                onChange={(value) => setDraft((current) => ({ ...current, ip: value }))}
                onEnter={apply}
              />
              <span className="sk-log-search" onClick={apply}>
                ⌕
              </span>
            </span>
          </label>
          <label className="sk-log-label">
            服务名称：
            <span className="sk-log-input-wrap">
              <SkInput
                placeholder="请输入服务名称"
                value={draft.service}
                onChange={(value) => setDraft((current) => ({ ...current, service: value }))}
                onEnter={apply}
              />
              <span className="sk-log-search" onClick={apply}>
                ⌕
              </span>
            </span>
          </label>
          <label className="sk-log-label">
            端口：
            <SkSelect
              placeholder="请选择端口"
              value={draft.port}
              options={PORT_OPTIONS}
              onChange={(value) => {
                setDraft((current) => ({ ...current, port: value }));
                setFilters((current) => ({ ...current, port: value }));
              }}
              className="sk-log-select"
            />
          </label>
          <label className="sk-log-label">
            操作时间：
            <span
              className="sk-date-range"
              onClick={() => setDateOpen((open) => !open)}
            >
              <span className={draft.start ? "sk-date-text" : ""}>
                {draft.start || "开始日期"}
              </span>
              <span className="sk-date-arrow">→</span>
              <span className={draft.end ? "sk-date-text" : ""}>
                {draft.end || "结束日期"}
              </span>
              <span className="sk-date-icon">▣</span>
              {dateOpen ? (
                <span className="sk-date-popover" onClick={(event) => event.stopPropagation()}>
                  <SkInput
                    type="date"
                    value={draft.start}
                    onChange={(value) => setDraft((current) => ({ ...current, start: value }))}
                  />
                  <SkInput
                    type="date"
                    value={draft.end}
                    onChange={(value) => setDraft((current) => ({ ...current, end: value }))}
                  />
                  <span className="sk-date-popover-actions">
                    <SkButton
                      size="sm"
                      onClick={() => {
                        setDraft((current) => ({ ...current, start: "", end: "" }));
                        setFilters((current) => ({ ...current, start: "", end: "" }));
                        setDateOpen(false);
                      }}
                    >
                      清除
                    </SkButton>
                    <SkButton
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        apply();
                        setDateOpen(false);
                      }}
                    >
                      确定
                    </SkButton>
                  </span>
                </span>
              ) : null}
            </span>
          </label>
        </div>
        <SkTable
          columns={[
            { key: "user", title: "登录用户" },
            { key: "phone", title: "手机号" },
            { key: "service", title: "服务名称" },
            { key: "port", title: "端口" },
            { key: "route", title: "路由" },
            { key: "ip", title: "登录IP" },
            { key: "location", title: "登录地点" },
            { key: "status", title: "状态码" },
            { key: "time", title: "操作时间" },
          ]}
          rows={filtered.map((row) => [...row])}
        />
      </SkCard>
    </div>
  );
}
