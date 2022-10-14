export const isNegativeNumber = (n: number) => n < 0
export const isExactNumber = (n1: number) => (n2: number) => n1 === n2
export const isString = (s: unknown): s is string => typeof s === 'string'
export const isNonEmptyString = (s: unknown) => isString(s) && s.length > 0
export const isObject = (input: unknown): input is Record<PropertyKey, unknown> =>
  typeof input === 'object' && input !== null
export const hasProperty =
  <T extends Record<PropertyKey, unknown>>(input: T) =>
  (key: keyof T) =>
    Object.hasOwn(input, key)
