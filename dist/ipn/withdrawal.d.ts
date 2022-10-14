import { IPN_TYPES_ENUM } from '../constants';
import { BaseIPNFields, PaymentStatusRequiredFields, CoinpaymentsIPN } from '../types';
export declare const WITHDRAWAL_PAYMENT_STATUS_CHECKS: {
    FAILED: (n: number) => boolean;
    WAITING_FOR_EMAIL_CONFIRMATION: (n2: number) => boolean;
    PENDING: (n2: number) => boolean;
    COMPLETE: (n2: number) => boolean;
};
export declare type WithdrawalFields = {
    ipn_type: typeof IPN_TYPES_ENUM.WITHDRAWAL;
    id: string;
    address: string;
    txn_id?: string;
    currency: string;
    amount: string;
    amounti: string;
};
export declare type WithdrawalIPN = BaseIPNFields & PaymentStatusRequiredFields & WithdrawalFields;
export declare const isWithdrawalIPN: (verifiedIPN: CoinpaymentsIPN) => verifiedIPN is WithdrawalIPN;
