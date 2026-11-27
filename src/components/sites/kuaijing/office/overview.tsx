"use client";

/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation";

const STATS = [
  { label: "待我审批数量", value: "0", sub: "占比：0%", icon: "icon1.png", href: "/orgs/office/approval-center" },
  { label: "我已审批数量", value: "4", sub: "占比：67%", icon: "icon2.png", href: "/orgs/office/approval-center" },
  { label: "抄送我的数量", value: "0", sub: "占比：0%", icon: "icon3.png", href: "/orgs/office/approval-center" },
  { label: "我发起的数量", value: "6", sub: "", icon: "icon4.png", href: "/orgs/office/approval-data" },
  { label: "今日出勤人数", value: "0", sub: "今日缺勤人数：1人", icon: "icon5.png", href: "/orgs/office/attendance" },
  { label: "今日出勤率", value: "0", sub: "昨日出勤率：100%", icon: "icon6.png", href: "/orgs/office/attendance" },
  { label: "本周出勤率", value: "66%", sub: "上周出勤率：0%", icon: "icon5.png", href: "/orgs/office/attendance" },
  { label: "本月出勤率", value: "66%", sub: "上月出勤率：0%", icon: "icon6.png", href: "/orgs/office/attendance" },
];

const MINI = [
  { title: "知识库统计", a: ["知识库数量", "1"], b: ["文档数量", "0"], link: "近一周添加文档趋势", href: "/orgs/office/wiki" },
  { title: "邮件统计", a: ["发邮件数量", "0"], b: ["收邮件数量", "0"], link: "近一周发送邮件趋势", href: "/orgs/office/mail" },
  { title: "公文统计", a: ["收文数量", "0"], b: ["发文件数量", "0"], link: "近一周收/发公文趋势", href: "/orgs/office/document" },
  { title: "招聘统计", a: ["待处理简历数", "0"], b: ["人才档案数量", "0"], link: "近一周简历投递趋势", href: "/orgs/office/recruit" },
];

const X_LABELS = ["11/13", "11/15", "11/17", "11/19", "11/21", "11/23", "11/25", "11/27"];
const WEEK = ["11/23", "11/24", "11/25", "11/26", "11/27", "11/28", "11/29"];

export function OfficeOverviewPage() {
  const router = useRouter();

  return (
    <div className="of-page of-overview">
      <div className="of-stat-grid">
        {STATS.map((stat) => (
          <button
            key={stat.label}
            type="button"
            className="of-stat"
            onClick={() => router.push(stat.href)}
          >
            <div className="of-stat-text">
              <div className="of-stat-label">{stat.label}</div>
              <div className="of-stat-value">
                {stat.value}
                {stat.sub ? <span className="of-stat-sub">{stat.sub}</span> : null}
              </div>
            </div>
            <img src={`/sites/kuaijing/office/hr/${stat.icon}`} alt="" />
          </button>
        ))}
      </div>

      <div className="of-chart-grid">
        <section className="of-chart-card">
          <h2>近15天审批统计</h2>
          <div className="of-line-chart">
            {[2, 1.5, 1, 0.5, 0].map((tick) => (
              <div key={tick} className="of-line-row">
                <span className="of-line-tick">{tick}</span>
                <span className="of-line-grid" />
              </div>
            ))}
            <div className="of-line-bars">
              <div className="of-line-bar is-empty" style={{ height: "0%" }} />
              <div className="of-line-bar is-empty" style={{ height: "0%" }} />
              <div className="of-line-bar is-empty" style={{ height: "0%" }} />
              <div className="of-line-bar is-empty" style={{ height: "0%" }} />
              <div className="of-line-bar is-empty" style={{ height: "0%" }} />
              <div className="of-line-bar is-empty" style={{ height: "0%" }} />
              <div className="of-line-bar" style={{ height: "100%" }} />
              <div className="of-line-bar" style={{ height: "100%" }} />
            </div>
            <div className="of-line-x">
              {X_LABELS.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="of-chart-card">
          <h2>审批类型分布</h2>
          <div className="of-donut-wrap">
            <div className="of-donut">
              <div className="of-donut-center">
                <span>审批总数</span>
                <strong>6</strong>
              </div>
              <span className="of-donut-pct is-a">33.33%</span>
              <span className="of-donut-pct is-b">66.67%</span>
            </div>
          </div>
          <div className="of-legend">
            <span><i className="is-blue" />合同</span>
            <span><i className="is-yellow" />巡检管理</span>
            <span className="of-legend-more">1/4 ▼</span>
          </div>
        </section>

        <section className="of-chart-card">
          <h2>近一周出勤人数统计</h2>
          <div className="of-week-chart">
            {[1, 0.75, 0.5, 0.25, 0].map((tick) => (
              <div key={tick} className="of-line-row">
                <span className="of-line-tick">{tick}</span>
                <span className="of-line-grid" />
              </div>
            ))}
            <div className="of-week-bars">
              {WEEK.map((day, index) => (
                <div key={day} className="of-week-group">
                  <div className="of-week-bar is-blue" style={{ height: index >= 3 && index <= 6 ? "100%" : "0%" }} />
                  <div className="of-week-bar is-yellow" style={{ height: index === 3 ? "88%" : "0%" }} />
                </div>
              ))}
            </div>
            <div className="of-line-x">
              {WEEK.map((label, index) => (
                <span key={label}>{index % 2 === 0 ? label : ""}</span>
              ))}
            </div>
          </div>
          <div className="of-legend">
            <span><i className="is-blue" />应出勤</span>
            <span><i className="is-yellow" />已出勤</span>
          </div>
        </section>
      </div>

      <div className="of-mini-grid">
        {MINI.map((card) => (
          <section key={card.title} className="of-mini-card">
            <h3>{card.title}</h3>
            <div className="of-mini-cols">
              <div><span>{card.a[0]}</span><strong>{card.a[1]}</strong></div>
              <div><span>{card.b[0]}</span><strong>{card.b[1]}</strong></div>
            </div>
            <button type="button" className="of-mini-link" onClick={() => router.push(card.href)}>
              <i />{card.link}
            </button>
          </section>
        ))}
      </div>
    </div>
  );
}
