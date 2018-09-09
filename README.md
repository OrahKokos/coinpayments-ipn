# Coinpayments-IPN

<p align="left">
  <a href="https://travis-ci.org/OrahKokos/coinpayments">
    <img src="https://travis-ci.org/OrahKokos/coinpayments-ipn.svg?branch=master"
         alt="build status">
  </a>
  <a href="https://codecov.io/github/OrahKokos/coinpayments">
    <img src="https://codecov.io/github/OrahKokos/coinpayments-ipn/coverage.svg?branch=master"
         alt="code coverage">
  </a>
</p>

![alt text](https://www.coinpayments.net/images/logo.png "CoinPayments")

Module for verifing Coinpaymets Instant Payment notifications.

## Installation

```bash
npm install coinpayments-ipn
```

## Usage
```javascript
/**
 *
 * @param {String} hmac
 * @param {String} ipnSecret
 * @param {Object} payload
 * @returns {Boolean}
 * @throws {CoinpaymentsIPNError}
 */
const { verify } = require('coinpaments-ipn');
const CoinpaymentsIPNError = require('coinpaments-ipn/lib/error');

let IsValid, error;

try {
  isValid = verify(hmac, ipnSecret, payload);
} catch (e) {
  error = e;
}
if (error) {
  if (error instanceof CoinpaymentsIPNError) {
    // handle invalid payload
  }
  // make bug report
}

if (isValid) {
  // valid
} else {
  // invalid
}

```

### Example 
A simple docker image can be found here.


