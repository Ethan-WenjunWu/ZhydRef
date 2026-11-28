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

export type DataPage = {
  id: string;
  key: string;
  name: string;
  icon: string;
  slug: string;
};

export const DATA_PAGES: DataPage[] = [
  { id: "01", key: "menu-homeOverview-30092", name: "数据总览", icon: "org-menu-shujuzonglan", slug: "overview" },
  { id: "02", key: "menu-homeOverviewProject-30093", name: "项目概况", icon: "org-menu-xiangmugaikuang", slug: "project" },
  { id: "03", key: "menu-homeOverviewProperty-30094", name: "资产评估", icon: "org-menu-zichanpinggu", slug: "asset" },
  { id: "04", key: "menu-homeOverviewRoom-30095", name: "资源分析", icon: "org-menu-ziyuanfenxi", slug: "resource" },
  { id: "05", key: "menu-homeLeaseOverview-30096", name: "租赁分析", icon: "org-menu-zulinfenxi", slug: "lease-analysis" },
  { id: "06", key: "menu-homeOwnerOverview-30097", name: "租客分析", icon: "org-menu-zukefenxi", slug: "tenant-analysis" },
  { id: "07", key: "menu-homeEstateOverview-247105", name: "物业分析", icon: "org-menu-wuyejichushuju", slug: "property-analysis" },
  { id: "08", key: "menu-homeLeaseDrawing-30176", name: "资管房态图", icon: "org-menu-ziguanpoumiantu", slug: "lease-drawing" },
  { id: "09", key: "menu-homePropertyDrawing-30175", name: "物管房态图", icon: "org-menu-wuguanpoumiantu", slug: "property-drawing" },
  { id: "10", key: "menu-apartmentLayoutDrawing-31254", name: "公寓房态图", icon: "org-menu-gongyufangtai", slug: "apartment-drawing" },
  { id: "11", key: "menu-parkSpaceDrawing-10030", name: "车位房态图", icon: "org-menu-cheweifangtaitu", slug: "parking-drawing" },
  { id: "12", key: "menu-homeReportLease-30190", name: "财务报表", icon: "org-menu-caiwubaobiao", slug: "financial-report" },
  { id: "13", key: "menu-homeReportIncome-30192", name: "收入报表", icon: "org-menu-shouru", slug: "income-report" },
  { id: "14", key: "menu-retreatReportList-30191", name: "退房报表", icon: "org-menu-tuifangbaobiao", slug: "retreat-report" },
  { id: "15", key: "menu-propertyReport-31253", name: "物业报表", icon: "org-menu-wuyefenxi", slug: "property-report" },
  { id: "16", key: "menu-dataDashboardVisualization-40252", name: "综合数据大屏", icon: "org-menu-datav", slug: "datav-overview" },
  { id: "17", key: "menu-leaseManagement-39252", name: "租赁数据大屏", icon: "org-menu-zulinguanli", slug: "datav-lease" },
  { id: "18", key: "menu-merchantManagement-37252", name: "招商数据大屏", icon: "org-menu-zhaoshangguanli", slug: "datav-merchant" },
  { id: "19", key: "menu-propertyDataDashboard-38252", name: "物业数据大屏", icon: "org-menu-wuyeshujudaping", slug: "datav-property" },
];

export const DATA_PAGE_BY_KEY = Object.fromEntries(
  DATA_PAGES.map((page) => [page.key, page]),
);

export function dataHref(key: string): string | undefined {
  const page = DATA_PAGE_BY_KEY[key];
  return page ? `/orgs/data/${page.slug}` : undefined;
}

export const DATA_NEW_TAB_KEYS = [
  "menu-dataDashboardVisualization-40252",
  "menu-leaseManagement-39252",
  "menu-merchantManagement-37252",
  "menu-propertyDataDashboard-38252",
];

export const DATAV_URLS: Record<string, string> = {
  "menu-dataDashboardVisualization-40252": "/datav/overview",
  "menu-leaseManagement-39252": "/datav/lease",
  "menu-merchantManagement-37252": "/datav/merchant",
  "menu-propertyDataDashboard-38252": "/datav/property",
};

export function dataSidebarHref(key: string): string | undefined {
  if (key === "menu-workbench-999999999") return "/orgs/index";
  return DATAV_URLS[key] ?? dataHref(key);
}

export const OFFICE_SIDEBAR: SidebarNode[] = [
  {
    type: "page",
    key: "menu-workHrDataOverview-371027",
    name: "数据总览",
    icon: "org-menu-shujukanban",
  },
  {
    type: "group",
    key: "menu-workApproval-280003",
    name: "通用审批",
    icon: "org-menu-shenpi",
    children: [
      {
        type: "group",
        key: "menu-workApprovalMy-280005",
        name: "我的审批",
        icon: "org-menu-wodeshenpi",
        children: [
          { type: "page", key: "menu-workApprovalMyNew-280009", name: "发起审批", icon: "org-menu-faqishenpi" },
          { type: "page", key: "menu-workApprovalMyDataCenter-280010", name: "审批中心", icon: "org-menu-shenpizhongxin" },
        ],
      },
      {
        type: "group",
        key: "menu-workApprovalManage-280004",
        name: "审批管理",
        icon: "org-menu-shenpiguanli",
        children: [
          { type: "page", key: "menu-workApprovalManageCategory-280007", name: "审批分类", icon: "org-menu-shenpifenlei" },
          { type: "page", key: "menu-workApprovalManageDataCenter-280008", name: "数据管理", icon: "org-menu-shenpishujuguanli" },
          { type: "page", key: "menu-workApprovalManageProxy-281012", name: "审批代办", icon: "org-menu-shenpidaiban" },
        ],
      },
    ],
  },
  {
    type: "group",
    key: "menu-report_manager-290002",
    name: "汇报管理",
    icon: "org-menu-huibaoguanli",
    children: [
      { type: "page", key: "menu-report_form-290005", name: "汇报列表", icon: "org-menu-huibaoliebiao" },
      { type: "page", key: "menu-report_template-290004", name: "汇报模板", icon: "org-menu-huibaomoban" },
      { type: "page", key: "menu-report_statements-290003", name: "汇报报表", icon: "org-menu-huibaobaobiao" },
    ],
  },
  { type: "page", key: "menu-workNotice-250013", name: "企业公告", icon: "org-menu-qiyegonggao" },
  { type: "page", key: "menu-workHrClock-370002", name: "考勤管理", icon: "org-menu-kaoqinguanli" },
  { type: "page", key: "menu-workWiki-360002", name: "知识库", icon: "org-menu-zhishiku" },
  { type: "page", key: "menu-workSmartTable-361003", name: "智能表格", icon: "org-menu-zhishiku" },
  { type: "page", key: "menu-workHrOffice-370003", name: "公文管理", icon: "org-menu-gongwenguanli" },
  { type: "page", key: "menu-workHrRecruit-370004", name: "人才招聘", icon: "org-menu-rencaizhaopin" },
  { type: "page", key: "menu-workMail-400002", name: "邮箱管理", icon: "org-menu-youxiangguanli" },
];

export type OfficePage = {
  id: string;
  key: string;
  name: string;
  icon: string;
  slug: string;
};

export const OFFICE_PAGES: OfficePage[] = [
  { id: "01", key: "menu-workHrDataOverview-371027", name: "数据总览", icon: "org-menu-shujukanban", slug: "overview" },
  { id: "02", key: "menu-workApprovalMyNew-280009", name: "发起审批", icon: "org-menu-faqishenpi", slug: "approval-new" },
  { id: "03", key: "menu-workApprovalMyDataCenter-280010", name: "审批中心", icon: "org-menu-shenpizhongxin", slug: "approval-center" },
  { id: "04", key: "menu-workApprovalManageCategory-280007", name: "审批分类", icon: "org-menu-shenpifenlei", slug: "approval-category" },
  { id: "05", key: "menu-workApprovalManageDataCenter-280008", name: "数据管理", icon: "org-menu-shenpishujuguanli", slug: "approval-data" },
  { id: "06", key: "menu-workApprovalManageProxy-281012", name: "审批代办", icon: "org-menu-shenpidaiban", slug: "approval-proxy" },
  { id: "07", key: "menu-report_form-290005", name: "汇报列表", icon: "org-menu-huibaoliebiao", slug: "report-list" },
  { id: "08", key: "menu-report_template-290004", name: "汇报模板", icon: "org-menu-huibaomoban", slug: "report-template" },
  { id: "09", key: "menu-report_statements-290003", name: "汇报报表", icon: "org-menu-huibaobaobiao", slug: "report-statements" },
  { id: "10", key: "menu-workNotice-250013", name: "企业公告", icon: "org-menu-qiyegonggao", slug: "notice" },
  { id: "11", key: "menu-workHrClock-370002", name: "考勤管理", icon: "org-menu-kaoqinguanli", slug: "attendance" },
  { id: "12", key: "menu-workWiki-360002", name: "知识库", icon: "org-menu-zhishiku", slug: "wiki" },
  { id: "13", key: "menu-workSmartTable-361003", name: "智能表格", icon: "org-menu-zhishiku", slug: "smart-table" },
  { id: "14", key: "menu-workHrOffice-370003", name: "公文管理", icon: "org-menu-gongwenguanli", slug: "document" },
  { id: "15", key: "menu-workHrRecruit-370004", name: "人才招聘", icon: "org-menu-rencaizhaopin", slug: "recruit" },
  { id: "16", key: "menu-workMail-400002", name: "邮箱管理", icon: "org-menu-youxiangguanli", slug: "mail" },
];

export const OFFICE_PAGE_BY_KEY = Object.fromEntries(
  OFFICE_PAGES.map((page) => [page.key, page]),
);

export function officeHref(key: string): string | undefined {
  const page = OFFICE_PAGE_BY_KEY[key];
  return page ? `/orgs/office/${page.slug}` : undefined;
}

export const PROPERTY_SIDEBAR: SidebarNode[] = [
  { type: "page", key: "menu-workOrderRepair-230002", name: "在线报修", icon: "org-menu-repairs" },
  { type: "page", key: "menu-workOrderPropose-230003", name: "投诉建议", icon: "org-menu-tousujianyi" },
  { type: "page", key: "menu-workOrderService-230004", name: "服务工单", icon: "org-menu-tousujianyi" },
  { type: "page", key: "menu-workEnergy-300003", name: "水电抄表", icon: "org-menu-shuidianchaobiao" },
  { type: "page", key: "menu-workPatrolEquipment-240003", name: "设备巡检", icon: "org-menu-shebeixunjian" },
  { type: "page", key: "menu-workPatrolSecurity-240004", name: "安防巡更", icon: "org-menu-anfangxungeng" },
  { type: "page", key: "menu-workPatrolQuality-240005", name: "品质核查", icon: "org-menu-pinzhihecha" },
  { type: "page", key: "menu-workPatrolGreen-240006", name: "绿化检查", icon: "org-menu-lvhuajiancha" },
  { type: "page", key: "menu-workPatrolClean-240007", name: "保洁检查", icon: "org-menu-baojiejiancha" },
  { type: "page", key: "menu-workPatrolServicePlan-241105", name: "服务计划", icon: "org-menu-baojiejiancha" },
  { type: "page", key: "menu-workVisitorPass-200008", name: "出入证管理", icon: "org-menu-churuzheng" },
  { type: "page", key: "menu-workVisitorDecoration-200006", name: "访客预约", icon: "org-menu-fangkeyuyue" },
  { type: "page", key: "menu-workVisitorFreePass-200007", name: "物品放行", icon: "org-menu-wupinfanghang" },
  {
    type: "group",
    key: "menu-workPropertyStockReal-220005",
    name: "物料管理",
    icon: "org-menu-wuliaoguanli",
    children: [
      { type: "page", key: "menu-workPropertyStockList-220038", name: "即时库存", icon: "org-menu-jishikucun" },
      { type: "page", key: "menu-workPropertyStockInList-220035", name: "物料入库", icon: "org-wuliaoruku" },
      { type: "page", key: "menu-workPropertyStockHandoutList-220037", name: "派发/退库", icon: "org-menu-zichanpaifa" },
      { type: "page", key: "menu-workPropertyStockTransferList-220032", name: "物料调拨", icon: "org-menu-zichantiaobo" },
      { type: "page", key: "menu-workPropertyStockHandleList-220034", name: "物料处置", icon: "org-menu-zichanchuzhi" },
      { type: "page", key: "menu-workPropertyStockAdjustList-220033", name: "库存调整", icon: "org-menu-kucuntiaozheng" },
      { type: "page", key: "menu-workPropertyStockReceiveList-220036", name: "员工申请单据", icon: "org-menu-yuangongshenqingdanju" },
      {
        type: "group", key: "menu-workPropertyStuffInventory-221098", name: "物料盘点", icon: "org-menu-kucuntiaozheng",
        children: [
          { type: "page", key: "menu-workPropertyStuffInventoryRecord-220097", name: "盘点任务", icon: "org-menu-kucuntiaozheng" },
          { type: "page", key: "menu-workPropertyStuffInventoryPlan-220098", name: "盘点计划", icon: "org-menu-kucuntiaozheng" },
        ],
      },
      {
        type: "group", key: "menu-workPropertyStockSetting-220017", name: "物料设置", icon: "org-menu-zichanshezhi",
        children: [
          { type: "page", key: "menu-workPropertyStockSettingCategory-220081", name: "物料分类设置", icon: "org-menu-zichanshezhi" },
          { type: "page", key: "menu-workPropertyStockSettingStuff-220082", name: "物料档案设置", icon: "org-menu-zichanshezhi" },
          { type: "page", key: "menu-workPropertyStockSettingDepository-220080", name: "物料仓库设置", icon: "org-menu-zichanshezhi" },
          { type: "page", key: "menu-workStuffNumberRule-220083", name: "物料编码设置", icon: "org-menu-zichanshezhi" },
        ],
      },
      {
        type: "group", key: "menu-workPropertyStockApply-220016", name: "我的物料", icon: "org-menu-wodezichan",
        children: [
          { type: "page", key: "menu-workPropertyStockApplyMyStuffList-220090", name: "物料清单", icon: "org-menu-wodezichan" },
          { type: "page", key: "menu-workPropertyManageStuffUserApplyList-220078", name: "申请记录", icon: "org-menu-wodezichan" },
        ],
      },
    ],
  },
  {
    type: "group", key: "menu-workNotice_airConditioner-251056", name: "空调申请", icon: "org-menu-kongtiaoshenqing",
    children: [
      { type: "page", key: "menu-workNotice_airConditionerManagement-252056", name: "申请管理", icon: "org-kongtiaoshenqingguanli" },
      { type: "page", key: "menu-workNotice_airConditionerSetting-253056", name: "空调时间设置", icon: "org-kongtiaoshijianshezhi" },
    ],
  },
  { type: "page", key: "menu-express_collection-201019", name: "快递代收", icon: "org-menu-kuaididaishou" },
];

export type PropertyPage = {
  id: string;
  key: string;
  name: string;
  icon: string;
  slug: string;
};

export const PROPERTY_PAGES: PropertyPage[] = [
  { id: "01", key: "menu-workOrderRepair-230002", name: "在线报修", icon: "org-menu-repairs", slug: "repair" },
  { id: "02", key: "menu-workOrderPropose-230003", name: "投诉建议", icon: "org-menu-tousujianyi", slug: "complaint" },
  { id: "03", key: "menu-workOrderService-230004", name: "服务工单", icon: "org-menu-tousujianyi", slug: "service-order" },
  { id: "04", key: "menu-workEnergy-300003", name: "水电抄表", icon: "org-menu-shuidianchaobiao", slug: "energy" },
  { id: "05", key: "menu-workPatrolEquipment-240003", name: "设备巡检", icon: "org-menu-shebeixunjian", slug: "patrol-equipment" },
  { id: "06", key: "menu-workPatrolSecurity-240004", name: "安防巡更", icon: "org-menu-anfangxungeng", slug: "patrol-security" },
  { id: "07", key: "menu-workPatrolQuality-240005", name: "品质核查", icon: "org-menu-pinzhihecha", slug: "patrol-quality" },
  { id: "08", key: "menu-workPatrolGreen-240006", name: "绿化检查", icon: "org-menu-lvhuajiancha", slug: "patrol-green" },
  { id: "09", key: "menu-workPatrolClean-240007", name: "保洁检查", icon: "org-menu-baojiejiancha", slug: "patrol-clean" },
  { id: "10", key: "menu-workPatrolServicePlan-241105", name: "服务计划", icon: "org-menu-baojiejiancha", slug: "service-plan" },
  { id: "11", key: "menu-workVisitorPass-200008", name: "出入证管理", icon: "org-menu-churuzheng", slug: "pass" },
  { id: "12", key: "menu-workVisitorDecoration-200006", name: "访客预约", icon: "org-menu-fangkeyuyue", slug: "visitor" },
  { id: "13", key: "menu-workVisitorFreePass-200007", name: "物品放行", icon: "org-menu-wupinfanghang", slug: "release" },
  { id: "14", key: "menu-workPropertyStockList-220038", name: "即时库存", icon: "org-menu-jishikucun", slug: "stock" },
  { id: "15", key: "menu-workPropertyStockInList-220035", name: "物料入库", icon: "org-wuliaoruku", slug: "stock-in" },
  { id: "16", key: "menu-workPropertyStockHandoutList-220037", name: "派发/退库", icon: "org-menu-zichanpaifa", slug: "stock-handout" },
  { id: "17", key: "menu-workPropertyStockTransferList-220032", name: "物料调拨", icon: "org-menu-zichantiaobo", slug: "stock-transfer" },
  { id: "18", key: "menu-workPropertyStockHandleList-220034", name: "物料处置", icon: "org-menu-zichanchuzhi", slug: "stock-handle" },
  { id: "19", key: "menu-workPropertyStockAdjustList-220033", name: "库存调整", icon: "org-menu-kucuntiaozheng", slug: "stock-adjust" },
  { id: "20", key: "menu-workPropertyStockReceiveList-220036", name: "员工申请单据", icon: "org-menu-yuangongshenqingdanju", slug: "stock-receive" },
  { id: "21", key: "menu-workPropertyStuffInventoryRecord-220097", name: "盘点任务", icon: "org-menu-kucuntiaozheng", slug: "inventory-task" },
  { id: "22", key: "menu-workPropertyStuffInventoryPlan-220098", name: "盘点计划", icon: "org-menu-kucuntiaozheng", slug: "inventory-plan" },
  { id: "23", key: "menu-workPropertyStockSettingCategory-220081", name: "物料分类设置", icon: "org-menu-zichanshezhi", slug: "category-setting" },
  { id: "24", key: "menu-workPropertyStockSettingStuff-220082", name: "物料档案设置", icon: "org-menu-zichanshezhi", slug: "archive-setting" },
  { id: "25", key: "menu-workPropertyStockSettingDepository-220080", name: "物料仓库设置", icon: "org-menu-zichanshezhi", slug: "warehouse-setting" },
  { id: "26", key: "menu-workStuffNumberRule-220083", name: "物料编码设置", icon: "org-menu-zichanshezhi", slug: "code-setting" },
  { id: "27", key: "menu-workPropertyStockApplyMyStuffList-220090", name: "物料清单", icon: "org-menu-wodezichan", slug: "my-material" },
  { id: "28", key: "menu-workPropertyManageStuffUserApplyList-220078", name: "申请记录", icon: "org-menu-wodezichan", slug: "apply-records" },
  { id: "29", key: "menu-workNotice_airConditionerManagement-252056", name: "申请管理", icon: "org-kongtiaoshenqingguanli", slug: "aircon-management" },
  { id: "30", key: "menu-workNotice_airConditionerSetting-253056", name: "空调时间设置", icon: "org-kongtiaoshijianshezhi", slug: "aircon-time" },
  { id: "31", key: "menu-express_collection-201019", name: "快递代收", icon: "org-menu-kuaididaishou", slug: "express" },
];

export const PROPERTY_PAGE_BY_KEY = Object.fromEntries(
  PROPERTY_PAGES.map((page) => [page.key, page]),
);

export function propertyHref(key: string): string | undefined {
  const page = PROPERTY_PAGE_BY_KEY[key];
  return page ? `/orgs/property/${page.slug}` : undefined;
}

export const RESOURCE_SIDEBAR: SidebarNode[] = [
  { type: "page", key: "menu-res-rent-control", name: "租控管理", icon: "org-menu-zukongguanli" },
  { type: "page", key: "menu-res-projects", name: "房产项目", icon: "org-menu-xiangmuliebiao" },
  { type: "page", key: "menu-res-property-projects", name: "物管项目", icon: "org-menu-wuguanxiangmu" },
  { type: "page", key: "menu-res-property-house", name: "产权房屋", icon: "org-menu-chanquanfangwu" },
  { type: "page", key: "menu-res-business", name: "房产资料（商业）", icon: "org-menu-shangyeziliao" },
  { type: "page", key: "menu-res-residence", name: "房产资料（住宅）", icon: "org-menu-zhuzhaiziliao" },
  { type: "page", key: "menu-res-apartment", name: "房产资料（公寓）", icon: "org-menu-gongyuziliao" },
  { type: "page", key: "menu-res-food-market", name: "房产资料（菜场）", icon: "org-menu-caichangziliao" },
  { type: "page", key: "menu-res-station", name: "房产资料（工位）", icon: "org-menu-gongweiziliao" },
  { type: "page", key: "menu-res-bed", name: "房产资料（床位）", icon: "org-menu-chuangweiziliao" },
  { type: "page", key: "menu-res-venue", name: "场地资料", icon: "org-menu-changdiziliao" },
  { type: "page", key: "menu-res-ad-space", name: "广告位资料", icon: "org-menu-guanggaoweiziliao" },
  { type: "page", key: "menu-res-parking", name: "车位资料", icon: "org-menu-cheweiziliao" },
  { type: "page", key: "menu-res-vehicle", name: "车辆资料", icon: "org-menu-cheliangziliao" },
  { type: "page", key: "menu-res-warehouse", name: "仓库资料", icon: "org-menu-lengkuziliao" },
];

export type ResourcePage = {
  id: string;
  key: string;
  name: string;
  icon: string;
  slug: string;
};

export const RESOURCE_PAGES: ResourcePage[] = [
  { id: "01", key: "menu-res-rent-control", name: "租控管理", icon: "org-menu-zukongguanli", slug: "rent-control" },
  { id: "02", key: "menu-res-projects", name: "房产项目", icon: "org-menu-xiangmuliebiao", slug: "projects" },
  { id: "03", key: "menu-res-property-projects", name: "物管项目", icon: "org-menu-wuguanxiangmu", slug: "property-projects" },
  { id: "04", key: "menu-res-property-house", name: "产权房屋", icon: "org-menu-chanquanfangwu", slug: "property-house" },
  { id: "05", key: "menu-res-business", name: "房产资料（商业）", icon: "org-menu-shangyeziliao", slug: "business" },
  { id: "06", key: "menu-res-residence", name: "房产资料（住宅）", icon: "org-menu-zhuzhaiziliao", slug: "residence" },
  { id: "07", key: "menu-res-apartment", name: "房产资料（公寓）", icon: "org-menu-gongyuziliao", slug: "apartment" },
  { id: "08", key: "menu-res-food-market", name: "房产资料（菜场）", icon: "org-menu-caichangziliao", slug: "food-market" },
  { id: "09", key: "menu-res-station", name: "房产资料（工位）", icon: "org-menu-gongweiziliao", slug: "station" },
  { id: "10", key: "menu-res-bed", name: "房产资料（床位）", icon: "org-menu-chuangweiziliao", slug: "bed" },
  { id: "11", key: "menu-res-venue", name: "场地资料", icon: "org-menu-changdiziliao", slug: "venue" },
  { id: "12", key: "menu-res-ad-space", name: "广告位资料", icon: "org-menu-guanggaoweiziliao", slug: "ad-space" },
  { id: "13", key: "menu-res-parking", name: "车位资料", icon: "org-menu-cheweiziliao", slug: "parking" },
  { id: "14", key: "menu-res-vehicle", name: "车辆资料", icon: "org-menu-cheliangziliao", slug: "vehicle" },
  { id: "15", key: "menu-res-warehouse", name: "仓库资料", icon: "org-menu-lengkuziliao", slug: "warehouse" },
];

export const RESOURCE_PAGE_BY_KEY = Object.fromEntries(
  RESOURCE_PAGES.map((page) => [page.key, page]),
);

export function resourceHref(key: string): string | undefined {
  const page = RESOURCE_PAGE_BY_KEY[key];
  return page ? `/orgs/resource/${page.slug}` : undefined;
}

export const ASSET_SIDEBAR: SidebarNode[] = [
  { type: "group", key: "menu-assetgroup-gudingzichan", name: "固定资产", icon: "org-menu-gudingzichan", children: [
    { type: "page", key: "menu-asset-overview", name: "资产概览", icon: "org-menu-zichangailan" },
    { type: "page", key: "menu-asset-list", name: "资产清单", icon: "org-menu-zichanqingdan" },
    { type: "page", key: "menu-asset-dispatch", name: "派发/退库", icon: "org-menu-zichanpaifa" },
    { type: "page", key: "menu-asset-storage", name: "资产入库", icon: "org-menu-zichanruku" },
    { type: "page", key: "menu-asset-handout", name: "借出/归还", icon: "org-menu-zichanjiechu" },
    { type: "page", key: "menu-asset-change-receiver", name: "变更领用人", icon: "org-menu-biangenglingyongren" },
    { type: "page", key: "menu-asset-transfer", name: "资产调拨", icon: "org-menu-zichantiaobo" },
    { type: "page", key: "menu-asset-repair", name: "资产维修", icon: "org-menu-zichanweixiu" },
    { type: "page", key: "menu-asset-handle", name: "资产处置", icon: "org-menu-zichanchuzhi" },
    { type: "page", key: "menu-asset-maintain", name: "资产保养", icon: "org-menu-zichanbaoyang" },
    { type: "page", key: "menu-asset-employee-apply", name: "员工申请单据", icon: "org-menu-yuangongshenqingdanju" },
    { type: "group", key: "menu-assetsub-zichanshezhi", name: "资产设置", icon: "org-menu-zichanshezhi", children: [
    { type: "page", key: "menu-asset-asset-category", name: "资产分类设置", icon: "org-menu-shenpifenlei" },
    { type: "page", key: "menu-asset-asset-code", name: "资产编码设置", icon: "org-menu-zichanbianma" },
    { type: "page", key: "menu-asset-asset-location", name: "资产位置设置", icon: "org-menu-zichanweizhisheding" },
    { type: "page", key: "menu-asset-asset-label", name: "资产标签设置", icon: "org-menu-biaoqianguanli" },
    { type: "page", key: "menu-asset-asset-maintain-setting", name: "资产保养设置", icon: "org-menu-zichanbaoyang" },
    ] },
    { type: "group", key: "menu-assetsub-wodezichan", name: "我的资产", icon: "org-menu-wodezichan", children: [
    { type: "page", key: "menu-asset-my-dashboard", name: "资产仪表盘", icon: "org-menu-gongzuotai" },
    { type: "page", key: "menu-asset-my-list", name: "资产清单", icon: "org-menu-zichanqingdan" },
    { type: "page", key: "menu-asset-my-applications", name: "申请记录", icon: "org-menu-fapiaojilu" },
    { type: "page", key: "menu-asset-my-approvals", name: "审批记录", icon: "org-menu-wodeshenpi" },
    ] },
  ] },
  { type: "group", key: "menu-assetgroup-zichanxunjian", name: "资产巡检", icon: "org-menu-zichanxunjian", children: [
    { type: "page", key: "menu-asset-patrol", name: "资产巡检", icon: "org-menu-zichanxunjian" },
  ] },
  { type: "group", key: "menu-assetgroup-zichanpandian", name: "资产盘点", icon: "org-menu-zichanpandian", children: [
    { type: "page", key: "menu-asset-inventory-plan", name: "盘点计划", icon: "org-menu-zichanpandian" },
    { type: "page", key: "menu-asset-inventory-task", name: "盘点任务", icon: "org-menu-pandianrenwu" },
  ] },
  { type: "group", key: "menu-assetgroup-zichanhetong", name: "资产合同", icon: "org-menu-zichanhetong", children: [
    { type: "page", key: "menu-asset-purchase-contract", name: "采购合同", icon: "org-menu-caigouhetong" },
    { type: "page", key: "menu-asset-sale-contract", name: "租售合同", icon: "org-menu-zushouhetong" },
    { type: "page", key: "menu-asset-asset-bill", name: "资产账单", icon: "org-menu-zichanzhangdan" },
    { type: "page", key: "menu-asset-contract-stop", name: "资产合同终止", icon: "org-menu-zichanhetongzhongzhi" },
  ] },
  { type: "group", key: "menu-assetgroup-hetongshezhi", name: "合同设置", icon: "org-menu-hetongshezhi", children: [
    { type: "page", key: "menu-asset-contract-print", name: "合同打印模板", icon: "org-menu-hetongdayinmoban" },
    { type: "page", key: "menu-asset-contract-retreat", name: "合同退租协议", icon: "org-menu-hetongtuizuxieyi" },
    { type: "page", key: "menu-asset-contract-expire", name: "合同到期提醒", icon: "org-menu-hetongdaoqitixing" },
    { type: "page", key: "menu-asset-contract-clause", name: "合同条款类型", icon: "org-menu-hetongtiaokuanleixing" },
    { type: "page", key: "menu-asset-contract-template", name: "合同创建模板", icon: "org-menu-hetongchuangjianmuban" },
  ] },
  { type: "group", key: "menu-assetgroup-caigouguanli", name: "采购管理", icon: "org-menu-caigouguanli", children: [
    { type: "page", key: "menu-asset-purchase-dashboard", name: "仪表盘", icon: "org-menu-yibiaopan" },
    { type: "page", key: "menu-asset-purchase-request", name: "采购申请单", icon: "org-menu-qinggoushenqingdan" },
    { type: "page", key: "menu-asset-purchase-order", name: "采购订单", icon: "org-menu-caigoudingdan" },
    { type: "page", key: "menu-asset-supplier", name: "供应商管理", icon: "org-menu-gongyingshangguanli" },
    { type: "page", key: "menu-asset-tender", name: "招标管理", icon: "org-menu-zhaobiaoguanli" },
  ] },
];

export type AssetPage = {
  id: string;
  key: string;
  name: string;
  icon: string;
  slug: string;
};

export const ASSET_PAGES: AssetPage[] = [
  { id: "01", key: "menu-asset-overview", name: "资产概览", icon: "org-menu-zichangailan", slug: "overview" },
  { id: "02", key: "menu-asset-list", name: "资产清单", icon: "org-menu-zichanqingdan", slug: "list" },
  { id: "03", key: "menu-asset-dispatch", name: "派发/退库", icon: "org-menu-zichanpaifa", slug: "dispatch" },
  { id: "04", key: "menu-asset-storage", name: "资产入库", icon: "org-menu-zichanruku", slug: "storage" },
  { id: "05", key: "menu-asset-handout", name: "借出/归还", icon: "org-menu-zichanjiechu", slug: "handout" },
  { id: "06", key: "menu-asset-change-receiver", name: "变更领用人", icon: "org-menu-biangenglingyongren", slug: "change-receiver" },
  { id: "07", key: "menu-asset-transfer", name: "资产调拨", icon: "org-menu-zichantiaobo", slug: "transfer" },
  { id: "08", key: "menu-asset-repair", name: "资产维修", icon: "org-menu-zichanweixiu", slug: "repair" },
  { id: "09", key: "menu-asset-handle", name: "资产处置", icon: "org-menu-zichanchuzhi", slug: "handle" },
  { id: "10", key: "menu-asset-maintain", name: "资产保养", icon: "org-menu-zichanbaoyang", slug: "maintain" },
  { id: "11", key: "menu-asset-employee-apply", name: "员工申请单据", icon: "org-menu-yuangongshenqingdanju", slug: "employee-apply" },
  { id: "21", key: "menu-asset-patrol", name: "资产巡检", icon: "org-menu-zichanxunjian", slug: "patrol" },
  { id: "22", key: "menu-asset-inventory-plan", name: "盘点计划", icon: "org-menu-zichanpandian", slug: "inventory-plan" },
  { id: "23", key: "menu-asset-inventory-task", name: "盘点任务", icon: "org-menu-pandianrenwu", slug: "inventory-task" },
  { id: "24", key: "menu-asset-purchase-contract", name: "采购合同", icon: "org-menu-caigouhetong", slug: "purchase-contract" },
  { id: "25", key: "menu-asset-sale-contract", name: "租售合同", icon: "org-menu-zushouhetong", slug: "sale-contract" },
  { id: "26", key: "menu-asset-asset-bill", name: "资产账单", icon: "org-menu-zichanzhangdan", slug: "asset-bill" },
  { id: "27", key: "menu-asset-contract-stop", name: "资产合同终止", icon: "org-menu-zichanhetongzhongzhi", slug: "contract-stop" },
  { id: "28", key: "menu-asset-contract-print", name: "合同打印模板", icon: "org-menu-hetongdayinmoban", slug: "contract-print" },
  { id: "29", key: "menu-asset-contract-retreat", name: "合同退租协议", icon: "org-menu-hetongtuizuxieyi", slug: "contract-retreat" },
  { id: "30", key: "menu-asset-contract-expire", name: "合同到期提醒", icon: "org-menu-hetongdaoqitixing", slug: "contract-expire" },
  { id: "31", key: "menu-asset-contract-clause", name: "合同条款类型", icon: "org-menu-hetongtiaokuanleixing", slug: "contract-clause" },
  { id: "32", key: "menu-asset-contract-template", name: "合同创建模板", icon: "org-menu-hetongchuangjianmuban", slug: "contract-template" },
  { id: "33", key: "menu-asset-purchase-dashboard", name: "仪表盘", icon: "org-menu-yibiaopan", slug: "purchase-dashboard" },
  { id: "34", key: "menu-asset-purchase-request", name: "采购申请单", icon: "org-menu-qinggoushenqingdan", slug: "purchase-request" },
  { id: "35", key: "menu-asset-purchase-order", name: "采购订单", icon: "org-menu-caigoudingdan", slug: "purchase-order" },
  { id: "36", key: "menu-asset-supplier", name: "供应商管理", icon: "org-menu-gongyingshangguanli", slug: "supplier" },
  { id: "37", key: "menu-asset-tender", name: "招标管理", icon: "org-menu-zhaobiaoguanli", slug: "tender" },

  { id: "29", key: "menu-asset-asset-category", name: "资产分类设置", icon: "org-menu-shenpifenlei", slug: "asset-category" },
  { id: "30", key: "menu-asset-asset-code", name: "资产编码设置", icon: "org-menu-zichanbianma", slug: "asset-code" },
  { id: "31", key: "menu-asset-asset-location", name: "资产位置设置", icon: "org-menu-zichanweizhisheding", slug: "asset-location" },
  { id: "32", key: "menu-asset-asset-label", name: "资产标签设置", icon: "org-menu-biaoqianguanli", slug: "asset-label" },
  { id: "33", key: "menu-asset-asset-maintain-setting", name: "资产保养设置", icon: "org-menu-zichanbaoyang", slug: "asset-maintain-setting" },
  { id: "34", key: "menu-asset-my-dashboard", name: "资产仪表盘", icon: "org-menu-gongzuotai", slug: "my-dashboard" },
  { id: "35", key: "menu-asset-my-list", name: "资产清单", icon: "org-menu-zichanqingdan", slug: "my-list" },
  { id: "36", key: "menu-asset-my-applications", name: "申请记录", icon: "org-menu-fapiaojilu", slug: "my-applications" },
  { id: "37", key: "menu-asset-my-approvals", name: "审批记录", icon: "org-menu-wodeshenpi", slug: "my-approvals" },];

export const ASSET_PAGE_BY_KEY = Object.fromEntries(
  ASSET_PAGES.map((page) => [page.key, page]),
);

export function assetHref(key: string): string | undefined {
  const page = ASSET_PAGE_BY_KEY[key];
  return page ? `/orgs/asset/${page.slug}` : undefined;
}

export const OPERATION_SIDEBAR: SidebarNode[] = [
  { type: "group", key: "menu-opgroup-jinchuchang", name: "进退场管理", icon: "org-menu-jinchuchang", children: [
    { type: "page", key: "menu-op-checkin", name: "进场管理", icon: "org-menu-jinchang" },
    { type: "page", key: "menu-op-decoration", name: "装修管理", icon: "org-menu-zhuangxiuguanli" },
    { type: "page", key: "menu-op-checkout", name: "退场管理", icon: "org-menu-tuichang" },
  ] },
  { type: "group", key: "menu-opgroup-shoufeiguanli", name: "收费管理", icon: "org-menu-shoufeiguanli", children: [
    { type: "page", key: "menu-op-merchant-receivable", name: "商户应收", icon: "org-menu-shanghuyingshou" },
    { type: "page", key: "menu-op-operation-cost", name: "运营费用", icon: "org-menu-yunyingfeiyong" },
    { type: "page", key: "menu-op-deposit", name: "押金管理", icon: "org-menu-yajinguanli" },
    { type: "page", key: "menu-op-merchant-bill", name: "商户账单", icon: "org-menu-shanghuzhandan" },
    { type: "page", key: "menu-op-bill-management", name: "账单管理", icon: "org-menu-zhandanguanli" },
    { type: "page", key: "menu-op-discount", name: "优惠管理", icon: "org-menu-youhuiguanli" },
    { type: "page", key: "menu-op-invoice", name: "开票记录", icon: "org-menu-fapiaojilu" },
    { type: "page", key: "menu-op-cashier", name: "收银台", icon: "org-menu-shouyintai" },
  ] },
  { type: "group", key: "menu-opgroup-yingyee", name: "营业额管理", icon: "org-menu-yingyee", children: [
    { type: "page", key: "menu-op-turnover-daily", name: "营业额日报", icon: "org-menu-yingyeeribao" },
    { type: "page", key: "menu-op-turnover-entry", name: "营业额录入", icon: "org-menu-yingyee_enter" },
    { type: "page", key: "menu-op-turnover-board", name: "营业额看板", icon: "org-menu-yingyeekanban" },
    { type: "page", key: "menu-op-turnover-settle", name: "联销结算", icon: "org-menu-lianxiaojiesuan" },
  ] },
  { type: "group", key: "menu-opgroup-xunchang", name: "巡场管理", icon: "org-menu-xunchang", children: [
    { type: "page", key: "menu-op-patrol-merchant", name: "商铺巡检", icon: "org-menu-shangpu" },
    { type: "page", key: "menu-op-patrol-vacancy", name: "空铺巡检", icon: "org-menu-kongpu" },
  ] },
  { type: "group", key: "menu-opgroup-zuhuguanli", name: "租户管理", icon: "org-menu-zuhuguanli", children: [
    { type: "page", key: "menu-op-merchant-info", name: "商户信息", icon: "org-menu-zukeliebiao" },
    { type: "page", key: "menu-op-merchant-reward", name: "商户奖励", icon: "org-menu-shanghujiangli" },
    { type: "page", key: "menu-op-merchant-violation", name: "商户违规", icon: "org-menu-shanghuweigui" },
  ] },
  { type: "group", key: "menu-opgroup-shangyeguanli", name: "商业管理", icon: "org-menu-shangyeguanli", children: [
    { type: "page", key: "menu-op-store", name: "店铺管理", icon: "org-menu-dianpuguanli" },
  ] },
  { type: "group", key: "menu-opgroup-gongyuyunying", name: "公寓运营", icon: "org-menu-gongyuyunying", children: [
    { type: "page", key: "menu-op-apartment-status", name: "公寓房态", icon: "org-menu-gongyufangtai" },
    { type: "page", key: "menu-op-short-rental", name: "快捷短租", icon: "org-menu-mianhetongduanzu" },
    { type: "page", key: "menu-op-todo", name: "待办事项", icon: "org-menu-daibanshixiang" },
    { type: "page", key: "menu-op-apartment-checkin", name: "公寓入住", icon: "org-menu-gongyuruzhu" },
    { type: "page", key: "menu-op-apartment-checkout", name: "公寓退租", icon: "org-menu-gongyutuizu" },
    { type: "page", key: "menu-op-apartment-device", name: "公寓智能硬件", icon: "org-menu-gongyuzhinengyingjian" },
  ] },
  { type: "page", key: "menu-op-meeting-room", name: "会议室", icon: "org-menu-huiyishi" },
  { type: "page", key: "menu-op-venue", name: "场地预约", icon: "org-menu-changdiyuyue" },
  { type: "page", key: "menu-op-survey", name: "投票问卷", icon: "org-menu-toupiaowenjuan" },
  { type: "group", key: "menu-opgroup-zigeguanli", name: "资格管理", icon: "org-menu-zigeguanli", children: [
    { type: "page", key: "menu-op-waiting", name: "轮候管理", icon: "org-menu-lunhouguanli" },
    { type: "page", key: "menu-op-qualification-personal", name: "个人资格审批", icon: "org-menu-gerenzigeshenpi" },
    { type: "page", key: "menu-op-qualification-unit", name: "单位资格审批", icon: "org-menu-danweizigeshenpi" },
    { type: "page", key: "menu-op-showings", name: "看房管理", icon: "org-menu-kanfangguanli" },
  ] },
  { type: "group", key: "menu-opgroup-yonghuyunying", name: "C端运营", icon: "org-menu-yonghuyunying", children: [
    { type: "page", key: "menu-op-page-design", name: "页面装修", icon: "org-menu-yemianzhuangxiu" },
    { type: "page", key: "menu-op-news", name: "资讯列表", icon: "org-menu-zixunliebiao" },
    { type: "page", key: "menu-op-forum", name: "邻里论坛", icon: "org-menu-linliluntan" },
    { type: "page", key: "menu-op-activities", name: "活动报名", icon: "org-menu-huodongbaoming" },
  ] },
  { type: "group", key: "menu-opgroup-suyuanguanli", name: "溯源管理", icon: "org-menu-suyuanguanli", children: [
    { type: "page", key: "menu-op-goods-info", name: "商品信息", icon: "org-menu-shangpinxinxi" },
    { type: "page", key: "menu-op-cargo-owner", name: "货主信息", icon: "org-menu-huozhuxinxi" },
    { type: "page", key: "menu-op-business-owner", name: "经营户信息", icon: "org-menu-jingyinghuxinxi" },
    { type: "page", key: "menu-op-ic-card", name: "IC卡管理", icon: "org-menu-ickaguanli" },
    { type: "page", key: "menu-op-traceability", name: "溯源管理", icon: "org-menu-suyuanguanli" },
    { type: "page", key: "menu-op-entrance-fee", name: "进场收费", icon: "org-menu-jinchangshoufei" },
  ] },
];

export type OperationPage = {
  id: string;
  key: string;
  name: string;
  icon: string;
  slug: string;
};

export const OPERATION_PAGES: OperationPage[] = [
  { id: "01", key: "menu-op-checkin", name: "进场管理", icon: "org-menu-jinchang", slug: "checkin" },
  { id: "02", key: "menu-op-decoration", name: "装修管理", icon: "org-menu-zhuangxiuguanli", slug: "decoration" },
  { id: "03", key: "menu-op-checkout", name: "退场管理", icon: "org-menu-tuichang", slug: "checkout" },
  { id: "04", key: "menu-op-merchant-receivable", name: "商户应收", icon: "org-menu-shanghuyingshou", slug: "merchant-receivable" },
  { id: "05", key: "menu-op-operation-cost", name: "运营费用", icon: "org-menu-yunyingfeiyong", slug: "operation-cost" },
  { id: "06", key: "menu-op-deposit", name: "押金管理", icon: "org-menu-yajinguanli", slug: "deposit" },
  { id: "07", key: "menu-op-merchant-bill", name: "商户账单", icon: "org-menu-shanghuzhandan", slug: "merchant-bill" },
  { id: "08", key: "menu-op-bill-management", name: "账单管理", icon: "org-menu-zhandanguanli", slug: "bill-management" },
  { id: "09", key: "menu-op-discount", name: "优惠管理", icon: "org-menu-youhuiguanli", slug: "discount" },
  { id: "10", key: "menu-op-invoice", name: "开票记录", icon: "org-menu-fapiaojilu", slug: "invoice" },
  { id: "11", key: "menu-op-cashier", name: "收银台", icon: "org-menu-shouyintai", slug: "cashier" },
  { id: "12", key: "menu-op-turnover-daily", name: "营业额日报", icon: "org-menu-yingyeeribao", slug: "turnover-daily" },
  { id: "13", key: "menu-op-turnover-entry", name: "营业额录入", icon: "org-menu-yingyee_enter", slug: "turnover-entry" },
  { id: "14", key: "menu-op-turnover-board", name: "营业额看板", icon: "org-menu-yingyeekanban", slug: "turnover-board" },
  { id: "15", key: "menu-op-turnover-settle", name: "联销结算", icon: "org-menu-lianxiaojiesuan", slug: "turnover-settle" },
  { id: "16", key: "menu-op-patrol-merchant", name: "商铺巡检", icon: "org-menu-shangpu", slug: "patrol-merchant" },
  { id: "17", key: "menu-op-patrol-vacancy", name: "空铺巡检", icon: "org-menu-kongpu", slug: "patrol-vacancy" },
  { id: "18", key: "menu-op-merchant-info", name: "商户信息", icon: "org-menu-zukeliebiao", slug: "merchant-info" },
  { id: "19", key: "menu-op-merchant-reward", name: "商户奖励", icon: "org-menu-shanghujiangli", slug: "merchant-reward" },
  { id: "20", key: "menu-op-merchant-violation", name: "商户违规", icon: "org-menu-shanghuweigui", slug: "merchant-violation" },
  { id: "21", key: "menu-op-store", name: "店铺管理", icon: "org-menu-dianpuguanli", slug: "store" },
  { id: "22", key: "menu-op-apartment-status", name: "公寓房态", icon: "org-menu-gongyufangtai", slug: "apartment-status" },
  { id: "23", key: "menu-op-short-rental", name: "快捷短租", icon: "org-menu-mianhetongduanzu", slug: "short-rental" },
  { id: "24", key: "menu-op-todo", name: "待办事项", icon: "org-menu-daibanshixiang", slug: "todo" },
  { id: "25", key: "menu-op-apartment-checkin", name: "公寓入住", icon: "org-menu-gongyuruzhu", slug: "apartment-checkin" },
  { id: "26", key: "menu-op-apartment-checkout", name: "公寓退租", icon: "org-menu-gongyutuizu", slug: "apartment-checkout" },
  { id: "27", key: "menu-op-apartment-device", name: "公寓智能硬件", icon: "org-menu-gongyuzhinengyingjian", slug: "apartment-device" },
  { id: "28", key: "menu-op-waiting", name: "轮候管理", icon: "org-menu-lunhouguanli", slug: "waiting" },
  { id: "29", key: "menu-op-qualification-personal", name: "个人资格审批", icon: "org-menu-gerenzigeshenpi", slug: "qualification-personal" },
  { id: "30", key: "menu-op-qualification-unit", name: "单位资格审批", icon: "org-menu-danweizigeshenpi", slug: "qualification-unit" },
  { id: "31", key: "menu-op-showings", name: "看房管理", icon: "org-menu-kanfangguanli", slug: "showings" },
  { id: "32", key: "menu-op-page-design", name: "页面装修", icon: "org-menu-yemianzhuangxiu", slug: "page-design" },
  { id: "33", key: "menu-op-news", name: "资讯列表", icon: "org-menu-zixunliebiao", slug: "news" },
  { id: "34", key: "menu-op-forum", name: "邻里论坛", icon: "org-menu-linliluntan", slug: "forum" },
  { id: "35", key: "menu-op-activities", name: "活动报名", icon: "org-menu-huodongbaoming", slug: "activities" },
  { id: "36", key: "menu-op-goods-info", name: "商品信息", icon: "org-menu-shangpinxinxi", slug: "goods-info" },
  { id: "37", key: "menu-op-cargo-owner", name: "货主信息", icon: "org-menu-huozhuxinxi", slug: "cargo-owner" },
  { id: "38", key: "menu-op-business-owner", name: "经营户信息", icon: "org-menu-jingyinghuxinxi", slug: "business-owner" },
  { id: "39", key: "menu-op-ic-card", name: "IC卡管理", icon: "org-menu-ickaguanli", slug: "ic-card" },
  { id: "40", key: "menu-op-traceability", name: "溯源管理", icon: "org-menu-suyuanguanli", slug: "traceability" },
  { id: "41", key: "menu-op-entrance-fee", name: "进场收费", icon: "org-menu-jinchangshoufei", slug: "entrance-fee" },
  { id: "28", key: "menu-op-meeting-room", name: "会议室", icon: "org-menu-huiyishi", slug: "meeting-room" },
  { id: "29", key: "menu-op-venue", name: "场地预约", icon: "org-menu-changdiyuyue", slug: "venue" },
  { id: "30", key: "menu-op-survey", name: "投票问卷", icon: "org-menu-toupiaowenjuan", slug: "survey" },
];

export const OPERATION_PAGE_BY_KEY = Object.fromEntries(
  OPERATION_PAGES.map((page) => [page.key, page]),
);

export function operationHref(key: string): string | undefined {
  const page = OPERATION_PAGE_BY_KEY[key];
  return page ? `/orgs/operation/${page.slug}` : undefined;
}

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
