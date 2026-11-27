"use client";

import { useState } from "react";

import {
  SkButton,
  SkDrawer,
  SkInput,
  SkModal,
  SkPagination,
  SkSelect,
  SkTable,
  SkTabs,
  useSkMessage,
} from "../app/SettingsUI";
import { OfficeField } from "../office/common";
import { SubSidebar, type SubMenuItem } from "./common";

const PASS_ITEMS: SubMenuItem[] = [
  { name: "出入证信息" },
  { name: "出入记录" },
  { name: "黑名单" },
  { name: "出入证设置", children: [{ name: "管理员设置" }, { name: "编号设置" }] },
];

const RECORD_ITEMS: SubMenuItem[] = [{ name: "申请记录" }, { name: "管理员设置" }];

export function PassPage() {
  const [active, setActive] = useState("出入证信息");
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [idCard, setIdCard] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const [house, setHouse] = useState("");
  const { show, node } = useSkMessage();

  return (
    <div className="pp-page pp-workorder-page">
      <SubSidebar brand="出入证管理" icon="org-menu-churuzheng" items={PASS_ITEMS} active={active} onChange={setActive} defaultOpen={["出入证设置"]} />
      <section className="pp-main">
        {active === "出入证信息" ? (
          <>
            <div className="pp-content-card is-plain">
              <SkTabs items={["已绑定", "未绑定"]} active={tab} onChange={setTab} />
              <div className="pp-search-row">
                <SkInput placeholder="搜索姓名/手机号" />
                <SkInput placeholder="搜索出入证编号" />
                <SkSelect placeholder="请选择房源" />
                <SkSelect placeholder="全部状态" />
                <SkButton variant="primary" onClick={() => show("查询成功")}>搜索</SkButton>
                <SkButton onClick={() => show("已重置")}>重置</SkButton>
              </div>
            </div>
            <div className="pp-list-card">
              <div className="pp-list-head">
                <span />
                <div className="pp-toolbar-actions">
                  <SkButton variant="primary" onClick={() => setOpen(true)}>+ 添加出入证</SkButton>
                  <SkButton onClick={() => show("审批流设置")}>审批流设置</SkButton>
                </div>
              </div>
              <SkTable
                columns={[
                  { key: "code", title: "出入证编号" },
                  { key: "person", title: "绑定人员" },
                  { key: "valid", title: "有效期" },
                  { key: "status", title: "使用状态" },
                  { key: "building", title: "归属楼宇" },
                  { key: "time", title: "添加时间" },
                  { key: "op", title: "操作" },
                ]}
                rows={[]}
              />
            </div>
          </>
        ) : active === "出入记录" ? (
          <div className="pp-content-card is-plain">
            <div className="pp-search-row">
              <SkSelect placeholder="请选择楼宇" />
              <SkButton variant="primary" onClick={() => show("查询成功")}>搜 索</SkButton>
              <SkButton>重 置</SkButton>
            </div>
            <SkTable
              columns={[
                { key: "person", title: "出入人员" },
                { key: "time", title: "出入时间" },
                { key: "place", title: "出入地点（楼宇）" },
                { key: "code", title: "出入证编号" },
                { key: "status", title: "状态" },
                { key: "op", title: "操作详细信息" },
              ]}
              rows={[]}
            />
          </div>
        ) : active === "黑名单" ? (
          <div className="pp-content-card is-plain">
            <div className="pp-card-head"><span /><SkButton variant="primary" onClick={() => show("添加黑名单")}>添加黑名单</SkButton></div>
            <SkTable columns={[{ key: "name", title: "姓名" }, { key: "phone", title: "手机号" }, { key: "time", title: "添加时间" }, { key: "op", title: "操作" }]} rows={[]} />
          </div>
        ) : active === "管理员设置" ? (
          <div className="pp-content-card is-plain">
            <div className="pp-card-head"><strong>应用管理员</strong><SkButton onClick={() => show("添加管理员")}>添 加</SkButton></div>
            <div className="wo-ledger-note">可设置应用的核销员</div>
            <div className="pp-card-head"><strong>核销员</strong><SkButton onClick={() => show("添加核销员")}>添 加</SkButton></div>
            <div className="wo-ledger-note">可在员工移动端核验出入证</div>
          </div>
        ) : active === "编号设置" ? (
          <div className="pp-content-card is-plain">
            <div className="pp-search-top"><span>未选择筛选字段</span><span className="pp-search-top-actions"><span className="sk-link">清除选项</span><span>收起 ⌃</span></span></div>
            <div className="pp-search-row">
              <OfficeField label="编号规则标题"><SkInput /></OfficeField>
              <OfficeField label="绑定项目"><SkSelect placeholder="请选择绑定项目" /></OfficeField>
              <div className="pp-filter-actions"><SkButton variant="primary">搜索</SkButton><SkButton>重置</SkButton></div>
            </div>
            <div className="pp-card-head"><strong>编号规则列表</strong><div className="pp-toolbar-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => show("新增成功")}>新增编号规则</SkButton></div></div>
            <SkTable
              columns={[{ key: "title", title: "编号规则标题" }, { key: "rule", title: "编号规则" }, { key: "preview", title: "规则结果预览" }, { key: "project", title: "绑定项目" }, { key: "op", title: "操作" }]}
              rows={[["默认规则", "创建日期+流水号", <div key="p" className="pp-rule-detail">2026112800000</div>, "全部项目", <span key="op" className="sk-action-link" onClick={() => show("编辑规则")}>编辑</span>]]}
            />
            <SkPagination total={1} pageSize={20} showTotal />
          </div>
        ) : null}
      </section>

      <SkModal
        open={open}
        title="发放通行证"
        width={640}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim() || !phone.trim()) {
                  show("请填写姓名和手机号码");
                  return;
                }
                setOpen(false);
                show("发放成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="pp-modal-form">
          <OfficeField label="姓名" required><SkInput value={name} onChange={setName} placeholder="请填写姓名" /></OfficeField>
          <OfficeField label="手机号码" required><SkInput value={phone} onChange={setPhone} placeholder="请填写手机号码" /></OfficeField>
          <OfficeField label="邮箱号"><SkInput value={email} onChange={setEmail} placeholder="请输入邮箱号" /></OfficeField>
          <OfficeField label="身份证号码"><SkInput value={idCard} onChange={setIdCard} placeholder="请填写身份证号码" /></OfficeField>
          <OfficeField label="出入起止时间">
            <div className="pp-date-pair"><SkInput type="date" value={start} onChange={setStart} /><span>→</span><SkInput type="date" value={end} onChange={setEnd} /></div>
          </OfficeField>
          <OfficeField label="发放原因"><SkInput value={reason} onChange={setReason} /></OfficeField>
          <OfficeField label="归属房源"><SkSelect value={house} options={["宿舍楼01", "宿舍楼02", "智慧园区"]} onChange={setHouse} placeholder="请选择房源" /></OfficeField>
        </div>
      </SkModal>
      {node}
    </div>
  );
}

export function VisitorAppointmentPage() {
  const [active, setActive] = useState("申请记录");
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [note, setNote] = useState("");
  const { show, node } = useSkMessage();

  return (
    <div className="pp-page pp-workorder-page">
      <SubSidebar brand="访客预约" icon="org-menu-fangkeyuyue" items={RECORD_ITEMS} active={active} onChange={setActive} />
      <section className="pp-main">
        {active === "申请记录" ? (
          <>
            <div className="pp-content-card is-plain">
              <SkTabs items={["未审批", "已审批"]} active={tab} onChange={setTab} />
              <div className="pp-search-top"><span>未选择筛选字段</span><span className="pp-search-top-actions"><span className="sk-link">清除选项</span><span>收起 ⌃</span></span></div>
              <div className="pp-search-row">
                <OfficeField label="申请人姓名/手机号"><SkInput placeholder="请输入" /></OfficeField>
                <OfficeField label="项目名称"><SkSelect placeholder="请选择项目名称" /></OfficeField>
                <OfficeField label="申请时间"><SkInput type="date" /></OfficeField>
                <div className="pp-filter-actions"><SkButton variant="primary">搜索</SkButton><SkButton>重置</SkButton></div>
              </div>
            </div>
            <div className="pp-list-card">
              <div className="pp-list-head"><strong>申请记录</strong><div className="pp-toolbar-actions"><SkButton onClick={() => show("刷新成功")}>刷新</SkButton><SkButton variant="primary" onClick={() => setOpen(true)}>新增</SkButton><SkButton>更多 ⌄</SkButton></div></div>
              <SkTable
                columns={[
                  { key: "person", title: "申请人姓名/手机号" },
                  { key: "code", title: "申请编号" },
                  { key: "email", title: "邮箱" },
                  { key: "visit", title: "拜访时间" },
                  { key: "apply", title: "申请时间" },
                  { key: "status", title: "状态" },
                  { key: "op", title: "操作" },
                ]}
                rows={[]}
              />
            </div>
          </>
        ) : (
          <div className="pp-content-card"><div className="pp-card-head"><strong>管理员设置</strong></div><SkTable columns={[{ key: "name", title: "姓名" }, { key: "phone", title: "手机号" }, { key: "op", title: "操作" }]} rows={[]} /></div>
        )}
      </section>

      <SkDrawer
        open={open}
        title="添加访客预约"
        width={620}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim() || !phone.trim()) {
                  show("请输入姓名和手机号码");
                  return;
                }
                setOpen(false);
                show("添加成功");
              }}
            >
              确 认
            </SkButton>
          </>
        }
      >
        <div className="pp-drawer-form">
          <OfficeField label="项目" required><SkSelect value={project} options={["智慧园区", "宿舍楼01"]} onChange={setProject} placeholder="请选择项目" /></OfficeField>
          <OfficeField label="姓名" required><SkInput value={name} onChange={setName} placeholder="请输入" /></OfficeField>
          <OfficeField label="手机号码" required><SkInput value={phone} onChange={setPhone} placeholder="手机号码" /></OfficeField>
          <OfficeField label="拜访开始时间"><SkInput type="date" value={start} onChange={setStart} /></OfficeField>
          <OfficeField label="拜访结束时间"><SkInput type="date" value={end} onChange={setEnd} /></OfficeField>
          <OfficeField label="备注"><textarea className="sk-textarea" value={note} onChange={(event) => setNote(event.target.value)} /></OfficeField>
        </div>
      </SkDrawer>
      {node}
    </div>
  );
}

export function ItemReleasePage() {
  const [active, setActive] = useState("申请记录");
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [plate, setPlate] = useState("");
  const [note, setNote] = useState("");
  const { show, node } = useSkMessage();

  return (
    <div className="pp-page pp-workorder-page">
      <SubSidebar brand="物品放行" icon="org-menu-wupinfanghang" items={RECORD_ITEMS} active={active} onChange={setActive} />
      <section className="pp-main">
        {active === "申请记录" ? (
          <>
            <div className="pp-content-card is-plain">
              <SkTabs items={["未审批", "已审批"]} active={tab} onChange={setTab} />
              <div className="pp-search-row">
                <SkSelect placeholder="全部项目" />
                <div className="pp-filter-actions">
                  <SkButton variant="primary" onClick={() => setOpen(true)}>添加放行</SkButton>
                  <SkButton onClick={() => show("审批流设置")}>审批流设置</SkButton>
                </div>
              </div>
            </div>
            <div className="pp-list-card">
              <SkTable
                columns={[
                  { key: "person", title: "申请人姓名/手机号" },
                  { key: "time", title: "放行时间" },
                  { key: "apply", title: "申请时间" },
                  { key: "status", title: "状态" },
                  { key: "op", title: "操作" },
                ]}
                rows={[]}
              />
            </div>
          </>
        ) : (
          <div className="pp-content-card"><div className="pp-card-head"><strong>管理员设置</strong></div><SkTable columns={[{ key: "name", title: "姓名" }, { key: "phone", title: "手机号" }, { key: "op", title: "操作" }]} rows={[]} /></div>
        )}
      </section>

      <SkDrawer
        open={open}
        title="添加物品放行"
        width={620}
        onClose={() => setOpen(false)}
        footer={
          <>
            <SkButton onClick={() => setOpen(false)}>取 消</SkButton>
            <SkButton
              variant="primary"
              onClick={() => {
                if (!name.trim() || !phone.trim()) {
                  show("请输入姓名和手机号码");
                  return;
                }
                setOpen(false);
                show("添加成功");
              }}
            >
              保 存
            </SkButton>
          </>
        }
      >
        <div className="pp-drawer-form">
          <OfficeField label="姓名" required><SkInput value={name} onChange={setName} placeholder="请输入" /></OfficeField>
          <OfficeField label="手机号码" required><SkInput value={phone} onChange={setPhone} placeholder="请输入" /></OfficeField>
          <OfficeField label="选择房间"><SkInput value={room} onChange={setRoom} placeholder="请选择" /></OfficeField>
          <OfficeField label="选择日期"><SkInput type="date" value={date} onChange={setDate} /></OfficeField>
          <div className="pp-subsection-title">物品信息 #1</div>
          <OfficeField label="物品名称"><SkInput value={itemName} onChange={setItemName} placeholder="请输入" /></OfficeField>
          <OfficeField label="物品数量"><SkInput value={itemCount} onChange={setItemCount} placeholder="请输入" /></OfficeField>
          <div className="pp-subsection-title">车辆信息 #1</div>
          <OfficeField label="车牌号"><SkInput value={plate} onChange={setPlate} placeholder="请输入" /></OfficeField>
          <OfficeField label="备注"><textarea className="sk-textarea" value={note} onChange={(event) => setNote(event.target.value)} /></OfficeField>
        </div>
      </SkDrawer>
      {node}
    </div>
  );
}
