---
title: 微前端（micro-app）使用手册
date: 2023-06-25 17:46
tags:
 - FrontEnd
categories:
 - FrontEnd
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

# micro-app 使用手册

[micro-app](https://zeroing.jd.com/docs.html#/) 是借鉴了 `Web Component` 的思想，通过 `Custom Element` 结合自定义的 `Shadow Dom`，将微前端封装成一个类 `Web Component` 组件，从而实现微前端的组件化渲染。并且由于自定义 `Shadow Dom` 的隔离特性，`micro-app` 不需要像 `single-spa` 和 `qiankun` 一样要求子应用修改渲染逻辑并暴露出方法，也不需要修改 `Webpack` 配置，是目前市面上接入微前端成本最低的方案。

**概念图**

![概念图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1281db88c95e43fa9141f73f3c64a94e~tplv-k3u1fbpfcp-zoom-1.image)

## 快速上手

### 主应用

主应用不限技术栈，只需引入 `micro-app`、配置子应用路由并启动 `micro-app` 即可。这里以 `Vue3` 框架为例。

#### 安装 `micro-app`

```bash
yarn add @micro-zoe/micro-app

pnpm add @micro-zoe/micro-app

npm i @micro-zoe/micro-app
```

#### 启动 `micro-app`

在应用入口引入并启动 `micro-app`。

```js
import microApp from '@micro-zoe/micro-app'

microApp.start()
```

#### 嵌入子应用

创建 Vue 页面（如 `src/views/SubApp.vue`）用于承载子应用。

```js
<template>
  <div>
    <micro-app name='sub-app' url='http://localhost:8381/' baseroute='/sub-app'></micro-app>
  </div>
</template>
```

**`<micro-app>` 组件配置说明：**
* name: 子应用名称。必须以字母开头，且不可以带有除中划线和下划线外的特殊符号，每个 name 都对应一个应用，当多个应用同时渲染时，name 不可以重复。
* url: 子应用地址。会被自动补全，如 http://localhost:3000/index.html。
* baseroute: 主应用分配给子应用的基础路由。
* [查看更多子应用配置](https://zeroing.jd.com/docs.html#/zh-cn/configure)

#### 配置子应用路由

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...,
    {
      path: '/sub-app/*',
      component: () => import('../views/SubApp.vue')
    },
  ]
})

export default router
```

`path` 是子应用路由地址。非严格匹配，`/sub-app/*` 都指向 `SubApp` 页面。使用 `vue-router@4.x` 时写法为：`'/sub-app/:page*'`。

### Vue2 + Webpack 子应用

#### 设置基础路由

```js
const router = new VueRouter({
  mode: "history",
  routes,
  base: window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL,
});
```

#### 配置跨域支持

修改 `vue.config.js` 配置跨域支持。

```js
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  ...,
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    ...,
  },
});
```

### Vue3 + Vite 子应用

在嵌入 `Vite` 子应用时，`micro-app` 的功能只负责渲染，其它的行为由应用自行决定，这包括如何防止样式、JavaScript 变量、元素的冲突。

#### 子应用的修改

1. 添加自定义插件

* 新建插件 `vite-plugin-micro-app.js`

```js
import fs from 'fs'
import path from 'path'

function VitePluginMicroApp() {
  let basePath = ''
  return {
    name: 'vite:micro-app',
    apply: 'build',
    configResolved(config) {
      basePath = `${config.base}${config.build.assetsDir}/`
    },
    writeBundle(options, bundle) {
      for (const chunkName in bundle) {
        if (!Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
          continue
        }
        const chunk = bundle[chunkName]
        if (!chunk.fileName?.endsWith('.js') && !chunk.fileName?.endsWith('.ts')) {
          continue
        }
        chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) =>
          all.replace($3, new URL($3, basePath))
        )
        const fullPath = path.join(options.dir, chunk.fileName)
        fs.writeFileSync(fullPath, chunk.code)
      }
    }
  }
}

export default VitePluginMicroApp
```

* 导入插件并配置公共资源基础路径

```js
import microAppPlugin from './vite-plugin-micro-app'

export default defineConfig({
  ...,
  base: '/vue3-app/',
  plugins: [vue(), microAppPlugin()],
})
```

2. 修改容器元素 id

* 修改 `index.html` 中容器元素的 id 值

```html
<body>
  <div id="my-vite-app"></div>
</body>
```

* 使用新的 id 渲染

```js
createApp(App).mount('#my-vite-app')
```

当多个vite子应用同时渲染时，必须修改容器元素的id值，确保每个子应用容器元素id的唯一性，否则无法正常渲染。

3. 路由

推荐基座使用 `history` 路由，`Vite` 子应用使用 `hash` 路由，避免一些可能出现的问题。

子应用如果是 `Vue3`，在初始化时路由时，`createWebHashHistory` 不要传入参数，如下：

```js
const router = createRouter({
  ...,
  history: createWebHashHistory(),
})
```

4. 静态资源

图片等静态资源需要使用绝对地址，可以使用 `new URL('../assets/logo.png', import.meta.url).href` 等方式获取资源的全链接地址。

#### 主应用的修改

1. 关闭沙箱并使用内联 script 模式

```js
<micro-app
  name='child-name'
  url='http://localhost:3001/basename/'
  disableSandbox // 关闭沙箱
  inline // 使用内联script模式
>
```

2. 处理子应用静态资源

写一个简易的插件，对开发环境的子应用进行处理，补全静态资源路径。

```js
microApp.start({
  plugins: {
    modules: {
      // appName 即子应用的 name
      appName: [{
        loader(code) {
          if (import.meta.env.MODE !== 'development') {
            return code
          }
          // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
          code = code.replace(/(from|import)(\s*['"])(\/basename\/)/g, all => {
            return all.replace('/basename/', '子应用域名/basename/')
          })
          return code
        }
      }]
    }
  }
})
```

### React 子应用

#### 设置基础路由

```js
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ || "/"}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
```

#### 配置跨域支持

1. 安装 `react-app-rewired` `customize-cra` 依赖

```bash
yarn add -D react-app-rewired customize-cra

pnpm add -D react-app-rewired customize-cra

npm i -D react-app-rewired customize-cra
```

2. 应用根目录添加 `config-overrides.js` 文件

```js
const { overrideDevServer } = require("customize-cra");

module.exports = {
  devServer: overrideDevServer((config) => ({
    ...config,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })),
};
```

3. 修改 `package.json`

```json
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
```

## 应用间通信

`micro-app` 提供了一套灵活的数据通信机制，方便主应用和子应用之间的数据传输。

正常情况下，主应用和子应用之间的通信是绑定的，主应用只能向指定的子应用发送数据，子应用只能向基座发送数据，这种方式可以有效的避免数据污染，防止多个子应用之间相互影响。

同时 `micro-app` 也提供了全局通信，方便跨应用之间的数据通信。

### 主应用向子应用发送数据

主应用向子应用发送数据有两种方式。

1. 通过 `data` 属性发送数据

使用 `<micro-app>` 组件的 `data` 给子应用发送数据，此时只接受对象类型，数据变化时会自动重新发送。

```js
<template>
  <div>
    <micro-app name="my-app" url="http://localhost:8381/" baseroute="/my-app" :data="data" />
  </div>
</template>

<script setup lang="ts">
const data = { msg: '通过 data 发送给子应用的数据' }
</script>
```

1. 手动发送数据

手动发送数据需要通过 `name` 指定接受数据的子应用，此值和 `<micro-app>` 元素中的 `name` 一致。

```js
// 发送数据给子应用 my-app，setData第二个参数只接受对象类型
microApp.setData('my-app', { msg: '手动发送给子应用的数据' })
```

### 子应用接收主应用发送的数据

`micro-app` 会向子应用注入名称为 `microApp` 的全局对象，子应用通过这个对象有两种方式获取来自主应用的数据。

1. 直接获取

```js
// 获取主应用下发的 data 数据
const data = window.microApp.getData()
```

2. 绑定监听函数

```js
function dataListener(data) {
  console.log('来自主应用的数据', data)
}

/**
 * 绑定监听函数，监听函数只有在数据变化时才会触发
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为 false
 * !!!重要说明: 因为子应用是异步渲染的，而基座发送数据是同步的，
 * 如果在子应用渲染结束前主应用发送数据，则在绑定监听函数前数据已经发送，在初始化后不会触发绑定函数，
 * 但这个数据会放入缓存中，此时可以设置 autoTrigger 为 true 主动触发一次监听函数来获取数据。
 */
window.microApp.addDataListener(dataListener: Function, autoTrigger?: boolean)

// 解绑监听函数
window.microApp.removeDataListener(dataListener: Function)

// 清空当前子应用的所有绑定函数(全局数据函数除外)
window.microApp.clearDataListener()
```

### 子应用向主应用发送数据

```js
// dispatch只接受对象作为参数
window.microApp.dispatch({ msg: '子应用发送的数据' })
```

### 主应用接收子应用发送的数据

主应用获取来自子应用的数据有三种方式。

1. 直接获取数据

```js
// 获取指定子应用发送的数据
const childData = microApp.getData(appName)
```

2. 监听 `datachange` 事件

```js
<template>
  <div>
    <micro-app name="my-app" url="http://localhost:8381/" baseroute="/my-app" @datachange="handleDataChange" />
  </div>
</template>

<script setup lang="ts">
function handleDataChange(data: any) {
  console.log(data);
}
</script>
```

3. 绑定监听函数

```js
function dataListener(data) {
  console.log('来自子应用的数据', data)
}

/**
 * 绑定监听函数
 * appName: 应用名称
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false
 */
microApp.addDataListener(appName: string, dataListener: Function, autoTrigger?: boolean)

// 解绑监听my-app子应用的函数
microApp.removeDataListener(appName: string, dataListener: Function)

// 清空所有监听appName子应用的函数
microApp.clearDataListener(appName: string)
```

### 全局数据通信

全局数据通信会向主应用和所有子应用发送数据，在跨应用通信的场景中适用。

#### 发送全局数据

```js
// setGlobalData 只接受对象作为参数
microApp.setGlobalData({ msg: '全局数据' })
```

#### 获取全局数据

1. 直接获取数据

```js
const globalData = window.microApp.getGlobalData()
```

2. 绑定监听函数

```js
const dataListener = data => {
  console.log(data)
}
microApp.addGlobalDataListener(dataListener, true)
```

### 关闭沙箱后的通信方式

沙箱关闭后，子应用默认的通信功能失效，此时可以通过手动注册通信对象实现一致的功能。

**注册方式：在主应用中为子应用初始化通信对象**

```js
import { EventCenterForMicroApp } from '@micro-zoe/micro-app'

// 注意：每个子应用根据 appName 单独分配一个通信对象
window.eventCenterForAppxx = new EventCenterForMicroApp(appName)
```

**子应用通信方式：**

```js
// 直接获取数据
const data = window.eventCenterForAppxx.getData()


function dataListener(data) {
  console.log('来自主应用的数据', data)
}

/**
 * 绑定监听函数
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为 false
 */
window.eventCenterForAppxx.addDataListener(dataListener: Function, autoTrigger?: boolean)

// 解绑监听函数
window.eventCenterForAppxx.removeDataListener(dataListener: Function)

// 清空当前子应用的所有绑定函数(全局数据函数除外)
window.eventCenterForAppxx.clearDataListener()

// 子应用向主应用发送数据，只接受对象作为参数
window.eventCenterForAppxx.dispatch({ msg: '子应用发送的数据' })
```

## 常见问题

### `__webpack_public_path__` 无效，静态资源路径错误。

将 `public-path.js` 的导入语句放在应用入口文件的第一行。

### TypeScript cannot find name `__webpack_public_path__`。

在 `src` 目录新增 `global.d.ts` 文件：

```js
declare let __webpack_public_path__: string;

interface Window {
  __MICRO_APP_BASE_ROUTE__: string;
  __MICRO_APP_PUBLIC_PATH__: string;
  __MICRO_APP_ENVIRONMENT__: boolean;
}
```

### React18 子应用首次进入展示空白，再次进入正常。

在 `React18` 项目中使用 `@rescripts/cli` 修改 `Webpack` 配置可能会导致 `micro-app` 首次进入 `React18` 子应用时展示空白。

将 `@rescripts/cli` 替换为 `react-app-rewired` `customize-cra` 即可。

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
    current: history.state.current === '/' ? '/' : `${location.pathname}${location.hash}`
  });
});
```

* `React` 通过轮询监听路由变化更新 `state`

```js
function listenRouterChange(callback: () => void) {
  let oldHref = window.location.href;
  const loop = () => {
    window.requestAnimationFrame(() => {
      if (window.location.href !== oldHref) {
        oldHref = window.location.href;
        callback();
      } else {
        loop();
      }
    });
  };
  loop();
}

listenRouterChange(() => {
  Object.assign(window.history.state, { current: window.location.pathname });
});
```