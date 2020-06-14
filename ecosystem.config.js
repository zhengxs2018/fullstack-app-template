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
      // 开发环境基本都是用 nodemon 代替
      // 所以直接设置 production 就可以了
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
