"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIPN = void 0;
var ipn_1 = require("./ipn");
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