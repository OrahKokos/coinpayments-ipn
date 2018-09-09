const crypto = require(`crypto`),
  qs = require(`querystring`);

const CoinpaymentsIPNError = require(`./error`);

/**
 *
 * @param {String} hmac
 * @param {String} ipnSecret
 * @param {Object} payload
 * @returns {Boolean}
 * @throws {CoinpaymentsIPNError}
 */
exports.verify = function(hmac = ``, ipnSecret = ``, payload) {
  if (!hmac || typeof hmac !== `string`)
    throw new CoinpaymentsIPNError(`Invalid hmac`, hmac);
  if (!ipnSecret || typeof ipnSecret !== `string`)
    throw new CoinpaymentsIPNError(`Invalid ipnSecret`, ipnSecret);
  if (typeof payload !== `object`)
    throw new CoinpaymentsIPNError(`Payload is not an object`, payload);

  // Coinpayments backend is PHP
  // http://php.net/manual/en/function.urlencode.php
  const paramString = qs.stringify(payload).replace(/%20/g, `+`);
  const calcHmac = crypto
    .createHmac(`sha512`, ipnSecret)
    .update(paramString)
    .digest(`hex`);

  if (hmac !== calcHmac) return false;
  return true;
};
