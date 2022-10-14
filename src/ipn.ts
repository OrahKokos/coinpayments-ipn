import { createHmac } from 'crypto'
import { stringify, ParsedUrlQueryInput } from 'querystring'

import { IPN_TYPES_ENUM, BASE_IPN_KEYS, IPN_DEFAULTS } from './constants'
import { IPN_TYPES, CoinpaymentsIPNLike, CoinpaymentsIPN, CoinpaymentsParseResult } from './types'
import { hasProperty, isNonEmptyString, isObject } from './util'

const ipnTypeArray: string[] = Object.values(IPN_TYPES_ENUM)

export const hasVersion = <T extends Record<PropertyKey, unknown>>(
  payload: T
): payload is T & { [BASE_IPN_KEYS.VERSION]: typeof IPN_DEFAULTS[typeof BASE_IPN_KEYS.VERSION] } => {
  const payloadHasProperty = hasProperty(payload)
  return (
    payloadHasProperty(BASE_IPN_KEYS.VERSION) && payload[BASE_IPN_KEYS.VERSION] === IPN_DEFAULTS[BASE_IPN_KEYS.VERSION]
  )
}

export const hasMode = <T extends Record<PropertyKey, unknown>>(
  payload: T
): payload is T & { [BASE_IPN_KEYS.MODE]: typeof IPN_DEFAULTS[typeof BASE_IPN_KEYS.MODE] } => {
  const payloadHasProperty = hasProperty(payload)
  return payloadHasProperty(BASE_IPN_KEYS.MODE) && payload[BASE_IPN_KEYS.MODE] === IPN_DEFAULTS[BASE_IPN_KEYS.MODE]
}

export const hasId = <T extends Record<PropertyKey, unknown>>(
  payload: T
): payload is T & { [BASE_IPN_KEYS.ID]: string } => {
  const payloadHasProperty = hasProperty(payload)
  return payloadHasProperty(BASE_IPN_KEYS.ID) && isNonEmptyString(payload[BASE_IPN_KEYS.ID])
}

export const hasMerchant = <T extends Record<PropertyKey, unknown>>(
  payload: T
): payload is T & { [BASE_IPN_KEYS.MERCHANT]: string } => {
  const payloadHasProperty = hasProperty(payload)
  return payloadHasProperty(BASE_IPN_KEYS.MERCHANT) && isNonEmptyString(payload[BASE_IPN_KEYS.MERCHANT])
}

export const hasType = <T extends Record<PropertyKey, unknown>>(
  payload: T
): payload is T & { [BASE_IPN_KEYS.TYPE]: IPN_TYPES } => {
  const payloadHasProperty = hasProperty(payload)
  return (
    payloadHasProperty(BASE_IPN_KEYS.TYPE) &&
    isNonEmptyString(payload[BASE_IPN_KEYS.TYPE]) &&
    ipnTypeArray.includes(payload[BASE_IPN_KEYS.TYPE] as string)
  )
}

export const isIPNLike = (payload: unknown): CoinpaymentsParseResult<unknown, CoinpaymentsIPNLike> => {
  if (!isObject(payload))
    return {
      success: false,
      error: new Error(`Given payload: ${payload} is not an object`),
      data: payload
    }
  if (!hasVersion(payload))
    return {
      success: false,
      error: new Error(
        `Payload does not contain: ${BASE_IPN_KEYS.VERSION} property with value ${IPN_DEFAULTS[BASE_IPN_KEYS.VERSION]}`
      ),
      data: payload
    }
  if (!hasMode(payload))
    return {
      success: false,
      error: new Error(
        `Payload does not contain: ${BASE_IPN_KEYS.MODE} property with value ${IPN_DEFAULTS[BASE_IPN_KEYS.MODE]}`
      ),
      data: payload
    }
  if (!hasId(payload))
    return {
      success: false,
      error: new Error(`Payload does not contain or empty: ${BASE_IPN_KEYS.ID} property`),
      data: payload
    }
  if (!hasMerchant(payload))
    return {
      success: false,
      error: new Error(`Payload does not contain or empty: ${BASE_IPN_KEYS.MERCHANT} property`),
      data: payload
    }
  if (!hasType(payload))
    return {
      success: false,
      error: new Error(
        `Payload does not contain: ${BASE_IPN_KEYS.TYPE} property or invalid value, allowed ${ipnTypeArray}`
      ),
      data: payload
    }
  return {
    success: true,
    data: payload
  }
}

export const verifyHMAC =
  (ipnSecret: string) =>
  (givenHMAC: string) =>
  (unverifiedIpn: CoinpaymentsIPNLike): unverifiedIpn is CoinpaymentsIPN => {
    // Coinpayments backend is PHP
    // http://php.net/manual/en/function.urlencode.php
    const stringifiedBody = stringify(unverifiedIpn as ParsedUrlQueryInput).replace(/%20/g, '+')
    const calculatedHMAC = createHmac('sha512', ipnSecret).update(stringifiedBody).digest('hex')
    return calculatedHMAC === givenHMAC
  }
