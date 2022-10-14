import { isApiIPN } from './ipn/api'
import { isAdvancedButtonIPN } from './ipn/button'
import { isCartIPN } from './ipn/cart'
import { isDepositIPN } from './ipn/deposit'
import { isDonationButtonIPN } from './ipn/donation'
import { isSimpleButtonIPN } from './ipn/simple'
import { isWithdrawalIPN } from './ipn/withdrawal'
import { verifyHMAC, isIPNLike } from './ipn'
import { isPaymentComplete, isPaymentPending, isPaymentSuccessful, isPaymentUnsuccessful } from './payment'
import { CoinpaymentsIPN, CoinpaymentsIPNLike, CoinpaymentsParseResult } from './types'
import { isNonEmptyString } from './util'

const verifyIPN =
  (ipnSecret: string) =>
  (givenHMAC: string) =>
  (unverifiedIpn: CoinpaymentsIPNLike): CoinpaymentsParseResult<CoinpaymentsIPNLike, CoinpaymentsIPN> => {
    if (!isNonEmptyString(ipnSecret))
      return {
        success: false,
        error: new Error('ipnSecret cannot be empty string'),
        data: unverifiedIpn
      }
    if (!isNonEmptyString(givenHMAC))
      return {
        success: false,
        error: new Error('givenHMAC cannot be empty string'),
        data: unverifiedIpn
      }

    const verify = verifyHMAC(ipnSecret)(givenHMAC)
    if (!verify(unverifiedIpn))
      return {
        success: false,
        data: unverifiedIpn,
        error: new Error('Could not verify payload with given HMAC')
      }

    return {
      success: true,
      data: unverifiedIpn
    }
  }

export {
  isIPNLike,
  verifyIPN,
  isApiIPN,
  isAdvancedButtonIPN,
  isCartIPN,
  isDepositIPN,
  isDonationButtonIPN,
  isSimpleButtonIPN,
  isWithdrawalIPN,
  isPaymentComplete,
  isPaymentPending,
  isPaymentSuccessful,
  isPaymentUnsuccessful
}
