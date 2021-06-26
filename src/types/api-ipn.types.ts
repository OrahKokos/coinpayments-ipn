import { ParsedUrlQueryInput } from 'querystring';
import {
  BaseIPN,
  IPN_TYPES,
  with2Currency,
  withFee,
  withBuyerInfo,
  withSomeItemInfo,
  withInvoice,
  withCustom,
  withCommon,
  withRequiredTX,
} from './common.types';

export type ApiIPNLike = BaseIPN & {
  type: IPN_TYPES.API;
} & ParsedUrlQueryInput;

export type ApiIPN = ApiIPNLike &
  with2Currency &
  withFee &
  withBuyerInfo &
  withSomeItemInfo &
  withInvoice &
  withCustom &
  withCommon &
  withRequiredTX;
