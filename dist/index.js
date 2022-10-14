"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPaymentUnsuccessful = exports.isPaymentSuccessful = exports.isPaymentPending = exports.isPaymentComplete = exports.isWithdrawalIPN = exports.isSimpleButtonIPN = exports.isDonationButtonIPN = exports.isDepositIPN = exports.isCartIPN = exports.isAdvancedButtonIPN = exports.isApiIPN = exports.verifyIPN = exports.isIPNLike = void 0;
var api_1 = require("./ipn/api");
Object.defineProperty(exports, "isApiIPN", { enumerable: true, get: function () { return api_1.isApiIPN; } });
var button_1 = require("./ipn/button");
Object.defineProperty(exports, "isAdvancedButtonIPN", { enumerable: true, get: function () { return button_1.isAdvancedButtonIPN; } });
var cart_1 = require("./ipn/cart");
Object.defineProperty(exports, "isCartIPN", { enumerable: true, get: function () { return cart_1.isCartIPN; } });
var deposit_1 = require("./ipn/deposit");
Object.defineProperty(exports, "isDepositIPN", { enumerable: true, get: function () { return deposit_1.isDepositIPN; } });
var donation_1 = require("./ipn/donation");
Object.defineProperty(exports, "isDonationButtonIPN", { enumerable: true, get: function () { return donation_1.isDonationButtonIPN; } });
var simple_1 = require("./ipn/simple");
Object.defineProperty(exports, "isSimpleButtonIPN", { enumerable: true, get: function () { return simple_1.isSimpleButtonIPN; } });
var withdrawal_1 = require("./ipn/withdrawal");
Object.defineProperty(exports, "isWithdrawalIPN", { enumerable: true, get: function () { return withdrawal_1.isWithdrawalIPN; } });
var ipn_1 = require("./ipn");
Object.defineProperty(exports, "isIPNLike", { enumerable: true, get: function () { return ipn_1.isIPNLike; } });
var payment_1 = require("./payment");
Object.defineProperty(exports, "isPaymentComplete", { enumerable: true, get: function () { return payment_1.isPaymentComplete; } });
Object.defineProperty(exports, "isPaymentPending", { enumerable: true, get: function () { return payment_1.isPaymentPending; } });
Object.defineProperty(exports, "isPaymentSuccessful", { enumerable: true, get: function () { return payment_1.isPaymentSuccessful; } });
Object.defineProperty(exports, "isPaymentUnsuccessful", { enumerable: true, get: function () { return payment_1.isPaymentUnsuccessful; } });
var util_1 = require("./util");
var verifyIPN = function (ipnSecret) {
    return function (givenHMAC) {
        return function (unverifiedIpn) {
            if (!(0, util_1.isNonEmptyString)(ipnSecret))
                return {
                    success: false,
                    error: new Error('ipnSecret cannot be empty string'),
                    data: unverifiedIpn
                };
            if (!(0, util_1.isNonEmptyString)(givenHMAC))
                return {
                    success: false,
                    error: new Error('givenHMAC cannot be empty string'),
                    data: unverifiedIpn
                };
            var verify = (0, ipn_1.verifyHMAC)(ipnSecret)(givenHMAC);
            if (!verify(unverifiedIpn))
                return {
                    success: false,
                    data: unverifiedIpn,
                    error: new Error('Could not verify payload with given HMAC')
                };
            return {
                success: true,
                data: unverifiedIpn
            };
        };
    };
};
exports.verifyIPN = verifyIPN;
//# sourceMappingURL=index.js.map