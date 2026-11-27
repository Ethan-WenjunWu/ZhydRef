"use client";

import { useState } from "react";

import {
  SkButton,
  SkDrawer,
  SkEmpty,
  SkInput,
  SkModal,
  SkPagination,
  SkSelect,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "../office/common";

export function StockPage() {
  const { show, node } = useSkMessage();
  return (
    <div className="pp-page pp-plain-page">
      <div className="pp-material-toolbar">
        <label className="pp-check-line"><input type="checkbox" />按仓库统计与定价</label>
        <div className="pp-material-search"><SkInput placeholder="输入物料名称、品牌、编码..." /><span>⌕</span></div>
        <span className="sk-link">高级搜索</span>
        <div className="pp-material-actions">
          <SkButton onClick={() => show("导出成功")}>导出数据 ⌄</SkButton>
          <SkButton variant="primary" onClick={() => show("物料入库")}>物料入库</SkButton>
          <SkButton variant="primary" onClick={() => show("物料派发")}>物料派发</SkButton>
          <SkButton onClick={() => show("审批流设置")}>审批流设置 ⌄</SkButton>
        </div>
      </div>
      <div className="pp-count-row"><span>共计 0 项</span><span>自定义列显示 ▦</span></div>
      <SkTable
        className="pp-wide-table"
        columns={[
          { key: "code", title: "物料编码" },
          { key: "name", title: "物料名称" },
          { key: "category", title: "物料分类" },
          { key: "barcode", title: "商品条码" },
          { key: "brand", title: "品牌" },
          { key: "model", title: "规格型号" },
          { key: "op", title: "操作" },
        ]}
        rows={[]}
      />
      {node}
    </div>
  );
}

type DocKind = "inbound" | "handout" | "transfer" | "handle" | "adjust" | "receive";

const DOC_CONFIG: Record<DocKind, { title: string; columns: string[]; addLabel: string; tabs?: string[] }> = {
  inbound: {
    title: "物料入库",
    columns: ["单据编号", "单据状态", "入库仓库", "入库处理人", "入库时间", "来源", "供应商", "合计金额", "不含税合计金额", "入库备注", "操作"],
    addLabel: "新增单据",
  },
  handout: {
    title: "派发/退库",
    columns: ["派发单号", "单据状态", "领用人", "领用部门", "出库仓库", "派发处理人", "派发时间", "派发备注", "操作"],
    addLabel: "新增单据",
    tabs: ["派发", "退库"],
  },
  transfer: {
    title: "物料调拨",
    columns: ["单据编号", "单据状态", "调出管理员", "调出仓库", "调入管理员", "调入仓库", "合计数量", "合计金额", "调拨备注", "操作"],
    addLabel: "新增单据",
  },
  handle: {
    title: "物料处置",
    columns: ["单据编号", "单据状态", "处置发起人", "发起部门", "处置仓库", "发起时间", "合计金额", "处置原因", "操作"],
    addLabel: "新增单据",
  },
  adjust: {
    title: "库存调整",
    columns: ["单据编号", "单据状态", "调整仓库", "调整处理人", "调整时间", "调整备注", "操作"],
    addLabel: "新增单据",
  },
  receive: {
    title: "员工申请单据",
    columns: ["单据编号", "关联单据类型", "关联单据编号", "单据状态", "申请人", "申请部门", "申领仓库", "申请原因", "操作"],
    addLabel: "新增单据",
    tabs: ["库存物料领用", "物料领用", "物料退还"],
  },
};

export function MaterialDocPage({ kind }: { kind: DocKind }) {
  const config = DOC_CONFIG[kind];
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [warehouse, setWarehouse] = useState("");
  const [handler, setHandler] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [rows, setRows] = useState<string[][]>([]);
  const { show, node } = useSkMessage();

  return (
    <div className="pp-page pp-plain-page">
      {config.tabs ? (
        <SkTabs items={config.tabs} active={tab} onChange={setTab} />
      ) : null}
      <div className="pp-material-toolbar">
        <SkButton onClick={() => show("高级搜索")}>高级搜索</SkButton>
        <span className="sk-link">导出选中数据</span>
        <div className="pp-material-actions">
          <SkButton onClick={() => show("导出成功")}>导出数据</SkButton>
          <SkButton onClick={() => show("单据编号设置")}>单据编号设置</SkButton>
          <SkButton variant="primary" onClick={() => setOpen(true)}>{config.addLabel}</SkButton>
        </div>
      </div>
      <div className="pp-count-row"><span>共计 {rows.length} 项</span><span>自定义列显示 ▦</span></div>
      <SkTable
        className="pp-wide-table"
        columns={config.columns.map((title, index) => ({ key: String(index), title }))}
        rows={rows}
      />
      <SkDrawer
        open={open}
        title={config.title}
        width={680}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!warehouse) {
                  show("请选择仓库");
                  return;
                }
                const number = `202611270000000${rows.length + 1}`;
                const filled = config.columns.map((column, index) => {
                  if (index === 0) return number;
                  if (index === 1) return "待审核";
                  if (index === 2) return warehouse;
                  if (index === 3) return handler || "王";
                  if (index === 4) return date || "2026-11-27";
                  return "";
                });
                setRows((current) => [...current, filled]);
                setOpen(false);
                show("保存成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="pp-drawer-form">
          <OfficeField label="仓库" required><SkSelect value={warehouse} options={["主仓库", "物料仓"]} onChange={setWarehouse} placeholder="请选择仓库" /></OfficeField>
          <OfficeField label="处理人"><SkSelect value={handler} options={["王", "郑维修长"]} onChange={setHandler} placeholder="请选择" /></OfficeField>
          <OfficeField label="日期"><SkInput type="date" value={date} onChange={setDate} /></OfficeField>
          <OfficeField label="备注"><textarea className="sk-textarea" value={note} onChange={(event) => setNote(event.target.value)} /></OfficeField>
          <OfficeField label="物料明细">
            <SkButton onClick={() => show("已添加一行物料")}>+ 添加物料</SkButton>
          </OfficeField>
        </div>
      </SkDrawer>
      {node}
    </div>
  );
}

export function InventoryTaskPage() {
  const { show, node } = useSkMessage();
  const stats = ["盘点计划数", "盘点任务数", "未盘", "已盘", "异常", "盘盈", "盘亏"];
  return (
    <div className="pp-page pp-plain-page">
      <div className="pp-stat-grid is-seven">
        {stats.map((stat) => (
          <div key={stat} className="pp-stat-card is-bordered"><span>{stat}</span><strong>0</strong></div>
        ))}
      </div>
      <div className="pp-content-card is-plain">
        <div className="pp-plan-filter">
          <SkSelect defaultValue="全部盘点计划" options={["全部盘点计划"]} />
          <span>／0</span>
          <div className="pp-plan-tabs">
            {["全部", "未盘(0)", "已盘(0)", "异常(0)", "盘盈(0)", "盘亏(0)"].map((tab, index) => (
              <span key={tab} className={index === 0 ? "is-active" : ""}>{tab}</span>
            ))}
          </div>
        </div>
        <div className="pp-toolbar-actions">
          <SkButton onClick={() => show("发起讨论")}>发起讨论</SkButton>
          <SkButton>高级搜索</SkButton>
          <SkButton>结束盘点</SkButton>
          <SkButton>盘点员</SkButton>
          <SkButton>员工</SkButton>
        </div>
      </div>
      <div className="pp-list-card">
        <div className="pp-list-head"><strong>盘点计划列表</strong><div className="pp-toolbar-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton>更多 ⌄</SkButton></div></div>
        <SkTable
          className="pp-wide-table"
          columns={[
            { key: "code", title: "物料编码" },
            { key: "status", title: "盘点状态" },
            { key: "scope", title: "是否在盘点范围" },
            { key: "note", title: "盘点备注" },
            { key: "image", title: "盘点图片" },
            { key: "warehouse", title: "所属仓库" },
            { key: "shelf", title: "货架名称" },
            { key: "name", title: "物料名称" },
            { key: "stock", title: "系统库存" },
            { key: "op", title: "操作" },
          ]}
          rows={[]}
        />
      </div>
      {node}
    </div>
  );
}

export function InventoryPlanPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [scope, setScope] = useState("");
  const [checker, setChecker] = useState("");
  const { show, node } = useSkMessage();
  return (
    <div className="pp-page pp-plain-page">
      <div className="pp-content-card is-plain">
        <div className="pp-search-top"><span>未选择筛选字段</span><span className="pp-search-top-actions"><span className="sk-link">清除选项</span><span>收起 ⌃</span></span></div>
        <div className="pp-search-row">
          <OfficeField label="盘点名称"><SkInput placeholder="请输入" /></OfficeField>
          <OfficeField label="盘点状态"><SkSelect placeholder="请选择盘点状态" /></OfficeField>
          <div className="pp-filter-actions"><SkButton variant="primary">搜索</SkButton><SkButton>重置</SkButton></div>
        </div>
      </div>
      <div className="pp-list-card">
        <div className="pp-list-head"><strong>盘点计划列表</strong><div className="pp-toolbar-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => setOpen(true)}>+ 新增盘点</SkButton><SkButton>更多 ⌄</SkButton></div></div>
        <SkTable
          className="pp-wide-table"
          columns={["盘点计划名称", "盘点计划状态", "盘点计划进展", "员工盘点进展", "盘点员", "盘点范围（物料分类）", "盘点范围（所属仓库）", "盘点范围（所属货架）", "创建人", "创建时间", "操作"].map((title, index) => ({ key: String(index), title }))}
          rows={[]}
        />
      </div>
      <SkModal
        open={open}
        title="新增盘点"
        width={620}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim()) {
                  show("请输入盘点名称");
                  return;
                }
                setOpen(false);
                show("新增成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="pp-modal-form">
          <OfficeField label="盘点名称" required><SkInput value={name} onChange={setName} /></OfficeField>
          <OfficeField label="盘点分类"><SkSelect value={scope} options={["全部", "办公用品", "维修物料"]} onChange={setScope} placeholder="请选择" /></OfficeField>
          <OfficeField label="盘点员"><SkSelect value={checker} options={["王", "郑维修长"]} onChange={setChecker} placeholder="请选择" /></OfficeField>
        </div>
      </SkModal>
      {node}
    </div>
  );
}

export function CategorySettingPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const { show, node } = useSkMessage();
  return (
    <div className="pp-page pp-plain-page">
      <div className="pp-material-toolbar">
        <div className="pp-material-actions">
          <SkButton onClick={() => show("导出成功")}>导出全部</SkButton>
          <SkButton onClick={() => show("导入数据")}>导入数据</SkButton>
          <SkButton variant="primary" onClick={() => setOpen(true)}>新增分类</SkButton>
        </div>
      </div>
      <SkTable
        columns={[
          { key: "code", title: "分类编码" },
          { key: "name", title: "分类名称" },
          { key: "parent", title: "上级分类" },
          { key: "status", title: "状态" },
          { key: "note", title: "备注" },
          { key: "op", title: "操作" },
        ]}
        rows={[]}
      />
      <SkModal
        open={open}
        title="新增分类"
        width={520}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim()) {
                  show("请输入分类名称");
                  return;
                }
                setOpen(false);
                show("新增成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <div className="pp-modal-form">
          <OfficeField label="分类编码"><SkInput value={code} onChange={setCode} /></OfficeField>
          <OfficeField label="分类名称" required><SkInput value={name} onChange={setName} /></OfficeField>
          <OfficeField label="上级分类"><SkSelect placeholder="请选择" options={["无", "办公用品", "维修物料"]} /></OfficeField>
        </div>
      </SkModal>
      {node}
    </div>
  );
}

export function ArchiveSettingPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { show, node } = useSkMessage();
  return (
    <div className="pp-page pp-plain-page">
      <div className="pp-material-toolbar">
        <SkButton onClick={() => show("高级搜索")}>高级搜索</SkButton>
        <div className="pp-material-actions">
          <SkButton onClick={() => show("导出成功")}>导出数据</SkButton>
          <SkButton onClick={() => show("导入数据")}>导入数据</SkButton>
          <SkButton variant="primary" onClick={() => setOpen(true)}>新增档案</SkButton>
        </div>
      </div>
      <div className="pp-count-row"><span>共计 0 项</span><span>自定义列显示 ▦</span></div>
      <SkTable
        className="pp-wide-table is-archive"
        columns={["物料编码", "物料名称", "物料分类", "商品条码", "品牌", "规格型号", "计量单位", "默认单价", "小数位数(数量)", "小数位数(单价)", "成本计算方法", "是否固定入库单价", "限领数量(人/月)", "是否允许退库", "备注", "操作"].map((title, index) => ({ key: String(index), title }))}
        rows={[]}
      />
      <SkDrawer
        open={open}
        title="新增档案"
        width={700}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim()) {
                  show("请输入物料名称");
                  return;
                }
                setOpen(false);
                show("新增成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="pp-drawer-form">
          <OfficeField label="物料名称" required><SkInput value={name} onChange={setName} /></OfficeField>
          <OfficeField label="物料分类"><SkSelect placeholder="请选择" options={["办公用品", "维修物料"]} /></OfficeField>
          <OfficeField label="商品条码"><SkInput /></OfficeField>
          <OfficeField label="品牌"><SkInput /></OfficeField>
          <OfficeField label="规格型号"><SkInput /></OfficeField>
          <OfficeField label="计量单位"><SkInput defaultValue="件" /></OfficeField>
          <OfficeField label="默认单价"><SkInput /></OfficeField>
        </div>
      </SkDrawer>
      {node}
    </div>
  );
}

export function WarehouseSettingPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { show, node } = useSkMessage();
  return (
    <div className="pp-page pp-plain-page pp-warehouse-page">
      <aside className="pp-warehouse-tree"><SkEmpty text="暂无数据" /></aside>
      <section className="pp-warehouse-main">
        <div className="pp-filter-grid is-five">
          <OfficeField label="仓库编码"><SkInput /></OfficeField>
          <OfficeField label="仓库名称"><SkInput /></OfficeField>
          <OfficeField label="仓库类型"><SkSelect placeholder="不限" options={["不限", "实体仓", "虚拟仓"]} /></OfficeField>
          <OfficeField label="状态"><SkSelect placeholder="不限" options={["不限", "启用", "停用"]} /></OfficeField>
          <OfficeField label="仓库管理员"><SkSelect placeholder="请选择流程管理员" /></OfficeField>
          <div className="pp-filter-actions"><SkButton variant="primary">搜索</SkButton><SkButton>重置</SkButton></div>
        </div>
        <div className="pp-material-toolbar pp-warehouse-actions">
          <div className="pp-material-actions">
            <SkButton onClick={() => show("导出成功")}>导出全部</SkButton>
            <SkButton onClick={() => show("导入成功")}>批量导入仓库</SkButton>
            <SkButton variant="primary" onClick={() => setOpen(true)}>新增仓库</SkButton>
          </div>
        </div>
        <SkTable
          columns={[
            { key: "code", title: "仓库编码" },
            { key: "name", title: "仓库名称" },
            { key: "type", title: "仓库类型" },
            { key: "parent", title: "上级仓库" },
            { key: "shelves", title: "货架数量" },
            { key: "status", title: "状态" },
            { key: "manager", title: "仓库管理员" },
            { key: "note", title: "备注" },
            { key: "op", title: "操作" },
          ]}
          rows={[]}
        />
      </section>
      <SkModal
        open={open}
        title="新增仓库"
        width={520}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim()) {
                  show("请输入仓库名称");
                  return;
                }
                setOpen(false);
                show("新增成功");
              }}
            >
              确 定
            </SkButton>
          </>
        }
      >
        <div className="pp-modal-form">
          <OfficeField label="仓库编码"><SkInput /></OfficeField>
          <OfficeField label="仓库名称" required><SkInput value={name} onChange={setName} /></OfficeField>
          <OfficeField label="仓库类型"><SkSelect placeholder="请选择" options={["实体仓", "虚拟仓"]} /></OfficeField>
          <OfficeField label="仓库管理员"><SkSelect placeholder="请选择" options={["王", "郑维修长"]} /></OfficeField>
        </div>
      </SkModal>
      {node}
    </div>
  );
}

export function CodeSettingPage() {
  const [rows, setRows] = useState([
    ["默认编码规则", "上报日期+流水号", "2026112700000", "全部分类", ""],
  ]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [rule, setRule] = useState("");
  const { show, node } = useSkMessage();
  return (
    <div className="pp-page pp-plain-page">
      <div className="pp-list-card">
        <div className="pp-list-head"><strong>编号规则列表</strong><div className="pp-toolbar-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => setOpen(true)}>+ 新增规则</SkButton></div></div>
        <SkTable
          columns={[
            { key: "title", title: "编号规则标题" },
            { key: "rule", title: "编号规则" },
            { key: "preview", title: "规则结果预览" },
            { key: "category", title: "绑定分类" },
            { key: "op", title: "操作" },
          ]}
          rows={rows.map((row) => [
            row[0],
            row[1],
            row[2],
            row[3],
            <span key="op" className="sk-action-link" onClick={() => show("编辑规则")}>编辑</span>,
          ])}
        />
        <SkPagination total={rows.length} pageSize={20} showTotal />
      </div>
      <SkModal
        open={open}
        title="新增规则"
        width={560}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!title.trim() || !rule.trim()) {
                  show("请输入规则标题和规则");
                  return;
                }
                setRows((current) => [...current, [title, rule, "2026112700001", "全部分类", ""]]);
                setOpen(false);
                show("新增成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="pp-modal-form">
          <OfficeField label="编号规则标题" required><SkInput value={title} onChange={setTitle} /></OfficeField>
          <OfficeField label="编号规则" required><SkInput value={rule} onChange={setRule} placeholder="例如：上报日期+流水号" /></OfficeField>
          <OfficeField label="绑定分类"><SkSelect placeholder="请选择" options={["全部分类", "办公用品", "维修物料"]} /></OfficeField>
        </div>
      </SkModal>
      {node}
    </div>
  );
}

export function MyMaterialPage() {
  const [open, setOpen] = useState(false);
  const { node } = useSkMessage();
  return (
    <div className="pp-page pp-plain-page">
      <div className="pp-material-toolbar"><SkButton onClick={() => setOpen(true)}>高级搜索</SkButton></div>
      <div className="pp-search-row">
        <OfficeField label="领用单号"><SkInput /></OfficeField>
        <OfficeField label="领用时间"><SkInput type="date" /></OfficeField>
      </div>
      <SkTable
        className="pp-wide-table"
        columns={["领用单号", "领用时间", "物料编码", "物料名称", "物料分类", "出库仓库", "领用数量", "合计金额"].map((title, index) => ({ key: String(index), title }))}
        rows={[]}
      />
      <SkModal open={open} title="高级搜索" width={560} onClose={() => setOpen(false)} footer={<SkButton variant="primary" onClick={() => setOpen(false)}>搜索</SkButton>}>
        <div className="pp-modal-form"><OfficeField label="物料编码"><SkInput /></OfficeField><OfficeField label="物料名称"><SkInput /></OfficeField><OfficeField label="物料分类"><SkSelect placeholder="请选择" options={["办公用品", "维修物料"]} /></OfficeField></div>
      </SkModal>
      {node}
    </div>
  );
}

export function ApplyRecordsPage() {
  const [status, setStatus] = useState("不限");
  const { show, node } = useSkMessage();
  return (
    <div className="pp-page pp-plain-page">
      <div className="pp-apply-head">
        <div className="pp-apply-status">
          <span>状态：</span>
          {["不限", "进行中", "已完结", "已驳回", "已撤销"].map((item) => (
            <button key={item} type="button" className={status === item ? "is-active" : ""} onClick={() => setStatus(item)}>{item}</button>
          ))}
        </div>
        <SkButton variant="primary" onClick={() => show("填写申请单")}>填写申请单</SkButton>
      </div>
      <div className="pp-apply-time"><span>时间：</span><SkInput type="date" /></div>
      <SkEmpty text="暂无数据" />
      {node}
    </div>
  );
}
