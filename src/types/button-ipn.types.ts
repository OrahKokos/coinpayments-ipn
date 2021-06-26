import { ParsedUrlQueryInput } from 'querystring';
import {
  BaseIPN,
  IPN_TYPES,
  with2Currency,
  withBuyerInfoFull,
  withBuyerShippingAddress,
  withCommon,
  withCustom,
  withExtra,
  withFee,
  withInvoice,
  withItemAmount,
  withNet,
  withOptionalItemInfo,
  withRequiredTX,
  withShippingFee,
  withSingleItemOptions,
  withSubtotal,
  withTax,
} from './common.types';

export type ButtonIPNLike = BaseIPN & {
  type: IPN_TYPES.BUTTON;
} & ParsedUrlQueryInput;

export type ButtonIPN = ButtonIPNLike &
  with2Currency &
  withSubtotal &
  withSingleItemOptions &
  withShippingFee &
  withTax &
  withFee &
  withNet &
  withOptionalItemInfo &
  withItemAmount &
  withInvoice &
  withCustom &
  withExtra &
  withCommon &
  withRequiredTX &
  withBuyerInfoFull &
  withBuyerShippingAddress;
