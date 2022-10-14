"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYMENT_STATUS_CHECKS = exports.IPN_DEFAULTS = exports.BASE_IPN_KEYS = exports.IPN_TYPES_ENUM = void 0;
var util_1 = require("./util");
exports.IPN_TYPES_ENUM = {
    SIMPLE: 'simple',
    BUTTON: 'button',
    DONATION: 'donation',
    CART: 'cart',
    DEPOSIT: 'deposit',
    WITHDRAWAL: 'withdrawal',
    CREATE_TRANSACTION: 'create_transaction'
};
exports.BASE_IPN_KEYS = {
    VERSION: 'ipn_version',
    TYPE: 'ipn_type',
    MODE: 'ipn_mode',
    ID: 'ipn_in',
    MERCHANT: 'merchant'
};
exports.IPN_DEFAULTS = (_a = {},
    _a[exports.BASE_IPN_KEYS.VERSION] = '1.0',
    _a[exports.BASE_IPN_KEYS.MODE] = 'hmac',
    _a);
exports.PAYMENT_STATUS_CHECKS = {
    PAYPAL_REFUND: (0, util_1.isExactNumber)(-2),
    CANCELLED: (0, util_1.isExactNumber)(-1),
    WAITING: (0, util_1.isExactNumber)(0),
    CONFIRMED: (0, util_1.isExactNumber)(1),
    QUEUED: (0, util_1.isExactNumber)(2),
    PAYPAL_PENDING: (0, util_1.isExactNumber)(3),
    COMPLETE: (0, util_1.isExactNumber)(100)
};
//# sourceMappingURL=constants.js.map