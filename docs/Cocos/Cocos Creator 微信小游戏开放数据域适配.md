---
title: Cocos Creator 微信小游戏开放数据域适配
date: 2019-04-11 10:53
tags:
 - Cocos
 - Cocos Creator
 - 微信小游戏
 - 开放数据域
categories:
 - Cocos
 - Cocos Creator
 - 微信小游戏
---

首先祭出官方文档

[微信小游戏开放数据域](https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/open-data.html#%E5%BC%80%E6%94%BE%E6%95%B0%E6%8D%AE%E5%9F%9F)

[Creator 接入微信小游戏的开放数据域](https://docs.cocos.com/creator/manual/zh/publish/publish-wechatgame-sub-domain.html)

> **备注：**开放数据域简称为子域，常规游戏内容为主域

## 适配步骤

0. 主域中创建一个节点作为子域容器，为容器节点添加 `WXSubContextView` 组件用于设置子域视窗以及更新子域贴图。
0. 创建子域项目，根据自身需求制作 UI 的展示。

## 适配要点

* 子域场景的 `Canvas` 组件设计分辨率必须与主域中容器节点的宽高比相同以防拉伸。
* 若主域中容器节点使用 `Widget` 适配父节点，或者其他原因导致容器节点尺寸改变，必须在尺寸改变后更新子域视窗。
 
```javascript
// 立即对齐，不调用该函数的话，将会等到下一帧对齐
widget.updateAlignment();
// 重置子域视窗
wxSubContextView.reset();
```

* 子域应当尽量显示最少内容，比如排行榜页面仅在子域显示排行榜列表，标题之类的静态内容放在主域显示。
* 若子域为静态页面，不需要每帧更新贴图，可以禁用组件来阻止每帧更新，并在需要的时候调用 `update` 函数更新。

```javascript
wxSubContextView.enabled = false;
wxSubContextView.update();
```

## 解决切换页面时先显示旧数据后刷新数据的问题

由于子域每帧都在绘制，所以当切换子域页面时，可能会先把旧的数据刷新到主域，然后才加载到新的数据进行刷新。
解决这个问题，需要在切换页面前（或关闭页面时）隐藏子域显示的场景（加载一个空的场景）即可。