const
  util = require(`util`);

class CoinpaymentsIPNError {
  constructor(message, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
  }
}

util.inherits(CoinpaymentsIPNError, Error);

module.exports = CoinpaymentsIPNError;