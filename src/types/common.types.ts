import { CoinpaymentIPNStatus } from './status.types';

export enum IPN_DATA {
  VERSION = '1.0',
  IPN_MODE = 'hmac',
}

export enum IPN_TYPES {
  SIMPLE = 'simple',
  BUTTON = 'button',
  DONATION = 'donation',
  CART = 'cart',
  API = 'api',
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

export type IPNType =
  | IPN_TYPES.SIMPLE
  | IPN_TYPES.BUTTON
  | IPN_TYPES.DONATION
  | IPN_TYPES.CART
  | IPN_TYPES.API
  | IPN_TYPES.DEPOSIT
  | IPN_TYPES.WITHDRAWAL;

export type BaseIPNRaw = {
  ipn_version: IPN_DATA.VERSION;
  ipn_mode: IPN_DATA.IPN_MODE;
  ipn_id: string; // The unique identifier of this IPN
  merchant: string; // Your merchant ID
  type: IPNType;
};

export type BaseIPN = {
  ipn_version: IPN_DATA.VERSION;
  ipn_mode: IPN_DATA.IPN_MODE;
  ipn_id: string; // The unique identifier of this IPN
  merchant: string; // Your merchant ID
};

export type withCommon = {
  status: CoinpaymentIPNStatus; // Numeric status of the payment
  status_text: string; // A text string describing the status of the payment
  send_tx?: string; // The TX ID of the payment to the merchant. Only included when 'status' >= 100 and if the payment mode is set to ASAP or Nightly or if the payment is PayPal Passthru.
  received_amount: string; // The amount of currency2 received at the time the IPN was generated.
  received_confirms: string; // The number of confirms of 'received_amount' at the time the IPN was generated.
};

export type withRequiredTX = {
  txn_id: string; // The unique ID of the payment.
};

export type withOptionalTX = {
  txn_id?: string; // The coin transaction ID of the withdrawal.
};

export type with2Currency = {
  currency1: string; // The original currency/coin submitted in your button.
  currency2: string; // The coin the buyer chose to pay with.
  amount1: string; // The total amount of the payment in your original currency/coin.
  amount2: string; // The total amount of the payment in the buyer's selected coin.
};

export type withSubtotal = {
  subtotal: string; // The subtotal of the order before shipping and tax in your original currency/coin.
};

export type withSingleItemOptions = {
  on1?: string; // 1st option name. This lets you pass through a buyer option like size or color.
  ov1?: string; // 1st option value. This would be the buyer's selection such as small, large, red, white.
  on2?: string; // 2nd option name. This lets you pass through a buyer option like size or color.
  ov2?: string; // 2nd option value. This would be the buyer's selection such as small, large, red, white.
};

export type withShippingFee = {
  shipping: string; // The shipping charged on the order in your original currency/coin.
};

export type withTax = {
  tax: string; // The tax on the order in your original currency/coin.
};
export type withFee = {
  fee: string; // The fee on the payment in the buyer's selected coin.
};
export type withNet = {
  net: string; // The net amount you received of the buyer's selected coin after our fee and any coin TX fees to send the coins to you.
};
export type withItemAmount = {
  item_amount: string; // The amount per-item in the original currency/coin.
};
export type withItemDesc = {
  item_desc?: string; // Description of the item that was purchased.
};

export type withSomeItemInfo = {
  item_name: string; // The name of the donation.
  item_number?: string; // This is a passthru variable for your own use. [not visible to donator/buyer]
};
export type withOptionalItemInfo = {
  item_name?: string; // The name of the item that was purchased.
  item_number?: string; // This is a passthru variable for your own use. [not visible to donator/buyer]
};
export type withInvoice = {
  invoice?: string; // This is a passthru variable for your own use. [not visible to donator/buyer]
};
export type withCustom = {
  custom?: string; // This is a passthru variable for your own use. [not visible to donator/buyer]
};
export type withExtra = {
  extra?: string; // This is a passthru variable for your own use. [not visible to donator/buyer]
};

export type withBuyerInfo = {
  buyer_name?: string; // The name of the buyer.
  email?: string; // Buyer's email address.
};

export type withBuyerInfoFull = {
  first_name: string; // Buyer's first name.
  last_name: string; // Buyer's last name.
  company?: string; // Buyer's company name.
  email: string; // Buyer's email address.
};

export type withBuyerShippingAddress = {
  address1?: string; // Buyer Street / address line 1
  address2?: string; // Buyer Street / address line 2
  city?: string; // Buyer city
  state?: string; // Buyer state/province
  zip?: string; // Buyer zipcode
  country?: string; // Buyer country ISO 3166
  country_name?: string; // Buyer country pretty
  phone?: string; // Buyer phone number
};
export type withCurrency = {
  address: string; // Coin address which was sent to.
  currency: string; // The coin the buyer paid with.
  amount: string; // The total amount of the payment
  amounti: string; // The total amount of the payment in Satoshis
};
