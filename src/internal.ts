import { ApiIPN } from 'types/api-ipn.types';
import { ButtonIPN } from 'types/button-ipn.types';
import { CartIPN } from 'types/cart-ipn.types';
import {
  with2Currency,
  withCommon,
  withSubtotal,
  withSingleItemOptions,
  withShippingFee,
  withTax,
  withFee,
  withNet,
  withItemAmount,
  withItemDesc,
  withSomeItemInfo,
  withOptionalItemInfo,
  withInvoice,
  withCustom,
  withExtra,
  withBuyerInfo,
  withBuyerInfoFull,
  withBuyerShippingAddress,
  withCurrency,
  withRequiredTX,
  withOptionalTX,
} from 'types/common.types';
import { withDepositExtras, DepositIPN } from 'types/deposit-ipn.types';
import { DonationIPN } from 'types/donation-ipn.types';
import { SimpleIPN, SimpleIPNLike } from 'types/simple-ipn.types';
import { withWithdrawalId } from 'types/withdrawal-ipn.types';

import { hasNonEmptyValue } from './util';

const with2CurrencyKeys = (): Array<keyof with2Currency> => [
  'currency1',
  'currency2',
  'amount1',
  'amount2',
];

const withCommonKeys = (): Array<keyof withCommon> => [
  'status',
  'status_text',
  'received_amount',
  'received_confirms',
];

const withSubtotalKeys = (): Array<keyof withSubtotal> => ['subtotal'];

const withSingleItemOptionsKeys = (): Array<keyof withSingleItemOptions> => [];

const withShippingFeeKeys = (): Array<keyof withShippingFee> => ['shipping'];

const withTaxKeys = (): Array<keyof withTax> => ['tax'];

const withFeeKeys = (): Array<keyof withFee> => ['fee'];

const withNetKeys = (): Array<keyof withNet> => ['net'];

const withItemAmountKeys = (): Array<keyof withItemAmount> => ['item_amount'];

const withItemDescKeys = (): Array<keyof withItemDesc> => [];

const withSomeItemInfoKeys = (): Array<keyof withSomeItemInfo> => ['item_name'];

const withOptionalItemInfoKeys = (): Array<keyof withOptionalItemInfo> => [];

const withInvoiceKeys = (): Array<keyof withInvoice> => [];

const withCustomKeys = (): Array<keyof withCustom> => [];

const withExtraKeys = (): Array<keyof withExtra> => [];

const withBuyerInfoKeys = (): Array<keyof withBuyerInfo> => [];

const withBuyerInfoFullKeys = (): Array<keyof withBuyerInfoFull> => [
  'first_name',
  'last_name',
  'email',
];

const withBuyerShippingAddressKeys = (): Array<
  keyof withBuyerShippingAddress
> => [];

const withCurrencyKeys = (): Array<keyof withCurrency> => [
  'address',
  'amount',
  'amounti',
  'currency',
];

const withDepositExtrasKeys = (): Array<keyof withDepositExtras> => [
  'confirms',
  'fiat_coin',
  'fiat_amount',
  'fiat_amounti',
];

const withWithdrawalIdKeys = (): Array<keyof withWithdrawalId> => ['id'];

const withRequiredTXKeys = (): Array<keyof withRequiredTX> => ['txn_id'];
const withOptionalTXKeys = (): Array<keyof withOptionalTX> => [];

const SimpleIPNKeys = () =>
  []
    .concat(with2CurrencyKeys())
    .concat(withSubtotalKeys())
    .concat(withSingleItemOptionsKeys())
    .concat(withShippingFeeKeys())
    .concat(withTaxKeys())
    .concat(withFeeKeys())
    .concat(withNetKeys())
    .concat(withOptionalItemInfoKeys())
    .concat(withItemAmountKeys())
    .concat(withItemDescKeys())
    .concat(withInvoiceKeys())
    .concat(withCustomKeys())
    .concat(withCommonKeys())
    .concat(withRequiredTXKeys())
    .concat(withBuyerInfoFullKeys())
    .concat(withBuyerShippingAddressKeys());

const ButtonIPNKeys = (): Array<keyof ButtonIPN> =>
  []
    .concat(with2CurrencyKeys())
    .concat(withSubtotalKeys())
    .concat(withSingleItemOptionsKeys())
    .concat(withShippingFeeKeys())
    .concat(withTaxKeys())
    .concat(withFeeKeys())
    .concat(withNetKeys())
    .concat(withOptionalItemInfoKeys())
    .concat(withItemAmountKeys())
    .concat(withInvoiceKeys())
    .concat(withCustomKeys())
    .concat(withExtraKeys())
    .concat(withCommonKeys())
    .concat(withRequiredTXKeys())
    .concat(withBuyerInfoFullKeys())
    .concat(withBuyerShippingAddressKeys());

const DonationIPNKeys = (): Array<keyof DonationIPN> =>
  []
    .concat(with2CurrencyKeys())
    .concat(withSubtotalKeys())
    .concat(withSingleItemOptionsKeys())
    .concat(withShippingFeeKeys())
    .concat(withTaxKeys())
    .concat(withFeeKeys())
    .concat(withNetKeys())
    .concat(withOptionalItemInfoKeys())
    .concat(withItemAmountKeys())
    .concat(withInvoiceKeys())
    .concat(withCustomKeys())
    .concat(withExtraKeys())
    .concat(withCommonKeys())
    .concat(withRequiredTXKeys())
    .concat(withBuyerInfoFullKeys())
    .concat(withBuyerShippingAddressKeys());

const CartIPNKeys = (): Array<keyof CartIPN> =>
  []
    .concat(with2CurrencyKeys())
    .concat(withSubtotalKeys())
    .concat(withShippingFeeKeys())
    .concat(withTaxKeys())
    .concat(withFeeKeys())
    .concat(withInvoiceKeys())
    .concat(withCustomKeys())
    .concat(withExtraKeys())
    .concat(withCommonKeys())
    .concat(withRequiredTXKeys())
    .concat(withBuyerInfoFullKeys())
    .concat(withBuyerShippingAddressKeys());
// + item_name_#...

const ApiIPNKeys = (): Array<keyof ApiIPN> =>
  []
    .concat(with2CurrencyKeys())
    .concat(withFeeKeys())
    .concat(withBuyerInfoKeys())
    .concat(withSomeItemInfoKeys())
    .concat(withInvoiceKeys())
    .concat(withCustomKeys())
    .concat(withCommonKeys())
    .concat(withRequiredTXKeys());

const DepositPNKeys = (): Array<keyof DepositIPN> =>
  [].concat(withCurrencyKeys()).concat(withDepositExtrasKeys());

const WithdrawalIPNKeys = (): Array<keyof DepositIPN> =>
  []
    .concat(withCurrencyKeys())
    .concat(withOptionalTXKeys())
    .concat(withWithdrawalIdKeys());

const parseSimpleIPN = (simpleIPNLike: SimpleIPNLike) => {
  const requiredKeys = SimpleIPNKeys();
  const invalidKeys = requiredKeys.map(
    hasNonEmptyValue<SimpleIPNLike>(simpleIPNLike),
  );
  return [invalidKeys];
};
