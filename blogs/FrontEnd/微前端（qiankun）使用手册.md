---
title: 微前端（qiankun）使用手册
date: 2023-05-22 11:35
tags:
 - FrontEnd
categories:
 - FrontEnd
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

> [qiankun](https://qiankun.umijs.org/zh/guide) 是一个基于 [single-spa](https://zh-hans.single-spa.js.org/docs/getting-started-overview/) 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。
> 
> qiankun 孵化自蚂蚁金融科技基于微前端架构的云产品统一接入平台，在经过一批线上应用的充分检验及打磨后，我们将其微前端内核抽取出来并开源，希望能同时帮助社区有类似需求的系统更方便的构建自己的微前端系统，同时也希望通过社区的帮助将 qiankun 打磨的更加成熟完善。
>
> 目前 qiankun 已在蚂蚁内部服务了超过 2000+ 线上应用，在易用性及完备性上，绝对是值得信赖的。

## 快速上手

### 主应用

主应用不限技术栈，只需要提供一个容器 DOM，然后注册子应用并 start 即可。

#### 安装 qiankun

```bash
yarn add qiankun

pnpm add qiankun

npm i qiankun
```

#### 添加子应用容器

在需要渲染子应用的位置添加子应用容器。

```html
<div id="micro-app-container"></div>
```

#### 注册子应用并启动

进入子应用前必须先注册子应用并启动 qiankun。

* 注册子应用：[registerMicroApps()](https://qiankun.umijs.org/zh/api#registermicroappsapps-lifecycles)
* 启动 qiankun：[start()](https://qiankun.umijs.org/zh/api#startopts)

```js
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: "Vue2App",
    entry: "//localhost:8381/",
    container: "#micro-app-container",
    activeRule: "/vue2-app",
  },
  {
    name: "Vue3App",
    entry: "//localhost:8382/",
    container: "#micro-app-container",
    activeRule: "/vue3-app",
  },
]);

start();
```

**子应用配置解析：**

* name: 子应用的名称，子应用之间必须确保唯一。
* entry: 子应用的入口。
  * 支持配置是子应用的访问地址字符串。
  * 支持配置对象 `{ scripts?: string[]; styles?: string[]; html?: string }`，html 的值是子应用的 html 内容字符串，而不是子应用的访问地址。子应用的 `publicPath` 将会被设置为 `/`。
* container: 子应用容器节点的选择器或者 Element 实例。
* activeRule: 子应用的激活规则。
  * 支持直接配置字符串或字符串数组，如 `'/app1'` 或 `['/app1', '/app2']`，当配置为字符串时会直接跟 url 中的路径部分做前缀匹配，匹配成功表明当前应用会被激活。
  * 支持配置一个函数或函数数组。函数会传入当前 `location` 作为参数，函数返回 true 时表明当前子应用会被激活。如 `location => location.pathname.startsWith('/app1')`。

#### 子应用预加载

默认情况下，`qinakun` 会在第一个子应用 `mounted` 完成后开始预加载其他子应用的静态资源。

`qiankun` 的启动函数 `start()` 接收可选配置，使用 `prefetch` 属性可配置子应用预加载规则。

```js
start({
  prefetch: true
})
```

* prefetch: `boolean | 'all' | string[] | (( apps: RegistrableApp[] ) => { criticalAppNames: string[]; minorAppsName: string[] })`是否开启预加载，默认为 `true`。
  * 配置为 `true` 则会在第一个子应用 mount 完成后开始预加载其他子应用的静态资源。
  * 配置为 `string[]` 则会在第一个子应用 `mounted` 后开始加载数组内的子应用资源。
  * 配置为 `function` 则可完全自定义应用的资源加载时机 (首屏应用及次屏应用)。
  * 配置为 `'all'` 则主应用 `start` 后即开始预加载所有子应用静态资源。

### Vue2 + Webpack 子应用

#### 动态配置资源路径

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

#### 公开生命周期函数

```js
import "./public-path";

import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

let app: Vue | null;

function renderApp(container: string | HTMLElement) {
  app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container);
}

if (!window.__POWERED_BY_QIANKUN__) {
  renderApp("#app");
}

export async function bootstrap() {
  console.log("vue2 app bootstrap");
}

export async function mount(props: any) {
  renderApp(props.container.querySelector("#app"));
}

export async function unmount() {
  if (!app) {
    return;
  }
  app.$destroy();
  app.$el.innerHTML = "";
  app = null;
}
```

#### 设置路由前缀

```js
const router = new VueRouter({
  mode: "history",
  base: window.__POWERED_BY_QIANKUN__ ? "/vue2-app/" : process.env.BASE_URL,
  routes,
});
```

#### 修改打包配置（`vue.config.js`）

```js
const { defineConfig } = require("@vue/cli-service");
const { name } = require("./package.json");

module.exports = defineConfig({
  ...,
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
});
```

### Vue3 + Vite 子应用

`qiankun` 默认不支持 `Vite`，要加载 `Vite` 构建的子应用，需要借助 [vite-plugin-qiankun](https://www.npmjs.com/package/vite-plugin-qiankun) 插件。

#### 安装 `vite-plugin-qiankun`

```bash
yarn add vite-plugin-qiankun

pnpm add vite-plugin-qiankun

npm i vite-plugin-qiankun
```

#### 公开生命周期函数

```js
import { createApp, type App as VueApp } from "vue";
import {
  renderWithQiankun,
  qiankunWindow,
  type QiankunProps,
} from "vite-plugin-qiankun/dist/helper";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

let app: VueApp<Element>;

function renderApp(container: any) {
  app = createApp(App);
  app.use(router);
  app.mount(container);
}

if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  renderWithQiankun({ bootstrap, mount, unmount, update });
} else {
  renderApp("#app");
}

async function bootstrap() {
  console.log("vue3 app bootstrap");
}

async function mount(props: QiankunProps) {
  renderApp(props.container?.querySelector("#app"));
}

async function unmount() {
  app?.unmount();
}

async function update() {
  console.log("vue3 app update");
}
```

#### 设置路由前缀

```js
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
import { name } from "../../package.json";

const base = qiankunWindow.__POWERED_BY_QIANKUN__ ? name : import.meta.env.BASE_URL;

const router = createRouter({
  history: createWebHistory(base),
  routes: routes,
});
```

#### 修改打包配置（`vite.config.ts`）

```js
...
import qiankun from "vite-plugin-qiankun";

const port = 8382;
const base = `http://localhost:${port}/`;

export default defineConfig({
  base: base,
  server: {
    port: port,
    origin: base,
    cors: true,
  },
  plugins: [
    ...,
    qiankun("vue3-app", {
      useDevMode: true,
    }),
  ],
  ...,
});
```

### React 子应用

#### 动态配置资源路径

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

#### 公开生命周期函数

```js
import "./public-path";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

function renderRoot(container: HTMLElement) {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    container
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  renderRoot(document.querySelector("#root")!);
}

export async function bootstrap() {
  console.log("react app bootstrap");
}

export async function mount(props: any) {
  renderRoot(props.container?.querySelector("#root"));
}

export async function unmount(props: any) {
  ReactDOM.unmountComponentAtNode(props.container?.querySelector("#root"));
}
```

#### 设置路由前缀

```js
<BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/react-app' : '/'}>
```

#### 修改 webpack 配置

1. 安装插件 `@rescripts/cli`，当然也可以选择其他的插件，例如 `react-app-rewired`。

```bash
yarn add -D @rescripts/cli

pnpm add -D @rescripts/cli

npm i -D @rescripts/cli
```

2. 应用根目录新增 `.rescriptsrc.js`

```js
const { name } = require("./package");

module.exports = {
  webpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = "umd";
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.globalObject = "window";
    return config;
  },
  devServer: (_) => {
    const config = _;
    config.headers = {
      "Access-Control-Allow-Origin": "*",
    };
    config.historyApiFallback = true;
    config.hot = false;
    config.watchContentBase = false;
    config.liveReload = false;
    return config;
  },
};
```

3. 修改 `package.json`

```json
-   "start": "react-scripts start",
+   "start": "rescripts start",
-   "build": "react-scripts build",
+   "build": "rescripts build",
```

## 应用间通信

### props 传参

注册子应用时可以通过 props 传递参数给子应用。

```js
registerMicroApps([
  {
    name: "Vue2App",
    entry: "//localhost:8381/",
    container: "#micro-app-container",
    activeRule: "/vue2-app",
    props: {
      name: "StoneHui",
      age: 30
    }
  },
]);
```

子应用挂载时可通过 props 获取主应用传递的参数。

```js
export async function mount(props) {
  console.log(props.name, props.age); // StoneHui 30
}
```

### [initGlobalState(state)](https://qiankun.umijs.org/zh/api#initglobalstatestate)

定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法。

**相关类型定义：**

```js
/**
 * 定义全局状态，并返回通信方法
 * 
 * @param state: 全局状态
 * @retuns 通信方法实例
 */
function initGlobalState(state: Record<string, any>): MicroAppStateActions

/**
 * 通信方法
 */
type MicroAppStateActions {
  /**
   * 在当前应用监听全局状态，有变更触发 callback
   * @param callback 状态变更回调函数
   * @param fireImmediately，是否立即触发 callback 函数
   */
  onGlobalStateChange: (callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void
  /**
   * 按一级属性设置全局状态，微应用中只能修改已存在的一级属性
   * @param callback 变更的全局状态
   * @retuns 修改结果
   */
  setGlobalState: (state: Record<string, any>) => boolean
  /**
   * 移除当前应用的状态监听，微应用 umount 时会默认调用
   * @retuns 移除结果
   */
  offGlobalStateChange: () => boolean
}

/**
 * 全局状态变更的回调函数
 * @param state 变更后的全局状态
 * @param prevState 变更前的全局状态
 */
type OnGlobalStateChangeCallback = (state: Record<string, any>, prevState: Record<string, any>) => void;
```

**使用示例：**

1. 主应用

```js
import { initGlobalState, MicroAppStateActions } from 'qiankun';

const state = {
  ...
}
// 初始化全局状态并获取操作函数
const actions: MicroAppStateActions = initGlobalState(state);
// 监听全局状态变更
actions.onGlobalStateChange((state, prev) => {
  console.log(state, prev);
});
// 更新全局状态
actions.setGlobalState(state);
```

2. 子应用

```js
export function mount(props) {
  // 监听全局状态变更
  props.onGlobalStateChange((state, prev) => {
    console.log(state, prev);
  });
  // 更新全局状态
  props.setGlobalState(state);
}
```

## 常见问题

### TypeScript cannot find name `__webpack_public_path__`。

在 `src` 目录新增 `global.d.ts` 文件：

```js
declare let __webpack_public_path__: string;

interface Window {
  __POWERED_BY_QIANKUN__: boolean;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
}
```

### `__webpack_public_path__` 无效，静态资源路径错误。

将 `public-path.js` 的导入语句放在应用入口文件的第一行。

### configuration.output has an unknown property 'jsonpFunction'.

将 `output.jsonpFunction` 更名为 `output.chunkLoadingGlobal​​​​​​​`。

```js
// jsonpFunction: `webpackJsonp_${name}`,
chunkLoadingGlobal: `webpackJsonp_${name}`,
```

### 子应用内部路由跳转后无法切换到主应用或其他子应用且路由栈异常。

* `Vue` 通过路由守卫更新 `state`

```js
router.afterEach(() => {
  // Vue2
  Object.assign(history.state, { current: location.pathname });
  // Vue3
  Object.assign(history.state, {
    current: history.state.current === "/" ? "/" : location.pathname,
  });
});
```

* `React` 通过 `popstate` 监听器更新 `state`

```js
window.addEventListener("popstate", () => {
  Object.assign(history.state, { current: location.pathname });
});
```
