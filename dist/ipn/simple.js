"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSimpleButtonIPN = void 0;
var constants_1 = require("../constants");
var isSimpleButtonIPN = function (verifiedIPN) {
    return verifiedIPN.ipn_type === constants_1.IPN_TYPES_ENUM.SIMPLE;
};
exports.isSimpleButtonIPN = isSimpleButtonIPN;
//# sourceMappingURL=simple.js.map