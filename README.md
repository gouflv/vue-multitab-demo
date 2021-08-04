# vue 实现多标签页

[Live Demo](https://codesandbox.io/s/vue-multitab-demo-pgbii?file=/package.json)

## Features

- `vue@2.x` + `composition-api`
- 使用内置 `keep-alive` 组件控制路由页面的生命周期
- 通过预处理， 将路由页面用 HOC 包裹，实现页面与标签页相关的控制逻辑结偶 
- 支持嵌套路由

## Problem

多标签 `keep-alive` 的场景，会产生脏数据的问题。

比如打开一个包含地区选择组件的表单页，再打开地区管理页，对地区数据做更新，此时表单页的地区数据就成为脏数据。

通用方案是，基于 vuex 做数据层，即通过响应式，自动在模块间同步最新版本的数据。当然也可以不依赖 vuex，自己实现数据层服务。
