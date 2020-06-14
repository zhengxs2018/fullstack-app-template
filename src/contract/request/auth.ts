import { Rules } from '../../shared/parameter'

/**
 * 用户登录表单验证规则
 */
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

/**
 * 用户注册表单验证规则
 */
export const RegisterFormRules: Rules = {
  ...LoginFormRules,
  avatar: {
    type: 'url',
    trim: true,
    required: false,
  },
  nickname: {
    type: 'string',
    trim: true,
    required: false,
  },
}

/**
 * 注册输入数据字段
 */
export const RegisterInputFields = Object.keys(RegisterFormRules)
