"use client";

import { useState } from "react";

/* eslint-disable @next/next/no-img-element */

import { SkButton, SkInput, useSkMessage } from "../app/SettingsUI";

const NAV = ["优选好房", "找楼盘", "租商铺", "联合办公", "委托找房", "投放房源", "管理房源", "楼市资讯"];
const NEWS = [
  ["如何选择合适的智慧楼宇产品？", "智能化管理能为办公楼市场提供极大的效益，智慧楼宇为传统办公楼市场提供转型捷径。"],
  ["智慧楼宇两大核心方向", "我国办公楼市场大多还停留于人工管理与操作，管理标准停滞在基础物业管理。"],
  ["智慧楼宇为办公楼市场带来哪些改变", "随着规模增速与利润增速双双下滑，土地红利和金融红利逐渐消失。"],
];

export function PageConfigPage() {
  const [showPrice, setShowPrice] = useState(0);
  const [showAround, setShowAround] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const [mobileImage, setMobileImage] = useState("");
  const { show, node } = useSkMessage();
  return (
    <div className="inv-config-page">
      <div className="inv-config-preview">
        <header className="inv-preview-header">
          <strong>招商</strong>
          <nav>{NAV.map((item) => <span key={item}>{item}</span>)}</nav>
          <SkButton variant="primary" onClick={() => show("登录")}>登录</SkButton>
        </header>
        <div className="inv-preview-hero">
          <img src="/sites/kuaijing/platform/banner.png" alt="" />
          <div className="inv-preview-search"><strong>选择区域</strong><div className="inv-preview-bar" /><strong>选择面积</strong><div className="inv-preview-chips">{["0", "100㎡", "200㎡", "300㎡", "500㎡", "1000㎡", "∞"].map((item) => <span key={item}>{item}</span>)}</div><SkInput placeholder="请输入楼宇名称或区域位置" /><SkButton variant="primary">马上找房</SkButton></div>
          <div className="inv-preview-slogan">真房源 无中介</div>
        </div>
        <div className="inv-promo-row">{["真实数据实时更新", "直连业主安心透明", "便捷灵活快速响应", "无中介0佣金"].map((item) => <div key={item}>{item}</div>)}</div>
        <div className="inv-preview-section"><strong>资讯栏</strong><div className="inv-news-grid">{NEWS.map(([title, desc]) => <div key={title} className="inv-news-card"><strong>{title}</strong><span>2023-07-12 09:00:00</span><p>{desc}</p></div>)}</div></div>
        <div className="inv-preview-section"><strong>推广区2 · 生活服务</strong></div>
        <div className="inv-preview-section"><strong>推广区3 · 重点企业</strong></div>
        <div className="inv-preview-section"><strong>推广区4 · 政企服务</strong><div className="inv-building-card"><strong>测试项目1</strong><span>¥30/㎡/月 起</span><span>东城 - 东华门</span></div></div>
        <div className="inv-preview-section"><strong>推广区5 · 租赁更放心</strong><div className="inv-reassure">{["全方位保障服务", "委托找房"].map((item) => <span key={item}>{item}</span>)}</div></div>
        <footer className="inv-preview-footer"><span>-- All Rights Reserved</span><span>联系地址：--</span><span>（--）</span><span>官方热线：--</span></footer>
      </div>
      <aside className="inv-config-panel">
        <h3>页面配置</h3>
        <div className="inv-config-block"><strong>主图</strong><SkButton onClick={() => setMainImage("已选择")}>替 换</SkButton><span>建议上传1920*680尺寸</span></div>
        <div className="inv-config-block"><strong>移动端主图</strong><SkButton onClick={() => setMobileImage("已选择")}>替 换</SkButton><span>建议上传650*550尺寸</span></div>
        <div className="inv-config-block"><strong>是否展示单价</strong><div className="inv-radio-row"><button type="button" className={showPrice === 0 ? "is-active" : ""} onClick={() => setShowPrice(0)}>是</button><button type="button" className={showPrice === 1 ? "is-active" : ""} onClick={() => setShowPrice(1)}>否</button></div></div>
        <div className="inv-config-block"><strong>项目详情展示周边信息</strong><div className="inv-radio-row"><button type="button" className={showAround === 0 ? "is-active" : ""} onClick={() => setShowAround(0)}>是</button><button type="button" className={showAround === 1 ? "is-active" : ""} onClick={() => setShowAround(1)}>否</button></div></div>
        <SkButton variant="primary" onClick={() => show("应用成功")}>应 用</SkButton>
        {mainImage ? <small>主图{mainImage}</small> : null}
        {mobileImage ? <small>移动端主图{mobileImage}</small> : null}
      </aside>
      {node}
    </div>
  );
}
