import { PAYMENT_STATUS_CHECKS } from './constants'
import { ApiIPN } from './ipn/api'
import { AdvancedButtonIPN } from './ipn/button'
import { CartIPN } from './ipn/cart'
import { DespositIPN, DepositPaymentFields } from './ipn/deposit'
import { DonationButtonIPN } from './ipn/donation'
import { SimpleButtonIPN } from './ipn/simple'
import { WithdrawalIPN, isWithdrawalIPN, WITHDRAWAL_PAYMENT_STATUS_CHECKS } from './ipn/withdrawal'
import { PaymentStatusFields, CoinpaymentsIPN } from './types'
import { isNegativeNumber } from './util'

function isPaymentSuccessful(verifiedIpn: ApiIPN): verifiedIpn is ApiIPN & Required<PaymentStatusFields>
function isPaymentSuccessful(
  verifiedIpn: SimpleButtonIPN
): verifiedIpn is SimpleButtonIPN & Required<PaymentStatusFields>
function isPaymentSuccessful(
  verifiedIpn: AdvancedButtonIPN
): verifiedIpn is AdvancedButtonIPN & Required<PaymentStatusFields>
function isPaymentSuccessful(verifiedIpn: CartIPN): verifiedIpn is CartIPN & Required<PaymentStatusFields>
function isPaymentSuccessful(
  verifiedIpn: DonationButtonIPN
): verifiedIpn is DonationButtonIPN & Required<PaymentStatusFields>
function isPaymentSuccessful(verifiedIpn: DespositIPN): verifiedIpn is DespositIPN & Required<DepositPaymentFields>
function isPaymentSuccessful(verifiedIpn: WithdrawalIPN): verifiedIpn is WithdrawalIPN
function isPaymentSuccessful(
  verifiedIpn: CoinpaymentsIPN
): verifiedIpn is CoinpaymentsIPN & (Required<PaymentStatusFields> | Required<DepositPaymentFields> | CoinpaymentsIPN)
function isPaymentSuccessful(verifiedIpn) {
  // withdrawal codes are special
  if (isWithdrawalIPN(verifiedIpn)) return WITHDRAWAL_PAYMENT_STATUS_CHECKS.COMPLETE(verifiedIpn.status)
  return PAYMENT_STATUS_CHECKS.COMPLETE(verifiedIpn.status)
}

const isPaymentPending = (verifiedIpn: CoinpaymentsIPN) => {
  // withdrawal codes are special
  if (isWithdrawalIPN(verifiedIpn)) {
    return (
      WITHDRAWAL_PAYMENT_STATUS_CHECKS.WAITING_FOR_EMAIL_CONFIRMATION(verifiedIpn.status) ||
      WITHDRAWAL_PAYMENT_STATUS_CHECKS.PENDING(verifiedIpn.status)
    )
  }
  return verifiedIpn.status >= 0 && verifiedIpn.status < 100
}

const isPaymentUnsuccessful = (verifiedIpn: CoinpaymentsIPN) => isNegativeNumber(verifiedIpn.status)

function isPaymentComplete(verifiedIpn: ApiIPN): verifiedIpn is (ApiIPN & Required<PaymentStatusFields>) | ApiIPN
function isPaymentComplete(
  verifiedIpn: SimpleButtonIPN
): verifiedIpn is (SimpleButtonIPN & Required<PaymentStatusFields>) | SimpleButtonIPN
function isPaymentComplete(
  verifiedIpn: AdvancedButtonIPN
): verifiedIpn is (AdvancedButtonIPN & Required<PaymentStatusFields>) | AdvancedButtonIPN
function isPaymentComplete(verifiedIpn: CartIPN): verifiedIpn is (CartIPN & Required<PaymentStatusFields>) | CartIPN
function isPaymentComplete(
  verifiedIpn: DonationButtonIPN
): verifiedIpn is (DonationButtonIPN & Required<PaymentStatusFields>) | DonationButtonIPN
function isPaymentComplete(
  verifiedIpn: DespositIPN
): verifiedIpn is (DespositIPN & Required<DepositPaymentFields>) | DespositIPN
function isPaymentComplete(verifiedIpn: WithdrawalIPN): verifiedIpn is WithdrawalIPN
function isPaymentComplete(
  verifiedIpn: CoinpaymentsIPN
): verifiedIpn is CoinpaymentsIPN & (Required<PaymentStatusFields> | Required<DepositPaymentFields> | CoinpaymentsIPN)
function isPaymentComplete(verifiedIpn) {
  return isPaymentSuccessful(verifiedIpn) || isPaymentUnsuccessful(verifiedIpn)
}

export { isPaymentSuccessful, isPaymentPending, isPaymentUnsuccessful, isPaymentComplete }
