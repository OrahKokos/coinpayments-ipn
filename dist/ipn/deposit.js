"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDepositIPN = void 0;
var constants_1 = require("../constants");
var isDepositIPN = function (verifiedIPN) {
    return verifiedIPN.ipn_type === constants_1.IPN_TYPES_ENUM.DEPOSIT;
};
exports.isDepositIPN = isDepositIPN;
//# sourceMappingURL=deposit.js.map