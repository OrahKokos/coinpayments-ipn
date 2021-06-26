export default class CoinpaymentsIPNError extends Error {
  public message: string;
  public extra: Record<string, unknown>;
  constructor(message, extra?) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.extra = extra;
    Object.setPrototypeOf(this, CoinpaymentsIPNError);
  }
}
