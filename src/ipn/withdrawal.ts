import { IPN_TYPES_ENUM } from '../constants'
import { BaseIPNFields, PaymentStatusRequiredFields, CoinpaymentsIPN } from '../types'
import { isNegativeNumber, isExactNumber } from '../util'

// Numeric status of the withdrawal, currently <0 = failed, 0 = waiting email confirmation, 1 = pending, and 2 = sent/complete.
export const WITHDRAWAL_PAYMENT_STATUS_CHECKS = {
  FAILED: isNegativeNumber,
  WAITING_FOR_EMAIL_CONFIRMATION: isExactNumber(0),
  PENDING: isExactNumber(1),
  COMPLETE: isExactNumber(2)
}

// Withdrawal
export type WithdrawalFields = {
  ipn_type: typeof IPN_TYPES_ENUM.WITHDRAWAL
  id: string
  address: string
  txn_id?: string
  currency: string
  amount: string
  amounti: string
}

export type WithdrawalIPN = BaseIPNFields & PaymentStatusRequiredFields & WithdrawalFields

export const isWithdrawalIPN = (verifiedIPN: CoinpaymentsIPN): verifiedIPN is WithdrawalIPN =>
  verifiedIPN.ipn_type === IPN_TYPES_ENUM.WITHDRAWAL
