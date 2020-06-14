import toSafeInteger from 'lodash/toSafeInteger'

const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn<T>(target: T, key: string | number | symbol): key is keyof T {
  return hasOwnProperty.call(target, key)
}

export function toPage(value?: number | string): number {
  return Math.max(toSafeInteger(value || 1), 1)
}

export function toPageSize(value?: number | string): number {
  return Math.min(toPage(value || 10), 500)
}
