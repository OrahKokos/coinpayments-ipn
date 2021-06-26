import { ParsedUrlQueryInput } from 'querystring';
import {
  BaseIPN,
  IPN_TYPES,
  with2Currency,
  withBuyerInfoFull,
  withBuyerShippingAddress,
  withCommon,
  withCustom,
  withFee,
  withInvoice,
  withItemAmount,
  withItemDesc,
  withNet,
  withOptionalItemInfo,
  withRequiredTX,
  withShippingFee,
  withSingleItemOptions,
  withSubtotal,
  withTax,
} from './common.types';

export type SimpleIPNLike = BaseIPN & {
  type: IPN_TYPES.SIMPLE;
} & ParsedUrlQueryInput;

export type SimpleIPN = SimpleIPNLike &
  with2Currency &
  withSubtotal &
  withSingleItemOptions &
  withShippingFee &
  withTax &
  withFee &
  withNet &
  withOptionalItemInfo &
  withItemAmount &
  withItemDesc &
  withInvoice &
  withCustom &
  withCommon &
  withRequiredTX &
  withBuyerInfoFull &
  withBuyerShippingAddress;
