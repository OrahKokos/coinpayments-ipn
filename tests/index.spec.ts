import crypto from 'crypto';
import qs from 'querystring';

import { verify } from '../src/index';
import CoinpaymentsIPNError from '../lib/error';

describe(`Test CoinpaymentsIPN`, () => {
  const hmac = `some_hmac`;
  const ipnSecret = `some_ipn_secret`;
  const payload = { prop: `Some string` };

  let error = false;

  afterEach(function () {
    error = false;
  });

  it(`Should throw error on empty hmac`, function () {
    try {
      verify(undefined, ipnSecret, payload);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.instanceOf(CoinpaymentsIPNError);
  });

  it(`Should throw error on empty ipnSecret`, function () {
    try {
      verify(hmac, undefined, payload);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.instanceOf(CoinpaymentsIPNError);
  });

  it(`Should throw error on empty payload`, function () {
    try {
      verify(hmac, ipnSecret, undefined);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.instanceOf(CoinpaymentsIPNError);
  });

  it(`Should throw error on invalid payload`, function () {
    try {
      verify(hmac, ipnSecret, `string`);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.instanceOf(CoinpaymentsIPNError);
  });

  it(`Should invalidate`, function () {
    const invalidHmac = `123`;
    const isValid = verify(invalidHmac, ipnSecret, payload);
    expect(isValid).equals(false);
  });

  it(`Should validate`, function () {
    const paramString = qs.stringify(payload).replace(/%20/g, `+`);

    const validHmac = crypto
      .createHmac(`sha512`, ipnSecret)
      .update(paramString)
      .digest(`hex`);

    const isValid = verify(validHmac, ipnSecret, payload);

    expect(isValid).equals(true);
  });

  it(`Should have proper customer error implementation`, function () {
    const extra = { prop: 1 };
    const err = new CoinpaymentsIPNError(`My custom message`, extra);
    expect(err.name).equals(`CoinpaymentsIPNError`);
    expect(err).to.be.instanceOf(CoinpaymentsIPNError);
    expect(err).to.be.instanceOf(Error);
    expect(require(`util`).isError(err)).equals(true);
    expect(!!err.stack).equals(true);
    expect(err.toString()).equals(`CoinpaymentsIPNError: My custom message`);
    expect(err.stack.split(`\n`)[0]).equals(
      `CoinpaymentsIPNError: My custom message`,
    );
    expect(err.extra).equals(extra);
  });
});
