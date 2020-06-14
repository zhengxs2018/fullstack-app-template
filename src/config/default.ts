import { ListenOptions } from 'net'
import { dirname, join } from 'path'

import { RedisOptions } from 'ioredis'
import { opts as SessionOptions } from 'koa-session'

import { Options as SwaggerOptions } from 'swagger-jsdoc'
import { ConfigureOptions } from 'nunjucks'

import { deferConfig } from 'config/defer'
import toInteger from 'lodash/toInteger'

const pkg = require('../../package.json')

export = {
  proxy: false,
  keys: ['7baec477dfb106dc4c194d7f4d15b29583e5932e', 'e6dca5fdbd70f605539f13157b006ee0660e960a'] as string[],
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
  } as RedisOptions,
  session: {
    prefix: 'sess',
  } as SessionOptions,
  swagger: {
    definition: {
      host: deferConfig(function resolver() {
        return `http://127.0.0.1:${this.listen.port}`
      }),
      info: {
        title: pkg.name,
        version: pkg.version,
        description: pkg.description,
      },
      jsonEditor: false,
    },
    apis: [join(__dirname, '../contract/**/*.yaml')],
  } as SwaggerOptions,
  // 静态路径
  paths: {
    // 项目根目录
    rootDir: dirname(dirname(__dirname)),
    // 运行目录
    runDir: deferConfig(function resolver() {
      return join(this.paths.rootDir, 'run')
    }),
  },
  view: {
    throwOnUndefined: true,
  } as ConfigureOptions,
  listen: {
    port: toInteger(process.env.PORT || 8080),
  } as ListenOptions,
}
