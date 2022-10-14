"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDonationButtonIPN = void 0;
var constants_1 = require("../constants");
var isDonationButtonIPN = function (verifiedIPN) {
    return verifiedIPN.ipn_type === constants_1.IPN_TYPES_ENUM.DONATION;
};
exports.isDonationButtonIPN = isDonationButtonIPN;
//# sourceMappingURL=donation.js.map