"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWithdrawalIPN = exports.WITHDRAWAL_PAYMENT_STATUS_CHECKS = void 0;
var constants_1 = require("../constants");
var util_1 = require("../util");
exports.WITHDRAWAL_PAYMENT_STATUS_CHECKS = {
    FAILED: util_1.isNegativeNumber,
    WAITING_FOR_EMAIL_CONFIRMATION: (0, util_1.isExactNumber)(0),
    PENDING: (0, util_1.isExactNumber)(1),
    COMPLETE: (0, util_1.isExactNumber)(2)
};
var isWithdrawalIPN = function (verifiedIPN) {
    return verifiedIPN.ipn_type === constants_1.IPN_TYPES_ENUM.WITHDRAWAL;
};
exports.isWithdrawalIPN = isWithdrawalIPN;
//# sourceMappingURL=withdrawal.js.map