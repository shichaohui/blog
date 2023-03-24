---
title: Python 查询 GitLab commit 次数
date: 2021-02-03 22:07
tags:
 - Python
 - Git
categories:
 - Python
---

年底了，看看自己这一年总共提交了多少次代码吧。

## 安装 python-gitlab

```bash
# Python2
pip install python-gitlab

# Python3
pip3 install python-gitlab
```

## 下载脚本

我已经写好了脚本，[点击这里获取脚本和配置文件](https://github.com/shichaohui/PythonUtils/tree/main/gitlab/commit)

![脚本和配置文件](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b0d91a41264462fa2e883cd6a6e889f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

* `config.py` 配置文件，需要获取自己的配置信息并填写到该文件中。
* `queryer.py` 查询脚本，修改配置后运行该 脚本即可启动查询。

## 获取 GitLab 地址和 Access Token

### GitLab 地址

`GitLab` 地址即安装 `GitLab` 的服务器地址，如：`https://gitlab.***.com`

![GitLab 地址](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3f5fd09f40d4b7d92894387fd9964ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### Access Token

登录 `GitLab` 账号， 访问 `https://gitlab.***.com/profile/personal_access_tokens` 页面。

在该页面填写 **Name** 并勾选 **api** ，最后点击 **Create personal access token** 按钮即可生成 `Token`。

![Access Token](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7299ac23b04d4382b608d30dfaddd97c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

保存生成的 `Token`，否则刷新页面之后就再也看不到它了。

## 查询自己参与的项目

登录 GitLab 账号，访问 `https://gitlab.***.com/users/[userName]/contributed` 页面即可查看自己参与的项目列表。

> [userName] 需要改完自己的用户名

![参与的项目](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61681989274f4a8ca8b5763882e73f8b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 运行

```bash
# Python2
python your_path/queryer.py

# Python3
python3 your_path/queryer.py
```
