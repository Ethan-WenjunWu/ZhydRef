"use client";

/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation";

import "./platform.css";

const NAV = ["优选好房", "找楼盘", "租商铺", "联合办公", "招商加盟", "投放房源", "管理房源", "楼市资讯"];
const AREAS = ["不限", "东城", "西城", "朝阳", "海淀", "丰台"];
const FEATURES = [["shuju.png", "真实数据", "实时更新"], ["anxin.png", "直连业主", "安心透明"], ["bianjie.png", "便捷灵活", "快速响应"], ["yongjin.png", "无中介0", "佣金"]];
const NEWS = [
  ["如何选择合适的智慧楼宇产品？", "智能化管理能为办公楼市场提供极大的效益，智慧楼宇为传统办公楼市场提供转型捷径，同时也能缩短新项目建设与招商周期。"],
  ["智慧楼宇两大核心方向", "我国办公楼市场大多还停留于人工管理与操作，管理标准停滞在基础物业管理。但是至今为止，传统办公楼市场需求已经从基础管理转变为对办公楼品质的提升。"],
  ["智慧楼宇为办公楼市场带来哪些改变", "《2021中国商业地产100强研究报告》指出：在规模增速与利润增速双双下滑的背景下，土地红利和金融红利逐渐消失。"],
];

export function PlatformPage() {
  const router = useRouter();
  return (
    <div className="inv-platform">
      <header className="inv-platform-header">
        <div className="inv-platform-logo">招商</div>
        <nav>{NAV.map((item) => <a key={item} href="#projects">{item}</a>)}</nav>
        <button type="button" onClick={() => router.push("/orgs")}>登 录</button>
      </header>
      <section className="inv-platform-hero">
        <img src="/sites/kuaijing/platform/banner.png" alt="" className="inv-hero-bg" />
        <div className="inv-hero-search">
          <h3>选择区域</h3>
          <div className="inv-area-row">{AREAS.map((area, index) => <span key={area} className={index === 0 ? "is-active" : ""}>{area}</span>)}</div>
          <h3>选择面积</h3>
          <div className="inv-area-bar"><span /><span /><span /><span /></div>
          <div className="inv-area-labels">{["0", "100㎡", "200㎡", "300㎡", "500㎡", "1000㎡", "∞"].map((item) => <span key={item}>{item}</span>)}</div>
          <div className="inv-hero-input"><span>⌕</span><input placeholder="请输入楼宇名称或区域位置" /></div>
          <button type="button" className="inv-search-btn">马上找房</button>
          <button type="button" className="inv-map-btn">📍 地图找房</button>
        </div>
      </section>
      <section className="inv-features">
        {FEATURES.map(([image, title, sub]) => (
          <div key={title} className="inv-feature"><img src={`/sites/kuaijing/platform/${image}`} alt="" /><div><strong>{title}</strong><span>{sub}</span></div></div>
        ))}
      </section>
      <section className="inv-platform-section" id="projects">
        <h2>优选好房</h2>
        <div className="inv-platform-cards">
          {[1, 2, 3, 4].map((item) => <div key={item} className="inv-platform-card"><div className="inv-card-image" /><strong>测试项目{item}</strong><span>¥30/㎡/月 起</span><small>东城 - 东华门</small></div>)}
        </div>
      </section>
      <section className="inv-platform-section">
        <div className="inv-platform-title-row"><h2>资讯信息</h2><span>全部 &gt;</span></div>
        <div className="inv-platform-news">
          {NEWS.map(([title, desc]) => <article key={title}><strong>{title}</strong><small>2023-07-12 09:00:00</small><p>{desc}</p></article>)}
        </div>
      </section>
      <footer className="inv-platform-footer">
        <div className="inv-footer-cta"><img src="/sites/kuaijing/platform/bottom_mobile.png" alt="" /><div><strong>租赁更放心</strong><span>全方位保障服务</span><button type="button">委托找房</button></div></div>
        <p>-- All Rights Reserved　联系地址：--　（--）　官方热线：--</p>
      </footer>
    </div>
  );
}
