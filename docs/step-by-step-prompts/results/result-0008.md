已完成 A1「数据中心」下全部左侧菜单页面，包括深层菜单、横向报表标签页和新窗口数据大屏。只处理了这一级菜单。

## 本地路由

- 数据看板：`/orgs/data/overview`、`project`、`asset`、`resource`、`lease-analysis`、`tenant-analysis`、`property-analysis`
- 剖面图：`/orgs/data/lease-drawing`、`property-drawing`、`apartment-drawing`、`parking-drawing`
- 报表统计：`/orgs/data/financial-report`、`income-report`、`retreat-report`、`property-report`
- 数据可视化：
  - 入口：`/datav`
  - 综合数据大屏：`/datav/overview`
  - 租赁数据大屏：`/datav/lease`
  - 招商数据大屏：`/datav/merchant`
  - 物业数据大屏：`/datav/property`

## 实现内容

- **数据总览**：到期提醒、8 个 KPI 卡、空置预警柱状图、房源概况环图、比率/均价、合同执行、智能设备、审批/通知/招商底部面板。
- **其他数据看板**：项目概况、资产评估、资源分析、租赁分析、租客分析、物业分析；物业分析含「工单看板/巡检看板/能源看板/在线报修」页签。
- **剖面图**：公司/项目/楼栋/楼层树、7 个统计卡、状态图例、每层 101–150 房号网格、2D 平面图/更多按钮。
- **财务报表**：9 个横向标签页全部接线：应收报表、应支报表、调整单据、结转报表、收入单据、租赁收益、支付方式、费用类型、开票统计；保留各页列、已抓取行数据、表格/图表切换和导出。
- **收入/退房/物业报表**：各自页签、筛选、统计和表格。
- **数据可视化**：4 个左侧子菜单点击后按源站行为在新浏览器窗口打开 `/datav/*`；大屏页面包含顶部时间/天气、项目条、左侧/右侧图表面板、地图画布、底部 KPI 和通知抽屉；`/datav` 还原项目选择与「进入」流程。

所有深层点击均等待 5 秒后再读取源页面。

## 校验

- `npm run check` 通过（lint + typecheck + build），**142 个静态页面**生成。
- 新增 19 个 `/orgs/data/<slug>` 路由，以及 `/datav` + 4 个 `/datav/<slug>` 路由。
- 浏览器验证了数据总览、房态图、财务报表 9 个标签页、数据可视化大屏及新窗口打开行为，控制台无报错。
- 证据截图：`data-source-overview.png`、`data-source-datav-select.png`、`data-source-datav-lease.png`、`data-local-overview.png`、`data-local-floorplan.png`、`data-local-financial.png`、`data-local-datav-overview.png`。

说明：演示数据克隆，图表为静态视觉还原，增删改仅保存在页面状态；源站大屏数据为虚拟预览数据，本地按抓取结构呈现。

改动尚未提交。请确认这一批页面是否可以，确认后我再继续下一个一级菜单。
---------------------------------------------------------------------------------
上述内容是AI自动写入本文件的，下述是AI处理结束后汇报的内容。
---------------------------------------------------------------------------------
可以继续，刚才的 400 是中途工具调用异常，不影响已写入的代码。我已继续完成 A1 并重新跑了完整校验。

## A1 数据中心完成情况

### 数据看板 7 页
`/orgs/data/overview`、`project`、`asset`、`resource`、`lease-analysis`、`tenant-analysis`、`property-analysis`

- 数据总览：到期提醒、8 个 KPI、空置预警、房源概况环图、比率/均价、合同执行、智能设备及底部审批/通知/招商面板。
- 物业分析包含「工单看板/巡检看板/能源看板/在线报修」页签。

### 剖面图 4 页
`/orgs/data/lease-drawing`、`property-drawing`、`apartment-drawing`、`parking-drawing`

- 公司/项目/楼栋/楼层树，点击楼栋和 B1、1–5 层会切换。
- 每层 101–150 房号网格、状态图例、统计卡、2D 平面图按钮。
- 已按“点击楼栋后等待 5 秒”核对。

### 报表统计 4 页
`/orgs/data/financial-report`、`income-report`、`retreat-report`、`property-report`

- 财务报表的 9 个横向标签页全部逐个点击并等待 5 秒抓取：应收报表、应支报表、调整单据、结转报表、收入单据、租赁收益、支付方式、费用类型、开票统计。
- 各页保留列、已抓取行数据、表格/图表切换、导出按钮。

### 数据可视化 4 个大屏
- 入口页：`/datav`
- 综合：`/datav/overview`
- 租赁：`/datav/lease`
- 招商：`/datav/merchant`
- 物业：`/datav/property`

左侧「数据可视化」下的 4 个菜单点击后会**新开浏览器标签页**，与源站一致。大屏包含顶部时间/天气、项目条、左右图表面板、地图区域、底部 KPI 和通知抽屉。

## 校验

- `npm run check` 通过（lint + typecheck + build）。
- **142 个静态页面**生成。
- 新增 19 个 `/orgs/data/<slug>` 路由，以及 `/datav` + 4 个大屏路由。
- 浏览器验证了数据总览、房态图楼层切换、财务报表全部 9 个标签页、新窗口打开大屏，控制台无报错。
- 证据截图已保存到 `data-source-*.png` 和 `data-local-*.png`。

说明：大屏地图与图表是静态视觉还原，使用抓取的演示数据；源站大屏本身也提示为虚拟预览数据。

请确认 A1 这一批，确认后我再继续下一个一级菜单。