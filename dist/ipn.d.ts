import { BASE_IPN_KEYS, IPN_DEFAULTS } from './constants';
import { IPN_TYPES, CoinpaymentsIPNLike, CoinpaymentsIPN, CoinpaymentsParseResult } from './types';
export declare const hasVersion: <T extends Record<PropertyKey, unknown>>(payload: T) => payload is T & {
    ipn_version: (typeof IPN_DEFAULTS)[typeof BASE_IPN_KEYS.VERSION];
};
export declare const hasMode: <T extends Record<PropertyKey, unknown>>(payload: T) => payload is T & {
    ipn_mode: (typeof IPN_DEFAULTS)[typeof BASE_IPN_KEYS.MODE];
};
export declare const hasId: <T extends Record<PropertyKey, unknown>>(payload: T) => payload is T & {
    ipn_in: string;
};
export declare const hasMerchant: <T extends Record<PropertyKey, unknown>>(payload: T) => payload is T & {
    merchant: string;
};
export declare const hasType: <T extends Record<PropertyKey, unknown>>(payload: T) => payload is T & {
    ipn_type: IPN_TYPES;
};
export declare const isIPNLike: (payload: unknown) => CoinpaymentsParseResult<unknown, CoinpaymentsIPNLike>;
export declare const verifyHMAC: (ipnSecret: string) => (givenHMAC: string) => (unverifiedIpn: CoinpaymentsIPNLike) => unverifiedIpn is CoinpaymentsIPN;
