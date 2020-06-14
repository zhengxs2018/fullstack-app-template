const { join } = require('path')
const { writeFileSync } = require('fs')

const config = require('config')
const mkdirp = require('mkdirp')
const dotenv = require('dotenv')

// 加载环境变量
dotenv.config()

const runDir = config.get('paths.runDir')
const configMeta = {
  env: process.env.NODE_ENV
}

mkdirp.sync(runDir)

writeFileSync(join(runDir, 'application_config.json'), JSON.stringify(config, null, 2), { encoding: 'utf8' })
writeFileSync(join(runDir, 'application_config_meta.json'), JSON.stringify(configMeta, null, 2), { encoding: 'utf8' })
