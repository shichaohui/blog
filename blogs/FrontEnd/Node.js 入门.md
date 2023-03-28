---
title: Node.js 入门
date: 2023-03-27 17:25
tags:
 - FrontEnd
 - Node
categories:
 - FrontEnd
 - Node
---

[Node.js]:http://dev.nodejs.cn/learn
[console]:http://nodejs.cn/api/console.html
[npm]:http://dev.nodejs.cn/learn/an-introduction-to-the-npm-package-manager
[express]:https://github.com/expressjs/expressjs.com
[http]:https://nodejs.cn/api/http.html
[TypeScript]:http://dev.nodejs.cn/learn/nodejs-with-typescript

## 什么是 Node.js ？

[Node.js] 是一个基于 `Chrome V8` 引擎的开源的跨平台的 JavaScript 运行时环境。  
[Node.js] 采用了基于事件的、单线程的异步 I/O 架构。

### Node.js 的组成部分

* **V8引擎**  
  V8 引擎就是 JavaScript 解释器，它负责解析和执行 JavaScript 代码。
* **本地模块**  
  本地是封装了通用功能的对性能要求较高的提前编译好的二进制文件，如 `libuv`、`openssl`。
* **标准库**  
  标准库是 [Node.js] 提供给开发人员的兼容各平台的一套 JavaScript 接口。

## 安装 Node.js

* 手动下载安装，[查看下载](http://nodejs.cn/download)
* 使用包管理器，[查看包管理器](http://nodejs.cn/download/package-manager)

## 从命令行运行 Node.js 脚本

当前目录创建 `hello.js` 文件：
```bash
echo console.log('Hello Node.js') > hello.js
```

执行 `hello.js`：
```bash
node hello.js
```

### 从命令行接收参数

![从命令行接收参数](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dea7aa065a9b4a6db48a8be45ea5f1f0~tplv-k3u1fbpfcp-watermark.image?)

* 可以传入任意数量的参数。
* 参数可以是独立的（如 `p1`），也可以具有键值（如 `--p2=p2value`）。
* 在脚本中使用 `process.argv` 接收参数。
* 推荐使用 `minimist` 解析键值参数。
* 推荐使用 `inquirer.js` 制作命令行交互。

### 输出到命令行

[Node.js] 提供了 [console] 模块，该模块提供了大量非常有用的与命令行交互的方法，它基本上与浏览器中的 [console] 对象相同。

![console](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0e47c630c344d52b24513c99c300211~tplv-k3u1fbpfcp-watermark.image?)

**日志美化：**
* [转义序列](https://gist.github.com/iamnewton/8754917)：转义序列是一组标识颜色的字符，可以在控制台中为字符串着色。
* [chalk](https://github.com/chalk/chalk)：修改字符样式，如下划线、斜体、颜色、背景色等。
* [progress](https://github.com/visionmedia/node-progress)：灵活的 ASCII 进度条。

## Node.js 内置模块

[Node.js] 有一套内置模块，无需安装即可使用。

![Node.js 内置模块](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdc587d5679043d8b36c636620a845cb~tplv-k3u1fbpfcp-watermark.image?)

导入内置模块：
```js
const module = require(module_name)
```

### 路径模块（path）

[path](https://nodejs.cn/api/path.html) 模块提供了许多非常实用的函数来访问文件系统并与文件系统进行交互。
* `path.basename()` 获取路径的最后一部分。
* `path.dirname()` 获取路径的目录。
* `path.extname()` 获取路径的扩展名。
* `path.isAbsolute()` 判断是否是绝对路径。
* `path.join()` 连接路径的两个或多个部分。
* `path.normalize()` 计算包含 `.` `..`  `//` 等相对说明符时对应的真实路径。
* `path.parse()` 解析路径为一个 JavaScript 对象（root、dir、base、name、ext）。
* `path.relative()` 基于当前工作目录，返回从第一个路径到第二个路径的相对路径。
* `path.resolve()` 获得相对路径的绝对路径。

### 文件系统模块（fs）

[fs](https://nodejs.cn/api/fs.html) 模块提供了许多非常实用的函数来访问文件系统并与文件系统进行交互。
* `fs.access()` 检查文件是否存在，以及 [Node.js] 是否有权限访问。
* `fs.appendFile()` 追加数据到文件。如果文件不存在，则创建文件。
* `fs.chmod()` 更改文件（通过传入的文件名指定）的权限。
* `fs.mkdir()` 新建文件夹。
* `fs.readdir()` 读取文件夹的内容。
* `fs.copyFile()` 拷贝文件。
* `fs.readFile()` 读取文件的内容。
* `fs.writeFile()` 将数据写入文件。
* `fs.rename()` 重命名文件或文件夹。
* `fs.rmdir()` 删除文件夹。
* `fs.realpath()` 将相对的文件路径 `.` `..` 解析为完整的路径。
* `fs.createReadStream()` 创建可读的文件流。
* `fs.createWriteStream()` 创建可写的文件流。
* `fs.watchFile()` 开始监视文件上的更改。

`fs` 模块所有的方法默认情况下都是异步的，想要同步工作需要调用对应的 sync 函数，如：`fs.writeSync()`。

### 事件模块（events）

[events](https://nodejs.cn/api/events.html) 模块为提供了 `EventEmitter` 类，这是在 [Node.js] 中处理事件的关键。

```js
const EventEmitter = require('events')
const emitter= new EventEmitter()
```

* `emitter.on()` 添加事件被触发时的回调函数。
* `emitter.once()` 添加事件被触发时的回调函数，该回调只会被调用一次。
* `emitter.off()` 移除指定的监听器。
* `emitter.emit()` 按照事件被注册的顺序同步地调用每个事件监听器。
* `emitter.eventNames()` 获取当前 `EventEmitter` 对象上注册的所有事件的名称数组。
* `emitter.listenerCount()` 获取指定事件监听器个数。
* `emitter.listeners()`  获取指定事件的所有监听器。
* `emitter.prependListener()` 将回调函数插入到队列的最前面。
* `emitter.prependOnceListener()` 将回调函数插入到队列的最前面，该回调只会被调用一次。
* `emitter.getMaxListeners()` 获取可以添加的监听器的最大数量。
* `emitter.setMaxListeners()` 设置可以添加的监听器的最大数量（默认为 10）。

### http 模块

[http] 模块是 [Node.js] 网络的关键模块。
* `http.METHODS` 属性列出了所有支持的 HTTP 方法。
* `http.STATUS_CODES` 属性列出了所有的 HTTP 状态代码及其描述。
* `http.globalAgent` 属性是 `http.Agent` 类的全局实例，用于管理 HTTP 客户端连接的持久性和复用。
* `http.createServer()` 创建并返回 `http.Server` 类的新实例。
* `http.request()` 发送 HTTP 请求到服务器，并创建 `http.ClientRequest` 类的实例。
* `http.get()` 类似于 `http.request()`，但会自动设置 HTTP 方法为 `GET`，并自动调用 `req.end()`。

![http 模块](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bea376392cb649f9b53f5f31a6b27fe7~tplv-k3u1fbpfcp-watermark.image?)

## npm 包管理器

### npm 简介

[npm] 是 [Node.js] 标准的软件包管理器，具有下载/更新软件包、管理软件包的版本、运行指定任务等功能。

**常用命令：**
* `npm init` 初始化项目。
* `npm install [<@scope>/]<pkg>` 安装软件包。
* `npm update [-g] [<pkg>...]` 更新软件包。
* `npm list [[<@scope>/]<pkg> ...]` 查看已安装的软件包。
* `npm outdated` 查询当前项目中安装的已过时的软件包。
* `npm view <pkg>[@<version>] [<field>[.subfield]...]` 查询软件包在 [npm] 仓库中的最新可用版本。
* `npm run <task-name>` 运行指定任务。

### package.json 和 package-lock.json

`package.json` 文件是用 JSON 格式组织的项目清单，它是 [npm] 和 `yarn` 存储已安装软件包的名称和版本的地方，也可以用于工具（如 `husky`、`babel`）的配置。  
`package-lock.json` 文件旨在跟踪被安装的每个软件包的确切版本，以便产品可以以相同的方式被 100％ 复制（即使软件包的维护者更新了软件包）。

![package.json 和 package-lock.json](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7503844f5f9b486eb287eed1209c9850~tplv-k3u1fbpfcp-watermark.image?)

### 使用 npm 管理软件包

![使用 npm 管理软件包](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17344d888d0d4974ab92fd253450bb62~tplv-k3u1fbpfcp-watermark.image?)

默认情况下，执行 `npm install` 命令时软件包会被安装到当前文件夹的 `node_modules` 子文件夹下，该软件包只对当前项目有效，使用 `-g` 标志可以执行全局安装，使用 `npm root -g` 可以查询全局安装目录。

### npm 的语义版本控制

语义版本控制的概念很简单，所有的版本都是由 . 分割的 3 个数字组成：x.y.z，3 个数字分别表示主版本号、次版本号和补丁版本号。  

当发布新的版本时，不仅仅是随心所欲地增加数字，还要遵循以下规则：
* 当进行不兼容的 API 更改时，则升级主版本。
* 当以向后兼容的方式添加功能时，则升级次版本。
* 当进行向后兼容的缺陷修复时，则升级补丁版本。

依赖包更新规则配置：
* `^`：保持主版本号，若主版本号为 0，则保持次版本号。
* `~`：保持主版本号和次版本号。
* `>`：接受高于指定版本的任何版本。
* `>=`：接受等于或高于指定版本的任何版本。
* `<=`：接受等于或低于指定版本的任何版本。
* `<`：接受低于指定版本的任何版本。
* `=`：接受确切的版本。
* `-`：接受一定范围的版本。例如：2.1.0 - 2.6.2。
* `||`：组合集合。例如 < 2.1 || > 2.6。
* 无符号: 仅接受指定的特定版本（例如 1.2.1）。
* `latest`: 使用可用的最新版本。

## 使用 Express 搭建 Web 服务器

### Express 简介

[Express] 是最流行的 [Node.js] 框架之一，是许多其它流行 [Node 框架](https://expressjs.com/zh-cn/resources/frameworks.html) 的底层库。它提供了以下机制：
* 为不同 URL 路径中使用不同 HTTP 动词的请求（路由）编写处理程序。
* 集成了“视图”渲染引擎，以便通过将数据插入模板来生成响应。
* 设置常见 Web 应用设置，比如用于连接的端口，以及渲染响应模板的位置。
* 在请求处理管道的任何位置添加额外的请求处理“中间件”。

虽然 [Express] 本身是极简风格的，但是开发人员通过创建各类兼容的[中间件](https://expressjs.com/zh-cn/guide/using-middleware.html)解决了几乎所有的 Web 开发问题。这些库可以实现 cookie、会话、用户登录、URL 参数、POST 数据、安全头等功能。

### Express 路由

路由用于确定应用程序如何响应对特定端点的客户端请求，包含一个 URI（或路径）和一个特定的 HTTP 请求方法（GET、POST 等）。

路由定义采用以下结构：`app.method(path, ...handler)`。
* `app` 是 `express` 的实例。
* `method`（路由方法）是由 HTTP 请求方法派生出的 `express` 实例函数，附加在 `Express` 类的实例上，`Express` 支持对应于 HTTP 方法的以下路由方法：`get`、`post`、`put`、`head`、`delete`、`options`、`trace`、`copy`、`patch` 等。
* `path`（路由路径）是服务器上的路径，路由路径与请求方法相结合，用于定义可以在其中提出请求的端点。路由路径可以是字符串、字符串模式或正则表达式。
* `handler`（路由处理程序）是在路由匹配时执行的处理函数，是一个函数、一组函数或者两者的结合，以类似于中间件的行为方式来处理请求。可以对路由施加先决条件，在没有理由继续执行当前路由的情况下，可将控制权传递给后续路由。通过调用响应对象的方法（如 `send`、`json`、`end`）可以向客户机发送响应，并终止请求/响应循环。如果没有从路由处理程序调用其中任何方法，客户端请求将保持挂起状态。

### express.Router

使用 `express.Router` 类来创建可安装的模块化路由处理程序，`Router` 实例是完整的中间件和路由系统。

在应用程序目录中创建名为 `birds.js` 的路由器文件，并使用 `express.Router` 创建一个路由模块，然后在应用程序中装入路由器改模块：

![express.Router](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23303b65e0cf43d2b5264ddf20c70df2~tplv-k3u1fbpfcp-watermark.image?)

此应用程序现在可处理针对 `/birds/` 和 `/birds/mine` 的请求，并调用特定于此路由的中间件函数。

### Axios 

[Axios](https://www.axios-http.cn/) 是一个基于 `Promise` 的可以用于浏览器和 [Node.js] 的网络请求库。在服务端它使用 [Node.js] 的 [http] 模块, 而在客户端 (浏览端) 则使用 `XMLHttpRequest`。

**Axios 特性：**
* 从浏览器创建 `XMLHttpRequests`
* 从 [Node.js] 创建 [http] 请求
* 支持 `Promise` API
* 拦截请求和响应
* 转换请求和响应数据
* 取消请求
* 自动转换 JSON 数据
* 客户端支持防御 XSRF

![Axios](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e43af7d38d64be7b52f5e294312205f~tplv-k3u1fbpfcp-watermark.image?)

## Node.js 中使用 TypeScript

### TypeScript

[TypeScript] 是由 Microsoft 维护和开发的一个非常流行的开源语言。  
它是 JavaScript 的超集，为语言增加了新的功能，最值得注意的新功能是静态类型定义，这是普通 JavaScript 中所没有的。   
通过类型定义，我们可以声明期望的参数类型，以及在函数中确切返回的参数，或者所创建对象的确切是什么。 和编辑器代码检查配合，在编写代码时即可发现错误，它使我们的代码更安全，更健壮。

![TypeScript](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3eb56c416f494636a601ee44143f4a2d~tplv-k3u1fbpfcp-watermark.image?)

### tsconfig.json

如果一个目录下存在一个 `tsconfig.json` 文件，那么它意味着这个目录是 [TypeScript] 项目的根目录，`tsconfig.json` 文件指定了用来编译这个项目的根文件和编译选项。

安装 [TypeScript] 后可使用 `tsc --init` 命令生成 `tsconfig.json` 文件。

![tsconfig.json](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f49355011774a31ad6c8c443c84130f~tplv-k3u1fbpfcp-watermark.image?)

**tsconfig.json 配置：**
* `compilerOptions` 指定编译配置，不指定时[编译器](https://www.tslang.cn/docs/handbook/compiler-options.html)会使用默认值。
* `compileOnSave` 配置 IDE 在保存文件的时候是否根据重新编译。
* `files` 指定一个包含相对或绝对文件路径的列表。
* `include` 和 `exclude` 属性指定一个文件 glob 匹配模式列表。支持的通配符如下：
    * `*` 匹配0或多个字符（不包括目录分隔符）
    * `?` 匹配一个任意字符（不包括目录分隔符）
    * `**/` 递归匹配任意子目录
* `extends` 的值是一个字符串，包含指向另一个要继承文件的路径。

### Node.js 中使用 TypeScript

安装依赖：
```bash
npm install typescript
```

编译 `TypeScript` 文件为 JavaScript 文件：
```bash
tsc xxx.ts
```

安装 `ts-node`：
```bash
npm install ts-node @typs/node
```

使用 `ts-node` 直接运行 ts 文件：
```bash
npx ts-node xxx.ts
```
