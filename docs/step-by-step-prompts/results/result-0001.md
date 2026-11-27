已完成 `https://asset.kuaijingai.com/orgs/#/user/login?redirect=/index` 的克隆。

## 本地路由

| 源地址 | 本地地址 |
|---|---|
| `/orgs/#/user/login?redirect=/index` | `/orgs`（镜像源路径，hash 可直接带上），`/`（别名） |

启动预览：

```bash
npm run dev
```

打开 http://localhost:3000/orgs/#/user/login?redirect=/index 或 http://localhost:3000/

## 复刻内容

- **真实资产**：logo、左侧 1080×1120 营销图、3840×2160 背景图、favicon 全部从源站下载到 [public/sites/kuaijing/images/](public/sites/kuaijing/images/)；图标使用源站 Ant Design 图标的原始 path（含企业微信 iconfont 符号）。
- **精确布局**：1200px 容器、476×632 卡片、48/43/32 内边距、20px 圆角、650px 最小高度、1199px 断点隐藏左图等，均按源站计算样式还原；1280、1920、390 三档实测坐标与源站一致。
- **交互状态**：
  - 验证码/密码登录切换（切换时自动聚焦手机号，和源站一致）
  - 手机号按源站规则 `/^1[3-9]\d{9}$/` 校验；获取验证码按钮启用态、登录按钮启用态颜色完全匹配
  - 获取验证码点击后按源站文案倒计时：`{num} 秒后可重新获取验证码`
  - 密码眼睛显示/隐藏、密码图标切换
  - 语言下拉菜单（仅简体中文，选中态 `#2681f3`）
  - 微信登录态：220×220 二维码 + “请使用微信扫一扫”，底部切换为“手机号登录”
  - 企业微信登录弹窗（580px，扫码框、关闭按钮、遮罩、Esc 关闭）
  - 服务协议 / 隐私政策 / 备案号保留源站真实跳转

核心文件：[LoginPage.tsx](src/components/sites/kuaijing/LoginPage.tsx)、[kuaijing-login.css](src/components/sites/kuaijing/kuaijing-login.css)、[icons.tsx](src/components/sites/kuaijing/icons.tsx)，研究记录见 [docs/research/kuaijing/README.md](docs/research/kuaijing/README.md)。

## 校验

`npm run check` 通过（lint + typecheck + build，`/` 和 `/orgs` 均静态预渲染）。生产模式无 dev 指示器，控制台无 error/warn。

对照截图（源站 vs 本地）：
- [源站 1280](docs/design-references/kuaijing-login-desktop.png) / [本地 1280](docs/design-references/kuaijing-local-prod-1280.png)
- [源站 1920](docs/design-references/kuaijing-login-1920.png) / [本地 1920](docs/design-references/kuaijing-local-prod-1920.png)
- [源站移动端](docs/design-references/kuaijing-login-mobile.png) / [本地移动端](docs/design-references/kuaijing-local-prod-mobile.png)
- [本地弹窗](docs/design-references/kuaijing-local-prod-wecom-modal.png)

## 已知差异（已在研究文档中记录）

1. **无后端认证**：登录按钮启用/禁用逻辑正确，但点击不会调用源站 API。
2. **微信二维码为静态截图**：源站每次点击动态申请 ticket（旧 ticket 会 404），本地保存了一张当时抓取的二维码图。
3. **企业微信弹窗为第三方 iframe 截图**：没有嵌入 `login.work.weixin.qq.com` 的实时 SSO，避免在克隆站内触发真实登录。
4. **获取验证码为本地倒计时模拟**，不会发送短信。
5. 服务协议/隐私政策/ICP 指向源站真实页面（超出本次范围）。

改动尚未提交/推送；`prompt.md` 的修改来自你本人，`AGENTS.md` 的变化由 `next dev` 自动重写。需要的话我可以再帮你提交并推到 `main`。





---------------------------------------------------------------------------------
已把两个协议页克隆为本地页面，并把登录页链接改为指向本地路由。

## 新增路由

| 源地址 | 本地地址 | 文件 |
|---|---|---|
| `/public/system/agreement/use` | `/public/system/agreement/use` | [page.tsx](src/app/public/system/agreement/use/page.tsx) |
| `/public/system/agreement/privacy` | `/public/system/agreement/privacy` | [page.tsx](src/app/public/system/agreement/privacy/page.tsx) |

两个页面共用一个组件 [AgreementPage.tsx](src/components/sites/kuaijing/AgreementPage.tsx) 和一套样式 [kuaijing-agreement.css](src/components/sites/kuaijing/kuaijing-agreement.css)；正文从源站 HTML 原样抽取到 [agreement-content.ts](src/components/sites/kuaijing/agreement-content.ts)（用户协议 429 字、隐私政策 7590 字，包含全部 `<br />` 断行）。

## 复刻细节

- 50px 渐变头部 `linear-gradient(270deg,#1269db,#0045c6)`、960px 居中容器、124×28 logo、白色 20px 标题；≤960px 时 logo 100×20、标题 16px、正文 `margin: 20px 10px`。
- 源站未声明字体，实际使用浏览器默认字体（Times + 中文衬线回退）；本地用 `font-family: initial` 还原，而不是 App 的 Geist。
- 补上了源站的 viewport meta（`maximum-scale=1, user-scalable=no, viewport-fit=cover`），否则移动端溢出内容会被自动缩放，导致 400px 布局差异。
- 登录页的 **服务协议 / 隐私政策** 现在在新标签页打开本地克隆页（与源站的 `window.open` 行为一致）。

## 校验

`npm run check` 通过，构建输出 5 条静态路由（`/`、`/orgs`、两个协议页、not-found）。

实测与源站完全一致：
- 用户协议：正文高度 294px @2560，移动端布局/断行一致。
- 隐私政策：正文 4011px、scrollH 4101 @2560；移动端 scrollH 6621、正文 6531；`innerText` 长度 6646，与源站逐项相同。
- 对照截图：[用户协议桌面（源站）](docs/design-references/kuaijing-agreement-use-desktop.png) / [本地](docs/design-references/kuaijing-local-agreement-use-2560.png)；[用户协议移动端（源站）](docs/design-references/kuaijing-agreement-use-mobile.png) / [本地](docs/design-references/kuaijing-local-agreement-use-mobile.png)；[隐私政策桌面（源站）](docs/design-references/kuaijing-agreement-privacy-desktop.png) / [本地](docs/design-references/kuaijing-local-agreement-privacy-2560.png)；[隐私政策移动端（源站）](docs/design-references/kuaijing-agreement-privacy-mobile.png) / [本地](docs/design-references/kuaijing-local-agreement-privacy-mobile.png)。

## 关于备案号

备案号跳转的是 `https://beian.miit.gov.cn/`——工信部备案系统的独立政府站点，不是本产品的页面，且在本次环境中多次返回 **521（不可访问）**。因此保留其真实外链，没有仿制政府站点。登录后的 `/index` 需要认证才能访问，微信/企业微信登录属于第三方域名，同样不在可克隆范围内。

改动尚未提交（v1 已由你提交为 `85d6cfb`，本次协议页改动在其之上）。需要的话我可以再提交并推送。





---------------------------------------------------------------------------------
已补全。你看到的“拖动滑块完成验证”是源站自带的 `go-captcha` 滑块组件，之前确实没有克隆，现在已按源站原样实现。

## 新增内容

- 弹层结构：覆盖登录卡片的 476×632 半透明遮罩（`rgba(0,0,0,.5)`、20px 圆角），居中 376×330 白色面板
- 头部：`拖动滑块完成验证` + 源站原样的“关闭（⊗）/刷新（↻）”图标
- 验证图：源站实际下发的 350×200 挑战图 + 64×64 拼图块，滑块为 350×40 轨道 + 82×40 蓝色拖拽块（`#3e7cff`）
- 拖拽逻辑完全按源站 bundle 的公式：`拼图 left = 拖拽块 left × (350-64)/(350-82)`；本次抓取的缺口位置为拼图 `left=209`，误差 ±5px 内判定通过
- 触发时机与源站一致：
  - **密码登录**点击“登录” → 弹出滑块
  - **验证码模式**点击“获取验证码” → 也先弹滑块，通过后才开始倒计时
- 交互：通过后弹层关闭；失败自动复位；关闭图标隐藏弹层；刷新图标显示源站同款加载动画后重置
- 顺带修正了倒计时文案：源站实际显示 `获取验证码 (60s)`，不是之前实现的长文案

源码：[CaptchaOverlay.tsx](src/components/sites/kuaijing/CaptchaOverlay.tsx)、[LoginPage.tsx](src/components/sites/kuaijing/LoginPage.tsx)、[kuaijing-login.css](src/components/sites/kuaijing/kuaijing-login.css)，图片资产在 [public/sites/kuaijing/images/](public/sites/kuaijing/images/)（`captcha-bg.jpg`、`captcha-tile.png`）。

## 校验

- 弹层内每一个元素的坐标与源站完全一致（overlay、376×330 面板、350×200 图、64×64 拼图、350×40 轨道、82×40 拖拽块）
- 源站与本地弹层裁剪图并排比对：[源站](docs/design-references/kuaijing-captcha-source.png) / [本地](docs/design-references/kuaijing-local-captcha-modal.png)，像素一致
- 已实测：错误拖动复位、正确拖动关闭、关闭按钮、刷新、获取验证码通过后倒计时
- `npm run check` 通过（lint + typecheck + build）

## 已知差异

- 使用一张抓取到的挑战图；源站每次尝试随机生成并由服务端校验，本地是本地判定，**刷新会复用这张图**
- 滑块通过后只是关闭弹层，仍不会真正登录（克隆没有后端）

真实的源站页面（你当前打开的那个窗口）我没有改动。现在可以继续完成真实登录；登录成功后告诉我，我再在同一个已登录会话里继续勘察登录后的页面。改动仍未提交。