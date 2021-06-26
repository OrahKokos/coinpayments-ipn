import crypto from 'crypto';
import qs from 'querystring';
import { ApiIPN, ApiIPNLike } from 'types/api-ipn.types';
import { ButtonIPN, ButtonIPNLike } from 'types/button-ipn.types';
import { CartIPN, CartIPNLike } from 'types/cart-ipn.types';
import { IPNType, IPN_TYPES, IPN_DATA } from 'types/common.types';
import { DepositIPN, DepositIPNLike } from 'types/deposit-ipn.types';
import { DonationIPN, DonationIPNLike } from 'types/donation-ipn.types';
import { SimpleIPN, SimpleIPNLike } from 'types/simple-ipn.types';
import { UnknownIPN } from 'types/unknown-ipn.types';
import { WithdrawalIPN, WithdrawalIPNLike } from 'types/withdrawal-ipn.types';
import CoinpaymentsIPNError from './error';
import {
  CoinpaymentsIPNLike,
  CoinpaymentsIPN,
  processIPNTuple,
} from './types/index.types';

const parseObject = (obj: unknown): NodeJS.Dict<unknown> | undefined => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return obj as NodeJS.Dict<unknown>;
  }
  return undefined;
};

const parseString = (s: unknown): string | undefined => {
  if (Object.prototype.toString.call(s) === '[object String]') {
    return s as string;
  }
  return undefined;
};

const parseIPNType = (type: string): IPNType | undefined => {
  switch (type) {
    case IPN_TYPES.SIMPLE:
      return IPN_TYPES.SIMPLE;
    case IPN_TYPES.BUTTON:
      return IPN_TYPES.BUTTON;
    case IPN_TYPES.DONATION:
      return IPN_TYPES.DONATION;
    case IPN_TYPES.CART:
      return IPN_TYPES.CART;
    case IPN_TYPES.API:
      return IPN_TYPES.API;
    case IPN_TYPES.DEPOSIT:
      return IPN_TYPES.DEPOSIT;
    case IPN_TYPES.WITHDRAWAL:
      return IPN_TYPES.WITHDRAWAL;
    default:
      return undefined;
  }
};

const parseIPNLike = (ipnData: unknown): CoinpaymentsIPNLike | undefined => {
  const ipnObj = parseObject(ipnData);
  if (!ipnObj) return undefined;
  if (!ipnObj.hasOwnProperty('version') || ipnObj.version !== IPN_DATA.VERSION)
    return undefined;
  if (
    !ipnData.hasOwnProperty('ipn_mode') ||
    ipnObj.ipn_mode !== IPN_DATA.IPN_MODE
  )
    return undefined;
  if (!ipnObj.hasOwnProperty('ipn_id')) return undefined;
  if (!ipnObj.hasOwnProperty('merchant')) return undefined;
  if (!ipnObj.hasOwnProperty('type')) return undefined;

  const typeString = parseString(ipnObj.type);
  if (!typeString) return undefined;
  const validIpnType = parseIPNType(typeString);
  if (!validIpnType) return undefined;

  return ipnObj as CoinpaymentsIPNLike;
};

const verifyIPN = (
  hmac: string,
  ipnSecret: string,
  ipnBody: CoinpaymentsIPNLike,
): boolean => {
  if (!hmac.length) throw new CoinpaymentsIPNError(`HMAC cannot be empty`);
  if (!ipnSecret.length)
    throw new CoinpaymentsIPNError(`IPN secret cannot be empty`);

  // Coinpayments backend is PHP
  // http://php.net/manual/en/function.urlencode.php
  const paramString = qs.stringify(ipnBody).replace(/%20/g, `+`);
  const calcHmac = crypto
    .createHmac(`sha512`, ipnSecret)
    .update(paramString)
    .digest(`hex`);

  if (hmac !== calcHmac) return false;
  return true;
};

const processIPN = (
  hmac: string,
  ipnSecret: string,
  ipnData: unknown,
): processIPNTuple => {
  const ipnLike = parseIPNLike(ipnData);
  if (!ipnLike) throw new CoinpaymentsIPNError('Invalid IPN data', ipnData);

  const verified = verifyIPN(hmac, ipnSecret, ipnLike);
  if (!verified)
    throw new CoinpaymentsIPNError('Unverifiable IPN data', ipnLike);

  const ipn = parseIPN(ipnLike);
};

const parseIPN = (ipnLike: CoinpaymentsIPNLike): processIPNTuple => {
  switch (ipnLike.type) {
    case IPN_TYPES.SIMPLE:
      return parseSimpleIPN(ipnLike as SimpleIPNLike);
    case IPN_TYPES.BUTTON:
      return parseButtonIPN(ipnLike as ButtonIPNLike);
    case IPN_TYPES.DONATION:
      return parseDonationIPN(ipnLike as DonationIPNLike);
    case IPN_TYPES.CART:
      return parseCartIPN(ipnLike as CartIPNLike);
    case IPN_TYPES.API:
      return parseApiIPN(ipnLike as ApiIPNLike);
    case IPN_TYPES.DEPOSIT:
      return parseDepositIPN(ipnLike as DepositIPNLike);
    case IPN_TYPES.WITHDRAWAL:
      return parseWithdrawalIPN(ipnLike as WithdrawalIPNLike);
    default: {
      return [
        new CoinpaymentsIPNError('Unknown IPN Type', ipnLike),
        ipnLike as UnknownIPN,
      ];
    }
  }
};

const parseSimpleIPN = (ipnLike: SimpleIPNLike): processIPNTuple => {};

const parseButtonIPN = (ipnLike: ButtonIPNLike): processIPNTuple => {};

const parseDonationIPN = (ipnLike: DonationIPNLike): processIPNTuple => {};

const parseCartIPN = (ipnLike: CartIPNLike): processIPNTuple => {};

const parseApiIPN = (ipnLike: ApiIPNLike): processIPNTuple => {};

const parseDepositIPN = (ipnLike: DepositIPNLike): processIPNTuple => {};

const parseWithdrawalIPN = (ipnLike: WithdrawalIPNLike): processIPNTuple => {};

export { processIPN };
