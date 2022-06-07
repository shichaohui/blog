---
title: Vite2 + React + Antd 踩坑指南
date: 2021-02-28 22:05
tags:
 - FrontEnd
 - Vite
 - React
 - Antd
categories:
 - FrontEnd
---

## process is not defined

**报错：**

```
Uncaught ReferenceError: process is not defined
```

**解决方案：**

```typescript
// 使用 import.meta.env 替换 process.env
process.env --> import.meta.env
```

```bash
# .env

# 字段名必须以 VITE_ 开头，否则不会暴露到 import.meta.env 中
VITE_APP_VERSION = "1.0.0"
```

## Property 'env' does not exist on type 'ImportMeta'

**报错：**

```
Property 'env' does not exist on type 'ImportMeta'
```

**解决方案：**

```json
# tsconfig.json

{
  "compilerOptions": {
    "types": ["vite/client"],
    ...
  }
}       
```

## _interopRequireDefault is not a function

**报错：**

```
Uncaught TypeError: _interopRequireDefault is not a function
    at Form.js:24
    at chunk.2VCUNPV2.js?v=9e816b32:4
    at dep:antd_lib_form_Form:1
```

**解决方案：**

```typescript
// useForm 从错误的包导入，导致报错
// import { useForm } from 'antd/lib/form/Form'
// import { useForm } from 'antd/es/form/Form'
// const [form] = useForm()

// 通过 Form 调用，不会出现导包错误的问题
import { Form } from 'antd'
const [form] = Form.useForm()
```

## global is not defined

**报错：**

```
Uncaught ReferenceError: global is not defined
    at setImmediate.js:15
    at chunk.2VCUNPV2.js?v=e11687d4:4
    at editOnBeforeInput.js:25
    at chunk.2VCUNPV2.js?v=e11687d4:4
    at DraftEditorEditHandler.js:16
    at chunk.2VCUNPV2.js?v=e11687d4:4
    at DraftEditor.react.js:32
    at chunk.2VCUNPV2.js?v=e11687d4:4
    at Draft.js:24
    at chunk.2VCUNPV2.js?v=e11687d4:4
```

**解决方案：**

```html
<!-- index.html -->

<html>
  ...
  <body>
    <script>
      global = globalThis
    </script>
    ...
  </body>
</html>
```

