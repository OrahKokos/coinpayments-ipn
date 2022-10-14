import { IPN_TYPES_ENUM } from '../constants'
import {
  BaseIPNFields,
  ShippingInformationFields,
  PaymentStatusFields,
  BuyerInformationFields,
  CoinpaymentsIPN
} from '../types'

// Advanced button
export type AdvancedButtonFields = {
  ipn_type: typeof IPN_TYPES_ENUM.BUTTON
  txn_id: string
  currency1: string
  currency2: string
  amount1: string
  amount2: string
  subtotal: string
  shipping: string
  tax: string
  fee: string
  net: string
  item_amount: string
  item_name: string
  quantity: string
  item_number: string
  invoice?: string
  custom?: string
  on1?: string
  ov1?: string
  on2?: string
  ov2?: string
  extra?: string
}

export type AdvancedButtonIPN = BaseIPNFields &
  ShippingInformationFields &
  PaymentStatusFields &
  BuyerInformationFields &
  AdvancedButtonFields

export const isAdvancedButtonIPN = (verifiedIPN: CoinpaymentsIPN): verifiedIPN is AdvancedButtonIPN =>
  verifiedIPN.ipn_type === IPN_TYPES_ENUM.BUTTON
