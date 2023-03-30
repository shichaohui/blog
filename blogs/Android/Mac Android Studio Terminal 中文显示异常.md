---
title: Mac Android Studio Terminal 中文显示异常
date: 2017-10-26 15:51
tags:
 - Android
 - Android Studio
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

两个月前为了方便编写 `Kotlin` 代码，下载了 `Android Studio 3.0` 预览版，撸代码、Build、安装、一切正常。到了提交代码的时候懵逼了，`Terminal` 中输入中文居然变成了 `Unicode` 编码，就像这样：

![Terminal 中文异常](https://s1.ax1x.com/2023/03/24/ppBG2qS.png)

然后拿 `Mac` 的 `Terminal` 试了一下，发现显示中文没有问题的，因此认为是 `Android Studio` 的问题，但是百度 Google 翻了几遍也没找到答案，后来也就不了了之，期待着 `Android Studio` 更新时可以解决该问题。

之后每次提交代码都是在编辑器中写好再黏贴进来，次数多了也是痛苦到原地爆炸。

今天偶然看到一个问答：[mac终端中vim中文乱码问题](https://q.cnblogs.com/q/78486/)，采用的最佳答案如下：

![最佳答案](https://s1.ax1x.com/2023/03/24/ppBGXa4.png)

本着要做就做最好的原则，肯定是修改 `~/.vimrc` 文件，遗憾的是，找遍了整个 `~/` 目录只有一个 `.viminfo` 文件，虽然文件名不一样，但是也不想放弃啊，打开文件看看，有这么两句：

![encoding](https://s1.ax1x.com/2023/03/24/ppBGxi9.png)

嗯？（黑人问号脸）`encoding` 是 `Latin1`？改成 `utf-8` ，`Terminal` 输入中文，/(ㄒoㄒ)/~~ 还是不正常，改回 `Latin1` 吧，省的出什么乱七八糟的问题。再次打开 `.viminfo`，`encoding` 不知道什么时候已经自动变回 `Latin1` 了（哭笑不得）。

继续观察 `~/` 目录，发现几个 `.zshxx` 文件，想到我电脑上安装了 `zsh` 代替了 `bash`，会不会与此有关呢？

![.zshxx](https://s1.ax1x.com/2023/03/24/ppBGzGR.png)

怀着试试看的态度，打开 `.zshrc` 和 `.zshrc-e` 两个文件（因为它们的名字和 `.vimrc` 最像），观察文件内容，发现两个文件都有配置 `encoding` 的代码，但是被注释掉了。

![被注释的 encoding](https://s1.ax1x.com/2023/03/24/ppBJCM6.png)

`# You may need to manually set your language environment`，嗯，我确实需要修改语言环境，怀着试试看的态度，打开第二行的注释（就是删掉 # 号，你不会不知道吧），重启 `Android Studio` `Terminal` ，输入中文，一切都回归正常了。O(∩_∩)O哈哈~

![Terminal 中文正常](https://s1.ax1x.com/2023/03/24/ppBJkZD.png)

`Mac` 显示隐藏文件的步骤：

1. `Terminal` 中执行命令：`defaults write com.apple.finder AppleShowAllFiles -bool true`
2. 长按 `option` 键的同时鼠标长点击 `Finder` 图标直到出现一个菜单，点击菜单中的“重新开启”即可。

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |


| 文件 | 函数 | 漏洞 | 解决 |
| :--- | :--- | :--- | :--- |
| 文件 | 函数 | 漏洞 | 解决 |