"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHMAC = exports.isIPNLike = exports.hasType = exports.hasMerchant = exports.hasId = exports.hasMode = exports.hasVersion = void 0;
var crypto_1 = require("crypto");
var querystring_1 = require("querystring");
var constants_1 = require("./constants");
var util_1 = require("./util");
var ipnTypeArray = Object.values(constants_1.IPN_TYPES_ENUM);
var hasVersion = function (payload) {
    var payloadHasProperty = (0, util_1.hasProperty)(payload);
    return (payloadHasProperty(constants_1.BASE_IPN_KEYS.VERSION) && payload[constants_1.BASE_IPN_KEYS.VERSION] === constants_1.IPN_DEFAULTS[constants_1.BASE_IPN_KEYS.VERSION]);
};
exports.hasVersion = hasVersion;
var hasMode = function (payload) {
    var payloadHasProperty = (0, util_1.hasProperty)(payload);
    return payloadHasProperty(constants_1.BASE_IPN_KEYS.MODE) && payload[constants_1.BASE_IPN_KEYS.MODE] === constants_1.IPN_DEFAULTS[constants_1.BASE_IPN_KEYS.MODE];
};
exports.hasMode = hasMode;
var hasId = function (payload) {
    var payloadHasProperty = (0, util_1.hasProperty)(payload);
    return payloadHasProperty(constants_1.BASE_IPN_KEYS.ID) && (0, util_1.isNonEmptyString)(payload[constants_1.BASE_IPN_KEYS.ID]);
};
exports.hasId = hasId;
var hasMerchant = function (payload) {
    var payloadHasProperty = (0, util_1.hasProperty)(payload);
    return payloadHasProperty(constants_1.BASE_IPN_KEYS.MERCHANT) && (0, util_1.isNonEmptyString)(payload[constants_1.BASE_IPN_KEYS.MERCHANT]);
};
exports.hasMerchant = hasMerchant;
var hasType = function (payload) {
    var payloadHasProperty = (0, util_1.hasProperty)(payload);
    return (payloadHasProperty(constants_1.BASE_IPN_KEYS.TYPE) &&
        (0, util_1.isNonEmptyString)(payload[constants_1.BASE_IPN_KEYS.TYPE] && ipnTypeArray.includes(payload[constants_1.BASE_IPN_KEYS.TYPE])));
};
exports.hasType = hasType;
var isIPNLike = function (payload) {
    if (!(0, util_1.isObject)(payload))
        return {
            success: false,
            error: new Error("Given payload: ".concat(payload, " is not an object")),
            data: payload
        };
    if (!(0, exports.hasVersion)(payload))
        return {
            success: false,
            error: new Error("Payload does not contain: ".concat(constants_1.BASE_IPN_KEYS.VERSION, " property with value ").concat(constants_1.IPN_DEFAULTS[constants_1.BASE_IPN_KEYS.VERSION])),
            data: payload
        };
    if (!(0, exports.hasMode)(payload))
        return {
            success: false,
            error: new Error("Payload does not contain: ".concat(constants_1.BASE_IPN_KEYS.MODE, " property with value ").concat(constants_1.IPN_DEFAULTS[constants_1.BASE_IPN_KEYS.MODE])),
            data: payload
        };
    if (!(0, exports.hasId)(payload))
        return {
            success: false,
            error: new Error("Payload does not contain or empty: ".concat(constants_1.BASE_IPN_KEYS.ID, " property")),
            data: payload
        };
    if (!(0, exports.hasMerchant)(payload))
        return {
            success: false,
            error: new Error("Payload does not contain or empty: ".concat(constants_1.BASE_IPN_KEYS.MERCHANT, " property")),
            data: payload
        };
    if (!(0, exports.hasType)(payload))
        return {
            success: false,
            error: new Error("Payload does not contain: ".concat(constants_1.BASE_IPN_KEYS.TYPE, " property or invalid value, allowed ").concat(ipnTypeArray)),
            data: payload
        };
    return {
        success: true,
        data: payload
    };
};
exports.isIPNLike = isIPNLike;
var verifyHMAC = function (ipnSecret) {
    return function (givenHMAC) {
        return function (unverifiedIpn) {
            var stringifiedBody = (0, querystring_1.stringify)(unverifiedIpn).replace(/%20/g, '+');
            var calculatedHMAC = (0, crypto_1.createHmac)('sha512', ipnSecret).update(stringifiedBody).digest('hex');
            return calculatedHMAC === givenHMAC;
        };
    };
};
exports.verifyHMAC = verifyHMAC;
//# sourceMappingURL=ipn.js.map