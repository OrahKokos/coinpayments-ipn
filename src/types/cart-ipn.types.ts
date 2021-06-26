import { ParsedUrlQueryInput } from 'querystring';
import {
  BaseIPN,
  IPN_TYPES,
  with2Currency,
  withSubtotal,
  withShippingFee,
  withTax,
  withFee,
  withInvoice,
  withCustom,
  withExtra,
  withCommon,
  withRequiredTX,
  withBuyerInfoFull,
  withBuyerShippingAddress,
} from './common.types';

export type CartIPNLike = BaseIPN & {
  type: IPN_TYPES.CART;
} & ParsedUrlQueryInput;

export type CartIPN = CartIPNLike &
  with2Currency &
  withSubtotal &
  withShippingFee &
  withTax &
  withFee &
  withInvoice &
  withCustom &
  withExtra &
  withCommon &
  withRequiredTX &
  withBuyerInfoFull &
  withBuyerShippingAddress &
  NodeJS.Dict<string>; // item_name_#...
