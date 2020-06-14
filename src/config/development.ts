import { ListenOptions } from 'net'
import { ConfigureOptions } from 'nunjucks'

export = {
  proxy: false,
  view: {
    watch: true,
  } as ConfigureOptions,
  listen: {
    port: 8080,
  } as ListenOptions,
}
