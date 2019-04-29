title: React开发总结和解决方案
author:
  name: jaxchow
output: react.html
controls: true

--

# React开发总结和改进

--

## 我们现有问题

  - 组件体系？各组件特性？
  - redux? 数据驱动 ?
  - 代码职责？组件化？模块化？
  - 规范 ？团队协作？
  - 自测？质量？

--

## 单向数据流

<img src="http://upload-images.jianshu.io/upload_images/16777-e9e03f0a1f0bc760.png?imageMogr2/auto-orient/" width="100%" >


--

## 前端组件化开发

> 最初的目的是代码重用，功能相对单一或者独立。在整个系统的代码层次上位于最底层，被其他代码所依赖，所以说组件化是纵向分层  

--

## 前端模块化开发

>最初的目的是将同一类型的代码整合在一起，所以模块的功能相对复杂，但都同属于一个业务。不同模块之间也会存在依赖关系，但大部分都是业务性的互相跳转，从地位上来说它们都是平级的

  * 简单化
  * 标准化
  * 可读性
  * 可维护性
  * 可扩展性
  * 可测试性  

--

## 两者区别


| 类别 |      目的  |   特点        | 接口   |       成果     | 架构定位 |
|-----|:---------:|--------------:|------:|----------------:|-------:|
| 组件 |  重用、解耦 | 高重用、松耦合 | 无统一接口 | 基础库、基础组件 |纵向分层 |
| 模块 |  隔离/封装 | 高内聚、松耦合 | 统一接口 | 业务框架、业务模块 | 横向分块 |

--

## 组件库 mcf-components

> componets组件库：提供自定义组件、ANTD 二次封装组件。


  - SearchFrom: 搜索组件
  - DataTable:  表格组件带分页和列配置
  - BaseForm :  基本Form 组件
  - ButtonGroups : 按钮组件库
  - FormItem :  表单项组件简化书写方式扩展功能
  - Permission : 权限展示组件，是否渲染
  - PropertyTable: 属性表格组件
  - TreeView ：树组件

--

## 业务组件库 mcf-crud

> crud 组件：为了解决日常业务开发｀增删改查｀功能抽象开发二次封装组件，减少大量重复性代码。


 - ListPage : 列表页的父类组件，提供日常的搜索与表格联动、行选参数据保存、公有的请求入口、页面跳转方法
 - FormPage : 表单页的父类组件，提供公有的请求入口、页面跳转方法、提交数据收集等。

--

## 装释器组件库 mcf-decorators

> 装释器实现多种组件的组合关系：能过高阶组件方式实现，必免代码之间的依赖问题


 - InnerComponent: 内并组件
 - NestedComponent: 嵌套组件
 - WrapperComponent: 外包组件

--

## 图标库 mcf-icons


>  基于ANTD 字体库的封装，可以与ANTD组件接合直接使用。自定义图标以 "mc-"为前缀定义。目前已整合了 审计、融合、工作流、数据库加密等库。

--

## 开发规范思路

  - 需求文档与业务接口先行
  - 代码分层化开发
  - 代码可测试
  - 模块间不依赖，所有共用采用独立包依赖
  - 组件可复用，共享组件使用
  - 团队或项目组一致性，差异化处理

--

## 相关资源


  `yarn add git+http://jaxlab.asuscomm.com/mcf/crud.git`
  `yarn add git+http://jaxlab.asuscomm.com/mcf/decorators.git`
  `yarn add git+http://jaxlab.asuscomm.com/mcf/icons.git`
  `yarn add git+http://jaxlab.asuscomm.com/mcf/components.git`
  [demo](http://jaxlab.asuscomm.com/mcf/router.git)
  [redux](https://redux.js.org/)
  [saga](https://redux-saga.js.org/)
