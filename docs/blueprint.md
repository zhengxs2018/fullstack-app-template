# 蓝图

蓝图模块参考了 [flask][flask] 的蓝图功能，原理是使用 [@koa/router][@koa/router] 进行独立编写。

## 功能介绍

蓝图拥有自己的渲染和路由，除了无法独立部署，和应用没有区别，同时蓝图不要求和应用强关联在一起，在必要的时候也作为独立的包引入

- 独立的中间件
- 独立的路由功能
- 独立的静态资源目录
- 独立的模板渲染功能


## 一、 编写蓝图

在 `app/modules` 目录，新建 `admin` 文件夹，里面新建 `main.js` 文件

```javascript
// 引入蓝图模块
const { blueprint } = require('../../lib/blueprints')

// 实际返回的是 @koa/router 实例
const bp = blueprint(__dirname, {
  // url 前缀，参考 @koa/router 模块的 prefix 属性
  // 无默认值
  prefix: '/admin',
  // 静态资源文件夹，作为参数传递给给 koa-static 插件
  // 设置为 false 将不使用静态目录
  // 默认: static
  staticFolder: './static',
  // html 模板目录，会传递给 nunjucks 插件
  // 用于渲染时插件模板文件
  // 设置为 false 将不使用模板功能
  // 默认: templates
  templateFolder: './templates'
})

// 添加路由和控制器
bp.get('/', (ctx) => {
  // render 实际调用的是 nunjucks 的方法
  // 模板查找路径就是 templateFolder 指定的
  ctx.render('index.html')
})

// fallback
bp.get('(.*)', (ctx) => {
  ctx.render('404.html')
})

module.exports = bp
```

## 二、挂载蓝图

在 `app.js` 文件，添加代码:

```javascript
// 引入蓝图
const admin = require('./modules/admin/main')

// 第一个参数比如是 koa 实例
app.use(admin.mount(app, {
  // 可以在这里提替换蓝图本身的设置
  // 目前仅支持 prefix 参数
  prefix: '/admin'
}))
```

在浏览器中打开：http://127.0.0.1:8080/admin

这样一个模块就编写完成

## 待办事项

 - [] 支持蓝图之间互相跳转
 - [] 支持 nunjucks 继承，蓝图仅仅是模板搜索路径不一样

[flask]: https://github.com/pallets/flask
[@koa/router]: https://github.com/koajs/router
[nunjucks]: https://github.com/mozilla/nunjucks
