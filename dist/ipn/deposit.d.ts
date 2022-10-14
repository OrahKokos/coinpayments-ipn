import { BaseIPNFields, PaymentStatusFields, BuyerInformationFields, ShippingInformationFields, CoinpaymentsIPN } from '../types';
export declare type DepositFields = {
    ipn_type: 'deposit';
    deposit_id: string;
    txn_id: string;
    address: string;
    dest_tag?: string;
    currency: string;
    confirms: string;
    amount: string;
    amounti: string;
    fiat_coin: string;
    fiat_amount: string;
    fiat_amounti: string;
    label?: string;
};
export declare type DepositPaymentFields = {
    fee?: string;
    feei?: string;
    fiat_fee?: string;
    fiat_feei?: string;
};
export declare type DespositIPN = BaseIPNFields & PaymentStatusFields & BuyerInformationFields & ShippingInformationFields & DepositFields & DepositPaymentFields;
export declare const isDepositIPN: (verifiedIPN: CoinpaymentsIPN) => verifiedIPN is DespositIPN;
