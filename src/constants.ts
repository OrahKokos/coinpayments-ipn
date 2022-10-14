import { isExactNumber } from './util'

export const IPN_TYPES_ENUM = {
  SIMPLE: 'simple',
  BUTTON: 'button',
  DONATION: 'donation',
  CART: 'cart',
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  CREATE_TRANSACTION: 'create_transaction'
} as const

export const BASE_IPN_KEYS = {
  VERSION: 'ipn_version',
  TYPE: 'ipn_type',
  MODE: 'ipn_mode',
  ID: 'ipn_in',
  MERCHANT: 'merchant'
} as const

export const IPN_DEFAULTS = {
  [BASE_IPN_KEYS.VERSION]: '1.0',
  [BASE_IPN_KEYS.MODE]: 'hmac'
} as const

export const PAYMENT_STATUS_CHECKS = {
  PAYPAL_REFUND: isExactNumber(-2),
  CANCELLED: isExactNumber(-1),
  WAITING: isExactNumber(0),
  CONFIRMED: isExactNumber(1),
  QUEUED: isExactNumber(2),
  PAYPAL_PENDING: isExactNumber(3),
  COMPLETE: isExactNumber(100)
}
