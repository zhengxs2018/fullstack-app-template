const { dirname, join } = require('path')

const { deferConfig } = require('config/defer')

const toInteger = require('lodash/toInteger')

const pkg = require('../package.json')

module.exports = {
  proxy: false,
  keys: ['7baec477dfb106dc4c194d7f4d15b29583e5932e', 'e6dca5fdbd70f605539f13157b006ee0660e960a'],
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0
  },
  session: {
    prefix: 'sess'
  },
  swagger: {
    definition: {
      host: deferConfig(function resolver() {
        return `http://127.0.0.1:${this.listen.port}`
      }),
      info: {
        title: pkg.name,
        version: pkg.version,
        description: pkg.description
      },
      jsonEditor: false
    },
    apis: [
      join(__dirname, '../app/contract/**/*.{js,yaml}')
    ]
  },
  // 静态路径
  paths: {
    // 项目根目录
    rootDir: dirname(__dirname),
    // 运行目录
    runDir: deferConfig(function resolver() {
      return join(this.paths.rootDir, 'run')
    }),
  },
  view: {
    throwOnUndefined: true,
  },
  listen: {
    port: toInteger(process.env.PORT || 8080),
  }
}
