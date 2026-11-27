export type TopModule = {
  key: string;
  name: string;
  icon: string;
};

export type SidebarPage = {
  type: "page";
  key: string;
  name: string;
  icon: string;
};

export type SidebarGroup = {
  type: "group";
  key: string;
  name: string;
  icon: string;
  children: SidebarNode[];
};

export type SidebarNode = SidebarPage | SidebarGroup;

export type WorkbenchCard = {
  title: string;
  value: string;
  moreLabel: string;
  image: string;
};

export type WorkbenchApp = {
  name: string;
  icon?: string;
  image?: string;
};

export type NoticeItem = {
  name: string;
  time: string;
  message: string;
  count: number;
  avatar: string;
};

export const ACCOUNT = {
  company: "大连华安物业管理有限公司",
  building: "2",
  userName: "王",
};

export const TOP_MODULES: TopModule[] = [
  { key: "menu-home-30004", name: "数据中心", icon: "org-menu-zonglan-xuanzhong" },
  { key: "menu-workProperty-220001", name: "资产管理", icon: "org-menu-kongjian" },
  { key: "menu-orgLouyu-30005", name: "资源管理", icon: "org-menu-louyu" },
  { key: "menu-attractInvestment-30001", name: "招商管理", icon: "org-menu-zhaoshang" },
  { key: "menu-owner-39999", name: "客商管理", icon: "org-menu-zuke" },
  { key: "menu-rent-30003", name: "租赁管理", icon: "org-zulinguanli1" },
  { key: "menu-bill-30007", name: "业务财务", icon: "org-menu-shoufukuan" },
  { key: "menu-operationManage-30006", name: "运营管理", icon: "org-menu-yunyingguanli" },
  { key: "menu-costManagement-31224", name: "成本管理", icon: "org-menu-chengbenguanli" },
  { key: "menu-property-30009", name: "物业管理", icon: "org-menu-wuyeguanli" },
  { key: "menu-office-30010", name: "行政办公", icon: "org-menu-xingzhengbangong" },
  { key: "menu-iot-30011", name: "智慧物联", icon: "org-menu-wulianwang" },
  { key: "menu-setting-30002", name: "系统设置", icon: "org-menu-system-setting" },
];

export const SIDEBAR: SidebarNode[] = [
  {
    type: "page",
    key: "menu-workbench-999999999",
    name: "工作台",
    icon: "org-menu-gongzuotai",
  },
  {
    type: "group",
    key: "menu-homeKanban-30018",
    name: "数据看板",
    icon: "org-menu-shujukanban",
    children: [
      { type: "page", key: "menu-homeOverview-30092", name: "数据总览", icon: "org-menu-shujuzonglan" },
      { type: "page", key: "menu-homeOverviewProject-30093", name: "项目概况", icon: "org-menu-xiangmugaikuang" },
      { type: "page", key: "menu-homeOverviewProperty-30094", name: "资产评估", icon: "org-menu-zichanpinggu" },
      { type: "page", key: "menu-homeOverviewRoom-30095", name: "资源分析", icon: "org-menu-ziyuanfenxi" },
      { type: "page", key: "menu-homeLeaseOverview-30096", name: "租赁分析", icon: "org-menu-zulinfenxi" },
      { type: "page", key: "menu-homeOwnerOverview-30097", name: "租客分析", icon: "org-menu-zukefenxi" },
      { type: "page", key: "menu-homeEstateOverview-247105", name: "物业分析", icon: "org-menu-wuyejichushuju" },
    ],
  },
  {
    type: "group",
    key: "menu-homeDrawing-30033",
    name: "剖面图",
    icon: "org-menu-poumiantu",
    children: [
      { type: "page", key: "menu-homeLeaseDrawing-30176", name: "资管房态图", icon: "org-menu-ziguanpoumiantu" },
      { type: "page", key: "menu-homePropertyDrawing-30175", name: "物管房态图", icon: "org-menu-wuguanpoumiantu" },
      { type: "page", key: "menu-apartmentLayoutDrawing-31254", name: "公寓房态图", icon: "org-menu-gongyufangtai" },
      { type: "page", key: "menu-parkSpaceDrawing-10030", name: "车位房态图", icon: "org-menu-cheweifangtaitu" },
    ],
  },
  {
    type: "group",
    key: "menu-homeReport-30038",
    name: "报表统计",
    icon: "org-menu-baobiaotongi",
    children: [
      { type: "page", key: "menu-homeReportLease-30190", name: "财务报表", icon: "org-menu-caiwubaobiao" },
      { type: "page", key: "menu-homeReportIncome-30192", name: "收入报表", icon: "org-menu-shouru" },
      { type: "page", key: "menu-retreatReportList-30191", name: "退房报表", icon: "org-menu-tuifangbaobiao" },
      { type: "page", key: "menu-propertyReport-31253", name: "物业报表", icon: "org-menu-wuyefenxi" },
    ],
  },
  {
    type: "group",
    key: "menu-dataVisualization-30059",
    name: "数据可视化",
    icon: "org-menu-datav",
    children: [
      { type: "page", key: "menu-dataDashboardVisualization-40252", name: "综合数据大屏", icon: "org-menu-datav" },
      { type: "page", key: "menu-leaseManagement-39252", name: "租赁数据大屏", icon: "org-menu-zulinguanli" },
      { type: "page", key: "menu-merchantManagement-37252", name: "招商数据大屏", icon: "org-menu-zhaoshangguanli" },
      { type: "page", key: "menu-propertyDataDashboard-38252", name: "物业数据大屏", icon: "org-menu-wuyeshujudaping" },
    ],
  },
];

export const SETTINGS_SIDEBAR: SidebarNode[] = [
  {
    type: "group",
    key: "menu-companySetting-39998",
    name: "企业设置",
    icon: "org-menu-qiyeshezhi",
    children: [
      { type: "page", key: "menu-companyBasicInfo-30054", name: "企业信息", icon: "org-menu-qiyexinxi" },
      { type: "page", key: "menu-orgBranchList-30055", name: "公司列表", icon: "org-menu-gongsiliebiao" },
      { type: "page", key: "menu-manageAccount-30053", name: "收支账户", icon: "org-menu-shouzhizhanghu" },
      { type: "page", key: "menu-companyPayList-50003", name: "支付配置", icon: "org-menu-zhifupeizhi" },
    ],
  },
  {
    type: "group",
    key: "menu-companyOrganization-30017",
    name: "组织架构",
    icon: "org-menu-zuzhijiagou",
    children: [
      { type: "page", key: "menu-companyDepartmentUser-30090", name: "成员/部门", icon: "org-menu-chengyuanguanli" },
      { type: "page", key: "menu-companyRoles-30091", name: "角色管理", icon: "org-menu-jiaoseguanli" },
      { type: "page", key: "menu-menuManagement-32199", name: "菜单管理", icon: "org-menu-caidanguanli" },
      {
        type: "group",
        key: "menu-departmentUserManagement-31230",
        name: "通讯录管理",
        icon: "org-menu-tonxunluguanli",
        children: [
          { type: "page", key: "menu-checkAuth-30229", name: "查看权限", icon: "org-menu-chakanquanxian" },
          { type: "page", key: "menu-displayUserField-30230", name: "资料显示", icon: "org-menu-ziliaoxianshi" },
        ],
      },
    ],
  },
  {
    type: "group",
    key: "menu-assistantSetting-100010002",
    name: "AI助手",
    icon: "org-menu-ai",
    children: [
      { type: "page", key: "menu-assistantSettingBasicConfig-100010004", name: "基础设置", icon: "org-menu-aishezhi" },
      { type: "page", key: "menu-assistantSettingModelConfig-100010005", name: "模型参数", icon: "org-menu-moxingcanshu" },
      { type: "page", key: "menu-assistantSettingRecommendQuestionCategory-100010006", name: "问题库", icon: "org-menu-wentiku" },
      { type: "page", key: "menu-assistantSettingAgentCategory-100010003", name: "智能体", icon: "org-menu-zhinengti" },
    ],
  },
  {
    type: "group",
    key: "menu-thirdSystem-40002",
    name: "三方集成",
    icon: "org-menu-sanfangjicheng",
    children: [
      { type: "page", key: "menu-companyThirdWeixin-40003", name: "微信服务号", icon: "org-menu-gongzhonghao" },
      { type: "page", key: "menu-companyThirdWxapp-40004", name: "微信小程序", icon: "org-menu-weixinxiaochengxu" },
      { type: "page", key: "menu-companyThirdWorkWeixin-40005", name: "企业微信", icon: "org-menu-qiyeweixin" },
      { type: "page", key: "menu-companyThirdDingtalk-40007", name: "钉钉", icon: "org-menu-dingding" },
      { type: "page", key: "menu-companyThirdFeishu-41014", name: "飞书", icon: "org-menu-feishu" },
      { type: "page", key: "menu-companyThirdApp-40006", name: "APP", icon: "org-menu-app" },
    ],
  },
  { type: "page", key: "menu-companyOperationLogList-30056", name: "操作日志", icon: "org-menu-caozuorizhi" },
];

export type SettingsPage = {
  id: string;
  key: string;
  name: string;
  icon: string;
  slug: string;
};

export const SETTINGS_PAGES: SettingsPage[] = [
  { id: "01", key: "menu-companyBasicInfo-30054", name: "企业信息", icon: "org-menu-qiyexinxi", slug: "company-info" },
  { id: "02", key: "menu-orgBranchList-30055", name: "公司列表", icon: "org-menu-gongsiliebiao", slug: "company-list" },
  { id: "03", key: "menu-manageAccount-30053", name: "收支账户", icon: "org-menu-shouzhizhanghu", slug: "accounts" },
  { id: "04", key: "menu-companyPayList-50003", name: "支付配置", icon: "org-menu-zhifupeizhi", slug: "payment-config" },
  { id: "05", key: "menu-companyDepartmentUser-30090", name: "成员/部门", icon: "org-menu-chengyuanguanli", slug: "members" },
  { id: "06", key: "menu-companyRoles-30091", name: "角色管理", icon: "org-menu-jiaoseguanli", slug: "roles" },
  { id: "07", key: "menu-menuManagement-32199", name: "菜单管理", icon: "org-menu-caidanguanli", slug: "menus" },
  { id: "08", key: "menu-checkAuth-30229", name: "查看权限", icon: "org-menu-chakanquanxian", slug: "contact-auth" },
  { id: "09", key: "menu-displayUserField-30230", name: "资料显示", icon: "org-menu-ziliaoxianshi", slug: "contact-display" },
  { id: "10", key: "menu-assistantSettingBasicConfig-100010004", name: "基础设置", icon: "org-menu-aishezhi", slug: "ai-basic" },
  { id: "11", key: "menu-assistantSettingModelConfig-100010005", name: "模型参数", icon: "org-menu-moxingcanshu", slug: "ai-model" },
  { id: "12", key: "menu-assistantSettingRecommendQuestionCategory-100010006", name: "问题库", icon: "org-menu-wentiku", slug: "ai-questions" },
  { id: "13", key: "menu-assistantSettingAgentCategory-100010003", name: "智能体", icon: "org-menu-zhinengti", slug: "ai-agents" },
  { id: "14", key: "menu-companyThirdWeixin-40003", name: "微信服务号", icon: "org-menu-gongzhonghao", slug: "wechat-service" },
  { id: "15", key: "menu-companyThirdWxapp-40004", name: "微信小程序", icon: "org-menu-weixinxiaochengxu", slug: "wechat-mini" },
  { id: "16", key: "menu-companyThirdWorkWeixin-40005", name: "企业微信", icon: "org-menu-qiyeweixin", slug: "wecom" },
  { id: "17", key: "menu-companyThirdDingtalk-40007", name: "钉钉", icon: "org-menu-dingding", slug: "dingtalk" },
  { id: "18", key: "menu-companyThirdFeishu-41014", name: "飞书", icon: "org-menu-feishu", slug: "feishu" },
  { id: "19", key: "menu-companyThirdApp-40006", name: "APP", icon: "org-menu-app", slug: "app" },
  { id: "20", key: "menu-companyOperationLogList-30056", name: "操作日志", icon: "org-menu-caozuorizhi", slug: "operation-log" },
];

export const SETTINGS_PAGE_BY_KEY = Object.fromEntries(
  SETTINGS_PAGES.map((page) => [page.key, page]),
);

export function settingsHref(key: string): string | undefined {
  const page = SETTINGS_PAGE_BY_KEY[key];
  return page ? `/orgs/settings/${page.slug}` : undefined;
}

export const WORKBENCH_CARDS: WorkbenchCard[] = [
  { title: "合同待审批", value: "0", moreLabel: "查看更多>>", image: "/sites/kuaijing/workbench/cards/approval_contract.jpg" },
  { title: "合同即将到期", value: "0", moreLabel: "查看详情>>", image: "/sites/kuaijing/workbench/cards/contract.jpg" },
  { title: "招商线索待跟进", value: "0", moreLabel: "查看更多>>", image: "/sites/kuaijing/workbench/cards/bussiness.jpg" },
  { title: "业户人员待审核", value: "0", moreLabel: "查看更多>>", image: "/sites/kuaijing/workbench/cards/owner.jpg" },
  { title: "通用审批待处理", value: "0", moreLabel: "查看更多>>", image: "/sites/kuaijing/workbench/cards/approval.jpg" },
  { title: "待办任务", value: "0", moreLabel: "查看更多>>", image: "/sites/kuaijing/workbench/cards/todo.jpg" },
  { title: "本月应收", value: "¥0", moreLabel: "查看更多>>", image: "/sites/kuaijing/workbench/cards/receivable_this_month.png" },
  { title: "本月应支", value: "¥0", moreLabel: "查看更多>>", image: "/sites/kuaijing/workbench/cards/pay_this_month.png" },
];

export const WORKBENCH_APPS: WorkbenchApp[] = [
  { name: "数据总览", icon: "org-menu-shujuzonglan" },
  { name: "租控管理", image: "/sites/kuaijing/workbench/apps/sectionalDrawing.png" },
  { name: "剖面图", image: "/sites/kuaijing/workbench/apps/sectionalDrawing.png" },
  { name: "收银台", icon: "org-menu-shouyintai" },
  { name: "业户列表", image: "/sites/kuaijing/workbench/apps/ownerList.png" },
  { name: "应收账单", image: "/sites/kuaijing/workbench/apps/billList.png" },
  { name: "收款流水", image: "/sites/kuaijing/workbench/apps/streamList.png" },
  { name: "资产管理", icon: "org-menu-kongjian" },
  { name: "在线报修", image: "/sites/kuaijing/workbench/apps/repair.png" },
  { name: "智慧停车场", image: "/sites/kuaijing/workbench/apps/park.png" },
  { name: "水电抄表", image: "/sites/kuaijing/workbench/apps/chaobiao.png" },
  { name: "智能门锁", image: "/sites/kuaijing/workbench/apps/smartLock.png" },
];

export const NOTICES: NoticeItem[] = [
  {
    name: "考勤打卡",
    time: "6小时前",
    message: "打卡提醒",
    count: 2,
    avatar: "/sites/kuaijing/workbench/messages/clockNaire.png",
  },
  {
    name: "审批",
    time: "21小时前",
    message: "你的床位租赁退租合同审批已经通过",
    count: 0,
    avatar: "/sites/kuaijing/workbench/messages/approval.png",
  },
  {
    name: "考勤管理",
    time: "21小时前",
    message: "修改考勤组",
    count: 0,
    avatar: "/sites/kuaijing/workbench/messages/attendance.png",
  },
  {
    name: "系统通知",
    time: "1天前",
    message: "欢迎使用快鲸资产管理运营系统",
    count: 0,
    avatar: "/sites/kuaijing/images/favicon.png",
  },
];

export const EXPIRY_MESSAGE =
  "尊敬的客户您好，您的企业将于2026-12-11 23:59:59到期，还剩余14天，请联系您的专属服务顾问购买使用，为您的楼宇资产保驾护航！";

// The captured page shows November 2026 with 27 highlighted.
export const CALENDAR_REFERENCE = new Date(2026, 10, 27);
