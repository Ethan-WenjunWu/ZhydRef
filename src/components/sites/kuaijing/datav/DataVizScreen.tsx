"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./datav.css";

const VARIANTS: Record<string, { title: string; subtitle: string; left: string[]; right: string[] }> = {
  overview: {
    title: "综合数据大屏",
    subtitle: "智慧园区 · 综合态势",
    left: ["能耗统计", "事件统计", "设备运行", "会议室使用率", "环境质量统计"],
    right: ["实时人数", "车位数量", "充电桩使用占比", "通知列表"],
  },
  lease: {
    title: "资产管理运营数据大屏",
    subtitle: "租赁运营 · 智慧园区",
    left: ["近6个月合同成交走势", "租赁动态", "空置天数占比", "近6个月收缴率走势"],
    right: ["租赁面积偏好", "近6个月出租率走势", "本月收缴率", "近6个月效益流失率"],
  },
  merchant: {
    title: "招商数据大屏",
    subtitle: "招商运营 · 智慧园区",
    left: ["招商线索趋势", "近期招商动态", "业态面积占比", "招商转化率"],
    right: ["品牌偏好", "出租率走势", "本月签约金额", "招商漏斗"],
  },
  property: {
    title: "物业数据大屏",
    subtitle: "物业服务 · 智慧园区",
    left: ["工单趋势", "工单动态", "设备在线率", "巡检完成率"],
    right: ["满意度指数", "能耗趋势", "本月收缴率", "异常事件"],
  },
};

const BOTTOM = [["项目数量", "2", "管理面积：21245㎡"], ["累计租客", "1人", "租客员工：0人"], ["房源总数", "346间", "当前出租率：0%"], ["在租合同数", "0份", "在租实时均价：0元"], ["本月签约面积", "20㎡", "本月签合同：1份"]];

export function DataVizScreen({ slug }: { slug: string }) {
  const variant = VARIANTS[slug] ?? VARIANTS.overview;
  const [time, setTime] = useState("2026-11-28 09:18:22");
  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleString("zh-CN", { hour12: false }));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const [tab, setTab] = useState(0);

  return (
    <div className={`datav-screen datav-${slug}`}>
      <header className="datav-header">
        <div className="datav-time">{time}</div>
        <div className="datav-location">哈尔滨市</div>
        <h1>{variant.title}</h1>
        <div className="datav-weather">☀ -1℃ ~ 11℃ 晴</div>
      </header>
      <div className="datav-project-row">
        <span>大连华安物业管理有限公司</span>
        <span className="is-active">智慧园区</span>
        <span>室外温度：3℃</span>
        <span>室外湿度：53%</span>
        <span>2026/11/28</span>
        <span>09:17 星期六</span>
      </div>
      <div className="datav-layout">
        <aside className="datav-nav-column">
          {["综合态势", "流量分析", "租控管理", "智能中控", "安防动态"].map((item, index) => (
            <button key={item} type="button" className={index === tab ? "is-active" : ""} onClick={() => setTab(index)}>{item}</button>
          ))}
        </aside>
        <div className="datav-side left">
          {variant.left.map((title, index) => (
            <section key={title} className="datav-panel">
              <h2>{title}</h2>
              <div className="datav-panel-content">
                {title.includes("收缴") ? <div className="datav-gauge"><strong>100%</strong><span>收缴率</span></div> : null}
                {title.includes("动态") ? <div className="datav-dynamic"><span>退租</span><b>A01</b><em>2026-11-26 16:03:01</em><i>20㎡</i></div> : null}
                {index === 0 && !title.includes("收缴") ? <div className="datav-line" /> : null}
                {index > 0 && !title.includes("收缴") && !title.includes("动态") ? <div className="datav-donut" /> : null}
              </div>
            </section>
          ))}
        </div>

        <div className="datav-map">
          <div className="datav-map-grid" />
          <span className="datav-city is-hrb">哈尔滨市</span>
          <span className="datav-city is-cc">长春市</span>
          <span className="datav-city is-sy">沈阳市</span>
          <span className="datav-city is-bj">北京市</span>
          <span className="datav-city is-tj">天津市</span>
          <span className="datav-city is-hhht">呼和浩特市</span>
          <span className="datav-city is-ty">太原市</span>
          <span className="datav-city is-jn">济南市</span>
          <span className="datav-city is-zz">郑州市</span>
          <span className="datav-city is-xa">西安市</span>
          <span className="datav-map-pin is-one">智慧园区<br /><small>楼宇：1　房源：250　在租合同：0</small></span>
          <span className="datav-map-pin is-two">测试项目<br /><small>楼宇：1　房源：96　在租合同：0</small></span>
          <div className="datav-map-controls"><button type="button">+</button><button type="button">−</button></div>
          <div className="datav-map-source">数据来源：国家地理信息公共服务平台<br />GS (2026) 4921号 - 甲测资字11110974</div>
          <div className="datav-map-settings">页面设置</div>
        </div>

        <div className="datav-side right">
          {variant.right.map((title) => (
            <section key={title} className="datav-panel">
              <h2>{title}</h2>
              <div className="datav-panel-content">
                {title.includes("收缴") ? <div className="datav-receipt"><div className="datav-gauge"><strong>100%</strong><span>收缴率</span></div><div><span>本月实收 <b>¥316.67</b></span><span>本月待收 <b>¥0</b></span><span>本月需收 <b>¥316.67</b></span></div></div> : null}
                {title.includes("偏好") ? <div className="datav-donut" /> : null}
                {!title.includes("收缴") && !title.includes("偏好") ? <div className="datav-line" /> : null}
              </div>
            </section>
          ))}
        </div>
      </div>
      <footer className="datav-bottom">
        {BOTTOM.map(([label, value, sub]) => (
          <div key={label} className="datav-bottom-card"><span>{label}</span><strong>{value}</strong><small>{sub}</small></div>
        ))}
      </footer>
      <div className="datav-notice"><h3>通知列表</h3><div>全部　未处理　已完成</div><p>暂无数据</p><small>请点击左侧通知分类查看</small></div>
    </div>
  );
}

export function DataVizSelectPage() {
  const router = useRouter();
  const [project, setProject] = useState("智慧园区");
  return (
    <div className="datav-select-screen">
      <div className="datav-select-panel">
        <h1>请选择项目</h1>
        <div className="datav-select-projects">
          {["智慧园区", "测试项目"].map((item) => (
            <button key={item} type="button" className={project === item ? "is-active" : ""} onClick={() => setProject(item)}>{item}</button>
          ))}
        </div>
        <button type="button" className="datav-enter" onClick={() => router.push(`/datav/overview`)}>进入</button>
      </div>
    </div>
  );
}
