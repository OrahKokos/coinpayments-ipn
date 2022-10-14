import { IPN_TYPES_ENUM } from '../constants';
import { BaseIPNFields, ShippingInformationFields, PaymentStatusFields, BuyerInformationFields, CoinpaymentsIPN } from '../types';
export declare type DonationButtonFields = {
    ipn_type: typeof IPN_TYPES_ENUM.DONATION;
    txn_id: string;
    currency1: string;
    currency2: string;
    amount1: string;
    amount2: string;
    subtotal: string;
    shipping: string;
    tax: string;
    fee: string;
    net: string;
    item_name: string;
    item_number: string;
    invoice?: string;
    custom?: string;
    on1?: string;
    ov1?: string;
    on2?: string;
    ov2?: string;
    extra?: string;
};
export declare type DonationButtonIPN = BaseIPNFields & ShippingInformationFields & PaymentStatusFields & BuyerInformationFields & DonationButtonFields;
export declare const isDonationButtonIPN: (verifiedIPN: CoinpaymentsIPN) => verifiedIPN is DonationButtonIPN;
