"use client";

import { useState, type ReactNode } from "react";

import { ACCOUNT } from "./data";
import { DownIcon } from "./icons";
import {
  SkActionLink,
  SkButton,
  SkCard,
  SkCheckbox,
  SkEmpty,
  SkInput,
  SkPagination,
  SkRequired,
  SkSearchButtonGroup,
  SkSelect,
  SkSwitch,
  SkTable,
  SkTabs,
} from "./SettingsUI";

function Field({
  label,
  required = false,
  children,
  className = "",
}: {
  label?: ReactNode;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`sk-field${className ? ` ${className}` : ""}`}>
      {label ? (
        <label className="sk-field-label">
          {required ? <span className="sk-required-mark">*</span> : null}
          {label}
        </label>
      ) : null}
      {children}
    </div>
  );
}

function SearchActions() {
  return (
    <span className="sk-search-actions">
      <span className="sk-link">清除选项</span>
      <span className="sk-collapse">
        <span>收起</span>
        <span className="sk-up-arrow" />
      </span>
    </span>
  );
}

function InnerMenu({
  items,
  active = 0,
  className = "",
}: {
  items: ReactNode[];
  active?: number;
  className?: string;
}) {
  return (
    <div className={`sk-inner-menu${className ? ` ${className}` : ""}`}>
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          className={`sk-inner-item${index === active ? " is-active" : ""}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function FormRow({
  label,
  required = false,
  children,
  hint,
}: {
  label: ReactNode;
  required?: boolean;
  children: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="sk-form-row">
      <div className="sk-form-label">
        {required ? <span className="sk-required-mark">*</span> : null}
        {label}
      </div>
      <div className="sk-form-control">
        {children}
        {hint ? <div className="sk-form-hint">{hint}</div> : null}
      </div>
    </div>
  );
}

function UploadTile({ square = false, label = "上传" }: { square?: boolean; label?: string }) {
  return (
    <div className={`sk-upload${square ? " is-square" : ""}`}>
      <span className="sk-upload-plus">+</span>
      <span>{label}</span>
    </div>
  );
}

function Switch({ defaultChecked = true }: { defaultChecked?: boolean }) {
  return <SkSwitch defaultChecked={defaultChecked} />;
}

/* 01 企业信息 ------------------------------------------------------------- */

function CompanyInfoPage() {
  const [active] = useState(0);
  return (
    <div className="sk-page sk-page-inner">
      <div className="sk-inner-layout">
        <InnerMenu
          items={["基本设置", "门户设置", "安全设置", "通知设置"]}
          active={active}
        />
        <div className="sk-inner-content">
          <form className="sk-form" onSubmit={(event) => event.preventDefault()}>
            <FormRow label="企业名称" required>
              <SkInput placeholder="请输入企业名称" defaultValue={ACCOUNT.company} />
            </FormRow>
            <FormRow label="企业简称">
              <SkInput placeholder="请输入企业简称" />
            </FormRow>
            <FormRow label="企业邀请码">
              <div className="sk-invite-code">
                <span>ZHJA1W1A</span>
                <span className="sk-invite-sync">↻</span>
                <SkButton>
                  <span className="sk-copy-icon" />
                  复制
                </SkButton>
              </div>
            </FormRow>
            <FormRow label="企业介绍">
              <textarea className="sk-textarea" placeholder="请输入企业介绍" />
            </FormRow>
            <FormRow label="Logo">
              <UploadTile />
            </FormRow>
            <FormRow label="正方形Logo">
              <UploadTile square />
            </FormRow>
            <FormRow label="所属地" required>
              <SkSelect value="辽宁 / 大连" />
            </FormRow>
            <FormRow label="联系方式">
              <SkInput placeholder="请输入企业联系方式" />
            </FormRow>
            <FormRow label="联系地址">
              <SkInput placeholder="请输入企业联系地址" />
            </FormRow>
            <FormRow label="招商热线">
              <SkInput defaultValue="--" />
            </FormRow>
            <FormRow label="招商时间">
              <SkInput placeholder="请输入招商时间，例：早9:00 — 晚8：30" />
            </FormRow>
            <FormRow label="域名前缀">
              <SkInput placeholder="请输入企业域名前缀" />
              <div className="sk-form-hint">企业的域名前缀提交后将不可更改</div>
            </FormRow>
            <FormRow label="工号前缀">
              <SkInput />
            </FormRow>
            <div className="sk-form-actions">
              <SkButton variant="primary" size="md" className="sk-save-btn">
                保 存
              </SkButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* 02 公司列表 ------------------------------------------------------------- */

function CompanyListPage() {
  return (
    <div className="sk-page">
      <SkCard className="sk-search-card">
        <div className="sk-search-top">
          <span>未选择筛选字段</span>
          <SearchActions />
        </div>
        <div className="sk-search-row">
          <Field label="公司名称">
            <SkInput placeholder="请输入公司名称或简称" />
          </Field>
          <Field label="负责人">
            <SkInput placeholder="请输入负责人" />
          </Field>
          <Field label="联系方式">
            <SkInput placeholder="请输入联系方式" />
          </Field>
          <Field label="状态">
            <SkSelect placeholder="请选择状态" />
          </Field>
          <SkSearchButtonGroup />
        </div>
      </SkCard>

      <SkCard>
        <div className="sk-toolbar">
          <div className="sk-title">公司列表</div>
          <div className="sk-toolbar-actions">
            <SkButton variant="primary">
              <span className="sk-plus">+</span>新增
            </SkButton>
            <SkButton>
              更多
              <DownIcon />
            </SkButton>
          </div>
        </div>
        <SkTable
          columns={[
            { key: "check", title: <span className="sk-checkbox-box" />, width: 40 },
            { key: "name", title: "公司名称" },
            { key: "short", title: "公司简称" },
            { key: "tax", title: "纳税识别号" },
            { key: "dept", title: "绑定部门" },
            { key: "owner", title: "负责人" },
            { key: "phone", title: "联系方式" },
            { key: "address", title: "公司地址" },
            { key: "accounts", title: "收支账户数量" },
            { key: "status", title: "状态" },
            { key: "op", title: "操作" },
          ]}
          rows={[
            [
              <span key="c" className="sk-checkbox-box" />,
              ACCOUNT.company,
              "--",
              "--",
              "--",
              "--",
              "--",
              "--",
              "1",
              <Switch key="s" />,
              <span key="op">
                <SkActionLink>编辑</SkActionLink>
                <SkActionLink danger disabled>
                  删除
                </SkActionLink>
              </span>,
            ],
          ]}
          className="sk-table-wide"
        />
        <SkPagination total={1} pageSize={20} />
      </SkCard>
    </div>
  );
}

/* 03 收支账户 ------------------------------------------------------------- */

function AccountsPage() {
  return (
    <div className="sk-page">
      <SkCard className="sk-fill">
        <div className="sk-title sk-title-lg">收支账户配置</div>
        <div className="sk-search-inline">
          <SkInput placeholder="请输入条目名称" />
          <SkInput placeholder="请输入银行账户" />
          <SkSelect placeholder="请选择收款公司" />
          <SkSelect placeholder="请选择状态" />
          <SkButton>重置</SkButton>
          <SkButton variant="primary">搜索</SkButton>
          <span className="sk-inline-spacer" />
          <SkButton>导入</SkButton>
          <SkButton>导出</SkButton>
          <SkButton variant="primary">
            <span className="sk-plus">+</span>新增收支账户
          </SkButton>
        </div>
        <SkTable
          columns={[
            { key: "check", title: <span className="sk-checkbox-box" />, width: 40 },
            { key: "name", title: "条目名称" },
            { key: "company", title: "收款公司" },
            { key: "type", title: "账户类型" },
            { key: "bank", title: "开户银行" },
            { key: "account", title: "银行账号" },
            { key: "status", title: "状态" },
            { key: "op", title: "操作" },
          ]}
          rows={[
            [
              <span key="c" className="sk-checkbox-box" />,
              "住宿费",
              ACCOUNT.company,
              "公司",
              "中国工商银行",
              "622600000000000000",
              <Switch key="s" />,
              <span key="op">
                <SkActionLink>编辑</SkActionLink>
                <SkActionLink danger>删除</SkActionLink>
              </span>,
            ],
          ]}
        />
        <SkPagination total={1} pageSize={10} showTotal={false} />
      </SkCard>
    </div>
  );
}

/* 04 支付配置 ------------------------------------------------------------- */

function PaymentConfigPage() {
  return (
    <div className="sk-page">
      <SkCard className="sk-fill">
        <div className="sk-toolbar">
          <div className="sk-title">支付配置</div>
          <div className="sk-toolbar-actions">
            <SkButton>
              <span className="sk-gear-icon">⚙</span>分账配置
            </SkButton>
            <SkButton variant="primary">
              <span className="sk-plus">+</span>新增配置
            </SkButton>
          </div>
        </div>
        <SkTable
          columns={[
            { key: "name", title: "配置名称" },
            { key: "account", title: "所属公司账户" },
            { key: "method", title: "支付方式" },
            { key: "channel", title: "支付通道" },
            { key: "fee", title: "手续费" },
            { key: "env", title: "使用环境" },
            { key: "status", title: "状态" },
            { key: "op", title: "操作" },
          ]}
          rows={[]}
        />
      </SkCard>
    </div>
  );
}

/* 05 成员/部门 ------------------------------------------------------------ */

const MEMBERS = [
  { name: "王", status: "正常", email: "--", phone: "+86 155****6033", dept: "大连华安物业管理有限公司、维修组", gender: "未知", no: "1" },
  { name: "员工A", status: "正常", email: "--", phone: "+86 138****5678", dept: "大连华安物业管理有限公司", gender: "男", no: "13" },
  { name: "员工B", status: "正常", email: "--", phone: "+86 139****0001", dept: "保洁组", gender: "男", no: "2" },
  { name: "员工C", status: "正常", email: "--", phone: "+86 139****0002", dept: "保洁组", gender: "男", no: "3" },
  { name: "员工D", status: "正常", email: "--", phone: "+86 139****0003", dept: "保洁组", gender: "男", no: "4" },
  { name: "员工E", status: "正常", email: "--", phone: "+86 139****0005", dept: "保洁组", gender: "男", no: "5" },
  { name: "员工F", status: "正常", email: "--", phone: "+86 139****0006", dept: "安保组", gender: "男", no: "6" },
  { name: "员工G", status: "正常", email: "--", phone: "+86 139****0007", dept: "安保组", gender: "男", no: "7" },
  { name: "员工H", status: "正常", email: "--", phone: "+86 139****0008", dept: "安保组", gender: "男", no: "8" },
  { name: "员工I", status: "正常", email: "--", phone: "+86 139****0009", dept: "安保组", gender: "男", no: "9" },
];

function MembersPage() {
  const [tab, setTab] = useState(0);
  return (
    <div className="sk-page">
      <SkCard className="sk-members-card">
        <SkTabs items={["成员", "部门", "岗位"]} active={tab} onChange={setTab} />
        <div className="sk-members-layout">
          <aside className="sk-members-tree">
            <div className="sk-tree-search">
              <SkInput placeholder="搜索成员或部门" />
              <button type="button" className="sk-tree-search-btn" aria-label="search">
                ⌕
              </button>
            </div>
            <div className="sk-tree">
              <div className="sk-tree-row is-selected">
                <span className="sk-tree-caret">⌄</span>
                <span>{ACCOUNT.company}</span>
                <span className="sk-tree-more">⋯</span>
              </div>
              <div className="sk-tree-group">
                <div className="sk-tree-row">
                  <span className="sk-tree-caret">⌄</span>
                  <span>后勤部</span>
                  <span className="sk-tree-more">⋯</span>
                </div>
                {["保洁组", "安保组", "维修组", "接待组", "物资组"].map((name) => (
                  <div key={name} className="sk-tree-row is-leaf">
                    <span className="sk-tree-person">♙</span>
                    <span>{name}</span>
                    <span className="sk-tree-more">⋯</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          <section className="sk-members-main">
            <div className="sk-toolbar sk-members-toolbar">
              <div className="sk-members-title">
                <strong>{ACCOUNT.company}</strong>
                <span className="sk-edit-icon">✎</span>
                <span className="sk-member-count">♙14</span>
                <span className="sk-help-icon">ⓘ</span>
              </div>
              <div className="sk-toolbar-actions">
                <SkButton variant="primary">添加成员</SkButton>
                <SkButton>申请人列表</SkButton>
                <SkButton>
                  更多
                  <DownIcon />
                </SkButton>
              </div>
            </div>
            <div className="sk-member-status">
              <span>状态：</span>
              <span className="sk-status-pill is-active">全部</span>
              <span className="sk-status-pill">正常</span>
              <span className="sk-status-pill">未激活</span>
              <span className="sk-grid-icon">▦</span>
            </div>
            <SkTable
              columns={[
                { key: "check", title: <span className="sk-checkbox-box" />, width: 40 },
                { key: "name", title: "姓名" },
                { key: "status", title: "账号状态" },
                { key: "email", title: "邮箱" },
                { key: "phone", title: "手机" },
                { key: "dept", title: "部门" },
                { key: "gender", title: "性别" },
                { key: "no", title: "工号" },
                { key: "op", title: "操作" },
              ]}
              className="sk-table-wide"
              rows={MEMBERS.map((member) => [
                <span key="c" className="sk-checkbox-box" />,
                member.name,
                <span key="s" className="sk-status-dot">
                  {member.status}
                </span>,
                member.email,
                member.phone,
                member.dept,
                member.gender,
                member.no,
                <span key="op">
                  <SkActionLink>详情</SkActionLink>
                  <SkActionLink>···</SkActionLink>
                </span>,
              ])}
            />
            <div className="sk-members-footer">
              <SkSwitch defaultChecked={false} />
              <span>仅展示部门的直属成员</span>
            </div>
            <SkPagination total={14} pageSize={10} showTotal={false} />
          </section>
        </div>
      </SkCard>
    </div>
  );
}

/* 06 角色管理 ------------------------------------------------------------- */

function RolesPage() {
  return (
    <div className="sk-page">
      <div className="sk-roles-layout">
        <SkCard className="sk-roles-side">
          <button type="button" className="sk-role-item is-active">
            <span className="sk-role-icon">♙</span>
            <span>超级管理员</span>
            <span className="sk-role-tag">系统角色</span>
          </button>
          <button type="button" className="sk-role-item">
            <span className="sk-role-icon">♙</span>
            <span>使用人员</span>
            <span className="sk-tree-more">⋯</span>
          </button>
          <div className="sk-roles-add">
            <SkButton variant="outline" className="sk-roles-add-btn">
              新增角色
            </SkButton>
          </div>
        </SkCard>
        <SkCard className="sk-roles-main">
          <div className="sk-toolbar">
            <div className="sk-members-title">
              <strong>超级管理员</strong>
              <span className="sk-edit-icon">✎</span>
              <span className="sk-member-count">♙ 1</span>
            </div>
            <div className="sk-toolbar-actions">
              <SkButton variant="primary">添加成员</SkButton>
              <SkButton disabled>移除成员</SkButton>
            </div>
          </div>
          <div className="sk-role-search">
            <SkInput placeholder="搜索成员姓名" />
            <SkButton variant="primary">⌕</SkButton>
          </div>
          <SkTable
            columns={[
              { key: "check", title: <span className="sk-checkbox-box" />, width: 40 },
              { key: "name", title: "姓名" },
              { key: "phone", title: "电话" },
              { key: "no", title: "工号" },
              { key: "dept", title: "所属部门" },
              { key: "op", title: "操作" },
            ]}
            rows={[
              [
                <span key="c" className="sk-checkbox-box" />,
                <span key="n">
                  王 <span className="sk-role-tag is-green">创建人</span>
                </span>,
                "+86 155****6033",
                "1",
                "大连华安物业管理有限公司、维修组",
                <SkActionLink key="op">转移</SkActionLink>,
              ],
            ]}
          />
          <SkPagination total={1} pageSize={10} showTotal={false} />
        </SkCard>
      </div>
    </div>
  );
}

/* 07 菜单管理 ------------------------------------------------------------- */

function MenusPage() {
  return (
    <div className="sk-page">
      <div className="sk-info-alert">
        <span>
          在菜单管理中，企业可依据自身实际业务需求，灵活自定义菜单的名称以及其在界面中的显示位置。完成菜单的自定义设置后，在后续角色管理工作中，系统会以已自定义好的菜单架构为基础，为不同角色分配相应的菜单权限。
          三级菜单的布局受到限制，不可脱离其原本关联的二级菜单所在位置而进行单独拖动调整。
        </span>
        <button type="button" className="sk-alert-close" aria-label="close">
          ×
        </button>
      </div>
      <div className="sk-menus-layout">
        <SkCard className="sk-menus-side">
          <div className="sk-menu-side-title">默认菜单</div>
          <div className="sk-menu-list">
            {["数据中心", "资产管理", "资源管理", "招商管理", "客商管理", "租赁管理", "业务财务", "运营管理", "成本管理", "物业管理", "行政办公", "智慧物联", "系统设置"].map(
              (name) => (
                <div key={name} className="sk-menu-row">
                  <span className="sk-menu-caret">▸</span>
                  <span>{name}</span>
                  <span className="sk-menu-plus">+</span>
                </div>
              ),
            )}
          </div>
          <div className="sk-menus-add">
            <SkButton variant="outline" className="sk-menus-add-btn">
              + 添加自定义菜单
            </SkButton>
          </div>
        </SkCard>
        <SkCard className="sk-menus-main">
          <div className="sk-toolbar">
            <div className="sk-title">自定义菜单</div>
            <div className="sk-toolbar-actions">
              <SkButton disabled>恢复默认</SkButton>
              <SkButton>重置</SkButton>
              <SkButton>保存草稿</SkButton>
              <SkButton variant="primary">发布</SkButton>
            </div>
          </div>
          <div className="sk-menu-editor">
            <div className="sk-menu-editor-row">
              <div className="sk-menu-editor-label">顶部菜单</div>
              <div className="sk-menu-drop sk-menu-drop-top">
                暂无数据，请从左侧默认菜单拖拽，搭建你的自定义菜单
              </div>
            </div>
            <div className="sk-menu-editor-row">
              <div className="sk-menu-editor-label">左侧菜单</div>
              <div className="sk-menu-drop sk-menu-drop-left">
                <SkEmpty text="暂无数据，请从左侧默认菜单拖拽，搭建你的自定义菜单" />
              </div>
            </div>
          </div>
        </SkCard>
      </div>
    </div>
  );
}

/* 08 查看权限 ------------------------------------------------------------- */

const AUTH_SECTIONS = ["隐藏的部门/成员", "限制查看外部门", "限制查看所有人"];

function ContactAuthPage() {
  return (
    <div className="sk-page">
      <SkCard className="sk-fill">
        <div className="sk-page-title">通讯录查看权限</div>
        <div className="sk-info-alert">
          <span>
            1.当成员同时处于多个权限模块中，其权限优先级（权重）规则如下：限制查看所有人 &gt; 隐藏部门/成员权限 &gt; 限制查看外部门权限。
            <br />
            2.当成员归属于某一部门，且成员与所在部门均单独设置了权限时，其权限优先级（权重）规则如下：成员&gt;部门。
          </span>
          <button type="button" className="sk-alert-close" aria-label="close">
            ×
          </button>
        </div>
        {AUTH_SECTIONS.map((section) => (
          <div key={section} className="sk-auth-section">
            <div className="sk-section-head">
              <div className="sk-section-title">
                <span className="sk-section-bar" />
                {section} <span className="sk-help-icon">ⓘ</span>
              </div>
              <div className="sk-toolbar-actions">
                <SkButton>↻ 刷新</SkButton>
                <SkButton variant="outline">
                  <span className="sk-plus">+</span>新增
                </SkButton>
              </div>
            </div>
            <SkTable
              columns={[
                { key: "target", title: "部门/成员", width: "45%" },
                { key: "info", title: "通讯录信息", width: "45%" },
                { key: "op", title: "操作" },
              ]}
              rows={[]}
            />
          </div>
        ))}
      </SkCard>
    </div>
  );
}

/* 09 资料显示 ------------------------------------------------------------- */

function ContactDisplayPage() {
  return (
    <div className="sk-page">
      <SkCard className="sk-fill">
        <div className="sk-page-title">成员资料显示</div>
        <div className="sk-section-head sk-display-head">
          <div className="sk-section-title">
            <span className="sk-section-bar" />
            企业内资料展示 <span className="sk-help-icon">ⓘ</span>
          </div>
        </div>
        <div className="sk-display-table">
          <div className="sk-display-row">
            <div className="sk-display-label">个人信息显示</div>
            <div className="sk-display-value">姓名、部门、职位、手机号码、邮箱地址、性别</div>
            <button type="button" className="sk-action-link">
              ✎ 修改
            </button>
          </div>
          <div className="sk-display-row">
            <div className="sk-display-label">敏感成员信息显示</div>
            <div className="sk-display-value">0条规则，0位成员，0个部门</div>
            <button type="button" className="sk-action-link">
              ◉ 查看
            </button>
          </div>
        </div>
      </SkCard>
    </div>
  );
}

/* 10 AI 基础设置 ---------------------------------------------------------- */

function AiBasicPage() {
  return (
    <div className="sk-page sk-ai-page">
      <form className="sk-ai-form" onSubmit={(event) => event.preventDefault()}>
        <Field label={<SkRequired>AI名称</SkRequired>}>
          <SkInput placeholder="请输入" />
        </Field>
        <Field label={<SkRequired>AI Logo</SkRequired>}>
          <UploadTile square label="" />
        </Field>
        <Field label="对话音色">
          <SkSelect value="甜美小源" />
        </Field>
        <Field label="是否启用">
          <SkSwitch />
        </Field>
        <Field label="工具">
          <div className="sk-check-grid">
            <SkCheckbox label="智能体" />
            <SkCheckbox label="知识问答" />
          </div>
        </Field>
        <Field label="技能池 ⓘ">
          <div className="sk-check-grid is-five">
            {["天气", "打卡", "补卡", "请假", "日程", "任务", "审批", "汇报", "工单"].map((name) => (
              <SkCheckbox key={name} label={name} />
            ))}
          </div>
        </Field>
        <Field label="智能体">
          <div className="sk-check-grid">
            {["财务数据助手", "合同数据助手", "招商数据助手", "IOT数据助手"].map((name) => (
              <SkCheckbox key={name} label={name} />
            ))}
          </div>
        </Field>
        <div className="sk-ai-save">
          <SkButton variant="primary">保 存</SkButton>
        </div>
      </form>
    </div>
  );
}

/* 11 AI 模型参数 ---------------------------------------------------------- */

function AiModelPage() {
  return (
    <div className="sk-page sk-page-inner">
      <div className="sk-inner-layout">
        <InnerMenu items={["基础配置", "知识库"]} active={0} />
        <div className="sk-inner-content">
          <form
            className="sk-form sk-form-centered"
            onSubmit={(event) => event.preventDefault()}
          >
            <FormRow label="平台" required>
              <SkSelect placeholder="请选择" />
            </FormRow>
            <FormRow label="模型" required>
              <SkSelect placeholder="请选择" />
            </FormRow>
            <FormRow label="豆包大模型Base URL" required>
              <SkInput defaultValue="https://ark.cn-beijing.volces.com" />
              <div className="sk-form-hint">一般不用修改</div>
            </FormRow>
            <FormRow label="豆包语音Appid" required>
              <SkInput placeholder="请输入" />
              <div className="sk-form-hint">火山引擎-&gt;豆包语音-&gt;语音合成-&gt;APP ID</div>
            </FormRow>
            <FormRow label="豆包语音Access Token" required>
              <SkInput placeholder="请输入" />
              <div className="sk-form-hint">火山引擎-&gt;豆包语音-&gt;语音合成-&gt;Access Token</div>
            </FormRow>
            <div className="sk-form-actions">
              <SkButton variant="primary">保 存</SkButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* 12 AI 问题库 ------------------------------------------------------------ */

const QUESTIONS = [
  ["{城市名称}老字号美食店", "生活", "2026/11/27 13:50"],
  ["{城市名称}必游景点", "生活", "2026/11/27 13:50"],
  ["办公室咋做健身", "生活", "2026/11/27 13:50"],
  ["{城市名称}未来一周天气", "生活", "2026/11/27 13:50"],
  ["户外运动注意事项", "生活", "2026/11/27 13:50"],
  ["养生小技巧", "生活", "2026/11/27 13:50"],
  ["{城市名称}好玩的公园", "生活", "2026/11/27 13:50"],
  ["{城市名称}今日天气", "生活", "2026/11/27 13:50"],
  ["不同班次考勤设置", "办公", "2026/11/27 13:50"],
  ["角色权限细分", "办公", "2026/11/27 13:50"],
];

function AiQuestionsPage() {
  return (
    <div className="sk-page">
      <SkCard className="sk-fill">
        <div className="sk-card-tabs-row">
          <SkTabs items={["全部", "办公", "生活"]} active={0} onChange={() => {}} />
          <SkButton variant="outline">
            <span className="sk-plus">+</span>新增分类
          </SkButton>
        </div>
        <div className="sk-search-card sk-search-inset">
          <div className="sk-search-top">
            <span>未选择筛选字段</span>
            <SearchActions />
          </div>
          <div className="sk-search-row sk-search-row-two">
            <Field label="问题">
              <SkInput placeholder="请输入问题" />
            </Field>
            <Field label="状态">
              <SkSelect placeholder="请选择状态" />
            </Field>
            <SkSearchButtonGroup />
          </div>
        </div>
        <div className="sk-toolbar sk-list-toolbar">
          <div className="sk-title">问题列表</div>
          <SkButton>↻ 刷新</SkButton>
        </div>
        <SkTable
          columns={[
            { key: "question", title: "问题", width: "32%" },
            { key: "category", title: "所属分类" },
            { key: "status", title: "状态" },
            { key: "hot", title: "突出显示" },
            { key: "creator", title: "创建人员" },
            { key: "time", title: "创建时间" },
            { key: "op", title: "操作" },
          ]}
          rows={QUESTIONS.map(([question, category, time]) => [
            question,
            category,
            <Switch key={`${question}-s`} />,
            "否",
            ACCOUNT.userName,
            time,
            <span key={`${question}-op`}>
              <SkActionLink>编辑</SkActionLink>
              <SkActionLink danger>删除</SkActionLink>
            </span>,
          ])}
        />
      </SkCard>
    </div>
  );
}

/* 13 AI 智能体 ------------------------------------------------------------ */

function AiAgentsPage() {
  return (
    <div className="sk-page">
      <SkCard className="sk-fill">
        <div className="sk-card-tabs-row">
          <SkTabs items={["全部"]} active={0} onChange={() => {}} />
          <SkButton variant="outline">
            <span className="sk-plus">+</span>新增分类
          </SkButton>
        </div>
        <div className="sk-search-card sk-search-inset">
          <div className="sk-search-top">
            <span>未选择筛选字段</span>
            <SearchActions />
          </div>
          <div className="sk-search-row">
            <Field label="智能体名称">
              <SkInput placeholder="请输入智能体名称" />
            </Field>
            <Field label="是否公开">
              <SkSelect placeholder="请选择是否公开" />
            </Field>
            <Field label="状态">
              <SkSelect placeholder="请选择状态" />
            </Field>
            <Field label="创建人员">
              <SkSelect placeholder="请选择" />
            </Field>
            <SkSearchButtonGroup />
          </div>
        </div>
        <div className="sk-toolbar sk-list-toolbar">
          <div className="sk-title">智能体列表</div>
          <SkButton>↻ 刷新</SkButton>
        </div>
        <SkTable
          columns={[
            { key: "name", title: "智能体名称" },
            { key: "image", title: "智能体图片" },
            { key: "category", title: "所属分类" },
            { key: "voice", title: "对话音色" },
            { key: "public", title: "是否公开" },
            { key: "status", title: "状态" },
            { key: "creator", title: "创建人员" },
            { key: "time", title: "创建时间" },
            { key: "op", title: "操作" },
          ]}
          rows={[]}
        />
      </SkCard>
    </div>
  );
}

/* 14/15 微信服务号 / 微信小程序 ------------------------------------------- */

function WechatServicePage() {
  return (
    <div className="sk-page sk-integration-page">
      <div className="sk-integration-layout">
        <SkCard className="sk-integration-menu">
          <div className="sk-integration-brand">
            <span className="sk-brand-icon is-green">✆</span>
            <span>微信服务号</span>
          </div>
          <InnerMenu
            items={["服务号绑定", "模板消息", "关键词回复", "自定义菜单", "渠道二维码"]}
            active={0}
            className="sk-integration-inner"
          />
        </SkCard>
        <SkCard className="sk-integration-main">
          <div className="sk-toolbar">
            <div className="sk-title">服务号绑定</div>
            <SkButton variant="primary">绑定服务号</SkButton>
          </div>
          <SkTable
            columns={[
              { key: "appid", title: "App id" },
              { key: "name", title: "服务号名称" },
              { key: "biz", title: "应用业务" },
              { key: "project", title: "应用项目" },
              { key: "op", title: "操作" },
            ]}
            rows={[]}
          />
        </SkCard>
      </div>
    </div>
  );
}

function WechatMiniPage() {
  return (
    <div className="sk-page sk-integration-page">
      <div className="sk-integration-layout">
        <SkCard className="sk-integration-menu">
          <div className="sk-integration-brand">
            <span className="sk-brand-icon is-green">◉</span>
            <span>微信小程序</span>
          </div>
          <InnerMenu
            items={["小程序绑定", "订阅消息"]}
            active={0}
            className="sk-integration-inner"
          />
        </SkCard>
        <SkCard className="sk-integration-main">
          <div className="sk-toolbar">
            <div className="sk-title">小程序绑定</div>
            <SkButton variant="primary">绑定小程序</SkButton>
          </div>
          <SkTable
            columns={[
              { key: "appid", title: "App id" },
              { key: "name", title: "小程序名称" },
              { key: "type", title: "小程序类型" },
              { key: "project", title: "应用项目" },
              { key: "version", title: "版本管理" },
              { key: "op", title: "操作" },
            ]}
            rows={[]}
          />
        </SkCard>
      </div>
    </div>
  );
}

/* 16 企业微信 ------------------------------------------------------------- */

function WecomPage() {
  return (
    <div className="sk-page">
      <SkCard className="sk-wecom-card">
        <div className="sk-page-title sk-wecom-title">企业授权</div>
        <div className="sk-wecom-body">
          <SkButton variant="primary">授权企业微信</SkButton>
        </div>
      </SkCard>
    </div>
  );
}

/* 17 钉钉 ---------------------------------------------------------------- */

function DingtalkPage() {
  return (
    <div className="sk-page">
      <SkCard className="sk-integration-main sk-plain-card">
        <div className="sk-toolbar">
          <div className="sk-title">钉钉绑定</div>
          <SkButton variant="primary">绑定钉钉</SkButton>
        </div>
        <SkTable
          columns={[
            { key: "id", title: "企业ID" },
            { key: "name", title: "企业名称" },
            { key: "industry", title: "行业" },
            { key: "time", title: "授权时间" },
            { key: "qr", title: "扫码加入钉钉" },
            { key: "op", title: "操作" },
          ]}
          rows={[]}
        />
      </SkCard>
    </div>
  );
}

/* 18 飞书 ---------------------------------------------------------------- */

function FeishuPage() {
  return (
    <div className="sk-page">
      <SkCard className="sk-plain-card">
        <div className="sk-toolbar">
          <div className="sk-title">应用列表</div>
          <SkButton variant="primary">新增应用</SkButton>
        </div>
        <SkTable
          columns={[
            { key: "company", title: "企业名称" },
            { key: "id", title: "企业ID" },
            { key: "time", title: "添加时间" },
            { key: "op", title: "操作" },
          ]}
          rows={[]}
        />
      </SkCard>
    </div>
  );
}

/* 19 APP ----------------------------------------------------------------- */

function AppPage() {
  return (
    <div className="sk-page">
      <SkCard className="sk-plain-card">
        <div className="sk-toolbar">
          <div className="sk-title">APP列表</div>
          <SkButton variant="primary">添加APP</SkButton>
        </div>
        <SkTable
          columns={[
            { key: "name", title: "App名称" },
            { key: "versionName", title: "版本名称" },
            { key: "version", title: "版本号" },
            { key: "android", title: "安卓下载链接" },
            { key: "ios", title: "IOS下载链接" },
            { key: "qr", title: "应用二维码" },
            { key: "op", title: "操作" },
          ]}
          rows={[]}
        />
      </SkCard>
    </div>
  );
}

/* 20 操作日志 ------------------------------------------------------------- */

const LOG_ROWS = [
  ["王", "155****6033", "org", "org", "[POST] /user/department/user/field/list", "10.0.0.1", "北京-北京市:联通", "200", "2026-11-27 16:42:19"],
  ["王", "155****6033", "org", "org", "[POST] /org/menu/diy/detail", "10.0.0.1", "北京-北京市:联通", "200", "2026-11-27 16:42:18"],
  ["王", "155****6033", "org", "org", "[POST] /org/menu/diy/custom/list", "10.0.0.1", "北京-北京市:联通", "200", "2026-11-27 16:42:18"],
  ["王", "155****6033", "org", "org", "[POST] /org/menu/diy/menu/list", "10.0.0.1", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "155****6033", "work_energy", "org", "[POST] /energy/getEnergyStatistics", "10.0.0.1", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "155****6033", "work_visitor", "org", "[POST] /passRecord/getFreeItemView", "10.0.0.1", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "155****6033", "work_visitor", "org", "[POST] /passRecord/getRecord", "10.0.0.1", "北京-北京市:联通", "200", "2026-11-27 16:40:37"],
  ["王", "155****6033", "work_energy", "org", "[POST] /energy/getEnergyOfflineRate", "10.0.0.1", "北京-北京市:联通", "200", "2026-11-27 16:40:35"],
];

function OperationLogPage() {
  return (
    <div className="sk-page">
      <SkCard className="sk-fill sk-log-card">
        <div className="sk-log-filters">
          <label className="sk-log-label">
            登录用户：
            <span className="sk-log-input-wrap">
              <SkInput placeholder="请输入用户手机号" />
              <span className="sk-log-search">⌕</span>
            </span>
          </label>
          <label className="sk-log-label">
            用户IP：
            <span className="sk-log-input-wrap">
              <SkInput placeholder="请输入用户IP" />
              <span className="sk-log-search">⌕</span>
            </span>
          </label>
          <label className="sk-log-label">
            服务名称：
            <span className="sk-log-input-wrap">
              <SkInput placeholder="请输入服务名称" />
              <span className="sk-log-search">⌕</span>
            </span>
          </label>
          <label className="sk-log-label">
            端口：
            <SkSelect placeholder="请选择端口" className="sk-log-select" />
          </label>
          <label className="sk-log-label">
            操作时间：
            <span className="sk-date-range">
              <span>开始日期</span>
              <span className="sk-date-arrow">→</span>
              <span>结束日期</span>
              <span className="sk-date-icon">▣</span>
            </span>
          </label>
        </div>
        <SkTable
          columns={[
            { key: "user", title: "登录用户" },
            { key: "phone", title: "手机号" },
            { key: "service", title: "服务名称" },
            { key: "port", title: "端口" },
            { key: "route", title: "路由" },
            { key: "ip", title: "登录IP" },
            { key: "location", title: "登录地点" },
            { key: "status", title: "状态码" },
            { key: "time", title: "操作时间" },
          ]}
          rows={LOG_ROWS}
        />
      </SkCard>
    </div>
  );
}

const SETTINGS_COMPONENTS: Record<string, () => ReactNode> = {
  "company-info": CompanyInfoPage,
  "company-list": CompanyListPage,
  accounts: AccountsPage,
  "payment-config": PaymentConfigPage,
  members: MembersPage,
  roles: RolesPage,
  menus: MenusPage,
  "contact-auth": ContactAuthPage,
  "contact-display": ContactDisplayPage,
  "ai-basic": AiBasicPage,
  "ai-model": AiModelPage,
  "ai-questions": AiQuestionsPage,
  "ai-agents": AiAgentsPage,
  "wechat-service": WechatServicePage,
  "wechat-mini": WechatMiniPage,
  wecom: WecomPage,
  dingtalk: DingtalkPage,
  feishu: FeishuPage,
  app: AppPage,
  "operation-log": OperationLogPage,
};

export function SettingsPageRenderer({ slug }: { slug: string }) {
  const Component = SETTINGS_COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
