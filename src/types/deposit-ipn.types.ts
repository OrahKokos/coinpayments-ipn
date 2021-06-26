import { ParsedUrlQueryInput } from 'querystring';
import { BaseIPN, IPN_TYPES, withCurrency } from './common.types';

export type withDepositExtras = {
  dest_tag?: string;
  confirms: number;
  fee?: string; // The fee deducted by CoinPayments (only sent when status >= 100)
  feei?: string; // The fee deducted by CoinPayments in Satoshis (only sent when status >= 100)
  fiat_coin: string; // The ticker code of the fiat currency you selected on the Merchant Settings tab of the Account Settings page (USD, EUR, etc.) Make sure to check this for accuracy for security in your IPN handler! Huh?
  fiat_amount: string; // The total amount of the payment in the fiat currency you selected on the Merchant Settings tab of the Account Settings page.
  fiat_amounti: string; // The total amount of the payment in the fiat currency you selected in Satoshis
  fiat_fee?: string; // The fee deducted by CoinPayments in the fiat currency you selected (only sent when status >= 100)
  fiat_feei?: string; // The fee deducted by CoinPayments in the fiat currency you selected in Satoshis (only sent when status >= 100)
  label?: string; // The address label if you have one set
};

export type DepositIPNLike = BaseIPN & {
  type: IPN_TYPES.DEPOSIT;
} & ParsedUrlQueryInput;

export type DepositIPN = DepositIPNLike & withCurrency & withDepositExtras;
