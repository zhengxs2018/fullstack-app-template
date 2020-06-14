/**
 * 用户登录表单验证规则
 */
const LoginFormRules = {
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
const RegisterFormRules = {
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

const RegisterInputFields = Object.keys(RegisterFormRules)

module.exports = {
  LoginFormRules,
  RegisterFormRules,
  RegisterInputFields,
}
