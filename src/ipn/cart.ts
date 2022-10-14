import { IPN_TYPES_ENUM } from '../constants'
import {
  BaseIPNFields,
  PaymentStatusFields,
  BuyerInformationFields,
  ShippingInformationFields,
  CoinpaymentsIPN
} from '../types'

// Cart
export type CartFields = {
  ipn_type: typeof IPN_TYPES_ENUM.CART
  txn_id: string
  currency1: string
  currency2: string
  amount1: string
  amount2: string
  subtotal: string
  shipping: string
  tax: string
  fee: string
  [key: `item_name_${number}`]: string
  [key: `item_amount_${number}`]: string
  [key: `item_quantity_${number}`]: string
  [key: `item_number_${number}`]: string | undefined
  [key: `item_on1_${number}`]: string | undefined
  [key: `item_ov1_${number}`]: string | undefined
  [key: `item_on2_${number}`]: string | undefined
  [key: `item_ov2_${number}`]: string | undefined
  invoice?: string
  custom?: string
  extra?: string
}
export type CartIPN = BaseIPNFields &
  PaymentStatusFields &
  BuyerInformationFields &
  ShippingInformationFields &
  CartFields

export const isCartIPN = (verifiedIPN: CoinpaymentsIPN): verifiedIPN is CartIPN =>
  verifiedIPN.ipn_type === IPN_TYPES_ENUM.CART
