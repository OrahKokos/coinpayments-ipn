import { ParsedUrlQueryInput } from 'querystring';
import {
  BaseIPN,
  IPN_TYPES,
  with2Currency,
  withSubtotal,
  withSingleItemOptions,
  withShippingFee,
  withTax,
  withFee,
  withNet,
  withOptionalItemInfo,
  withInvoice,
  withCustom,
  withExtra,
  withCommon,
  withRequiredTX,
  withBuyerInfoFull,
  withBuyerShippingAddress,
} from './common.types';

export type DonationIPNLike = BaseIPN & {
  type: IPN_TYPES.DONATION;
} & ParsedUrlQueryInput;

export type DonationIPN = BaseIPN & {
  type: IPN_TYPES.DONATION;
} & with2Currency &
  withSubtotal &
  withSingleItemOptions &
  withShippingFee &
  withTax &
  withFee &
  withNet &
  withOptionalItemInfo &
  withInvoice &
  withCustom &
  withExtra &
  withCommon &
  withRequiredTX &
  withBuyerInfoFull &
  withBuyerShippingAddress;
