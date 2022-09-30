---
title: Cocos Creator 数据存储之 Array
date: 2019-01-22 16:32
tags:
 - Cocos
 - Cocos Creator
categories:
 - Cocos
 - Cocos Creator
---

[Cocos Creator 文档 -- 存储和读取用户数据](https://docs.cocos.com/creator/manual/zh/advanced-topics/data-storage.html)

## 存取方式

```javascript
// 存储数据
cc.sys.localStorage.setItem(key, value);
// 读取数据
var value = cc.sys.localStorage.getItem(key);
```

## Array 存取的坑

```javascript
var arr = [1, 2, 3];
// 保存
cc.sys.localStorage.setItem(key, arr);
// 读取
var value = cc.sys.localStorage.getItem(key);
```

问题来了。

H5 中读出来是一个字符串 `1,2,3`，但小游戏中读出来却是一个 `Array` 对象。

### 使用 JSON 解决兼容问题

```javascript
var arr = [1, 2, 3];
// 保存，JSON.stringify(arr) 将 arr 转成字符串 "[1,2,3]"
cc.sys.localStorage.setItem(key, JSON.stringify(arr));
// 读取，通过 JSON.parse(value) 将 value 转成 Array 对象。
var value = JSON.parse(cc.sys.localStorage.getItem(key));
```