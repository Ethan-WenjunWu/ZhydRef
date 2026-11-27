已完成「A1 数据中心 > 工作台」的克隆，本地路由：**`/orgs/index`**（镜像源站 `#/index`）。按约定只处理这一页，没有继续下一个页面。

## 已实现内容

**应用框架**
- 56px 渐变头部：公司名/「选择 2 楼宇」、13 个顶部模块、消息角标、用户菜单
- 顶部菜单自适应溢出：1440 下显示 8 个模块 +「更多」，2560 下显示全部 13 个
- 180px 深色侧栏（数据中心菜单、分组图标、选中渐变、「数据看板」等分组可展开/收起）
- 侧栏折叠：68px 图标模式，头部 Logo 区保持 210px（与源站一致）
- 40px 标签栏：工作台标签、刷新、右侧「更多」下拉（刷新/最大化/全屏/新窗口/关闭项）
- 全屏防泄密水印（源站 380×380 水印瓦片）

**工作台内容**
- 到期提醒条（红色「到期提醒」标签）
- 8 张指标卡、12 个常用功能入口（真实图片 + iconfont 图标）
- 日程管理：2026 年 11 月日历、今日 27 高亮、年/月下拉切换、今日日程栏
- 企业公告空状态（Ant Design 空状态插画）
- 消息抽屉：70% 宽、全部/未处理/已完成筛选、4 条通知（真实头像/时间/未读数）、右侧空状态、水印覆盖

核心文件：[AppShell.tsx](src/components/sites/kuaijing/app/AppShell.tsx)、[WorkbenchPage.tsx](src/components/sites/kuaijing/app/WorkbenchPage.tsx)、[kuaijing-app.css](src/components/sites/kuaijing/app/kuaijing-app.css)、[data.ts](src/components/sites/kuaijing/app/data.ts)。

## 校验

- `npm run check` 通过（7 条静态路由，含 `/orgs/index`）
- 1440 实测：日程卡 484.6px、公告卡 289.4px、卡片 179.9×120、功能项 172.9×66
- 2560 实测：左/右栏 1453.9/891.1、卡片 353.5×120、日程卡 484.6、公告卡 566.4
- 与源站误差均 ≤1px（差异来自滚动条宽度），日历、侧栏展开项、消息抽屉、折叠态逐项对齐

对照截图：
- [源站 1440](docs/design-references/kuaijing-workbench-source-1440.png) / [本地 1440](docs/design-references/kuaijing-local-workbench-1440.png)
- [源站 2560](docs/design-references/kuaijing-workbench-source-2560.png) / [本地 2560](docs/design-references/kuaijing-local-workbench-2560.png)
- [源站消息抽屉](docs/design-references/kuaijing-workbench-source-drawer-1440.png) / [本地消息抽屉](docs/design-references/kuaijing-local-workbench-drawer-1440.png)
- [源站折叠侧栏](docs/design-references/kuaijing-workbench-source-collapsed-1440.png) / [本地折叠侧栏](docs/design-references/kuaijing-local-workbench-collapsed-1440.png)
- [日历细节对照](docs/design-references/kuaijing-workbench-source-calendar.png)

预览：`npm run dev`，打开 http://localhost:3000/orgs/index

## 当前页面尚未接线的部分（等你确认后按页面逐步补）

- 顶部模块切换、侧栏叶子菜单、指标卡、常用功能入口：视觉和选中态正确，但暂不跳转（目标页尚未克隆）
- 「自定义」「新建日程」「日程管理 更多」「企业公告 更多」、日历日期点选、用户菜单、楼宇选择：暂不打开弹窗
- 消息抽屉条目点击只做选中高亮，不打开消息详情
- 日历固定锚定抓取时的 2026 年 11 月；水印、公司名、楼宇、用户「王」、通知列表均为抓取时的账号数据

源站窗口未做数据改动，仅进行了只读勘察和 UI 展开/折叠，最后已恢复为展开侧栏、关闭抽屉。改动尚未提交。

请确认这一页是否可以，确认后我再处理列表中的下一个页面。





---------------------------------------------------------------------------------






---------------------------------------------------------------------------------
