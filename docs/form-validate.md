# 表单验证

这里以登录接口为例，验证插件使用 [parameter][parameter]，规则编写请参考官方文件。

## 前置要求

[parameter][parameter] 可以验证任何有效的 `javascript` 对象，如果需要验证用户提交的表单数据需要先引入 [koa-bodyparser][koa-bodyparser] 插件

## 一、 编写验证规则

在 `app/contract/request` 目录，新建 `auth.ts` 文件:

```typescript
import { Rules } from '../../shared/parameter'

export const LoginFormRules: Rules = {
  username: {
    type: 'string',
    min: 4,
    trim: true,
    required: true,
  },
  password: {
    type: 'string',
    trim: true,
    required: true,
  },
}
```

## 二、编写控制器

在 `app/modules/api/endpoints` 目录，新建 `auth.ts` 文件:

```javascript
// 引入表单验证规则
import { LoginFormRules } from '../../../contract/request/auth'

export async function login(ctx) {
  // 获取表单数据
  // ctx.request.body 是 koa-bodyparser 解析后设置的
  const formData = ctx.request.body

  // 进行表单验证，如果验证失败会直接抛出异常
  // validate 方法定义在 app/extend/context.js 文件中
  // 内部会调用 parameter 模块的 validate 方法
  ctx.validate(LoginFormRules, formData)

  // 进行其他操作
}
```

这样一个请求的表单验证的功能就添加完成了

[parameter]: https://github.com/node-modules/parameter
[koa-bodyparser]: https://github.com/koajs/bodyparser
