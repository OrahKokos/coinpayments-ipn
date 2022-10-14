import { IPN_TYPES_ENUM } from '../constants'
import {
  BaseIPNFields,
  ShippingInformationFields,
  PaymentStatusFields,
  BuyerInformationFields,
  CoinpaymentsIPN
} from '../types'

// Simple button
export type SimpleButtonFields = {
  ipn_type: typeof IPN_TYPES_ENUM.SIMPLE
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
  item_desc?: string
  item_number?: string
  invoice?: string
  custom?: string
  on1?: string
  ov1?: string
  on2?: string
  ov2?: string
}

export type SimpleButtonIPN = BaseIPNFields &
  ShippingInformationFields &
  PaymentStatusFields &
  BuyerInformationFields &
  SimpleButtonFields

export const isSimpleButtonIPN = (verifiedIPN: CoinpaymentsIPN): verifiedIPN is SimpleButtonIPN =>
  verifiedIPN.ipn_type === IPN_TYPES_ENUM.SIMPLE
