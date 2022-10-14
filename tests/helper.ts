import { randomUUID, createHmac } from 'crypto'
import { stringify } from 'querystring'
import { faker } from '@faker-js/faker'
import { IPN_TYPES_ENUM, IPN_DEFAULTS, BASE_IPN_KEYS } from '../src/constants'
import { ApiFields } from '../src/ipn/api'
import { AdvancedButtonFields } from '../src/ipn/button'
import { CartFields } from '../src/ipn/cart'
import { DepositFields, DepositPaymentFields } from '../src/ipn/deposit'
import { DonationButtonFields } from '../src/ipn/donation'
import { SimpleButtonFields } from '../src/ipn/simple'
import { WithdrawalFields } from '../src/ipn/withdrawal'
import {
  BaseIPNFields,
  BuyerInformationFields,
  ShippingInformationFields,
  IPN_TYPES,
  PaymentStatusFields,
  CoinpaymentsIPN
} from '../src/types'

export const createBaseIPNPartial = (): Omit<BaseIPNFields, typeof BASE_IPN_KEYS.TYPE> => ({
  [BASE_IPN_KEYS.MODE]: IPN_DEFAULTS[BASE_IPN_KEYS.MODE],
  [BASE_IPN_KEYS.VERSION]: IPN_DEFAULTS[BASE_IPN_KEYS.VERSION],
  [BASE_IPN_KEYS.MERCHANT]: faker.datatype.uuid(),
  [BASE_IPN_KEYS.ID]: faker.datatype.uuid()
})

export const createBuyerInfoIPNPartial = (): BuyerInformationFields => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  company: faker.company.name()
})

export const createShippingInfoIPNPartial = (): ShippingInformationFields => ({
  address1: faker.address.streetAddress(),
  address2: faker.address.secondaryAddress(),
  city: faker.address.city(),
  country: faker.address.countryCode(),
  country_name: faker.address.country(),
  phone: faker.phone.number(),
  state: faker.address.state(),
  zip: faker.address.zipCode()
})

export const IPNButtonArray: string[] = [
  IPN_TYPES_ENUM.SIMPLE,
  IPN_TYPES_ENUM.BUTTON,
  IPN_TYPES_ENUM.CART,
  IPN_TYPES_ENUM.DONATION
]
export const createSimpleButtonPartial = (): SimpleButtonFields => ({
  ipn_type: IPN_TYPES_ENUM.SIMPLE,
  txn_id: faker.datatype.uuid(),
  currency1: faker.finance.currencyCode(),
  currency2: faker.finance.currencyCode(),
  amount1: faker.commerce.price(),
  amount2: faker.commerce.price(),
  item_desc: faker.lorem.paragraph(),
  item_name: faker.commerce.productName(),
  tax: faker.commerce.price(),
  fee: faker.commerce.price(),
  net: faker.commerce.price(),
  item_amount: faker.finance.amount(),
  shipping: faker.commerce.price(),
  subtotal: faker.commerce.price(),
  custom: faker.lorem.sentence(),
  invoice: faker.datatype.uuid()
})

export const createAdvancedButtonPartial = (): AdvancedButtonFields => ({
  ipn_type: IPN_TYPES_ENUM.BUTTON,
  txn_id: faker.datatype.uuid(),
  currency1: faker.finance.currencyCode(),
  currency2: faker.finance.currencyCode(),
  amount1: faker.commerce.price(),
  amount2: faker.commerce.price(),
  shipping: faker.commerce.price(),
  subtotal: faker.commerce.price(),
  tax: faker.commerce.price(),
  fee: faker.commerce.price(),
  net: faker.commerce.price(),
  item_amount: faker.finance.amount(),
  item_name: faker.commerce.productName(),
  quantity: faker.finance.amount(),
  item_number: faker.finance.amount(),
  invoice: faker.datatype.uuid(),
  custom: faker.lorem.sentence()
})

export const createDonationIPNPartial = (): DonationButtonFields => ({
  ipn_type: IPN_TYPES_ENUM.DONATION,
  txn_id: faker.datatype.uuid(),
  currency1: faker.finance.currencyCode(),
  currency2: faker.finance.currencyCode(),
  amount1: faker.commerce.price(),
  amount2: faker.commerce.price(),
  shipping: faker.commerce.price(),
  subtotal: faker.commerce.price(),
  tax: faker.commerce.price(),
  fee: faker.commerce.price(),
  net: faker.commerce.price(),
  item_name: faker.commerce.productName(),
  item_number: faker.finance.amount(),
  invoice: faker.datatype.uuid(),
  custom: faker.lorem.sentence()
})

export const createCartIPNPartial = (): CartFields => ({
  ipn_type: IPN_TYPES_ENUM.CART,
  txn_id: faker.datatype.uuid(),
  currency1: faker.finance.currencyCode(),
  currency2: faker.finance.currencyCode(),
  amount1: faker.commerce.price(),
  amount2: faker.commerce.price(),
  shipping: faker.commerce.price(),
  subtotal: faker.commerce.price(),
  tax: faker.commerce.price(),
  fee: faker.commerce.price(),
  item_name_1: faker.commerce.productName(),
  item_amount_1: faker.finance.amount(),
  item_quantity_1: faker.finance.amount(),
  item_number_1: faker.finance.amount(),
  invoice: faker.datatype.uuid(),
  custom: faker.lorem.sentence()
})

export const createDepositIPNPartial = (): DepositFields => ({
  ipn_type: IPN_TYPES_ENUM.DEPOSIT,
  deposit_id: faker.datatype.uuid(),
  txn_id: faker.datatype.uuid(),
  address: faker.datatype.hexadecimal(),
  currency: faker.finance.currencyCode(),
  confirms: String(faker.datatype.number()),
  amount: faker.finance.amount(),
  amounti: faker.finance.amount(),
  fiat_coin: faker.finance.currencyCode(),
  fiat_amount: faker.finance.amount(),
  fiat_amounti: faker.finance.amount()
})

export const createWithdrawalIPNPartial = (): WithdrawalFields => ({
  ipn_type: IPN_TYPES_ENUM.WITHDRAWAL,
  id: faker.datatype.uuid(),
  address: faker.datatype.hexadecimal(),
  currency: faker.finance.currencyCode(),
  amount: faker.finance.amount(),
  amounti: faker.finance.amount()
})

export const createApiIPNPartial = (): ApiFields => ({
  ipn_type: IPN_TYPES_ENUM.CREATE_TRANSACTION,
  txn_id: faker.datatype.uuid(),
  currency1: faker.finance.currencyCode(),
  currency2: faker.finance.currencyCode(),
  amount1: faker.commerce.price(),
  amount2: faker.commerce.price(),
  fee: faker.commerce.price(),
  buyer_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  item_name: faker.commerce.productName(),
  item_number: faker.finance.amount(),
  invoice: faker.datatype.uuid(),
  custom: faker.lorem.sentence()
})

export const PAYMENT_STATUS_ENUM = {
  WITHDRAWAL: {
    FAIL: 'fail',
    WAITING: 'waiting',
    PENDING: 'pending',
    SUCCESS: 'success'
  },
  STANDARD: {
    REFUND: 'refund',
    CANCELLED: 'cancelled',
    WAITING: 'waiting',
    CONFIRM: 'confirm',
    QUEUE: 'queue',
    PENDING: 'pending',
    COMPLETE: 'complete'
  }
} as const

type WithdrawalPaymentStatusArg =
  typeof PAYMENT_STATUS_ENUM['WITHDRAWAL'][keyof typeof PAYMENT_STATUS_ENUM['WITHDRAWAL']]
type StandardPaymentStatusArg = typeof PAYMENT_STATUS_ENUM['STANDARD'][keyof typeof PAYMENT_STATUS_ENUM['STANDARD']]
type PaymentStatusArg = WithdrawalPaymentStatusArg | StandardPaymentStatusArg

export const createPaymentStatus = (type: IPN_TYPES) => (paymentStatus: PaymentStatusArg) => {
  if (type === IPN_TYPES_ENUM.WITHDRAWAL) {
    switch (paymentStatus) {
      case 'fail':
        return -1
      case 'waiting':
        return 0
      case 'pending':
        return 1
      case 'success':
        return 2
    }
  }
  switch (paymentStatus) {
    case 'refund':
      return -2
    case 'cancelled':
      return -1
    case 'waiting':
      return 0
    case 'confirm':
      return 1
    case 'queue':
      return 2
    case 'pending':
      return 3
    case 'complete':
      return 100
    default:
      return 0
  }
}
export const specialPaymentStatusArray: string[] = [IPN_TYPES_ENUM.WITHDRAWAL, IPN_TYPES_ENUM.DEPOSIT]

export const createPaymentStatusIPNPartial =
  (type: IPN_TYPES) =>
  (paymentStatus: PaymentStatusArg): PaymentStatusFields => {
    const paymentPartialArray: Array<Partial<PaymentStatusFields | DepositPaymentFields>> = [
      { status: createPaymentStatus(type)(paymentStatus), status_text: paymentStatus }
    ]
    if (type === IPN_TYPES_ENUM.DEPOSIT && paymentStatus === PAYMENT_STATUS_ENUM.STANDARD.COMPLETE) {
      paymentPartialArray.push({
        fee: faker.commerce.price(),
        feei: faker.commerce.price(),
        fiat_fee: faker.commerce.price(),
        fiat_feei: faker.commerce.price()
      })
    }
    if (!specialPaymentStatusArray.includes(type)) {
      paymentPartialArray.push({
        received_amount: faker.finance.amount(),
        received_confirms: faker.finance.amount(),
        send_tx: faker.datatype.hexadecimal()
      })
    }

    return paymentPartialArray.reduce((collector, IPNPartial) => {
      return (collector = {
        ...collector,
        ...IPNPartial
      })
    }, {}) as PaymentStatusFields
  }

type IPNPartialArray = Array<
  | Omit<BaseIPNFields, typeof BASE_IPN_KEYS.TYPE>
  | BuyerInformationFields
  | ShippingInformationFields
  | SimpleButtonFields
  | AdvancedButtonFields
  | DonationButtonFields
  | CartFields
  | DepositFields
  | WithdrawalFields
  | ApiFields
  | PaymentStatusFields
>

export const createIPN =
  (type: IPN_TYPES) =>
  (paymentStatus: PaymentStatusArg): CoinpaymentsIPN => {
    const IPNPartials: IPNPartialArray = []
    IPNPartials.push(createBaseIPNPartial())
    if (IPNButtonArray.includes(type)) {
      IPNPartials.push(createBuyerInfoIPNPartial())
      IPNPartials.push(createShippingInfoIPNPartial())
    }
    switch (type) {
      case IPN_TYPES_ENUM.SIMPLE:
        IPNPartials.push(createSimpleButtonPartial())
        break
      case IPN_TYPES_ENUM.BUTTON:
        IPNPartials.push(createAdvancedButtonPartial())
        break
      case IPN_TYPES_ENUM.DONATION:
        IPNPartials.push(createDonationIPNPartial())
        break
      case IPN_TYPES_ENUM.CART:
        IPNPartials.push(createCartIPNPartial())
        break
      case IPN_TYPES_ENUM.DEPOSIT:
        IPNPartials.push(createDepositIPNPartial())
        break
      case IPN_TYPES_ENUM.WITHDRAWAL:
        IPNPartials.push(createWithdrawalIPNPartial())
        break
      case IPN_TYPES_ENUM.CREATE_TRANSACTION:
        IPNPartials.push(createApiIPNPartial())
        break
    }
    IPNPartials.push(createPaymentStatusIPNPartial(type)(paymentStatus))
    return IPNPartials.reduce((collector, IPNPartial) => {
      return (collector = {
        ...collector,
        ...IPNPartial
      })
    }, {}) as CoinpaymentsIPN
  }

export const FAKE_IPN_SECRET = randomUUID()

export const generatePHPHMAC = (ipnSecret: string) => (ipn: CoinpaymentsIPN) =>
  createHmac('sha512', ipnSecret).update(stringify(ipn).replace(/%20/g, '+')).digest('hex')
