import { ParsedUrlQueryInput } from 'querystring';
import { BaseIPN } from './common.types';

export type UnknownIPN = BaseIPN & {
  type: string;
} & ParsedUrlQueryInput;
