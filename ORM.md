title: 数据处理方案
author:
  name: jaxchow
output: ORM.html
controls: true

--

# 数据处理方案

--

## 一份数据

  这份数据什么意思

 ```
 const originalData={
  "id": "123",
  "author": {
    "id": "1",
    "name": "Paul"
  },
  "title": "My awesome blog post",
  "comments": [
    {
      "id": "324",
      "commenter": {
        "id": "2",
        "name": "Nicole"
      }
    }
  ]
}
 ```


--

## 升级方案normalizr

> Normalizes nested JSON according to a schema

  ```
    const user = new schema.Entity('users');

    // Define your comments schema
    const comment = new schema.Entity('comments', {
      commenter: user
    });

    // Define your article
    const article = new schema.Entity('articles', {
      author: user,
      comments: [comment]
    });

    const normalizedData = normalize(originalData, article);
    // output
    //  { entities:
       { users: { '1': [Object], '2': [Object] },
         comments: { '324': [Object] },
         articles: { '123': [Object] } },
      result: '123' }
  ```  

--

## 什么是ORM

> 对象关系映射（英语：(Object Relational Mapping，简称ORM，或O/RM，或O/R mapping），是一种程序技术，用于实现面向对象编程语言里不同类型系统的数据之间的转换 [1]  。从效果上说，它其实是创建了一个可在编程语言里使用的--“虚拟对象数据库”。(百科)


--

## 为什么要用 Redux-ORM

> 客户端应用经常需要处理原本嵌套或相关的数据。对于 Redux 应用来说，标准的建议是 将数据用「范式化」的形式存储。对 Redux 应用而言，这意味着将你的 store 部分组织得像一组数据库表。每种你想存储的数据项类型都会获取到一个对象用作索引表，将数据项的 ID 映射到数据记录。因为这些对象没有顺序的概念，所以另需一个数据项的数组来指明顺序

--


## 相关资源


  - [redux](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)
  - [redux-orm](https://www.npmjs.com/package/redux-orm/)
  - [redux-orm API](http://tommikaikkonen.github.io/redux-orm/global.html#ORM)
  - [redux-orm-basics](https://github.com/xitu/gold-miner/blob/master/TODO/practical-redux-part-1-redux-orm-basics.md?spm=a2c4e.11153940.blogcont226778.8.462e2da7Rgekch&file=practical-redux-part-1-redux-orm-basics.md)
