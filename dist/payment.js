"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPaymentComplete = exports.isPaymentUnsuccessful = exports.isPaymentPending = exports.isPaymentSuccessful = void 0;
var constants_1 = require("./constants");
var withdrawal_1 = require("./ipn/withdrawal");
var util_1 = require("./util");
function isPaymentSuccessful(verifiedIpn) {
    if ((0, withdrawal_1.isWithdrawalIPN)(verifiedIpn))
        return withdrawal_1.WITHDRAWAL_PAYMENT_STATUS_CHECKS.COMPLETE(verifiedIpn.status);
    return constants_1.PAYMENT_STATUS_CHECKS.COMPLETE(verifiedIpn.status);
}
exports.isPaymentSuccessful = isPaymentSuccessful;
var isPaymentPending = function (verifiedIpn) {
    if ((0, withdrawal_1.isWithdrawalIPN)(verifiedIpn)) {
        return (withdrawal_1.WITHDRAWAL_PAYMENT_STATUS_CHECKS.WAITING_FOR_EMAIL_CONFIRMATION(verifiedIpn.status) ||
            withdrawal_1.WITHDRAWAL_PAYMENT_STATUS_CHECKS.PENDING(verifiedIpn.status));
    }
    return verifiedIpn.status >= 0 && verifiedIpn.status < 100;
};
exports.isPaymentPending = isPaymentPending;
var isPaymentUnsuccessful = function (verifiedIpn) { return (0, util_1.isNegativeNumber)(verifiedIpn.status); };
exports.isPaymentUnsuccessful = isPaymentUnsuccessful;
function isPaymentComplete(verifiedIpn) {
    return isPaymentSuccessful(verifiedIpn) || isPaymentUnsuccessful(verifiedIpn);
}
exports.isPaymentComplete = isPaymentComplete;
//# sourceMappingURL=payment.js.map