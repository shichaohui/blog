---
title: 微前端（wujie）使用手册
date: 2023-07-07 10:06
tags:
 - FrontEnd
categories:
 - FrontEnd
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

# wujie 使用手册

[wujie](https://wujie-micro.github.io/doc/guide/) 是一个基于 `Web Component` 容器 + `iframe` 沙箱的微前端方案。能够完善的解决适配成本、样式隔离、运行性能、页面白屏、子应用通信、子应用保活、多应用激活、vite 框架支持、应用共享等问题。

## 快速上手

### 主应用

主应用不限技术栈，只需引入 `wujie`、配置子应用路由并启动 `wujie` 即可。

`wujie` 针对 `React` 和 `Vue` 框架分别提供了 `wujie-react` `wujie-vue2` `wujie-vue3` 依赖。这里以 `Vue3` 为例。

#### 安装 `wujie`

```bash
yarn add wujie-vue3

pnpm add wujie-vue3

npm i wujie-vue3
```

#### 嵌入子应用

创建 Vue 页面（如 `src/views/SubApp.vue`）用于承载子应用。

```js
<template>
  <div>
    <WujieVue width="100%" height="100%" name="sub-app" url="http://localhost:8381/" sync />
  </div>
</template>
```

**`<micro-app>` 组件配置说明：**
* name: 子应用唯一标识符。
* url: 子应用的路径地址。
* sync: 是否开启路由同步。开启后 `wujie` 会将子应用的 name 作为一个 url 查询参数，实时同步子应用的路径作为这个查询参数的值，这样分享 URL 或者刷新浏览器子应用路由都不会丢失。
* [查看更多配置信息](https://wujie-micro.github.io/doc/api/startApp.html)

#### 配置子应用路由

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...,
    {
      name: 'sub-app',
      path: '/sub-app',
      component: () => import('../views/SubApp.vue')
    },
  ]
})

export default router
```

`path` 是子应用路由地址。

### 子应用

 `wujie` 对子应用的侵入非常小，在满足跨域条件下子应用可以不用改造。

## 子应用运行模式

在微前端框架中，子应用放置在主应用页面中随着主应用页面的打开和关闭反复的激活和销毁，而在 `wujie` 中子应用是否保活以及是否进行生命周期的改造会进入完全不同的处理流程。

![运行模式](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f18070295ef34d0a8fd04441d55edaff~tplv-k3u1fbpfcp-zoom-1.image)

* [保活模式](https://wujie-micro.github.io/doc/guide/mode.html#%E4%BF%9D%E6%B4%BB%E6%A8%A1%E5%BC%8F)
  子应用的 `alive` 设置为 true 时进入保活模式，内部的数据和路由的状态不会随着页面切换而丢失。
* [单例模式](https://wujie-micro.github.io/doc/guide/mode.html#%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F)
  子应用的 `alive` 设置为 false 且进行了生命周期改造时进入单例模式。
* [重建模式](https://wujie-micro.github.io/doc/guide/mode.html#%E9%87%8D%E5%BB%BA%E6%A8%A1%E5%BC%8F)
  子应用既没有设置为保活模式，也没有进行生命周期的改造则进入了重建模式。每次页面切换不仅会销毁承载子应用 `dom` 的 `Web Component`，还会销毁承载子应用 `JavaScript` 的 `iframe`，相应的 `wujie` 实例和子应用实例都会被销毁。

#### 生命周期改造

```js
let app;

function renderApp() {
  app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });
  app.$mount("#app");
}

function destroyApp() {
  app.$destroy();
}

if (window.__POWERED_BY_WUJIE__) {
  window.__WUJIE_MOUNT = renderApp;
  window.__WUJIE_UNMOUNT = destroyApp;
  // // Vite 需要主动调用 wujie 的渲染函数
  // window.__WUJIE.mount();
} else {
  renderApp();
}
```

如果子应用的实例化是在异步函数中进行的（如 `Vite`），在定义完生命周期函数后，需要主动调用 `wujie` 的渲染函数 `window.__WUJIE.mount()`。


## 应用间通信

`wujie` 提供三种通信方式。

### props 通信

主应用可以通过 `props` 注入数据和方法：

```js
<WujieVue name="xxx" url="xxx" :props="{ data: xxx, methods: xxx }"></WujieVue>
```

子应用可以通过 `$wujie` 对象来获取数据：

```js
const props = window.$wujie?.props;
```

### eventBus 通信

`wujie` 提供一套去中心化的通信方案，主应用和子应用、子应用和子应用都可以通过这种方式方便的进行通信， [详见 api](https://wujie-micro.github.io/doc/api/bus.html#bus)

获取 `bus` 实例：

```js
// 主应用
import WujieVue from "wujie-vue";
const { bus } = WujieVue;

// 子应用
window.$wujie?.bus
```

通信方法：

```js
// 监听事件
bus.$on("事件名字", (arg1, arg2, ...) => {});
// 发送事件
bus.$emit("事件名字", arg1, arg2, ...);
// 取消事件监听
bus.$off("事件名字", (arg1, arg2, ...) => {});
```

### window 通信

由于子应用运行的 `iframe` 的 `src` 和主应用是同域的，所以相互可以直接通信。

主应用调用子应用的全局数据：

```js
window.document.querySelector("iframe[name=子应用id]").contentWindow.xxx;
```

子应用调用主应用的全局数据:

```js
window.parent.xxx;
```

## 常见问题

### 子应用的相对地址图片没有替换成绝对地址

子应用通过 `v-html`、`innerHtml` 或者在 `template` 中动态添加 `style` 时，框架默认的 `plugin` 无法处理这种场景。可通过动态资源路径解决。

1. 在 `src` 目录新增 `public-path.js`：

```js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

2. 在应用入口 `index.js` 顶部导入 `public-path.js`。

```js
import "./public-path";
```

### 子应用 window 是一个代理对象，如何获取子应用的真实对象？

通过 `window.__WUJIE_RAW_WINDOW__` 获取真实的 `window` 对象。

### 浏览器回退及前进路由异常。

**问题描述：**

* 重建模式下回到子应用时及后续回退都是进入子应用首页，无法进入子路由，前进只能进入子应用首页。
* 单例模式下回退到子应用时都是进入子应用首页，前进只能进入子应用首页。
* 保活模式下回退正常，前进只能进入子应用首页。

**GitHub Issues：**

* [页面刷新后，浏览器回退按钮点击多次无反应](https://github.com/Tencent/wujie/issues/308)
* [开启路由同步时，切换子应用的tab（路由变化），刷新后，点击后退按钮，路由不变页面内容也不变](https://github.com/Tencent/wujie/issues/223)

**问题原因：**

`iframe` 拥有自己的路由栈，切换子应用导致 `iframe` 被销毁，重新进入子应用时创建新的 `iframe` ，路由栈丢失。

**解决方案：**

暂无
