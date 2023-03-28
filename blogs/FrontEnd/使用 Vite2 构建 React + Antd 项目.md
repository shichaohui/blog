---
title: 使用 Vite2 构建 React + Antd 项目
date: 2021-02-28 22:01
tags:
 - FrontEnd
 - Vite
 - React
 - Antd
categories:
 - FrontEnd
---

> 转载请注明出处，[点击此处](https://shichaohui.github.io/)可了解 [StoneHui](https://shichaohui.github.io/) 更多信息

[Vite]:https://github.com/vitejs/vite
[React]:https://github.com/facebook/react
[Antd]:https://github.com/ant-design/ant-design

## 什么是 Vite？

[Vite]（法语意思是 “快”，发音为 `/vit/`，类似 `veet`）是一种全新的面向未来的前端开发服务器和构建工具。  
[Vite] 利用浏览器原生 `ES Module` 去解析 `imports`，在服务器端按需编译返回，跳过了打包的概念，服务器随起随用。同时不仅支持 `Vue` 和 [React]，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生产环境则可以把同一份代码用 `rollup` 打包。

## 创建项目

```bash
# 使用 npm 创建 React 模板的项目 my-vite-app
npm init @vitejs/app my-vite-app --template react

# 使用 npm 创建 React + TypeScript 模板的项目 my-vite-app
npm init @vitejs/app my-vite-app --template react-ts


# 使用 yarn 创建 React 模板的项目 my-vite-app
yarn create @vitejs/app my-vite-app --template react

# 使用 yarn 创建 React + TypeScript 模板的项目 my-vite-app
yarn create @vitejs/app my-vite-app --template react-ts
```

## 安装 [Antd]

### 安装

```bash
# 安装 antd
yarn add antd
# 安装 less
yarn add -D less
```

### 配置

```typescript
// vite.config.ts

export default defineConfig({
	...
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: {
          '@primary-color': 'red',
        },
      },
    }
  }
})
```

### 导入样式

```typescript
// App.tsx

import 'antd/dist/antd.less'
```

## 使用 CSS 预处理器

安装即可，无需插件，Vite 默认支持。

```bash
yarn add -D sass less
```

## 使用 CSS Module

修改 CSS 文件名为 CSS Module 格式即可，无需配置，Vite 默认支持。

```javascript
index.css --> index.module.css
index.scss --> index.module.scss
index.less --> index.module.less
```

## 全局样式配置

```typescript
// vite.config.ts

export default defineConfig({
	...
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入全局样式
        additionalData: "@import '@/styles/base.scss';"
      },
    }
  },
})
```

## 路径别名

```typescript
// vite.config.ts

export default defineConfig({
	...
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
})
```

```typescript
import Mine from "@/pages/Mine"
import Avatar from "@/components/Avatar"
import utils from "@/utils"
import baseStyle from "@/styles/base.scss"
```

## 调试

```bash
# 直接运行调试
yarn dev

# 打包
yarn build

# 预览打包结果
yarn serve
```

## 构建发布包

如果是发布到服务器根目录，那么无需配置，直接 `yarn build` 打包即可。  

如果是发布到服务器子目录，如：website，那么需要配置两个点：

```typescript
// vite.config.ts

export default defineConfig({
  // 配置公共路径，否则会出现资源找不到的问题
  base: "/website",
})
```

```typescript
// 路由配置

// 配置路由根路径，否则路由跳转后浏览器上显示的地址不包含服务器子目录
<BrowserRouter basename="/website">
	...
</BrowserRouter>
```

## 踩坑

[Vite2 + React + Antd 踩坑指南](https://blog.csdn.net/u014165119/article/details/114241036)