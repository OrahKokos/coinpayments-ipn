export type PaypalRefundStatus = -2;
export type CancelledOrTimeoutStatus = -1;
export type WaitingForBuyerStatus = 0;
export type ReceivedStatus = 1;
export type NightlyStatus = 2;
export type PaypalPendingStatus = 3;
export type InEscrowStatus = 5;
export type PaymentCompleteStatus = 100;

export type NegativeStatus = PaypalRefundStatus | CancelledOrTimeoutStatus;
export type NeutralStatus =
  | WaitingForBuyerStatus
  | ReceivedStatus
  | ReceivedStatus
  | NightlyStatus
  | PaypalPendingStatus
  | InEscrowStatus;
export type PositiveStatus = PaymentCompleteStatus;

export type CoinpaymentIPNStatus =
  | NegativeStatus
  | NeutralStatus
  | PositiveStatus;
