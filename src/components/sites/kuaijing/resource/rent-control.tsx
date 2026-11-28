"use client";

import { useState } from "react";

import { SkButton, SkEmpty, SkInput, SkModal, SkSelect, SkTable, SkTabs, useSkMessage } from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { OpPage, OpStats } from "../operation/common";

const TABS = ["项目概况", "楼栋楼层", "车库车位", "配套资源", "出租床位", "工单动态", "资产记录", "智能硬件", "水电能耗", "项目信息", "项目进展", "常用电话", "项目周边"];

function Panel({ title, actions, children }: { title: string; actions?: React.ReactNode; children?: React.ReactNode }) {
  return <div className="op-card"><div className="op-card-head"><strong>{title}</strong><div className="op-actions">{actions}</div></div>{children}</div>;
}

export function RentControlPage() {
  const [tab, setTab] = useState(0);
  const [building, setBuilding] = useState("智慧园区");
    const [projectOpen, setProjectOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [floor, setFloor] = useState(0);
  const [subTab, setSubTab] = useState(0);
  const { show, node } = useSkMessage();

  return (
    <OpPage className="res-rent-page">
      <aside className="res-rent-tree">
        <div className="res-tree-search"><SkInput placeholder="房源编号" /><SkButton variant="primary">⌕</SkButton></div>
        <div className="res-tree-root">▾ 大连华安物业管理有限公司</div>
        {["智慧园区", "测试项目"].map((name) => (
          <button key={name} type="button" className={`res-tree-item${building === name ? " is-active" : ""}`} onClick={() => setBuilding(name)}>
            <span>▸</span>{name}
          </button>
        ))}
        <div className="res-tree-bottom">
          <SkButton onClick={() => setProjectOpen(true)}>+ 新建项目</SkButton>
          <SkButton onClick={() => show("新建楼宇")}>+ 新建楼宇</SkButton>
        </div>
      </aside>
      <section className="res-rent-main">
        <div className="res-rent-head">
          <h2>⌂ {building}</h2>
          <div className="dt-actions">
            <SkButton onClick={() => show("删除成功")}>🗑 删除</SkButton>
            <SkButton onClick={() => show("编辑项目")}>✎ 编辑</SkButton>
          </div>
        </div>
        <div className="res-rent-tabs"><SkTabs items={TABS} active={tab} onChange={setTab} /></div>

        {tab === 0 ? (
          <>
            <div className="op-card is-plain">
              <div className="res-kpi-grid">
                {[["在租合同数", "0", "房源数量：250"], ["管理面积", "20.0000㎡", "招商面积：0㎡"], ["在租实时均价", "¥0/㎡·天", "在租面积：0㎡"], ["出租率", "0%", "待租面积：20㎡"]].map(([label, value, sub]) => (
                  <div key={label} className="res-kpi"><span>{label}</span><strong>{value}</strong><small>{sub}</small></div>
                ))}
              </div>
            </div>
            <div className="op-card"><div className="res-section-title">业户分析</div><div className="res-analysis-grid">{["业户行业", "业户标签", "租赁面积排行"].map((title) => <div key={title} className="res-analysis-panel"><strong>▍{title}</strong><SkEmpty text="暂无数据" /></div>)}</div></div>
            <div className="op-card"><div className="res-section-title">租金单价排行</div><SkTable columns={["排名", "业户", "租赁单价", "租赁天数", "租赁面积", "资源"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>
          </>
        ) : null}

        {tab === 1 ? (
          <>
            <Panel title="楼栋列表" actions={<><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton>更多 ⌄</SkButton></>}>
              <SkTable columns={["楼栋名称", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[["宿舍楼01", ""]]} />
              <div className="res-pagination">共1条　1　20 条/页</div>
            </Panel>
            <Panel title="楼层列表" actions={<><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton>更多 ⌄</SkButton></>}>
              <div className="op-table-tabs">{["B1", "1", "2", "3", "4", "5"].map((item, index) => <button key={item} type="button" className={index === floor ? "is-active" : ""} onClick={() => setFloor(index)}>{item}</button>)}</div>
            </Panel>
          </>
        ) : null}

        {tab === 2 ? (
          <>
            <Panel title="车场列表" actions={<><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新增车场")}>新 增</SkButton></>}><SkTable columns={["车场名称", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></Panel>
            <Panel title="车位列表" actions={<><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新增车位")}>新 增</SkButton></>}><SkTable columns={["名称", "面积", "车位类型", "车位状态", "到期时间", "备注", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></Panel>
          </>
        ) : null}

        {tab === 3 ? (
          <>
            <Panel title="配套资源分类" actions={<SkButton variant="primary" onClick={() => show("新增分类")}>新增分类</SkButton>}><SkTable columns={["分类名称", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></Panel>
            <div className="res-note">配套资源为租赁服务延伸的附加服务，可在签署合同时选择需要的资源并独立计费。</div>
            <div className="op-card is-plain"><div className="op-filter-grid is-five"><OfficeField label="资源名称"><SkInput /></OfficeField><OfficeField label="资源编号"><SkInput /></OfficeField><OfficeField label="状态"><SkSelect placeholder="请选择" /></OfficeField><div className="op-filter-actions"><SkButton variant="primary">搜索</SkButton><SkButton>重置</SkButton></div></div></div>
            <Panel title="配套资源明细" actions={<><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("添加配套资源")}>添加配套资源</SkButton><SkButton>更多 ⌄</SkButton></>}><SkTable className="op-wide-table" columns={["资源名称", "资源编号", "规格", "单位", "默认单价", "押金", "超时计费规则", "状态", "备注", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></Panel>
          </>
        ) : null}

        {tab === 4 ? (
          <Panel title="床位列表" actions={<><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新增床位")}>新 增</SkButton></>}>
            <SkTable className="op-wide-table" columns={["项目名称", "楼宇名称", "房号", "床位名称", "床位编号", "经营状态", "当前业主", "当前业户", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[["智慧园区", "宿舍楼01", "550", "01", "1", "待租", "", "", <span key="op"><span className="sk-action-link">编辑</span><span className="sk-action-link is-danger">删除</span></span>]]} />
            <div className="res-pagination">共1条　1　20 条/页</div>
          </Panel>
        ) : null}

        {tab === 5 ? (
          <>
            <div className="op-card is-plain"><div className="res-subtabs"><SkTabs items={["在线报修", "投诉建议"]} active={0} onChange={() => show("切换")} /><SkButton variant="primary" onClick={() => show("上报工单")}>上报工单</SkButton></div><OpStats items={[["处理中工单数", "0"], ["未办结超时工单", "0"], ["当月工单超时率", "0%"], ["当月满意度", "0%"]]} columns={4} /></div>
            <Panel title="工单动态" actions={<><SkTabs items={["全部", "处理中", "已处理"]} active={0} onChange={() => show("筛选")} /><SkButton onClick={() => show("刷新成功")}>刷新</SkButton></>}><SkEmpty text="暂无数据" /></Panel>
          </>
        ) : null}

        {tab === 6 ? (
          <div className="op-card"><SkTabs items={["资产分类统计", "资产位置统计", "使用部门统计"]} active={0} onChange={() => show("切换")} /><div className="res-filter-inline"><SkButton variant={subTab === 0 ? "primary" : "default"} onClick={() => setSubTab(0)}>数量</SkButton><SkButton variant={subTab === 1 ? "primary" : "default"} onClick={() => setSubTab(1)}>金额</SkButton><SkSelect placeholder="请选择资产分类" /><SkSelect placeholder="请选择楼宇" /><SkButton variant="primary" onClick={() => show("新增资产")}>新增资产</SkButton></div><SkEmpty text="暂无数据" /></div>
        ) : null}

        {tab === 7 ? (
          <div className="op-card"><SkTabs items={["智能水电表", "人脸识别门禁"]} active={0} onChange={() => show("切换")} /><div className="op-card-head"><strong>智能水电表 （0）</strong><div className="op-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新增")}>新增</SkButton></div></div><SkEmpty text="当前未绑定" /></div>
        ) : null}

        {tab === 8 ? (
          <>
            <OpStats items={[["本期用电量", "0KW·H"], ["本期用水量", "0M³"], ["本期户均用电", "0KW·H"], ["本期户均用水", "0M³"]]} columns={4} />
            <div className="op-card"><SkTabs items={["用电能耗", "用水能耗"]} active={0} onChange={() => show("切换")} /><div className="res-energy-chart"><div><strong>用电量趋势</strong><SkEmpty text="暂无数据" /></div><div><strong>业户用电排名</strong><SkEmpty text="暂无数据" /></div></div></div>
            <div className="op-card"><div className="op-card-head"><strong>水电账单收缴率</strong><div className="op-actions"><SkTabs items={["本期", "全部"]} active={0} onChange={() => show("切换")} /></div></div><OpStats items={[["待收缴账单", "0"], ["近半年水电账单", "0"], ["应收水电费", "¥0"], ["实收水电费", "¥0"], ["需收水电费", "¥0"]]} columns={5} /><SkButton onClick={() => show("账单记录")}>账单记录</SkButton></div>
          </>
        ) : null}

        {tab === 9 ? (
          <div className="op-card res-project-info"><div className="res-section-title">基础信息</div><div className="res-info-grid">{[["项目名称", "智慧园区"], ["项目简称", "智慧园区"], ["项目类型", "宿舍"], ["项目地址", "辽宁,大连,普兰店,太平,龙山"], ["项目简介", "--"], ["管理面积", "20.0000㎡"], ["可招商面积", "0.0000㎡"], ["总资源数量", "250间"], ["可招商资源数量", "0间"]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="res-section-title">拓展信息</div><div className="res-info-grid">{[["排序值", "--"], ["竣工时间", "--"], ["标准层高", "--"], ["物业", "--"], ["物业费", "--"], ["车位数量", "--"], ["车位月租金", "--"], ["空调", "--"], ["空调费", "--"], ["空调开放时间", "--"], ["电梯", "--"], ["网络", "--"], ["入驻企业", "--"], ["招商岗位", "--"], ["招商部门", "--"], ["招商时间", "--"]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="res-section-title">附件信息</div><SkButton onClick={() => show("添加附件")}>添加附件</SkButton><SkTable className="op-wide-table" columns={["文件名", "操作人", "操作时间", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>
        ) : null}

        {tab === 10 ? (
          <Panel title="项目进展" actions={<><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("添加项目进展")}>添加项目进展</SkButton><SkButton>更多 ⌄</SkButton></>}><SkTable className="op-wide-table" columns={["时间", "项目阶段", "图片", "简短描述", "用户端展示", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></Panel>
        ) : null}

        {tab === 11 ? (
          <div className="op-card"><div className="res-note">将展示在用户移动端的“常用电话”页面。如果项目不使用用户移动端，则无需添加。</div><div className="op-card-head"><strong>分类管理</strong><SkButton onClick={() => show("添加分类")}>添加分类</SkButton></div><SkEmpty text="暂无数据" /><div className="op-card-head"><strong>常用电话</strong><SkButton variant="primary" onClick={() => show("添加号码")}>添加号码</SkButton></div><SkTable className="op-wide-table" columns={["号码名称", "电话", "排序", "物业统一电话", "状态", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>
        ) : null}

        {tab === 12 ? (
          <div className="op-card"><div className="res-note">记录项目周边重要公共设施与配套资源的分布位置，移动端项目详情中会展示。</div><div className="op-card-head"><strong>分类管理</strong><SkButton onClick={() => show("添加分类")}>添加分类</SkButton></div><SkEmpty text="暂无分类" /><div className="op-card-head"><strong>周边明细</strong><SkButton variant="primary" onClick={() => show("添加周边")}>添加周边</SkButton></div><SkTable className="op-wide-table" columns={["名称", "图标", "地址", "经纬度", "排序值", "状态", "操作"].map((title, index) => ({ key: String(index), title }))} rows={[]} /></div>
        ) : null}
      </section>

      <SkModal
        open={projectOpen}
        title="新建项目"
        width={520}
        onClose={() => setProjectOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setProjectOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!projectName.trim()) {
                  show("请输入项目名称");
                  return;
                }
                setProjectOpen(false);
                show("新建成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <div className="pp-modal-form">
          <OfficeField label="项目名称" required><SkInput value={projectName} onChange={setProjectName} /></OfficeField>
          <OfficeField label="项目类型"><SkSelect placeholder="请选择" options={["宿舍", "产业园区", "商业"]} /></OfficeField>
          <OfficeField label="项目地址"><SkInput /></OfficeField>
        </div>
      </SkModal>
      {node}
    </OpPage>
  );
}
