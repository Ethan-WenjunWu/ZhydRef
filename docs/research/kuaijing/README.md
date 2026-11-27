# 快鲸资产管理运营系统 — login, agreement, workbench, and settings clone

Source: `https://asset.kuaijingai.com/orgs/#/user/login?redirect=/index`
plus the documents it links to and the post-login `#/index` workbench.

Inspected 2026-11-27 in Chrome at 1280×760, 1440×900, 1920×1080, 2560×1177,
and 390×844 (DPR 3, mobile emulation).

## Route map

| Source URL | Local route | Owner files |
| --- | --- | --- |
| `/orgs/#/user/login?redirect=/index` | `/orgs` (canonical mirror), `/` (alias) | `src/app/orgs/page.tsx`, `src/app/page.tsx`, `src/components/sites/kuaijing/LoginPage.tsx` |
| `/orgs/#/index` | `/orgs/index` | `src/app/orgs/index/page.tsx`, `src/components/sites/kuaijing/app/AppShell.tsx`, `WorkbenchPage.tsx` |
| `/orgs/#/index` → 系统设置 left menu | `/orgs/settings/<slug>` (20 routes) | `src/app/orgs/settings/[slug]/page.tsx`, `app/SettingsShell.tsx`, `SettingsPages.tsx`, `SettingsUI.tsx` |
| `/orgs/#/index` → 行政办公 left menu | `/orgs/office/<slug>` (16 routes) | `src/app/orgs/office/[slug]/page.tsx`, `app/OfficeShell.tsx`, `office/OfficePages.tsx`, `office/*.tsx` |
| `/public/system/agreement/use` | `/public/system/agreement/use` | `src/app/public/system/agreement/use/page.tsx` |
| `/public/system/agreement/privacy` | `/public/system/agreement/privacy` | `src/app/public/system/agreement/privacy/page.tsx` |

The login source is a Vue 3 + Ant Design Vue SPA; the hash segment is a
client-side route state. The two agreement pages are plain server-rendered HTML
with no scripts or stylesheets beyond an inline `<style>`; they share one
component (`AgreementPage.tsx`) and verbatim body copy extracted from the
source (`agreement-content.ts`).

## What the source is

- Full-viewport light-blue page (`#eff3ff`, `bg.png` cover) with a 70px header:
  150×33 logo left, "简体中文" language button right (globe 14px, caret 10px).
- Centered 1200px flex container (`calc(100vh - 125px)`, `min-height: 650px`,
  padding `0 40px`). Left: 540×560 marketing image vertically centered inside a
  650px hotspot; hidden at ≤1199px. Right: 476×632 white card, radius 20,
  shadow `0 5px 15px rgba(0,0,0,.05)`, padding `48px 43px 32px`.
- Card title 24px/32px, weight 500, `#0c0d0e`, letter-spacing `.003em`.
- Tabs 16px, active `#1664ff` weight 500 with an 80%-wide 2px underline.
- Inputs: 40px tall, 13px text, radius 2, border `#d9d9d9`; hover `#4281ff`;
  focus `#0055ff` + `0 0 0 2px rgba(22,100,255,.3)`. `+86` addon 47px wide,
  `#fafafa`, left radius only.
- Primary button `#1664ff` / border `#0055ff`; disabled `#a0c0ff`, white text.
  "获取验证码" disabled `#f5f5f5`, enabled `#f6f8fa` / `#dde2e9` / `#41464f`.
- Divider text `#80838a`; two `#eaedf1` rules. Collapsed method button is a
  32px circle; the current method expands to a pill (`#f3f7ff`, border
  `#97bcff`, text `#1664ff`). Hovering or clicking a method makes it current.
- Page footer 12px `#41464f`, ICP `皖ICP备19022900号-9`.
- Fonts: the system UI stack (`-apple-system, system-ui, "Segoe UI", …,
  "Noto Sans", sans-serif`) — no webfonts on the page.

## States reproduced

1. 验证码登录 (default): phone + code, code button disabled until
   `/^1[3-9]\d{9}$/`; login disabled until phone + 6-digit code.
2. 密码登录: phone (with mobile prefix icon), password (lock prefix,
   eye/eye-invisible toggle); login enabled with phone + any password.
3. WeChat login: QR card (220×220) + "请使用微信扫一扫"; tabs disappear;
   footer offers 手机号登录 / 企业微信登录, and switching methods resets the
   form (matches the source component remount).
4. 企业微信登录 modal: 580px Ant modal, "企业微信登录" title, 580×440 QR frame,
   close by X / mask click / Escape.
5. Language dropdown: 106px menu, single selected "简体中文" (`#2681f3` on
   `#f0f9ff`), closes on outside click / Escape / item click.
6. 服务协议 and 隐私政策 open the cloned local documents in a new tab, as the
   source does; the ICP mark keeps its real external MIIT destination.
7. Slider captcha (`go-captcha`): opens on password-login submit and on
   "获取验证码"; dragging the block moves the tile with the source's ratio
   `(350-64)/(350-82)`; the captured challenge's gap is at tile x = 209, so a
   correct drag snaps the overlay closed. 关闭 / 刷新 / 失败重置 are wired.

## Agreement pages

- 50px header, `linear-gradient(270deg, #1269db, #0045c6)`, `line-height: 50px`.
- Centered 960px inner container; logo 124×28 at `left: 0; top: 11px`; white
  20px title. Rendered in the browser default font (Times + platform serif for
  Chinese) because the source declares no fonts.
- Body 960px wide, `margin: 20px auto`, 14px/1.5. At ≤960px: container 100%,
  logo 100×20 at `left: 10px; top: 15px`, title 16px, body `width: 100%;
  margin: 20px 10px` (the source overflows to 400px at a 390px viewport).
- Verified identical geometry: use page body 294px tall at 2560; privacy body
  4011px (scrollH 4101 desktop / 6621 mobile), matching the source exactly.

## Workbench (`#/index`)

- App shell: 56px header (`linear-gradient(270deg, #1269db, #0045c6)`), 210px
  logo block, 105px top-menu items (13 modules; overflow becomes 更多 at 1440),
  180px `#1f283e` sider (68px when collapsed), 40px `#e8edf3` tab strip, and a
  fixed 380×380 repeated watermark image.
- Workbench: `#f0f2f5` background; warning alert (`#fffbe6`, `#ffe58f`, red tag);
  left flex column with 4-column 120px cards (`linear-gradient(90deg,
  rgba(38,129,243,.1), #fff)`) and 4-column 66px quick-function items; right
  column fixed at 38% with a 485px schedule/calendar card and a flexible
  announcement card.
- Calendar: antd-mini styling (36px header, 24px year/month selects, 4px panel
  padding + `#f0f0f0` top rule, 48px cells, 24×24 date boxes, today `#2681f3`).
- Notification drawer: 70% width, 47px header, 336px notice list with
  全部/未处理/已完成 tabs, 69px message rows, right detail pane empty state, and
  the watermark repeated over the drawer.
- Shell interactions implemented: sidebar collapse/expand, group expand/collapse,
  top-menu overflow menu, tab-bar 更多 dropdown (refresh/maximize/fullscreen/new
  window/close actions), notification drawer with tab filtering, calendar
  month/year switching, and tab reload.
- The captured account data is used on this page: company name, building "2",
  user "王", the notification list, and the watermark tile (which includes the
  account name/company/session time).

## 系统设置 (A13) — all 20 pages

The settings shell selects 系统设置, uses the settings sidebar (including the
nested 组织架构 → 通讯录管理 group), and accumulates a tab per visited page
(client-side store; the tab strip scrolls and 更多 keeps refresh/fullscreen/
new-window/close actions). As in the source, the settings tab strip contains only
settings pages; the workbench is reached from 数据中心.

| # | Page | Local route | Layout |
| --- | --- | --- | --- |
| 01 | 企业信息 | `/orgs/settings/company-info` | 240px inner menu (基本/门户/安全/通知) + form, upload tiles |
| 02 | 公司列表 | `/orgs/settings/company-list` | search card + toolbar + wide table + pagination |
| 03 | 收支账户 | `/orgs/settings/accounts` | single card: inline search, import/export/add, table |
| 04 | 支付配置 | `/orgs/settings/payment-config` | toolbar + empty table |
| 05 | 成员/部门 | `/orgs/settings/members` | 成员/部门/岗位 tabs, department tree + member table |
| 06 | 角色管理 | `/orgs/settings/roles` | role list + member table split |
| 07 | 菜单管理 | `/orgs/settings/menus` | info alert + default-menu tree + custom-menu editor |
| 08 | 查看权限 | `/orgs/settings/contact-auth` | three rule sections with empty tables |
| 09 | 资料显示 | `/orgs/settings/contact-display` | two policy rows with 修改/查看 |
| 10 | 基础设置 | `/orgs/settings/ai-basic` | centered 40vw vertical form, checkbox groups |
| 11 | 模型参数 | `/orgs/settings/ai-model` | 基础配置/知识库 inner menu + model form |
| 12 | 问题库 | `/orgs/settings/ai-questions` | tabs + search + populated question table |
| 13 | 智能体 | `/orgs/settings/ai-agents` | tabs + search + empty agent table |
| 14 | 微信服务号 | `/orgs/settings/wechat-service` | brand inner menu + bind table |
| 15 | 微信小程序 | `/orgs/settings/wechat-mini` | brand inner menu + bind table |
| 16 | 企业微信 | `/orgs/settings/wecom` | 企业授权 card + authorize button |
| 17 | 钉钉 | `/orgs/settings/dingtalk` | bind table |
| 18 | 飞书 | `/orgs/settings/feishu` | app list table |
| 19 | APP | `/orgs/settings/app` | app list table |
| 20 | 操作日志 | `/orgs/settings/operation-log` | inline filters + log table |

This is a demonstration clone: every page is populated with the source's captured
demo data (including the employee directory and operation-log rows). No privacy
sanitization is applied, and none should be applied to later pages either.

## 行政办公 (A11) — all 16 pages

The office shell selects 行政办公 and keeps its own nested sidebar
(通用审批 → 我的审批/审批管理; 汇报管理 → 汇报列表/汇报模板/汇报报表).
Tabs accumulate across settings and office pages, as in the source.

| # | Page | Local route | Layout |
| --- | --- | --- | --- |
| 01 | 数据总览 | `/orgs/office/overview` | 8 stat cards, 3 chart cards, 4 mini statistic cards |
| 02 | 发起审批 | `/orgs/office/approval-new` | 考勤 section + 请假/补卡 cards + centered request forms |
| 03 | 审批中心 | `/orgs/office/approval-center` | 400px tabbed list + empty detail pane |
| 04 | 审批分类 | `/orgs/office/approval-category` | category tree + approval rows + save/cancel footer |
| 05 | 数据管理 | `/orgs/office/approval-data` | six-column filters + 6-row approval table + detail drawer |
| 06 | 审批代办 | `/orgs/office/approval-proxy` | info alert + filters + proxy table |
| 07 | 汇报列表 | `/orgs/office/report-list` | 我收到的/我提交的 tabs + search + empty list |
| 08 | 汇报模板 | `/orgs/office/report-template` | 240px template groups + toolbar + template cards |
| 09 | 汇报报表 | `/orgs/office/report-statements` | search row + empty statistics table |
| 10 | 企业公告 | `/orgs/office/notice` | 240px category panel + announcement toolbar/search/list |
| 11 | 考勤管理 | `/orgs/office/attendance` | 210px menu panel + 3 attendance-group rows |
| 12 | 知识库 | `/orgs/office/wiki` | 240px category panel + knowledge-base card grid |
| 13 | 智能表格 | `/orgs/office/smart-table` | centered empty guide + 3-step flow + recycle bin |
| 14 | 公文管理 | `/orgs/office/document` | 210px menu + 收文发文/我的公文 cards + document tabs |
| 15 | 人才招聘 | `/orgs/office/recruit` | 210px menu + recruitment filter/table + new-plan drawer |
| 16 | 邮箱管理 | `/orgs/office/mail` | 288px mailbox menu + 378px list + detail pane |

Interactions wired across these pages: dashboard stat shortcuts, approval request
forms and submission gating, approval-center tabs/filter, category tree and
add-group/create-approval/sort dialogs, approval data search/export/detail,
proxy creation, report template groups/templates/sort, notice categories/new
announcement/admin settings, attendance group create/edit/delete and inner menu,
knowledge-base categories and creation drawer, smart-table category dialog and
recycle bin, document receive/draft registration, recruitment plans, and the
three-pane mail UI with compose/send/folders/settings.

Office visuals use the source's HR/approval PNG icons, wiki/mail illustrations,
and the additional `workHr` / `workApproval` / `workReport` / `workNotice` /
`workMail` iconfont symbols appended to the shared sprite.

## Asset map

| Source | Local | Notes |
| --- | --- | --- |
| `.../system_config_img/20250828/68b00397d795d75534.png` | `public/sites/kuaijing/images/logo.png` | 273×60, rendered 150×33 |
| `.../system_config_img/20250828/68b003cf01f9118871.png` | `public/sites/kuaijing/images/banner.png` | 1080×1120, rendered 540×560 |
| `/public_web/static/images/common/bg.png` | `public/sites/kuaijing/images/bg.png` | 3840×2160, cover |
| `.../system_config_img/20250116/67885d7ce591216862.png` | `public/sites/kuaijing/images/favicon.png` | 198×200 favicon |
| `mp.weixin.qq.com/cgi-bin/showqrcode?ticket=…` | `public/sites/kuaijing/images/wechat-qr.jpg` | captured ticket image |
| `login.work.weixin.qq.com/wwlogin/sso/login?…` iframe | `public/sites/kuaijing/images/wecom-login-frame.png` | captured 580×440 frame |
| `/common/captcha/generate` → `data.image` | `public/sites/kuaijing/images/captcha-bg.jpg` | captured 350×200 challenge |
| `/common/captcha/generate` → `data.thumb` | `public/sites/kuaijing/images/captcha-tile.png` | captured 64×64 puzzle tile |
| header logo data URL | `public/sites/kuaijing/images/org-logo.png` | 52×48, rendered 36×36 white tile |
| `/public_h5/static/images/user/avatar.png` | `public/sites/kuaijing/images/user-avatar.png` | 18×18 header avatar |
| `#bailing_watermark` background | `public/sites/kuaijing/images/watermark.png` | 380×380 captured watermark tile |
| iconfont sprite subset | `public/sites/kuaijing/iconfont-sprite.svg` | 70 symbols used across the shell, workbench, and settings |
| `/public_web/static/images/workbench/*` | `public/sites/kuaijing/workbench/cards/` | 8 card thumbnails |
| `/public_web/static/images/orgApp/*` | `public/sites/kuaijing/workbench/apps/` | 8 quick-function images |
| `/public_web/static/images/message/*` | `public/sites/kuaijing/workbench/messages/` | 3 notification avatars |
| `/public_web/static/images/hr/icon*.png` | `public/sites/kuaijing/office/hr/` | 6 dashboard statistic icons |
| `/public_web/static/images/approval/*.png`, `/property/approval/*.png` | `public/sites/kuaijing/office/approval/` | approval category/request icons |
| `/public_web/static/images/wiki/icon0.png` | `public/sites/kuaijing/office/wiki/icon0.png` | knowledge-base card icon |
| `/public_web/static/images/work_wiki/smart_empty_guide.png` | `public/sites/kuaijing/office/smart-empty-guide.png` | smart-table empty state |
| `/public_web/static/images/workMail/mail_empty.png`, `mail.png` | `public/sites/kuaijing/office/mail-empty.png`, `mail.png` | mailbox empty/welcome illustrations |

The captcha chrome (overlay 476×632 at 50% black, modal 376×330, header 36px,
body 350×200, footer 50px, 82×40 blue drag block, icons) is reproduced from the
source's computed styles and `go-captcha` CSS variables.

Icon paths were extracted from the rendered Ant Design icons (global, down,
mobile, lock, eye, eye-invisible, wechat, close) and the page iconfont symbol
`org-xingzhuang` for WeCom (`docs/research/kuaijing/source/wecom-symbol.svg`).

## Known gaps

- No authentication backend: the 登录 button enables/disables correctly but
  submit does not contact the source API.
- 获取验证码 is gated by the slider captcha and then runs the source's
  60-second countdown in its real button format, `获取验证码 (Ns)`; no SMS is
  sent.
- The captcha uses one captured challenge and validates the drag locally
  against its gap (x = 209). The source fetches a random challenge per attempt
  and verifies it server-side, so 刷新 reuses the captured image here.
- The WeChat QR is a captured ticket; the source requests a fresh ticket per
  click and old tickets return 404.
- The WeCom modal shows a captured screenshot of the third-party
  `login.work.weixin.qq.com` iframe rather than embedding the live SSO widget.
- The ICP mark links to the official MIIT registry
  (`https://beian.miit.gov.cn/`), a separate government origin rather than a
  page of this product; it stays an external link.
- Workbench navigation is visual only for now: top-module switches, sidebar
  leaf links, card/quick-function links, 自定义, 新建日程, 日程管理/企业公告
  更多, calendar date selection, the user menu, and the building selector do not
  navigate or open their source dialogs. They will be wired as each page is
  cloned.
- Notification drawer rows select/highlight but do not open the message detail;
  the 全部/未处理/已完成 filters are implemented against the captured notices.
- The calendar is anchored to the captured month, November 2026 (27 highlighted);
  month/year switching works, but "today" and the captured watermark keep the
  2026-11-27 session time.
- The page uses the captured account's company name, building, user initial,
  notices, and watermark.
- 系统设置 pages have their demo interactions wired: search/reset filtering,
  status filters, pagination and page size, add/edit/delete dialogs and drawers,
  switches, copy/refresh invite code, upload previews, CSV export, inner tab
  switching (企业信息 门户/安全/通知, 模型参数 知识库, 成员/部门/岗位, 三方
  integration menus), member/department/position management, role creation and
  member transfer, menu drag-drop/quick-add/publish, permission rules, profile
  field display, question categories/questions, WeChat/DingTalk/Feishu/APP bind
  forms, and operation-log filters (user/IP/service/port/date range).
- All settings changes live in page-level React state. They are not sent to a
  backend and reset on a full reload; the clone has no API layer.
- The tab strip accumulates pages in a client store and also resets on a full
  reload. It scrolls horizontally rather than reproducing Ant Design's overflow
  更多 popup exactly.
- Inner 三方集成 tabs that require a bound account show the source's empty-state
  copy ("请至少绑定一个服务号", "请先绑定用户端小程序").
- 行政办公 pages use the source's captured demo data and page-level React state;
  approvals/announcements/wiki/attendance/document/recruitment/mail created in
  the UI are not persisted and reset on a full reload. Dashboard charts are
  static SVG/CSS reproductions of the captured values, not a live chart library.

## Evidence

Screenshots live in `docs/design-references/`:

- Source: `kuaijing-login-desktop.png`, `kuaijing-login-1920.png`,
  `kuaijing-login-mobile.png`, `kuaijing-login-password.png`,
  `kuaijing-login-filled-enabled.png`, `kuaijing-lang-dropdown.png`,
  `kuaijing-hover-wecom.png`, `kuaijing-wechat-click.png`,
  `kuaijing-wecom-click.png`, `kuaijing-agreement-use-desktop.png`,
  `kuaijing-agreement-use-mobile.png`, `kuaijing-agreement-privacy-desktop.png`,
  `kuaijing-agreement-privacy-mobile.png`, `kuaijing-captcha-source.png`,
  `kuaijing-workbench-source-1440.png`, `kuaijing-workbench-source-2560.png`,
  `kuaijing-workbench-source-drawer-1440.png`,
  `kuaijing-workbench-source-collapsed-1440.png`,
  `kuaijing-workbench-source-calendar.png`,
  `settings-source-01.png` … `settings-source-20.png`,
  `office-source-01.png` … `office-source-16.png`
- Local: `kuaijing-local-initial.png`, `kuaijing-local-password.png`,
  `kuaijing-local-filled.png`, `kuaijing-local-wechat.png`,
  `kuaijing-local-wecom-modal.png`, `kuaijing-local-lang.png`,
  `kuaijing-local-mobile.png`, `kuaijing-local-countdown.png`,
  `kuaijing-local-hover-wecom.png`, `kuaijing-local-agreement-use-2560.png`,
  `kuaijing-local-agreement-use-mobile.png`,
  `kuaijing-local-agreement-privacy-2560.png`,
  `kuaijing-local-agreement-privacy-mobile.png`, `kuaijing-local-captcha.png`,
  `kuaijing-local-captcha-modal.png`, `kuaijing-local-countdown.png`,
  `kuaijing-local-workbench-1440.png`, `kuaijing-local-workbench-2560.png`,
  `kuaijing-local-workbench-drawer-1440.png`,
  `kuaijing-local-workbench-collapsed-1440.png`,
  `settings-local-01.png` … `settings-local-20.png`,
  `office-local-01.png` … `office-local-16.png`
