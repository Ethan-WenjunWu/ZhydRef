已完成 A5「客商管理」下全部 4 个左侧菜单，以及由它们进入的深层页面：归档业户列表、客商详情（6 个标签页）、IC卡列表，以及导入/导出、拓展字段、客商标签、行业标签、新增/编辑业户、新增/编辑业户人员、添加IC卡等抽屉与弹层。只处理了这一级菜单。

## 本地路由

统一 `/orgs/customer/<slug>`：

- 业户列表：`tenants`
- 归档业户列表：`tenant-archive`
- 客商详情：`tenant-detail`
- 业户人员管理：`people`
- IC卡列表：`ic-cards`
- 业户人员分析：`analysis`
- 供应商列表：`suppliers`

顶部「客商管理」已接线到 `/orgs/customer/tenants`；左侧菜单点击在各页之间正常跳转。

## 重点还原

- **业户列表**：搜索业户名称、归档业户列表入口；业户总数/企业总数/个人总数/合同数量四项统计；企业列表与个人列表两个横向标签页（列集合不同，个人列表含 A01 行与查看/编辑/删除）；列设置下拉（全部、恢复默认、列勾选）；更多菜单（导入数据 → 导入业户弹窗、导出数据、拓展字段抽屉、客商标签、行业标签）。
- **归档业户列表**：标题 + 右侧搜索、企业列表标签、列设置、企业列表空态表格。
- **客商详情【A01】**：头像与名称、删除/编辑；详情、合同、账单、附件、开票信息、人员列表 6 个标签页；详情基本信息字段；合同一条记录；账单的收款/付款子标签；开票信息与人员列表的记录与操作链接。
- **业户人员管理**：7 项筛选（关键字、所属业户、所属楼宇、用户身份、审核状态、照片状态、绑定房间）+ 重置/搜索；业户人员列表（放大、刷新、IC卡管理、新增、更多）；A01 行含手机号脱敏与眼睛图标、已审核状态点、待检测链接、IC卡/编辑/删除；放大弹层、新增/编辑人员抽屉（基本信息、用户详细信息两个标签）、IC卡抽屉、更多菜单。
- **IC卡列表**：标题 + 添加IC卡、业户与IC卡号筛选、RFID读卡未启动状态、表格空态；添加IC卡抽屉（业户、用户、IC卡号、状态正常/禁止）。
- **业户人员分析**：信息汇总与人员字段管理两个标签；智慧园区下拉；17 个分析卡（血型、学历、政治面貌、民族、照护等级、婚姻状况、是否托管、居住情况、服务类型、失能情况、残疾情况、离退休人员、社区重点人群、是否重点儿童、是否低保户、参保类型、性别分析），含横向条形图、纵向条形图、饼图与图例/翻页；人员字段管理表格（原始名称、自定义名称、启用开关、输入框类型、是否必填、排序号，44 行）。
- **供应商列表**：搜索供应商名称；供应商数量/企业供应商/个人供应商三项统计；企业供应商标签；列设置与更多菜单；+供应商抽屉（与添加业户同结构，标题为添加供应商、客商类型为供应商）。

新增/编辑等按钮均按「点击后等待 5 秒」核对；数据为演示数据，增删改仅页面状态，刷新后恢复。

## 校验

- `npm run check` 通过（lint + typecheck + build），**221 个静态页面**生成，新增 7 个 `/orgs/customer/<slug>` 路由。
- 浏览器逐页验证：业户列表（企业/个人标签、更多菜单、导入弹窗、拓展字段/客商标签抽屉）、客商详情 6 个标签、业户人员管理与新增抽屉、IC卡列表与添加抽屉、业户人员分析两个标签、供应商列表、归档业户列表；控制台无报错。
- 顶部导航与既有路由回归检查通过（例如 `/orgs/investment/clues` 正常）。
- 证据截图：`cust-source-tenants.png`、`cust-source-tenant-add.png`、`cust-source-tenant-detail.png`、`cust-source-people.png`、`cust-source-people-analysis.png`、`cust-source-suppliers.png`、`cust-source-iccard.png`，以及对应的 `cust-local-*.png`。

改动尚未提交。请确认这一批页面是否可以，确认后我再继续下一个一级菜单。
---------------------------------------------------------------------------------
上述内容是AI自动写入本文件的，下述是AI处理结束后汇报的内容。
---------------------------------------------------------------------------------
可以继续，已经恢复，没有丢失任何改动。

**刚才报错的原因**：我在你的 `npm run dev`（3000 端口）运行期间执行了一次生产构建 `npm run build`，`.next` 目录被覆盖，dev 服务器短暂拿到了旧的模块缓存，于是出现了一次 `Cannot read properties of undefined (reading 'find')` 的 500。dev 重新编译后即恢复正常；`lint` / `typecheck` / `build` 全部通过，代码本身没有问题。如果你自己的浏览器还停在报错页，刷新一次即可。

A5「客商管理」已完成，预览：http://localhost:3000/orgs/customer/tenants

## 已完成内容

统一路由 `/orgs/customer/<slug>`（新增 7 个页面，构建共 221 个静态页面）：

| 页面 | 路由 |
| --- | --- |
| 业户列表（企业/个人标签页、4 项统计、列设置、更多菜单、添加/编辑/删除） | `/orgs/customer/tenants` |
| 归档业户列表 | `/orgs/customer/tenant-archive` |
| 客商详情【A01】（详情/合同/账单/附件/开票信息/人员列表） | `/orgs/customer/tenant-detail` |
| 业户人员管理（7 项筛选、放大、IC卡管理、新增/编辑抽屉） | `/orgs/customer/people` |
| IC卡列表（添加IC卡抽屉、RFID 状态） | `/orgs/customer/ic-cards` |
| 业户人员分析（17 个分析卡 + 人员字段管理 44 行） | `/orgs/customer/analysis` |
| 供应商列表（3 项统计、企业供应商、添加供应商） | `/orgs/customer/suppliers` |

- 弹层/抽屉均已还原：导入业户、拓展字段（含添加字段）、客商标签/行业标签（含新建）、添加业户/编辑业户（双标签、默认联系人、账户信息、工商信息、是否归档等）、新增业户人员、添加 IC 卡。
- 顶部「客商管理」已接线，左侧菜单与标签页跳转正常；源站和本地页面已在 Chrome 中逐页对照（证据图在 [design-references/](docs/design-references/)，如 [cust-source-tenants.png](docs/design-references/cust-source-tenants.png) / [cust-local-tenants.png](docs/design-references/cust-local-tenants.png)）。
- 控制台无报错；既有路由回归正常（如 `/orgs/investment/clues`）。
- 改动摘要写入 [result-0012.md](docs/step-by-step-prompts/results/result-0012.md)，路由表补进 [README.md](docs/research/kuaijing/README.md)。

主要新增代码：[CustomerPages.tsx](src/components/sites/kuaijing/customer/CustomerPages.tsx)、[common.tsx](src/components/sites/kuaijing/customer/common.tsx)、[tenants.tsx](src/components/sites/kuaijing/customer/tenants.tsx)、[tenant-detail.tsx](src/components/sites/kuaijing/customer/tenant-detail.tsx)、[people.tsx](src/components/sites/kuaijing/customer/people.tsx)、[analysis.tsx](src/components/sites/kuaijing/customer/analysis.tsx)、[CustomerShell.tsx](src/components/sites/kuaijing/app/CustomerShell.tsx)。

改动**尚未提交**。请确认这一批页面，确认后我再继续下一个一级菜单。
