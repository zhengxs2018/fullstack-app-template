# 部署到服务器

目前前端应用大部分都是用 [pm2][pm2] 进行管理的，主要是为了防止程序异常导致应用意外中断退出。

## 一、pm2 部署

### 1. 服务端安装 nodejs

这个需要按照自己购买的服务器安装，网上有很多教程，这里不做描述。

### 2. 安装 pm2 模块

[pm2] 是基于 [nodejs][nodejs] 开发，发布在 npm 上，可以使用 npm 进行安装

```bash
# 推荐安装到全局
$ npm i pm2 -g
```

### 3. 编写 pm2 配置文件

可以使用 `pm2 init` 命令生成配置文件，文件名称默认为 `ecosystem.config.js`，配置项可参官方文档：[ecosystem-file](https://pm2.keymetrics.io/docs/usage/application-declaration/
)

```javascript
const { resolve } = require('path')

const pkg = require('./package.json')

module.exports = {
  // pm2 是支持多应用部署的，可以将这个配置文件放置在和项目同级的地方，管理多个 node 应用
  apps : [
    {
      // 应用名称，可以在 pm2 list 中看到
      name: pkg.name,
      // 执行脚本，可以在 package.json 中配置
      script: pkg.main,
      // 这里需要注意一点，应用启动前需要处理一些事情
      // 所以单独存在一个 setup.js 进行处理
      node_args: '-r ./setup.js',
      // 修改日志文件保存位置
      // 默认全局，可根据实际情况修改
      log_file: resolve(__dirname, 'run/logs/all.log'),
      out_file: resolve(__dirname, 'run/logs/out.log'),
      error_file: resolve(__dirname, 'run/logs/err.log'),
      pid_file: resolve(__dirname, 'run/pm2.pid'),
      // 启动的应用实例数量
      instances: 1,
      // 当应用意外退出，自动重启应用
      autorestart: true,
      // nodejs 的应用基本上不需要太大的内存占用
      // 可以根据服务器自身的条件进行设置
      max_memory_restart: '128G',
      // 基本上使用 pm2 就是为了生产环境用
      // 开发环境基本都是用 nodemon 或其他代替
      // 所以直接设置 production 就可以了
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
```

### 4. 安装依赖

进入工程目录

```bash
# 仅安装生产依赖, 进入到工程目录执行
$ npm install --production
```

### 5. 启动应用

应用启动完成，使用 `pm2 show <appName>` 或 `pm2 list` 查看应用状态，使用 `pm2 log` 查看启动日志 

```bash
# 直接 start 配置文件就可以了，不需要加其他参数
# 应用启动后如果 status 字段非 online 那就代表启动失败了
$ pm2 start ecosystem.config.js

# 查看应用列表
$ pm2 list
```

更多 [pm2][pm2] 命令请查看官网文档。

## 其他方式部署

还可以选用其他方式部署应用，但最简单的还是 `pm2`，主要是其提供了众多的 api 和管理方面做的比较好

* docker 部署
* more

[nodejs]: https://nodejs.org/zh-cn/
[pm2]: https://pm2.keymetrics.io/
[typescript]: https://www.typescriptlang.org/
