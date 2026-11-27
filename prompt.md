#

## setup

### clone pj to local
- 官网原版
Set up https://github.com/JCodesMore/ai-website-cloner-template
as a standalone project in a new folder on my computer.
Ask me where to put it. Clone the repository, remove its origin remote,
install dependencies, and run npm run check. Leave it ready for me to clone a website.

- 修改版
Set up https://github.com/JCodesMore/ai-website-cloner-template
as a standalone project in the folder "/Users/wenjun.wu/Documents/A/ZhydRef/" on my computer. Clone the repository, remove its origin remote,
install dependencies, and run npm run check. Leave it ready for me to clone a website.

### push local to my repo
- 现在请把当前本地项目关联到我的 GitHub 仓库：https://github.com/Ethan-WenjunWu/ZhydRef。如果远程为空，请把当前代码推送到 main 分支；如果远程已有内容，请先告诉我，不要强推。推送前请确认本地没有敏感文件（如 .env）被意外提交。

### try
- /clone-website https://asset.kuaijingai.com/orgs/#/user/login?redirect=/index
```md
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
```