import { CoinpaymentsIPN, CoinpaymentsIPNLike, CoinpaymentsParseResult } from './types';
export declare const verifyIPN: (ipnSecret: string) => (givenHMAC: string) => (unverifiedIpn: CoinpaymentsIPNLike) => CoinpaymentsParseResult<CoinpaymentsIPNLike, CoinpaymentsIPN>;
