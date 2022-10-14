import { IPN_TYPES_ENUM, BASE_IPN_KEYS } from './constants'
import { ApiIPN } from './ipn/api'
import { AdvancedButtonIPN } from './ipn/button'
import { CartIPN } from './ipn/cart'
import { DespositIPN } from './ipn/deposit'
import { DonationButtonIPN } from './ipn/donation'
import { SimpleButtonIPN } from './ipn/simple'
import { WithdrawalIPN } from './ipn/withdrawal'

export type IPN_TYPES = typeof IPN_TYPES_ENUM[keyof typeof IPN_TYPES_ENUM]

export type BaseIPNFields = {
  [BASE_IPN_KEYS.VERSION]: '1.0'
  [BASE_IPN_KEYS.MODE]: 'hmac'
  [BASE_IPN_KEYS.ID]: string
  [BASE_IPN_KEYS.MERCHANT]: string
  [BASE_IPN_KEYS.TYPE]: IPN_TYPES
}

export type BuyerInformationFields = {
  first_name: string
  last_name: string
  company?: string
  email: string
}

export type ShippingInformationFields = {
  address1?: string
  address2?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  country_name?: string
  phone?: string
}

export type PaymentStatusOptionalFields = {
  send_tx?: string
  received_amount?: string
  received_confirms?: string
}

export type PaymentStatusRequiredFields = {
  status: number
  status_text: string
}

export type PaymentStatusFields = PaymentStatusOptionalFields & PaymentStatusRequiredFields

export type CoinpaymentsIPNLike = BaseIPNFields & Record<PropertyKey, unknown>

export type CoinpaymentsIPN =
  | ApiIPN
  | WithdrawalIPN
  | DespositIPN
  | CartIPN
  | DonationButtonIPN
  | AdvancedButtonIPN
  | SimpleButtonIPN

export type CoinpaymentsParseFail<T> = {
  success: false
  error: Error
  data: T
}

export type CoinpaymentsParseSuccess<T> = {
  success: true
  data: T
}

export type CoinpaymentsParseResult<Input, Output> = CoinpaymentsParseSuccess<Output> | CoinpaymentsParseFail<Input>
