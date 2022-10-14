import { IPN_TYPES_ENUM } from '../constants'
import { BaseIPNFields, PaymentStatusFields, CoinpaymentsIPN } from '../types'

export type ApiFields = {
  ipn_type: typeof IPN_TYPES_ENUM.CREATE_TRANSACTION
  txn_id: string
  currency1: string
  currency2: string
  amount1: string
  amount2: string
  fee: string
  buyer_name?: string
  email?: string
  item_name?: string
  item_number?: string
  invoice?: string
  custom?: string
}

export type ApiIPN = BaseIPNFields & PaymentStatusFields & ApiFields

export const isApiIPN = (verifiedIPN: CoinpaymentsIPN): verifiedIPN is ApiIPN =>
  verifiedIPN.ipn_type === IPN_TYPES_ENUM.CREATE_TRANSACTION
