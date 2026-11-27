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

---------------------------------------------------------------------------------
---------------------------------------------------------------------------------
## clone

### login 
- 01
/clone-website https://asset.kuaijingai.com/orgs/#/user/login?redirect=/index
> [result-0001.md](results/result-0001.md)

- 02
“服务协议 / 隐私政策 / 备案号保留源站真实跳转”不算超出范围，能访问的页面都需要clone下来
> [result-0001.md](results/result-0001.md)

- 03
我还没登录。登录之前先解决下面这个问题：
在页面点击“密码登录”后，输入了电话号码和密码，然后点击了“登录”按钮。现在页面弹出了一个“拖动滑块完成验证”的弹出层，这个动作在上述登录页面的clone操作中并没有克隆吧？如果没有请补全。
> [result-0001.md](results/result-0001.md)

---------------------------------------------------------------------------------
### home
- 01
我需要克隆的网站需要登录后才能访问，而且页面很多。请按以下方式配合我：
关于登录：不要直接执行 /clone-website。请先通过 Chrome MCP 打开一个浏览器窗口，让我手动输入用户名和密码完成登录。等我确认登录成功后，你再在这个已登录的浏览器会话里继续后续操作。
> [result-0002.md](results/result-0002.md)

- 02
已经登录成功。但是登录成功后，不要一次性克隆整个网站。我们一个页面一个页面地来。登录成功后点击不同的菜单才会显示不同的页面，浏览器的URL不会改变，所以找出首页所有通过点击可以改变页面显示的元素，给出一个列表。我会依次告诉你克隆列表中的哪一个。等我确认当前页面克隆完成、没有问题后，我再发下一个列表中要克隆的元素。请严格按这个节奏执行，不要自行去爬取或猜测其他页面的链接。
> [result-0002.md](results/result-0002.md)

- 03
A2–A13 可以点进去。点进去只会改变“B. 左侧菜单”。逐个点进去，完善上述“B. 左侧菜单”的表格。
> [result-0002.md](results/result-0002.md)

---------------------------------------------------------------------------------
- 01
克隆「A1 数据中心 > 工作台」。只处理这一页，完成后等我确认再继续。
> [result-0003.md](results/result-0003.md)



---------------------------------------------------------------------------------
### A13 系统设置
克隆「A13 系统设置」这个菜单下所有左侧菜单被点击后的页面。只处理这一个一级菜单，完成后等我确认再继续。
