"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";

import {
  CALENDAR_REFERENCE,
  EXPIRY_MESSAGE,
  WORKBENCH_APPS,
  WORKBENCH_CARDS,
} from "./data";
import { EMPTY_SVG } from "./empty-svg";
import { DownIcon, FullscreenIcon, SpriteIcon } from "./icons";

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];
const YEARS = [2024, 2025, 2026, 2027, 2028];
const MONTHS = Array.from({ length: 12 }, (_, index) => index);

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function WorkbenchPage() {
  const [year, setYear] = useState(CALENDAR_REFERENCE.getFullYear());
  const [month, setMonth] = useState(CALENDAR_REFERENCE.getMonth());
  const [openSelect, setOpenSelect] = useState<"year" | "month" | null>(null);

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openSelect) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!calendarRef.current?.contains(event.target as Node)) {
        setOpenSelect(null);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [openSelect]);

  const days = useMemo(() => {
    const first = new Date(year, month, 1);
    const offset = (first.getDay() + 6) % 7;
    const start = new Date(year, month, 1 - offset);
    return Array.from({ length: 42 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      return day;
    });
  }, [year, month]);

  return (
    <div className="workbench-wrap">
      <div className="workbench-alert" role="alert">
        <div className="workbench-alert-content">
          <span className="workbench-alert-tag">到期提醒</span>
          <span>{EXPIRY_MESSAGE}</span>
        </div>
      </div>

      <div className="workbench-box">
        <div className="workbench-left">
          <div className="card-box">
            <div className="card-grid">
              {WORKBENCH_CARDS.map((card) => (
                <div key={card.title} className="card-item">
                  <div className="card-left">
                    <div className="card-title nowrap">{card.title}</div>
                    <div className="card-num nowrap">{card.value}</div>
                    <div className="show-more nowrap">{card.moreLabel}</div>
                  </div>
                  <div className="img-box">
                    <img src={card.image} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="app-box">
            <div className="title-box app-title-box">
              <div className="title-box-dec">常用功能</div>
              <div className="title-box-action">
                <SpriteIcon name="org-zidingyi" />
                <span className="title-action-text">自定义</span>
              </div>
            </div>
            <div className="app-content">
              <div className="app-content-box">
                <div className="app-grid">
                  {WORKBENCH_APPS.map((app) => (
                    <div key={app.name} className="app-item">
                      <div className="app-left">
                        <div
                          className={`icon-box${
                            app.icon ? " iconback" : ""
                          }`}
                        >
                          {app.icon ? (
                            <SpriteIcon name={app.icon} />
                          ) : (
                            <img
                              className="image"
                              src={app.image}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="app-name nowrap">{app.name}</div>
                      </div>
                      <div className="app-right">&gt;</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="workbench-right">
          <div className="schedule-box">
            <div className="title-box schedule-title-box">
              <div className="title-box-dec">
                日程管理
                <button type="button" className="title-link-btn">
                  <FullscreenIcon />
                  <span>更多</span>
                </button>
              </div>
              <div className="title-box-action">
                <button type="button" className="title-link-btn">
                  <SpriteIcon name="org-zuixing-10" />
                  <span>新建日程</span>
                </button>
              </div>
            </div>

            <div className="schedule-content-box">
              <div className="calendar-box">
                <div className="calendar-header" ref={calendarRef}>
                  <div className="calendar-select-wrap">
                    <button
                      type="button"
                      className="calendar-select"
                      onClick={() =>
                        setOpenSelect((value) =>
                          value === "year" ? null : "year",
                        )
                      }
                    >
                      <span>{year}年</span>
                      <DownIcon />
                    </button>
                    {openSelect === "year" ? (
                      <div className="calendar-dropdown">
                        {YEARS.map((value) => (
                          <button
                            key={value}
                            type="button"
                            className={`calendar-option${
                              value === year ? " is-selected" : ""
                            }`}
                            onClick={() => {
                              setYear(value);
                              setOpenSelect(null);
                            }}
                          >
                            {value}年
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="calendar-select-wrap calendar-month-wrap">
                    <button
                      type="button"
                      className="calendar-select"
                      onClick={() =>
                        setOpenSelect((value) =>
                          value === "month" ? null : "month",
                        )
                      }
                    >
                      <span>{month + 1}月</span>
                      <DownIcon />
                    </button>
                    {openSelect === "month" ? (
                      <div className="calendar-dropdown">
                        {MONTHS.map((value) => (
                          <button
                            key={value}
                            type="button"
                            className={`calendar-option${
                              value === month ? " is-selected" : ""
                            }`}
                            onClick={() => {
                              setMonth(value);
                              setOpenSelect(null);
                            }}
                          >
                            {value + 1}月
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="calendar-table-wrap">
                  <table className="calendar-table">
                    <thead>
                      <tr>
                        {WEEKDAYS.map((day) => (
                          <th key={day}>{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 6 }, (_, row) => (
                        <tr key={row}>
                          {days
                            .slice(row * 7, row * 7 + 7)
                            .map((day) => {
                              const inView = day.getMonth() === month;
                              const isToday = isSameDate(
                                day,
                                CALENDAR_REFERENCE,
                              );
                              return (
                                <td
                                  key={day.toISOString()}
                                  className={`calendar-cell${
                                    inView ? " is-in-view" : ""
                                  }${isToday ? " is-today" : ""}`}
                                >
                                  <div className="calendar-date">
                                    <div className="calendar-date-value">
                                      {String(day.getDate()).padStart(2, "0")}
                                    </div>
                                  </div>
                                </td>
                              );
                            })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="calendar-dec">
                <div className="title-box calendar-dec-title">
                  <div className="title-box-dec">今日日程</div>
                </div>
                <div className="todo-list">
                  <div className="todo-list-dec nowrap">暂无更多待办事项</div>
                </div>
              </div>
            </div>
          </div>

          <div className="notice-box">
            <div className="title-box notice-title-box">
              <div className="title-box-dec">企业公告</div>
              <div className="title-box-action notice-more">更多&gt;&gt;</div>
            </div>
            <div className="empty-state">
              <div
                className="empty-image"
                dangerouslySetInnerHTML={{ __html: EMPTY_SVG }}
              />
              <p className="empty-description">暂无数据</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

