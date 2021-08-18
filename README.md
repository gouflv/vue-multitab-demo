# vue 实现多标签页

[Live Demo](https://codesandbox.io/s/vue-multitab-demo-pgbii?file=/package.json)

## Features

- `vue@2.x` + `composition-api`
- 使用内置 `keep-alive` 组件控制路由页面的生命周期
- 通过预处理， 将路由页面用 HOC 包裹，实现页面与标签页相关的控制逻辑结偶 
- 支持嵌套路由

## Problems

### 脏数据

多标签 `keep-alive` 的场景，会产生脏数据的问题。

比如:
1. 打开一个包含地区选择组件的表单页
2. 再打开地区管理页，对其中的地区数据做更新
3. 此时回到表单页，地区数据还保留修改前的状态，成为脏数据。

可能的方案:
1. 基于响应式的数据服务层，如 vuex 或者自己实现的数据服务。
2. 实现标签页间通讯。比如，修改地区数据后，将事件广播到所有标签页，由标签页自行处理

带来新的问题: 
不管是数据还是页面级别的控制，都会在前端产生很严重模块间的耦合。

### 同一个页面需要打开多次

通过 `RouteMeta` 配置参数，或者 `router.push` 传入参数，在 TabService 中特殊处理

