import { BaseIPNFields, PaymentStatusFields, CoinpaymentsIPN } from '../types';
export declare type ApiFields = {
    ipn_type: 'create_transaction';
    txn_id: string;
    currency1: string;
    currency2: string;
    amount1: string;
    amount2: string;
    fee: string;
    buyer_name?: string;
    email?: string;
    item_name?: string;
    item_number?: string;
    invoice?: string;
    custom?: string;
};
export declare type ApiIPN = BaseIPNFields & PaymentStatusFields & ApiFields;
export declare const isApiIPN: (verifiedIPN: CoinpaymentsIPN) => verifiedIPN is ApiIPN;
