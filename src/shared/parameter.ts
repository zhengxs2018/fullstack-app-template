// @ts-ignore
import Parameter from 'parameter'

export interface RawRule<T> {
  type: string
  convertType: string
  default: T | null
  widelyUndefined: boolean
  required: boolean
}

export interface StringRule extends RawRule<string> {
  type: 'string'
  allowEmpty: boolean
  format: RegExp
  min: number
  max: number
  length: number
  trim: boolean
  convertType: 'string'
}

export interface NumberRule extends RawRule<number> {
  type: 'number'
  min: number
  max: number
  convertType: 'number'
}

export interface IntRule extends Omit<Omit<NumberRule, 'type'>, 'convertType'> {
  type: 'int'
  convertType: 'int'
}

export interface BooleanRule extends RawRule<boolean> {
  type: 'boolean'
  convertType: 'boolean'
}

export interface DateRule extends RawRule<Date | string | number> {
  type: 'date'
  convertType: 'string'
}

export interface DateTimeRule extends RawRule<Date | string | number> {
  type: 'dateTime'
  convertType: 'string'
}

export interface IDRule extends Omit<StringRule, 'type'> {
  type: 'id'
}

export interface EmailRule extends Omit<StringRule, 'type'> {
  type: 'email'
  allowEmpty: boolean
}

export interface PasswordRule extends Omit<StringRule, 'type'> {
  type: 'password'
  compare: null | ((...args: unknown[]) => boolean)
}

export interface URLRule extends Omit<StringRule, 'type'> {
  type: 'url'
}

export interface EnumRule extends RawRule<string> {
  type: 'enum'
  values: string[]
}

export interface ObjectRule<T extends Record<string, unknown>> extends RawRule<T> {
  type: 'object'
  values: string[]
}

export interface ArrayRule<T> extends RawRule<T[]> {
  type: 'array'
  itemType: Rule['type']
  rule: Rule | Rules
  min: number
  max: number
}

export type Rule =
  | NumberRule
  | IntRule
  | BooleanRule
  | StringRule
  | DateRule
  | DateTimeRule
  | EmailRule
  | IDRule
  | PasswordRule
  | URLRule
  | EnumRule
  | ObjectRule<Record<string, unknown>>
  | ArrayRule<unknown>

export type Rules = Record<string, Partial<Rule>>

export interface ValidateResult {
  message: string
  field: string
  code: string
}

const parameter = new Parameter({
  validateRoot: true,
  widelyUndefined: true,
})

export default parameter
