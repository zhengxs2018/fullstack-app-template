# fullstack-app-template

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

一个完善的基于 [koa.js][koa.js] 开发的全栈应用模板，可在生产项目中使用。

## 功能列表

 - 基于 [@koa/router][@koa/router] 构建的多模块功能
 - 使用 [swagger-ui][swagger-ui] 生成 api 文档
 - 数据库默认是 `sqlite`，可以支持其他数据，如 `mysql`，由 [prisma2][prisma2] 驱动

## 目录结构

```bash
├── app/
|   ├── setup.ts                              # 启动脚本
|   ├── main.ts                               # 应用入口
|   ├── contract/
|   |   ├── request/                          # 表单验证规则和输入字段定义
|   |   ├── response/                         # 输出数据转换和安全字段拦截
|   |   └── *.yaml                            # swagger ui 定义文件
|   ├── db/ 
|   |   ├── helpers/                          # 助手函数
|   |   |   └── pagination.js                 # 分页函数
|   |   └── client.js                         # @prisma/client 实例对象
|   ├── extend/
|   |   ├── application.js
|   |   └── context.js
|   ├── lib/                                  # 公共代码 
|   ├── middleware/                           # 中间件函数
|   ├── modules/  
|   |   ├── admin/                            # 管理后台 
|   |   |   ├── static/                       # 静态文件
|   |   |   ├── templates/                    # 模板文件
|   |   |   └── main.ts                       # 模块入口
|   |   |
|   |   ├── api/                              # 数据接口
|   |   |   └── main.ts
|   |   |
|   |   ├── mobile/                           # 移动端 
|   |   |   ├── static/                       # 静态文件
|   |   |   ├── templates/                    # 模板文件
|   |   |   └── main.ts                       # 模块入口
|   |   └── web/                              # 官网
|   |       ├── static/                       # 静态文件
|   |       ├── templates/                    # 模板文件
|   |       └── main.ts                       # 模块入口
|   └── service/                              # 内部调用服务
├── config/                                   # 应用配置 
|   ├── default.js  
|   ├── development.js
|   └── production.js
├── docs/
├── migrations/                               # 数据库迁移脚本
├── run/
|   ├── application_config.json               # 应用运行时的配置信息
|   └── application_config_meta.json          # 应用运行时的配置的元数据
├── .env                                      # 环境配置文件
├── setup.js                                  # 启动前执行文件
├── ecosystem.config.js                       # pm2 配置文件
├── nodemon.json
├── schema.prisma                             # prisma 定义文件
└── README.md
```

## 文档

- [蓝图](./docs/module.md)
- [表单验证](./docs/form-validate.md)
- [部署到服务器](./docs/deploy.md)

## 启动项目

> 注意: 请确保本地安装有 redis，或修改 redis 的主机地址，否则项目将无法启动。

你需要安装 Node.js 的版本为 12+，应用依赖 redis 服务。

克隆此仓库后运行:

``` bash
# 安装依赖
$ npm install

# 更新数据库
$ npm run db:up

# 启动开发模式
# 打开 http://127.0.0.1:8080/api/docs 可以查看 api 文档
$ npm run dev

# 启动调试模式，需要其他工具配合，如：vscode，Chrome devtools
$ npm run debug
```

更多 `npm version` 的命令可使用 `npm version --help` 查看

## License

* MIT

[koa.js]: https://github.com/koajs/koa
[@koa/router]: https://github.com/koajs/router
[swagger-ui]: https://swagger.io/tools/swagger-ui/
[prisma2]: https://github.com/prisma/prisma