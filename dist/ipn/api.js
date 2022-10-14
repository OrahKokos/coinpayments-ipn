"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isApiIPN = void 0;
var constants_1 = require("../constants");
var isApiIPN = function (verifiedIPN) {
    return verifiedIPN.ipn_type === constants_1.IPN_TYPES_ENUM.CREATE_TRANSACTION;
};
exports.isApiIPN = isApiIPN;
//# sourceMappingURL=api.js.map