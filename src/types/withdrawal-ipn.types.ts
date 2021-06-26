import { ParsedUrlQueryInput } from 'querystring';
import {
  BaseIPN,
  IPN_TYPES,
  withCurrency,
  withOptionalTX,
} from './common.types';

export type withWithdrawalId = {
  id: string; // The ID of the withdrawal ('id' field returned from 'create_withdrawal'.)
};

export type WithdrawalIPNLike = BaseIPN & {
  type: IPN_TYPES.WITHDRAWAL;
} & ParsedUrlQueryInput;

export type WithdrawalIPN = WithdrawalIPNLike &
  withCurrency &
  withOptionalTX &
  withWithdrawalId;
