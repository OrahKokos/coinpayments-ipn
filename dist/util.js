"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasProperty = exports.isObject = exports.isExactString = exports.isNonEmptyString = exports.isString = exports.isExactNumber = exports.isNegativeNumber = void 0;
var isNegativeNumber = function (n) { return n < 0; };
exports.isNegativeNumber = isNegativeNumber;
var isExactNumber = function (n1) { return function (n2) { return n1 === n2; }; };
exports.isExactNumber = isExactNumber;
var isString = function (s) { return typeof s === 'string'; };
exports.isString = isString;
var isNonEmptyString = function (s) { return (0, exports.isString)(s) && s.length > 0; };
exports.isNonEmptyString = isNonEmptyString;
var isExactString = function (s1) { return function (s2) { return s1 === s2; }; };
exports.isExactString = isExactString;
var isObject = function (input) {
    return typeof input === 'object' && input !== null;
};
exports.isObject = isObject;
var hasProperty = function (input) {
    return function (key) {
        return Object.hasOwn(input, key);
    };
};
exports.hasProperty = hasProperty;
//# sourceMappingURL=util.js.map