"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCartIPN = void 0;
var constants_1 = require("../constants");
var isCartIPN = function (verifiedIPN) {
    return verifiedIPN.ipn_type === constants_1.IPN_TYPES_ENUM.CART;
};
exports.isCartIPN = isCartIPN;
//# sourceMappingURL=cart.js.map