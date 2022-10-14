/* eslint-disable @typescript-eslint/ban-types */
import { BASE_IPN_KEYS, IPN_TYPES_ENUM } from '../src/constants'
import { createIPN, FAKE_IPN_SECRET, generatePHPHMAC, PAYMENT_STATUS_ENUM } from './helper'
import {
  isAdvancedButtonIPN,
  isApiIPN,
  isCartIPN,
  isDepositIPN,
  isDonationButtonIPN,
  isIPNLike,
  isSimpleButtonIPN,
  isWithdrawalIPN,
  isPaymentComplete,
  isPaymentPending,
  isPaymentSuccessful,
  isPaymentUnsuccessful,
  verifyIPN
} from '../src'

describe('Coinpayments IPN tests', () => {
  describe('isIPNLike', () => {
    const someIPN = createIPN(IPN_TYPES_ENUM.SIMPLE)(PAYMENT_STATUS_ENUM.STANDARD.COMPLETE)
    const faultyInput = Object.values(BASE_IPN_KEYS).map((requiredKey) => {
      const { [requiredKey]: omitted, ...rest } = someIPN
      return [requiredKey, rest]
    })

    it.each(faultyInput)('should not pass for missing property %s', (_missingKey, faultyPayload) => {
      const result = isIPNLike(faultyPayload)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(Error)
      }
    })

    it('should not pass if given payload is not an object', () => {
      const result = isIPNLike('string')
      expect(result.success).toBe(false)
    })

    it('should only pass if all required fields are present + should type narrow to CoinpaymentsIPNLike', () => {
      const someIPN = createIPN(IPN_TYPES_ENUM.SIMPLE)(PAYMENT_STATUS_ENUM.STANDARD.COMPLETE)
      const result = isIPNLike(someIPN)
      expect(result.success).toBe(true)
      if (result.success) {
        result // CoinpaymentsParseSuccess<CoinpaymentsIPNLike>
        result.data // CoinpaymentsIPNLike
      }
    })
  })
  it('isSimpleButtonIPN', () => {
    const someIPN = createIPN(IPN_TYPES_ENUM.SIMPLE)(PAYMENT_STATUS_ENUM.STANDARD.COMPLETE)
    expect(isSimpleButtonIPN(someIPN)).toBe(true)
    if (isSimpleButtonIPN(someIPN)) {
      someIPN // SimpleButtonIPN
    }
  })
  it('isAdvancedButtonIPN', () => {
    const someIPN = createIPN(IPN_TYPES_ENUM.BUTTON)(PAYMENT_STATUS_ENUM.STANDARD.COMPLETE)
    expect(isAdvancedButtonIPN(someIPN)).toBe(true)
    if (isAdvancedButtonIPN(someIPN)) {
      someIPN // AdvancedButtonIPN
    }
  })
  it('isDepositIPN', () => {
    const someIPN = createIPN(IPN_TYPES_ENUM.DEPOSIT)(PAYMENT_STATUS_ENUM.STANDARD.COMPLETE)
    expect(isDepositIPN(someIPN)).toBe(true)
    if (isDepositIPN(someIPN)) {
      someIPN // DespositIPN
    }
  })
  it('isCartIPN', () => {
    const someIPN = createIPN(IPN_TYPES_ENUM.CART)(PAYMENT_STATUS_ENUM.STANDARD.COMPLETE)
    expect(isCartIPN(someIPN)).toBe(true)
    if (isCartIPN(someIPN)) {
      someIPN // CartIPN
    }
  })
  it('isDonationButtonIPN', () => {
    const someIPN = createIPN(IPN_TYPES_ENUM.DONATION)(PAYMENT_STATUS_ENUM.STANDARD.COMPLETE)
    expect(isDonationButtonIPN(someIPN)).toBe(true)
    if (isDonationButtonIPN(someIPN)) {
      someIPN // DonationButtonIPN
    }
  })
  it('isWithdrawalIPN', () => {
    const someIPN = createIPN(IPN_TYPES_ENUM.WITHDRAWAL)(PAYMENT_STATUS_ENUM.STANDARD.COMPLETE)
    expect(isWithdrawalIPN(someIPN)).toBe(true)
    if (isWithdrawalIPN(someIPN)) {
      someIPN // WithdrawalIPN
    }
  })
  it('isApiIPN', () => {
    const someIPN = createIPN(IPN_TYPES_ENUM.CREATE_TRANSACTION)(PAYMENT_STATUS_ENUM.STANDARD.COMPLETE)
    expect(isApiIPN(someIPN)).toBe(true)
    if (isApiIPN(someIPN)) {
      someIPN // ApiIPN
    }
  })

  describe('Payments', () => {
    const simpleIPNCancelled = createIPN(IPN_TYPES_ENUM.SIMPLE)(PAYMENT_STATUS_ENUM.STANDARD.CANCELLED)
    const simpleIPNRefund = createIPN(IPN_TYPES_ENUM.SIMPLE)(PAYMENT_STATUS_ENUM.STANDARD.REFUND)
    const simpleIPNConfirm = createIPN(IPN_TYPES_ENUM.SIMPLE)(PAYMENT_STATUS_ENUM.STANDARD.CONFIRM)
    const simpleIPNComplete = createIPN(IPN_TYPES_ENUM.SIMPLE)(PAYMENT_STATUS_ENUM.STANDARD.COMPLETE)
    const simpleIPNPending = createIPN(IPN_TYPES_ENUM.SIMPLE)(PAYMENT_STATUS_ENUM.STANDARD.PENDING)
    const simpleIPNQueue = createIPN(IPN_TYPES_ENUM.SIMPLE)(PAYMENT_STATUS_ENUM.STANDARD.QUEUE)
    const simpleIPNWaiting = createIPN(IPN_TYPES_ENUM.SIMPLE)(PAYMENT_STATUS_ENUM.STANDARD.WAITING)

    const withdrawalIPNFail = createIPN(IPN_TYPES_ENUM.WITHDRAWAL)(PAYMENT_STATUS_ENUM.WITHDRAWAL.FAIL)
    const withdrawalIPNPending = createIPN(IPN_TYPES_ENUM.WITHDRAWAL)(PAYMENT_STATUS_ENUM.WITHDRAWAL.PENDING)
    const withdrawalIPNWaiting = createIPN(IPN_TYPES_ENUM.WITHDRAWAL)(PAYMENT_STATUS_ENUM.WITHDRAWAL.WAITING)
    const withdrawalIPNSuccess = createIPN(IPN_TYPES_ENUM.WITHDRAWAL)(PAYMENT_STATUS_ENUM.WITHDRAWAL.SUCCESS)
    it('isPaymentUnsuccessful', () => {
      // Withdrawals have special status
      expect(isPaymentUnsuccessful(withdrawalIPNFail)).toBe(true)
      expect(isPaymentUnsuccessful(withdrawalIPNPending)).toBe(false)
      expect(isPaymentUnsuccessful(withdrawalIPNWaiting)).toBe(false)
      expect(isPaymentUnsuccessful(withdrawalIPNSuccess)).toBe(false)
      // everyone else
      expect(isPaymentUnsuccessful(simpleIPNCancelled)).toBe(true)
      expect(isPaymentUnsuccessful(simpleIPNRefund)).toBe(true)
      expect(isPaymentUnsuccessful(simpleIPNComplete)).toBe(false)
      expect(isPaymentUnsuccessful(simpleIPNConfirm)).toBe(false)
      expect(isPaymentUnsuccessful(simpleIPNPending)).toBe(false)
      expect(isPaymentUnsuccessful(simpleIPNQueue)).toBe(false)
      expect(isPaymentUnsuccessful(simpleIPNWaiting)).toBe(false)
    })
    it('isPaymentPending', () => {
      // Withdrawals have special status
      expect(isPaymentPending(withdrawalIPNFail)).toBe(false)
      expect(isPaymentPending(withdrawalIPNPending)).toBe(true)
      expect(isPaymentPending(withdrawalIPNWaiting)).toBe(true)
      expect(isPaymentPending(withdrawalIPNSuccess)).toBe(false)
      // everyone else
      expect(isPaymentPending(simpleIPNCancelled)).toBe(false)
      expect(isPaymentPending(simpleIPNRefund)).toBe(false)
      expect(isPaymentPending(simpleIPNComplete)).toBe(false)
      expect(isPaymentPending(simpleIPNConfirm)).toBe(true)
      expect(isPaymentPending(simpleIPNPending)).toBe(true)
      expect(isPaymentPending(simpleIPNQueue)).toBe(true)
      expect(isPaymentPending(simpleIPNWaiting)).toBe(true)
    })
    it('isPaymentSuccessful', () => {
      // Withdrawals have special status
      expect(isPaymentSuccessful(withdrawalIPNFail)).toBe(false)
      expect(isPaymentSuccessful(withdrawalIPNPending)).toBe(false)
      expect(isPaymentSuccessful(withdrawalIPNWaiting)).toBe(false)
      expect(isPaymentSuccessful(withdrawalIPNSuccess)).toBe(true)
      // everyone else
      expect(isPaymentSuccessful(simpleIPNCancelled)).toBe(false)
      expect(isPaymentSuccessful(simpleIPNRefund)).toBe(false)
      expect(isPaymentSuccessful(simpleIPNComplete)).toBe(true)
      expect(isPaymentSuccessful(simpleIPNConfirm)).toBe(false)
      expect(isPaymentSuccessful(simpleIPNPending)).toBe(false)
      expect(isPaymentSuccessful(simpleIPNQueue)).toBe(false)
      expect(isPaymentSuccessful(simpleIPNWaiting)).toBe(false)
    })
    it('isPaymentComplete', () => {
      // Withdrawals have special status
      expect(isPaymentComplete(withdrawalIPNFail)).toBe(true)
      expect(isPaymentComplete(withdrawalIPNPending)).toBe(false)
      expect(isPaymentComplete(withdrawalIPNWaiting)).toBe(false)
      expect(isPaymentComplete(withdrawalIPNSuccess)).toBe(true)
      // everyone else
      expect(isPaymentComplete(simpleIPNCancelled)).toBe(true)
      expect(isPaymentComplete(simpleIPNRefund)).toBe(true)
      expect(isPaymentComplete(simpleIPNComplete)).toBe(true)
      expect(isPaymentComplete(simpleIPNConfirm)).toBe(false)
      expect(isPaymentComplete(simpleIPNPending)).toBe(false)
      expect(isPaymentComplete(simpleIPNQueue)).toBe(false)
      expect(isPaymentComplete(simpleIPNWaiting)).toBe(false)
    })
    describe('Payments should type narrow specific cases', () => {
      it('Standard payment use case', () => {
        if (isSimpleButtonIPN(simpleIPNComplete)) {
          if (!isPaymentSuccessful(simpleIPNComplete)) {
            expect(simpleIPNComplete.send_tx).not.toBeDefined() // string | undefined
            expect(simpleIPNComplete.received_amount).not.toBeDefined() // string | undefined
            expect(simpleIPNComplete.received_confirms).not.toBeDefined() // string | undefined
          }
          expect(simpleIPNComplete.send_tx).toBeDefined() // string
          expect(simpleIPNComplete.received_amount).toBeDefined() // string
          expect(simpleIPNComplete.received_confirms).toBeDefined() // string
        }
      })
      it('Withdrawal payment use case', () => {
        if (isWithdrawalIPN(withdrawalIPNSuccess)) {
          if (isPaymentSuccessful(withdrawalIPNSuccess)) {
            expect(withdrawalIPNSuccess).not.toHaveProperty('send_tx') // string | undefined
            expect(withdrawalIPNSuccess).not.toHaveProperty('received_amount') // string | undefined
            expect(withdrawalIPNSuccess).not.toHaveProperty('received_confirms') // string | undefined
          }
          expect(withdrawalIPNSuccess).not.toHaveProperty('send_tx') // string | undefined
          expect(withdrawalIPNSuccess).not.toHaveProperty('received_amount') // string | undefined
          expect(withdrawalIPNSuccess).not.toHaveProperty('received_confirms') // string | undefined
        }
      })
      it('Deposit payment use case', () => {
        const depositIPNSuccess = createIPN(IPN_TYPES_ENUM.DEPOSIT)(PAYMENT_STATUS_ENUM.STANDARD.COMPLETE)
        if (isDepositIPN(depositIPNSuccess)) {
          if (!isPaymentSuccessful(depositIPNSuccess)) {
            expect(depositIPNSuccess.fee).not.toBeDefined() // string
            expect(depositIPNSuccess.feei).not.toBeDefined() // string
            expect(depositIPNSuccess.fiat_fee).not.toBeDefined() // string
            expect(depositIPNSuccess.fiat_feei).not.toBeDefined() // string
          }
          expect(depositIPNSuccess.fee).toBeDefined() // string
          expect(depositIPNSuccess.feei).toBeDefined() // string
          expect(depositIPNSuccess.fiat_fee).toBeDefined() // string
          expect(depositIPNSuccess.fiat_feei).toBeDefined() // string
        }
      })
    })
  })

  describe('verifyIPN', () => {
    it('Should not work when IPN SECRET is empty', () => {
      const cartIPNPending = createIPN(IPN_TYPES_ENUM.CART)(PAYMENT_STATUS_ENUM.STANDARD.PENDING)
      const givenHmac = generatePHPHMAC(FAKE_IPN_SECRET)(cartIPNPending)
      const result = verifyIPN('')(givenHmac)(cartIPNPending)
      expect(result.success).toBe(false)
    })
    it('Should not work when HMAC is empty', () => {
      const cartIPNPending = createIPN(IPN_TYPES_ENUM.CART)(PAYMENT_STATUS_ENUM.STANDARD.PENDING)
      const result = verifyIPN(FAKE_IPN_SECRET)('')(cartIPNPending)
      expect(result.success).toBe(false)
    })
    it('Should work when signed with same IPN SECRET', () => {
      const cartIPNPending = createIPN(IPN_TYPES_ENUM.CART)(PAYMENT_STATUS_ENUM.STANDARD.PENDING)
      const givenHmac = generatePHPHMAC(FAKE_IPN_SECRET)(cartIPNPending)
      const result = verifyIPN(FAKE_IPN_SECRET)(givenHmac)(cartIPNPending)
      expect(result.success).toBe(true)
    })
    it('Should not work when signed with same different IPN SECRET', () => {
      const cartIPNPending = createIPN(IPN_TYPES_ENUM.CART)(PAYMENT_STATUS_ENUM.STANDARD.PENDING)
      const givenHmac = generatePHPHMAC(FAKE_IPN_SECRET + '1')(cartIPNPending)
      const result = verifyIPN(FAKE_IPN_SECRET)(givenHmac)(cartIPNPending)
      expect(result.success).toBe(false)
    })
  })
})
