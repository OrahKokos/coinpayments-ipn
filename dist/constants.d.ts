export declare const IPN_TYPES_ENUM: {
    readonly SIMPLE: "simple";
    readonly BUTTON: "button";
    readonly DONATION: "donation";
    readonly CART: "cart";
    readonly DEPOSIT: "deposit";
    readonly WITHDRAWAL: "withdrawal";
    readonly CREATE_TRANSACTION: "create_transaction";
};
export declare const BASE_IPN_KEYS: {
    readonly VERSION: "ipn_version";
    readonly TYPE: "ipn_type";
    readonly MODE: "ipn_mode";
    readonly ID: "ipn_in";
    readonly MERCHANT: "merchant";
};
export declare const IPN_DEFAULTS: {
    readonly ipn_version: "1.0";
    readonly ipn_mode: "hmac";
};
export declare const PAYMENT_STATUS_CHECKS: {
    PAYPAL_REFUND: (n2: number) => boolean;
    CANCELLED: (n2: number) => boolean;
    WAITING: (n2: number) => boolean;
    CONFIRMED: (n2: number) => boolean;
    QUEUED: (n2: number) => boolean;
    PAYPAL_PENDING: (n2: number) => boolean;
    COMPLETE: (n2: number) => boolean;
};
