"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdvancedButtonIPN = void 0;
var constants_1 = require("../constants");
var isAdvancedButtonIPN = function (verifiedIPN) {
    return verifiedIPN.ipn_type === constants_1.IPN_TYPES_ENUM.BUTTON;
};
exports.isAdvancedButtonIPN = isAdvancedButtonIPN;
//# sourceMappingURL=button.js.map